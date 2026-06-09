import { NextRequest, NextResponse } from 'next/server'
import { detectAI, detectPlagiarism } from '@/lib/pangram'
import { createClient } from '@supabase/supabase-js'
import { getResellerConfig, DAILY_LIMITS, VALID_PLAN_IDS, MONTHLY_PLANS, CREDIT_PLANS } from '@/lib/config'
import { sendEmail, limitReachedEmail } from '@/lib/email'
import {
  buildCopyleaksDeveloperPayload,
  createCopyleaksScanId,
  submitCopyleaksPlagiarismTextScan,
} from '@/lib/copyleaks'
import { createDetectionJob, updateDetectionJob } from '@/lib/detection-jobs'
import { resolveDetectionProvider } from '@/lib/detection-providers'

export const dynamic = 'force-dynamic'

type DetectMode = 'ai' | 'plagiarism' | 'both'

function isDetectMode(value: unknown): value is DetectMode {
  return value === 'ai' || value === 'plagiarism' || value === 'both'
}

function getSafeErrorMessage(error: unknown) {
  return error instanceof Error ? error.message.substring(0, 200) : 'Unknown error'
}

function getSettledErrorMessage(result: PromiseSettledResult<unknown>) {
  return result.status === 'rejected' ? getSafeErrorMessage(result.reason) : 'No result'
}

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function parsePositiveInteger(value: string | undefined, fallback: number) {
  if (!value) return fallback
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback
}

function getCopyleaksCreditCost(mode: DetectMode) {
  if (mode === 'both') {
    return parsePositiveInteger(process.env.COPYLEAKS_COMPLETE_SCAN_CREDIT_COST, 3)
  }
  return parsePositiveInteger(process.env.COPYLEAKS_PLAGIARISM_CREDIT_COST, 2)
}

export async function POST(request: NextRequest) {
  const config = await getResellerConfig()
  const errors = config.strings.errors

  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: errors.unauthorized }, { status: 401 })
    }

    const match = authHeader.match(/^Bearer\s+(.+)$/)
    if (!match) return NextResponse.json({ error: errors.unauthorized }, { status: 401 })
    const token = match[1]

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: errors.unauthorized }, { status: 401 })
    }

    const serviceSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: profile } = await serviceSupabase
      .from('profiles')
      .select('plan, scans_today, scans_reset_at, scan_credits')
      .eq('id', user.id)
      .single()

    const plan = profile?.plan || 'free'
    const isCreditPlan = CREDIT_PLANS.has(plan)
    const limit = DAILY_LIMITS[plan] || 0

    const now = new Date()
    const todayUTC = now.toISOString().split('T')[0]
    let scansToday = profile?.scans_today || 0

    // ── Credit-based plans (pay-per-scan) ──────────────────────────────────
    if (isCreditPlan) {
      const credits = profile?.scan_credits || 0
      if (credits <= 0) {
        return NextResponse.json({
          error: errors.noCredits,
          scans_remaining: 0,
          needs_credits: true,
        }, { status: 402 })
      }
    }

    // ── Subscription-based plans (daily/monthly quota) ─────────────────────
    if (!isCreditPlan) {
      const resetAt = profile?.scans_reset_at ? new Date(profile.scans_reset_at) : null
      const isMonthlyPlan = MONTHLY_PLANS.has(plan)
      let shouldReset = false

      if (isMonthlyPlan) {
        const nowYM = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
        const resetYM = resetAt
          ? `${resetAt.getFullYear()}-${String(resetAt.getMonth() + 1).padStart(2, '0')}`
          : null
        shouldReset = !resetAt || nowYM !== resetYM
      } else {
        const resetDay = resetAt ? resetAt.toISOString().split('T')[0] : null
        shouldReset = !resetAt || todayUTC !== resetDay
      }

      if (shouldReset) {
        scansToday = 0
        await serviceSupabase
          .from('profiles')
          .update({ scans_today: 0, scans_reset_at: now.toISOString() })
          .eq('id', user.id)
      }

      if (scansToday >= limit) {
        if (scansToday === limit && user.email) {
          const { data: profileForEmail } = await serviceSupabase
            .from('profiles')
            .select('full_name, limit_email_sent_at, scans_reset_at')
            .eq('id', user.id)
            .single()

          const lastSentDate = profileForEmail?.limit_email_sent_at
            ? new Date(profileForEmail.limit_email_sent_at)
            : null
          const alreadySent = isMonthlyPlan
            ? lastSentDate && `${lastSentDate.getFullYear()}-${String(lastSentDate.getMonth() + 1).padStart(2, '0')}` === `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
            : lastSentDate && lastSentDate.toISOString().split('T')[0] === todayUTC
          if (!alreadySent) {
            const name = profileForEmail?.full_name?.split(' ')[0] || user.email.split('@')[0].split('+')[0]
            const emailContent = limitReachedEmail(config, name)
            sendEmail({ to: user.email, subject: emailContent.subject, html: emailContent.html, text: emailContent.text })
              .then(() => serviceSupabase.from('profiles').update({ limit_email_sent_at: new Date().toISOString() }).eq('id', user.id))
              .catch(console.error)
          }
        }

        return NextResponse.json({
          error: errors.dailyLimitReached,
          scans_remaining: 0,
        }, { status: 429 })
      }
    }

    const body = await request.json()
    const { text, mode = 'ai' } = body
    const institutionSlug = typeof body.institutionSlug === 'string' ? body.institutionSlug : undefined

    if (!text || typeof text !== 'string' || text.trim().length < 50) {
      return NextResponse.json({ error: errors.textTooShort }, { status: 400 })
    }

    if (!isDetectMode(mode)) {
      return NextResponse.json({ error: 'Mode invalide. Utilisez "ai", "plagiarism" ou "both".' }, { status: 400 })
    }

    // Security fix: max text length
    if (text.trim().length > 50000) {
      return NextResponse.json({ error: errors.textTooLong }, { status: 413 })
    }

    const trimmedText = text.trim()
    const plagiarismProviderDecision = mode === 'plagiarism' || mode === 'both'
      ? resolveDetectionProvider({
          capability: 'plagiarism',
          resellerId: config.id,
          institutionSlug,
        })
      : null

    // ── Helper: update usage after scan ──────────────────────────────────
    async function recordUsage(creditCost = 1) {
      const { data: freshProfile } = await serviceSupabase
        .from('profiles')
        .select('monthly_usage, scan_credits')
        .eq('id', user!.id)
        .single()
      const currentMonthlyUsage = freshProfile?.monthly_usage || 0

      if (isCreditPlan) {
        const currentCredits = freshProfile?.scan_credits || 0
        if (currentCredits < creditCost) return null

        await serviceSupabase
          .from('profiles')
          .update({
            scan_credits: currentCredits - creditCost,
            monthly_usage: currentMonthlyUsage + 1,
            scans_today: scansToday + 1,
          })
          .eq('id', user!.id)
        return currentCredits - creditCost
      } else {
        // Increment daily counter
        const { error: updateError } = await serviceSupabase
          .from('profiles')
          .update({ scans_today: scansToday + 1, monthly_usage: currentMonthlyUsage + 1 })
          .eq('id', user!.id)
          .eq('scans_today', scansToday)
        if (updateError) return null // concurrency conflict
        return limit - scansToday - 1
      }
    }

    async function queueCopyleaksPlagiarismJob(creditCost: number) {
      const job = await createDetectionJob({
        capability: 'plagiarism',
        provider: 'copyleaks',
        userId: user!.id,
        resellerId: config.id,
        institutionSlug,
        text: trimmedText,
        wordCount: countWords(trimmedText),
        creditCost,
      })
      const scanId = createCopyleaksScanId(job.id)

      try {
        await updateDetectionJob(job.id, {
          status: 'processing',
          provider_job_id: scanId,
        })

        await submitCopyleaksPlagiarismTextScan({
          scanId,
          text: trimmedText,
          filename: `${config.id}-${job.id}.txt`,
          developerPayload: buildCopyleaksDeveloperPayload(job.id),
        })

        return {
          jobId: job.id,
          providerJobId: scanId,
        }
      } catch (error) {
        await updateDetectionJob(job.id, {
          status: 'error',
          provider_job_id: scanId,
          error_message: getSafeErrorMessage(error),
        })
        throw error
      }
    }

    if (mode === 'both') {
      if (plagiarismProviderDecision?.provider === 'copyleaks') {
        const creditCost = getCopyleaksCreditCost(mode)
        const availableCredits = profile?.scan_credits || 0
        if (isCreditPlan && availableCredits < creditCost) {
          return NextResponse.json({
            error: errors.noCredits,
            scans_remaining: availableCredits,
            needs_credits: true,
          }, { status: 402 })
        }

        const [aiResult, copyleaksResult] = await Promise.allSettled([
          detectAI(trimmedText),
          queueCopyleaksPlagiarismJob(creditCost),
        ])

        const ai = aiResult.status === 'fulfilled' ? aiResult.value : null
        const copyleaksJob = copyleaksResult.status === 'fulfilled' ? copyleaksResult.value : null

        if (!ai && !copyleaksJob) {
          console.error('Combined detection failed:', {
            ai_error: getSettledErrorMessage(aiResult),
            plagiarism_error: getSettledErrorMessage(copyleaksResult),
          })
          return NextResponse.json({ error: errors.internalError }, { status: 500 })
        }

        const remaining = await recordUsage(creditCost)
        if (remaining === null) {
          return NextResponse.json({ error: errors.rateLimitRetry, scans_remaining: 0 }, { status: 429 })
        }

        const pendingPlagiarism = copyleaksJob
          ? {
              status: 'pending' as const,
              provider: 'copyleaks' as const,
              job_id: copyleaksJob.jobId,
              provider_job_id: copyleaksJob.providerJobId,
            }
          : null

        const fullResult = {
          mode: 'both' as const,
          ai,
          plagiarism: pendingPlagiarism,
          partial: !ai || !pendingPlagiarism,
          async: true,
          errors: {
            ...(ai ? {} : { ai: errors.analysisError }),
            ...(pendingPlagiarism ? {} : { plagiarism: errors.analysisError }),
          },
        }

        if (ai) {
          await serviceSupabase.from('scans').insert({
            user_id: user.id,
            text_snippet: trimmedText.substring(0, 200),
            ai_score: Math.round(ai.ai_likelihood * 100),
            detected_model: ai.headline || null,
            full_result: fullResult,
            scan_type: 'ai',
          })
        }

        return NextResponse.json({
          ...fullResult,
          scans_remaining: remaining,
        }, { status: 202 })
      }

      const [aiResult, plagResult] = await Promise.allSettled([
        detectAI(trimmedText),
        detectPlagiarism(trimmedText),
      ])

      const ai = aiResult.status === 'fulfilled' ? aiResult.value : null
      const plagiarism = plagResult.status === 'fulfilled' ? plagResult.value : null

      if (!ai && !plagiarism) {
        console.error('Combined detection failed:', {
          ai_error: getSettledErrorMessage(aiResult),
          plagiarism_error: getSettledErrorMessage(plagResult),
        })
        return NextResponse.json({ error: errors.internalError }, { status: 500 })
      }

      const remaining = await recordUsage()
      if (remaining === null) {
        return NextResponse.json({ error: errors.rateLimitRetry, scans_remaining: 0 }, { status: 429 })
      }

      const fullResult = {
        mode: 'both' as const,
        ai,
        plagiarism,
        partial: !ai || !plagiarism,
        errors: {
          ...(ai ? {} : { ai: errors.analysisError }),
          ...(plagiarism ? {} : { plagiarism: errors.analysisError }),
        },
      }

      await serviceSupabase.from('scans').insert({
        user_id: user.id,
        text_snippet: trimmedText.substring(0, 200),
        ai_score: plagiarism
          ? Math.round(plagiarism.percent_plagiarized)
          : Math.round((ai?.ai_likelihood ?? 0) * 100),
        detected_model: ai?.headline || null,
        full_result: fullResult,
        // The current DB constraint allows only single-engine scan types.
        // Combined integrity scans keep both engines in full_result.
        scan_type: plagiarism ? 'plagiarism' : 'ai',
      })

      return NextResponse.json({
        ...fullResult,
        scans_remaining: remaining,
      })
    }

    // Route to appropriate detection API
    if (mode === 'plagiarism') {
      if (plagiarismProviderDecision?.provider === 'copyleaks') {
        const creditCost = getCopyleaksCreditCost(mode)
        const availableCredits = profile?.scan_credits || 0
        if (isCreditPlan && availableCredits < creditCost) {
          return NextResponse.json({
            error: errors.noCredits,
            scans_remaining: availableCredits,
            needs_credits: true,
          }, { status: 402 })
        }

        const copyleaksJob = await queueCopyleaksPlagiarismJob(creditCost)
        const remaining = await recordUsage(creditCost)
        if (remaining === null) {
          return NextResponse.json({ error: errors.rateLimitRetry, scans_remaining: 0 }, { status: 429 })
        }

        return NextResponse.json({
          mode: 'plagiarism',
          status: 'pending',
          provider: 'copyleaks',
          job_id: copyleaksJob.jobId,
          provider_job_id: copyleaksJob.providerJobId,
          scans_remaining: remaining,
        }, { status: 202 })
      }

      const plagResult = await detectPlagiarism(trimmedText)
      const remaining = await recordUsage()
      if (remaining === null) {
        return NextResponse.json({ error: errors.rateLimitRetry, scans_remaining: 0 }, { status: 429 })
      }

      await serviceSupabase.from('scans').insert({
        user_id: user.id,
        text_snippet: trimmedText.substring(0, 200),
        ai_score: Math.round(plagResult.percent_plagiarized),
        detected_model: null,
        full_result: plagResult,
        scan_type: 'plagiarism',
      })

      return NextResponse.json({
        ...plagResult,
        scans_remaining: remaining,
      })
    }

    // Default: AI detection
    const result = await detectAI(trimmedText)
    const remaining = await recordUsage()
    if (remaining === null) {
      return NextResponse.json({ error: errors.rateLimitRetry, scans_remaining: 0 }, { status: 429 })
    }

    await serviceSupabase.from('scans').insert({
      user_id: user.id,
      text_snippet: trimmedText.substring(0, 200),
      ai_score: Math.round(result.ai_likelihood * 100),
      detected_model: result.headline || null,
      full_result: result,
      scan_type: 'ai',
    })

    return NextResponse.json({
      ...result,
      scans_remaining: remaining,
    })
  } catch (error: unknown) {
    console.error('Detection error:', error)
    // Security fix: don't leak internal error messages in production
    const isDev = process.env.NODE_ENV === 'development'
    const message = isDev && error instanceof Error ? error.message : errors.internalError
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
