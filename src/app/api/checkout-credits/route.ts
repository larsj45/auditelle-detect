import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import { getResellerConfig } from '@/lib/config'
import { flattenAttributionForMetadata, sanitizeAttribution } from '@/lib/attribution'
import { findCreditPackOffer, getCreditPackOffers } from '@/lib/credit-packs'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const config = await getResellerConfig()
  const errors = config.strings.errors
  const dashboard = config.strings.dashboard

  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: errors.unauthorized }, { status: 401 })
    }

    const match = authHeader.match(/^Bearer\s+(.+)$/)
    if (!match) return NextResponse.json({ error: errors.unauthorized }, { status: 401 })
    const token = match[1]

    const availablePacks = getCreditPackOffers(config)
    let quantity = availablePacks[0]?.quantity ?? 10
    let attribution = null
    try {
      const body = await request.json()
      quantity = Number(body.quantity) || quantity
      attribution = sanitizeAttribution(body.attribution)
    } catch {
      // default first available pack
    }

    // Validate quantity against packs
    const pack = findCreditPackOffer(config, quantity)
    if (!pack) {
      return NextResponse.json({ error: errors.invalidPlan }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    )

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: errors.unauthorized }, { status: 401 })
    }

    const serviceSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: profile } = await serviceSupabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single()

    let customerId = profile?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id, brand: config.id },
      })
      customerId = customer.id
      await serviceSupabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id)
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: config.currency.toLowerCase(),
          unit_amount: pack.totalPriceMinor,
          product_data: {
            name: `${pack.label} — ${config.name}`,
            description: dashboard.upgradeCheckoutCreditsDescription.replace('{count}', String(pack.quantity)),
          },
        },
        quantity: 1,
      }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?credits_added=${pack.quantity}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/upgrade?canceled=true`,
      locale: 'auto',
      allow_promotion_codes: true,
      metadata: {
        type: 'credits',
        quantity: String(pack.quantity),
        amount_minor: String(pack.totalPriceMinor),
        supabase_user_id: user.id,
        brand: config.id,
        ...flattenAttributionForMetadata(attribution),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: unknown) {
    console.error('Credit checkout error:', error)
    return NextResponse.json({ error: errors.paymentError }, { status: 500 })
  }
}
