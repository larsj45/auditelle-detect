'use client'

import { useState } from 'react'
import { Check, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    id: 'pro',
    name: 'Professionnel',
    price: '25€',
    period: '/mois',
    description: 'Pour enseignants et consultants',
    features: [
      '1 000 analyses par mois',
      'Intégrations LMS',
      'Export PDF/CSV',
      'Support email',
      'Historique 30 jours',
    ],
    popular: true,
  },
  {
    id: 'university',
    name: 'Université',
    price: '149€',
    period: '/mois',
    description: 'Pour établissements éducatifs',
    features: [
      '10 000 analyses par mois',
      'Multi-utilisateurs',
      'API illimitée',
      'Dashboard admin',
      'Support prioritaire',
      'Rapports personnalisés',
    ],
    popular: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '499€',
    period: '/mois',
    description: 'Pour grandes organisations',
    features: [
      'Analyses illimitées',
      'API dédiée',
      'Account manager dédié',
      'SLA 99,9%',
      'Fonctionnalités sur mesure',
      'Facturation personnalisée',
    ],
    popular: false,
  },
]

export default function UpgradePage() {
  const [loading, setLoading] = useState<string | null>(null)

  async function handleUpgrade(planId: string) {
    if (planId === 'enterprise') {
      window.location.href = 'mailto:contact@auditelle.fr?subject=Demande%20Plan%20Enterprise'
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
        alert(data.error || 'Échec du paiement. Veuillez réessayer.')
      }
    } catch {
      alert('Échec du paiement. Veuillez réessayer.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <Link href="/dashboard/account" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[var(--navy)] mb-4">
          <ArrowLeft className="w-4 h-4" />
          Retour au compte
        </Link>
        <h1 className="text-2xl font-bold text-[var(--navy)]">Choisir votre plan</h1>
        <p className="text-gray-500 mt-1">Tous les plans incluent une précision de détection IA de 99,9%.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`card relative ${plan.popular ? 'ring-2 ring-[var(--accent)]' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white text-xs font-semibold px-3 py-1 rounded-full">
                POPULAIRE
              </div>
            )}

            <div className="text-center mb-6">
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
                ? 'Chargement...'
                : plan.id === 'enterprise'
                ? 'Nous contacter'
                : `Choisir ${plan.name}`}
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-8 text-sm text-gray-400">
        Tous les plans sont facturés mensuellement. Annulation possible à tout moment. Paiement sécurisé par Stripe.
      </div>
    </div>
  )
}
