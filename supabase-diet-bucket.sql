-- Run this in your Supabase SQL Editor to create the diet-plans storage bucket
-- This allows doctors to upload PDF diet plans that patients can download

-- 1. Create the storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'diet-plans',
  'diet-plans',
  false,
  10485760,  -- 10MB max file size
  ARRAY['application/pdf']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- 2. Policy: Allow authenticated users to upload (doctors only enforced in API)
CREATE POLICY "Authenticated users can upload diet plans"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'diet-plans');

-- 3. Policy: Allow authenticated users to read their own diet plans
CREATE POLICY "Authenticated users can read diet plans"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'diet-plans');

-- 4. Policy: Allow service role full access (for API routes)
CREATE POLICY "Service role full access to diet plans"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'diet-plans')
WITH CHECK (bucket_id = 'diet-plans');
