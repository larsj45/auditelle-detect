import assert from 'node:assert/strict'
import test from 'node:test'
import { sanitizeAiResult, sanitizeSimilarity, signalLevel, summarizeReport } from './report.ts'

const pangram = {
  ai_likelihood: 0.42,
  ai_assisted_likelihood: 0.08,
  human_likelihood: 0.5,
  headline: 'Mixed',
  dashboard_link: 'https://pangram.example/public/123',
  sentences: [
    { text: 'Detta är mänsklig text om lexikografi.', ai_likelihood: 0.02, start_index: 0, end_index: 38 },
    { text: 'Språkmodeller kan effektivisera arbetet med varianter.', ai_likelihood: 0.81, start_index: 39, end_index: 92 },
    { text: 'Resultatet bör valideras av specialister.', ai_likelihood: 0.45, start_index: 93, end_index: 134 },
  ],
}

test('classifies signal levels', () => {
  assert.equal(signalLevel(0.9), 'high')
  assert.equal(signalLevel(0.7), 'high')
  assert.equal(signalLevel(0.3), 'medium')
  assert.equal(signalLevel(0.29), 'low')
})

test('keeps text only for flagged segments and drops the public dashboard link', () => {
  const stored = sanitizeAiResult(pangram)
  assert.equal(stored.segments.length, 3)
  assert.equal(stored.segments[0].text, null)
  assert.equal(stored.segments[0].words, 6)
  assert.equal(stored.segments[1].level, 'high')
  assert.match(stored.segments[1].text ?? '', /Språkmodeller/)
  assert.equal(stored.segments[2].level, 'medium')
  assert.equal(JSON.stringify(stored).includes('dashboard'), false)
  assert.equal(JSON.stringify(stored).includes('mänsklig'), false)
})

test('normalises similarity and caps stored sources', () => {
  const stored = sanitizeSimilarity({
    plagiarism_detected: true,
    percent_plagiarized: 18.04,
    plagiarized_content: [{ source_url: 'https://example.org/a', matched_text: 'utdrag', similarity_score: 0.9 }],
  })
  assert.deepEqual(stored, { percent: 18, sources: [{ url: 'https://example.org/a', excerpt: 'utdrag', score: 0.9 }] })
})

test('summarises a report for the overview', () => {
  const summary = summarizeReport(sanitizeAiResult(pangram), { percent: 18, sources: [{ url: 'u', excerpt: 'e', score: 1 }] })
  assert.deepEqual(summary, {
    percentAi: 42,
    percentAssisted: 8,
    percentHuman: 50,
    highSegments: 1,
    mediumSegments: 1,
    flaggedWords: 11,
    similarityPercent: 18,
    sourceCount: 1,
  })
  assert.equal(summarizeReport(null, null).similarityPercent, null)
})
