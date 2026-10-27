'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useConfig } from '@/components/ConfigProvider'
import { supabase } from '@/lib/supabase'
import { oauthCallbackState } from '@/lib/oauth-callback-state'

export default function AuthCallbackPage() {
  const config = useConfig()
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true
    // The browser client uses Supabase's implicit flow. getSession waits for
    // initialization and detectSessionInUrl to persist the returned fragment.
    supabase.auth.getSession().then(async ({ data, error }) => {
      if (!active) return
      if (oauthCallbackState(window.location.href, !!data.session, !!error) === 'error') {
        setFailed(true)
        return
      }
      const token = data.session!.access_token
      try {
        await fetch('/api/email/welcome', {
          method: 'POST', headers: { Authorization: `Bearer ${token}` },
        })
      } catch {
        // The dashboard retries this authenticated, idempotent operation.
      }
      if (active) window.location.replace('/dashboard')
    }).catch(() => { if (active) setFailed(true) })
    return () => { active = false }
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      {failed ? (
        <div role="alert" className="text-center text-red-700">
          <p>{config.strings.auth.callbackError ?? config.strings.errors.internalError}</p>
          <Link className="underline" href="/login">{config.strings.auth.login}</Link>
        </div>
      ) : <p>{config.strings.auth.loading}</p>}
    </main>
  )
}
