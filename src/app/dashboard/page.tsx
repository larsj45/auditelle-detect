'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import DetectionResult from '@/components/DetectionResult'
import PlagiarismResult from '@/components/PlagiarismResult'
import DetectionModeToggle from '@/components/DetectionModeToggle'
import { FileSearch, Search, Loader2, CheckCircle } from 'lucide-react'
import FileUpload from '@/components/FileUpload'
import { useConfig } from '@/components/ConfigProvider'

interface DetectionResponse {
  ai_likelihood: number
  ai_assisted_likelihood?: number
  human_likelihood?: number
  headline?: string
  dashboard_link?: string
  sentences?: Array<{ text: string; ai_likelihood: number; label?: string; confidence?: string }>
  scans_remaining?: number
}

interface PlagiarismResponse {
  plagiarism_detected: boolean
  percent_plagiarized: number
  plagiarized_content: Array<{
    source_url: string
    matched_text: string
    similarity_score: number
  }>
  scans_remaining?: number
}

declare function gtag(...args: unknown[]): void

function ConversionTracker({ onSuccess }: { onSuccess: () => void }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const config = useConfig()

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      if (typeof gtag !== 'undefined' && config.googleAdsConversionLabel) {
        gtag('event', 'conversion', {
          send_to: config.googleAdsConversionLabel,
          transaction_id: '',
        })
      }
      onSuccess()
      router.replace('/dashboard', { scroll: false })
    }
  }, [searchParams, onSuccess, router, config.googleAdsConversionLabel])

  return null
}

export default function DashboardPage() {
  const config = useConfig()
  const s = config.strings.dashboard
  const p = config.strings.plagiarism
  const [text, setText] = useState('')
  const [mode, setMode] = useState<'ai' | 'plagiarism'>('ai')
  const [loading, setLoading] = useState(false)
  const [aiResult, setAiResult] = useState<DetectionResponse | null>(null)
  const [plagResult, setPlagResult] = useState<PlagiarismResponse | null>(null)
  const [error, setError] = useState('')
  const [scansRemaining, setScansRemaining] = useState<number | null>(null)
  const [showSuccessBanner, setShowSuccessBanner] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('auditelle_onboarded')) {
      setShowOnboarding(true)
    }
  }, [])

  const handleTrySample = () => {
    setText(config.strings.heroDemo.chatgptSample)
    setShowOnboarding(false)
    localStorage.setItem('auditelle_onboarded', '1')
  }

  const dismissOnboarding = () => {
    setShowOnboarding(false)
    localStorage.setItem('auditelle_onboarded', '1')
  }

  const handleModeChange = (newMode: 'ai' | 'plagiarism') => {
    setMode(newMode)
    setAiResult(null)
    setPlagResult(null)
    setError('')
  }

  const handleAnalyze = async () => {
    if (!text.trim() || text.trim().length < 50) {
      setError(s.minCharsError)
      return
    }

    setLoading(true)
    setError('')
    setAiResult(null)
    setPlagResult(null)

    try {
      const { supabase } = await import('@/lib/supabase')
      const { data: { session } } = await supabase.auth.getSession()

      const response = await fetch('/api/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.access_token && { Authorization: `Bearer ${session.access_token}` }),
        },
        body: JSON.stringify({ text: text.trim(), mode }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || config.strings.errors.analysisError)
      }

      if (mode === 'plagiarism') {
        setPlagResult(data)
      } else {
        setAiResult(data)
      }

      if (data.scans_remaining !== undefined) {
        setScansRemaining(data.scans_remaining)
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : config.strings.errors.internalError
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl">
      <Suspense fallback={null}>
        <ConversionTracker onSuccess={() => setShowSuccessBanner(true)} />
      </Suspense>

      {showSuccessBanner && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 text-sm px-4 py-3 rounded-xl mb-6">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <span>
            <strong>{s.subscriptionActivated}</strong> {s.subscriptionActivatedDetail}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--navy)]">{s.analyzerTitle}</h1>
          <p className="text-gray-500 mt-1">{s.analyzerSubtitle}</p>
        </div>
        {scansRemaining !== null && (
          <div className={`text-sm px-4 py-2 rounded-lg border ${
            scansRemaining <= 0
              ? 'bg-red-50 border-red-200 text-red-700'
              : scansRemaining <= 1
              ? 'bg-amber-50 border-amber-200 text-amber-700'
              : 'bg-white border-gray-200 text-gray-500'
          }`}>
            <span className="font-semibold">{scansRemaining}</span> {s.scansRemaining}
            {scansRemaining <= 1 && scansRemaining > 0 && (
              <a href="/dashboard/upgrade" className="ml-2 text-[var(--accent)] font-semibold hover:underline">Upgrade →</a>
            )}
            {scansRemaining <= 0 && (
              <a href="/dashboard/upgrade" className="ml-2 font-semibold hover:underline">Upgrade →</a>
            )}
          </div>
        )}
      </div>

      {/* Mode toggle */}
      <div className="mb-4">
        <DetectionModeToggle mode={mode} onModeChange={handleModeChange} disabled={loading} />
      </div>

      {showOnboarding && (
        <div className="bg-[var(--accent-light)] border border-[var(--accent)]/20 rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-[var(--navy)] mb-2">Bienvenue sur Auditelle ! 👋</h3>
          <p className="text-sm text-gray-600 mb-4">
            Collez un texte ci-dessous pour vérifier s&apos;il a été généré par IA — ou essayez avec un exemple.
          </p>
          <div className="flex gap-3">
            <button onClick={handleTrySample} className="btn-primary text-sm px-4 py-2">
              Essayer avec un exemple →
            </button>
            <button onClick={dismissOnboarding} className="text-sm text-gray-500 hover:text-gray-700">
              Fermer
            </button>
          </div>
        </div>
      )}

      <div className="card mb-6">
        <FileUpload onTextExtracted={(extractedText) => { if (extractedText) setText(extractedText) }} />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={s.textareaPlaceholder}
          className="w-full h-48 resize-y border border-gray-200 rounded-lg p-4 text-sm focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition"
        />
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-gray-400">{text.length} {s.characters}</span>
          <button
            onClick={handleAnalyze}
            disabled={loading || text.trim().length < 50}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {s.analyzing}
              </>
            ) : mode === 'plagiarism' ? (
              <>
                <Search className="w-4 h-4" />
                {p.analyzePlagiarism}
              </>
            ) : (
              <>
                <FileSearch className="w-4 h-4" />
                {s.analyze}
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 text-sm p-4 rounded-lg mb-6">
          {error}
          {scansRemaining !== null && scansRemaining <= 0 && (
            <div className="mt-3 pt-3 border-t border-red-200">
              <a
                href="/dashboard/upgrade"
                className="inline-flex items-center gap-2 bg-[var(--accent)] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[var(--accent-hover)] transition"
              >
                Passer au Pro — 12,50€ le premier mois →
              </a>
              <p className="text-xs text-red-400 mt-1">Code promo <strong>BIENVENUE50</strong> — 50% sur le 1er mois</p>
            </div>
          )}
        </div>
      )}

      {aiResult && (
        <div className="card">
          <DetectionResult
            score={Math.round(aiResult.ai_likelihood * 100)}
            headline={aiResult.headline}
            aiAssistedScore={aiResult.ai_assisted_likelihood}
            humanScore={aiResult.human_likelihood}
            dashboardLink={aiResult.dashboard_link}
            sentences={aiResult.sentences?.map(sent => ({
              ...sent,
              ai_likelihood: Math.round(sent.ai_likelihood * 100),
            }))}
          />
        </div>
      )}

      {plagResult && (
        <div className="card">
          <PlagiarismResult
            percentPlagiarized={plagResult.percent_plagiarized}
            plagiarismDetected={plagResult.plagiarism_detected}
            sources={plagResult.plagiarized_content}
          />
        </div>
      )}
    </div>
  )
}
