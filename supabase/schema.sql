-- Auditelle Database Schema
-- Run this in Supabase SQL Editor

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'university', 'enterprise', 'limiar-vip')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  scan_credits INTEGER DEFAULT 0,
  scans_today INTEGER DEFAULT 0,
  scans_reset_at TIMESTAMPTZ DEFAULT NOW(),
  monthly_usage INTEGER DEFAULT 0,
  monthly_limit INTEGER DEFAULT 0,
  limit_email_sent_at TIMESTAMPTZ,
  subscription_status TEXT,
  upgrade_reminder_sent BOOLEAN DEFAULT FALSE,
  trial_ends_at TIMESTAMPTZ,
  trial_reminder_days_sent INTEGER[] DEFAULT '{}',
  trial_ended_email_sent BOOLEAN DEFAULT FALSE,
  welcome_email_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scans table
CREATE TABLE IF NOT EXISTS public.scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  text_snippet TEXT,
  ai_score FLOAT,
  detected_model TEXT,
  full_result JSONB,
  scan_type TEXT DEFAULT 'ai' CHECK (scan_type IN ('ai', 'plagiarism')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payment events table (server-side checkout/subscription tracking)
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
  landing_path TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  stripe_event_id TEXT,
  stripe_session_id TEXT,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Provider credentials cache table (service-role only)
CREATE TABLE IF NOT EXISTS public.provider_credentials_cache (
  provider TEXT PRIMARY KEY CHECK (provider IN ('copyleaks', 'pangram', 'gptzero')),
  access_token TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Async detection jobs table
CREATE TABLE IF NOT EXISTS public.detection_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  capability TEXT NOT NULL CHECK (capability IN ('plagiarism')),
  provider TEXT NOT NULL CHECK (provider IN ('copyleaks')),
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'completed', 'error')),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  reseller_id TEXT NOT NULL,
  institution_slug TEXT,
  provider_job_id TEXT UNIQUE,
  text_sha256 TEXT,
  word_count INTEGER CHECK (word_count IS NULL OR word_count >= 0),
  credit_cost INTEGER NOT NULL DEFAULT 1 CHECK (credit_cost >= 0),
  error_message TEXT,
  result_payload JSONB,
  provider_payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_scans_user_id ON public.scans(user_id);
CREATE INDEX IF NOT EXISTS idx_scans_created_at ON public.scans(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer ON public.profiles(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_subscription ON public.profiles(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_payment_events_created_at ON public.payment_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payment_events_event_name ON public.payment_events(event_name);
CREATE INDEX IF NOT EXISTS idx_payment_events_user_id ON public.payment_events(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_events_brand ON public.payment_events(brand);
CREATE INDEX IF NOT EXISTS idx_payment_events_utm_source ON public.payment_events(utm_source);
CREATE INDEX IF NOT EXISTS idx_payment_events_utm_campaign ON public.payment_events(utm_campaign);
CREATE INDEX IF NOT EXISTS provider_credentials_cache_expires_at_idx ON public.provider_credentials_cache(expires_at);
CREATE INDEX IF NOT EXISTS detection_jobs_user_created_at_idx ON public.detection_jobs(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS detection_jobs_reseller_created_at_idx ON public.detection_jobs(reseller_id, created_at DESC);
CREATE INDEX IF NOT EXISTS detection_jobs_institution_created_at_idx ON public.detection_jobs(institution_slug, created_at DESC) WHERE institution_slug IS NOT NULL;
CREATE INDEX IF NOT EXISTS detection_jobs_status_created_at_idx ON public.detection_jobs(status, created_at DESC);
CREATE INDEX IF NOT EXISTS detection_jobs_provider_text_sha_created_at_idx ON public.detection_jobs(provider, text_sha256, created_at DESC) WHERE text_sha256 IS NOT NULL;

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_credentials_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.detection_jobs ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Profiles: users can update their own profile (limited fields)
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Scans: users can view their own scans
CREATE POLICY "Users can view own scans" ON public.scans
  FOR SELECT USING (auth.uid() = user_id);

-- Scans: users can insert their own scans
CREATE POLICY "Users can insert own scans" ON public.scans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Payment events: users can read their own payment history
CREATE POLICY "Users can view own payment events" ON public.payment_events
  FOR SELECT USING (auth.uid() = user_id);

-- Provider credentials cache: service-role only
CREATE POLICY "deny all provider credentials cache access" ON public.provider_credentials_cache
  FOR ALL USING (FALSE)
  WITH CHECK (FALSE);

-- Detection jobs: users can poll their own jobs
CREATE POLICY "Users can view own detection jobs" ON public.detection_jobs
  FOR SELECT USING (auth.uid() = user_id);

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, scan_credits, monthly_limit, trial_ends_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    0,
    0,
    NULL
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: auto-create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- API health monitoring log (written by cron, no RLS needed)
CREATE TABLE IF NOT EXISTS public.api_health_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint TEXT NOT NULL,
  status TEXT NOT NULL,
  status_code INTEGER,
  message TEXT,
  latency_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_api_health_log_created_at ON public.api_health_log(created_at DESC);
