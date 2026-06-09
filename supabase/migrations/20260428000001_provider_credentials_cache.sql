-- Persistent credential cache for external detection providers.
--
-- Copyleaks issues short-lived access tokens. In serverless environments,
-- module-level token caches are lost on cold starts and can create repeated
-- provider login calls. This table gives service-role code a shared cache.

CREATE TABLE IF NOT EXISTS public.provider_credentials_cache (
  provider TEXT PRIMARY KEY CHECK (provider IN ('copyleaks', 'pangram', 'gptzero')),
  access_token TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS provider_credentials_cache_expires_at_idx
  ON public.provider_credentials_cache(expires_at);

ALTER TABLE public.provider_credentials_cache ENABLE ROW LEVEL SECURITY;

-- Deny all anon/authenticated access. Service-role clients bypass RLS.
CREATE POLICY "deny all provider credentials cache access"
  ON public.provider_credentials_cache
  FOR ALL
  USING (FALSE)
  WITH CHECK (FALSE);

COMMENT ON TABLE public.provider_credentials_cache IS
  'Cached access tokens for external detection providers. Service-role access only.';
