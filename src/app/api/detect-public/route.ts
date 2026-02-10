import { NextRequest, NextResponse } from 'next/server'
import { detectAI } from '@/lib/pangram'

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
          error: 'Limite atteinte. Créez un compte gratuit pour plus d\'analyses.',
          limit_reached: true,
          tests_remaining: 0,
        }, { status: 429 })
      }
    } else {
      ipUsage.set(ip, { count: 0, resetAt: now + dayMs })
    }

    const body = await request.json()
    const { text } = body

    if (!text || typeof text !== 'string' || text.trim().length < 50) {
      return NextResponse.json({ 
        error: 'Le texte doit contenir au moins 50 caractères.' 
      }, { status: 400 })
    }

    if (text.trim().length > 5000) {
      return NextResponse.json({ 
        error: 'Le texte ne doit pas dépasser 5000 caractères pour le test gratuit.' 
      }, { status: 400 })
    }

    const result = await detectAI(text.trim())

    // Increment usage
    const currentUsage = ipUsage.get(ip)!
    currentUsage.count += 1
    ipUsage.set(ip, currentUsage)

    return NextResponse.json({
      ...result,
      tests_remaining: FREE_DEMO_LIMIT - currentUsage.count,
    })
  } catch (error: unknown) {
    console.error('Public detection error:', error)
    const message = error instanceof Error ? error.message : 'Erreur interne'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
