'use client'

import { useState } from 'react'
import { Loader2, Sparkles, AlertCircle, Lock, Search } from 'lucide-react'
import { useConfig } from '@/components/ConfigProvider'
import DetectionModeToggle from '@/components/DetectionModeToggle'

interface DemoAIResult {
  mode: 'ai'
  score: number
  model: string | null
  verdict: string
  isAI: boolean
  remaining: number
}

interface DemoPlagiarismResult {
  mode: 'plagiarism'
  plagiarism_detected: boolean
  score: number
  source_count: number
  sources: Array<{ url: string; similarity: number }>
  remaining: number
}

type DemoResult = DemoAIResult | DemoPlagiarismResult

export default function HeroDemo() {
  const config = useConfig()
  const s = config.strings.heroDemo
  const r = config.strings.results
  const p = config.strings.plagiarism
  const [text, setText] = useState('')
  const [mode, setMode] = useState<'ai' | 'plagiarism'>('ai')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<DemoResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [remaining, setRemaining] = useState<number | null>(null)

  const analyze = async () => {
    if (text.trim().length < 50) {
      setError(config.strings.errors.textTooShort)
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const [res] = await Promise.all([
        fetch('/api/demo-detect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: text.slice(0, 2000), mode })
        }),
        new Promise(resolve => setTimeout(resolve, 800))
      ])

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || config.strings.errors.analysisError)
        return
      }

      setResult(data)
      if (typeof data.remaining === 'number') {
        setRemaining(data.remaining)
      }
    } catch {
      setError(s.connectionError)
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-500'
    if (score >= 50) return 'text-yellow-500'
    return 'text-green-500'
  }

  const handleModeChange = (newMode: 'ai' | 'plagiarism') => {
    setMode(newMode)
    setResult(null)
    setError(null)
  }

  // Sample buttons depend on mode
  const sampleButtons = mode === 'ai' ? (
    <>
      <button
        onClick={() => setText(s.humanSample)}
        disabled={loading}
        className="text-xs px-3 py-1 bg-green-50 text-green-700 rounded-full hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {s.humanButton}
      </button>
      <button
        onClick={() => setText(s.chatgptSample)}
        disabled={loading}
        className="text-xs px-3 py-1 bg-red-50 text-red-700 rounded-full hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {s.chatgptButton}
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() => setText(p.originalSample)}
        disabled={loading}
        className="text-xs px-3 py-1 bg-green-50 text-green-700 rounded-full hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {p.originalButton}
      </button>
      <button
        onClick={() => setText(p.copiedSample)}
        disabled={loading}
        className="text-xs px-3 py-1 bg-amber-50 text-amber-700 rounded-full hover:bg-amber-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {p.copiedButton}
      </button>
    </>
  )

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[var(--accent)]" />
          <span className="text-gray-800 font-semibold">{s.testNow}</span>
        </div>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{s.free}</span>
      </div>

      {/* Mode toggle */}
      <div className="mb-4">
        <DetectionModeToggle mode={mode} onModeChange={handleModeChange} disabled={loading} />
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={s.placeholder}
        disabled={loading}
        className={`w-full h-32 p-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        maxLength={2000}
      />

      <div className="flex items-center gap-2 mt-3 flex-wrap">
        <span className="text-xs text-gray-400">{s.tryLabel}</span>
        {sampleButtons}
      </div>

      {loading && (
        <div className="mt-3 p-3 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl flex items-center gap-3">
          <Loader2 className="w-4 h-4 text-[var(--accent)] animate-spin" />
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-800">{s.analyzingLabel}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.analyzingDetail}</div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <span className="text-gray-400 text-sm">{text.length}/2000</span>
        <button
          onClick={analyze}
          disabled={loading || text.trim().length < 50}
          className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-orange-500/20"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {s.analyzingLabel.split('...')[0]}...
            </>
          ) : mode === 'plagiarism' ? (
            <>
              <Search className="w-4 h-4" />
              {p.analyzePlagiarism}
            </>
          ) : (
            s.scanner
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {/* Scarcity counter — remaining scans */}
      {remaining !== null && remaining >= 0 && !loading && (
        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-center">
          <span className="text-sm font-medium text-amber-700">
            {s.scansRemaining.replace('{count}', String(remaining))}
          </span>
        </div>
      )}

      {/* AI Detection Result */}
      {result && result.mode === 'ai' && (
        <>
          <div className="mt-4 p-5 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-4xl font-bold ${getScoreColor(result.score)}`}>
                  {result.score}%
                </div>
                <div className="text-gray-600 text-sm mt-1 font-medium">
                  {result.verdict}
                </div>
              </div>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${result.isAI ? 'bg-red-100' : 'bg-green-100'}`}>
                {result.isAI ? (
                  <span className="text-2xl">🤖</span>
                ) : (
                  <span className="text-2xl">👤</span>
                )}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
              <a
                href="/signup"
                className="inline-block w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-orange-500/20"
              >
                {s.ctaButton}
              </a>
              <p className="text-xs text-gray-500 mt-2">
                {s.ctaTeaser}
              </p>
            </div>
          </div>

          {/* Blurred preview of full report */}
          <div className="mt-4 relative">
            <div className="blur-[4px] pointer-events-none select-none p-5 bg-white border border-gray-200 rounded-xl">
              <p className="text-sm font-semibold text-gray-700 mb-2">{r.breakdown}</p>
              <div className="flex h-3 rounded-full overflow-hidden bg-gray-100">
                <div className="bg-red-400" style={{ width: '65%' }} />
                <div className="bg-amber-400" style={{ width: '15%' }} />
                <div className="bg-emerald-400" style={{ width: '20%' }} />
              </div>
              <div className="flex gap-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  {r.aiGenerated} 65%
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  {r.aiAssisted} 15%
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  {r.humanWritten} 20%
                </span>
              </div>
              <div className="mt-4 space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                      <div className="h-2 bg-gray-100 rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 rounded-xl">
              <Lock className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm font-semibold text-gray-700 text-center px-4">
                {s.unlockLabel}
              </p>
              <a
                href="/signup"
                className="mt-2 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
              >
                {s.ctaButton}
              </a>
            </div>
          </div>
        </>
      )}

      {/* Plagiarism Detection Result */}
      {result && result.mode === 'plagiarism' && (
        <>
          <div className="mt-4 p-5 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-4xl font-bold ${result.score > 20 ? 'text-red-500' : result.score > 5 ? 'text-yellow-500' : 'text-green-500'}`}>
                  {result.score}%
                </div>
                <div className="text-gray-600 text-sm mt-1 font-medium">
                  {result.plagiarism_detected ? p.plagiarismFound : p.noPlagiarism}
                </div>
                {result.source_count > 0 && (
                  <div className="text-gray-500 text-xs mt-1">
                    {p.sourcesFound.replace('{count}', String(result.source_count))}
                  </div>
                )}
              </div>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${result.plagiarism_detected ? 'bg-red-100' : 'bg-green-100'}`}>
                <span className="text-2xl">{result.plagiarism_detected ? '🔍' : '✅'}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
              <a
                href="/signup"
                className="inline-block w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-orange-500/20"
              >
                {s.ctaButton}
              </a>
              <p className="text-xs text-gray-500 mt-2">
                {s.ctaTeaser}
              </p>
            </div>
          </div>

          {/* Blurred preview of sources */}
          <div className="mt-4 relative">
            <div className="blur-[4px] pointer-events-none select-none p-5 bg-white border border-gray-200 rounded-xl">
              <p className="text-sm font-semibold text-gray-700 mb-3">{p.sourceLabel}</p>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 rounded-lg border border-gray-100">
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-2 bg-amber-100 rounded w-full mb-1" />
                    <div className="h-2 bg-gray-100 rounded w-1/4" />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 rounded-xl">
              <Lock className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm font-semibold text-gray-700 text-center px-4">
                {s.unlockLabel}
              </p>
              <a
                href="/signup"
                className="mt-2 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
              >
                {s.ctaButton}
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
