import { NextRequest, NextResponse } from 'next/server';
import { auth, createClerkClient } from '@clerk/nextjs/server';
import { supabaseAdmin } from '../../../lib/supabase';

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// GET: Fetch diet plan
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
        let query = supabaseAdmin.from('diet_plans').select('*').eq('is_active', true).order('meal_type');

        if (role === 'admin' && patientClerkId) {
            query = query.eq('patient_clerk_id', patientClerkId);
        } else if (role === 'patient') {
            query = query.eq('patient_clerk_id', userId);
        } else if (role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { data, error } = await query;
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ diet: data });
    } catch (e) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST: Doctor creates/adds diet plan entry
export async function POST(req: NextRequest) {
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

    if (role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const body = await req.json();
        const { data, error } = await supabaseAdmin
            .from('diet_plans')
            .insert({
                patient_clerk_id: body.patient_clerk_id,
                meal_type: body.meal_type,
                items: body.items,
                instructions: body.instructions,
                is_active: true,
            })
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ entry: data });
    } catch (e) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// PUT: Update diet plan entry
export async function PUT(req: NextRequest) {
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

    if (role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const body = await req.json();
        const { data, error } = await supabaseAdmin
            .from('diet_plans')
            .update({
                meal_type: body.meal_type,
                items: body.items,
                instructions: body.instructions,
                is_active: body.is_active,
                updated_at: new Date().toISOString(),
            })
            .eq('id', body.id)
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ entry: data });
    } catch (e) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE: Remove diet plan entry
export async function DELETE(req: NextRequest) {
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

    if (role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

        const { error } = await supabaseAdmin
            .from('diet_plans')
            .delete()
            .eq('id', id);

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
