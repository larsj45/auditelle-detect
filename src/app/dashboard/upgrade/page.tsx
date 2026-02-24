'use client'

import { useState } from 'react'
import { Check, ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useConfig } from '@/components/ConfigProvider'

export default function UpgradePage() {
  const config = useConfig()
  const s = config.strings.dashboard
  const plans = config.plans.upgrade
  const [loading, setLoading] = useState<string | null>(null)

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
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <Link href="/dashboard/account" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[var(--navy)] mb-4">
          <ArrowLeft className="w-4 h-4" />
          {s.upgradeBack}
        </Link>
        <h1 className="text-2xl font-bold text-[var(--navy)]">{s.upgradeTitle}</h1>
        <p className="text-gray-500 mt-1">{s.upgradeSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`card relative ${plan.popular ? 'ring-2 ring-[var(--accent)]' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
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
              className={`w-full py-3 rounded-xl font-semibold transition ${
                plan.popular
                  ? 'btn-primary'
                  : 'bg-gray-100 text-[var(--navy)] hover:bg-gray-200'
              } disabled:opacity-50`}
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

      <div className="text-center mt-8 text-sm text-gray-400">
        {s.upgradeFooter}
      </div>
    </div>
  )
}
