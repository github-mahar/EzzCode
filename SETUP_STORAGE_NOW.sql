-- Run this SQL in your Supabase SQL Editor after creating the 'contacts' bucket

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
