import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Server-side Supabase client (for API routes)
export function createServerClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a dummy client that will fail gracefully at runtime
    console.warn('Missing Supabase environment variables. Database operations will fail.')
  }
  
  return createClient<Database>(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key',
    {
      auth: {
        persistSession: false,
      },
    }
  )
}
