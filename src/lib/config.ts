// Re-exports for convenient access from src/ code
// Server components: import { getResellerConfig } from '@/lib/config'
// Client components: receive config as props from server parent

export { getResellerConfig, getCachedConfig, DAILY_LIMITS, VALID_PLAN_IDS, MONTHLY_PLANS, CREDIT_PLANS, CREDIT_PACKS, PRICE_PER_SCAN_CENTS } from '../../config'
export type { ResellerConfig, PlanId } from '../../config'
