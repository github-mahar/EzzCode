import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fulhysevybbveytqgeqy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1bGh5c2V2eWJidmV5dHFnZXF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4OTE1MDAsImV4cCI6MjA4MzQ2NzUwMH0.__fG4RYMuKyNYQg3yjON-iiwWFScwvsVG-a84VG3PY0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  skills: string[];
  eligibility: string;
  category: string;
  status: string;
  created_at: string;
}

export interface Certificate {
  id: string;
  certificate_id: string;
  student_name: string;
  program_name: string;
  issue_date: string;
  status: string;
  created_at: string;
}

export interface Contact {
  name: string;
  email: string;
  message: string;
}
