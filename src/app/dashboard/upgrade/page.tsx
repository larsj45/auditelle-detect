'use client'

import { useState, useEffect } from 'react'
import { Check, ArrowLeft, Sparkles, Coins, Zap } from 'lucide-react'
import Link from 'next/link'
import { useConfig } from '@/components/ConfigProvider'

const CREDIT_PACKS = [
  { quantity: 1, label: '1 analyse', price: '0,50 €', description: 'Essayez une analyse', icon: '🔍' },
  { quantity: 10, label: '10 analyses', price: '5 €', description: 'Pack standard', icon: '📦', popular: true },
  { quantity: 50, label: '50 analyses', price: '25 €', description: 'Meilleur rapport qualité-prix', icon: '🏫' },
]

export default function UpgradePage() {
  const config = useConfig()
  const s = config.strings.dashboard
  const plans = config.plans.upgrade
  const [loading, setLoading] = useState<string | null>(null)
  const [credits, setCredits] = useState<number | null>(null)

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

      const response = await fetch('/api/checkout-credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ quantity }),
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
      window.location.href = `mailto:${config.supportEmail}?subject=Demande%20Plan%20Enterprise`
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

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ plan: planId }),
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
      <div className="mb-8">
        <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[var(--navy)] mb-4">
          <ArrowLeft className="w-4 h-4" />
          Retour au tableau de bord
        </Link>
        <h1 className="text-2xl font-bold text-[var(--navy)]">Acheter des analyses</h1>
        <p className="text-gray-500 mt-1">Chaque analyse coûte 0,50 € — choisissez votre pack</p>
      </div>

      {/* Current balance */}
      {credits !== null && (
        <div className="flex items-center gap-3 bg-[var(--accent-light)] border border-[var(--accent)]/20 rounded-xl px-5 py-4 mb-8">
          <Coins className="w-5 h-5 text-[var(--accent)]" />
          <span className="text-sm text-[var(--navy)]">
            Solde actuel : <strong className="text-lg">{credits} analyse{credits !== 1 ? 's' : ''}</strong>
          </span>
        </div>
      )}

      {/* Credit packs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {CREDIT_PACKS.map((pack) => (
          <div
            key={pack.quantity}
            className={`card relative ${pack.popular ? 'ring-2 ring-[var(--accent)]' : ''}`}
          >
            {pack.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                <Zap className="w-3 h-3" />
                POPULAIRE
              </div>
            )}

            <div className="text-center mb-6">
              <div className="text-3xl mb-2">{pack.icon}</div>
              <h3 className="text-lg font-semibold text-[var(--navy)]">{pack.label}</h3>
              <p className="text-sm text-gray-500 mt-1">{pack.description}</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-[var(--navy)]">{pack.price}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">0,50 € par analyse</p>
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
              {loading === `credits-${pack.quantity}` ? 'Redirection...' : 'Acheter'}
            </button>
          </div>
        ))}
      </div>

      {/* Subscription plans */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-[var(--navy)] mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Abonnements pour professionnels
        </h2>
        <p className="text-sm text-gray-500 mb-6">Pour un usage intensif, les abonnements offrent plus de valeur</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`card relative ${plan.popular ? 'ring-2 ring-[var(--accent)]' : ''}`}
            >
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
                className="w-full py-3 rounded-xl font-semibold transition bg-gray-100 text-[var(--navy)] hover:bg-gray-200 disabled:opacity-50"
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
        Paiement sécurisé par Stripe. Les crédits n&apos;expirent jamais.
      </div>
    </div>
  )
}
