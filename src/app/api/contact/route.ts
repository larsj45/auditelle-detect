import { NextRequest, NextResponse } from 'next/server'
import { getResellerConfig } from '@/lib/config'
import { sendEmail } from '@/lib/email'
import { escapeHtml } from '@/lib/sanitize'
import { isLikelyBot, parseContactSubmission } from '@/lib/contact'
import { checkContactToken, contactTokenSecret, detectSpam, issueContactToken } from '@/lib/contact-spam'

export const dynamic = 'force-dynamic'

// Best-effort in-memory rate limit (resets on cold start, like detect-public)
const ipUsage = new Map<string, { count: number; resetAt: number }>()
const CONTACT_LIMIT = 5
const CONTACT_WINDOW_MS = 10 * 60 * 1000

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'unknown'
}

// The page fetches a signed timestamp on load and sends it back with the form.
export async function GET() {
  const secret = contactTokenSecret()
  return NextResponse.json(
    { token: secret ? issueContactToken(secret) : null },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}

export async function POST(request: NextRequest) {
  const config = await getResellerConfig()

  const ip = getClientIP(request)
  const now = Date.now()
  const usage = ipUsage.get(ip)
  if (usage && usage.resetAt > now && usage.count >= CONTACT_LIMIT) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
  }
  if (!usage || usage.resetAt <= now) {
    ipUsage.set(ip, { count: 1, resetAt: now + CONTACT_WINDOW_MS })
  } else {
    usage.count += 1
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 })
  }

  // Pretend success to bots so they do not retry
  if (isLikelyBot(body)) {
    console.info('[contact] dropped', { reason: 'honeypot' })
    return NextResponse.json({ ok: true })
  }

  const secret = contactTokenSecret()
  if (secret) {
    const token = (body as Record<string, unknown> | null)?.t
    const check = checkContactToken(token, secret)
    if (check === 'too_fast') {
      console.info('[contact] dropped', { reason: 'too_fast' })
      return NextResponse.json({ ok: true })
    }
    // No valid token: the page was never rendered (direct POST) or was open for a day.
    // Answer with an error so a real visitor's browser falls back to mailto.
    if (check !== 'ok') {
      console.info('[contact] refused', { reason: `token_${check}` })
      return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 })
    }
  } else {
    console.warn('[contact] no token secret configured, form token check skipped')
  }

  const allowedSubjects = config.strings.contact.subjectOptions.map((opt) => opt.label)
  const submission = parseContactSubmission(body, allowedSubjects)
  if (!submission) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 })
  }

  const spamReason = detectSpam(submission)
  if (spamReason) {
    console.info('[contact] dropped', { reason: spamReason, emailDomain: submission.email.split('@')[1] })
    return NextResponse.json({ ok: true })
  }

  const { name, email, organization, subject, message } = submission
  console.info('[contact] lead received', { subject, emailDomain: email.split('@')[1] })

  const rows = [
    ['Nom', name],
    ['Email', email],
    ['Organisation', organization || '-'],
    ['Sujet', subject],
  ]
  const html = `
    <table cellpadding="6" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows.map(([k, v]) => `<tr><td style="color:#666">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`).join('')}
    </table>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(message)}</p>
    <p style="font-family:sans-serif;font-size:12px;color:#999">${escapeHtml(config.domain)} /contact</p>
  `
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${message}`

  const result = await sendEmail({
    to: config.supportEmail,
    subject: `[${config.name}] ${subject} - ${organization || name}`.replace(/\s+/g, ' '),
    html,
    text,
    replyTo: email,
  })

  if (!result.success) {
    console.error('[contact] send failed', result.error)
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
