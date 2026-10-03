import { GENERIC_EMAIL_DOMAINS } from './institutional-email.ts'

export const EDITORIAL_DEMO_LOCALES = ['fr', 'sv'] as const
export const EDITORIAL_DEMO_VOLUMES = [
  'under_300',
  '300_600',
  '600_1500',
  'over_1500',
] as const
export const EDITORIAL_DEMO_JOURNAL_COUNTS = [
  'one',
  'two_to_five',
  'six_plus',
] as const
export const EDITORIAL_DEMO_PLANS = [
  'undecided',
  'essential',
  'journal',
  'organization',
] as const

export type EditorialDemoLocale = typeof EDITORIAL_DEMO_LOCALES[number]
export type EditorialDemoVolume = typeof EDITORIAL_DEMO_VOLUMES[number]
export type EditorialDemoJournalCount = typeof EDITORIAL_DEMO_JOURNAL_COUNTS[number]
export type EditorialDemoPlan = typeof EDITORIAL_DEMO_PLANS[number]
export type EditorialDemoErrorCode =
  | 'invalid_request'
  | 'professional_email_required'
  | 'too_large'
  | 'rate_limited'
  | 'delivery_unavailable'

export interface EditorialDemoRequest {
  version: 1
  locale: EditorialDemoLocale
  name: string
  email: string
  organization: string
  role: string
  journalCount: EditorialDemoJournalCount
  volume: EditorialDemoVolume
  plan: EditorialDemoPlan
  message: string
}

export type EditorialDemoValidationResult =
  | { success: true; data: EditorialDemoRequest; isSpam: false }
  | { success: true; data: null; isSpam: true }
  | { success: false; errorCode: 'invalid_request' | 'professional_email_required' }

const CONSUMER_EMAIL_DOMAINS = new Set([
  ...GENERIC_EMAIL_DOMAINS,
  'bredband.net',
  'comhem.se',
  'home.se',
  'passagen.se',
  'spray.se',
  'telia.com',
])

function readString(
  value: unknown,
  { min = 0, max }: { min?: number; max: number }
): string | null {
  if (typeof value !== 'string') return null

  const normalized = value.trim()
  if (normalized.length < min || normalized.length > max) return null
  return normalized
}

function isAllowedValue<T extends readonly string[]>(
  value: unknown,
  allowed: T
): value is T[number] {
  return typeof value === 'string' && allowed.includes(value)
}

function emailDomain(email: string) {
  const at = email.lastIndexOf('@')
  if (at <= 0 || at === email.length - 1) return null

  const domain = email.slice(at + 1).toLowerCase()
  if (
    !domain.includes('.')
    || /\s/.test(domain)
    || domain.startsWith('.')
    || domain.endsWith('.')
  ) {
    return null
  }
  return domain
}

export function validateEditorialDemoRequest(
  payload: unknown
): EditorialDemoValidationResult {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { success: false, errorCode: 'invalid_request' }
  }

  const input = payload as Record<string, unknown>
  if (typeof input.website === 'string' && input.website.trim()) {
    return { success: true, data: null, isSpam: true }
  }

  if (
    input.version !== 1
    || !isAllowedValue(input.locale, EDITORIAL_DEMO_LOCALES)
    || !isAllowedValue(input.journalCount, EDITORIAL_DEMO_JOURNAL_COUNTS)
    || !isAllowedValue(input.volume, EDITORIAL_DEMO_VOLUMES)
    || !isAllowedValue(input.plan, EDITORIAL_DEMO_PLANS)
  ) {
    return { success: false, errorCode: 'invalid_request' }
  }

  const name = readString(input.name, { min: 2, max: 120 })
  const email = readString(input.email, { min: 5, max: 254 })
  const organization = readString(input.organization, { min: 2, max: 160 })
  const role = readString(input.role, { min: 2, max: 120 })
  const message = readString(input.message ?? '', { max: 2000 })

  if (!name || !email || !organization || !role || message === null) {
    return { success: false, errorCode: 'invalid_request' }
  }

  const domain = emailDomain(email)
  if (!domain || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, errorCode: 'professional_email_required' }
  }

  if (CONSUMER_EMAIL_DOMAINS.has(domain)) {
    return { success: false, errorCode: 'professional_email_required' }
  }

  return {
    success: true,
    isSpam: false,
    data: {
      version: 1,
      locale: input.locale,
      name,
      email: email.toLowerCase(),
      organization,
      role,
      journalCount: input.journalCount,
      volume: input.volume,
      plan: input.plan,
      message,
    },
  }
}
