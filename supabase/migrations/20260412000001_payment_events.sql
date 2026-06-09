CREATE TABLE IF NOT EXISTS public.payment_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dedupe_key TEXT NOT NULL UNIQUE,
  event_name TEXT NOT NULL CHECK (event_name IN ('checkout_completed', 'credits_purchased', 'subscription_started')),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  brand TEXT NOT NULL,
  plan TEXT,
  quantity INTEGER,
  amount_minor INTEGER,
  currency TEXT,
  checkout_type TEXT CHECK (checkout_type IN ('credits', 'subscription')),
  stripe_event_id TEXT,
  stripe_session_id TEXT,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_events_created_at ON public.payment_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payment_events_event_name ON public.payment_events(event_name);
CREATE INDEX IF NOT EXISTS idx_payment_events_user_id ON public.payment_events(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_events_brand ON public.payment_events(brand);

ALTER TABLE public.payment_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payment events" ON public.payment_events
  FOR SELECT USING (auth.uid() = user_id);
