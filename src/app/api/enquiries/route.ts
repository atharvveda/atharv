import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

// POST: Submit a new enquiry from the website
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, subject, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await supabaseAdmin
            .from('enquiries')
            .insert({
                name,
                email,
                phone,
                subject,
                message,
                status: 'new'
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase Enquiry Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Enquiry submitted successfully', id: data.id });
    } catch (e) {
        console.error('Enquiry API Catch:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// GET: List enquiries (for admin use - eventually protect this)
export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('enquiries')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ enquiries: data });
    } catch (e) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
