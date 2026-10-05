import type { PangramResult, PlagiarismResult } from '../pangram.ts'

// What Lettrine stores and shows for an analysis. The full manuscript is never
// stored: Pangram returns the whole text split into windows, so we keep the
// text only for windows that carry a signal and drop it everywhere else.

export type SignalLevel = 'high' | 'medium' | 'low'

export const HIGH_SIGNAL = 0.7
export const MEDIUM_SIGNAL = 0.3

export interface StoredSegment {
  level: SignalLevel
  score: number
  start: number | null
  end: number | null
  words: number
  text: string | null
}

export interface StoredAiResult {
  fraction_ai: number
  fraction_ai_assisted: number
  fraction_human: number
  segments: StoredSegment[]
}

export interface StoredSimilarityResult {
  percent: number
  sources: Array<{ url: string; excerpt: string; score: number }>
}

export function signalLevel(score: number): SignalLevel {
  if (score >= HIGH_SIGNAL) return 'high'
  if (score >= MEDIUM_SIGNAL) return 'medium'
  return 'low'
}

const clamp01 = (value: number) => (Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0)

function wordsIn(text: string): number {
  const matches = text.trim().match(/[\p{L}\p{N}]+/gu)
  return matches ? matches.length : 0
}

export function sanitizeAiResult(result: PangramResult): StoredAiResult {
  const segments = (result.sentences ?? []).map((sentence): StoredSegment => {
    const score = clamp01(sentence.ai_likelihood)
    const level = signalLevel(score)
    return {
      level,
      score: Math.round(score * 1000) / 1000,
      start: Number.isFinite(sentence.start_index) ? (sentence.start_index as number) : null,
      end: Number.isFinite(sentence.end_index) ? (sentence.end_index as number) : null,
      words: wordsIn(sentence.text ?? ''),
      text: level === 'low' ? null : (sentence.text ?? '').slice(0, 4000),
    }
  })
  return {
    fraction_ai: clamp01(result.ai_likelihood),
    fraction_ai_assisted: clamp01(result.ai_assisted_likelihood),
    fraction_human: clamp01(result.human_likelihood),
    segments,
  }
}

export function sanitizeSimilarity(result: PlagiarismResult): StoredSimilarityResult {
  const percent = Number.isFinite(result.percent_plagiarized) ? Math.min(100, Math.max(0, result.percent_plagiarized)) : 0
  return {
    percent: Math.round(percent * 10) / 10,
    sources: (result.plagiarized_content ?? []).slice(0, 50).map((match) => ({
      url: String(match.source_url ?? '').slice(0, 2000),
      excerpt: String(match.matched_text ?? '').slice(0, 1000),
      score: Number.isFinite(match.similarity_score) ? match.similarity_score : 0,
    })),
  }
}

export interface ReportSummary {
  percentAi: number
  percentAssisted: number
  percentHuman: number
  highSegments: number
  mediumSegments: number
  flaggedWords: number
  similarityPercent: number | null
  sourceCount: number
}

export function summarizeReport(ai: StoredAiResult | null, similarity: StoredSimilarityResult | null): ReportSummary {
  const flagged = ai?.segments.filter((segment) => segment.level !== 'low') ?? []
  return {
    percentAi: Math.round((ai?.fraction_ai ?? 0) * 100),
    percentAssisted: Math.round((ai?.fraction_ai_assisted ?? 0) * 100),
    percentHuman: Math.round((ai?.fraction_human ?? 0) * 100),
    highSegments: flagged.filter((segment) => segment.level === 'high').length,
    mediumSegments: flagged.filter((segment) => segment.level === 'medium').length,
    flaggedWords: flagged.reduce((sum, segment) => sum + segment.words, 0),
    similarityPercent: similarity ? similarity.percent : null,
    sourceCount: similarity?.sources.length ?? 0,
  }
}
