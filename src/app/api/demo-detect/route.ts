import { NextRequest, NextResponse } from 'next/server'
import { getResellerConfig } from '@/lib/config'
import { detectAI, detectPlagiarism } from '@/lib/pangram'

export const dynamic = 'force-dynamic'


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

    // Route to plagiarism API
    if (mode === 'plagiarism') {
      const plagData = await detectPlagiarism(text.slice(0, 2000))

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
    const pangramData = await detectAI(text.slice(0, 2000))

    incrementRateLimit(ip)

    const aiScore = Math.round((pangramData.ai_likelihood || 0) * 100)
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
