'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { persistAttributionPageView } from '@/lib/attribution'

export function AttributionTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.toString()

  useEffect(() => {
    persistAttributionPageView({
      pathname,
      search,
      referrer: document.referrer,
    })
  }, [pathname, search])

  return null
}
