import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'
import { getResellerConfig } from '@/lib/config'
import { sendEmail, subscriptionConfirmedEmail } from '@/lib/email'
import { recordPaymentEvent } from '@/lib/payment-events'
import { extractAttributionFromMetadata, flattenAttributionForMetadata } from '@/lib/attribution'

export const dynamic = 'force-dynamic'


// Map price IDs to plan names
const getPlanFromPriceId = (priceId: string): string => {
  const priceMap = Object.fromEntries(
    [
      [process.env.STRIPE_STUDENT_PRICE_ID, 'student'],
      [process.env.STRIPE_STARTER_PRICE_ID, 'starter'],
      [process.env.STRIPE_PRO_PRICE_ID, 'pro'],
      [process.env.STRIPE_UNIVERSITY_PRICE_ID, 'university'],
      [process.env.STRIPE_ENTERPRISE_PRICE_ID, 'enterprise'],
    ].filter((entry): entry is [string, string] => Boolean(entry[0]))
  )
  return priceMap[priceId] || 'pro'
}

function isMissingCreditPurchaseRpc(error: { code?: string | null; message?: string | null } | null | undefined) {
  return error?.code === 'PGRST202'
    || error?.message?.includes('apply_credit_purchase') === true
    || error?.message?.includes("Could not find the function") === true
    || error?.message?.includes("Could not find the table 'public.payment_events'") === true
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const config = await getResellerConfig()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.supabase_user_id

      // ── Credit purchase (pay-per-scan) ─────────────────────────────────
      if (session.metadata?.type === 'credits' && userId) {
        const quantity = parseInt(session.metadata.quantity || '0', 10)
        const metadataAmount = parseInt(session.metadata.amount_minor || '', 10)
        const amountMinor = session.amount_total ?? (Number.isNaN(metadataAmount) ? null : metadataAmount)
        const attribution = extractAttributionFromMetadata(session.metadata)
        const eventMetadata = {
          payment_status: session.payment_status,
          ...flattenAttributionForMetadata(attribution),
        }
        let creditsApplied = false

        if (quantity > 0) {
          const { data: applied, error: applyError } = await supabase.rpc('apply_credit_purchase', {
            p_dedupe_key: `credits_purchased:${session.id}`,
            p_user_id: userId,
            p_brand: config.id,
            p_quantity: quantity,
            p_amount_minor: amountMinor,
            p_currency: session.currency?.toUpperCase() ?? config.currency,
            p_stripe_event_id: event.id,
            p_stripe_session_id: session.id,
            p_stripe_customer_id: typeof session.customer === 'string' ? session.customer : null,
            p_metadata: eventMetadata,
            p_landing_path: attribution?.landingPath ?? null,
            p_referrer: attribution?.referrer ?? null,
            p_utm_source: attribution?.utmSource ?? null,
            p_utm_medium: attribution?.utmMedium ?? null,
            p_utm_campaign: attribution?.utmCampaign ?? null,
            p_utm_term: attribution?.utmTerm ?? null,
            p_utm_content: attribution?.utmContent ?? null,
          })

          if (applyError && isMissingCreditPurchaseRpc(applyError)) {
            console.warn('[Stripe Webhook] apply_credit_purchase unavailable; falling back to legacy credit update')
            const { data: profile } = await supabase
              .from('profiles')
              .select('scan_credits')
              .eq('id', userId)
              .single()
            const currentCredits = profile?.scan_credits || 0
            await supabase
              .from('profiles')
              .update({
                scan_credits: currentCredits + quantity,
                stripe_customer_id: session.customer as string,
              })
              .eq('id', userId)
            creditsApplied = true
          } else if (applyError) {
            console.error('[Stripe Webhook] Failed to apply credit purchase:', applyError)
            throw applyError
          } else {
            creditsApplied = applied === true
          }

          if (!creditsApplied) {
            console.log(`[Stripe Webhook] Duplicate credit purchase ignored for session ${session.id}`)
            break
          }

          console.log(`[Stripe Webhook] Added ${quantity} credits to user ${userId}`)
        }
        await recordPaymentEvent(supabase, config, {
          name: 'checkout_completed',
          dedupeKey: `checkout_completed:${session.id}`,
          userId,
          quantity,
          amountMinor,
          currency: session.currency?.toUpperCase() ?? config.currency,
          checkoutType: 'credits',
          stripeEventId: event.id,
          stripeSessionId: session.id,
          stripeCustomerId: typeof session.customer === 'string' ? session.customer : null,
          attribution,
          metadata: eventMetadata,
        })
        await recordPaymentEvent(supabase, config, {
          name: 'credits_purchased',
          dedupeKey: `credits_purchased:${session.id}`,
          userId,
          quantity,
          amountMinor,
          currency: session.currency?.toUpperCase() ?? config.currency,
          checkoutType: 'credits',
          stripeEventId: event.id,
          stripeSessionId: session.id,
          stripeCustomerId: typeof session.customer === 'string' ? session.customer : null,
          attribution,
          metadata: eventMetadata,
        })
        break
      }

      // ── Subscription purchase ──────────────────────────────────────────
      const plan = session.metadata?.plan || 'pro'
      const attribution = extractAttributionFromMetadata(session.metadata)

      if (userId) {
        // Update profile with subscription info
        const { data: profile, error: profileUpdateError } = await supabase
          .from('profiles')
          .update({
            plan,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
          })
          .eq('id', userId)
          .select('full_name')

        if (profileUpdateError) {
          console.error('[Stripe Webhook] Failed to upgrade user:', userId, profileUpdateError)
        }

        // Send subscription confirmation email
        const customerEmail = session.customer_email || session.customer_details?.email
        if (customerEmail) {
          const rawName = customerEmail.split('@')[0]?.split('+')[0] || 'User'
          const capitalized = rawName.charAt(0).toUpperCase() + rawName.slice(1)
          const stripeName = (session.customer_details?.name as string | undefined)?.trim().split(' ')[0]
          const profileRecord = Array.isArray(profile) ? profile[0] : profile
          const profileFirstName = profileRecord?.full_name?.trim().split(' ')[0]
          // Prefer: Supabase profile > Stripe customer name > email prefix
          const name = (profileFirstName && profileFirstName.length > 0)
            ? profileFirstName
            : stripeName || capitalized || 'Utilisateur'
          const email = subscriptionConfirmedEmail(config, name, plan)
          await sendEmail({
            to: customerEmail,
            subject: email.subject,
            html: email.html,
            text: email.text,
          })
        }
      }
      await recordPaymentEvent(supabase, config, {
        name: 'checkout_completed',
        dedupeKey: `checkout_completed:${session.id}`,
        userId,
        plan,
        amountMinor: session.amount_total ?? null,
        currency: session.currency?.toUpperCase() ?? config.currency,
        checkoutType: 'subscription',
        stripeEventId: event.id,
        stripeSessionId: session.id,
        stripeCustomerId: typeof session.customer === 'string' ? session.customer : null,
        stripeSubscriptionId: typeof session.subscription === 'string' ? session.subscription : null,
        attribution,
        metadata: {
          payment_status: session.payment_status,
          ...flattenAttributionForMetadata(attribution),
        },
      })
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id')
        .eq('stripe_subscription_id', subscription.id)
        .limit(1)

      if (profiles && profiles[0]) {
        const isActive = ['active', 'trialing'].includes(subscription.status)
        const priceId = subscription.items.data[0]?.price?.id || ''
        const plan = isActive ? getPlanFromPriceId(priceId) : 'free'
        const attribution = extractAttributionFromMetadata(subscription.metadata)
        await supabase
          .from('profiles')
          .update({ plan, subscription_status: subscription.status })
          .eq('id', profiles[0].id)

        if (isActive) {
          await recordPaymentEvent(supabase, config, {
            name: 'subscription_started',
            dedupeKey: `subscription_started:${subscription.id}`,
            userId: profiles[0].id,
            plan,
            amountMinor: subscription.items.data[0]?.price?.unit_amount ?? null,
            currency: subscription.currency?.toUpperCase() ?? config.currency,
            checkoutType: 'subscription',
            stripeEventId: event.id,
            stripeCustomerId: typeof subscription.customer === 'string' ? subscription.customer : null,
            stripeSubscriptionId: subscription.id,
            attribution,
            metadata: {
              status: subscription.status,
              ...flattenAttributionForMetadata(attribution),
            },
          })
        }
      }
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      await supabase
        .from('profiles')
        .update({ plan: 'free', stripe_subscription_id: null, subscription_status: subscription.status })
        .eq('stripe_subscription_id', subscription.id)
      break
    }
  }

  return NextResponse.json({ received: true })
}
