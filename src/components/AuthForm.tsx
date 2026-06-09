'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useConfig } from '@/components/ConfigProvider'
import { readStoredAttribution } from '@/lib/attribution'

declare function gtag(...args: unknown[]): void

interface AuthFormProps {
  mode: 'login' | 'signup' | 'reset'
}

interface PlanDisplay {
  id: string
  name: string
  priceLabel: string
  description: string
  cta?: string
}

function formatPlanPrice(price: string, period?: string) {
  if (!period) return price
  return period.startsWith('/') ? `${price}${period}` : `${price}/${period}`
}

async function redirectToCheckout(token: string, plan: string) {
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        plan,
        attribution: readStoredAttribution(),
      }),
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
  const isSpanish = config.htmlLang === 'es'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [planParam, setPlanParam] = useState<string | null>(null)
  const [googleLoading, setGoogleLoading] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setPlanParam(params.get('plan'))
  }, [])

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    setError('')
    try {
      const { supabase } = await import('@/lib/supabase')
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback${window.location.search}`,
        },
      })
      if (error) throw error
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : config.strings.errors.internalError
      setError(message)
      setGoogleLoading(false)
    }
  }

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
        const next = params.get('next')
        if (plan && data.session?.access_token) {
          const redirected = await redirectToCheckout(data.session.access_token, plan)
          if (redirected) return
        }
        if (next === 'credits') {
          window.location.href = '/dashboard/upgrade'
          return
        }
        window.location.href = '/dashboard'
      } else if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        })
        if (error) throw error
        // Fire signup conversion
        if (typeof gtag !== 'undefined' && config.googleAdsSignupConversionLabel) {
          gtag('event', 'conversion', {
            send_to: config.googleAdsSignupConversionLabel,
          })
        }
        if (data.session) {
          const params = new URLSearchParams(window.location.search)
          const next = params.get('next')
          if (planParam && planParam !== 'free') {
            setSuccess(s.accountCreatedRedirect)
            const redirected = await redirectToCheckout(data.session.access_token, planParam)
            if (redirected) return
          }
          if (next === 'credits') {
            window.location.href = '/dashboard/upgrade'
            return
          }
          // Redirect to homepage if there's a pending analysis from HeroDemo
          const hasPending = typeof window !== 'undefined' && sessionStorage.getItem('pendingAnalysisText')
          window.location.href = hasPending ? '/' : '/dashboard'
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

  const homepagePlanMap: Record<string, PlanDisplay> = {}
  for (const plan of config.plans.homepage) {
    const match = plan.href.match(/plan=(\w+)/)
    if (match) {
      homepagePlanMap[match[1]] = {
        id: match[1],
        name: plan.name,
        priceLabel: formatPlanPrice(plan.price, plan.period),
        description: plan.description,
        cta: plan.cta,
      }
    }
  }

  const upgradePlanMap: Record<string, PlanDisplay> = {}
  for (const plan of config.plans.upgrade) {
    upgradePlanMap[plan.id] = {
      id: plan.id,
      name: plan.name,
      priceLabel: formatPlanPrice(plan.price, plan.period),
      description: plan.description,
    }
  }

  const selectedPlan = planParam
    ? homepagePlanMap[planParam] || upgradePlanMap[planParam] || null
    : null

  const planLabels: Record<string, string> = {}
  for (const [id, plan] of Object.entries(upgradePlanMap)) {
    planLabels[id] = `${plan.name} \u2014 ${plan.priceLabel}`
  }
  for (const [id, plan] of Object.entries(homepagePlanMap)) {
    planLabels[id] = `${plan.name} \u2014 ${plan.priceLabel}`
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

  const submitLabel = mode === 'signup'
    ? (selectedPlan ? (isSpanish ? 'Crear cuenta y continuar' : 'Criar conta e continuar') : titles[mode])
    : mode === 'login'
      ? (selectedPlan ? (isSpanish ? 'Entrar y continuar' : 'Entrar e continuar') : titles[mode])
      : titles[mode]

  return (
    <div className="min-h-screen bg-[var(--bg-light)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center mb-6">
            <img src={config.logoColor} alt={config.name} style={{ height: config.logoHeight ? `calc(${config.logoHeight} * 1.25)` : '2.5rem' }} />
          </Link>
          <h1 className="text-2xl font-bold text-[var(--navy)]">{titles[mode]}</h1>
          <p className="text-gray-500 mt-2">{subtitles[mode]}</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-5">
          {selectedPlan && mode !== 'reset' && (
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                Plano selecionado
              </p>
              <div className="mt-2 flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-[var(--navy)]">{selectedPlan.name}</p>
                  <p className="mt-1 text-sm text-gray-600">{selectedPlan.description}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-[var(--navy)]">{selectedPlan.priceLabel}</p>
              </div>
              <p className="mt-3 text-sm text-gray-600">
                {mode === 'signup'
                  ? (isSpanish
                      ? 'Creas tu cuenta ahora y sigues directamente al checkout de este plan.'
                      : 'Você cria sua conta agora e segue direto para o checkout deste plano.')
                  : (isSpanish
                      ? 'Inicia sesión en tu cuenta para seguir directamente al checkout de este plan.'
                      : 'Entre na sua conta para seguir direto para o checkout deste plano.')}
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg">{error}</div>
          )}
          {success && (
            <div className="bg-emerald-50 text-emerald-700 text-sm p-3 rounded-lg">{success}</div>
          )}

          {mode !== 'reset' && (
            <>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading || googleLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  {googleLoading ? s.loading : s.googleSignIn}
                </span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-400">{s.orDivider}</span>
                </div>
              </div>
            </>
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
            {loading ? s.loading : submitLabel}
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
