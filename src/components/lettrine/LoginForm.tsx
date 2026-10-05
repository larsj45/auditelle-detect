'use client'

import { FormEvent, useState } from 'react'
import { supabase } from '@/lib/supabase'
import AppFrame from './AppFrame'
import styles from './LettrineApp.module.css'
import { getLettrineAppCopy } from './appCopy'
import type { LettrineLocale } from '@/lib/lettrine/signup'

export default function LoginForm({ locale }: { locale: LettrineLocale }) {
  const copy = getLettrineAppCopy(locale)
  const s = copy.login
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    const form = new FormData(event.currentTarget)
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: String(form.get('email') || '').trim().toLowerCase(),
      password: String(form.get('password') || ''),
    })
    if (authError) {
      const notConfirmed = /not confirmed/i.test(authError.message)
      setError(notConfirmed ? copy.errors.email_not_confirmed : copy.errors.invalid_credentials)
      setSubmitting(false)
      return
    }
    window.location.assign(copy.paths.dashboard)
  }

  return (
    <AppFrame copy={copy} narrow action={<a className={styles.linkButton} href={copy.landingPath}>{copy.common.back}</a>}>
      <div className={styles.card}>
        <h1 className={styles.title}>{s.title}</h1>
        <form className={styles.form} onSubmit={onSubmit}>
          <label className={styles.field}>
            {s.email}
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label className={styles.field}>
            {s.password}
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <button className={styles.button} type="submit" disabled={submitting}>
            {submitting ? s.submitting : s.submit}
          </button>
        </form>
        <p className={styles.muted}>
          {s.noAccount} <a href={copy.paths.signup}>{s.signupLink}</a>
        </p>
      </div>
    </AppFrame>
  )
}
