-- consolidated-consultations-fix.sql
-- Run this in your Supabase SQL Editor to ensure the consultations table is up to date.

-- 1. Ensure scheduled_at column exists
ALTER TABLE consultations 
ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMPTZ DEFAULT NOW();

-- 2. Ensure meeting_link exists
ALTER TABLE consultations 
ADD COLUMN IF NOT EXISTS meeting_link TEXT;

-- 3. Ensure doctor_remarks exists
ALTER TABLE consultations 
ADD COLUMN IF NOT EXISTS doctor_remarks TEXT;

-- 4. Ensure duration_minutes exists
ALTER TABLE consultations 
ADD COLUMN IF NOT EXISTS duration_minutes INTEGER DEFAULT 30;

-- 5. Force update the scheduled_at to NOT NULL if needed (after setting defaults)
ALTER TABLE consultations 
ALTER COLUMN scheduled_at SET NOT NULL;

-- 6. Ensure indexes for performance
CREATE INDEX IF NOT EXISTS idx_consultations_scheduled_at ON consultations(scheduled_at);
