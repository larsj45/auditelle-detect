import assert from 'node:assert/strict'
import test from 'node:test'
import { editorialSitemap, legacySitemap, sitemapForHost } from './sitemap-entries.ts'

test('lists both editorial landings on lettrine.eu with reciprocal hreflang alternates', () => {
  const entries = editorialSitemap()
  assert.deepEqual(entries.map((entry) => entry.url), [
    'https://lettrine.eu/revues-scientifiques',
    'https://lettrine.eu/vetenskapliga-tidskrifter',
  ])
  for (const entry of entries) {
    assert.deepEqual(entry.alternates?.languages, {
      fr: 'https://lettrine.eu/revues-scientifiques',
      sv: 'https://lettrine.eu/vetenskapliga-tidskrifter',
    })
  }
})

test('removes the editorial pages from the auditelle.fr sitemap', () => {
  const urls = legacySitemap().map((entry) => entry.url)
  assert.ok(urls.includes('https://auditelle.fr'))
  assert.ok(!urls.some((url) => url.includes('/vetenskapliga-tidskrifter') || url.includes('/revues-scientifiques')))
})

test('keeps the editorial privacy notices out of both sitemaps', () => {
  const urls = [...editorialSitemap(), ...legacySitemap()].map((entry) => entry.url)
  assert.ok(!urls.some((url) => url.includes('/integritet') || url.includes('/confidentialite')))
})

test('chooses the sitemap by host kind', () => {
  assert.equal(sitemapForHost('editorial').length, 2)
  assert.equal(sitemapForHost('other').length, legacySitemap().length)
})
