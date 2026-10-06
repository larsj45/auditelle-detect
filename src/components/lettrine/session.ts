import { supabase } from '@/lib/supabase'

// Read the access token at the moment of each request: supabase-js refreshes the
// session in the background, so a token captured on page load expires after an hour.
export async function currentAccessToken(): Promise<string | null> {
  const { data } = await supabase.auth.getSession()
  return data.session?.access_token ?? null
}
