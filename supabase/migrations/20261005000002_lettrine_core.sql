-- Lettrine self-service core (journals): organisations, members, analyses and
-- a unit ledger. Isolated from the education product's profiles/credits.
-- =============================================================================
-- Spec: lars-vault business/auditelle/lettrine/spec-self-service-2026-10.md
-- Browser clients can only READ rows of their own organisation. Every write
-- goes through server routes (service role) or the SECURITY DEFINER functions
-- below, which are not executable by anon/authenticated.
--
-- NOT YET APPLIED. Requires Lars's authorisation.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.lettrine_orgs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 200),
  locale TEXT NOT NULL CHECK (locale IN ('sv', 'fr')),
  email_domain TEXT NOT NULL,
  terms_version TEXT NOT NULL,
  terms_accepted_at TIMESTAMPTZ NOT NULL,
  terms_accepted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.lettrine_members (
  org_id UUID NOT NULL REFERENCES public.lettrine_orgs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('owner', 'editor')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (org_id, user_id),
  -- v1: one organisation per user.
  UNIQUE (user_id)
);

-- The free trial is granted once per email domain, whatever the number of orgs.
CREATE TABLE IF NOT EXISTS public.lettrine_trial_grants (
  email_domain TEXT PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES public.lettrine_orgs(id) ON DELETE CASCADE,
  units INTEGER NOT NULL CHECK (units > 0),
  granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.lettrine_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES public.lettrine_orgs(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  manuscript_ref TEXT NOT NULL CHECK (char_length(manuscript_ref) BETWEEN 1 AND 120),
  title TEXT CHECK (title IS NULL OR char_length(title) <= 300),
  word_count INTEGER NOT NULL CHECK (word_count > 0),
  units INTEGER NOT NULL CHECK (units > 0),
  ai_result JSONB,
  similarity_result JSONB,
  decision TEXT CHECK (decision IS NULL OR decision IN ('proceed', 'clarify', 'reject_other', 'no_action')),
  decision_note TEXT CHECK (decision_note IS NULL OR char_length(decision_note) <= 4000),
  decided_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  decided_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  delete_after TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '180 days')
);

CREATE TABLE IF NOT EXISTS public.lettrine_unit_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES public.lettrine_orgs(id) ON DELETE CASCADE,
  delta INTEGER NOT NULL CHECK (delta <> 0),
  reason TEXT NOT NULL CHECK (reason IN ('trial', 'purchase', 'analysis', 'refund', 'adjustment')),
  analysis_id UUID REFERENCES public.lettrine_analyses(id) ON DELETE SET NULL,
  stripe_checkout_session_id TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lettrine_analyses_org_created ON public.lettrine_analyses(org_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lettrine_analyses_delete_after ON public.lettrine_analyses(delete_after);
CREATE INDEX IF NOT EXISTS idx_lettrine_ledger_org ON public.lettrine_unit_ledger(org_id);

-- ── Access control ───────────────────────────────────────────────────────────
ALTER TABLE public.lettrine_orgs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lettrine_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lettrine_trial_grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lettrine_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lettrine_unit_ledger ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.lettrine_orgs, public.lettrine_members, public.lettrine_trial_grants,
  public.lettrine_analyses, public.lettrine_unit_ledger FROM anon, authenticated;
GRANT SELECT ON public.lettrine_orgs, public.lettrine_members,
  public.lettrine_analyses, public.lettrine_unit_ledger TO authenticated;

CREATE OR REPLACE FUNCTION public.lettrine_is_member(p_org UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.lettrine_members m
    WHERE m.org_id = p_org AND m.user_id = auth.uid()
  );
$$;
REVOKE ALL ON FUNCTION public.lettrine_is_member(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.lettrine_is_member(UUID) TO authenticated;

CREATE POLICY "Members read their organisation" ON public.lettrine_orgs
  FOR SELECT TO authenticated USING (public.lettrine_is_member(id));
CREATE POLICY "Members read their membership rows" ON public.lettrine_members
  FOR SELECT TO authenticated USING (public.lettrine_is_member(org_id));
CREATE POLICY "Members read their analyses" ON public.lettrine_analyses
  FOR SELECT TO authenticated USING (public.lettrine_is_member(org_id));
CREATE POLICY "Members read their ledger" ON public.lettrine_unit_ledger
  FOR SELECT TO authenticated USING (public.lettrine_is_member(org_id));

-- ── Units ────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.lettrine_org_balance(p_org UUID)
RETURNS INTEGER
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT COALESCE(SUM(delta), 0)::INTEGER FROM public.lettrine_unit_ledger WHERE org_id = p_org;
$$;

-- Debits units for an analysis atomically; raises 'insufficient_units' when the
-- balance does not cover it. The org row lock serialises concurrent debits.
CREATE OR REPLACE FUNCTION public.lettrine_consume_units(p_org UUID, p_units INTEGER, p_analysis UUID)
RETURNS INTEGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_balance INTEGER;
BEGIN
  IF p_units IS NULL OR p_units <= 0 THEN
    RAISE EXCEPTION 'invalid_units';
  END IF;
  PERFORM 1 FROM public.lettrine_orgs WHERE id = p_org FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'unknown_org';
  END IF;
  v_balance := public.lettrine_org_balance(p_org);
  IF v_balance < p_units THEN
    RAISE EXCEPTION 'insufficient_units';
  END IF;
  INSERT INTO public.lettrine_unit_ledger (org_id, delta, reason, analysis_id)
  VALUES (p_org, -p_units, 'analysis', p_analysis);
  RETURN v_balance - p_units;
END;
$$;

-- Grants the free trial once per email domain. Returns TRUE when granted.
CREATE OR REPLACE FUNCTION public.lettrine_grant_trial(p_org UUID, p_domain TEXT, p_units INTEGER)
RETURNS BOOLEAN
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.lettrine_trial_grants (email_domain, org_id, units)
  VALUES (lower(p_domain), p_org, p_units)
  ON CONFLICT (email_domain) DO NOTHING;
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;
  INSERT INTO public.lettrine_unit_ledger (org_id, delta, reason)
  VALUES (p_org, p_units, 'trial');
  RETURN TRUE;
END;
$$;

-- Credits a Stripe purchase once per checkout session. Returns FALSE on replay.
CREATE OR REPLACE FUNCTION public.lettrine_credit_purchase(p_org UUID, p_units INTEGER, p_checkout_session TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.lettrine_unit_ledger (org_id, delta, reason, stripe_checkout_session_id)
  VALUES (p_org, p_units, 'purchase', p_checkout_session);
  RETURN TRUE;
EXCEPTION WHEN unique_violation THEN
  RETURN FALSE;
END;
$$;

REVOKE ALL ON FUNCTION public.lettrine_org_balance(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.lettrine_consume_units(UUID, INTEGER, UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.lettrine_grant_trial(UUID, TEXT, INTEGER) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.lettrine_credit_purchase(UUID, INTEGER, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.lettrine_org_balance(UUID) TO service_role;
GRANT EXECUTE ON FUNCTION public.lettrine_consume_units(UUID, INTEGER, UUID) TO service_role;
GRANT EXECUTE ON FUNCTION public.lettrine_grant_trial(UUID, TEXT, INTEGER) TO service_role;
GRANT EXECUTE ON FUNCTION public.lettrine_credit_purchase(UUID, INTEGER, TEXT) TO service_role;
