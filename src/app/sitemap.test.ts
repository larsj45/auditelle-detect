import assert from 'node:assert/strict'
import test from 'node:test'
import sitemap from './sitemap.ts'

test('lists both editorial landings with reciprocal hreflang alternates', () => {
  const entries = sitemap()
  const fr = entries.find((entry) => entry.url === 'https://auditelle.fr/revues-scientifiques')
  const sv = entries.find((entry) => entry.url === 'https://auditelle.fr/vetenskapliga-tidskrifter')
  assert.ok(fr && sv)
  for (const entry of [fr, sv]) {
    assert.deepEqual(entry.alternates?.languages, {
      fr: 'https://auditelle.fr/revues-scientifiques',
      sv: 'https://auditelle.fr/vetenskapliga-tidskrifter',
    })
  }
})

test('keeps the editorial privacy notices out of the sitemap', () => {
  const urls = sitemap().map((entry) => entry.url)
  assert.ok(!urls.some((url) => url.includes('/integritet') || url.includes('/confidentialite')))
})
