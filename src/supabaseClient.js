import { createClient } from '@supabase/supabase-js'

// TODO: Replace with your actual Supabase URL and Anon Key
const supabaseUrl = 'https://hgixehjrqlufdbjtnwyk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnaXhlaGpycWx1ZmRianRud3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MzI1MjMsImV4cCI6MjA5MjUwODUyM30.eElbRAiyw2lZ71l4U7L2J1_uYq5FfEjFrGgm80VX2Zs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
