import { NextRequest, NextResponse } from 'next/server';
import { auth, createClerkClient } from '@clerk/nextjs/server';
import { supabaseAdmin } from '../../../lib/supabase';

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// GET: Fetch document list for a patient (patient can see own, admin can see target)
export async function GET(req: NextRequest) {
    const { userId, sessionClaims } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    let role = (sessionClaims?.publicMetadata as any)?.role;
    if (!role) {
        try {
            const user = await clerk.users.getUser(userId);
            role = user.publicMetadata?.role;
        } catch (e) {
            console.error('Clerk Fallback Error:', e);
        }
    }

    const { searchParams } = new URL(req.url);
    const targetPatientId = searchParams.get('patientClerkId');

    let patientClerkId: string;
    if (role === 'admin') {
        if (!targetPatientId) return NextResponse.json({ error: 'Missing patientClerkId' }, { status: 400 });
        patientClerkId = targetPatientId;
    } else if (role === 'patient') {
        patientClerkId = userId;
    } else {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        // List files in the patient's folder
        const { data: files, error } = await supabaseAdmin
            .storage
            .from('patient-documents')
            .list(patientClerkId, {
                limit: 20,
                sortBy: { column: 'created_at', order: 'desc' },
            });

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        if (!files) return NextResponse.json({ documents: [] });

        // Generate signed URLs for all files
        const docs = await Promise.all(files.map(async (file) => {
            const { data: signedData } = await supabaseAdmin
                .storage
                .from('patient-documents')
                .createSignedUrl(`${patientClerkId}/${file.name}`, 3600);

            return {
                name: file.name,
                url: signedData?.signedUrl,
                created_at: file.created_at,
                size: file.metadata?.size,
                type: file.metadata?.mimetype
            };
        }));

        return NextResponse.json({ documents: docs });
    } catch (e: any) {
        console.error('Documents GET Error:', e);
        return NextResponse.json({ error: 'Internal Server Error', details: e.message }, { status: 500 });
    }
}

// POST: Upload a document (Patient uploads own, Admin can upload for patient)
export async function POST(req: NextRequest) {
    try {
        const { userId, sessionClaims } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        let role = (sessionClaims?.publicMetadata as any)?.role;
        if (!role) {
            try {
                const user = await clerk.users.getUser(userId);
                role = user.publicMetadata?.role;
            } catch (e) {
                console.error('Clerk Fallback Error:', e);
            }
        }

        if (role !== 'admin' && role !== 'patient') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const formData = await req.formData();
        const file = formData.get('file') as File;
        const targetPatientId = formData.get('patientId') as string;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        let uploadPath = '';
        if (role === 'patient') {
            uploadPath = `${userId}/${Date.now()}-${file.name}`;
        } else if (role === 'admin') {
            if (!targetPatientId) return NextResponse.json({ error: 'Missing patientId' }, { status: 400 });
            uploadPath = `${targetPatientId}/${Date.now()}-${file.name}`;
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

        const { data: signedData } = await supabaseAdmin
            .storage
            .from('patient-documents')
            .createSignedUrl(uploadPath, 3600);

        return NextResponse.json({
            success: true,
            path: data.path,
            url: signedData?.signedUrl,
            name: file.name
        });

    } catch (error: any) {
        console.error('Documents API POST Error:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
