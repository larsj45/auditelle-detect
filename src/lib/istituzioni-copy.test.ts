import assert from 'node:assert/strict'
import test from 'node:test'
import { ISTITUZIONI_PATH, istituzioniCopy, istituzioniMailto, istituzioniPilotMailto } from './istituzioni-copy.ts'

function allStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(allStrings)
  if (value && typeof value === 'object') return Object.values(value).flatMap(allStrings)
  return []
}

const strings = allStrings(istituzioniCopy)

test('serves the Italian institutions landing at /istituzioni', () => {
  assert.equal(ISTITUZIONI_PATH, '/istituzioni')
})

test('keeps the copy free of em dashes', () => {
  for (const text of strings) assert.ok(!text.includes('\u2014'), text)
})

test('does not claim EU hosting or processing, only EU storage', () => {
  const joined = strings.join(' ').toLowerCase()
  assert.ok(!joined.includes('ospitati'))
  assert.ok(!joined.includes("trattati nell'ue"))
  assert.ok(joined.includes("archiviati nell'ue") || joined.includes("archiviati nell'unione europea"))
  assert.ok(joined.includes('pangram labs'))
})

test('frames the result as a signal, never as proof', () => {
  const joined = strings.join(' ')
  assert.ok(joined.includes('non un verdetto'))
  assert.ok(joined.includes('non una prova'))
  assert.ok(!/\b(99|100) ?%/.test(joined))
})

test('builds encoded mailto links to the company inbox', () => {
  for (const link of [istituzioniMailto(), istituzioniPilotMailto()]) {
    assert.ok(link.startsWith('mailto:contact@auditelle.fr?subject='))
    assert.ok(!link.includes(' '))
  }
  assert.ok(decodeURIComponent(istituzioniMailto()).includes('20 analisi gratuite'))
})
