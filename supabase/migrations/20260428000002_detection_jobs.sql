-- Async detection jobs for external providers such as Copyleaks.
--
-- The existing /api/detect flow is synchronous. Copyleaks returns results via
-- webhook, so requests need a durable job record that the dashboard can poll.

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

CREATE INDEX IF NOT EXISTS detection_jobs_user_created_at_idx
  ON public.detection_jobs(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS detection_jobs_reseller_created_at_idx
  ON public.detection_jobs(reseller_id, created_at DESC);

CREATE INDEX IF NOT EXISTS detection_jobs_institution_created_at_idx
  ON public.detection_jobs(institution_slug, created_at DESC)
  WHERE institution_slug IS NOT NULL;

CREATE INDEX IF NOT EXISTS detection_jobs_status_created_at_idx
  ON public.detection_jobs(status, created_at DESC);

CREATE INDEX IF NOT EXISTS detection_jobs_provider_text_sha_created_at_idx
  ON public.detection_jobs(provider, text_sha256, created_at DESC)
  WHERE text_sha256 IS NOT NULL;

ALTER TABLE public.detection_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own detection jobs"
  ON public.detection_jobs
  FOR SELECT
  USING (auth.uid() = user_id);

COMMENT ON TABLE public.detection_jobs IS
  'Async detection jobs for external providers such as Copyleaks.';

COMMENT ON COLUMN public.detection_jobs.reseller_id IS
  'Market-facing reseller brand, for example veritexto-br or veritexto-es.';

COMMENT ON COLUMN public.detection_jobs.institution_slug IS
  'Optional institution slug for future portal/workspace routing.';

COMMENT ON COLUMN public.detection_jobs.credit_cost IS
  'Credits reserved or deducted for this async provider job.';
