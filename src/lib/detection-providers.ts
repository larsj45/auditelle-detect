export type DetectionCapability = 'ai' | 'plagiarism'
export type AiProvider = 'pangram'
export type PlagiarismProvider = 'pangram' | 'copyleaks'
export type DetectionProvider = AiProvider | PlagiarismProvider

export interface DetectionProviderDecision {
  capability: DetectionCapability
  provider: DetectionProvider
  resellerId: string
  institutionSlug?: string
  reason: string
  missingEnvVars: string[]
}

export interface DetectionProviderResolverInput {
  capability: DetectionCapability
  resellerId?: string
  institutionSlug?: string
  env?: NodeJS.ProcessEnv
}

const DEFAULT_RESELLER_ID = 'auditelle-fr'
const DEFAULT_COPYLEAKS_RESELLERS = ['veritexto-br']
const COPYLEAKS_REQUIRED_ENV_VARS = [
  'COPYLEAKS_EMAIL',
  'COPYLEAKS_API_KEY',
  'COPYLEAKS_WEBHOOK_SECRET',
] as const

function normalizeToken(value: string): string {
  return value.trim().toLowerCase()
}

function normalizeResellerId(resellerId: string): string {
  const normalized = normalizeToken(resellerId)
  return normalized === 'veritexto-pt' ? 'veritexto-br' : normalized
}

function parseAllowList(value: string | undefined, fallback: string[]): Set<string> {
  const source = value === undefined ? fallback : value.split(',')
  return new Set(
    source
      .map(normalizeToken)
      .filter(Boolean)
  )
}

function isAllowed(allowList: Set<string>, value: string | undefined): boolean {
  if (allowList.has('*') || allowList.has('all')) return true
  return value ? allowList.has(normalizeToken(value)) : false
}

function getMissingEnvVars(env: NodeJS.ProcessEnv): string[] {
  const missing: string[] = COPYLEAKS_REQUIRED_ENV_VARS.filter((key) => !env[key]?.trim())
  if (!env.COPYLEAKS_WEBHOOK_BASE_URL?.trim() && !env.NEXT_PUBLIC_APP_URL?.trim() && !env.VERCEL_URL?.trim()) {
    missing.push('COPYLEAKS_WEBHOOK_BASE_URL')
  }
  return missing
}

export function getCurrentResellerId(env: NodeJS.ProcessEnv = process.env): string {
  return normalizeResellerId(env.RESELLER_ID || DEFAULT_RESELLER_ID)
}

export function getCopyleaksEnabledResellers(env: NodeJS.ProcessEnv = process.env): Set<string> {
  return parseAllowList(env.COPYLEAKS_PLAGIARISM_ENABLED_RESELLERS, DEFAULT_COPYLEAKS_RESELLERS)
}

export function getCopyleaksEnabledInstitutions(env: NodeJS.ProcessEnv = process.env): Set<string> {
  return parseAllowList(env.COPYLEAKS_PLAGIARISM_ENABLED_INSTITUTIONS, [])
}

export function resolveDetectionProvider(input: DetectionProviderResolverInput): DetectionProviderDecision {
  const env = input.env || process.env
  const resellerId = normalizeResellerId(input.resellerId || getCurrentResellerId(env))
  const institutionSlug = input.institutionSlug ? normalizeToken(input.institutionSlug) : undefined

  if (input.capability === 'ai') {
    return {
      capability: 'ai',
      provider: 'pangram',
      resellerId,
      institutionSlug,
      reason: 'Pangram is the default AI detection provider.',
      missingEnvVars: [],
    }
  }

  const enabledResellers = getCopyleaksEnabledResellers(env)
  const enabledInstitutions = getCopyleaksEnabledInstitutions(env)
  const resellerEnabled = isAllowed(enabledResellers, resellerId)
  const institutionEnabled = isAllowed(enabledInstitutions, institutionSlug)

  if (!resellerEnabled && !institutionEnabled) {
    return {
      capability: 'plagiarism',
      provider: 'pangram',
      resellerId,
      institutionSlug,
      reason: 'Copyleaks is not enabled for this reseller or institution.',
      missingEnvVars: [],
    }
  }

  const missingEnvVars = getMissingEnvVars(env)
  if (missingEnvVars.length > 0) {
    return {
      capability: 'plagiarism',
      provider: 'pangram',
      resellerId,
      institutionSlug,
      reason: 'Copyleaks is enabled but missing required environment variables.',
      missingEnvVars,
    }
  }

  return {
    capability: 'plagiarism',
    provider: 'copyleaks',
    resellerId,
    institutionSlug,
    reason: institutionEnabled
      ? 'Copyleaks is enabled for this institution.'
      : 'Copyleaks is enabled for this reseller.',
    missingEnvVars: [],
  }
}
