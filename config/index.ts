import type { ResellerConfig } from './types'

const RESELLER_ID = process.env.RESELLER_ID || 'auditelle-fr'

let _cached: ResellerConfig | null = null

export async function getResellerConfig(): Promise<ResellerConfig> {
  if (_cached) return _cached

  // Static imports so Turbopack/webpack can resolve at build time.
  // Add new cases here when onboarding a reseller.
  let mod
  switch (RESELLER_ID) {
    case 'veritexto-es':
      mod = await import('./veritexto-es')
      break
    case 'veritexto-pt':
      mod = await import('./veritexto-pt')
      break
    case 'auditelle-fr':
    default:
      mod = await import('./auditelle-fr')
  }
  _cached = mod.default as ResellerConfig
  return _cached
}

// Synchronous getter — only works after first async load.
// Use in client components that received config as a prop.
export function getCachedConfig(): ResellerConfig {
  if (!_cached) {
    throw new Error('Config not loaded yet. Call getResellerConfig() first.')
  }
  return _cached
}

// Re-export types for convenience
export type { ResellerConfig } from './types'
export { DAILY_LIMITS, VALID_PLAN_IDS } from './types'
export type { PlanId } from './types'
