'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

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
        // If coming from a pricing page, redirect to checkout
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
        // If session exists, user is logged in (no email confirmation required)
        if (data.session) {
          // If a plan was selected, redirect to Stripe checkout
          if (planParam && planParam !== 'free') {
            setSuccess('Compte créé ! Redirection vers le paiement...')
            const redirected = await redirectToCheckout(data.session.access_token, planParam)
            if (redirected) return
          }
          window.location.href = '/dashboard'
        } else {
          setSuccess('Vérifiez votre email pour confirmer votre inscription.')
        }
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/dashboard/account`,
        })
        if (error) throw error
        setSuccess('Un lien de réinitialisation a été envoyé à votre adresse email.')
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const planLabels: Record<string, string> = {
    pro: 'Pro — 25€/mois',
    equipe: 'Équipe — 99€/mois',
    departement: 'Département — 249€/mois',
    starter: 'Starter — 29€/mois',
    student: 'Student — 4,99€/mois',
    university: 'Université — 149€/mois',
  }

  const titles = {
    login: 'Connexion',
    signup: 'Créer un compte',
    reset: 'Réinitialiser le mot de passe',
  }

  const subtitles = {
    login: planParam && planLabels[planParam]
      ? `Connectez-vous pour activer le plan ${planLabels[planParam]}`
      : 'Accédez à votre tableau de bord de détection IA',
    signup: planParam && planLabels[planParam]
      ? `Créez votre compte pour activer le plan ${planLabels[planParam]}`
      : 'Commencez à détecter le contenu IA gratuitement',
    reset: 'Entrez votre email pour recevoir un lien de réinitialisation',
  }

  return (
    <div className="min-h-screen bg-[var(--bg-light)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center mb-6">
            <img src="/images/logo-color.svg" alt="Auditelle" className="h-10" />
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition"
                placeholder="Jean Dupont"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition"
              placeholder="vous@email.com"
              required
            />
          </div>

          {mode !== 'reset' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
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
            {loading ? 'Chargement...' : titles[mode]}
          </button>

          <div className="text-center text-sm text-gray-500 space-y-2">
            {mode === 'login' && (
              <>
                <p>
                  <Link href="/reset-password" className="text-[var(--accent)] hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </p>
                <p>
                  Pas encore de compte ?{' '}
                  <Link href="/signup" className="text-[var(--accent)] hover:underline font-medium">
                    Inscrivez-vous
                  </Link>
                </p>
              </>
            )}
            {mode === 'signup' && (
              <p>
                Déjà un compte ?{' '}
                <Link
                  href={planParam ? `/login?plan=${planParam}` : '/login'}
                  className="text-[var(--accent)] hover:underline font-medium"
                >
                  Connectez-vous
                </Link>
              </p>
            )}
            {mode === 'reset' && (
              <p>
                <Link href="/login" className="text-[var(--accent)] hover:underline">
                  Retour à la connexion
                </Link>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
