import { NextRequest, NextResponse } from 'next/server';
import { auth, createClerkClient } from '@clerk/nextjs/server';
import { supabaseAdmin } from '../../../../lib/supabase';

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// GET: Fetch diet plan PDF signed URL for a patient
export async function GET(req: NextRequest) {
    const { userId, sessionClaims } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    let role = (sessionClaims?.publicMetadata as any)?.role;
    if (!role && userId) {
        try {
            const user = await clerk.users.getUser(userId);
            role = user.publicMetadata?.role;
        } catch (e) {
            console.error('Clerk Fallback Error:', e);
        }
    }

    const { searchParams } = new URL(req.url);
    let patientClerkId: string;

    if (role === 'admin') {
        patientClerkId = searchParams.get('patientClerkId') || '';
        if (!patientClerkId) {
            return NextResponse.json({ error: 'Missing patientClerkId' }, { status: 400 });
        }
    } else if (role === 'patient') {
        patientClerkId = userId;
    } else {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        // List files in the patient's diet-plans folder, sorted by newest
        const { data: files, error } = await supabaseAdmin
            .storage
            .from('diet-plans')
            .list(patientClerkId, {
                limit: 10,
                sortBy: { column: 'created_at', order: 'desc' },
            });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!files || files.length === 0) {
            return NextResponse.json({ files: [] });
        }

        // Generate signed URLs for all PDF files (valid 1 hour)
        const fileList = await Promise.all(
            files
                .filter(f => f.name.endsWith('.pdf'))
                .map(async (f) => {
                    const { data: signedData } = await supabaseAdmin
                        .storage
                        .from('diet-plans')
                        .createSignedUrl(`${patientClerkId}/${f.name}`, 3600);

                    return {
                        name: f.name,
                        url: signedData?.signedUrl || null,
                        created_at: f.created_at,
                    };
                })
        );

        return NextResponse.json({ files: fileList });
    } catch (e) {
        console.error('Diet PDF GET Error:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST: Doctor uploads a diet plan PDF for a patient
export async function POST(req: NextRequest) {
    const { userId, sessionClaims } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    let role = (sessionClaims?.publicMetadata as any)?.role;
    if (!role && userId) {
        try {
            const user = await clerk.users.getUser(userId);
            role = user.publicMetadata?.role;
        } catch (e) {
            console.error('Clerk Fallback Error:', e);
        }
    }

    if (role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden: Doctors only' }, { status: 403 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const patientClerkId = formData.get('patientClerkId') as string;

        if (!file || !patientClerkId) {
            return NextResponse.json({ error: 'Missing file or patientClerkId' }, { status: 400 });
        }

        if (file.type !== 'application/pdf') {
            return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${Date.now()}-${file.name}`;
        const uploadPath = `${patientClerkId}/${fileName}`;

        const { data, error } = await supabaseAdmin
            .storage
            .from('diet-plans')
            .upload(uploadPath, buffer, {
                contentType: 'application/pdf',
                upsert: false,
            });

        if (error) {
            console.error('Supabase upload error:', error);
            return NextResponse.json({ error: 'Upload failed: ' + error.message }, { status: 500 });
        }

        // Generate signed URL for immediate access
        const { data: signedData } = await supabaseAdmin
            .storage
            .from('diet-plans')
            .createSignedUrl(uploadPath, 3600);

        return NextResponse.json({
            success: true,
            path: data.path,
            url: signedData?.signedUrl,
            name: fileName,
        });
    } catch (e) {
        console.error('Diet PDF POST Error:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE: Doctor removes a diet plan PDF
export async function DELETE(req: NextRequest) {
    const { userId, sessionClaims } = await auth();
    if (!userId || (sessionClaims?.publicMetadata as any)?.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const path = searchParams.get('path');
        if (!path) return NextResponse.json({ error: 'Missing path' }, { status: 400 });

        const { error } = await supabaseAdmin
            .storage
            .from('diet-plans')
            .remove([path]);

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
