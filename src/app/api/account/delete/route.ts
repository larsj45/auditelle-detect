import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { stripe } from '@/lib/stripe'
import { getResellerConfig } from '@/lib/config'
import { sendEmail } from '@/lib/email'
import { escapeHtml } from '@/lib/sanitize'
import { confirmationMatches, isBillableSubscription } from '@/lib/account-deletion'

export const dynamic = 'force-dynamic'

// Deletes the signed-in user's account. Order matters: billing is stopped
// first, so a Stripe failure aborts before any data is removed.
// auth.users -> profiles -> scans cascade; payment_events keep their rows
// with user_id set to NULL; the Stripe customer and invoices are kept for
// accounting obligations.
export async function POST(request: NextRequest) {
  const config = await getResellerConfig()
  const errors = config.strings.errors
  const s = config.strings.accountDeletion
  if (!s) return NextResponse.json({ error: errors.internalError }, { status: 404 })

  const match = request.headers.get('Authorization')?.match(/^Bearer\s+(.+)$/)
  if (!match) return NextResponse.json({ error: errors.unauthorized }, { status: 401 })

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${match[1]}` } } }
  )
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) return NextResponse.json({ error: errors.unauthorized }, { status: 401 })

  let body: unknown = null
  try {
    body = await request.json()
  } catch {
    // handled below
  }
  const typed = body && typeof body === 'object' ? (body as Record<string, unknown>).confirmEmail : undefined
  if (!confirmationMatches(typed, user.email)) {
    return NextResponse.json({ error: s.emailMismatch, step: 'confirmation' }, { status: 400 })
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

  if (profile?.stripe_customer_id) {
    try {
      const subscriptions = await stripe.subscriptions.list({
        customer: profile.stripe_customer_id,
        status: 'all',
        limit: 100,
      })
      for (const sub of subscriptions.data) {
        if (isBillableSubscription(sub.status)) {
          await stripe.subscriptions.cancel(sub.id)
        }
      }
    } catch (err) {
      console.error('[account-delete] stripe cancel failed', err instanceof Error ? err.message : err)
      return NextResponse.json({ error: s.error, step: 'stripe' }, { status: 502 })
    }
  }

  const { error: deleteError } = await serviceSupabase.auth.admin.deleteUser(user.id)
  if (deleteError) {
    console.error('[account-delete] delete failed', deleteError.message)
    return NextResponse.json({ error: s.error, step: 'delete' }, { status: 500 })
  }
  console.info('[account-delete] account deleted', { userId: user.id })

  if (user.email) {
    await sendEmail({
      to: user.email,
      subject: s.emailSubject,
      html: `<p style="font-family:sans-serif;font-size:14px;line-height:1.6">${escapeHtml(s.emailBody).replace(/\n/g, '<br>')}</p>`,
      text: s.emailBody,
      replyTo: config.supportEmail,
    })
  }

  return NextResponse.json({ ok: true })
}
