'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import AppFrame from './AppFrame'
import styles from './LettrineApp.module.css'
import { getLettrineAppCopy } from './appCopy'
import type { LettrineLocale } from '@/lib/lettrine/signup'
import { EDITORIAL_DECISIONS, type EditorialDecision } from '@/lib/lettrine/decision'

interface HistoryRow {
  id: string
  manuscript_ref: string
  title: string | null
  created_at: string
  decision: EditorialDecision | null
}

type Filter = 'all' | 'undecided' | EditorialDecision

export default function History({ locale }: { locale: LettrineLocale }) {
  const copy = getLettrineAppCopy(locale)
  const h = copy.history
  const [rows, setRows] = useState<HistoryRow[] | null>(null)
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    async function load() {
      const { data: session } = await supabase.auth.getSession()
      if (!session.session) {
        window.location.replace(copy.paths.login)
        return
      }
      // RLS returns only the organisation's analyses.
      const { data } = await supabase
        .from('lettrine_analyses')
        .select('id, manuscript_ref, title, created_at, decision')
        .order('created_at', { ascending: false })
        .limit(500)
      setRows((data as HistoryRow[] | null) ?? [])
    }
    load().catch(() => setRows([]))
  }, [copy.paths.login])

  const visible = useMemo(() => {
    if (!rows) return []
    if (filter === 'all') return rows
    if (filter === 'undecided') return rows.filter((row) => !row.decision)
    return rows.filter((row) => row.decision === filter)
  }, [rows, filter])

  const dateLocale = locale === 'sv' ? 'sv-SE' : 'fr-FR'

  return (
    <AppFrame copy={copy} action={<a className={styles.linkButton} href={copy.paths.dashboard}>{copy.report.backToOverview}</a>}>
      <h1 className={styles.title}>{h.title}</h1>
      <label className={styles.field} style={{ maxWidth: 360, margin: '16px 0' }}>
        {h.filterLabel}
        <select className={styles.select} value={filter} onChange={(event) => setFilter(event.target.value as Filter)}>
          <option value="all">{h.filterAll}</option>
          <option value="undecided">{h.filterUndecided}</option>
          {EDITORIAL_DECISIONS.map((value) => (
            <option key={value} value={value}>{copy.report.decisionLabels[value]}</option>
          ))}
        </select>
      </label>
      {rows === null ? (
        <p className={styles.intro}>{copy.common.loading}</p>
      ) : visible.length === 0 ? (
        <p className={styles.intro}>{h.empty}</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{h.reference}</th>
                <th>{h.date}</th>
                <th>{h.decision}</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => (
                <tr key={row.id}>
                  <td>
                    <a href={copy.paths.analysis(row.id)}>{row.title || row.manuscript_ref}</a>
                    {row.title && <span className={styles.hint}> · {row.manuscript_ref}</span>}
                  </td>
                  <td>{new Date(row.created_at).toLocaleDateString(dateLocale)}</td>
                  <td>{row.decision ? copy.report.decisionLabels[row.decision] : <span className={styles.hint}>{h.undecided}</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AppFrame>
  )
}
