// Anti-spam checks for the public contact form. Pure (node:crypto only), testable.
//
// Layers, all invisible to people:
//  1. Honeypot field (`website`), see isLikelyBot in contact.ts.
//  2. Form token: the page fetches a signed timestamp from GET /api/contact on load.
//     A POST without a valid token comes from a script that never rendered the page.
//     A POST signed less than MIN_FILL_MS ago was filled faster than a person can type.
//  3. Content heuristics: disposable/spam sender domains and links to known spam hosts.

import { createHmac, timingSafeEqual } from 'node:crypto'

export const MIN_FILL_MS = 3_000
export const MAX_TOKEN_AGE_MS = 24 * 60 * 60 * 1000

// Sender domains seen in contact-form spam or offering throwaway inboxes.
export const BLOCKED_EMAIL_DOMAINS = [
  'northmail.web.id', // form spam to auditelle.fr, 26/10/2026
  'mailinator.com',
  'guerrillamail.com',
  'guerrillamail.info',
  'sharklasers.com',
  'grr.la',
  '10minutemail.com',
  'temp-mail.org',
  'tempmail.com',
  'tempmailo.com',
  'trashmail.com',
  'dispostable.com',
  'getnada.com',
  'maildrop.cc',
  'mohmal.com',
  'emailondeck.com',
] as const

// Hosts whose links only ever showed up in spam submissions.
export const BLOCKED_LINK_DOMAINS = ['sharez.online'] as const

function sign(timestamp: string, secret: string): string {
  return createHmac('sha256', `contact-form:${secret}`).update(timestamp).digest('base64url')
}

/** Token handed to the page on load: `<ms timestamp>.<hmac>`. */
export function issueContactToken(secret: string, now: number = Date.now()): string {
  const ts = String(now)
  return `${ts}.${sign(ts, secret)}`
}

export type TokenCheck = 'ok' | 'missing' | 'invalid' | 'too_fast' | 'expired'

export function checkContactToken(
  token: unknown,
  secret: string,
  now: number = Date.now(),
): TokenCheck {
  if (typeof token !== 'string' || token.length === 0) return 'missing'
  const [ts, mac, extra] = token.split('.')
  if (!ts || !mac || extra !== undefined || !/^\d{10,16}$/.test(ts)) return 'invalid'

  const expected = Buffer.from(sign(ts, secret))
  const given = Buffer.from(mac)
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return 'invalid'

  const age = now - Number(ts)
  if (age < MIN_FILL_MS) return 'too_fast'
  if (age > MAX_TOKEN_AGE_MS) return 'expired'
  return 'ok'
}

function domainMatches(host: string, blocked: readonly string[]): boolean {
  const h = host.toLowerCase().replace(/\.$/, '')
  return blocked.some((d) => h === d || h.endsWith(`.${d}`))
}

const URL_HOST_RE = /\b(?:https?:\/\/|www\.)([a-z0-9.-]+\.[a-z]{2,})/gi
const ANY_URL_RE = /\b(?:https?:\/\/|www\.)\S+/i

export type SpamReason = 'blocked_email_domain' | 'blocked_link' | 'url_in_name'

/**
 * Content heuristics on an already-validated submission. Returns the reason to drop it,
 * or null when it looks like a real message. Kept narrow on purpose: a false positive
 * is a lost lead nobody notices.
 */
export function detectSpam(submission: {
  name: string
  email: string
  organization: string
  message: string
}): SpamReason | null {
  const emailDomain = submission.email.split('@').pop() ?? ''
  if (domainMatches(emailDomain, BLOCKED_EMAIL_DOMAINS)) return 'blocked_email_domain'

  if (ANY_URL_RE.test(submission.name)) return 'url_in_name'

  const text = `${submission.organization}\n${submission.message}`
  for (const match of text.matchAll(URL_HOST_RE)) {
    if (domainMatches(match[1], BLOCKED_LINK_DOMAINS)) return 'blocked_link'
  }
  // Bare host mentions without a scheme, e.g. "sharez.online/fr/..."
  const lower = text.toLowerCase()
  if (BLOCKED_LINK_DOMAINS.some((d) => lower.includes(d))) return 'blocked_link'

  return null
}

/** HMAC key for form tokens, derived from a secret every deployment already has. */
export function contactTokenSecret(
  env: Record<string, string | undefined> = process.env,
): string | null {
  return env.CONTACT_FORM_SECRET || env.SUPABASE_SERVICE_ROLE_KEY || env.CRON_SECRET || null
}
