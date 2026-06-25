-- Institutional pilot grant flag
-- =============================================================================
-- Tracks whether the one-time institutional pilot credit grant has run for a
-- profile. Set by the server (auth/callback) after exchangeCodeForSession, so
-- the grant is idempotent and never re-applies on subsequent logins.
--
-- NOTE: NOT YET APPLIED TO PRODUCTION. Apply via Supabase SQL editor / CLI
-- before deploying the Verify pilot mechanic.
-- =============================================================================

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS pilot_credits_granted BOOLEAN DEFAULT FALSE;

-- Existing users predate the pilot mechanic: treat them as already processed
-- so the backfill never grants them retroactive credits.
UPDATE public.profiles SET pilot_credits_granted = TRUE WHERE pilot_credits_granted IS NULL OR pilot_credits_granted = FALSE;
