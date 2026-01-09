-- Add resume_url column to contacts table
ALTER TABLE contacts 
ADD COLUMN IF NOT EXISTS resume_url text;

-- Add comment to document the column
COMMENT ON COLUMN contacts.resume_url IS 'URL to the uploaded resume/CV file stored in Supabase Storage';
