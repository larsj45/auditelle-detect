import { NextRequest, NextResponse } from 'next/server'
import { getResellerConfig } from '@/lib/config'
import { detectAI, detectPlagiarism, type PlagiarismResult } from '@/lib/pangram'

export const dynamic = 'force-dynamic'


// Simple in-memory rate limiter (resets on deploy)
const rateLimit = new Map<string, { count: number; resetAt: number }>()

const DAILY_LIMIT = 3
const DAY_MS = 24 * 60 * 60 * 1000

type DetectMode = 'ai' | 'plagiarism' | 'both'

function isDetectMode(value: unknown): value is DetectMode {
  return value === 'ai' || value === 'plagiarism' || value === 'both'
}

function asFiniteNumber(value: unknown): number | null {
  const numberValue = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(numberValue) ? numberValue : null
}

function normalizePercent(value: unknown): number {
  const numberValue = asFiniteNumber(value)
  if (numberValue === null) return 0
  return numberValue <= 1 ? numberValue * 100 : numberValue
}

function plagiarismSources(result: PlagiarismResult) {
  return result.plagiarized_content.map(source => ({
    url: source.source_url,
    similarity: Math.round(normalizePercent(source.similarity_score)),
  }))
}

function settledError(result: PromiseSettledResult<unknown>): string | undefined {
  if (result.status === 'fulfilled') return undefined
  return result.reason instanceof Error ? result.reason.message.slice(0, 500) : 'Unknown error'
}

function getRateLimitInfo(ip: string) {
  const now = Date.now()
  const entry = rateLimit.get(ip)

  if (!entry || now > entry.resetAt) {
    return { count: 0, resetAt: now + DAY_MS }
  }

  return entry
}

function incrementRateLimit(ip: string) {
  const info = getRateLimitInfo(ip)
  rateLimit.set(ip, { count: info.count + 1, resetAt: info.resetAt })
}

export async function POST(request: NextRequest) {
  const config = await getResellerConfig()
  const errors = config.strings.errors

  try {
    const forwardedFor = request.headers.get('x-forwarded-for')
    const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown'

    const limitInfo = getRateLimitInfo(ip)
    if (limitInfo.count >= DAILY_LIMIT) {
      return NextResponse.json(
        { error: errors.demoLimitReached },
        { status: 429 }
      )
    }

    const { text, mode = 'ai' } = await request.json()

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: errors.textTooShort }, { status: 400 })
    }

    if (!isDetectMode(mode)) {
      return NextResponse.json({ error: 'Mode invalide. Utilisez "ai", "plagiarism" ou "both".' }, { status: 400 })
    }

    if (text.trim().length < 50) {
      return NextResponse.json({ error: errors.textTooShort }, { status: 400 })
    }

    if (!process.env.PANGRAM_API_KEY && process.env.PANGRAM_MOCK_RESPONSES !== '1') {
      return NextResponse.json({ error: errors.serviceUnavailable }, { status: 503 })
    }

    if (mode === 'both') {
      const [aiResult, plagResult] = await Promise.allSettled([
        detectAI(text.slice(0, 2000)),
        detectPlagiarism(text.slice(0, 2000)),
      ])

      const aiData = aiResult.status === 'fulfilled' ? aiResult.value : null
      const plagData = plagResult.status === 'fulfilled' ? plagResult.value : null

      if (!aiData && !plagData) {
        console.error('Demo combined detection failed:', {
          ai_error: settledError(aiResult),
          plagiarism_error: settledError(plagResult),
        })
        return NextResponse.json({ error: errors.analysisError }, { status: 500 })
      }

      incrementRateLimit(ip)

      const aiScore = aiData ? Math.round(aiData.ai_likelihood * 100) : null
      const heroStrings = config.strings.heroDemo
      const verdict = aiScore === null
        ? null
        : aiScore >= 80
          ? heroStrings.veryLikelyAI
          : aiScore >= 50
            ? heroStrings.possiblyAI
            : heroStrings.probablyHuman
      const sources = plagData ? plagiarismSources(plagData) : []

      return NextResponse.json({
        mode: 'both',
        ai: aiData ? {
          score: aiScore,
          model: aiData.prediction_short || null,
          verdict,
          isAI: (aiScore ?? 0) >= 50,
        } : null,
        plagiarism: plagData ? {
          plagiarism_detected: plagData.plagiarism_detected ?? false,
          score: Math.round(normalizePercent(plagData.percent_plagiarized)),
          source_count: sources.length,
          sources,
        } : null,
        partial: !aiData || !plagData,
        remaining: DAILY_LIMIT - limitInfo.count - 1
      })
    }

    // Route to plagiarism API
    if (mode === 'plagiarism') {
      const plagData = await detectPlagiarism(text.slice(0, 2000))

      incrementRateLimit(ip)

      const score = Math.round(normalizePercent(plagData.percent_plagiarized))
      const sources = plagiarismSources(plagData)

      return NextResponse.json({
        mode: 'plagiarism',
        plagiarism_detected: plagData.plagiarism_detected ?? false,
        score,
        source_count: sources.length,
        sources,
        remaining: DAILY_LIMIT - limitInfo.count - 1
      })
    }

    // Default: AI detection
    const pangramData = await detectAI(text.slice(0, 2000))

    incrementRateLimit(ip)

    const aiScore = Math.round(pangramData.ai_likelihood * 100)
    const heroStrings = config.strings.heroDemo
    const verdict = aiScore >= 80 ? heroStrings.veryLikelyAI : aiScore >= 50 ? heroStrings.possiblyAI : heroStrings.probablyHuman
    return NextResponse.json({
      mode: 'ai',
      score: aiScore,
      model: pangramData.prediction_short || null,
      verdict,
      isAI: aiScore >= 50,
      remaining: DAILY_LIMIT - limitInfo.count - 1
    })

  } catch (error) {
    console.error('Demo detect error:', error)
    const isProviderError = error instanceof Error && error.message.startsWith('Pangram')
    return NextResponse.json(
      { error: isProviderError ? errors.analysisError : errors.internalError },
      { status: 500 },
    )
  }
}
