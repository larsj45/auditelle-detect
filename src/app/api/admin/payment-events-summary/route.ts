import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getResellerConfig } from '@/lib/config'

export const dynamic = 'force-dynamic'

interface PaymentEventRow {
  event_name: 'checkout_completed' | 'credits_purchased' | 'subscription_started'
  checkout_type: 'credits' | 'subscription' | null
  plan: string | null
  quantity: number | null
  amount_minor: number | null
  currency: string | null
  landing_path: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  referrer: string | null
  created_at: string
}

function emptySummary(days: number, currency: string, schemaReady = true, message?: string) {
  return {
    days,
    currency,
    schemaReady,
    ...(message ? { message } : {}),
    kpis: {
      checkout_completed: 0,
      revenue_minor: 0,
      credits_purchased: 0,
      credit_orders: 0,
      subscriptions_started: 0,
    },
    topSources: [],
    topCampaigns: [],
    topLandings: [],
    planMix: [],
    recentCheckouts: [],
  }
}

function isMissingPaymentEventsSchema(error: { code?: string | null; message?: string | null }) {
  return error.code === 'PGRST205'
    || error.code === 'PGRST204'
    || error.message?.includes("Could not find the table 'public.payment_events'") === true
    || error.message?.includes("column 'landing_path'") === true
    || error.message?.includes("column 'utm_source'") === true
}

function parseAdminEmails() {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

function isAuthorized(email: string | undefined) {
  if (!email) return false
  if (process.env.NODE_ENV !== 'production') return true
  return parseAdminEmails().includes(email.toLowerCase())
}

function sumRevenue(events: PaymentEventRow[]) {
  return events.reduce((total, event) => total + (event.amount_minor || 0), 0)
}

function labelCredits(event: PaymentEventRow) {
  const quantity = event.quantity ?? 0
  return `${quantity} credit${quantity === 1 ? '' : 's'}`
}

function groupEvents(
  events: PaymentEventRow[],
  keyFn: (event: PaymentEventRow) => string
) {
  const groups = new Map<string, { label: string; orders: number; revenue_minor: number; credits: number; subscriptions: number }>()

  for (const event of events) {
    const label = keyFn(event)
    const current = groups.get(label) || {
      label,
      orders: 0,
      revenue_minor: 0,
      credits: 0,
      subscriptions: 0,
    }

    if (event.event_name === 'checkout_completed') {
      current.orders += 1
      current.revenue_minor += event.amount_minor || 0
    }

    if (event.event_name === 'credits_purchased') {
      current.credits += event.quantity || 0
    }

    if (event.event_name === 'subscription_started') {
      current.subscriptions += 1
    }

    groups.set(label, current)
  }

  return [...groups.values()]
    .sort((a, b) => b.revenue_minor - a.revenue_minor || b.orders - a.orders)
    .slice(0, 8)
}

export async function GET(request: NextRequest) {
  const config = await getResellerConfig()
  const authHeader = request.headers.get('Authorization')

  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.replace(/^Bearer\s+/, '')

  const authClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  )

  const { data: { user }, error: userError } = await authClient.auth.getUser()
  if (userError || !user || !isAuthorized(user.email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const daysParam = Number(new URL(request.url).searchParams.get('days') || '30')
  const days = Number.isFinite(daysParam) && daysParam > 0 ? Math.min(daysParam, 120) : 30
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

  const serviceSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await serviceSupabase
    .from('payment_events')
    .select('event_name, checkout_type, plan, quantity, amount_minor, currency, landing_path, utm_source, utm_medium, utm_campaign, referrer, created_at')
    .eq('brand', config.id)
    .gte('created_at', since)
    .order('created_at', { ascending: false })

  if (error) {
    if (isMissingPaymentEventsSchema(error)) {
      return NextResponse.json(
        emptySummary(days, config.currency, false, 'A tabela payment_events ainda não foi aplicada no banco remoto.')
      )
    }

    console.error('[payment-events-summary] query failed', error)
    return NextResponse.json({ error: 'Failed to load summary' }, { status: 500 })
  }

  const events = (data || []) as PaymentEventRow[]
  const checkoutCompleted = events.filter((event) => event.event_name === 'checkout_completed')
  const creditsPurchased = events.filter((event) => event.event_name === 'credits_purchased')
  const subscriptionsStarted = events.filter((event) => event.event_name === 'subscription_started')

  const currency = checkoutCompleted[0]?.currency || config.currency

  const topSources = groupEvents(events, (event) => {
    const source = event.utm_source || 'direct'
    const medium = event.utm_medium || 'unknown'
    return `${source} / ${medium}`
  })

  const topCampaigns = groupEvents(events, (event) => event.utm_campaign || 'sem campanha')
  const topLandings = groupEvents(events, (event) => event.landing_path || '/')
  const planMix = groupEvents(events, (event) => {
    if (event.checkout_type === 'credits') return labelCredits(event)
    return event.plan || 'subscription'
  })

  return NextResponse.json({
    ...emptySummary(days, currency),
    kpis: {
      checkout_completed: checkoutCompleted.length,
      revenue_minor: sumRevenue(checkoutCompleted),
      credits_purchased: creditsPurchased.reduce((sum, event) => sum + (event.quantity || 0), 0),
      credit_orders: creditsPurchased.length,
      subscriptions_started: subscriptionsStarted.length,
    },
    topSources,
    topCampaigns,
    topLandings,
    planMix,
    recentCheckouts: checkoutCompleted.slice(0, 12),
  })
}
