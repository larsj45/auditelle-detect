import { GENERIC_EMAIL_DOMAINS, emailDomain } from '../institutional-email.ts'

export const LETTRINE_LOCALES = ['sv', 'fr'] as const
export type LettrineLocale = typeof LETTRINE_LOCALES[number]

// Free trial granted once per email domain (see lettrine_grant_trial).
export const TRIAL_UNITS = 10
// Bump when the terms or the data processing agreement change.
export const TERMS_VERSION = 'draft-2026-10'
export const MIN_PASSWORD_LENGTH = 10

export type SignupErrorCode =
  | 'invalid_request'
  | 'invalid_name'
  | 'invalid_email'
  | 'professional_email_required'
  | 'invalid_journal'
  | 'weak_password'
  | 'terms_required'

export interface SignupInput {
  locale: LettrineLocale
  name: string
  email: string
  journal: string
  password: string
  emailDomain: string
}

export type SignupValidation =
  | { ok: true; data: SignupInput }
  | { ok: false; errorCode: SignupErrorCode }

export function isLettrineLocale(value: unknown): value is LettrineLocale {
  return typeof value === 'string' && (LETTRINE_LOCALES as readonly string[]).includes(value)
}

function cleanText(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null
  const cleaned = value.replace(/\s+/g, ' ').trim()
  if (!cleaned || cleaned.length > max) return null
  return cleaned
}

export function validateSignup(payload: unknown): SignupValidation {
  if (!payload || typeof payload !== 'object') return { ok: false, errorCode: 'invalid_request' }
  const body = payload as Record<string, unknown>

  if (!isLettrineLocale(body.locale)) return { ok: false, errorCode: 'invalid_request' }

  const name = cleanText(body.name, 120)
  if (!name || name.length < 2) return { ok: false, errorCode: 'invalid_name' }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const domain = emailDomain(email)
  if (!domain || email.length > 254) return { ok: false, errorCode: 'invalid_email' }
  if (GENERIC_EMAIL_DOMAINS.includes(domain)) {
    return { ok: false, errorCode: 'professional_email_required' }
  }

  const journal = cleanText(body.journal, 200)
  if (!journal || journal.length < 2) return { ok: false, errorCode: 'invalid_journal' }

  const password = typeof body.password === 'string' ? body.password : ''
  if (password.length < MIN_PASSWORD_LENGTH || password.length > 200) {
    return { ok: false, errorCode: 'weak_password' }
  }

  if (body.acceptTerms !== true) return { ok: false, errorCode: 'terms_required' }

  return {
    ok: true,
    data: { locale: body.locale, name, email, journal, password, emailDomain: domain },
  }
}

/** Confirmation link on the app's own origin; ConfirmAccount verifies the token hash. */
export function confirmationUrl(origin: string, confirmPath: string, tokenHash: string): string {
  const url = new URL(confirmPath, origin)
  url.searchParams.set('token_hash', tokenHash)
  url.searchParams.set('type', 'signup')
  return url.toString()
}
