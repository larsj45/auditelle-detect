'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { CreditCard, User } from 'lucide-react'
import Link from 'next/link'
import { useConfig } from '@/components/ConfigProvider'

interface PaymentEvent {
  id: string
  event_name: 'credits_purchased' | 'subscription_started'
  plan: string | null
  quantity: number | null
  amount_minor: number | null
  currency: string | null
  checkout_type: 'credits' | 'subscription' | null
  created_at: string
}

export default function AccountPage() {
  const config = useConfig()
  const s = config.strings.dashboard
  const [user, setUser] = useState<{ email: string; full_name: string; plan: string; scan_credits: number } | null>(null)
  const [paymentEvents, setPaymentEvents] = useState<PaymentEvent[]>([])
  const [historyUnavailable, setHistoryUnavailable] = useState(false)
  const [loading, setLoading] = useState(true)
  const [portalLoading, setPortalLoading] = useState(false)

  useEffect(() => {
    loadUser()
  }, [])

  async function loadUser() {
    try {
      const { supabase } = await import('@/lib/supabase')
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, plan, scan_credits')
        .eq('id', authUser.id)
        .single()

      const { data: events, error: eventsError } = await supabase
        .from('payment_events')
        .select('id, event_name, plan, quantity, amount_minor, currency, checkout_type, created_at')
        .eq('user_id', authUser.id)
        .in('event_name', ['credits_purchased', 'subscription_started'])
        .order('created_at', { ascending: false })
        .limit(12)

      if (eventsError?.code === 'PGRST205' || eventsError?.message?.includes("Could not find the table 'public.payment_events'")) {
        setHistoryUnavailable(true)
      }

      setUser({
        email: authUser.email || '',
        full_name: profile?.full_name || '',
        plan: profile?.plan || 'free',
        scan_credits: profile?.scan_credits ?? 0,
      })
      setPaymentEvents((events as PaymentEvent[] | null) ?? [])
    } catch {
      console.error('Failed to load user')
    } finally {
      setLoading(false)
    }
  }

  async function openBillingPortal() {
    setPortalLoading(true)
    try {
      const { supabase } = await import('@/lib/supabase')
      const { data: { session } } = await supabase.auth.getSession()

      const response = await fetch('/api/billing-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.access_token && { Authorization: `Bearer ${session.access_token}` }),
        },
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      console.error('Failed to open billing portal')
    } finally {
      setPortalLoading(false)
    }
  }

  // Build plan labels from config
  const planLabels: Record<string, string> = { free: config.plans.homepage[0]?.name || 'Free' }
  for (const plan of config.plans.upgrade) {
    planLabels[plan.id] = plan.name
  }

  if (loading) {
    return <div className="card text-center text-gray-500 py-12">{s.historyLoading}</div>
  }

  const userPlan = user?.plan || 'free'
  const scansLabel = s.scansPerDay[userPlan] || s.scansPerDay['default'] || ''

  function formatAnalysisCount(count: number) {
    return `${count} ${count === 1 ? s.upgradeCreditSingular : s.upgradeCreditPlural}`
  }

  function formatMoney(amountMinor: number | null, currency: string | null) {
    if (amountMinor === null || !currency) return null

    try {
      return new Intl.NumberFormat(config.locale.replace('_', '-'), {
        style: 'currency',
        currency,
      }).format(amountMinor / 100)
    } catch {
      return `${currency} ${(amountMinor / 100).toFixed(2)}`
    }
  }

  function describeEvent(event: PaymentEvent) {
    if (event.event_name === 'credits_purchased') {
      const count = event.quantity ?? 0
      return `${count} ${count === 1 ? 'crédito' : 'créditos'} adicionados`
    }

    if (event.plan) {
      return `Assinatura ${planLabels[event.plan] || event.plan} iniciada`
    }

    return 'Assinatura iniciada'
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-[var(--navy)]">{s.accountTitle}</h1>

      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-[var(--accent)]" />
          <h2 className="text-lg font-semibold text-[var(--navy)]">{s.profileLabel}</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">{s.nameLabel}</label>
            <p className="font-medium text-[var(--navy)]">{user?.full_name || '\u2014'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">{s.emailLabel}</label>
            <p className="font-medium text-[var(--navy)]">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-5 h-5 text-[var(--accent)]" />
          <h2 className="text-lg font-semibold text-[var(--navy)]">{s.subscriptionLabel}</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            {userPlan === 'free' ? (
              <>
                <p className="font-medium text-[var(--navy)]">{planLabels[userPlan] || 'Pay-per-scan'}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {formatAnalysisCount(user?.scan_credits ?? 0)} · {s.upgradePerAnalysis.replace('{price}', formatMoney(config.creditPricePerScanMinor, config.currency) || '')}
                </p>
              </>
            ) : (
              <>
                <p className="font-medium text-[var(--navy)]">
                  {s.plan} {planLabels[userPlan] || userPlan}
                </p>
                <p className="text-sm text-gray-500 mt-1">{scansLabel}</p>
              </>
            )}
          </div>
          <div className="flex gap-3">
            {userPlan === 'free' ? (
              <Link href="/dashboard/upgrade" className="btn-primary text-sm">
                {s.upgradeBuy}
              </Link>
            ) : (
              <button
                onClick={openBillingPortal}
                disabled={portalLoading}
                className="btn-secondary text-sm"
              >
                {portalLoading ? s.managingSubscription : s.manageSubscription}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-5 h-5 text-[var(--accent)]" />
          <h2 className="text-lg font-semibold text-[var(--navy)]">Compras e assinaturas</h2>
        </div>

        {historyUnavailable ? (
          <p className="text-sm text-gray-500">O histórico de compras vai aparecer aqui depois que a migration de pagamentos for aplicada no banco remoto.</p>
        ) : paymentEvents.length === 0 ? (
          <p className="text-sm text-gray-500">Nenhuma compra registrada ainda.</p>
        ) : (
          <div className="space-y-3">
            {paymentEvents.map((event) => {
              const amount = formatMoney(event.amount_minor, event.currency)

              return (
                <div
                  key={event.id}
                  className="flex items-start justify-between gap-4 rounded-xl border border-gray-100 px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-[var(--navy)]">{describeEvent(event)}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(event.created_at).toLocaleDateString(config.locale.replace('_', '-'), {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    {amount && <p className="font-medium text-[var(--navy)]">{amount}</p>}
                    <p className="text-xs uppercase tracking-wide text-gray-400">
                      {event.checkout_type === 'credits' ? 'Créditos' : 'Assinatura'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
