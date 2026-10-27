// Host routing for the Lettrine site.
// The Lettrine landings (journals and schools) are served by the auditelle-fr
// deployment but live on their own domain. auditelle.fr keeps the app
// (signup, login, dashboard, contact, checkout) and the company.

export const EDITORIAL_HOST = 'lettrine.eu'
export const EDITORIAL_ORIGIN = `https://${EDITORIAL_HOST}`
export const LEGACY_ORIGIN = 'https://www.auditelle.fr'

const EDITORIAL_HOSTS = new Set([EDITORIAL_HOST, `www.${EDITORIAL_HOST}`])
const LEGACY_HOSTS = new Set(['auditelle.fr', 'www.auditelle.fr'])
const EDITORIAL_PATH_PREFIXES = [
  '/vetenskapliga-tidskrifter',
  '/revues-scientifiques',
  '/riviste-scientifiche',
  '/revistas-cientificas',
  '/journals',
]
// Lettrine landings for schools and universities. They are marketing pages, so
// they live on lettrine.eu as well; signup, login, contact and the dashboard stay
// on auditelle.fr, and these pages link there with absolute URLs.
export const SCHOOL_PATHS = ['/etablissements', '/istituzioni'] as const
// Served on both hosts, with host-aware content.
const SHARED_PATHS = new Set(['/robots.txt', '/sitemap.xml'])
const NORDIC_LANGUAGES = new Set(['sv', 'da', 'no', 'nb', 'nn', 'fi', 'is'])
// Central European editors (and English-language browsers) get the English page.
const ENGLISH_PAGE_LANGUAGES = new Set(['pl', 'cs', 'sk'])

export type HostKind = 'editorial' | 'legacy' | 'other'

export interface EditorialRedirect {
  location: string
  status: 307 | 308
}

export function normalizeHost(host: string | null | undefined): string {
  return (host || '').trim().toLowerCase().replace(/:\d+$/, '')
}

export function hostKind(host: string | null | undefined): HostKind {
  const normalized = normalizeHost(host)
  if (EDITORIAL_HOSTS.has(normalized)) return 'editorial'
  if (LEGACY_HOSTS.has(normalized)) return 'legacy'
  return 'other'
}

export function isEditorialPath(pathname: string): boolean {
  return (
    EDITORIAL_PATH_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    ) || (SCHOOL_PATHS as readonly string[]).includes(pathname)
  )
}

// Pick the journals landing from Accept-Language. The first language with its
// own page wins: French, Italian, Portuguese, Swedish for Nordic browsers, and
// the English page for Polish, Czech and Slovak (no page in those languages yet).
// If none of those appears, an English browser gets the English page. Until the
// English page existed, English fell back to Swedish (an English-language
// browser was more likely a Nordic editor). Browsers with no recognised
// language keep the historical Swedish fallback.
export function preferredEditorialPath(acceptLanguage: string | null | undefined): string {
  const languages = (acceptLanguage || '')
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().toLowerCase().split(';')
      const q = params.find((p) => p.trim().startsWith('q='))
      return { lang: tag.split('-')[0], q: q ? Number(q.trim().slice(2)) || 0 : 1 }
    })
    .filter((entry) => entry.lang && entry.q > 0)
    .sort((a, b) => b.q - a.q)

  for (const { lang } of languages) {
    if (lang === 'fr') return '/revues-scientifiques'
    if (lang === 'it') return '/riviste-scientifiche'
    if (lang === 'pt') return '/revistas-cientificas'
    if (ENGLISH_PAGE_LANGUAGES.has(lang)) return '/journals'
    if (NORDIC_LANGUAGES.has(lang)) return '/vetenskapliga-tidskrifter'
  }
  // English is a common second browser language, so it only decides when no
  // language with its own page appears anywhere in the list.
  if (languages.some(({ lang }) => lang === 'en')) return '/journals'
  return '/vetenskapliga-tidskrifter'
}

export function resolveEditorialRedirect(input: {
  host: string | null | undefined
  pathname: string
  search?: string
  acceptLanguage?: string | null
}): EditorialRedirect | null {
  const host = normalizeHost(input.host)
  const kind = hostKind(host)
  const search = input.search || ''
  const { pathname } = input

  if (kind === 'legacy') {
    if (!isEditorialPath(pathname)) return null
    return { location: `${EDITORIAL_ORIGIN}${pathname}${search}`, status: 308 }
  }

  if (kind !== 'editorial') return null

  if (host !== EDITORIAL_HOST) {
    return { location: `${EDITORIAL_ORIGIN}${pathname}${search}`, status: 308 }
  }
  if (pathname === '/') {
    return {
      location: `${EDITORIAL_ORIGIN}${preferredEditorialPath(input.acceptLanguage)}${search}`,
      status: 307,
    }
  }
  if (isEditorialPath(pathname) || SHARED_PATHS.has(pathname)) return null
  // Everything else (login, dashboard, education pages) belongs to auditelle.fr.
  return { location: `${LEGACY_ORIGIN}${pathname}${search}`, status: 308 }
}
