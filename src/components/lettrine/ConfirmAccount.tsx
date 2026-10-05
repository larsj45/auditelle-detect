'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import AppFrame from './AppFrame'
import styles from './LettrineApp.module.css'
import { getLettrineAppCopy } from './appCopy'
import type { LettrineLocale } from '@/lib/lettrine/signup'

// Landing page of the confirmation link. supabase-js reads the session from the
// URL fragment; we then create the journal organisation and open the dashboard.
export default function ConfirmAccount({ locale }: { locale: LettrineLocale }) {
  const copy = getLettrineAppCopy(locale)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function run() {
      const fragmentError = new URLSearchParams(window.location.hash.slice(1)).get('error')
      const { data } = await supabase.auth.getSession()
      const token = data.session?.access_token
      if (fragmentError || !token) {
        if (!cancelled) setFailed(true)
        return
      }
      const response = await fetch('/api/lettrine/onboard', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const result = (await response.json().catch(() => null)) as { success?: boolean; trialGranted?: boolean } | null
      if (!response.ok || !result?.success) {
        if (!cancelled) setFailed(true)
        return
      }
      const trial = result.trialGranted ? 'granted' : 'none'
      window.location.replace(`${copy.paths.dashboard}?welcome=1&trial=${trial}`)
    }
    run().catch(() => !cancelled && setFailed(true))
    return () => {
      cancelled = true
    }
  }, [copy.paths.dashboard])

  return (
    <AppFrame copy={copy} narrow>
      <div className={styles.card}>
        {failed ? (
          <>
            <p className={styles.intro}>{copy.confirm.failed}</p>
            <a className={styles.linkButton} href={copy.paths.login}>{copy.login.title}</a>
          </>
        ) : (
          <p className={styles.intro}>{copy.confirm.working}</p>
        )}
      </div>
    </AppFrame>
  )
}
