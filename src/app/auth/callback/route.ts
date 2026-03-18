import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getResellerConfig } from '@/lib/config'
import { sendEmail, welcomeEmail } from '@/lib/email'

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
      // Send welcome email on first confirmation (fire-and-forget)
      sendWelcomeEmail(data.user.id, data.user.email).catch(console.error)

      return NextResponse.redirect(`${origin}/dashboard`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
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
