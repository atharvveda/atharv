import { NextRequest, NextResponse } from 'next/server';
import { auth, createClerkClient } from '@clerk/nextjs/server';
import { supabaseAdmin } from '../../../lib/supabase';

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// GET: Fetch consultations (filtered by patientId for doctor, own for patient)
export async function GET(req: NextRequest) {
    const { userId, sessionClaims } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    let role = (sessionClaims?.publicMetadata as any)?.role;

    // Fallback: Fetch directly from Clerk backend if role is missing from claims
    if (!role && userId) {
        try {
            const user = await clerk.users.getUser(userId);
            role = user.publicMetadata?.role;
        } catch (e) {
            console.error('Clerk Fallback Error:', e);
        }
    }

    const { searchParams } = new URL(req.url);
    const patientClerkId = searchParams.get('patientClerkId');

    try {
        let query = supabaseAdmin.from('consultations').select('*').order('scheduled_at', { ascending: true });

        if (role === 'admin' && patientClerkId) {
            query = query.eq('patient_clerk_id', patientClerkId);
        } else if (role === 'patient') {
            query = query.eq('patient_clerk_id', userId);
        } else if (role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { data, error } = await query;
        if (error) {
            console.error('Consultations Query Error:', error);
            return NextResponse.json({ error: error.message, details: error }, { status: 500 });
        }
        return NextResponse.json({ consultations: data });
    } catch (e: any) {
        console.error('Consultations API Catch:', e);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: e.message || e
        }, { status: 500 });
    }
}

// POST: Doctor creates a consultation
export async function POST(req: NextRequest) {
    const { userId, sessionClaims } = await auth();
    if (!userId || (sessionClaims?.publicMetadata as any)?.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const body = await req.json();
        const { data, error } = await supabaseAdmin
            .from('consultations')
            .insert({
                patient_clerk_id: body.patient_clerk_id,
                title: body.title,
                description: body.description,
                consultation_type: body.consultation_type || 'video',
                status: body.status || 'scheduled',
                scheduled_at: body.scheduled_at,
                duration_minutes: body.duration_minutes || 30,
                meeting_link: body.meeting_link,
            })
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ consultation: data });
    } catch (e) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// PUT: Update consultation (add remarks, change status)
export async function PUT(req: NextRequest) {
    const { userId, sessionClaims } = await auth();
    if (!userId || (sessionClaims?.publicMetadata as any)?.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const body = await req.json();
        const { data, error } = await supabaseAdmin
            .from('consultations')
            .update({
                title: body.title,
                description: body.description,
                consultation_type: body.consultation_type,
                status: body.status,
                scheduled_at: body.scheduled_at,
                duration_minutes: body.duration_minutes,
                doctor_remarks: body.doctor_remarks,
                meeting_link: body.meeting_link,
                updated_at: new Date().toISOString(),
            })
            .eq('id', body.id)
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ consultation: data });
    } catch (e) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
