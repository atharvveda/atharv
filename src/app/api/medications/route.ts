import { NextRequest, NextResponse } from 'next/server';
import { auth, createClerkClient } from '@clerk/nextjs/server';
import { supabaseAdmin } from '../../../lib/supabase';

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// GET: Fetch medications
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
        let query = supabaseAdmin.from('medications').select('*').order('created_at', { ascending: false });

        if (role === 'admin' && patientClerkId) {
            query = query.eq('patient_clerk_id', patientClerkId);
        } else if (role === 'patient') {
            query = query.eq('patient_clerk_id', userId);
        } else if (role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { data, error } = await query;
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ medications: data });
    } catch (e) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST: Doctor adds medication
export async function POST(req: NextRequest) {
    const { userId, sessionClaims } = await auth();
    if (!userId || (sessionClaims?.publicMetadata as any)?.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const body = await req.json();
        const { data, error } = await supabaseAdmin
            .from('medications')
            .insert({
                patient_clerk_id: body.patient_clerk_id,
                name: body.name,
                dosage: body.dosage,
                frequency: body.frequency,
                instructions: body.instructions,
                start_date: body.start_date,
                end_date: body.end_date,
                delivery_status: body.delivery_status || 'pending',
                tracking_number: body.tracking_number,
                is_active: true,
            })
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ medication: data });
    } catch (e) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// PUT: Update medication (delivery status, tracking, etc.)
export async function PUT(req: NextRequest) {
    const { userId, sessionClaims } = await auth();
    if (!userId || (sessionClaims?.publicMetadata as any)?.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const body = await req.json();
        const { data, error } = await supabaseAdmin
            .from('medications')
            .update({
                name: body.name,
                dosage: body.dosage,
                frequency: body.frequency,
                instructions: body.instructions,
                start_date: body.start_date,
                end_date: body.end_date,
                delivery_status: body.delivery_status,
                tracking_number: body.tracking_number,
                is_active: body.is_active,
                updated_at: new Date().toISOString(),
            })
            .eq('id', body.id)
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ medication: data });
    } catch (e) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
