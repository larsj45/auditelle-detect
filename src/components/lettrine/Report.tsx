'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import AppFrame from './AppFrame'
import styles from './LettrineApp.module.css'
import { getLettrineAppCopy } from './appCopy'
import type { LettrineLocale } from '@/lib/lettrine/signup'
import { summarizeReport, type StoredAiResult, type StoredSimilarityResult } from '@/lib/lettrine/report'

interface AnalysisRow {
  id: string
  manuscript_ref: string
  title: string | null
  word_count: number
  units: number
  ai_result: StoredAiResult | null
  similarity_result: StoredSimilarityResult | null
  created_at: string
}

export default function Report({ locale, id }: { locale: LettrineLocale; id: string }) {
  const copy = getLettrineAppCopy(locale)
  const r = copy.report
  const [row, setRow] = useState<AnalysisRow | null>(null)
  const [state, setState] = useState<'loading' | 'ready' | 'missing'>('loading')

  useEffect(() => {
    async function load() {
      const { data: session } = await supabase.auth.getSession()
      if (!session.session) {
        window.location.replace(copy.paths.login)
        return
      }
      // RLS limits the read to members of the analysis's organisation.
      const { data } = await supabase
        .from('lettrine_analyses')
        .select('id, manuscript_ref, title, word_count, units, ai_result, similarity_result, created_at')
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

  const back = <a className={styles.linkButton} href={copy.paths.dashboard}>{r.backToOverview}</a>

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
    </AppFrame>
  )
}
