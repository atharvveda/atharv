-- Run this in your Supabase SQL Editor to ensure the support_tickets table has the required columns

-- 1. Ensure subject column exists
ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS subject TEXT;

-- 2. Ensure message column exists
ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS message TEXT;

-- 3. Ensure status column exists with default
ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'open';

-- 4. Ensure patient_clerk_id exists
ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS patient_clerk_id TEXT;

-- 5. Add created_at if it doesn't exist
ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- 6. Add updated_at if it doesn't exist
ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
