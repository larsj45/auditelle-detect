'use client'

import { Printer } from 'lucide-react'
import { useConfig } from '@/components/ConfigProvider'

export default function ExportReportButton() {
  const config = useConfig()

  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-[var(--navy)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      <Printer className="h-4 w-4" />
      {config.strings.results.exportPdf}
    </button>
  )
}
