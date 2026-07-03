-- Idempotent Stripe credit fulfillment.
--
-- Stripe can retry checkout.session.completed events. This table records the
-- fulfilled checkout session before credits are added, so duplicate deliveries
-- are acknowledged without granting credits twice.

CREATE TABLE IF NOT EXISTS public.payment_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id TEXT UNIQUE,
  checkout_session_id TEXT UNIQUE,
  event_type TEXT NOT NULL DEFAULT 'checkout.session.completed',
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  stripe_customer_id TEXT,
  amount_total INTEGER,
  currency TEXT,
  credits_quantity INTEGER,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_events_user_id ON public.payment_events(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_events_created_at ON public.payment_events(created_at DESC);

ALTER TABLE public.payment_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages payment events" ON public.payment_events
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.apply_credit_purchase(
  p_user_id UUID,
  p_quantity INTEGER,
  p_stripe_event_id TEXT,
  p_checkout_session_id TEXT,
  p_stripe_customer_id TEXT,
  p_amount_total INTEGER,
  p_currency TEXT,
  p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_user_id IS NULL OR p_quantity IS NULL OR p_quantity <= 0 THEN
    RAISE EXCEPTION 'Invalid credit purchase payload';
  END IF;

  INSERT INTO public.payment_events (
    stripe_event_id,
    checkout_session_id,
    user_id,
    stripe_customer_id,
    amount_total,
    currency,
    credits_quantity,
    metadata
  )
  VALUES (
    p_stripe_event_id,
    p_checkout_session_id,
    p_user_id,
    p_stripe_customer_id,
    p_amount_total,
    p_currency,
    p_quantity,
    COALESCE(p_metadata, '{}'::jsonb)
  );

  UPDATE public.profiles
  SET
    scan_credits = COALESCE(scan_credits, 0) + p_quantity,
    stripe_customer_id = COALESCE(p_stripe_customer_id, stripe_customer_id)
  WHERE id = p_user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Profile not found for credit purchase';
  END IF;

  RETURN TRUE;
EXCEPTION
  WHEN unique_violation THEN
    RETURN FALSE;
END;
$$;

GRANT EXECUTE ON FUNCTION public.apply_credit_purchase(
  UUID,
  INTEGER,
  TEXT,
  TEXT,
  TEXT,
  INTEGER,
  TEXT,
  JSONB
) TO service_role;
