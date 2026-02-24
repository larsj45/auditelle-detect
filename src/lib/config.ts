// Re-exports for convenient access from src/ code
// Server components: import { getResellerConfig } from '@/lib/config'
// Client components: receive config as props from server parent

export { getResellerConfig, getCachedConfig, DAILY_LIMITS, VALID_PLAN_IDS } from '../../config'
export type { ResellerConfig, PlanId } from '../../config'
