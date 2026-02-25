import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import { getResellerConfig, VALID_PLAN_IDS } from '@/lib/config'

export const dynamic = 'force-dynamic'


export async function POST(request: NextRequest) {
  const config = await getResellerConfig()
  const errors = config.strings.errors

  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: errors.unauthorized, step: 'auth_header' }, { status: 401 })
    }

    const match = authHeader.match(/^Bearer\s+(.+)$/)
    if (!match) return NextResponse.json({ error: errors.unauthorized, step: 'auth_header' }, { status: 401 })
    const token = match[1]

    let plan = 'starter'
    try {
      const body = await request.json()
      plan = body.plan || 'starter'
    } catch {
      // Default to starter if no body
    }

    // Security fix: validate plan against whitelist
    if (!VALID_PLAN_IDS.includes(plan as typeof VALID_PLAN_IDS[number])) {
      plan = 'starter'
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    )

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: errors.unauthorized, step: 'user_validation' }, { status: 401 })
    }

    const serviceSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: profile, error: profileError } = await serviceSupabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single()

    if (profileError) {
      return NextResponse.json({ error: errors.internalError, step: 'profile_fetch' }, { status: 500 })
    }

    let customerId = profile?.stripe_customer_id

    if (!customerId) {
      try {
        const customer = await stripe.customers.create({
          email: user.email,
          metadata: { supabase_user_id: user.id },
        })
        customerId = customer.id
        await serviceSupabase
          .from('profiles')
          .update({ stripe_customer_id: customerId })
          .eq('id', user.id)
      } catch (stripeError) {
        const msg = stripeError instanceof Error ? stripeError.message : 'Unknown stripe error'
        return NextResponse.json({ error: errors.paymentError, step: 'stripe_customer', detail: msg }, { status: 500 })
      }
    }

    const priceIds: Record<string, string | undefined> = {
      student: process.env.STRIPE_STUDENT_PRICE_ID,
      starter: process.env.STRIPE_STARTER_PRICE_ID,
      pro: process.env.STRIPE_PRO_PRICE_ID,
      equipe: process.env.STRIPE_EQUIPE_PRICE_ID,
      departement: process.env.STRIPE_DEPARTEMENT_PRICE_ID,
      university: process.env.STRIPE_UNIVERSITY_PRICE_ID,
      enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID,
    }

    const priceId = priceIds[plan]
    if (!priceId) {
      return NextResponse.json({
        error: errors.invalidPlan,
        step: 'price_id',
        plan,
      }, { status: 400 })
    }

    try {
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`,
        metadata: { supabase_user_id: user.id, plan },
        allow_promotion_codes: true,
      })

      return NextResponse.json({ url: session.url })
    } catch (sessionError) {
      const msg = sessionError instanceof Error ? sessionError.message : 'Unknown session error'
      return NextResponse.json({ error: errors.paymentError, step: 'checkout_session', detail: msg }, { status: 500 })
    }
  } catch (error: unknown) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: errors.paymentError, step: 'unknown' }, { status: 500 })
  }
}
