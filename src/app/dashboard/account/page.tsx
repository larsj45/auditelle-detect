'use client'

import { useEffect, useState } from 'react'
import { CreditCard, User } from 'lucide-react'
import Link from 'next/link'
import { useConfig } from '@/components/ConfigProvider'

export default function AccountPage() {
  const config = useConfig()
  const s = config.strings.dashboard
  const [user, setUser] = useState<{ email: string; full_name: string; plan: string } | null>(null)
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
        .select('full_name, plan')
        .eq('id', authUser.id)
        .single()

      setUser({
        email: authUser.email || '',
        full_name: profile?.full_name || '',
        plan: profile?.plan || 'free',
      })
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
            <p className="font-medium text-[var(--navy)]">
              {s.plan} {planLabels[userPlan] || userPlan}
            </p>
            <p className="text-sm text-gray-500 mt-1">{scansLabel}</p>
          </div>
          <div className="flex gap-3">
            {userPlan === 'free' ? (
              <Link href="/dashboard/upgrade" className="btn-primary text-sm">
                {s.upgradeToPro}
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
    </div>
  )
}
