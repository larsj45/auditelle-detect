// Self-service account deletion helpers. Pure and testable.

// Stripe subscription statuses that can still bill the customer
const BILLABLE_STATUSES = new Set(['active', 'trialing', 'past_due', 'unpaid', 'incomplete', 'paused'])

export function isBillableSubscription(status: string): boolean {
  return BILLABLE_STATUSES.has(status)
}

/** The user confirms by typing their own email (case and surrounding spaces ignored). */
export function confirmationMatches(typed: unknown, accountEmail: string | undefined): boolean {
  if (typeof typed !== 'string' || !accountEmail) return false
  return typed.trim().toLowerCase() === accountEmail.trim().toLowerCase()
}
