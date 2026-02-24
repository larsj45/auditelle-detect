'use client'

import { createContext, useContext } from 'react'
import type { ResellerConfig } from '@/lib/config'

const ConfigContext = createContext<ResellerConfig | null>(null)

export function ConfigProvider({
  config,
  children,
}: {
  config: ResellerConfig
  children: React.ReactNode
}) {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  )
}

export function useConfig(): ResellerConfig {
  const config = useContext(ConfigContext)
  if (!config) {
    throw new Error('useConfig must be used within a ConfigProvider')
  }
  return config
}
