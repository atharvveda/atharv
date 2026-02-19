-- ============================================================
-- FINAL DATABASE REPAIR SCRIPT
-- Run this in Supabase SQL Editor to fix 500 errors and schema issues
-- ============================================================

-- 1. Fix Medications Table
CREATE TABLE IF NOT EXISTS medications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_clerk_id TEXT NOT NULL,
    name TEXT NOT NULL,
    dosage TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure all columns exist
ALTER TABLE medications ADD COLUMN IF NOT EXISTS frequency TEXT;
ALTER TABLE medications ADD COLUMN IF NOT EXISTS instructions TEXT;
ALTER TABLE medications ADD COLUMN IF NOT EXISTS start_date TEXT;
ALTER TABLE medications ADD COLUMN IF NOT EXISTS end_date TEXT;
ALTER TABLE medications ADD COLUMN IF NOT EXISTS delivery_status TEXT DEFAULT 'on_the_way';
ALTER TABLE medications ADD COLUMN IF NOT EXISTS tracking_number TEXT;
ALTER TABLE medications ADD COLUMN IF NOT EXISTS prescription TEXT;
ALTER TABLE medications ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- Update delivery_status values to match new system
UPDATE medications SET delivery_status = 'on_the_way' WHERE delivery_status = 'pending';
UPDATE medications SET delivery_status = 'in_transit' WHERE delivery_status = 'processing' OR delivery_status = 'shipped';

-- Fix Constraints: remove old ones and add new one
ALTER TABLE medications DROP CONSTRAINT IF EXISTS medications_delivery_status_check;
ALTER TABLE medications ADD CONSTRAINT medications_delivery_status_check 
    CHECK (delivery_status IN ('on_the_way', 'in_transit', 'delivered'));

-- 2. Fix Diet Plans Table
CREATE TABLE IF NOT EXISTS diet_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_clerk_id TEXT NOT NULL,
    meal_type TEXT NOT NULL,
    items TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure all columns exist
ALTER TABLE diet_plans ADD COLUMN IF NOT EXISTS instructions TEXT;
ALTER TABLE diet_plans ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- Fix meal_type constraint
ALTER TABLE diet_plans DROP CONSTRAINT IF EXISTS diet_plans_meal_type_check;
ALTER TABLE diet_plans ADD CONSTRAINT diet_plans_meal_type_check 
    CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snacks', 'drinks'));

-- 3. FINAL STEP: Refresh Supabase Schema Cache
NOTIFY pgrst, 'reload schema';
