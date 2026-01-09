# Resume Upload Setup Guide

This guide will help you set up Supabase Storage for the contact form resume upload feature.

## Prerequisites

- A Supabase project with the database already set up
- Access to your Supabase Dashboard

## Step 1: Create the Storage Bucket

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Storage** in the left sidebar
4. Click **"New bucket"** button
5. Configure the bucket:
   - **Name**: `contacts` (must be exactly this name)
   - **Public bucket**: ✅ Enable this (or configure RLS policies if you prefer private)
   - **File size limit**: 2MB (recommended)
   - **Allowed MIME types**: `application/pdf` (optional, for extra security)
6. Click **"Create bucket"**

## Step 2: Configure Storage Policies

After creating the bucket, you need to set up Row Level Security (RLS) policies to allow public uploads.

### Option A: Using Supabase Dashboard (Recommended)

1. Go to **Storage** → **Policies** tab
2. Find the `contacts` bucket
3. Click **"New Policy"**
4. Create these policies:

#### Policy 1: Allow Public Uploads
- **Policy name**: `Allow public uploads to contacts bucket`
- **Allowed operation**: `INSERT`
- **Target roles**: `public`
- **Policy definition**:
```sql
(bucket_id = 'contacts')
```

#### Policy 2: Allow Public Read Access
- **Policy name**: `Allow public read access to contacts bucket`
- **Allowed operation**: `SELECT`
- **Target roles**: `public`
- **Policy definition**:
```sql
(bucket_id = 'contacts')
```

### Option B: Using SQL Editor

Run the SQL from `supabase/migrations/20260109000001_setup_storage_bucket.sql` in your Supabase SQL Editor.

## Step 3: Verify the Setup

1. Try uploading a resume through the contact form
2. Check the browser console for any errors
3. Verify the file appears in Storage → `contacts` → `resumes/` folder

## Troubleshooting

### Error: "Storage bucket not configured"
- Make sure the bucket is named exactly `contacts` (case-sensitive)
- Verify the bucket exists in your Supabase Storage

### Error: "Storage access denied"
- Check that RLS policies are set up correctly
- Ensure the bucket is set to Public OR policies allow public access
- Verify policies are enabled for the `contacts` bucket

### Error: "Failed to upload resume"
- Check file size (must be < 2MB)
- Verify file is a PDF
- Check browser console for detailed error messages
- Ensure your Supabase project has Storage enabled

### File not appearing in Storage
- Check the `resumes/` folder inside the `contacts` bucket
- Verify the upload completed successfully (check browser console)
- Ensure there are no RLS policies blocking file visibility

## Security Considerations

- **Public Bucket**: Files will be publicly accessible via URL. Consider this for resume uploads.
- **Private Bucket**: If you want private storage, you'll need to:
  1. Create the bucket as private
  2. Set up authenticated upload policies
  3. Modify the code to use signed URLs instead of public URLs

## Testing

After setup, test the upload with:
- A valid PDF file (< 2MB)
- Check that the file URL is saved in the `contacts` table
- Verify you can access the file via the stored URL

## Need Help?

Check the browser console for detailed error messages. The improved error handling will guide you to the specific issue.
