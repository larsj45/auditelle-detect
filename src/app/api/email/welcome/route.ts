import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getResellerConfig } from '@/lib/config'
import { sendEmail, welcomeEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'


// This endpoint is called after successful signup
export async function POST(request: NextRequest) {
  const config = await getResellerConfig()
  const errors = config.strings.errors

  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: errors.unauthorized }, { status: 401 })
    }

    const match = authHeader.match(/^Bearer\s+(.+)$/)
    if (!match) return NextResponse.json({ error: errors.unauthorized }, { status: 401 })
    const token = match[1]

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user || !user.email) {
      return NextResponse.json({ error: errors.userNotFound }, { status: 404 })
    }

    // Get user profile for name
    const serviceSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: profile } = await serviceSupabase
      .from('profiles')
      .select('full_name, welcome_email_sent')
      .eq('id', user.id)
      .single()

    // Don't send if already sent
    if (profile?.welcome_email_sent) {
      return NextResponse.json({ message: errors.emailAlreadySent })
    }

    const rawName = user.email.split('@')[0].split('+')[0]
    const name = profile?.full_name || rawName.charAt(0).toUpperCase() + rawName.slice(1)
    const email = welcomeEmail(config, name)

    const result = await sendEmail({
      to: user.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
    })

    if (result.success) {
      // Mark welcome email as sent
      await serviceSupabase
        .from('profiles')
        .update({ welcome_email_sent: true })
        .eq('id', user.id)
    }

    return NextResponse.json({ success: result.success })
  } catch (error) {
    console.error('Welcome email error:', error)
    return NextResponse.json({ error: errors.internalError }, { status: 500 })
  }
}
