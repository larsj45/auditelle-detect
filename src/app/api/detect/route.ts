import { NextRequest, NextResponse } from 'next/server'
import { detectAI, detectPlagiarism } from '@/lib/pangram'
import { createClient } from '@supabase/supabase-js'
import { getResellerConfig, DAILY_LIMITS, VALID_PLAN_IDS, MONTHLY_PLANS } from '@/lib/config'
import { sendEmail, limitReachedEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'


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

    // limiar-vip tem quota mensal — outros planos têm quota diária
    const isMonthlyPlan = MONTHLY_PLANS.has(plan)
    const todayUTC = now.toISOString().split('T')[0]
    let shouldReset = false

    if (isMonthlyPlan) {
      const nowYM = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
      const resetYM = resetAt
        ? `${resetAt.getFullYear()}-${String(resetAt.getMonth() + 1).padStart(2, '0')}`
        : null
      shouldReset = !resetAt || nowYM !== resetYM
    } else {
      const resetDay = resetAt ? resetAt.toISOString().split('T')[0] : null
      shouldReset = !resetAt || todayUTC !== resetDay
    }

    if (shouldReset) {
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

        // Only send once per reset period (daily or monthly)
        const lastSentDate = profileForEmail?.limit_email_sent_at
          ? new Date(profileForEmail.limit_email_sent_at)
          : null
        const alreadySent = isMonthlyPlan
          ? lastSentDate && `${lastSentDate.getFullYear()}-${String(lastSentDate.getMonth() + 1).padStart(2, '0')}` === `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
          : lastSentDate && lastSentDate.toISOString().split('T')[0] === todayUTC
        if (!alreadySent) {
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
    const { text, mode = 'ai' } = body

    if (!text || typeof text !== 'string' || text.trim().length < 50) {
      return NextResponse.json({ error: errors.textTooShort }, { status: 400 })
    }

    // Security fix: max text length
    if (text.trim().length > 50000) {
      return NextResponse.json({ error: errors.textTooLong }, { status: 413 })
    }

    const trimmedText = text.trim()

    // Route to appropriate detection API
    if (mode === 'plagiarism') {
      const plagResult = await detectPlagiarism(trimmedText)

      const { data: freshProfilePlag } = await serviceSupabase
        .from('profiles')
        .select('monthly_usage')
        .eq('id', user.id)
        .single()
      const currentMonthlyUsagePlag = freshProfilePlag?.monthly_usage || 0

      const { error: updateError } = await serviceSupabase
        .from('profiles')
        .update({ scans_today: scansToday + 1, monthly_usage: currentMonthlyUsagePlag + 1 })
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
        text_snippet: trimmedText.substring(0, 200),
        ai_score: Math.round(plagResult.percent_plagiarized * 100),
        detected_model: null,
        full_result: plagResult,
        scan_type: 'plagiarism',
      })

      return NextResponse.json({
        ...plagResult,
        scans_remaining: limit - scansToday - 1,
      })
    }

    // Default: AI detection
    const result = await detectAI(trimmedText)

    const { data: freshProfileAI } = await serviceSupabase
      .from('profiles')
      .select('monthly_usage')
      .eq('id', user.id)
      .single()
    const currentMonthlyUsageAI = freshProfileAI?.monthly_usage || 0

    const { error: updateError } = await serviceSupabase
      .from('profiles')
      .update({ scans_today: scansToday + 1, monthly_usage: currentMonthlyUsageAI + 1 })
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
      text_snippet: trimmedText.substring(0, 200),
      ai_score: Math.round(result.ai_likelihood * 100),
      detected_model: result.headline || null,
      full_result: result,
      scan_type: 'ai',
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
