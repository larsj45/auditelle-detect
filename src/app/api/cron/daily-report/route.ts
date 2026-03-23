import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const CRON_SECRET = process.env.CRON_SECRET
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL

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

  // Get total count
  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('id', { count: 'exact', head: true })

  // Get all profiles for metrics
  const { data: profiles } = await supabase
    .from('profiles')
    .select('created_at, scans_today, monthly_usage, plan')

  const signupsToday = profiles?.filter(u => u.created_at?.startsWith(todayStr)).length || 0
  const signupsYesterday = profiles?.filter(u => u.created_at?.startsWith(yesterday)).length || 0
  const activeToday = profiles?.filter(u => (u.scans_today || 0) > 0).length || 0
  const activatedTotal = profiles?.filter(u => (u.monthly_usage || 0) > 0 || (u.scans_today || 0) > 0).length || 0
  const paying = profiles?.filter(u => u.plan !== 'free').length || 0
  const total = totalUsers || 0
  const activationRate = total > 0 ? Math.round(activatedTotal / total * 100) : 0

  // Get scans today
  const { count: scansToday } = await supabase
    .from('scans')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', `${todayStr}T00:00:00`)

  const signupDelta = signupsToday - signupsYesterday
  const signupArrow = signupDelta > 0 ? `↑${signupDelta}` : signupDelta < 0 ? `↓${Math.abs(signupDelta)}` : '→'

  const text = [
    `*Auditelle Daily Report — ${todayStr}*`,
    '',
    '📊 *Métriques*',
    `• Utilisateurs: *${total}*`,
    `• Signups: *${signupsToday}* (${signupArrow} vs hier: ${signupsYesterday})`,
    `• Scans: *${scansToday || 0}*`,
    `• Actifs aujourd'hui: *${activeToday}*`,
    `• Activation: *${activationRate}%* (${activatedTotal}/${total})`,
    `• Payants: *${paying}*`,
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

  return NextResponse.json({ success: true, metrics: { total, signupsToday, scansToday, activeToday, activationRate, paying } })
}
