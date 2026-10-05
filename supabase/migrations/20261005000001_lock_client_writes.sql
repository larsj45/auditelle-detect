-- Lock client-side writes on billing-relevant tables.
-- =============================================================================
-- Found 2026-10-05: the "Users can update own profile" policy did not restrict
-- columns and anon/authenticated held UPDATE on every column of profiles,
-- including scan_credits, plan and subscription_status. A signed-in user could
-- raise their own credits through the Supabase REST API with the public key.
-- The app only reads profiles/scans from the browser; every write goes through
-- server routes with the service role, so these grants are not needed.
--
-- NOT YET APPLIED TO PRODUCTION. Requires Lars's authorisation.
-- =============================================================================

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
REVOKE UPDATE ON public.profiles FROM anon, authenticated;

DROP POLICY IF EXISTS "Users can insert own scans" ON public.scans;
REVOKE INSERT ON public.scans FROM anon, authenticated;
