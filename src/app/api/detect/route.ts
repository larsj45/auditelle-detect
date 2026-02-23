import { NextRequest, NextResponse } from 'next/server'
import { detectAI } from '@/lib/pangram'
import { createClient } from '@supabase/supabase-js'
import { getResellerConfig, DAILY_LIMITS, VALID_PLAN_IDS } from '@/lib/config'
import { sendEmail, limitReachedEmail } from '@/lib/email'

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
    if (!user) {
      return NextResponse.json({ error: errors.unauthorized }, { status: 401 })
    }

    const serviceSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: profile } = await serviceSupabase
      .from('profiles')
      .select('plan, scans_today, scans_reset_at')
      .eq('id', user.id)
      .single()

    const plan = profile?.plan || 'free'
    const limit = DAILY_LIMITS[plan] || 5

    const now = new Date()
    const resetAt = profile?.scans_reset_at ? new Date(profile.scans_reset_at) : null
    let scansToday = profile?.scans_today || 0

    const todayUTC = now.toISOString().split('T')[0]
    const resetDay = resetAt ? resetAt.toISOString().split('T')[0] : null
    if (!resetAt || todayUTC !== resetDay) {
      scansToday = 0
      await serviceSupabase
        .from('profiles')
        .update({ scans_today: 0, scans_reset_at: now.toISOString() })
        .eq('id', user.id)
    }

    if (scansToday >= limit) {
      // Fire limit-reached email on first hit only (when scansToday == limit, not > limit)
      if (scansToday === limit && user.email) {
        const { data: profileForEmail } = await serviceSupabase
          .from('profiles')
          .select('full_name, limit_email_sent_at, scans_reset_at')
          .eq('id', user.id)
          .single()

        // Only send if we haven't sent one today
        const lastSent = profileForEmail?.limit_email_sent_at
          ? new Date(profileForEmail.limit_email_sent_at).toISOString().split('T')[0]
          : null
        if (lastSent !== todayUTC) {
          const name = profileForEmail?.full_name?.split(' ')[0] || user.email.split('@')[0].split('+')[0]
          const emailContent = limitReachedEmail(config, name)
          sendEmail({ to: user.email, subject: emailContent.subject, html: emailContent.html, text: emailContent.text })
            .then(() => serviceSupabase.from('profiles').update({ limit_email_sent_at: new Date().toISOString() }).eq('id', user.id))
            .catch(console.error)
        }
      }

      return NextResponse.json({
        error: errors.dailyLimitReached,
        scans_remaining: 0,
      }, { status: 429 })
    }

    const body = await request.json()
    const { text } = body

    if (!text || typeof text !== 'string' || text.trim().length < 50) {
      return NextResponse.json({ error: errors.textTooShort }, { status: 400 })
    }

    // Security fix: max text length
    if (text.trim().length > 50000) {
      return NextResponse.json({ error: errors.textTooLong }, { status: 413 })
    }

    const result = await detectAI(text.trim())

    const { error: updateError } = await serviceSupabase
      .from('profiles')
      .update({ scans_today: scansToday + 1 })
      .eq('id', user.id)
      .eq('scans_today', scansToday)

    if (updateError) {
      return NextResponse.json({
        error: errors.rateLimitRetry,
        scans_remaining: 0,
      }, { status: 429 })
    }

    await serviceSupabase.from('scans').insert({
      user_id: user.id,
      text_snippet: text.trim().substring(0, 200),
      ai_score: Math.round(result.ai_likelihood * 100),
      detected_model: result.detected_model || null,
      full_result: result,
    })

    return NextResponse.json({
      ...result,
      scans_remaining: limit - scansToday - 1,
    })
  } catch (error: unknown) {
    console.error('Detection error:', error)
    // Security fix: don't leak internal error messages in production
    const isDev = process.env.NODE_ENV === 'development'
    const message = isDev && error instanceof Error ? error.message : errors.internalError
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
