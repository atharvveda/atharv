-- ============================================================
-- RESILIENT DATABASE REPAIR SCRIPT (REV 3)
-- Run this in Supabase SQL Editor to fix missing column errors
-- and update to the new delivery status: 'nearest_local_facility'
-- ============================================================

-- 1. FIX MEDICATIONS TABLE
ALTER TABLE medications ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE medications ADD COLUMN IF NOT EXISTS dosage TEXT;
ALTER TABLE medications ADD COLUMN IF NOT EXISTS frequency TEXT;
ALTER TABLE medications ADD COLUMN IF NOT EXISTS instructions TEXT;
ALTER TABLE medications ADD COLUMN IF NOT EXISTS start_date TEXT;
ALTER TABLE medications ADD COLUMN IF NOT EXISTS end_date TEXT;
ALTER TABLE medications ADD COLUMN IF NOT EXISTS delivery_status TEXT DEFAULT 'on_the_way';
ALTER TABLE medications ADD COLUMN IF NOT EXISTS tracking_number TEXT;
ALTER TABLE medications ADD COLUMN IF NOT EXISTS prescription TEXT;
ALTER TABLE medications ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- Update status values to new mapping
UPDATE medications SET delivery_status = 'on_the_way' WHERE delivery_status = 'pending';
UPDATE medications SET delivery_status = 'nearest_local_facility' WHERE delivery_status = 'processing' OR delivery_status = 'shipped' OR delivery_status = 'in_transit';

-- Fix constraints
ALTER TABLE medications DROP CONSTRAINT IF EXISTS medications_delivery_status_check;
ALTER TABLE medications ADD CONSTRAINT medications_delivery_status_check 
    CHECK (delivery_status IN ('on_the_way', 'nearest_local_facility', 'delivered'));

-- 2. FIX DIET_PLANS TABLE
ALTER TABLE diet_plans ADD COLUMN IF NOT EXISTS meal_type TEXT;
ALTER TABLE diet_plans ADD COLUMN IF NOT EXISTS items TEXT;
ALTER TABLE diet_plans ADD COLUMN IF NOT EXISTS instructions TEXT;
ALTER TABLE diet_plans ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- Ensure required columns are NOT NULL only after adding them
ALTER TABLE diet_plans ALTER COLUMN meal_type SET NOT NULL;
ALTER TABLE diet_plans ALTER COLUMN items SET NOT NULL;

-- Fix meal_type constraint
ALTER TABLE diet_plans DROP CONSTRAINT IF EXISTS diet_plans_meal_type_check;
ALTER TABLE diet_plans ADD CONSTRAINT diet_plans_meal_type_check 
    CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snacks', 'drinks'));

-- 3. FINAL STEP: Refresh Supabase Schema Cache
NOTIFY pgrst, 'reload schema';
