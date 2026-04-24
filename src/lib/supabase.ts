import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Lazy singleton - only instantiated on first request, not at build time.
// This prevents the Next.js build from crashing when env vars are absent
// during the static page-data collection phase.
let _client: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient {
  if (_client) return _client

  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error(
      'Missing Supabase env vars - add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to Vercel'
    )
  }

  _client = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  return _client
}

// Convenience alias. Must be called inside a request handler, not at module top level.
export const getSupabase = getSupabaseClient
