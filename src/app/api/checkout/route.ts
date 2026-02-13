import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    // 1. Auth check
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Non autorisé', step: 'auth_header' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    
    // 2. Parse body first (before any async operations)
    let plan = 'starter'
    try {
      const body = await request.json()
      plan = body.plan || 'starter'
    } catch {
      // Default to starter if no body
    }

    // 3. Validate user
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    )

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Non autorisé', step: 'user_validation', detail: userError?.message }, { status: 401 })
    }

    // 4. Get/create Stripe customer
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
      return NextResponse.json({ error: 'Erreur profil', step: 'profile_fetch', detail: profileError.message }, { status: 500 })
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
        return NextResponse.json({ error: 'Erreur création client Stripe', step: 'stripe_customer', detail: msg }, { status: 500 })
      }
    }

    // 5. Get price ID - support both old and new plan names
    const priceIds: Record<string, string | undefined> = {
      // New plans
      student: process.env.STRIPE_STUDENT_PRICE_ID,
      starter: process.env.STRIPE_STARTER_PRICE_ID || process.env.STRIPE_PRO_PRICE_ID,
      // Legacy plan name (maps to starter)
      pro: process.env.STRIPE_STARTER_PRICE_ID || process.env.STRIPE_PRO_PRICE_ID,
      // Team & department plans
      equipe: process.env.STRIPE_EQUIPE_PRICE_ID,
      departement: process.env.STRIPE_DEPARTEMENT_PRICE_ID,
      // Legacy/unchanged
      university: process.env.STRIPE_UNIVERSITY_PRICE_ID,
      enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID,
    }
    
    const priceId = priceIds[plan]
    if (!priceId) {
      return NextResponse.json({ 
        error: 'Plan invalide ou non configuré', 
        step: 'price_id',
        plan,
        available: Object.keys(priceIds).filter(k => priceIds[k])
      }, { status: 400 })
    }

    // 6. Create checkout session
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
      return NextResponse.json({ error: 'Erreur création session', step: 'checkout_session', detail: msg }, { status: 500 })
    }
  } catch (error: unknown) {
    console.error('Checkout error:', error)
    const message = error instanceof Error ? error.message : 'Erreur de paiement'
    return NextResponse.json({ error: message, step: 'unknown' }, { status: 500 })
  }
}
