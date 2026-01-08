import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
