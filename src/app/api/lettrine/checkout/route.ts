import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { LETTRINE_CHECKOUT_TYPE, getUnitPack, type LettrineCheckoutMetadata } from '@/lib/lettrine/packs'
import { isLettrineLocale } from '@/lib/lettrine/signup'
import { appOrigin, lettrineServiceClient, userFromRequest } from '@/lib/lettrine/server'
import { getLettrineAppCopy } from '@/components/lettrine/appCopy'

export const dynamic = 'force-dynamic'

const fail = (errorCode: string, status: number) => NextResponse.json({ success: false, errorCode }, { status })

export async function POST(request: NextRequest) {
  const user = await userFromRequest(request)
  if (!user) return fail('unauthorized', 401)

  let body: Record<string, unknown>
  try {
    body = JSON.parse(await request.text())
  } catch {
    return fail('invalid_request', 400)
  }
  const pack = getUnitPack(body.pack)
  if (!pack) return fail('invalid_request', 400)

  const service = lettrineServiceClient()
  const { data: membership } = await service
    .from('lettrine_members')
    .select('lettrine_orgs(id, name, locale, stripe_customer_id)')
    .eq('user_id', user.id)
    .maybeSingle()
  const org = membership?.lettrine_orgs as unknown as
    | { id: string; name: string; locale: string; stripe_customer_id: string | null }
    | null
  if (!org || !isLettrineLocale(org.locale)) return fail('no_org', 404)
  const copy = getLettrineAppCopy(org.locale)

  try {
    let customerId = org.stripe_customer_id
    if (!customerId) {
      const customer = await stripe.customers.create({
        name: org.name,
        email: user.email,
        preferred_locales: [org.locale],
        metadata: { lettrine_org_id: org.id, product: 'lettrine' },
      })
      customerId = customer.id
      await service.from('lettrine_orgs').update({ stripe_customer_id: customerId }).eq('id', org.id)
    }

    const origin = appOrigin(request)
    const metadata: LettrineCheckoutMetadata = {
      type: LETTRINE_CHECKOUT_TYPE,
      org_id: org.id,
      units: String(pack.units),
      pack: pack.id,
    }
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'eur',
            unit_amount: pack.amountCents,
            tax_behavior: 'exclusive',
            product_data: { name: copy.buy.productName(pack.units) },
          },
        },
      ],
      // B2B: collect the VAT number and billing address, issue an invoice.
      // Stripe Tax is switched on by env once the account is configured.
      automatic_tax: { enabled: process.env.LETTRINE_STRIPE_TAX === '1' },
      tax_id_collection: { enabled: true },
      billing_address_collection: 'required',
      customer_update: { name: 'auto', address: 'auto' },
      invoice_creation: { enabled: true },
      locale: org.locale,
      success_url: `${origin}${copy.paths.dashboard}?purchase=success`,
      cancel_url: `${origin}${copy.paths.buy}?canceled=1`,
      metadata: { ...metadata },
      payment_intent_data: { metadata: { ...metadata } },
    })
    return NextResponse.json({ success: true, url: session.url })
  } catch (error) {
    console.error('[lettrine-checkout] failed:', error instanceof Error ? error.message : error)
    return fail('payment_unavailable', 502)
  }
}
