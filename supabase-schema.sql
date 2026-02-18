-- ============================================
-- Atharv Veda Dashboard: Supabase Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Patient Profiles
CREATE TABLE IF NOT EXISTS patient_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    clerk_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    age INTEGER,
    gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
    address TEXT,
    health_condition TEXT,
    other_health_conditions TEXT,
    family_history TEXT,
    hospitalization_history TEXT,
    current_medication TEXT, -- Summary of current meds at enrollment
    medical_history TEXT, -- General catch-all
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Consultations
CREATE TABLE IF NOT EXISTS consultations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_clerk_id TEXT NOT NULL REFERENCES patient_profiles(clerk_id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    consultation_type TEXT DEFAULT 'video' CHECK (consultation_type IN ('video', 'in-person', 'phone')),
    status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
    scheduled_at TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    doctor_remarks TEXT,
    meeting_link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Diet Plans
CREATE TABLE IF NOT EXISTS diet_plans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_clerk_id TEXT NOT NULL REFERENCES patient_profiles(clerk_id) ON DELETE CASCADE,
    meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snacks', 'drinks')),
    items TEXT NOT NULL,
    instructions TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Medications
CREATE TABLE IF NOT EXISTS medications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_clerk_id TEXT NOT NULL REFERENCES patient_profiles(clerk_id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    dosage TEXT NOT NULL,
    frequency TEXT NOT NULL,
    instructions TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    delivery_status TEXT DEFAULT 'pending' CHECK (delivery_status IN ('pending', 'processing', 'shipped', 'delivered')),
    tracking_number TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Support Tickets
CREATE TABLE IF NOT EXISTS support_tickets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_clerk_id TEXT NOT NULL REFERENCES patient_profiles(clerk_id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    doctor_reply TEXT,
    replied_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Website Enquiries
CREATE TABLE IF NOT EXISTS enquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'contacted', 'closed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_consultations_patient ON consultations(patient_clerk_id);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_diet_plans_patient ON diet_plans(patient_clerk_id);
CREATE INDEX IF NOT EXISTS idx_medications_patient ON medications(patient_clerk_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_patient ON support_tickets(patient_clerk_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);

-- RLS (Row Level Security) - disable for admin access via service key
ALTER TABLE patient_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE diet_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (our API uses supabaseAdmin which bypasses RLS)
CREATE POLICY "Service role full access" ON patient_profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON consultations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON diet_plans FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON medications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON support_tickets FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON enquiries FOR ALL USING (true) WITH CHECK (true);
