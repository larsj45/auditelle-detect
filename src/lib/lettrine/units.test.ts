import assert from 'node:assert/strict'
import test from 'node:test'
import { checkAnalysisSize, countWords, unitsForWords } from './units.ts'

test('counts words in Swedish and French, keeping hyphenated and elided words whole', () => {
  assert.equal(countWords('Språkmodeller kan effektivisera arbetet.'), 4)
  assert.equal(countWords("L'intégrité éditoriale, c'est-à-dire la révision."), 5)
  assert.equal(countWords('  \n  '), 0)
})

test('charges one unit per started 1,000 words', () => {
  assert.equal(unitsForWords(1), 1)
  assert.equal(unitsForWords(1000), 1)
  assert.equal(unitsForWords(1001), 2)
  assert.equal(unitsForWords(6214), 7)
  assert.equal(unitsForWords(0), 0)
  assert.equal(unitsForWords(Number.NaN), 0)
})

test('rejects texts that are too short or too long', () => {
  assert.deepEqual(checkAnalysisSize('ord '.repeat(10)), { ok: false, reason: 'too_short', words: 10 })
  const long = 'ord '.repeat(20001)
  assert.equal(checkAnalysisSize(long).ok, false)
  assert.deepEqual(checkAnalysisSize('ord '.repeat(1500)), { ok: true, words: 1500, units: 2 })
})
