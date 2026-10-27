'use client'

import { Printer } from 'lucide-react'
import { useConfig } from '@/components/ConfigProvider'

export function PrintReportHeader() {
  const config = useConfig()
  const copy = config.strings.results.printReport
  if (!copy) return null
  return (
    <div className="print-report-header hidden border-b border-gray-300 pb-3 mb-5 text-sm text-gray-700">
      <strong className="block text-lg text-[var(--navy)]">{config.name}</strong>
      <span>{copy.generated} {new Intl.DateTimeFormat(config.htmlLang, { dateStyle: 'long' }).format(new Date())}</span>
      <p className="mt-1">{copy.disclaimer}</p>
    </div>
  )
}

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
