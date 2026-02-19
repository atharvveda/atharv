-- ============================================================
-- SUPER MIGRATION: Fix Medications Table Schema
-- Run this in Supabase SQL Editor to resolve "column does not exist" errors
-- ============================================================

-- 1. Ensure the table exists (in case it was never created)
CREATE TABLE IF NOT EXISTS medications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_clerk_id TEXT NOT NULL,
    name TEXT NOT NULL,
    dosage TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Add all missing columns one by one
ALTER TABLE medications ADD COLUMN IF NOT EXISTS frequency TEXT;
ALTER TABLE medications ADD COLUMN IF NOT EXISTS instructions TEXT;
ALTER TABLE medications ADD COLUMN IF NOT EXISTS start_date TEXT;
ALTER TABLE medications ADD COLUMN IF NOT EXISTS end_date TEXT;
ALTER TABLE medications ADD COLUMN IF NOT EXISTS delivery_status TEXT DEFAULT 'on_the_way';
ALTER TABLE medications ADD COLUMN IF NOT EXISTS tracking_number TEXT;
ALTER TABLE medications ADD COLUMN IF NOT EXISTS prescription TEXT;
ALTER TABLE medications ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- 3. Update the delivery_status check constraint (clean up)
ALTER TABLE medications DROP CONSTRAINT IF EXISTS medications_delivery_status_check;
ALTER TABLE medications ADD CONSTRAINT medications_delivery_status_check 
    CHECK (delivery_status IN ('on_the_way', 'in_transit', 'delivered'));

-- 4. Notify PostgREST to reload schema cache
NOTIFY pgrst, 'reload schema';
