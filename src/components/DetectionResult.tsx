'use client'

import { useEffect, useRef } from 'react'
import { ExternalLink } from 'lucide-react'
import { useConfig } from '@/components/ConfigProvider'

interface DetectionResultProps {
  score: number
  headline?: string
  aiAssistedScore?: number
  humanScore?: number
  dashboardLink?: string
  sentences?: Array<{
    text: string
    ai_likelihood: number
    label?: string
    confidence?: string
  }>
}

function getScoreColor(score: number) {
  if (score < 30) return { color: '#10b981', bg: 'bg-emerald-50' }
  if (score < 60) return { color: '#f59e0b', bg: 'bg-amber-50' }
  return { color: '#ef4444', bg: 'bg-red-50' }
}

function ScoreRing({ score }: { score: number }) {
  const circleRef = useRef<SVGCircleElement>(null)
  const { color } = getScoreColor(score)

  useEffect(() => {
    if (circleRef.current) {
      const offset = 283 - (283 * score) / 100
      circleRef.current.style.strokeDashoffset = String(offset)
    }
  }, [score])

  return (
    <div className="relative w-40 h-40">
      <svg className="w-40 h-40 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          ref={circleRef}
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          className="score-ring"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold" style={{ color }}>{score}%</span>
        <span className="text-xs text-gray-500">Score IA</span>
      </div>
    </div>
  )
}

function BreakdownBar({ ai, aiAssisted, human, labels }: {
  ai: number
  aiAssisted: number
  human: number
  labels: { aiGenerated: string; aiAssisted: string; humanWritten: string }
}) {
  const aiPct = Math.round(ai * 100)
  const assistedPct = Math.round(aiAssisted * 100)
  const humanPct = Math.round(human * 100)

  // Don't show if there's no meaningful assisted content
  if (assistedPct === 0 && humanPct === 0) return null

  return (
    <div className="mt-4">
      {/* Stacked bar */}
      <div className="flex h-3 rounded-full overflow-hidden bg-gray-100">
        {aiPct > 0 && (
          <div
            className="bg-red-400 transition-all"
            style={{ width: `${aiPct}%` }}
            title={`${labels.aiGenerated}: ${aiPct}%`}
          />
        )}
        {assistedPct > 0 && (
          <div
            className="bg-amber-400 transition-all"
            style={{ width: `${assistedPct}%` }}
            title={`${labels.aiAssisted}: ${assistedPct}%`}
          />
        )}
        {humanPct > 0 && (
          <div
            className="bg-emerald-400 transition-all"
            style={{ width: `${humanPct}%` }}
            title={`${labels.humanWritten}: ${humanPct}%`}
          />
        )}
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
        {aiPct > 0 && (
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            {labels.aiGenerated} {aiPct}%
          </span>
        )}
        {assistedPct > 0 && (
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            {labels.aiAssisted} {assistedPct}%
          </span>
        )}
        {humanPct > 0 && (
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            {labels.humanWritten} {humanPct}%
          </span>
        )}
      </div>
    </div>
  )
}

export default function DetectionResult({ score, headline, aiAssistedScore, humanScore, dashboardLink, sentences }: DetectionResultProps) {
  const config = useConfig()
  const s = config.strings.results
  const { bg } = getScoreColor(score)

  const label = score < 30 ? s.probablyHuman : score < 60 ? s.mixed : s.probablyAI

  return (
    <div className="space-y-6">
      <div className={`${bg} rounded-xl p-8 flex flex-col sm:flex-row items-center gap-8`}>
        <ScoreRing score={score} />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-[var(--navy)]">{label}</h3>
          <p className="text-gray-600 mt-1">
            {s.aiProbability.replace('{score}', String(score))}
          </p>
          {headline && (
            <p className="text-gray-500 mt-2 text-sm">
              {s.classification} : <span className="font-semibold text-[var(--navy)]">{headline}</span>
            </p>
          )}

          {/* AI / AI-Assisted / Human breakdown */}
          {(aiAssistedScore !== undefined && humanScore !== undefined) && (
            <BreakdownBar
              ai={score / 100}
              aiAssisted={aiAssistedScore}
              human={humanScore}
              labels={{ aiGenerated: s.aiGenerated, aiAssisted: s.aiAssisted, humanWritten: s.humanWritten }}
            />
          )}

          {dashboardLink && (
            <a
              href={dashboardLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] mt-3 transition-colors"
            >
              {s.viewReport}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {sentences && sentences.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-[var(--navy)] mb-4">{s.sectionAnalysis}</h4>
          <div className="space-y-2">
            {sentences.map((sentence, i) => {
              const sentenceInfo = getScoreColor(sentence.ai_likelihood)
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg border border-gray-100"
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                    style={{ backgroundColor: sentenceInfo.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">{sentence.text}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-medium" style={{ color: sentenceInfo.color }}>
                        {s.aiPercent.replace('{score}', String(sentence.ai_likelihood))}
                      </span>
                      {sentence.label && (
                        <span className="text-xs text-gray-400">
                          {sentence.label}
                        </span>
                      )}
                      {sentence.confidence && (
                        <span className="text-xs text-gray-300">
                          ({sentence.confidence})
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
