import { NextRequest, NextResponse } from 'next/server';
import { auth, createClerkClient } from '@clerk/nextjs/server';
import { supabaseAdmin } from '../../../lib/supabase';

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// GET: Patient sees own tickets, Doctor sees all
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
        let query = supabaseAdmin.from('support_tickets').select('*').order('created_at', { ascending: false });

        if (role === 'admin' && patientClerkId) {
            query = query.eq('patient_clerk_id', patientClerkId);
        } else if (role === 'patient') {
            query = query.eq('patient_clerk_id', userId);
        } else if (role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { data, error } = await query;
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ tickets: data });
    } catch (e) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST: Patient creates a ticket
export async function POST(req: NextRequest) {
    const { userId, sessionClaims } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const role = (sessionClaims?.publicMetadata as any)?.role;
    if (role !== 'patient' && role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const body = await req.json();
        const { data, error } = await supabaseAdmin
            .from('support_tickets')
            .insert({
                patient_clerk_id: role === 'patient' ? userId : body.patient_clerk_id,
                subject: body.subject,
                message: body.message,
                priority: body.priority || 'normal',
            })
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ ticket: data });
    } catch (e) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// PUT: Doctor replies to / updates ticket
export async function PUT(req: NextRequest) {
    const { userId, sessionClaims } = await auth();
    if (!userId || (sessionClaims?.publicMetadata as any)?.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const body = await req.json();
        const { data, error } = await supabaseAdmin
            .from('support_tickets')
            .update({
                status: body.status,
                doctor_reply: body.doctor_reply,
                replied_at: body.doctor_reply ? new Date().toISOString() : undefined,
                updated_at: new Date().toISOString(),
            })
            .eq('id', body.id)
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ ticket: data });
    } catch (e) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
