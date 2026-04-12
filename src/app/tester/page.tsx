'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DetectionResult from '@/components/DetectionResult'
import PlagiarismResult from '@/components/PlagiarismResult'
import DetectionModeToggle, { type DetectionMode } from '@/components/DetectionModeToggle'
import ExportReportButton from '@/components/ExportReportButton'
import { FileSearch, Loader2, Sparkles, ArrowRight, Search } from 'lucide-react'
import FileUpload from '@/components/FileUpload'
import { useConfig } from '@/components/ConfigProvider'

interface DetectionResponse {
  ai_likelihood: number
  ai_assisted_likelihood?: number
  human_likelihood?: number
  headline?: string
  dashboard_link?: string
  sentences?: Array<{ text: string; ai_likelihood: number; label?: string; confidence?: string }>
  tests_remaining?: number
  limit_reached?: boolean
}

interface PlagiarismResponse {
  plagiarism_detected: boolean
  percent_plagiarized: number
  plagiarized_content: Array<{
    source_url: string
    matched_text: string
    similarity_score: number
  }>
  tests_remaining?: number
}

interface CombinedDetectionResponse {
  mode: 'both'
  ai: DetectionResponse | null
  plagiarism: PlagiarismResponse | null
  partial?: boolean
  errors?: Partial<Record<'ai' | 'plagiarism', string>>
  tests_remaining?: number
}

function CombinedLoadingPanels({ aiLabel, plagiarismLabel, loadingText }: { aiLabel: string; plagiarismLabel: string; loadingText: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 mb-6">
      {[aiLabel, plagiarismLabel].map((label) => (
        <div key={label} className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-[var(--accent)]" />
            <div>
              <p className="text-sm font-semibold text-[var(--navy)]">{label}</p>
              <p className="text-xs text-gray-500">{loadingText}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function TesterPage() {
  const config = useConfig()
  const p = config.strings.plagiarism
  const tester = config.strings.tester
  const [text, setText] = useState('')
  const [mode, setMode] = useState<DetectionMode>('ai')
  const [loading, setLoading] = useState(false)
  const [aiResult, setAiResult] = useState<DetectionResponse | null>(null)
  const [plagResult, setPlagResult] = useState<PlagiarismResponse | null>(null)
  const [resultText, setResultText] = useState('')
  const [error, setError] = useState('')
  const [partialWarning, setPartialWarning] = useState(false)
  const [testsRemaining, setTestsRemaining] = useState<number | null>(null)
  const [limitReached, setLimitReached] = useState(false)

  const handleAnalyze = async () => {
    if (!text.trim() || text.trim().length < 50) {
      setError(tester.minCharsError)
      return
    }

    setLoading(true)
    setError('')
    setPartialWarning(false)
    setAiResult(null)
    setPlagResult(null)
    setResultText('')

    try {
      const trimmedText = text.trim()
      const response = await fetch('/api/detect-public', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmedText, mode }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.limit_reached) {
          setLimitReached(true)
          setTestsRemaining(0)
        }
        throw new Error(data.error || tester.analysisError)
      }

      setResultText(trimmedText)

      if (data.mode === 'both') {
        const combined = data as CombinedDetectionResponse
        setAiResult(combined.ai)
        setPlagResult(combined.plagiarism)
        setPartialWarning(Boolean(combined.partial))
      } else if (mode === 'plagiarism') {
        setPlagResult(data)
      } else {
        setAiResult(data)
      }
      if (data.tests_remaining !== undefined) {
        setTestsRemaining(data.tests_remaining)
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : tester.internalError
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--bg-light)] pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[var(--accent)]/10 text-[var(--accent)] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              {tester.badge}
            </div>
            <h1 className="text-4xl font-bold text-[var(--navy)] mb-4">
              {tester.title}
            </h1>
            <p className="text-xl text-gray-600">
              {tester.subtitle}
            </p>
          </div>

          {/* Tests remaining indicator */}
          {testsRemaining !== null && (
            <div className="text-center mb-6">
              <span className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200">
                {testsRemaining > 0 ? (
                  <>
                    {tester.testsRemaining.replace('{count}', String(testsRemaining))}
                  </>
                ) : (
                  <span className="text-amber-600">{tester.limitReached}</span>
                )}
              </span>
            </div>
          )}

          {/* Main card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
            <div className="mb-4">
              <DetectionModeToggle
                mode={mode}
                onModeChange={(nextMode) => {
                  setMode(nextMode)
                  setAiResult(null)
                  setPlagResult(null)
                  setResultText('')
                  setPartialWarning(false)
                  setError('')
                }}
                disabled={loading || limitReached}
              />
            </div>
            <FileUpload onTextExtracted={(extractedText) => { if (extractedText) setText(extractedText) }} />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={tester.textareaPlaceholder}
              className="w-full h-48 resize-y border border-gray-200 rounded-lg p-4 text-sm focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition"
              disabled={limitReached}
            />
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-gray-400">
                {tester.characterCount.replace('{count}', String(text.length))}
              </span>
              <button
                onClick={handleAnalyze}
                disabled={loading || text.trim().length < 50 || limitReached}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {tester.loading}
                  </>
                ) : mode === 'both' ? (
                  <>
                    <FileSearch className="w-4 h-4" />
                    {p.analyzeBoth}
                  </>
                ) : mode === 'plagiarism' ? (
                  <>
                    <Search className="w-4 h-4" />
                    {p.analyzePlagiarism}
                  </>
                ) : (
                  <>
                    <FileSearch className="w-4 h-4" />
                    {tester.analyzeFree}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-700 text-sm p-4 rounded-lg mb-6">{error}</div>
          )}

          {partialWarning && (
            <div className="bg-amber-50 text-amber-800 border border-amber-200 text-sm p-4 rounded-lg mb-6">
              {p.partialWarning}
            </div>
          )}

          {loading && mode === 'both' && (
            <CombinedLoadingPanels aiLabel={p.modeAI} plagiarismLabel={p.modePlagiarism} loadingText={tester.loading} />
          )}

          {(aiResult || plagResult) && (
            <div className="print-report space-y-6 mb-8">
              <div className="no-print flex justify-end">
                <ExportReportButton />
              </div>

              {/* AI result */}
              {aiResult && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  {mode === 'both' && (
                    <h2 className="text-lg font-semibold text-[var(--navy)] mb-4">{p.modeAI}</h2>
                  )}
                  <DetectionResult
                    score={Math.round(aiResult.ai_likelihood * 100)}
                    headline={aiResult.headline}
                    aiAssistedScore={aiResult.ai_assisted_likelihood}
                    humanScore={aiResult.human_likelihood}
                    dashboardLink={aiResult.dashboard_link}
                    sentences={aiResult.sentences?.map(s => ({
                      ...s,
                      ai_likelihood: Math.round(s.ai_likelihood * 100),
                    }))}
                  />
                </div>
              )}

              {/* Plagiarism result */}
              {plagResult && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  {mode === 'both' && (
                    <h2 className="text-lg font-semibold text-[var(--navy)] mb-4">{p.modePlagiarism}</h2>
                  )}
                  <PlagiarismResult
                    percentPlagiarized={plagResult.percent_plagiarized}
                    plagiarismDetected={plagResult.plagiarism_detected}
                    sources={plagResult.plagiarized_content}
                    analyzedText={resultText}
                  />
                </div>
              )}
            </div>
          )}

          {/* CTA */}
          {(aiResult || plagResult || limitReached) && (
            <div className="bg-gradient-to-r from-[var(--navy)] to-[var(--accent)] rounded-2xl p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-4">
                {limitReached ? tester.ctaTitleLimit : tester.ctaTitle}
              </h2>
              <p className="text-white/80 mb-6">
                {tester.ctaBody}
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-white text-[var(--navy)] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                {tester.ctaButton}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Features */}
          {!aiResult && !plagResult && !limitReached && (
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="font-semibold text-[var(--navy)] mb-2">{tester.featureAccuracyTitle}</h3>
                <p className="text-gray-600 text-sm">{tester.featureAccuracyBody}</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="text-3xl mb-4">🔍</div>
                <h3 className="font-semibold text-[var(--navy)] mb-2">{tester.featureSectionTitle}</h3>
                <p className="text-gray-600 text-sm">{tester.featureSectionBody}</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="text-3xl mb-4">🤖</div>
                <h3 className="font-semibold text-[var(--navy)] mb-2">{tester.featureModelTitle}</h3>
                <p className="text-gray-600 text-sm">{tester.featureModelBody}</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
