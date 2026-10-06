'use client'

import { FormEvent, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { currentAccessToken } from './session'
import AppFrame from './AppFrame'
import styles from './LettrineApp.module.css'
import { getLettrineAppCopy } from './appCopy'
import type { LettrineLocale } from '@/lib/lettrine/signup'
import { summarizeReport, type StoredAiResult, type StoredSimilarityResult } from '@/lib/lettrine/report'
import { EDITORIAL_DECISIONS, type EditorialDecision } from '@/lib/lettrine/decision'

interface AnalysisRow {
  id: string
  manuscript_ref: string
  title: string | null
  word_count: number
  units: number
  ai_result: StoredAiResult | null
  similarity_result: StoredSimilarityResult | null
  created_at: string
  decision: EditorialDecision | null
  decision_note: string | null
  decided_at: string | null
  delete_after: string
}

export default function Report({ locale, id }: { locale: LettrineLocale; id: string }) {
  const copy = getLettrineAppCopy(locale)
  const r = copy.report
  const [row, setRow] = useState<AnalysisRow | null>(null)
  const [state, setState] = useState<'loading' | 'ready' | 'missing'>('loading')
  const [token, setToken] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [actionError, setActionError] = useState('')

  useEffect(() => {
    async function load() {
      const { data: session } = await supabase.auth.getSession()
      if (!session.session) {
        window.location.replace(copy.paths.login)
        return
      }
      setToken(session.session.access_token)
      // RLS limits the read to members of the analysis's organisation.
      const { data } = await supabase
        .from('lettrine_analyses')
        .select('id, manuscript_ref, title, word_count, units, ai_result, similarity_result, created_at, decision, decision_note, decided_at, delete_after')
        .eq('id', id)
        .maybeSingle()
      if (!data) {
        setState('missing')
        return
      }
      setRow(data as AnalysisRow)
      setState('ready')
    }
    load().catch(() => setState('missing'))
  }, [id, copy.paths.login])

  const back = <a className={`${styles.linkButton} ${styles.noPrint}`} href={copy.paths.dashboard}>{r.backToOverview}</a>

  async function saveDecision(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!token || !row) return
    setActionError('')
    setSaving(true)
    const form = new FormData(event.currentTarget)
    const response = await fetch(`/api/lettrine/analyses/${row.id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json', Authorization: `Bearer ${(await currentAccessToken()) ?? ''}` },
      body: JSON.stringify({ decision: form.get('decision'), note: form.get('note') }),
    }).catch(() => null)
    const result = (await response?.json().catch(() => null)) as
      | { success?: boolean; decision?: EditorialDecision; note?: string | null; decidedAt?: string; errorCode?: keyof typeof copy.errors }
      | null
    setSaving(false)
    if (!response?.ok || !result?.success) {
      setActionError(copy.errors[result?.errorCode ?? 'unknown'] ?? copy.errors.unknown)
      return
    }
    setRow({ ...row, decision: result.decision ?? null, decision_note: result.note ?? null, decided_at: result.decidedAt ?? null })
  }

  async function deleteAnalysis() {
    if (!token || !row || !window.confirm(r.deleteConfirm)) return
    const response = await fetch(`/api/lettrine/analyses/${row.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${(await currentAccessToken()) ?? ''}` },
    }).catch(() => null)
    if (!response?.ok) {
      setActionError(copy.errors.unknown)
      return
    }
    window.location.assign(copy.paths.dashboard)
  }

  if (state !== 'ready' || !row) {
    return (
      <AppFrame copy={copy} action={back}>
        <p className={styles.intro}>{state === 'loading' ? copy.common.loading : r.notFound}</p>
      </AppFrame>
    )
  }

  const summary = summarizeReport(row.ai_result, row.similarity_result)
  const flagged = row.ai_result?.segments.filter((segment) => segment.level !== 'low' && segment.text) ?? []
  const dateLocale = locale === 'sv' ? 'sv-SE' : 'fr-FR'

  return (
    <AppFrame copy={copy} action={back}>
      <p className={styles.label}>
        {r.reference}: {row.manuscript_ref}
      </p>
      <h1 className={styles.title}>{row.title || row.manuscript_ref}</h1>
      <p className={styles.hint}>
        {r.created} {new Date(row.created_at).toLocaleString(dateLocale)} · {r.wordsUnits(row.word_count, row.units)}
      </p>

      <div className={`${styles.actions} ${styles.noPrint}`}>
        <button className={styles.button} type="button" onClick={() => window.print()}>{r.exportPdf}</button>
        <button className={styles.linkButton} type="button" onClick={deleteAnalysis}>{r.deleteAnalysis}</button>
      </div>

      <aside className={styles.disclaimer}>
        <strong>{r.disclaimerTitle}</strong>
        <span>{r.disclaimer}</span>
      </aside>

      {(!row.ai_result || !row.similarity_result) && <p className={styles.notice}>{r.partial}</p>}

      <section className={styles.card}>
        <h2 className={styles.sectionTitle}>{r.aiTitle}</h2>
        {row.ai_result ? (
          <>
            <div className={styles.shareBar} aria-hidden="true">
              <span className={styles.shareAi} style={{ width: `${summary.percentAi}%` }} />
              <span className={styles.shareAssisted} style={{ width: `${summary.percentAssisted}%` }} />
              <span className={styles.shareHuman} style={{ width: `${summary.percentHuman}%` }} />
            </div>
            <p>{r.aiShares(summary.percentAi, summary.percentAssisted, summary.percentHuman)}</p>
            <h3 className={styles.subTitle}>{r.segmentsTitle}</h3>
            {flagged.length === 0 ? (
              <p className={styles.hint}>{r.noSegments}</p>
            ) : (
              <>
                <p className={styles.hint}>{r.segmentsSummary(summary.highSegments, summary.mediumSegments, summary.flaggedWords)}</p>
                <ol className={styles.segments}>
                  {flagged.map((segment, index) => (
                    <li key={index} className={segment.level === 'high' ? styles.segmentHigh : styles.segmentMedium}>
                      <span className={styles.badge}>{r.level[segment.level as 'high' | 'medium']}</span>
                      <p>{segment.text}</p>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </>
        ) : (
          <p className={styles.hint}>{r.aiUnavailable}</p>
        )}
      </section>

      <section className={styles.card}>
        <h2 className={styles.sectionTitle}>{r.similarityTitle}</h2>
        {row.similarity_result ? (
          <>
            <p>{r.similarityPercent(summary.similarityPercent ?? 0)}</p>
            {row.similarity_result.sources.length === 0 ? (
              <p className={styles.hint}>{r.noSources}</p>
            ) : (
              <ol className={styles.sources}>
                {row.similarity_result.sources.map((source, index) => (
                  <li key={index}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer nofollow">{source.url}</a>
                    {source.excerpt && <p className={styles.hint}>“{source.excerpt}”</p>}
                  </li>
                ))}
              </ol>
            )}
          </>
        ) : (
          <p className={styles.hint}>{r.similarityUnavailable}</p>
        )}
      </section>

      <section className={styles.card}>
        <h2 className={styles.sectionTitle}>{r.decisionTitle}</h2>
        <p className={`${styles.hint} ${styles.noPrint}`}>{r.decisionIntro}</p>
        {row.decision && (
          <p className={styles.decisionRecorded}>
            <strong>{r.decisionLabels[row.decision]}</strong>
            {row.decision_note && <span>{row.decision_note}</span>}
            {row.decided_at && <span className={styles.hint}>{r.decisionSaved(new Date(row.decided_at).toLocaleString(dateLocale))}</span>}
          </p>
        )}
        <form className={`${styles.form} ${styles.noPrint}`} onSubmit={saveDecision}>
          <fieldset className={styles.choices}>
            {EDITORIAL_DECISIONS.map((value) => (
              <label key={value} className={styles.checkbox}>
                <input type="radio" name="decision" value={value} defaultChecked={row.decision === value} required />
                <span>{r.decisionLabels[value]}</span>
              </label>
            ))}
          </fieldset>
          <textarea
            className={styles.textarea}
            name="note"
            rows={4}
            maxLength={4000}
            defaultValue={row.decision_note ?? ''}
            placeholder={r.notePlaceholder}
            style={{ minHeight: 110 }}
          />
          {actionError && <p className={styles.error} role="alert">{actionError}</p>}
          <button className={styles.button} type="submit" disabled={saving}>
            {saving ? r.savingDecision : r.saveDecision}
          </button>
        </form>
      </section>

      <p className={styles.hint}>{r.retention(new Date(row.delete_after).toLocaleDateString(dateLocale))}</p>
    </AppFrame>
  )
}
