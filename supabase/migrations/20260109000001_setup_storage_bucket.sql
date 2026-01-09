-- Setup Storage Bucket for Contact Form Resumes
-- Run this migration to create the storage bucket and policies

-- Note: Storage buckets must be created through the Supabase Dashboard or API
-- This file provides the SQL policies that should be applied after creating the bucket

-- Step 1: Create the bucket manually in Supabase Dashboard:
--   1. Go to Storage in your Supabase Dashboard
--   2. Click "New bucket"
--   3. Name it: "contacts"
--   4. Make it Public (or configure RLS as needed)
--   5. Click "Create bucket"

-- Step 2: After creating the bucket, run the policies below:

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public uploads to contacts bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to contacts bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete from contacts bucket" ON storage.objects;

-- Allow public uploads to contacts bucket
CREATE POLICY "Allow public uploads to contacts bucket"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'contacts');

-- Allow public read access to contacts bucket
CREATE POLICY "Allow public read access to contacts bucket"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'contacts');

-- Optional: Allow authenticated users to delete files (for admin cleanup)
CREATE POLICY "Allow authenticated users to delete from contacts bucket"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'contacts');
