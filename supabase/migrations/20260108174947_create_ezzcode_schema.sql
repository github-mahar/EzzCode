/*
  # EZZCODE Platform Database Schema

  ## Overview
  This migration creates the database structure for the EZZCODE tech training and internship platform.

  ## New Tables

  ### 1. programs
  Stores all available training and internship programs offered by EZZCODE.
  - `id` (uuid, primary key) - Unique identifier for each program
  - `title` (text) - Program name (e.g., "Web Development Internship")
  - `description` (text) - Detailed program description
  - `duration` (text) - Program duration (e.g., "8 weeks")
  - `skills` (text array) - Array of skills covered
  - `eligibility` (text) - Eligibility requirements
  - `category` (text) - Program category (Web Development, AI, Python, etc.)
  - `status` (text) - Program status (active/inactive)
  - `created_at` (timestamptz) - Record creation timestamp

  ### 2. certificates
  Stores issued certificates for verification purposes.
  - `id` (uuid, primary key) - Unique identifier
  - `certificate_id` (text, unique) - Public certificate ID for verification
  - `student_name` (text) - Name of the certificate holder
  - `program_name` (text) - Name of the completed program
  - `issue_date` (date) - Date when certificate was issued
  - `status` (text) - Verification status (valid/revoked)
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. contacts
  Stores contact form submissions from the website.
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Sender's name
  - `email` (text) - Sender's email address
  - `message` (text) - Contact message content
  - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - RLS is enabled on all tables
  - Public read access for programs (to display on website)
  - Public read access for certificates (for verification)
  - Public insert access for contacts (to submit forms)
  - All other operations require authentication
*/

-- Create programs table
CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  duration text NOT NULL,
  skills text[] DEFAULT '{}',
  eligibility text NOT NULL,
  category text NOT NULL,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_id text UNIQUE NOT NULL,
  student_name text NOT NULL,
  program_name text NOT NULL,
  issue_date date NOT NULL,
  status text DEFAULT 'valid',
  created_at timestamptz DEFAULT now()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Programs policies
CREATE POLICY "Anyone can view active programs"
  ON programs FOR SELECT
  USING (status = 'active');

CREATE POLICY "Authenticated users can insert programs"
  ON programs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update programs"
  ON programs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Certificates policies
CREATE POLICY "Anyone can verify certificates"
  ON certificates FOR SELECT
  USING (status = 'valid');

CREATE POLICY "Authenticated users can insert certificates"
  ON certificates FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update certificates"
  ON certificates FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Contacts policies
CREATE POLICY "Anyone can submit contact forms"
  ON contacts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample programs
INSERT INTO programs (title, description, duration, skills, eligibility, category, status) VALUES
('Web Development Internship', 'Master modern web development with hands-on projects. Learn HTML, CSS, JavaScript, React, and build real-world applications with industry mentorship.', '8 weeks', ARRAY['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'Responsive Design'], 'Basic programming knowledge, passion for web development', 'Web Development', 'active'),
('Python Programming Internship', 'Dive deep into Python programming. Learn data structures, algorithms, automation, and build practical applications that solve real problems.', '6 weeks', ARRAY['Python', 'Data Structures', 'OOP', 'APIs', 'Automation', 'Testing'], 'Beginners welcome, logical thinking ability', 'Python', 'active'),
('AI & Machine Learning Track', 'Explore the world of artificial intelligence and machine learning. Work on real datasets, build ML models, and understand AI fundamentals.', '10 weeks', ARRAY['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis', 'Neural Networks', 'AI Ethics'], 'Python basics, mathematics fundamentals', 'Artificial Intelligence', 'active'),
('Full-Stack Development', 'Become a complete full-stack developer. Master both frontend and backend technologies, databases, APIs, and deploy production-ready applications.', '12 weeks', ARRAY['React', 'Node.js', 'Express', 'PostgreSQL', 'REST APIs', 'Deployment'], 'Web development basics, JavaScript knowledge', 'Full Stack', 'active'),
('Mobile App Development', 'Build native mobile applications for iOS and Android. Learn React Native and create cross-platform apps with modern development practices.', '8 weeks', ARRAY['React Native', 'JavaScript', 'Mobile UI/UX', 'APIs', 'App Deployment'], 'JavaScript fundamentals, web development basics', 'Mobile Development', 'active'),
('Data Science & Analytics', 'Learn to analyze data and extract insights. Master data visualization, statistical analysis, and data-driven decision making.', '10 weeks', ARRAY['Python', 'Pandas', 'NumPy', 'Data Visualization', 'SQL', 'Statistics'], 'Basic programming, analytical mindset', 'Data Science', 'active');

-- Insert sample certificates for verification demo
INSERT INTO certificates (certificate_id, student_name, program_name, issue_date, status) VALUES
('EZZCODE-2024-WD-001', 'Sarah Johnson', 'Web Development Internship', '2024-03-15', 'valid'),
('EZZCODE-2024-PY-002', 'Michael Chen', 'Python Programming Internship', '2024-02-28', 'valid'),
('EZZCODE-2024-AI-003', 'Priya Patel', 'AI & Machine Learning Track', '2024-01-20', 'valid'),
('EZZCODE-2024-FS-004', 'David Rodriguez', 'Full-Stack Development', '2024-03-10', 'valid');