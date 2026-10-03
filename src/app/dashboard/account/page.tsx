'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { CreditCard, Trash2, User } from 'lucide-react'
import Link from 'next/link'
import { useConfig } from '@/components/ConfigProvider'

export default function AccountPage() {
  const config = useConfig()
  const s = config.strings.dashboard
  const [user, setUser] = useState<{ email: string; full_name: string; plan: string; scan_credits: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [portalLoading, setPortalLoading] = useState(false)
  const del = config.strings.accountDeletion
  const [confirmEmail, setConfirmEmail] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

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

      setUser({
        email: authUser.email || '',
        full_name: profile?.full_name || '',
        plan: profile?.plan || 'free',
        scan_credits: profile?.scan_credits ?? 0,
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

  async function deleteAccount() {
    if (!del) return
    setDeleting(true)
    setDeleteError(null)
    try {
      const { supabase } = await import('@/lib/supabase')
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.access_token) {
        window.location.href = '/login'
        return
      }
      const response = await fetch('/api/account/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ confirmEmail }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        setDeleteError(data.error || del.error)
        return
      }
      await supabase.auth.signOut()
      window.location.href = '/'
    } catch {
      setDeleteError(del.error)
    } finally {
      setDeleting(false)
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
            {userPlan === 'free' ? (
              <>
                <p className="font-medium text-[var(--navy)]">Pay-per-scan</p>
                <p className="text-sm text-gray-500 mt-1">
                  {user?.scan_credits ?? 0} crédit{(user?.scan_credits ?? 0) !== 1 ? 's' : ''} restant{(user?.scan_credits ?? 0) !== 1 ? 's' : ''} · 0,50 € par analyse
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
                Acheter des crédits
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

      {del && (
        <div className="card border border-red-200">
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-semibold text-red-700">{del.title}</h2>
          </div>
          <p className="text-sm text-gray-600 mb-3">{del.description}</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 mb-5">
            {del.consequences.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <label className="block text-sm text-gray-700 mb-2" htmlFor="confirm-email">
            {del.confirmLabel}
          </label>
          <input
            id="confirm-email"
            type="email"
            autoComplete="off"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            placeholder={user?.email}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-red-400 focus:border-transparent"
          />
          {deleteError && <p className="text-sm text-red-600 mb-4">{deleteError}</p>}
          <button
            onClick={deleteAccount}
            disabled={deleting || confirmEmail.trim().toLowerCase() !== (user?.email || '').toLowerCase()}
            className="w-full py-3 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {deleting ? del.deleting : del.button}
          </button>
        </div>
      )}
    </div>
  )
}
