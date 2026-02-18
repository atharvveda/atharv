import { NextRequest, NextResponse } from 'next/server';
import { auth, createClerkClient } from '@clerk/nextjs/server';
import { supabaseAdmin } from '../../../../lib/supabase';

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function POST(req: NextRequest) {
    const { userId, sessionClaims } = await auth();

    // 1. Verify Doctor Authorization
    let role = (sessionClaims?.publicMetadata as any)?.role as string | undefined;

    // Fallback: If role is missing from token (common if not set in Clerk Dashboard),
    // fetch directly from backend to be sure.
    if (!role && userId) {
        try {
            const user = await clerk.users.getUser(userId);
            role = user.publicMetadata?.role as string | undefined;
        } catch (e) {
            console.error('Error fetching user for role check:', e);
        }
    }

    if (!userId || role !== 'admin') {
        return NextResponse.json({
            error: 'Unauthorized: Doctors only'
        }, { status: 403 });
    }

    try {
        const body = await req.json();
        const {
            name, email, password, phone, gender, address, age,
            health_condition, other_health_conditions, family_history,
            hospitalization_history, current_medication
        } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Name, Email, and Password are required' }, { status: 400 });
        }

        // 2. Resolve Clerk User (Create or Fetch existing)
        const firstName = name.split(' ')[0];
        const lastName = name.split(' ').slice(1).join(' ') || '.';
        const username = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '') + Math.floor(Math.random() * 1000);

        let clerkUser;
        try {
            // Check if user already exists in Clerk by email
            const existingClerkUsers = await clerk.users.getUserList({ emailAddress: [email] });
            if (existingClerkUsers.data.length > 0) {
                clerkUser = existingClerkUsers.data[0];
                console.log('Using existing Clerk user:', clerkUser.id);
            } else {
                // Create new user in Clerk
                clerkUser = await clerk.users.createUser({
                    emailAddress: [email],
                    username: username,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    publicMetadata: { role: 'patient' },
                    skipPasswordChecks: true,
                });
            }
        } catch (clerkError: any) {
            console.error('Clerk Create/Fetch Error:', JSON.stringify(clerkError, null, 2));
            const errorMsg = clerkError.errors?.[0]?.longMessage || clerkError.errors?.[0]?.message || clerkError.message || 'Failed to resolve Clerk account';
            return NextResponse.json({
                error: errorMsg,
                clerkDetail: clerkError.errors?.[0]
            }, { status: 400 });
        }

        // 3. Create Profile in Supabase
        const { data, error } = await supabaseAdmin
            .from('patient_profiles')
            .insert({
                clerk_id: clerkUser.id,
                name,
                email,
                phone,
                gender,
                address,
                age: age ? parseInt(age) : null,
                health_condition,
                other_health_conditions,
                family_history,
                hospitalization_history,
                current_medication,
                status: 'active'
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase Enrollment Error:', error);
            // Cleanup Clerk user if Supabase fails? Optional but safer for consistency
            // await clerk.users.deleteUser(clerkUser.id);
            return NextResponse.json({ error: 'Clerk account created but Supabase profile failed: ' + error.message }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: 'Patient enrolled successfully',
            patient: data
        });

    } catch (e) {
        console.error('Enroll API Catch:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
