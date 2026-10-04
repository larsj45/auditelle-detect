import type { ResellerConfig } from '../../config/types.ts'

export function siteOrigin(config: Pick<ResellerConfig, 'domain' | 'siteUrl'>): string {
  return config.siteUrl ?? `https://${config.domain}`
}
