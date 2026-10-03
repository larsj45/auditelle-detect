'use client'

import { useConfig } from '@/components/ConfigProvider'
import { OPEN_COOKIE_CONSENT_EVENT } from '@/components/CookieConsent'

// Footer control that reopens the cookie banner so visitors can change their choice
export default function ManageCookiesLink({ className }: { className?: string }) {
  const config = useConfig()
  const label = config.strings.cookieConsent.manage
  if (!config.googleAdsId || !label) return null

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_CONSENT_EVENT))}
      className={`cursor-pointer ${className ?? ''}`}
    >
      {label}
    </button>
  )
}
