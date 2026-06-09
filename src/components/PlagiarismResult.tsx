'use client'

import { useEffect, useRef, useState } from 'react'
import { ExternalLink, ChevronDown, ChevronUp, Globe } from 'lucide-react'
import { useConfig } from '@/components/ConfigProvider'

interface PlagiarismResultProps {
  percentPlagiarized: number    // 0-100 from Pangram API
  plagiarismDetected: boolean
  analyzedText?: string
  sources: Array<{
    source_url: string
    matched_text: string
    similarity_score: number    // 0-1 from API
  }>
}

function getScoreColor(score: number) {
  if (score < 10) return { color: '#10b981', bg: 'bg-emerald-50' }
  if (score < 30) return { color: '#f59e0b', bg: 'bg-amber-50' }
  return { color: '#ef4444', bg: 'bg-red-50' }
}

function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function SourceFavicon({ url }: { url: string }) {
  const [failed, setFailed] = useState(false)
  const hostname = getHostname(url)

  if (!hostname || failed) {
    return (
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        <Globe className="h-4 w-4" />
      </span>
    )
  }

  return (
    <img
      src={`https://icons.duckduckgo.com/ip3/${hostname}.ico`}
      alt=""
      className="h-8 w-8 flex-shrink-0 rounded-full border border-gray-100 bg-white object-contain p-1"
      onError={() => setFailed(true)}
    />
  )
}

interface HighlightRange {
  start: number
  end: number
  sourceIndex: number
}

function buildHighlightRanges(text: string, sources: PlagiarismResultProps['sources']) {
  const lowerText = text.toLowerCase()
  const ranges: HighlightRange[] = []

  sources.forEach((source, sourceIndex) => {
    const needle = source.matched_text.trim()
    if (needle.length < 12) return

    const start = lowerText.indexOf(needle.toLowerCase())
    if (start === -1) return

    const end = start + needle.length
    const overlaps = ranges.some((range) => start < range.end && end > range.start)
    if (!overlaps) {
      ranges.push({ start, end, sourceIndex })
    }
  })

  return ranges.sort((a, b) => a.start - b.start)
}

function HighlightedText({ text, sources, title }: {
  text: string
  sources: PlagiarismResultProps['sources']
  title: string
}) {
  const ranges = buildHighlightRanges(text, sources)
  if (ranges.length === 0) return null

  const segments: Array<{ text: string; sourceIndex?: number }> = []
  let cursor = 0

  ranges.forEach((range) => {
    if (range.start > cursor) {
      segments.push({ text: text.slice(cursor, range.start) })
    }
    segments.push({ text: text.slice(range.start, range.end), sourceIndex: range.sourceIndex })
    cursor = range.end
  })

  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor) })
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5">
      <h4 className="mb-3 text-sm font-semibold text-[var(--navy)]">{title}</h4>
      <p className="max-h-80 overflow-y-auto whitespace-pre-wrap text-sm leading-7 text-gray-700">
        {segments.map((segment, index) => (
          segment.sourceIndex === undefined ? (
            <span key={index}>{segment.text}</span>
          ) : (
            <mark
              key={index}
              className="rounded bg-amber-200 px-1 py-0.5 font-medium text-amber-950"
              title={sources[segment.sourceIndex]?.source_url}
            >
              {segment.text}
            </mark>
          )
        ))}
      </p>
    </div>
  )
}

function ScoreRing({ score, label }: { score: number; label: string }) {
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
        <span className="text-xs text-gray-500">{label}</span>
      </div>
    </div>
  )
}

function SourceItem({ source, strings }: {
  source: { source_url: string; matched_text: string; similarity_score: number }
  strings: { sourceLabel: string; matchedText: string; similarity: string }
}) {
  const [expanded, setExpanded] = useState(false)
  const similarity = Number.isFinite(source.similarity_score)
    ? Math.round(source.similarity_score * 100)
    : null
  const similarityForColor = similarity ?? 0
  const { color } = getScoreColor(similarityForColor)

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <SourceFavicon url={source.source_url} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${color}20`, color }}>
                {similarity === null ? '—' : `${similarity}%`} {strings.similarity}
              </span>
            </div>
            <p className="text-sm font-medium text-[var(--navy)] mt-1 truncate">{getHostname(source.source_url)}</p>
            <p className="text-xs text-gray-400 mt-0.5 truncate">{source.source_url}</p>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
      </button>
      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="mt-3">
            <p className="text-xs font-medium text-gray-500 mb-1">{strings.matchedText}</p>
            <p className="text-sm text-gray-700 bg-amber-50 border-l-2 border-amber-400 pl-3 py-2 rounded-r-lg italic">
              &ldquo;{source.matched_text}&rdquo;
            </p>
          </div>
          <div className="mt-3">
            <p className="text-xs font-medium text-gray-500 mb-1">{strings.sourceLabel}</p>
            <a
              href={source.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
            >
              {source.source_url}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default function PlagiarismResult({ percentPlagiarized, plagiarismDetected, analyzedText, sources }: PlagiarismResultProps) {
  const config = useConfig()
  const s = config.strings.plagiarism
  const score = Number.isFinite(percentPlagiarized) ? Math.round(percentPlagiarized) : 0
  const { bg } = getScoreColor(score)
  const scoreLabel = config.htmlLang === 'pt'
    ? 'Plágio'
    : config.htmlLang === 'es'
    ? 'Plagio'
    : config.htmlLang === 'en'
    ? 'Plagiarism'
    : 'Plagiat'

  const label = plagiarismDetected ? s.plagiarismFound : s.noPlagiarism

  return (
    <div className="space-y-6">
      <div className={`${bg} rounded-xl p-8 flex flex-col sm:flex-row items-center gap-8`}>
        <ScoreRing score={score} label={scoreLabel} />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-[var(--navy)]">{label}</h3>
          <p className="text-gray-600 mt-1">
            {s.percentPlagiarized.replace('{score}', String(score))}
          </p>
          {sources.length > 0 && (
            <p className="text-gray-500 mt-2 text-sm">
              {s.sourcesFound.replace('{count}', String(sources.length))}
            </p>
          )}
        </div>
      </div>

      {analyzedText && sources.length > 0 && (
        <HighlightedText
          text={analyzedText}
          sources={sources}
          title={s.highlightedPassages}
        />
      )}

      {sources.length > 0 && (
        <div className="space-y-3">
          {sources.map((source, i) => (
            <SourceItem
              key={i}
              source={source}
              strings={{ sourceLabel: s.sourceLabel, matchedText: s.matchedText, similarity: s.similarity }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
