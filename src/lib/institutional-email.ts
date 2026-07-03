// =============================================================================
// institutional-email — decide whether an email belongs to an institution
// =============================================================================
// Pure, dependency-free, testable. Used to gate the free institutional pilot:
// institutional emails get a pilot credit pack on signup; everyone else keeps
// the default (pay-per-scan) behaviour.
//
// Strategy (FR-focused for the first outbound wave):
//   1. Block known generic/consumer providers (gmail, outlook, etc.).
//   2. Accept explicit allowlist domains (target institutions).
//   3. Accept French academic patterns (ac-*.fr, univ-*.fr, *-univ.fr) and .edu.
//   4. Everything else → not institutional.
//
// The allowlist is config-driven (ResellerConfig.institutionalEmail.allowlist)
// so non-FR resellers can override it without touching this logic.
// =============================================================================

/**
 * Generic / consumer email providers. An address on any of these is never
 * treated as institutional, even if a pattern would otherwise match.
 */
export const GENERIC_EMAIL_DOMAINS: readonly string[] = [
  'gmail.com',
  'googlemail.com',
  'outlook.com',
  'outlook.fr',
  'hotmail.com',
  'hotmail.fr',
  'live.com',
  'live.fr',
  'msn.com',
  'yahoo.com',
  'yahoo.fr',
  'ymail.com',
  'proton.me',
  'protonmail.com',
  'pm.me',
  'icloud.com',
  'me.com',
  'mac.com',
  'aol.com',
  'gmx.com',
  'gmx.fr',
  'mail.com',
  'zoho.com',
  'yandex.com',
  'orange.fr',
  'wanadoo.fr',
  'free.fr',
  'sfr.fr',
  'laposte.net',
  'bbox.fr',
  'numericable.fr',
]

/**
 * Default allowlist of institution domains we explicitly accept. This is the
 * baseline used when a config does not supply its own list. Target institutions
 * for the FR outbound wave plus a few obvious academic domains.
 */
export const DEFAULT_INSTITUTIONAL_ALLOWLIST: readonly string[] = [
  'universite-paris-saclay.fr',
  'u-psud.fr',
  'escp.eu',
  'sciencespo.fr',
  'sciences-po.fr',
  'unistra.fr',
  'sorbonne-universite.fr',
  'psl.eu',
  'ens.fr',
  'polytechnique.edu',
  'hec.fr',
  'essec.edu',
  'em-lyon.com',
  'edhec.edu',
  'dauphine.psl.eu',
]

export interface InstitutionalEmailOptions {
  /** Extra domains to treat as institutional (merged with the default allowlist). */
  allowlist?: readonly string[]
  /** Extra generic providers to block (merged with the default block list). */
  blocklist?: readonly string[]
}

/** Extract the lowercased domain part of an email, or null if malformed. */
export function emailDomain(email: string): string | null {
  if (typeof email !== 'string') return null
  const trimmed = email.trim().toLowerCase()
  const at = trimmed.lastIndexOf('@')
  if (at <= 0 || at === trimmed.length - 1) return null
  const domain = trimmed.slice(at + 1)
  // Reject obviously invalid domains (no dot, spaces, leading/trailing dot).
  if (!domain.includes('.') || /\s/.test(domain)) return null
  if (domain.startsWith('.') || domain.endsWith('.')) return null
  return domain
}

/**
 * French academic / public-institution domain patterns.
 *   - ac-*.fr        → académies (e.g. ac-paris.fr)
 *   - univ-*.fr      → universités (e.g. univ-lyon1.fr)
 *   - *-univ.fr      → universités (alt. naming)
 *   - *.edu          → academic TLD (US + intl)
 *   - *.edu.<cc>     → academic subdomains (e.g. ac.uk handled via allowlist)
 */
function matchesAcademicPattern(domain: string): boolean {
  if (domain.endsWith('.edu')) return true
  if (/(^|\.)ac-[a-z0-9-]+\.fr$/.test(domain)) return true
  if (/(^|\.)univ-[a-z0-9-]+\.fr$/.test(domain)) return true
  if (/[a-z0-9-]+-univ\.fr$/.test(domain)) return true
  return false
}

/**
 * Returns true if the email belongs to an institution eligible for the free
 * pilot. Pure function — no I/O, safe to unit test and call on the server.
 */
export function isInstitutionalEmail(
  email: string,
  options: InstitutionalEmailOptions = {}
): boolean {
  const domain = emailDomain(email)
  if (!domain) return false

  const blocklist = new Set([
    ...GENERIC_EMAIL_DOMAINS,
    ...(options.blocklist ?? []),
  ])
  if (blocklist.has(domain)) return false

  const allowlist = new Set([
    ...DEFAULT_INSTITUTIONAL_ALLOWLIST.map((d) => d.toLowerCase()),
    ...(options.allowlist ?? []).map((d) => d.toLowerCase()),
  ])
  if (allowlist.has(domain)) return true

  // Accept a subdomain of an allowlisted domain (e.g. eco.univ-x.fr) too.
  for (const allowed of allowlist) {
    if (domain.endsWith(`.${allowed}`)) return true
  }

  return matchesAcademicPattern(domain)
}
