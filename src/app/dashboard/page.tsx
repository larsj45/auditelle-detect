'use client'

import { useState, useEffect, Suspense, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import DetectionResult from '@/components/DetectionResult'
import PlagiarismResult from '@/components/PlagiarismResult'
import DetectionModeToggle, { type DetectionMode } from '@/components/DetectionModeToggle'
import ExportReportButton from '@/components/ExportReportButton'
import { FileSearch, Search, Loader2, CheckCircle, Coins } from 'lucide-react'
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

interface PendingPlagiarismResponse {
  status: 'pending'
  provider: 'copyleaks'
  job_id: string
  provider_job_id?: string
}

interface CombinedDetectionResponse {
  mode: 'both'
  ai: DetectionResponse | null
  plagiarism: PlagiarismResponse | PendingPlagiarismResponse | null
  partial?: boolean
  async?: boolean
  errors?: Partial<Record<'ai' | 'plagiarism', string>>
  scans_remaining?: number
}

interface DetectionJobResponse {
  id: string
  status: 'queued' | 'processing' | 'completed' | 'error'
  provider: 'copyleaks'
  capability: 'plagiarism'
  error: string | null
  result: unknown
  completed_at: string | null
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

function isPendingPlagiarismResponse(value: unknown): value is PendingPlagiarismResponse {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<PendingPlagiarismResponse>
  return candidate.status === 'pending' && candidate.provider === 'copyleaks' && typeof candidate.job_id === 'string'
}

function normalizeSimilarityRatio(value: unknown) {
  const numberValue = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(numberValue)) return 0
  return numberValue > 1 ? numberValue / 100 : numberValue
}

function normalizePlagiarismResult(value: unknown): PlagiarismResponse | null {
  if (!value || typeof value !== 'object') return null
  const payload = value as Record<string, unknown>
  const rawSources = Array.isArray(payload.plagiarized_content)
    ? payload.plagiarized_content
    : Array.isArray(payload.sources)
    ? payload.sources
    : Array.isArray(payload.matches)
    ? payload.matches
    : []

  return {
    plagiarism_detected: Boolean(payload.plagiarism_detected),
    percent_plagiarized: Number(payload.percent_plagiarized ?? 0),
    plagiarized_content: rawSources.map((source) => {
      const item = source as Record<string, unknown>
      const sourceUrl = item.source_url ?? item.url ?? ''
      const matchedText = item.matched_text ?? item.text ?? item.introduction ?? ''
      return {
        source_url: String(sourceUrl || ''),
        matched_text: String(matchedText || ''),
        similarity_score: normalizeSimilarityRatio(item.similarity_score ?? item.similarity ?? item.similarity_percentage),
      }
    }),
  }
}

function getBuyCreditsLabel(htmlLang: string) {
  if (htmlLang === 'es') return 'Comprar créditos →'
  if (htmlLang === 'pt') return 'Comprar créditos →'
  return 'Acheter des crédits →'
}

function getCreditsAddedLabel(count: number, singular: string, plural: string, htmlLang: string) {
  const amount = `${count} ${count === 1 ? singular : plural}`
  if (htmlLang === 'es') return { strong: `${amount} añadidos.`, detail: 'Tus créditos están listos para usar.' }
  if (htmlLang === 'pt') return { strong: `${amount} adicionados.`, detail: 'Seus créditos estão prontos para usar.' }
  return { strong: `${amount} ajoutés.`, detail: 'Vos crédits sont prêts à utiliser.' }
}

function getModeCreditLine(htmlLang: string, labels: { modeAI: string; modePlagiarism: string; modeBoth: string }) {
  const credit = htmlLang === 'es' ? 'crédito' : htmlLang === 'pt' ? 'crédito' : 'crédit'
  const credits = htmlLang === 'es' ? 'créditos' : htmlLang === 'pt' ? 'créditos' : 'crédits'
  return `${labels.modeAI}: 1 ${credit} · ${labels.modePlagiarism}: 2 ${credits} · ${labels.modeBoth}: 3 ${credits}`
}

declare function gtag(...args: unknown[]): void

function ConversionTracker({ onSuccess, onCreditsAdded }: { onSuccess: () => void; onCreditsAdded: (n: number) => void }) {
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
    const creditsAdded = searchParams.get('credits_added')
    if (creditsAdded) {
      onCreditsAdded(parseInt(creditsAdded, 10))
      router.replace('/dashboard', { scroll: false })
    }
  }, [searchParams, onSuccess, onCreditsAdded, router, config.googleAdsConversionLabel])

  return null
}

export default function DashboardPage() {
  const config = useConfig()
  const s = config.strings.dashboard
  const p = config.strings.plagiarism
  const buyCreditsLabel = getBuyCreditsLabel(config.htmlLang)
  const [text, setText] = useState('')
  const [mode, setMode] = useState<DetectionMode>('ai')
  const [loading, setLoading] = useState(false)
  const [aiResult, setAiResult] = useState<DetectionResponse | null>(null)
  const [plagResult, setPlagResult] = useState<PlagiarismResponse | null>(null)
  const [resultText, setResultText] = useState('')
  const [error, setError] = useState('')
  const [partialWarning, setPartialWarning] = useState('')
  const [scansRemaining, setScansRemaining] = useState<number | null>(null)
  const [showSuccessBanner, setShowSuccessBanner] = useState(false)
  const [showCreditsBanner, setShowCreditsBanner] = useState<number | null>(null)
  const [credits, setCredits] = useState<number | null>(null)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [pendingPlagiarismJobId, setPendingPlagiarismJobId] = useState<string | null>(null)
  const pollRunRef = useRef(0)
  const creditBalanceLabel = (count: number) => `${count} ${count === 1 ? s.upgradeCreditSingular : s.upgradeCreditPlural}`

  useEffect(() => {
    if (!localStorage.getItem('auditelle_onboarded')) {
      setShowOnboarding(true)
    }
    loadCredits()
  }, [])

  useEffect(() => {
    return () => {
      pollRunRef.current += 1
    }
  }, [])

  async function loadCredits() {
    try {
      const { supabase } = await import('@/lib/supabase')
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: profile } = await supabase
        .from('profiles')
        .select('scan_credits, plan')
        .eq('id', user.id)
        .single()
      if (profile?.plan === 'free') {
        setCredits(profile?.scan_credits ?? 0)
      }
    } catch { /* ignore */ }
  }

  const handleTrySample = () => {
    setText(config.strings.heroDemo.chatgptSample)
    setShowOnboarding(false)
    localStorage.setItem('auditelle_onboarded', '1')
  }

  const dismissOnboarding = () => {
    setShowOnboarding(false)
    localStorage.setItem('auditelle_onboarded', '1')
  }

  const handleModeChange = (newMode: DetectionMode) => {
    setMode(newMode)
    setAiResult(null)
    setPlagResult(null)
    setResultText('')
    setError('')
    setPartialWarning('')
    setPendingPlagiarismJobId(null)
    pollRunRef.current += 1
  }

  async function pollPlagiarismJob(jobId: string, runId: number, accessToken: string) {
    setPendingPlagiarismJobId(jobId)

    for (let attempt = 0; attempt < 60; attempt += 1) {
      if (pollRunRef.current !== runId) return

      await new Promise((resolve) => setTimeout(resolve, attempt < 6 ? 2500 : 5000))
      if (pollRunRef.current !== runId) return

      const response = await fetch(`/api/detect/jobs/${encodeURIComponent(jobId)}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const data = (await response.json()) as DetectionJobResponse | { error?: string }
      if (!response.ok) {
        throw new Error('Erro ao consultar análise de similaridade')
      }

      const job = data as DetectionJobResponse
      if (job.status === 'completed') {
        const normalized = normalizePlagiarismResult(job.result)
        if (!normalized) {
          throw new Error(config.strings.errors.analysisError)
        }
        setPlagResult(normalized)
        setPendingPlagiarismJobId(null)
        return
      }

      if (job.status === 'error') {
        throw new Error(job.error || config.strings.errors.analysisError)
      }
    }

    throw new Error('A análise de similaridade ainda está em andamento. Tente atualizar em alguns minutos.')
  }

  const handleAnalyze = async () => {
    if (!text.trim() || text.trim().length < 50) {
      setError(s.minCharsError)
      return
    }

    setLoading(true)
    setError('')
    setPartialWarning('')
    setAiResult(null)
    setPlagResult(null)
    setResultText('')
    setPendingPlagiarismJobId(null)
    const pollRunId = pollRunRef.current + 1
    pollRunRef.current = pollRunId

    try {
      const trimmedText = text.trim()
      const { supabase } = await import('@/lib/supabase')
      const { data: { session } } = await supabase.auth.getSession()

      const response = await fetch('/api/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.access_token && { Authorization: `Bearer ${session.access_token}` }),
        },
        body: JSON.stringify({ text: trimmedText, mode }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || config.strings.errors.analysisError)
      }

      setResultText(trimmedText)

      if (data.mode === 'both') {
        const combined = data as CombinedDetectionResponse
        setAiResult(combined.ai)
        if (isPendingPlagiarismResponse(combined.plagiarism)) {
          if (!session?.access_token) throw new Error(config.strings.errors.unauthorized)
          void pollPlagiarismJob(combined.plagiarism.job_id, pollRunId, session.access_token).catch((err: unknown) => {
            if (pollRunRef.current !== pollRunId) return
            const message = err instanceof Error ? err.message : config.strings.errors.internalError
            setError(message)
            setPendingPlagiarismJobId(null)
          })
        } else {
          setPlagResult(normalizePlagiarismResult(combined.plagiarism))
        }
        if (combined.partial) {
          const details = Object.values(combined.errors ?? {}).filter(Boolean).join(' ')
          setPartialWarning(details || config.strings.errors.analysisError)
        }
      } else if (mode === 'plagiarism') {
        if (isPendingPlagiarismResponse(data)) {
          if (!session?.access_token) throw new Error(config.strings.errors.unauthorized)
          void pollPlagiarismJob(data.job_id, pollRunId, session.access_token).catch((err: unknown) => {
            if (pollRunRef.current !== pollRunId) return
            const message = err instanceof Error ? err.message : config.strings.errors.internalError
            setError(message)
            setPendingPlagiarismJobId(null)
          })
        } else {
          setPlagResult(normalizePlagiarismResult(data))
        }
      } else {
        setAiResult(data)
      }

      if (data.scans_remaining !== undefined) {
        setScansRemaining(data.scans_remaining)
        if (credits !== null) {
          setCredits(data.scans_remaining)
        }
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
        <ConversionTracker
          onSuccess={() => setShowSuccessBanner(true)}
          onCreditsAdded={(n) => { setShowCreditsBanner(n); loadCredits() }}
        />
      </Suspense>

      {showSuccessBanner && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 text-sm px-4 py-3 rounded-xl mb-6">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <span>
            <strong>{s.subscriptionActivated}</strong> {s.subscriptionActivatedDetail}
          </span>
        </div>
      )}

      {showCreditsBanner !== null && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 text-sm px-4 py-3 rounded-xl mb-6">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <span>
            {(() => {
              const label = getCreditsAddedLabel(showCreditsBanner, s.upgradeCreditSingular, s.upgradeCreditPlural, config.htmlLang)
              return (
                <>
                  <strong>{label.strong}</strong> {label.detail}
                </>
              )
            })()}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--navy)]">{s.analyzerTitle}</h1>
          <p className="text-gray-500 mt-1">{s.analyzerSubtitle}</p>
        </div>
        {credits !== null ? (
          <a href="/dashboard/upgrade" className={`text-sm px-4 py-2 rounded-lg border flex items-center gap-2 hover:border-[var(--accent)] transition ${
            credits <= 0
              ? 'bg-red-50 border-red-200 text-red-700'
              : credits <= 2
              ? 'bg-amber-50 border-amber-200 text-amber-700'
              : 'bg-white border-gray-200 text-gray-500'
          }`}>
            <Coins className="w-4 h-4" />
            <span className="font-semibold">{creditBalanceLabel(credits)}</span>
            {credits <= 0 && <span className="ml-1 font-semibold">— {buyCreditsLabel}</span>}
          </a>
        ) : scansRemaining !== null && (
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
        {config.features.plagiarismDetection && (
          <p className="mt-2 text-xs text-gray-500">
            {getModeCreditLine(config.htmlLang, p)}
          </p>
        )}
      </div>

      {showOnboarding && (
        <div className="bg-[var(--accent-light)] border border-[var(--accent)]/20 rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-[var(--navy)] mb-2">{s.onboardingTitle}</h3>
          <p className="text-sm text-gray-600 mb-4">
            {s.onboardingBody}
          </p>
          <div className="flex gap-3">
            <button onClick={handleTrySample} className="btn-primary text-sm px-4 py-2">
              {s.onboardingCta}
            </button>
            <button onClick={dismissOnboarding} className="text-sm text-gray-500 hover:text-gray-700">
              {s.onboardingDismiss}
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
                {s.analyze}
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 text-sm p-4 rounded-lg mb-6">
          {error}
          {((scansRemaining !== null && scansRemaining <= 0) || (credits !== null && credits <= 0)) && (
            <div className="mt-3 pt-3 border-t border-red-200">
              <a
                href="/dashboard/upgrade"
                className="inline-flex items-center gap-2 bg-[var(--accent)] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[var(--accent-hover)] transition"
              >
                {credits !== null ? buyCreditsLabel : s.limitUpgradeCta}
              </a>
              {credits === null && <p className="text-xs text-red-400 mt-1">{s.limitUpgradePromo}</p>}
            </div>
          )}
        </div>
      )}

      {partialWarning && (
        <div className="bg-amber-50 text-amber-800 border border-amber-200 text-sm p-4 rounded-lg mb-6">
          {p.partialWarning}
        </div>
      )}

      {loading && mode === 'both' && (
        <CombinedLoadingPanels aiLabel={p.modeAI} plagiarismLabel={p.modePlagiarism} loadingText={s.analyzing} />
      )}

      {pendingPlagiarismJobId && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 mb-6">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-amber-600" />
            <div>
              <p className="text-sm font-semibold text-[var(--navy)]">{p.modePlagiarism}</p>
              <p className="text-xs text-amber-800">
                Análise de similaridade em andamento. Resultados podem levar alguns minutos.
              </p>
            </div>
          </div>
        </div>
      )}

      {(aiResult || plagResult) && (
        <div className="print-report space-y-6">
          <div className="no-print flex justify-end">
            <ExportReportButton />
          </div>

          {aiResult && (
            <div className="card">
              {mode === 'both' && (
                <h2 className="text-lg font-semibold text-[var(--navy)] mb-4">{p.modeAI}</h2>
              )}
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
    </div>
  )
}
