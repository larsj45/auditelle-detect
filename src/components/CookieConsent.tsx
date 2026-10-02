'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useConfig } from '@/components/ConfigProvider'
import { getCookieConsentCopy } from '@/components/cookieConsentCopy'

declare function gtag(...args: unknown[]): void

const CONSENT_KEY = 'cookie_consent'

function updateConsent(state: 'granted' | 'denied') {
  if (typeof gtag !== 'undefined') {
    gtag('consent', 'update', {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state,
    })
  }
}

export function CookieConsent() {
  const config = useConfig()
  const pathname = usePathname()
  // Starts hidden on both server and client so the first client render matches
  // the server HTML (reading localStorage during render caused React #418).
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored === 'granted') {
      // User already accepted — update consent
      updateConsent('granted')
    } else if (stored === null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reads browser-only storage after hydration
      setVisible(true)
    }
  }, [])

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, 'granted')
    updateConsent('granted')
    setVisible(false)
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, 'denied')
    updateConsent('denied')
    setVisible(false)
  }

  if (!visible) return null

  const s = getCookieConsentCopy(pathname, config.strings.cookieConsent)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white shadow-2xl border border-gray-200 p-5 sm:p-6">
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          {s.message}
        </p>
        <div className="flex items-center gap-3 justify-end">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          >
            {s.decline}
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 text-sm font-medium text-white rounded-lg transition-colors cursor-pointer"
            style={{ backgroundColor: 'var(--color-accent, #6366f1)' }}
          >
            {s.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
