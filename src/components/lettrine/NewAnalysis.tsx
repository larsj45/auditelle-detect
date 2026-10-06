'use client'

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { currentAccessToken } from './session'
import AppFrame from './AppFrame'
import styles from './LettrineApp.module.css'
import { getLettrineAppCopy, type AppErrorCode } from './appCopy'
import type { LettrineLocale } from '@/lib/lettrine/signup'
import { MAX_WORDS, MIN_WORDS, countWords, unitsForWords } from '@/lib/lettrine/units'

const MAX_FILE_BYTES = 15 * 1024 * 1024

async function extractFileText(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase()
  if (ext === 'txt' || ext === 'md') return file.text()
  if (ext === 'pdf') {
    const { getDocumentProxy, extractText } = await import('unpdf')
    const pdf = await getDocumentProxy(new Uint8Array(await file.arrayBuffer()))
    const { text } = await extractText(pdf, { mergePages: true })
    return text
  }
  if (ext === 'docx') {
    const mammoth = await import('mammoth')
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() })
    return result.value
  }
  throw new Error('unsupported_file')
}

export default function NewAnalysis({ locale }: { locale: LettrineLocale }) {
  const copy = getLettrineAppCopy(locale)
  const a = copy.analysis
  const [token, setToken] = useState<string | null>(null)
  const [balance, setBalance] = useState<number | null>(null)
  const [text, setText] = useState('')
  const [extracting, setExtracting] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getSession()
      const accessToken = data.session?.access_token
      if (!accessToken) {
        window.location.replace(copy.paths.login)
        return
      }
      setToken(accessToken)
      const response = await fetch('/api/lettrine/me', { headers: { Authorization: `Bearer ${accessToken}` } })
      const body = (await response.json().catch(() => null)) as { success?: boolean; balance?: number } | null
      if (body?.success) setBalance(body.balance ?? 0)
      else window.location.replace(copy.paths.dashboard)
    }
    load().catch(() => setError(copy.errors.unknown))
  }, [copy.paths.login, copy.paths.dashboard, copy.errors.unknown])

  const words = useMemo(() => countWords(text), [text])
  const units = unitsForWords(words)
  const tooShort = words > 0 && words < MIN_WORDS
  const tooLong = words > MAX_WORDS
  const notEnough = balance !== null && units > balance

  async function onFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    setError('')
    if (file.size > MAX_FILE_BYTES) {
      setError(copy.errors.too_long)
      return
    }
    setExtracting(true)
    try {
      setText((await extractFileText(file)).trim())
    } catch (err) {
      setError(err instanceof Error && err.message === 'unsupported_file' ? copy.errors.unsupported_file : copy.errors.extract_failed)
    } finally {
      setExtracting(false)
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!token) return
    setError('')
    setSubmitting(true)
    const form = new FormData(event.currentTarget)
    try {
      const accessToken = await currentAccessToken()
      if (!accessToken) {
        window.location.replace(copy.paths.login)
        return
      }
      const response = await fetch('/api/lettrine/analyses', {
        method: 'POST',
        headers: { 'content-type': 'application/json', Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ text, manuscriptRef: form.get('manuscriptRef'), title: form.get('title') }),
      })
      const result = (await response.json().catch(() => null)) as { success?: boolean; id?: string; errorCode?: AppErrorCode } | null
      if (!response.ok || !result?.success || !result.id) {
        setError(copy.errors[result?.errorCode ?? 'unknown'] ?? copy.errors.unknown)
        setSubmitting(false)
        return
      }
      window.location.assign(copy.paths.analysis(result.id))
    } catch {
      setError(copy.errors.unknown)
      setSubmitting(false)
    }
  }

  const canSubmit = !!token && words >= MIN_WORDS && !tooLong && !notEnough && !submitting && !extracting

  return (
    <AppFrame copy={copy} action={<a className={styles.linkButton} href={copy.paths.dashboard}>{copy.report.backToOverview}</a>}>
      <h1 className={styles.title}>{a.title}</h1>
      <p className={styles.intro}>{a.intro}</p>
      <form className={`${styles.card} ${styles.form}`} onSubmit={onSubmit}>
        <label className={styles.field}>
          {a.reference}
          <input name="manuscriptRef" required maxLength={120} placeholder="MS-2026-014" />
          <span className={styles.hint}>{a.referenceHint}</span>
        </label>
        <label className={styles.field}>
          <span>
            {a.titleField} <span className={styles.hint}>({a.optional})</span>
          </span>
          <input name="title" maxLength={300} />
        </label>
        <label className={styles.field}>
          {a.upload}
          <input type="file" accept=".pdf,.docx,.txt,.md" onChange={onFile} disabled={extracting || submitting} />
          <span className={styles.hint}>{extracting ? a.extracting : a.uploadHint}</span>
        </label>
        <label className={styles.field}>
          {a.text}
          <textarea
            className={styles.textarea}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder={a.textPlaceholder}
            rows={14}
            required
          />
        </label>
        <div className={styles.costRow}>
          <span>{a.words(words)}</span>
          <strong>{a.cost(units)}</strong>
          {balance !== null && <span>{a.balance(balance)}</span>}
        </div>
        {tooShort && <p className={styles.error}>{copy.errors.too_short}</p>}
        {tooLong && <p className={styles.error}>{copy.errors.too_long}</p>}
        {notEnough && (
          <p className={styles.error}>
            {a.notEnough} <a href={copy.paths.buy}>{a.buyMore}</a>
          </p>
        )}
        <p className={styles.notice}>{a.dataNotice}</p>
        {error && <p className={styles.error} role="alert">{error}</p>}
        <button className={styles.button} type="submit" disabled={!canSubmit}>
          {submitting ? a.submitting : a.submit(units)}
        </button>
      </form>
    </AppFrame>
  )
}
