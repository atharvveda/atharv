import { NextRequest, NextResponse } from 'next/server';
import { auth, createClerkClient } from '@clerk/nextjs/server';
import { supabaseAdmin } from '../../../lib/supabase';

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// GET: Doctor gets all patients, Patient gets own profile
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
    const clerkId = searchParams.get('clerkId');

    try {
        if (role === 'admin') {
            // Doctor: get all patients or specific patient
            if (clerkId) {
                const { data, error } = await supabaseAdmin
                    .from('patient_profiles')
                    .select('*')
                    .eq('clerk_id', clerkId)
                    .single();
                if (error) return NextResponse.json({ error: error.message }, { status: 500 });
                return NextResponse.json({ patient: data });
            }
            const { data, error } = await supabaseAdmin
                .from('patient_profiles')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) return NextResponse.json({ error: error.message }, { status: 500 });
            return NextResponse.json({ patients: data });
        } else if (role === 'patient') {
            // Patient: get own profile
            const { data, error } = await supabaseAdmin
                .from('patient_profiles')
                .select('*')
                .eq('clerk_id', userId)
                .single();
            if (error && error.code !== 'PGRST116') {
                return NextResponse.json({ error: error.message }, { status: 500 });
            }
            return NextResponse.json({ patient: data });
        }
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    } catch (e) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST: Create or update patient profile
export async function POST(req: NextRequest) {
    const { userId, sessionClaims } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const role = (sessionClaims?.publicMetadata as any)?.role;
    if (role !== 'admin' && role !== 'patient') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const body = await req.json();
        const targetClerkId = role === 'admin' ? (body.clerk_id || userId) : userId;

        const { data, error } = await supabaseAdmin
            .from('patient_profiles')
            .upsert({
                clerk_id: targetClerkId,
                name: body.name,
                email: body.email,
                phone: body.phone,
                age: body.age,
                gender: body.gender,
                address: body.address,
                medical_history: body.medical_history,
                status: body.status || 'active',
                updated_at: new Date().toISOString(),
            }, { onConflict: 'clerk_id' })
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ patient: data });
    } catch (e) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
