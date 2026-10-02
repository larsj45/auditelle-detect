// Validation for the public contact form. Pure, dependency-free, testable.

export interface ContactSubmission {
  name: string
  email: string
  organization: string
  subject: string
  message: string
}

export const CONTACT_LIMITS = {
  name: 200,
  email: 320,
  organization: 200,
  message: 5000,
} as const

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function field(body: Record<string, unknown>, key: string, max: number): string | null {
  const value = body[key]
  if (value === undefined || value === null) return ''
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed.length > max ? null : trimmed
}

/**
 * Returns the cleaned submission, or null when the payload is invalid.
 * `allowedSubjects` are the subject labels shown in the form for this brand.
 */
export function parseContactSubmission(
  body: unknown,
  allowedSubjects: string[],
): ContactSubmission | null {
  if (!body || typeof body !== 'object') return null
  const b = body as Record<string, unknown>

  const name = field(b, 'name', CONTACT_LIMITS.name)
  const email = field(b, 'email', CONTACT_LIMITS.email)
  const organization = field(b, 'organization', CONTACT_LIMITS.organization)
  const subject = field(b, 'subject', 200)
  const message = field(b, 'message', CONTACT_LIMITS.message)

  if (!name || !email || organization === null || !subject || !message) return null
  if (!EMAIL_RE.test(email)) return null
  if (!allowedSubjects.includes(subject)) return null

  return { name, email, organization, subject, message }
}

/** Honeypot: bots fill the hidden `website` field, people do not. */
export function isLikelyBot(body: unknown): boolean {
  if (!body || typeof body !== 'object') return false
  const website = (body as Record<string, unknown>).website
  return typeof website === 'string' && website.trim().length > 0
}
