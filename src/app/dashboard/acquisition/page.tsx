'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { BarChart3, CreditCard, Globe, Megaphone, ShoppingCart } from 'lucide-react'
import { useConfig } from '@/components/ConfigProvider'

interface GroupRow {
  label: string
  orders: number
  revenue_minor: number
  credits: number
  subscriptions: number
}

interface RecentCheckout {
  checkout_type: 'credits' | 'subscription' | null
  plan: string | null
  quantity: number | null
  amount_minor: number | null
  currency: string | null
  landing_path: string | null
  utm_source: string | null
  utm_campaign: string | null
  created_at: string
}

interface AcquisitionSummary {
  days: number
  currency: string
  schemaReady?: boolean
  message?: string
  kpis: {
    checkout_completed: number
    revenue_minor: number
    credits_purchased: number
    credit_orders: number
    subscriptions_started: number
  }
  topSources: GroupRow[]
  topCampaigns: GroupRow[]
  topLandings: GroupRow[]
  planMix: GroupRow[]
  recentCheckouts: RecentCheckout[]
}

function formatMoney(amountMinor: number, currency: string, locale: string) {
  try {
    return new Intl.NumberFormat(locale.replace('_', '-'), {
      style: 'currency',
      currency,
    }).format(amountMinor / 100)
  } catch {
    return `${currency} ${(amountMinor / 100).toFixed(2)}`
  }
}

function SummaryTable({
  title,
  icon,
  rows,
  currency,
  locale,
}: {
  title: string
  icon: React.ReactNode
  rows: GroupRow[]
  currency: string
  locale: string
}) {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-lg font-semibold text-[var(--navy)]">{title}</h2>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-gray-500">Sem dados ainda.</p>
      ) : (
        <div className="space-y-3">
          {rows.map((row) => (
            <div key={row.label} className="flex items-start justify-between gap-4 rounded-xl border border-gray-100 px-4 py-3">
              <div>
                <p className="font-medium text-[var(--navy)]">{row.label}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {row.orders} checkout{row.orders === 1 ? '' : 's'} · {row.subscriptions} assinatura{row.subscriptions === 1 ? '' : 's'} · {row.credits} créditos
                </p>
              </div>
              <div className="text-right text-sm font-semibold text-[var(--navy)]">
                {formatMoney(row.revenue_minor, currency, locale)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function AcquisitionPage() {
  const config = useConfig()
  const [summary, setSummary] = useState<AcquisitionSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadSummary() {
      try {
        const { supabase } = await import('@/lib/supabase')
        const { data: { session } } = await supabase.auth.getSession()

        if (!session?.access_token) {
          setError('Faça login para acessar esta visão.')
          return
        }

        const response = await fetch('/api/admin/payment-events-summary?days=30', {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        })

        if (!response.ok) {
          throw new Error(response.status === 403 ? 'Acesso restrito. Configure ADMIN_EMAILS em produção.' : 'Falha ao carregar os dados.')
        }

        const data = await response.json()
        setSummary(data)
      } catch (fetchError) {
        const message = fetchError instanceof Error ? fetchError.message : 'Falha ao carregar os dados.'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    loadSummary()
  }, [])

  if (loading) {
    return <div className="card text-center text-gray-500 py-12">Carregando aquisição…</div>
  }

  if (error) {
    return (
      <div className="max-w-5xl space-y-6">
        <h1 className="text-2xl font-bold text-[var(--navy)]">Aquisição</h1>
        <div className="card">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    )
  }

  if (!summary) return null

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--navy)]">Aquisição</h1>
        <p className="text-sm text-gray-500 mt-1">Últimos {summary.days} dias. Receita confirmada por checkout concluído, segmentada por canal, campanha, landing e tipo de compra.</p>
      </div>

      {summary.schemaReady === false && (
        <div className="card border border-amber-200 bg-amber-50 text-amber-900">
          <p className="text-sm">{summary.message || 'A tabela de eventos de pagamento ainda não está disponível no banco remoto.'}</p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="card">
          <p className="text-xs uppercase tracking-wide text-gray-400">Receita</p>
          <p className="text-2xl font-bold text-[var(--navy)] mt-2">{formatMoney(summary.kpis.revenue_minor, summary.currency, config.locale)}</p>
        </div>
        <div className="card">
          <p className="text-xs uppercase tracking-wide text-gray-400">Checkouts</p>
          <p className="text-2xl font-bold text-[var(--navy)] mt-2">{summary.kpis.checkout_completed}</p>
        </div>
        <div className="card">
          <p className="text-xs uppercase tracking-wide text-gray-400">Pedidos de créditos</p>
          <p className="text-2xl font-bold text-[var(--navy)] mt-2">{summary.kpis.credit_orders}</p>
        </div>
        <div className="card">
          <p className="text-xs uppercase tracking-wide text-gray-400">Créditos vendidos</p>
          <p className="text-2xl font-bold text-[var(--navy)] mt-2">{summary.kpis.credits_purchased}</p>
        </div>
        <div className="card">
          <p className="text-xs uppercase tracking-wide text-gray-400">Assinaturas iniciadas</p>
          <p className="text-2xl font-bold text-[var(--navy)] mt-2">{summary.kpis.subscriptions_started}</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SummaryTable title="Top canais" icon={<Megaphone className="w-5 h-5 text-[var(--accent)]" />} rows={summary.topSources} currency={summary.currency} locale={config.locale} />
        <SummaryTable title="Top campanhas" icon={<BarChart3 className="w-5 h-5 text-[var(--accent)]" />} rows={summary.topCampaigns} currency={summary.currency} locale={config.locale} />
        <SummaryTable title="Top landings" icon={<Globe className="w-5 h-5 text-[var(--accent)]" />} rows={summary.topLandings} currency={summary.currency} locale={config.locale} />
        <SummaryTable title="Mix de compra" icon={<CreditCard className="w-5 h-5 text-[var(--accent)]" />} rows={summary.planMix} currency={summary.currency} locale={config.locale} />
      </div>

      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="w-5 h-5 text-[var(--accent)]" />
          <h2 className="text-lg font-semibold text-[var(--navy)]">Checkouts recentes</h2>
        </div>
        {summary.recentCheckouts.length === 0 ? (
          <p className="text-sm text-gray-500">Sem checkouts ainda.</p>
        ) : (
          <div className="space-y-3">
            {summary.recentCheckouts.map((checkout, index) => (
              <div key={`${checkout.created_at}-${index}`} className="flex items-start justify-between gap-4 rounded-xl border border-gray-100 px-4 py-3">
                <div>
                  <p className="font-medium text-[var(--navy)]">
                    {checkout.checkout_type === 'credits'
                      ? `${checkout.quantity || 0} créditos`
                      : checkout.plan || 'Assinatura'}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {(checkout.utm_source || 'direct')}{checkout.utm_campaign ? ` · ${checkout.utm_campaign}` : ''}{checkout.landing_path ? ` · ${checkout.landing_path}` : ''}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(checkout.created_at).toLocaleDateString(config.locale.replace('_', '-'), {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div className="text-right text-sm font-semibold text-[var(--navy)]">
                  {formatMoney(checkout.amount_minor || 0, checkout.currency || summary.currency, config.locale)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
