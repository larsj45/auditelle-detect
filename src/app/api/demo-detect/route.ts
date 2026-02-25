import { NextRequest, NextResponse } from 'next/server'
import { getResellerConfig } from '@/lib/config'

// Simple in-memory rate limiter (resets on deploy)
const rateLimit = new Map<string, { count: number; resetAt: number }>()

const DAILY_LIMIT = 3
const DAY_MS = 24 * 60 * 60 * 1000

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

    if (text.trim().length < 50) {
      return NextResponse.json({ error: errors.textTooShort }, { status: 400 })
    }

    const pangramKey = process.env.PANGRAM_API_KEY
    if (!pangramKey) {
      return NextResponse.json({ error: errors.serviceUnavailable }, { status: 503 })
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

      const score = Math.round((plagData.percent_plagiarized || 0) * 100)
      const sources = (plagData.plagiarized_content || []).map((s: { source_url?: string; similarity_score?: number }) => ({
        url: s.source_url || '',
        similarity: Math.round((s.similarity_score || 0) * 100),
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
    const verdict = pangramData.headline
      || (aiScore >= 80 ? heroStrings.veryLikelyAI : aiScore >= 50 ? heroStrings.possiblyAI : heroStrings.probablyHuman)
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
