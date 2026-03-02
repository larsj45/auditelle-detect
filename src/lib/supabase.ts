import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy singleton — prevents build-time error when env vars aren't available
let _supabase: SupabaseClient | null = null

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'http://localhost:54321'
}

function getAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
}

export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (!_supabase) {
      const key = getAnonKey()
      if (!key) {
        return () => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
      }
      _supabase = createClient(getSupabaseUrl(), key)
    }
    return (_supabase as any)[prop]
  }
})

export function getSupabaseServer() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
  return createClient(getSupabaseUrl(), serviceRoleKey);
}
