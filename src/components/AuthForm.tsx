'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useConfig } from '@/components/ConfigProvider'

interface AuthFormProps {
  mode: 'login' | 'signup' | 'reset'
}

async function redirectToCheckout(token: string, plan: string) {
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ plan }),
    })
    const data = await response.json()
    if (data.url) {
      window.location.href = data.url
      return true
    }
  } catch {
    // Fall through to dashboard if checkout fails
  }
  return false
}

export default function AuthForm({ mode }: AuthFormProps) {
  const config = useConfig()
  const s = config.strings.auth
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [planParam, setPlanParam] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setPlanParam(params.get('plan'))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const { supabase } = await import('@/lib/supabase')

      if (mode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        const params = new URLSearchParams(window.location.search)
        const plan = params.get('plan')
        if (plan && data.session?.access_token) {
          const redirected = await redirectToCheckout(data.session.access_token, plan)
          if (redirected) return
        }
        window.location.href = '/dashboard'
      } else if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        })
        if (error) throw error
        if (data.session) {
          if (planParam && planParam !== 'free') {
            setSuccess(s.accountCreatedRedirect)
            const redirected = await redirectToCheckout(data.session.access_token, planParam)
            if (redirected) return
          }
          window.location.href = '/dashboard'
        } else {
          setSuccess(s.checkEmail)
        }
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/dashboard/account`,
        })
        if (error) throw error
        setSuccess(s.resetEmailSent)
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : config.strings.errors.internalError
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  // Build plan labels from upgrade plans config
  const planLabels: Record<string, string> = {}
  for (const plan of config.plans.upgrade) {
    planLabels[plan.id] = `${plan.name} \u2014 ${plan.price}${plan.period}`
  }
  // Also add homepage plans that have href with ?plan=
  for (const plan of config.plans.homepage) {
    const match = plan.href.match(/plan=(\w+)/)
    if (match && !planLabels[match[1]]) {
      planLabels[match[1]] = `${plan.name} \u2014 ${plan.price}${plan.period ? '/' + plan.period : ''}`
    }
  }

  const titles = {
    login: s.login,
    signup: s.signup,
    reset: s.resetPassword,
  }

  const subtitles = {
    login: planParam && planLabels[planParam]
      ? s.loginSubtitlePlan.replace('{plan}', planLabels[planParam])
      : s.loginSubtitle,
    signup: planParam && planLabels[planParam]
      ? s.signupSubtitlePlan.replace('{plan}', planLabels[planParam])
      : s.signupSubtitle,
    reset: s.resetSubtitle,
  }

  return (
    <div className="min-h-screen bg-[var(--bg-light)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center mb-6">
            <img src={config.logoColor} alt={config.name} className="h-10" />
          </Link>
          <h1 className="text-2xl font-bold text-[var(--navy)]">{titles[mode]}</h1>
          <p className="text-gray-500 mt-2">{subtitles[mode]}</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-5">
          {error && (
            <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg">{error}</div>
          )}
          {success && (
            <div className="bg-emerald-50 text-emerald-700 text-sm p-3 rounded-lg">{success}</div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{s.fullName}</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition"
                placeholder={s.namePlaceholder}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{s.email}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition"
              placeholder={s.emailPlaceholder}
              required
            />
          </div>

          {mode !== 'reset' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{s.password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? s.loading : titles[mode]}
          </button>

          <div className="text-center text-sm text-gray-500 space-y-2">
            {mode === 'login' && (
              <>
                <p>
                  <Link href="/reset-password" className="text-[var(--accent)] hover:underline">
                    {s.forgotPassword}
                  </Link>
                </p>
                <p>
                  {s.noAccount}{' '}
                  <Link href="/signup" className="text-[var(--accent)] hover:underline font-medium">
                    {s.signup}
                  </Link>
                </p>
              </>
            )}
            {mode === 'signup' && (
              <p>
                {s.hasAccount}{' '}
                <Link
                  href={planParam ? `/login?plan=${planParam}` : '/login'}
                  className="text-[var(--accent)] hover:underline font-medium"
                >
                  {s.login}
                </Link>
              </p>
            )}
            {mode === 'reset' && (
              <p>
                <Link href="/login" className="text-[var(--accent)] hover:underline">
                  {s.backToLogin}
                </Link>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
