import crypto from 'node:crypto'
import { getSupabaseServer } from '@/lib/supabase'

export type DetectionJobCapability = 'plagiarism'
export type DetectionJobProvider = 'copyleaks'
export type DetectionJobStatus = 'queued' | 'processing' | 'completed' | 'error'

export interface DetectionJobRecord {
  id: string
  capability: DetectionJobCapability
  provider: DetectionJobProvider
  status: DetectionJobStatus
  user_id: string | null
  reseller_id: string
  institution_slug: string | null
  provider_job_id: string | null
  text_sha256: string | null
  word_count: number | null
  credit_cost: number
  error_message: string | null
  result_payload: Record<string, unknown> | null
  provider_payload: Record<string, unknown> | null
  created_at: string
  updated_at: string
  completed_at: string | null
}

export interface CreateDetectionJobInput {
  capability: DetectionJobCapability
  provider: DetectionJobProvider
  userId?: string | null
  resellerId: string
  institutionSlug?: string | null
  text: string
  wordCount: number
  creditCost: number
  providerJobId?: string | null
}

export interface FindRecentCompletedDetectionJobInput {
  jobIdToExclude?: string
  capability: DetectionJobCapability
  provider: DetectionJobProvider
  resellerId: string
  institutionSlug?: string | null
  textSha256?: string | null
}

function normalizeToken(value: string) {
  return value.trim().toLowerCase()
}

function normalizeOptionalToken(value: string | null | undefined) {
  const normalized = value ? normalizeToken(value) : ''
  return normalized || null
}

export function sha256Text(input: string) {
  return crypto.createHash('sha256').update(input, 'utf8').digest('hex')
}

export async function createDetectionJob(input: CreateDetectionJobInput) {
  const supabase = getSupabaseServer()
  const { data, error } = await supabase
    .from('detection_jobs')
    .insert({
      capability: input.capability,
      provider: input.provider,
      status: 'queued',
      user_id: input.userId ?? null,
      reseller_id: normalizeToken(input.resellerId),
      institution_slug: normalizeOptionalToken(input.institutionSlug),
      provider_job_id: input.providerJobId ?? null,
      text_sha256: sha256Text(input.text),
      word_count: input.wordCount,
      credit_cost: input.creditCost,
    })
    .select('*')
    .single()

  if (error || !data) {
    throw new Error(error?.message ?? 'Failed to create detection job')
  }

  return data as DetectionJobRecord
}

export async function updateDetectionJob(jobId: string, patch: Record<string, unknown>) {
  const supabase = getSupabaseServer()
  const { data, error } = await supabase
    .from('detection_jobs')
    .update({
      ...patch,
      updated_at: new Date().toISOString(),
    })
    .eq('id', jobId)
    .select('*')
    .single()

  if (error || !data) {
    throw new Error(error?.message ?? 'Failed to update detection job')
  }

  return data as DetectionJobRecord
}

export async function getDetectionJob(jobId: string) {
  const supabase = getSupabaseServer()
  const { data, error } = await supabase
    .from('detection_jobs')
    .select('*')
    .eq('id', jobId)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  return (data as DetectionJobRecord | null) ?? null
}

export async function getDetectionJobForUser(jobId: string, userId: string) {
  const supabase = getSupabaseServer()
  const { data, error } = await supabase
    .from('detection_jobs')
    .select('*')
    .eq('id', jobId)
    .eq('user_id', userId)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  return (data as DetectionJobRecord | null) ?? null
}

export async function findRecentCompletedDetectionJobByTextSha(input: FindRecentCompletedDetectionJobInput) {
  if (!input.textSha256) {
    return null
  }

  const supabase = getSupabaseServer()
  const institutionSlug = normalizeOptionalToken(input.institutionSlug)

  let query = supabase
    .from('detection_jobs')
    .select('*')
    .eq('capability', input.capability)
    .eq('provider', input.provider)
    .eq('status', 'completed')
    .eq('reseller_id', normalizeToken(input.resellerId))
    .eq('text_sha256', input.textSha256)
    .order('created_at', { ascending: false })
    .limit(5)

  if (institutionSlug) {
    query = query.eq('institution_slug', institutionSlug)
  } else {
    query = query.is('institution_slug', null)
  }

  if (input.jobIdToExclude) {
    query = query.neq('id', input.jobIdToExclude)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  const candidates = (data as DetectionJobRecord[] | null) ?? []
  const originalCandidate =
    candidates.find((candidate) => candidate.result_payload?.result_origin !== 'copyleaks_same_text_sha_fallback') ??
    null

  return originalCandidate ?? candidates[0] ?? null
}
