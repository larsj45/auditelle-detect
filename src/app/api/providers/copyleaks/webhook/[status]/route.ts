import { NextRequest, NextResponse } from 'next/server'
import type {
  CopyleaksCompletedWebhookPayload,
  CopyleaksCompletedWebhookResult,
} from '@/lib/copyleaks'
import { isWebhookSecretValid, parseCopyleaksDeveloperPayload } from '@/lib/copyleaks'
import {
  findRecentCompletedDetectionJobByTextSha,
  getDetectionJob,
  updateDetectionJob,
} from '@/lib/detection-jobs'

type CopyleaksSourceType = 'internet' | 'database' | 'repository' | 'batch'

export const dynamic = 'force-dynamic'

function mapMatches(
  buckets: Array<[CopyleaksSourceType, CopyleaksCompletedWebhookResult[] | undefined]>,
  totalWords: number
) {
  const flat: Array<{
    source_type: CopyleaksSourceType
    source_url: string | null
    url: string | null
    source_title: string | null
    matched_text: string | null
    similarity: number | null
    similarity_score: number | null
    similarity_percentage: number | null
    matched_words: number
  }> = []

  for (const [sourceType, items] of buckets) {
    if (!items || items.length === 0) continue

    for (const match of items) {
      const similarity =
        totalWords > 0 && typeof match.matchedWords === 'number'
          ? Math.round((match.matchedWords / totalWords) * 1000) / 10
          : null

      flat.push({
        source_type: sourceType,
        source_url: match.url ?? match.metadata?.finalUrl ?? null,
        url: match.url ?? match.metadata?.finalUrl ?? null,
        source_title: match.title ?? null,
        matched_text: match.introduction ?? null,
        similarity,
        similarity_score: similarity,
        similarity_percentage: similarity,
        matched_words: match.matchedWords ?? 0,
      })
    }
  }

  flat.sort((a, b) => (b.matched_words ?? 0) - (a.matched_words ?? 0))
  return flat
}

function normalizeCopyleaksCompletedPayload(payload: CopyleaksCompletedWebhookPayload) {
  const totalWords = payload.scannedDocument?.totalWords ?? 0
  const sources = mapMatches(
    [
      ['internet', payload.results?.internet],
      ['database', payload.results?.database],
      ['repository', payload.results?.repositories],
      ['batch', payload.results?.batch],
    ],
    totalWords
  )

  return {
    plagiarism_detected: (payload.results?.score?.aggregatedScore ?? 0) > 0 || sources.length > 0,
    percent_plagiarized: payload.results?.score?.aggregatedScore ?? 0,
    matches: sources,
    sources,
    provider: 'copyleaks',
    provider_scan_id: payload.scannedDocument?.scanId ?? null,
    total_words: totalWords,
    match_counts: {
      internet: payload.results?.internet?.length ?? 0,
      database: payload.results?.database?.length ?? 0,
      repository: payload.results?.repositories?.length ?? 0,
      batch: payload.results?.batch?.length ?? 0,
    },
  }
}

function hasPositiveSimilarityResult(payload: Record<string, unknown> | null | undefined) {
  if (!payload) return false

  const percent = typeof payload.percent_plagiarized === 'number' ? payload.percent_plagiarized : null
  const sources = Array.isArray(payload.sources) ? payload.sources.length : 0

  return (percent ?? 0) > 0 || sources > 0
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ status: string }> }
) {
  let payload: Record<string, unknown>

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  const developerPayload = parseCopyleaksDeveloperPayload(payload.developerPayload)
  if (!developerPayload) {
    return NextResponse.json({ error: 'invalid developer payload' }, { status: 400 })
  }

  if (!isWebhookSecretValid(developerPayload.secret)) {
    return NextResponse.json({ error: 'invalid secret' }, { status: 401 })
  }

  const job = await getDetectionJob(developerPayload.jobId)
  if (!job) {
    return NextResponse.json({ error: 'job not found' }, { status: 404 })
  }

  const { status } = await context.params
  const webhookStatus = status.toLowerCase()

  if (job.status === 'completed') {
    return NextResponse.json({ ok: true, ignored: 'already_completed' })
  }

  if (job.status === 'error' && webhookStatus !== 'completed') {
    return NextResponse.json({ ok: true, ignored: 'already_errored' })
  }

  try {
    if (webhookStatus === 'completed') {
      const completedPayload = payload as unknown as CopyleaksCompletedWebhookPayload
      const normalizedPayload = normalizeCopyleaksCompletedPayload(completedPayload)
      let resultPayload: Record<string, unknown> = normalizedPayload

      if (
        normalizedPayload.percent_plagiarized === 0 &&
        normalizedPayload.sources.length === 0 &&
        job.text_sha256
      ) {
        const previousCompletedJob = await findRecentCompletedDetectionJobByTextSha({
          jobIdToExclude: job.id,
          capability: job.capability,
          provider: job.provider,
          resellerId: job.reseller_id,
          institutionSlug: job.institution_slug,
          textSha256: job.text_sha256,
        })

        if (hasPositiveSimilarityResult(previousCompletedJob?.result_payload)) {
          resultPayload = {
            ...(previousCompletedJob?.result_payload ?? {}),
            provider: 'copyleaks',
            provider_scan_id: completedPayload.scannedDocument?.scanId ?? job.provider_job_id,
            result_origin: 'copyleaks_same_text_sha_fallback',
            reused_from_detection_job_id: previousCompletedJob?.id ?? null,
            reused_from_provider_scan_id: previousCompletedJob?.provider_job_id ?? null,
          }
        }
      }

      await updateDetectionJob(job.id, {
        status: 'completed',
        provider_job_id: completedPayload.scannedDocument?.scanId ?? job.provider_job_id,
        result_payload: resultPayload,
        provider_payload: completedPayload,
        completed_at: new Date().toISOString(),
      })
    } else if (webhookStatus === 'error') {
      const errorPayload = payload as {
        error?: { message?: string }
        scannedDocument?: { scanId?: string }
      }

      await updateDetectionJob(job.id, {
        status: 'error',
        provider_job_id: errorPayload.scannedDocument?.scanId ?? job.provider_job_id,
        error_message: errorPayload.error?.message ?? 'Copyleaks scan failed',
        provider_payload: errorPayload,
      })
    } else {
      await updateDetectionJob(job.id, {
        status: 'processing',
        provider_payload: payload,
      })
    }
  } catch (error) {
    console.error('[copyleaks webhook] failed', error)
    return NextResponse.json({ error: 'update failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
