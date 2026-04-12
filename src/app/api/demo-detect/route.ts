import { NextRequest, NextResponse } from 'next/server'
import { getResellerConfig } from '@/lib/config'

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

    const pangramKey = process.env.PANGRAM_API_KEY
    if (!pangramKey) {
      return NextResponse.json({ error: errors.serviceUnavailable }, { status: 503 })
    }

    if (mode === 'both') {
      const [aiResult, plagResult] = await Promise.allSettled([
        fetch('https://text.api.pangramlabs.com/v3', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': pangramKey
          },
          body: JSON.stringify({ text: text.slice(0, 2000) })
        }),
        fetch('https://plagiarism.api.pangram.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': pangramKey
          },
          body: JSON.stringify({ text: text.slice(0, 2000) })
        }),
      ])

      const aiRes = aiResult.status === 'fulfilled' ? aiResult.value : null
      const plagRes = plagResult.status === 'fulfilled' ? plagResult.value : null

      const aiData = aiRes?.ok ? await aiRes.json() : null
      const plagData = plagRes?.ok ? await plagRes.json() : null

      if (!aiData && !plagData) {
        if (aiRes && !aiRes.ok) {
          console.error('Pangram API error:', (await aiRes.text()).substring(0, 200))
        }
        if (plagRes && !plagRes.ok) {
          console.error('Pangram Plagiarism API error:', (await plagRes.text()).substring(0, 200))
        }
        return NextResponse.json({ error: errors.analysisError }, { status: 500 })
      }

      incrementRateLimit(ip)

      const aiScore = aiData ? Math.round((aiData.fraction_ai || 0) * 100) : null
      const heroStrings = config.strings.heroDemo
      const verdict = aiScore === null
        ? null
        : aiScore >= 80
          ? heroStrings.veryLikelyAI
          : aiScore >= 50
            ? heroStrings.possiblyAI
            : heroStrings.probablyHuman
      const sources = (plagData?.plagiarized_content || []).map((s: { source_url?: string; similarity_score?: number }) => ({
        url: s.source_url || '',
        similarity: Math.round(normalizePercent(s.similarity_score)),
      }))

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
      const plagRes = await fetch('https://plagiarism.api.pangram.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': pangramKey
        },
        body: JSON.stringify({ text: text.slice(0, 2000) })
      })

      if (!plagRes.ok) {
        console.error('Pangram Plagiarism API error:', (await plagRes.text()).substring(0, 200))
        return NextResponse.json({ error: errors.analysisError }, { status: 500 })
      }

      const plagData = await plagRes.json()

      incrementRateLimit(ip)

      const score = Math.round(normalizePercent(plagData.percent_plagiarized))
      const sources = (plagData.plagiarized_content || []).map((s: { source_url?: string; similarity_score?: number }) => ({
        url: s.source_url || '',
        similarity: Math.round(normalizePercent(s.similarity_score)),
      }))

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
    const pangramRes = await fetch('https://text.api.pangramlabs.com/v3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': pangramKey
      },
      body: JSON.stringify({ text: text.slice(0, 2000) })
    })

    if (!pangramRes.ok) {
      console.error('Pangram API error:', (await pangramRes.text()).substring(0, 200))
      return NextResponse.json({ error: errors.analysisError }, { status: 500 })
    }

    const pangramData = await pangramRes.json()

    incrementRateLimit(ip)

    const aiScore = Math.round((pangramData.fraction_ai || 0) * 100)
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
    return NextResponse.json({ error: errors.internalError }, { status: 500 })
  }
}
