'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import AppFrame from './AppFrame'
import styles from './LettrineApp.module.css'
import { getLettrineAppCopy } from './appCopy'
import { TRIAL_UNITS, type LettrineLocale } from '@/lib/lettrine/signup'

interface AnalysisItem {
  id: string
  manuscript_ref: string
  title: string | null
  units: number
  created_at: string
}

interface MeResponse {
  success: boolean
  errorCode?: string
  org?: { name: string; locale: string; role: string }
  balance?: number
}

async function fetchMe(token: string): Promise<{ status: number; body: MeResponse | null }> {
  const response = await fetch('/api/lettrine/me', { headers: { Authorization: `Bearer ${token}` } })
  return { status: response.status, body: (await response.json().catch(() => null)) as MeResponse | null }
}

export default function Dashboard({ locale }: { locale: LettrineLocale }) {
  const copy = getLettrineAppCopy(locale)
  const d = copy.dashboard
  const [me, setMe] = useState<MeResponse | null>(null)
  const [error, setError] = useState('')
  const [welcome, setWelcome] = useState<'granted' | 'none' | null>(null)
  const [analyses, setAnalyses] = useState<AnalysisItem[]>([])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    // Browser-only query string, read after hydration (same reason as CookieConsent).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (params.get('welcome') === '1') setWelcome(params.get('trial') === 'granted' ? 'granted' : 'none')

    async function load() {
      const { data } = await supabase.auth.getSession()
      const token = data.session?.access_token
      if (!token) {
        window.location.replace(copy.paths.login)
        return
      }
      let result = await fetchMe(token)
      if (result.status === 404 && result.body?.errorCode === 'no_org') {
        // Confirmed in another browser: finish onboarding here.
        await fetch('/api/lettrine/onboard', { method: 'POST', headers: { Authorization: `Bearer ${token}` } })
        result = await fetchMe(token)
      }
      if (!result.body?.success) {
        setError(copy.errors.unknown)
        return
      }
      setMe(result.body)
      // RLS returns only the analyses of the user's organisation.
      const { data: rows } = await supabase
        .from('lettrine_analyses')
        .select('id, manuscript_ref, title, units, created_at')
        .order('created_at', { ascending: false })
        .limit(20)
      setAnalyses((rows as AnalysisItem[] | null) ?? [])
    }
    load().catch(() => setError(copy.errors.unknown))
  }, [copy.paths.login, copy.errors.unknown])

  async function logout() {
    await supabase.auth.signOut()
    window.location.assign(copy.paths.login)
  }

  return (
    <AppFrame copy={copy} action={<button className={styles.linkButton} onClick={logout}>{copy.common.logout}</button>}>
      {error && <p className={styles.error} role="alert">{error}</p>}
      {!me && !error && <p className={styles.intro}>{copy.common.loading}</p>}
      {me?.org && (
        <>
          {welcome === 'granted' && <p className={styles.success}>{d.trialGranted(TRIAL_UNITS)}</p>}
          {welcome === 'none' && <p className={styles.notice}>{d.trialAlreadyUsed}</p>}
          <h1 className={styles.title}>{me.org.name}</h1>
          <div className={styles.dashGrid}>
            <section className={styles.card}>
              <p className={styles.label}>{d.balanceLabel}</p>
              <p className={styles.balance}>{me.balance ?? 0}</p>
              <p className={styles.hint}>{d.unitExplainer}</p>
            </section>
            <section className={styles.card}>
              <p className={styles.label}>{d.historyTitle}</p>
              <a className={styles.button} href={copy.paths.newAnalysis}>{d.newAnalysis}</a>
              {analyses.length === 0 ? (
                <p className={styles.hint}>{d.historyEmpty}</p>
              ) : (
                <ul className={styles.history}>
                  {analyses.map((item) => (
                    <li key={item.id}>
                      <a href={copy.paths.analysis(item.id)}>{item.title || item.manuscript_ref}</a>
                      <span className={styles.hint}>
                        {item.manuscript_ref} · {new Date(item.created_at).toLocaleDateString(locale === 'sv' ? 'sv-SE' : 'fr-FR')}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </>
      )}
    </AppFrame>
  )
}
