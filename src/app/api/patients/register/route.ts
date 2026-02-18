import { NextRequest, NextResponse } from 'next/server';
import { auth, createClerkClient } from '@clerk/nextjs/server';
import { supabaseAdmin } from '../../../../lib/supabase';

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// POST: Auto-register patient profile on first login
export async function POST(req: NextRequest) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const body = await req.json();

        // 1. Check if already exists in Supabase
        const { data: existing } = await supabaseAdmin
            .from('patient_profiles')
            .select('id')
            .eq('clerk_id', userId)
            .single();

        if (existing) {
            // Even if it exists in Supabase, ensure Clerk metadata is synced
            await clerk.users.updateUserMetadata(userId, {
                publicMetadata: { role: 'patient' }
            });
            return NextResponse.json({ message: 'Profile already exists', exists: true });
        }

        // 2. Create new profile in Supabase
        const { data, error } = await supabaseAdmin
            .from('patient_profiles')
            .insert({
                clerk_id: userId,
                name: body.name || 'Patient',
                email: body.email,
                phone: body.phone,
                status: 'active',
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase Register Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // 3. Sync Clerk metadata
        await clerk.users.updateUserMetadata(userId, {
            publicMetadata: { role: 'patient' }
        });

        return NextResponse.json({ patient: data, created: true });
    } catch (e) {
        console.error('Register API Catch:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
