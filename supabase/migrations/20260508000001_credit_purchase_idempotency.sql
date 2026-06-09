CREATE OR REPLACE FUNCTION public.apply_credit_purchase(
  p_dedupe_key TEXT,
  p_user_id UUID,
  p_brand TEXT,
  p_quantity INTEGER,
  p_amount_minor INTEGER,
  p_currency TEXT,
  p_stripe_event_id TEXT,
  p_stripe_session_id TEXT,
  p_stripe_customer_id TEXT,
  p_metadata JSONB DEFAULT '{}'::jsonb,
  p_landing_path TEXT DEFAULT NULL,
  p_referrer TEXT DEFAULT NULL,
  p_utm_source TEXT DEFAULT NULL,
  p_utm_medium TEXT DEFAULT NULL,
  p_utm_campaign TEXT DEFAULT NULL,
  p_utm_term TEXT DEFAULT NULL,
  p_utm_content TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  inserted_id UUID;
BEGIN
  IF p_user_id IS NULL OR COALESCE(p_quantity, 0) <= 0 THEN
    RETURN FALSE;
  END IF;

  INSERT INTO public.payment_events (
    dedupe_key,
    event_name,
    user_id,
    brand,
    quantity,
    amount_minor,
    currency,
    checkout_type,
    stripe_event_id,
    stripe_session_id,
    stripe_customer_id,
    metadata,
    landing_path,
    referrer,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content
  )
  VALUES (
    p_dedupe_key,
    'credits_purchased',
    p_user_id,
    p_brand,
    p_quantity,
    p_amount_minor,
    p_currency,
    'credits',
    p_stripe_event_id,
    p_stripe_session_id,
    p_stripe_customer_id,
    COALESCE(p_metadata, '{}'::jsonb),
    p_landing_path,
    p_referrer,
    p_utm_source,
    p_utm_medium,
    p_utm_campaign,
    p_utm_term,
    p_utm_content
  )
  ON CONFLICT (dedupe_key) DO NOTHING
  RETURNING id INTO inserted_id;

  IF inserted_id IS NULL THEN
    RETURN FALSE;
  END IF;

  UPDATE public.profiles
  SET
    scan_credits = COALESCE(scan_credits, 0) + p_quantity,
    stripe_customer_id = COALESCE(p_stripe_customer_id, stripe_customer_id)
  WHERE id = p_user_id;

  RETURN TRUE;
END;
$$;
