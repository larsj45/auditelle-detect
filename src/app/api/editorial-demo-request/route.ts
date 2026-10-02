import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@vercel/firewall'
import { getResellerConfig } from '@/lib/config'
import { sendEmail } from '@/lib/email'
import { handleEditorialDemoRequest } from '@/lib/editorial-demo-request-handler'

export const dynamic = 'force-dynamic'

const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const MAX_RATE_LIMIT_ENTRIES = 1_000
// Durable limit shared across instances. The rule with this ID must exist in
// the Vercel Firewall (Rate limit, @vercel/firewall condition) of the project.
const FIREWALL_RATE_LIMIT_ID = 'editorial-demo-request'

function getClientIp(request: NextRequest) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown'
}

function pruneExpiredRateLimits(now: number) {
  if (rateLimit.size < MAX_RATE_LIMIT_ENTRIES) return

  for (const [key, value] of rateLimit) {
    if (now > value.resetAt) rateLimit.delete(key)
  }
}

function takeRateLimitSlot(clientKey: string) {
  const now = Date.now()
  pruneExpiredRateLimits(now)
  const current = rateLimit.get(clientKey)

  if (!current || now > current.resetAt) {
    rateLimit.set(clientKey, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    })
    return true
  }

  if (current.count >= RATE_LIMIT) return false
  current.count += 1
  return true
}

async function takeDurableRateLimitSlot(request: NextRequest, clientKey: string) {
  // The in-memory map is per instance only; it stays as a cheap first layer.
  if (!takeRateLimitSlot(clientKey)) return false
  if (!process.env.VERCEL) return true

  try {
    const { rateLimited, error } = await checkRateLimit(FIREWALL_RATE_LIMIT_ID, { request })
    if (error) console.error('[editorial-demo-request] firewall rate limit unavailable:', error)
    return !rateLimited
  } catch (err) {
    console.error('[editorial-demo-request] firewall rate limit check failed:', err)
    return true
  }
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > 12_000) {
    return NextResponse.json(
      { success: false, errorCode: 'too_large' },
      { status: 413 }
    )
  }

  let rawPayload: string
  try {
    rawPayload = await request.text()
  } catch {
    return NextResponse.json(
      { success: false, errorCode: 'invalid_request' },
      { status: 400 }
    )
  }

  if (new TextEncoder().encode(rawPayload).byteLength > 12_000) {
    return NextResponse.json(
      { success: false, errorCode: 'too_large' },
      { status: 413 }
    )
  }

  let payload: unknown
  try {
    payload = JSON.parse(rawPayload)
  } catch {
    return NextResponse.json(
      { success: false, errorCode: 'invalid_request' },
      { status: 400 }
    )
  }

  const config = await getResellerConfig()
  const result = await handleEditorialDemoRequest(payload, {
    resellerId: config.id,
    supportEmail: config.supportEmail,
    clientKey: getClientIp(request),
    takeRateLimitSlot: (clientKey) => takeDurableRateLimitSlot(request, clientKey),
    sendEmail,
  })

  return NextResponse.json(result.body, { status: result.status })
}
