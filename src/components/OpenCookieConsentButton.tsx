'use client'

import { OPEN_COOKIE_CONSENT_EVENT } from '@/components/CookieConsent'

// Reopens the cookie banner with a caller-supplied label (used by non-French pages).
export default function OpenCookieConsentButton({ label, className }: { label: string; className?: string }) {
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
