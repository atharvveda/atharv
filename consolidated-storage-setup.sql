-- consolidated-storage-setup.sql
-- Run this in your Supabase SQL Editor to set up all required buckets and permissions.

-- 1. Create 'diet-plans' bucket (if not exists)
-- This bucket stores PDF diet plans uploaded by doctors for patients.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('diet-plans', 'diet-plans', false, 10485760, ARRAY['application/pdf']::text[])
ON CONFLICT (id) DO NOTHING;

-- 2. Create 'patient-documents' bucket (if not exists)
-- This bucket stores lab reports and other documents uploaded by patients for doctors.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('patient-documents', 'patient-documents', false, 20971520, ARRAY['application/pdf', 'image/jpeg', 'image/png']::text[])
ON CONFLICT (id) DO NOTHING;

-- 3. STORAGE POLICIES FOR 'diet-plans'
-- Doctors/Admins can do everything
CREATE POLICY "Admins have full access to diet-plans"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'diet-plans' AND (auth.jwt() -> 'public_metadata' ->> 'role') = 'admin')
WITH CHECK (bucket_id = 'diet-plans' AND (auth.jwt() -> 'public_metadata' ->> 'role') = 'admin');

-- Patients can only read their own folder
CREATE POLICY "Patients can read their own diet plans"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'diet-plans' AND (storage.foldername(name))[1] = (auth.jwt() ->> 'sub'));

-- 4. STORAGE POLICIES FOR 'patient-documents'
-- Patients can upload to their own folder
CREATE POLICY "Patients can upload their own documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'patient-documents' AND (storage.foldername(name))[1] = (auth.jwt() ->> 'sub'));

-- Patients can read their own documents
CREATE POLICY "Patients can read their own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'patient-documents' AND (storage.foldername(name))[1] = (auth.jwt() ->> 'sub'));

-- Doctors/Admins can read ALL patient documents
CREATE POLICY "Admins can read all patient documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'patient-documents' AND (auth.jwt() -> 'public_metadata' ->> 'role') = 'admin');

-- Doctors/Admins can delete patient documents if needed
CREATE POLICY "Admins can delete patient documents"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'patient-documents' AND (auth.jwt() -> 'public_metadata' ->> 'role') = 'admin');
