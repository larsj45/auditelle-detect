// Prepaid unit packs (prices excluding VAT, EUR). Decided by Lars on
// 2026-10-05, anchored on the EUR 15/unit pilot of the September portfolio.

export interface UnitPack {
  id: 'p50' | 'p200' | 'p500'
  units: number
  amountCents: number
}

export const UNIT_PACKS: readonly UnitPack[] = [
  { id: 'p50', units: 50, amountCents: 59_000 },
  { id: 'p200', units: 200, amountCents: 199_000 },
  { id: 'p500', units: 500, amountCents: 399_000 },
]

export function getUnitPack(id: unknown): UnitPack | null {
  return UNIT_PACKS.find((pack) => pack.id === id) ?? null
}

export function pricePerUnitCents(pack: UnitPack): number {
  return Math.round(pack.amountCents / pack.units)
}

export function formatEuros(cents: number, locale: 'sv' | 'fr'): string {
  return new Intl.NumberFormat(locale === 'sv' ? 'sv-SE' : 'fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100)
}

// Checkout metadata read back by the Stripe webhook.
export const LETTRINE_CHECKOUT_TYPE = 'lettrine_units'

export interface LettrineCheckoutMetadata {
  type: typeof LETTRINE_CHECKOUT_TYPE
  org_id: string
  units: string
  pack: UnitPack['id']
}

export function parseLettrineCheckout(
  metadata: Record<string, string> | null | undefined
): { orgId: string; units: number } | null {
  if (!metadata || metadata.type !== LETTRINE_CHECKOUT_TYPE) return null
  const pack = getUnitPack(metadata.pack)
  const units = Number.parseInt(metadata.units ?? '', 10)
  // The unit count must match the pack, so a tampered quantity is ignored.
  if (!pack || units !== pack.units || !metadata.org_id) return null
  return { orgId: metadata.org_id, units }
}
