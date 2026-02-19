-- Run this in your Supabase SQL Editor to FIX the support_tickets table

-- 1. Ensure all required columns exist with the correct names
ALTER TABLE support_tickets ADD COLUMN IF NOT EXISTS subject TEXT;
ALTER TABLE support_tickets ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE support_tickets ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'open';
ALTER TABLE support_tickets ADD COLUMN IF NOT EXISTS patient_clerk_id TEXT;
ALTER TABLE support_tickets ADD COLUMN IF NOT EXISTS doctor_reply TEXT;
ALTER TABLE support_tickets ADD COLUMN IF NOT EXISTS replied_at TIMESTAMPTZ;
ALTER TABLE support_tickets ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE support_tickets ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 2. Verify the columns were added (check the 'Results' tab after running)
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'support_tickets'
AND table_schema = 'public';

-- 3. If you still see the error, it's a Supabase Cache issue.
-- Try running this dummy command to force a schema reload:
NOTIFY pgrst, 'reload schema';
