'use client'

import { FormEvent, useState } from 'react'
import AppFrame from './AppFrame'
import styles from './LettrineApp.module.css'
import { getLettrineAppCopy, type AppErrorCode } from './appCopy'
import type { LettrineLocale } from '@/lib/lettrine/signup'

export default function SignupForm({ locale }: { locale: LettrineLocale }) {
  const copy = getLettrineAppCopy(locale)
  const s = copy.signup
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent'>('idle')
  const [error, setError] = useState('')
  const [sentTo, setSentTo] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setStatus('submitting')
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') || '')
    try {
      const response = await fetch('/api/lettrine/signup', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          locale,
          name: form.get('name'),
          email,
          journal: form.get('journal'),
          password: form.get('password'),
          acceptTerms: form.get('acceptTerms') === 'on',
        }),
      })
      const result = (await response.json().catch(() => null)) as { success?: boolean; errorCode?: AppErrorCode } | null
      if (!response.ok || !result?.success) {
        setError(copy.errors[result?.errorCode ?? 'unknown'] ?? copy.errors.unknown)
        setStatus('idle')
        return
      }
      setSentTo(email.trim())
      setStatus('sent')
    } catch {
      setError(copy.errors.unknown)
      setStatus('idle')
    }
  }

  return (
    <AppFrame copy={copy} narrow action={<a className={styles.linkButton} href={copy.landingPath}>{copy.common.back}</a>}>
      <div className={styles.card}>
        {status === 'sent' ? (
          <>
            <h1 className={styles.title}>{s.sentTitle}</h1>
            <p className={styles.intro}>{s.sentBody(sentTo)}</p>
          </>
        ) : (
          <>
            <h1 className={styles.title}>{s.title}</h1>
            <p className={styles.intro}>{s.intro}</p>
            <form className={styles.form} onSubmit={onSubmit}>
              <label className={styles.field}>
                {s.name}
                <input name="name" autoComplete="name" required minLength={2} maxLength={120} />
              </label>
              <label className={styles.field}>
                {s.email}
                <input name="email" type="email" autoComplete="email" required maxLength={254} />
                <span className={styles.hint}>{s.emailHint}</span>
              </label>
              <label className={styles.field}>
                {s.journal}
                <input name="journal" autoComplete="organization" required minLength={2} maxLength={200} />
              </label>
              <label className={styles.field}>
                {s.password}
                <input name="password" type="password" autoComplete="new-password" required minLength={10} maxLength={200} />
                <span className={styles.hint}>{s.passwordHint}</span>
              </label>
              <p className={styles.notice}>{s.dataNotice}</p>
              <label className={styles.checkbox}>
                <input name="acceptTerms" type="checkbox" required />
                <span>
                  {s.termsLead}{' '}
                  <a href={copy.paths.terms} target="_blank" rel="noopener">{s.termsLink}</a>{' '}
                  {s.termsJoin}{' '}
                  <a href={copy.paths.dpa} target="_blank" rel="noopener">{s.dpaLink}</a>.
                </span>
              </label>
              {error && <p className={styles.error} role="alert">{error}</p>}
              <button className={styles.button} type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? s.submitting : s.submit}
              </button>
            </form>
            <p className={styles.muted}>
              {s.haveAccount} <a href={copy.paths.login}>{s.loginLink}</a>
            </p>
          </>
        )}
      </div>
    </AppFrame>
  )
}
