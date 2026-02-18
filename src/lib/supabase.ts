import { createClient } from '@supabase/supabase-js';

// Handle both REST API URL format and PostgreSQL connection string format
function getSupabaseUrl(): string {
    const raw = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    if (raw.startsWith('https://')) return raw;
    // Extract project ref from postgresql://...@db.<ref>.supabase.co:5432/...
    const match = raw.match(/db\.([a-z0-9]+)\.supabase\.co/);
    if (match) return `https://${match[1]}.supabase.co`;
    return raw;
}

const supabaseUrl = getSupabaseUrl();
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SECRET_KEY!;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
}

// Public client for client-side operations (proper RLS policy required)
export const supabaseClient = createClient(supabaseUrl, supabaseKey);

// Admin client for server-side operations (bypasses RLS)
// ONLY use this in secure server environments (API routes, Server Actions)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});
