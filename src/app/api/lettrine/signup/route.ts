import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@vercel/firewall'
import { sendEmail } from '@/lib/email'
import { TERMS_VERSION, validateSignup } from '@/lib/lettrine/signup'
import { appOrigin, clientKey, confirmationEmail, lettrineServiceClient } from '@/lib/lettrine/server'
import { getLettrineAppCopy } from '@/components/lettrine/appCopy'

export const dynamic = 'force-dynamic'

const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000
const attempts = new Map<string, { count: number; resetAt: number }>()

function takeLocalSlot(key: string): boolean {
  const now = Date.now()
  if (attempts.size > 1000) {
    for (const [k, v] of attempts) if (now > v.resetAt) attempts.delete(k)
  }
  const current = attempts.get(key)
  if (!current || now > current.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (current.count >= RATE_LIMIT) return false
  current.count += 1
  return true
}

async function takeSlot(request: NextRequest): Promise<boolean> {
  if (!takeLocalSlot(clientKey(request))) return false
  if (!process.env.VERCEL) return true
  try {
    const { rateLimited } = await checkRateLimit('lettrine-signup', { request })
    return !rateLimited
  } catch (err) {
    console.error('[lettrine-signup] firewall rate limit check failed:', err)
    return true
  }
}

const fail = (errorCode: string, status: number) => NextResponse.json({ success: false, errorCode }, { status })

export async function POST(request: NextRequest) {
  let payload: unknown
  try {
    const raw = await request.text()
    if (raw.length > 8000) return fail('invalid_request', 413)
    payload = JSON.parse(raw)
  } catch {
    return fail('invalid_request', 400)
  }

  const validated = validateSignup(payload)
  if (!validated.ok) return fail(validated.errorCode, 400)
  const data = validated.data

  if (!(await takeSlot(request))) return fail('rate_limited', 429)

  const copy = getLettrineAppCopy(data.locale)
  const service = lettrineServiceClient()
  const { data: link, error } = await service.auth.admin.generateLink({
    type: 'signup',
    email: data.email,
    password: data.password,
    options: {
      redirectTo: `${appOrigin(request)}${copy.paths.confirm}`,
      data: {
        full_name: data.name,
        lettrine: {
          journal: data.journal,
          locale: data.locale,
          terms_version: TERMS_VERSION,
          terms_accepted_at: new Date().toISOString(),
        },
      },
    },
  })

  if (error || !link?.properties?.action_link || !link.user) {
    const message = error?.message?.toLowerCase() || ''
    if (message.includes('already') || error?.status === 422) return fail('already_registered', 409)
    console.error('[lettrine-signup] generateLink failed:', error?.message)
    return fail('unknown', 500)
  }

  // Every auth user also gets an education-product profile (DB trigger). Mark
  // it as processed so the education cron never sends Verify emails to journals.
  await service
    .from('profiles')
    .update({
      trial_ends_at: null,
      welcome_email_sent: true,
      trial_ended_email_sent: true,
      pilot_credits_granted: true,
    })
    .eq('id', link.user.id)

  if (process.env.LETTRINE_LOG_LINKS === '1' && process.env.VERCEL_ENV !== 'production') {
    console.info('[lettrine-signup] confirmation link (dev only):', link.properties.action_link)
    return NextResponse.json({ success: true })
  }

  const email = confirmationEmail(copy, data.name, data.journal, link.properties.action_link)
  const sent = await sendEmail({
    to: data.email,
    subject: email.subject,
    html: email.html,
    text: email.text,
    fromName: copy.brand,
  })
  if (!sent.success) return fail('delivery_unavailable', 502)

  return NextResponse.json({ success: true })
}
