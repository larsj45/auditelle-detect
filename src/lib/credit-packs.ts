import { CREDIT_PACKS } from '@/lib/config'
import type { CreditPackOffer, ResellerConfig } from '@/lib/config'

function getFallbackCopy(quantity: number, config: ResellerConfig) {
  const s = config.strings.dashboard

  if (quantity === 1) {
    return {
      label: s.upgradeCreditPackTrialLabel,
      description: s.upgradeCreditPackTrialDescription,
    }
  }

  if (quantity >= 50) {
    return {
      label: s.upgradeCreditPackBestLabel,
      description: s.upgradeCreditPackBestDescription,
    }
  }

  return {
    label: s.upgradeCreditPackStandardLabel,
    description: s.upgradeCreditPackStandardDescription,
  }
}

export function getCreditPackOffers(config: ResellerConfig): CreditPackOffer[] {
  if (config.creditPacks?.length) {
    return config.creditPacks
  }

  return CREDIT_PACKS.map((pack, index) => {
    const copy = getFallbackCopy(pack.quantity, config)
    return {
      id: pack.id,
      quantity: pack.quantity,
      totalPriceMinor: pack.price,
      label: copy.label,
      description: copy.description,
      popular: pack.quantity === 10,
      icon: ['🔍', '📦', '🏫'][index] || '📦',
    }
  })
}

export function findCreditPackOffer(config: ResellerConfig, quantity: number) {
  return getCreditPackOffers(config).find((pack) => pack.quantity === quantity) || null
}
