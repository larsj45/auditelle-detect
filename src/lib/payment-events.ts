import type { SupabaseClient } from '@supabase/supabase-js'
import type { ResellerConfig } from '@/lib/config'
import type { CheckoutAttribution } from '@/lib/attribution'

export type PaymentEventName =
  | 'checkout_completed'
  | 'credits_purchased'
  | 'subscription_started'

interface PaymentEventInput {
  name: PaymentEventName
  dedupeKey: string
  userId?: string | null
  plan?: string | null
  quantity?: number | null
  amountMinor?: number | null
  currency?: string | null
  checkoutType?: 'credits' | 'subscription' | null
  stripeEventId?: string | null
  stripeSessionId?: string | null
  stripeCustomerId?: string | null
  stripeSubscriptionId?: string | null
  attribution?: CheckoutAttribution | null
  metadata?: Record<string, unknown>
}

type ErrorLike = {
  code?: string | null
  message?: string | null
}

let paymentEventsTableUnavailable = false
let attributionColumnsUnavailable = false

function isMissingPaymentEventsTable(error: ErrorLike | null | undefined) {
  return error?.code === 'PGRST205'
    || error?.message?.includes("Could not find the table 'public.payment_events'") === true
}

function isMissingAttributionColumns(error: ErrorLike | null | undefined) {
  return error?.code === 'PGRST204'
    || error?.message?.includes("column 'landing_path'") === true
    || error?.message?.includes("column 'utm_source'") === true
}

function buildPlausibleProps(event: PaymentEventInput) {
  return Object.fromEntries(
    Object.entries({
      plan: event.plan ?? undefined,
      quantity: event.quantity ?? undefined,
      currency: event.currency ?? undefined,
      checkout_type: event.checkoutType ?? undefined,
      landing_path: event.attribution?.landingPath ?? undefined,
      utm_source: event.attribution?.utmSource ?? undefined,
      utm_medium: event.attribution?.utmMedium ?? undefined,
      utm_campaign: event.attribution?.utmCampaign ?? undefined,
      stripe_session_id: event.stripeSessionId ?? undefined,
      stripe_subscription_id: event.stripeSubscriptionId ?? undefined,
    }).filter(([, value]) => value !== undefined)
  )
}

async function persistPaymentEvent(
  supabase: SupabaseClient,
  config: ResellerConfig,
  event: PaymentEventInput
) {
  if (paymentEventsTableUnavailable) {
    return
  }

  const baseRow = {
    dedupe_key: event.dedupeKey,
    event_name: event.name,
    user_id: event.userId ?? null,
    brand: config.id,
    plan: event.plan ?? null,
    quantity: event.quantity ?? null,
    amount_minor: event.amountMinor ?? null,
    currency: event.currency ?? null,
    checkout_type: event.checkoutType ?? null,
    stripe_event_id: event.stripeEventId ?? null,
    stripe_session_id: event.stripeSessionId ?? null,
    stripe_customer_id: event.stripeCustomerId ?? null,
    stripe_subscription_id: event.stripeSubscriptionId ?? null,
    metadata: event.metadata ?? {},
  }

  const row = attributionColumnsUnavailable
    ? baseRow
    : {
        ...baseRow,
        landing_path: event.attribution?.landingPath ?? null,
        referrer: event.attribution?.referrer ?? null,
        utm_source: event.attribution?.utmSource ?? null,
        utm_medium: event.attribution?.utmMedium ?? null,
        utm_campaign: event.attribution?.utmCampaign ?? null,
        utm_term: event.attribution?.utmTerm ?? null,
        utm_content: event.attribution?.utmContent ?? null,
      }

  let { error } = await supabase
    .from('payment_events')
    .upsert(row, {
      onConflict: 'dedupe_key',
      ignoreDuplicates: true,
    })

  if (error && isMissingAttributionColumns(error) && !attributionColumnsUnavailable) {
    attributionColumnsUnavailable = true
    ;({ error } = await supabase
      .from('payment_events')
      .upsert(baseRow, {
        onConflict: 'dedupe_key',
        ignoreDuplicates: true,
      }))
  }

  if (error) {
    if (isMissingPaymentEventsTable(error)) {
      paymentEventsTableUnavailable = true
      console.warn('[Payment Events] payment_events table is unavailable; skipping database persistence until migrations are applied')
      return
    }

    console.error('[Payment Events] Failed to persist event', event.name, error)
  }
}

async function sendPlausibleEvent(config: ResellerConfig, event: PaymentEventInput) {
  try {
    const body = {
      name: event.name,
      domain: config.domain,
      url: `https://${config.domain}/dashboard`,
      props: buildPlausibleProps(event),
      ...(event.amountMinor && event.currency
        ? {
            revenue: {
              currency: event.currency,
              amount: Number((event.amountMinor / 100).toFixed(2)),
            },
          }
        : {}),
    }

    await fetch('https://plausible.io/api/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': `${config.name} payment-webhook`,
      },
      body: JSON.stringify(body),
    })
  } catch (error) {
    console.error('[Payment Events] Failed to send Plausible event', event.name, error)
  }
}

export async function recordPaymentEvent(
  supabase: SupabaseClient,
  config: ResellerConfig,
  event: PaymentEventInput
) {
  await Promise.allSettled([
    persistPaymentEvent(supabase, config, event),
    sendPlausibleEvent(config, event),
  ])
}
