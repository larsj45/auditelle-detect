-- Lock client-side writes on billing-relevant tables.
-- =============================================================================
-- Found 2026-10-05: the "Users can update own profile" policy did not restrict
-- columns and anon/authenticated held UPDATE on every column of profiles,
-- including scan_credits, plan and subscription_status. A signed-in user could
-- raise their own credits through the Supabase REST API with the public key.
-- The app only reads profiles/scans from the browser; every write goes through
-- server routes with the service role, so these grants are not needed.
--
-- Applied to production on 2026-10-05 (authorised by Lars).
-- =============================================================================

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
REVOKE UPDATE ON public.profiles FROM anon, authenticated;

DROP POLICY IF EXISTS "Users can insert own scans" ON public.scans;
REVOKE INSERT ON public.scans FROM anon, authenticated;

-- apply_credit_purchase (SECURITY DEFINER, credits Stripe purchases) was
-- executable by anon/authenticated through the default function privileges,
-- so anyone could credit any account via RPC. Only the Stripe webhook calls it,
-- with the service role.
DO $$
DECLARE f regprocedure;
BEGIN
  FOR f IN SELECT p.oid::regprocedure FROM pg_proc p
           WHERE p.pronamespace = 'public'::regnamespace AND p.proname = 'apply_credit_purchase'
  LOOP
    EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM PUBLIC, anon, authenticated', f);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO service_role', f);
  END LOOP;
END $$;
