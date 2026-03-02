'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import AuthForm from '@/components/AuthForm'
import { useConfig } from '@/components/ConfigProvider'

function PendingBanner() {
  const searchParams = useSearchParams()
  const config = useConfig()
  const pending = searchParams.get('pending')

  if (pending !== '1') return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-emerald-50 border-b border-emerald-200 px-4 py-3 text-center">
      <p className="text-sm font-medium text-emerald-800">
        ✅ {config.strings.heroDemo.pendingBanner}
      </p>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense>
      <PendingBanner />
      <AuthForm mode="signup" />
    </Suspense>
  )
}
