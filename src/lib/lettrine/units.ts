// Lettrine billing units: 1 unit covers up to 1,000 words analysed by both
// engines (AI signals and similarity). Re-analysing a text costs again.

export const WORDS_PER_UNIT = 1000
export const MIN_WORDS = 50
export const MAX_WORDS = 20000

export function countWords(text: string): number {
  const matches = text.trim().match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu)
  return matches ? matches.length : 0
}

export function unitsForWords(words: number): number {
  if (!Number.isFinite(words) || words <= 0) return 0
  return Math.ceil(words / WORDS_PER_UNIT)
}

export type AnalysisSizeCheck =
  | { ok: true; words: number; units: number }
  | { ok: false; reason: 'too_short' | 'too_long'; words: number }

export function checkAnalysisSize(text: string): AnalysisSizeCheck {
  const words = countWords(text)
  if (words < MIN_WORDS) return { ok: false, reason: 'too_short', words }
  if (words > MAX_WORDS) return { ok: false, reason: 'too_long', words }
  return { ok: true, words, units: unitsForWords(words) }
}
