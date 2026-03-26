import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const CRON_SECRET = process.env.CRON_SECRET
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL
const RESELLER_ID = process.env.RESELLER_ID || 'auditelle-fr'

// MRR estimates per plan (monthly price in local currency)
const PLAN_MRR: Record<string, number> = {
  pro: 25,
  university: 149,
  enterprise: 499,
  'limiar-vip': 0,
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!SLACK_WEBHOOK_URL) {
    return NextResponse.json({ error: 'SLACK_WEBHOOK_URL not configured' }, { status: 500 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const now = new Date()
  const todayStr = now.toISOString().split('T')[0]
  const yesterday = new Date(now.getTime() - 86400000).toISOString().split('T')[0]
  const sevenDaysAgo = new Date(now.getTime() - 7 * 86400000).toISOString().split('T')[0]
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 86400000).toISOString().split('T')[0]

  // Get total count
  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('id', { count: 'exact', head: true })

  // Get all profiles for metrics
  const { data: profiles } = await supabase
    .from('profiles')
    .select('created_at, scans_today, monthly_usage, plan, email')

  const signupsToday = profiles?.filter(u => u.created_at?.startsWith(todayStr)).length || 0
  const signupsYesterday = profiles?.filter(u => u.created_at?.startsWith(yesterday)).length || 0
  const signups7d = profiles?.filter(u => u.created_at && u.created_at >= `${sevenDaysAgo}T00:00:00`).length || 0
  const signups30d = profiles?.filter(u => u.created_at && u.created_at >= `${thirtyDaysAgo}T00:00:00`).length || 0
  const activeToday = profiles?.filter(u => (u.scans_today || 0) > 0).length || 0
  const activatedTotal = profiles?.filter(u => (u.monthly_usage || 0) > 0 || (u.scans_today || 0) > 0).length || 0
  const total = totalUsers || 0
  const activationRate = total > 0 ? Math.round(activatedTotal / total * 100) : 0

  // Plan breakdown
  const planCounts: Record<string, number> = {}
  let estimatedMRR = 0
  for (const p of profiles || []) {
    const plan = p.plan || 'free'
    planCounts[plan] = (planCounts[plan] || 0) + 1
    if (plan !== 'free' && PLAN_MRR[plan]) {
      estimatedMRR += PLAN_MRR[plan]
    }
  }

  // Professional email ratio (non-gmail, non-yahoo, non-hotmail etc.)
  const professionalEmails = profiles?.filter(u => {
    const email = (u.email || '').toLowerCase()
    return email && !email.match(/@(gmail|yahoo|hotmail|outlook|live|icloud|protonmail|aol|mail)\./i)
  }).length || 0
  const proEmailRate = total > 0 ? Math.round(professionalEmails / total * 100) : 0

  // Get scans today and this week
  const { count: scansToday } = await supabase
    .from('scans')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', `${todayStr}T00:00:00`)

  const { count: scans7d } = await supabase
    .from('scans')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', `${sevenDaysAgo}T00:00:00`)

  const signupDelta = signupsToday - signupsYesterday
  const signupArrow = signupDelta > 0 ? `+${signupDelta}` : signupDelta < 0 ? `${signupDelta}` : '='

  // Reseller display name
  const resellerNames: Record<string, string> = {
    'auditelle-fr': 'Auditelle',
    'novalearn-uk': 'NovaLearn',
    'veritexto-es': 'VeriTexto ES',
    'veritexto-pt': 'VeriTexto PT',
    'klartext-se': 'TextVakt',
  }
  const resellerName = resellerNames[RESELLER_ID] || RESELLER_ID

  // Currency
  const currency = RESELLER_ID.includes('-uk') ? '£' : RESELLER_ID.includes('-se') ? 'kr' : '€'

  // Plan breakdown string
  const planBreakdown = Object.entries(planCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([plan, count]) => `${plan}: ${count}`)
    .join(' | ')

  // New signups today (names)
  const todaySignups = profiles
    ?.filter(u => u.created_at?.startsWith(todayStr))
    .map(u => {
      const email = u.email || 'unknown'
      const domain = email.split('@')[1] || ''
      return `${email.split('@')[0]}@${domain}`
    }) || []

  const text = [
    `*${resellerName} Daily Report — ${todayStr}*`,
    '',
    ':chart_with_upwards_trend: *Users*',
    `• Total: *${total}*`,
    `• Signups today: *${signupsToday}* (${signupArrow} vs yesterday: ${signupsYesterday})`,
    `• Last 7d: *${signups7d}* | Last 30d: *${signups30d}*`,
    `• Pro emails: *${proEmailRate}%* (${professionalEmails}/${total})`,
    '',
    ':mag: *Activity*',
    `• Scans today: *${scansToday || 0}*`,
    `• Scans 7d: *${scans7d || 0}*`,
    `• Active today: *${activeToday}*`,
    `• Activation rate: *${activationRate}%* (${activatedTotal}/${total})`,
    '',
    ':moneybag: *Revenue*',
    `• Paying: *${total - (planCounts['free'] || 0)}*`,
    `• Estimated MRR: *${currency}${estimatedMRR}*`,
    `• Plans: ${planBreakdown}`,
    ...(todaySignups.length > 0
      ? ['', ':bust_in_silhouette: *New signups*', ...todaySignups.map(s => `• ${s}`)]
      : []),
  ].join('\n')

  const res = await fetch(SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: 'Slack post failed', detail: err }, { status: 502 })
  }

  return NextResponse.json({
    success: true,
    metrics: {
      total,
      signupsToday,
      signups7d,
      signups30d,
      scansToday,
      scans7d,
      activeToday,
      activationRate,
      paying: total - (planCounts['free'] || 0),
      estimatedMRR,
      proEmailRate,
      planCounts,
    },
  })
}
