import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '../../../lib/supabase';

export async function POST(req: NextRequest) {
    try {
        const { userId, sessionClaims } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const role = (sessionClaims?.publicMetadata as any)?.role;

        // Strict Role Check
        if (role !== 'admin' && role !== 'patient') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Role Logic:
        // Patient: Upload to own folder.
        // Admin: Can upload to any folder (need logic to specify target).
        // For this example, we upload to the user's own folder (if patient) 
        // or a 'admin-uploads' folder if admin doesn't specify (or strictly to userId for simplicity).

        // If Admin wants to upload for a patient, they should pass 'patientId'.
        const targetPatientId = formData.get('patientId') as string;

        let uploadPath = '';

        if (role === 'patient') {
            // Patient force uploaded to own ID
            uploadPath = `${userId}/${Date.now()}-${file.name}`;
        } else if (role === 'admin') {
            if (targetPatientId) {
                uploadPath = `${targetPatientId}/${Date.now()}-${file.name}`;
            } else {
                // Fallback or upload to admin's own space?
                uploadPath = `admin-uploads/${userId}/${Date.now()}-${file.name}`;
            }
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const { data, error } = await supabaseAdmin
            .storage
            .from('patient-documents')
            .upload(uploadPath, buffer, {
                contentType: file.type,
                upsert: false
            });

        if (error) {
            console.error('Supabase upload error:', error);
            return NextResponse.json({ error: 'Upload failed: ' + error.message }, { status: 500 });
        }

        // Generate signed URL (valid for 1 hour) for immediate view
        const { data: signedData, error: signedError } = await supabaseAdmin
            .storage
            .from('patient-documents')
            .createSignedUrl(uploadPath, 3600);

        return NextResponse.json({
            success: true,
            path: data.path,
            url: signedData?.signedUrl
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
