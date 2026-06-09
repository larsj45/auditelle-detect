'use client'

import { useState, useEffect, useMemo } from 'react'
import { Check, ArrowLeft, Sparkles, Coins, Zap, ShieldCheck, FileText } from 'lucide-react'
import Link from 'next/link'
import { useConfig } from '@/components/ConfigProvider'
import { readStoredAttribution } from '@/lib/attribution'
import { getCreditPackOffers } from '@/lib/credit-packs'

declare function gtag(...args: unknown[]): void

function formatCurrency(minorUnits: number, currency: string, locale: string) {
  try {
    return new Intl.NumberFormat(locale.replace('_', '-'), {
      style: 'currency',
      currency,
    }).format(minorUnits / 100)
  } catch {
    return `${currency} ${(minorUnits / 100).toFixed(2)}`
  }
}

function formatAnalysisCount(count: number, singular: string, plural: string) {
  return `${count} ${count === 1 ? singular : plural}`
}

function getModeCreditGuide(htmlLang: string, labels: { modeAI: string; modePlagiarism: string; modeBoth: string }) {
  const credit = htmlLang === 'es' ? 'crédito' : htmlLang === 'pt' ? 'crédito' : 'crédit'
  const credits = htmlLang === 'es' ? 'créditos' : htmlLang === 'pt' ? 'créditos' : 'crédits'
  return [
    { label: labels.modeAI, cost: `1 ${credit}` },
    { label: labels.modePlagiarism, cost: `2 ${credits}` },
    { label: labels.modeBoth, cost: `3 ${credits}` },
  ]
}

function trackCheckoutStart({
  checkoutType,
  itemId,
  itemName,
  currency,
  value,
}: {
  checkoutType: 'credits' | 'subscription'
  itemId: string
  itemName: string
  currency: string
  value?: number
}) {
  if (typeof window !== 'undefined') {
    const plausible = (window as Window & {
      plausible?: (eventName: string, options?: { props?: Record<string, string | number | undefined> }) => void
    }).plausible

    if (typeof plausible === 'function') {
      plausible('Checkout Started', {
        props: {
          type: checkoutType,
          item: itemId,
          currency,
          value,
        },
      })
    }
  }

  if (typeof gtag !== 'undefined') {
    gtag('event', 'begin_checkout', {
      currency,
      value,
      items: [{
        item_id: itemId,
        item_name: itemName,
        item_category: checkoutType,
      }],
    })
  }
}

export default function UpgradePage() {
  const config = useConfig()
  const s = config.strings.dashboard
  const p = config.strings.plagiarism
  const plans = config.plans.upgrade
  const creditPacks = useMemo(() => getCreditPackOffers(config), [config])
  const modeCreditGuide = useMemo(() => getModeCreditGuide(config.htmlLang, p), [config.htmlLang, p])
  const [loading, setLoading] = useState<string | null>(null)
  const [credits, setCredits] = useState<number | null>(null)
  const pricePerCreditMinor = config.creditPricePerScanMinor

  useEffect(() => {
    loadCredits()
  }, [])

  async function loadCredits() {
    try {
      const { supabase } = await import('@/lib/supabase')
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: profile } = await supabase
        .from('profiles')
        .select('scan_credits')
        .eq('id', user.id)
        .single()
      setCredits(profile?.scan_credits ?? 0)
    } catch { /* ignore */ }
  }

  async function handleBuyCredits(quantity: number) {
    setLoading(`credits-${quantity}`)
    try {
      const { supabase } = await import('@/lib/supabase')
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.access_token) {
        window.location.href = '/login'
        return
      }
      const pack = creditPacks.find(item => item.quantity === quantity)
      const label = pack?.label || String(quantity)
      trackCheckoutStart({
        checkoutType: 'credits',
        itemId: `credits-${quantity}`,
        itemName: label,
        currency: config.currency,
        value: (pack?.totalPriceMinor ?? (quantity * pricePerCreditMinor)) / 100,
      })

      const response = await fetch('/api/checkout-credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          quantity,
          attribution: readStoredAttribution(),
        }),
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || s.upgradeError)
      }
    } catch {
      alert(s.upgradeError)
    } finally {
      setLoading(null)
    }
  }

  async function handleUpgrade(planId: string) {
    if (planId === 'enterprise') {
      window.location.href = `mailto:${config.supportEmail}?subject=${encodeURIComponent(`${config.name} - ${s.upgradeContact}`)}`
      return
    }

    setLoading(planId)
    try {
      const { supabase } = await import('@/lib/supabase')
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.access_token) {
        window.location.href = '/login'
        return
      }
      const selectedPlan = plans.find(plan => plan.id === planId)
      trackCheckoutStart({
        checkoutType: 'subscription',
        itemId: planId,
        itemName: selectedPlan?.name || planId,
        currency: config.currency,
      })

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          plan: planId,
          attribution: readStoredAttribution(),
        }),
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || s.upgradeError)
      }
    } catch {
      alert(s.upgradeError)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 rounded-3xl border border-[var(--accent)]/15 bg-gradient-to-br from-[var(--accent-light)] via-white to-white p-6 md:p-8 shadow-sm">
        <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[var(--navy)] mb-4">
          <ArrowLeft className="w-4 h-4" />
          {s.upgradeBack}
        </Link>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[var(--accent)] shadow-sm mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {config.name}
            </div>
            <h1 className="text-3xl font-bold text-[var(--navy)]">{s.upgradeCreditsTitle}</h1>
            <p className="text-gray-600 mt-2 max-w-2xl">{s.upgradeCreditsSubtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-[var(--navy)]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--success)]" />
              {s.upgradeTrustStripe}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 shadow-sm">
              <Coins className="w-3.5 h-3.5 text-[var(--accent)]" />
              {s.upgradeTrustCredits}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 shadow-sm">
              <FileText className="w-3.5 h-3.5 text-[var(--accent)]" />
              {s.upgradeTrustReports}
            </span>
          </div>
        </div>
      </div>

      {/* Current balance */}
      {credits !== null && (
        <div className="flex items-center gap-3 bg-[var(--accent-light)] border border-[var(--accent)]/20 rounded-xl px-5 py-4 mb-8">
          <Coins className="w-5 h-5 text-[var(--accent)]" />
          <span className="text-sm text-[var(--navy)]">
            {s.upgradeCurrentBalance.replace(
              '{count}',
              formatAnalysisCount(credits, s.upgradeCreditSingular, s.upgradeCreditPlural)
            )}
          </span>
        </div>
      )}

      {config.features.plagiarismDetection && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {modeCreditGuide.map((item) => (
            <div key={item.label} className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-sm font-semibold text-[var(--navy)]">{item.label}</p>
              <p className="text-xs text-gray-500 mt-1">{item.cost}</p>
            </div>
          ))}
        </div>
      )}

      {/* Credit packs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {creditPacks.map((pack) => (
          <div
            key={pack.quantity}
            className={`card relative ${pack.popular ? 'ring-2 ring-[var(--accent)]' : ''}`}
          >
            {pack.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                <Zap className="w-3 h-3" />
                {s.upgradePopular}
              </div>
            )}

            <div className="text-center mb-6">
              <div className="text-3xl mb-2">{pack.icon}</div>
              <h3 className="text-lg font-semibold text-[var(--navy)]">{pack.label}</h3>
              <p className="text-sm text-gray-500 mt-1">{pack.description}</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-[var(--navy)]">
                  {formatCurrency(pack.totalPriceMinor, config.currency, config.locale)}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {s.upgradePerAnalysis.replace('{price}', formatCurrency(Math.round(pack.totalPriceMinor / pack.quantity), config.currency, config.locale))}
              </p>
            </div>

            <button
              onClick={() => handleBuyCredits(pack.quantity)}
              disabled={loading !== null}
              className={`w-full py-3 rounded-xl font-semibold transition ${
                pack.popular
                  ? 'btn-primary'
                  : 'bg-gray-100 text-[var(--navy)] hover:bg-gray-200'
              } disabled:opacity-50`}
            >
              {loading === `credits-${pack.quantity}` ? s.upgradeRedirecting : s.upgradeBuy}
            </button>
          </div>
        ))}
      </div>

      {/* Subscription plans */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-[var(--navy)] mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          {s.upgradeSubscriptionsTitle}
        </h2>
        <p className="text-sm text-gray-500 mb-6">{s.upgradeSubscriptionsSubtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`card relative ${plan.popular ? 'ring-2 ring-[var(--accent)]' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {s.upgradePopular}
                </div>
              )}
              <div className="text-center mb-6">
                {plan.badge && <div className="text-2xl mb-2">{plan.badge}</div>}
                <h3 className="text-lg font-semibold text-[var(--navy)]">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-[var(--navy)]">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-[var(--success)] flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(plan.id)}
                disabled={loading !== null}
                className={`w-full py-3 rounded-xl font-semibold transition disabled:opacity-50 ${
                  plan.popular
                    ? 'btn-primary'
                    : 'bg-gray-100 text-[var(--navy)] hover:bg-gray-200'
                }`}
              >
                {loading === plan.id
                  ? s.upgradeLoading
                  : plan.id === 'enterprise'
                  ? s.upgradeContact
                  : s.upgradeChoose.replace('{plan}', plan.name)}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-8 text-sm text-gray-400">
        {s.upgradeFooter}
      </div>
    </div>
  )
}
