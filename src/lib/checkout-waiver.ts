// Consumer withdrawal-right waiver for digital services executed immediately
// (FR: art. L221-28, 13°, Code de la consommation). Pure and testable.

export interface CheckoutWaiverConfig {
  label: string     // checkbox text shown before payment
  required: string  // message when the box is not ticked
  version: string   // bump whenever `label` changes, stored with each order
}

/** True when the brand requires the waiver and the request did not accept it. */
export function isWaiverMissing(waiver: CheckoutWaiverConfig | undefined, body: unknown): boolean {
  if (!waiver) return false
  if (!body || typeof body !== 'object') return true
  return (body as Record<string, unknown>).withdrawalWaiverAccepted !== true
}

/** Evidence stored on the Stripe Checkout Session metadata. */
export function waiverMetadata(
  waiver: CheckoutWaiverConfig | undefined,
  now: Date = new Date(),
): Record<string, string> {
  if (!waiver) return {}
  return {
    withdrawal_waiver_version: waiver.version,
    withdrawal_waiver_accepted_at: now.toISOString(),
  }
}
