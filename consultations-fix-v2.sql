-- consultations-fix-v2.sql
-- Run this in your Supabase SQL Editor to ensure the consultations table is 100% updated.

-- 1. Add all missing columns for consultations
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS consultation_type TEXT DEFAULT 'video';
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS meeting_link TEXT;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS doctor_remarks TEXT;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS duration_minutes INTEGER DEFAULT 30;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'scheduled';
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS patient_clerk_id TEXT;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 2. Force Supabase to refresh its schema cache (IMPORTANT)
NOTIFY pgrst, 'reload schema';

-- 3. Verify the columns are there (check the Results tab)
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'consultations';
