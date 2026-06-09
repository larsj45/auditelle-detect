export interface CheckoutAttribution {
  landingPath?: string
  landingQuery?: string
  lastLandingPath?: string
  lastLandingQuery?: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
  gclid?: string
  fbclid?: string
  msclkid?: string
  ttclid?: string
  firstSeenAt?: string
  lastSeenAt?: string
}

export const ATTRIBUTION_STORAGE_KEY = 'auditelle_checkout_attribution'

const QUERY_KEY_MAP = {
  utm_source: 'utmSource',
  utm_medium: 'utmMedium',
  utm_campaign: 'utmCampaign',
  utm_term: 'utmTerm',
  utm_content: 'utmContent',
  gclid: 'gclid',
  fbclid: 'fbclid',
  msclkid: 'msclkid',
  ttclid: 'ttclid',
} as const

type QueryParamKey = keyof typeof QUERY_KEY_MAP
type AttributionKey = typeof QUERY_KEY_MAP[QueryParamKey]

function trimString(value: unknown, maxLength = 240): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  if (!trimmed) return undefined
  return trimmed.slice(0, maxLength)
}

export function sanitizeAttribution(input: unknown): CheckoutAttribution | null {
  if (!input || typeof input !== 'object') return null

  const raw = input as Record<string, unknown>
  const attribution: CheckoutAttribution = {
    landingPath: trimString(raw.landingPath),
    landingQuery: trimString(raw.landingQuery),
    lastLandingPath: trimString(raw.lastLandingPath),
    lastLandingQuery: trimString(raw.lastLandingQuery),
    referrer: trimString(raw.referrer),
    utmSource: trimString(raw.utmSource),
    utmMedium: trimString(raw.utmMedium),
    utmCampaign: trimString(raw.utmCampaign),
    utmTerm: trimString(raw.utmTerm),
    utmContent: trimString(raw.utmContent),
    gclid: trimString(raw.gclid),
    fbclid: trimString(raw.fbclid),
    msclkid: trimString(raw.msclkid),
    ttclid: trimString(raw.ttclid),
    firstSeenAt: trimString(raw.firstSeenAt),
    lastSeenAt: trimString(raw.lastSeenAt),
  }

  return Object.values(attribution).some(Boolean) ? attribution : null
}

export function flattenAttributionForMetadata(attribution: CheckoutAttribution | null | undefined) {
  if (!attribution) return {}

  return Object.fromEntries(
    Object.entries({
      landing_path: attribution.landingPath,
      landing_query: attribution.landingQuery,
      last_landing_path: attribution.lastLandingPath,
      last_landing_query: attribution.lastLandingQuery,
      referrer: attribution.referrer,
      utm_source: attribution.utmSource,
      utm_medium: attribution.utmMedium,
      utm_campaign: attribution.utmCampaign,
      utm_term: attribution.utmTerm,
      utm_content: attribution.utmContent,
      gclid: attribution.gclid,
      fbclid: attribution.fbclid,
      msclkid: attribution.msclkid,
      ttclid: attribution.ttclid,
      first_seen_at: attribution.firstSeenAt,
      last_seen_at: attribution.lastSeenAt,
    }).filter(([, value]) => typeof value === 'string' && value.length > 0)
  )
}

export function extractAttributionFromMetadata(metadata: Record<string, unknown> | null | undefined): CheckoutAttribution | null {
  if (!metadata) return null

  return sanitizeAttribution({
    landingPath: metadata.landing_path,
    landingQuery: metadata.landing_query,
    lastLandingPath: metadata.last_landing_path,
    lastLandingQuery: metadata.last_landing_query,
    referrer: metadata.referrer,
    utmSource: metadata.utm_source,
    utmMedium: metadata.utm_medium,
    utmCampaign: metadata.utm_campaign,
    utmTerm: metadata.utm_term,
    utmContent: metadata.utm_content,
    gclid: metadata.gclid,
    fbclid: metadata.fbclid,
    msclkid: metadata.msclkid,
    ttclid: metadata.ttclid,
    firstSeenAt: metadata.first_seen_at,
    lastSeenAt: metadata.last_seen_at,
  })
}

export function readStoredAttribution(): CheckoutAttribution | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY)
    if (!raw) return null
    return sanitizeAttribution(JSON.parse(raw))
  } catch {
    return null
  }
}

export function persistAttributionPageView(input: {
  pathname: string
  search: string
  referrer?: string
}) {
  if (typeof window === 'undefined') return

  const now = new Date().toISOString()
  const search = input.search.startsWith('?') ? input.search : input.search ? `?${input.search}` : ''
  const params = new URLSearchParams(search)
  const existing = readStoredAttribution() || {}

  const next: CheckoutAttribution = {
    ...existing,
    landingPath: existing.landingPath || trimString(input.pathname, 512),
    landingQuery: existing.landingQuery || trimString(search, 512),
    lastLandingPath: trimString(input.pathname, 512),
    lastLandingQuery: trimString(search, 512),
    referrer: existing.referrer || trimString(input.referrer, 512),
    firstSeenAt: existing.firstSeenAt || now,
    lastSeenAt: now,
  }

  for (const [queryKey, attributionKey] of Object.entries(QUERY_KEY_MAP) as Array<[QueryParamKey, AttributionKey]>) {
    const value = trimString(params.get(queryKey), 240)
    if (value) {
      next[attributionKey] = value
    }
  }

  window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(next))
}
