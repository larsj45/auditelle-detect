import assert from 'node:assert/strict'
import test from 'node:test'
import { editorialSitemap, legacySitemap, sitemapForHost } from './sitemap-entries.ts'

test('lists the editorial landings on lettrine.eu with reciprocal hreflang alternates', () => {
  const entries = editorialSitemap().filter((entry) => !/etablissements|istituzioni/.test(entry.url))
  assert.deepEqual(entries.map((entry) => entry.url), [
    'https://lettrine.eu/revues-scientifiques',
    'https://lettrine.eu/vetenskapliga-tidskrifter',
    'https://lettrine.eu/riviste-scientifiche',
    'https://lettrine.eu/revistas-cientificas',
    'https://lettrine.eu/journals',
  ])
  for (const entry of entries) {
    assert.deepEqual(entry.alternates?.languages, {
      fr: 'https://lettrine.eu/revues-scientifiques',
      sv: 'https://lettrine.eu/vetenskapliga-tidskrifter',
      it: 'https://lettrine.eu/riviste-scientifiche',
      pt: 'https://lettrine.eu/revistas-cientificas',
      en: 'https://lettrine.eu/journals',
    })
  }
})

test('removes the editorial pages from the auditelle.fr sitemap', () => {
  const urls = legacySitemap().map((entry) => entry.url)
  assert.ok(urls.includes('https://www.auditelle.fr'))
  assert.ok(!urls.some((url) => url.includes('/vetenskapliga-tidskrifter') || url.includes('/revues-scientifiques')))
})

test('lists the school landings on lettrine.eu only, with fr/it alternates', () => {
  const editorialUrls = editorialSitemap().map((entry) => entry.url)
  assert.ok(editorialUrls.includes('https://lettrine.eu/etablissements'))
  assert.ok(editorialUrls.includes('https://lettrine.eu/istituzioni'))
  const legacyUrls = legacySitemap().map((entry) => entry.url)
  assert.ok(!legacyUrls.some((url) => url.includes('/etablissements') || url.includes('/istituzioni')))
  const istituzioni = editorialSitemap().find((entry) => entry.url === 'https://lettrine.eu/istituzioni')
  assert.deepEqual(istituzioni?.alternates?.languages, {
    fr: 'https://lettrine.eu/etablissements',
    it: 'https://lettrine.eu/istituzioni',
  })
})

test('keeps the editorial privacy notices out of both sitemaps', () => {
  const urls = [...editorialSitemap(), ...legacySitemap()].map((entry) => entry.url)
  assert.ok(!urls.some((url) => url.includes('/integritet') || url.includes('/confidentialite') || url.includes('/privacidade') || url.endsWith('/privacy')))
})

test('chooses the sitemap by host kind', () => {
  assert.equal(sitemapForHost('editorial').length, 7)
  assert.equal(sitemapForHost('other').length, legacySitemap().length)
})
