-- Migration: sync profiles & scans with application code
-- Date: 2026-03-17
-- Run in Supabase SQL Editor

-- ── 1. Expand plan CHECK constraint ─────────────────────────────────────────
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_plan_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_plan_check
  CHECK (plan IN ('free', 'student', 'starter', 'pro', 'equipe', 'departement', 'university', 'enterprise', 'limiar-vip'));

-- ── 2. Add missing columns to profiles ──────────────────────────────────────
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS monthly_usage INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS monthly_limit INTEGER DEFAULT 10;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS limit_email_sent_at TIMESTAMPTZ;

-- ── 3. Add scan_type to scans ───────────────────────────────────────────────
ALTER TABLE public.scans ADD COLUMN IF NOT EXISTS scan_type TEXT DEFAULT 'ai';
ALTER TABLE public.scans ADD CONSTRAINT scans_scan_type_check
  CHECK (scan_type IN ('ai', 'plagiarism'));
