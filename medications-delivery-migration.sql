-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- Safe: uses IF NOT EXISTS so it won't fail if columns already exist

ALTER TABLE medications ADD COLUMN IF NOT EXISTS delivery_status TEXT DEFAULT 'on_the_way';
ALTER TABLE medications ADD COLUMN IF NOT EXISTS prescription    TEXT DEFAULT NULL;
ALTER TABLE medications ADD COLUMN IF NOT EXISTS tracking_number TEXT DEFAULT NULL;
