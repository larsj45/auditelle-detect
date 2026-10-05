'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import AppFrame from './AppFrame'
import styles from './LettrineApp.module.css'
import { getLettrineAppCopy, type AppErrorCode } from './appCopy'
import type { LettrineLocale } from '@/lib/lettrine/signup'
import { UNIT_PACKS, formatEuros, pricePerUnitCents, type UnitPack } from '@/lib/lettrine/packs'

export default function BuyUnits({ locale }: { locale: LettrineLocale }) {
  const copy = getLettrineAppCopy(locale)
  const b = copy.buy
  const [token, setToken] = useState<string | null>(null)
  const [pending, setPending] = useState<UnitPack['id'] | null>(null)
  const [error, setError] = useState('')
  const [canceled, setCanceled] = useState(false)

  useEffect(() => {
    // Browser-only query string, read after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCanceled(new URLSearchParams(window.location.search).get('canceled') === '1')
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) window.location.replace(copy.paths.login)
      else setToken(data.session.access_token)
    })
  }, [copy.paths.login])

  async function buy(pack: UnitPack) {
    if (!token) return
    setError('')
    setPending(pack.id)
    const response = await fetch('/api/lettrine/checkout', {
      method: 'POST',
      headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ pack: pack.id }),
    }).catch(() => null)
    const result = (await response?.json().catch(() => null)) as { success?: boolean; url?: string; errorCode?: AppErrorCode } | null
    if (!response?.ok || !result?.success || !result.url) {
      setError(copy.errors[result?.errorCode ?? 'unknown'] ?? copy.errors.unknown)
      setPending(null)
      return
    }
    window.location.assign(result.url)
  }

  return (
    <AppFrame copy={copy} action={<a className={styles.linkButton} href={copy.paths.dashboard}>{copy.report.backToOverview}</a>}>
      <h1 className={styles.title}>{b.title}</h1>
      <p className={styles.intro}>{b.intro}</p>
      {canceled && <p className={styles.notice}>{b.canceled}</p>}
      <div className={styles.packs}>
        {UNIT_PACKS.map((pack) => (
          <section key={pack.id} className={styles.card}>
            <p className={styles.label}>{b.units(pack.units)}</p>
            <p className={styles.balance}>{formatEuros(pack.amountCents, locale)}</p>
            <p className={styles.hint}>
              {b.exVat} · {b.perUnit(formatEuros(pricePerUnitCents(pack), locale))}
            </p>
            <button className={styles.button} type="button" disabled={!token || pending !== null} onClick={() => buy(pack)}>
              {pending === pack.id ? b.redirecting : b.buyButton}
            </button>
          </section>
        ))}
      </div>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <p className={styles.muted}>{b.vatNotice}</p>
    </AppFrame>
  )
}
