import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getResellerConfig } from '@/lib/config'
import { sendEmail, welcomeEmail } from '@/lib/email'
import { isInstitutionalEmail } from '@/lib/institutional-email'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
    )
    const { error, data } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Grant the institutional pilot pack once (idempotent), then welcome email.
      // Both fire-and-forget so they never block the redirect to the dashboard.
      grantInstitutionalPilotIfEligible(data.user.id, data.user.email).catch(console.error)
      sendWelcomeEmail(data.user.id, data.user.email).catch(console.error)

      return NextResponse.redirect(`${origin}/dashboard`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
}

/**
 * Grant the free institutional pilot pack to eligible (institutional) emails.
 * Idempotent: guarded by the `pilot_credits_granted` flag on the profile, so it
 * never re-grants on subsequent logins. Non-institutional emails keep their
 * default credits (pay-per-scan) and are still flagged as processed.
 */
async function grantInstitutionalPilotIfEligible(userId: string, email: string | undefined) {
  if (!email) return

  const config = await getResellerConfig()
  const pilotCredits = config.institutionalPilotCredits ?? 0
  if (pilotCredits <= 0) return

  const serviceSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: profile } = await serviceSupabase
    .from('profiles')
    .select('scan_credits, pilot_credits_granted')
    .eq('id', userId)
    .single()

  // Already processed → never re-grant.
  if (profile?.pilot_credits_granted) return

  const eligible = isInstitutionalEmail(email, {
    allowlist: config.institutionalEmailAllowlist,
  })

  const update: { pilot_credits_granted: boolean; scan_credits?: number } = {
    pilot_credits_granted: true,
  }
  if (eligible) {
    update.scan_credits = (profile?.scan_credits ?? 0) + pilotCredits
  }

  await serviceSupabase.from('profiles').update(update).eq('id', userId)
}

async function sendWelcomeEmail(userId: string, email: string | undefined) {
  if (!email) return

  const serviceSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: profile } = await serviceSupabase
    .from('profiles')
    .select('full_name, welcome_email_sent')
    .eq('id', userId)
    .single()

  if (profile?.welcome_email_sent) return

  const config = await getResellerConfig()
  const rawName = email.split('@')[0].split('+')[0]
  const name = profile?.full_name || rawName.charAt(0).toUpperCase() + rawName.slice(1)
  const content = welcomeEmail(config, name)

  const result = await sendEmail({
    to: email,
    subject: content.subject,
    html: content.html,
    text: content.text,
  })

  if (result.success) {
    await serviceSupabase
      .from('profiles')
      .update({ welcome_email_sent: true })
      .eq('id', userId)
  }
}
