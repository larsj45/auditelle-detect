import { NextRequest, NextResponse } from 'next/server'
import { detectAI, detectPlagiarism } from '@/lib/pangram'
import { getResellerConfig } from '@/lib/config'

// Simple in-memory rate limiting (resets on server restart)
// For production, use Redis or similar
const ipUsage = new Map<string, { count: number; resetAt: number }>()

const FREE_DEMO_LIMIT = 3 // 3 free tests per IP per day

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }
  return 'unknown'
}

export async function POST(request: NextRequest) {
  const config = await getResellerConfig()
  const errors = config.strings.errors

  try {
    const ip = getClientIP(request)
    const now = Date.now()
    const dayMs = 24 * 60 * 60 * 1000

    // Check rate limit
    const usage = ipUsage.get(ip)
    if (usage) {
      if (now > usage.resetAt) {
        // Reset for new day
        ipUsage.set(ip, { count: 0, resetAt: now + dayMs })
      } else if (usage.count >= FREE_DEMO_LIMIT) {
        return NextResponse.json({
          error: errors.demoLimitReached,
          limit_reached: true,
          tests_remaining: 0,
        }, { status: 429 })
      }
    } else {
      ipUsage.set(ip, { count: 0, resetAt: now + dayMs })
    }

    const body = await request.json()
    const { text, mode = 'ai' } = body

    if (!text || typeof text !== 'string' || text.trim().length < 50) {
      return NextResponse.json({
        error: errors.textTooShort
      }, { status: 400 })
    }

    if (text.trim().length > 5000) {
      return NextResponse.json({
        error: errors.demoTextTooLong
      }, { status: 400 })
    }

    // Increment usage
    const currentUsage = ipUsage.get(ip)!
    currentUsage.count += 1
    ipUsage.set(ip, currentUsage)

    const testsRemaining = FREE_DEMO_LIMIT - currentUsage.count

    if (mode === 'plagiarism') {
      const plagResult = await detectPlagiarism(text.trim())
      return NextResponse.json({
        ...plagResult,
        tests_remaining: testsRemaining,
      })
    }

    const result = await detectAI(text.trim())

    return NextResponse.json({
      ...result,
      tests_remaining: testsRemaining,
    })
  } catch (error: unknown) {
    console.error('Public detection error:', error)
    // Security fix: don't leak internal error messages in production
    const isDev = process.env.NODE_ENV === 'development'
    const message = isDev && error instanceof Error ? error.message : errors.internalError
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
