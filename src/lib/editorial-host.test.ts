import assert from 'node:assert/strict'
import test from 'node:test'
import {
  hostKind,
  preferredEditorialPath,
  resolveEditorialRedirect,
} from './editorial-host.ts'

test('classifies hosts, ignoring case and port', () => {
  assert.equal(hostKind('lettrine.eu'), 'editorial')
  assert.equal(hostKind('WWW.Lettrine.eu:443'), 'editorial')
  assert.equal(hostKind('www.auditelle.fr'), 'legacy')
  assert.equal(hostKind('auditelle-detect-abc.vercel.app'), 'other')
  assert.equal(hostKind(null), 'other')
})

test('moves the four editorial pages from auditelle.fr to lettrine.eu permanently', () => {
  for (const pathname of [
    '/vetenskapliga-tidskrifter',
    '/vetenskapliga-tidskrifter/integritet',
    '/revues-scientifiques',
    '/revues-scientifiques/confidentialite',
  ]) {
    for (const host of ['auditelle.fr', 'www.auditelle.fr']) {
      assert.deepEqual(resolveEditorialRedirect({ host, pathname, search: '?utm=x' }), {
        location: `https://lettrine.eu${pathname}?utm=x`,
        status: 308,
      })
    }
  }
})

test('leaves the rest of auditelle.fr untouched', () => {
  for (const pathname of ['/', '/tester', '/dashboard', '/etablissements', '/vetenskapliga']) {
    assert.equal(resolveEditorialRedirect({ host: 'auditelle.fr', pathname }), null)
  }
})

test('serves editorial pages and host-aware files on lettrine.eu', () => {
  for (const pathname of [
    '/vetenskapliga-tidskrifter',
    '/revues-scientifiques/confidentialite',
    '/robots.txt',
    '/sitemap.xml',
  ]) {
    assert.equal(resolveEditorialRedirect({ host: 'lettrine.eu', pathname }), null)
  }
})

test('sends education and account pages on lettrine.eu back to auditelle.fr', () => {
  assert.deepEqual(resolveEditorialRedirect({ host: 'lettrine.eu', pathname: '/login' }), {
    location: 'https://auditelle.fr/login',
    status: 308,
  })
})

test('canonicalises www.lettrine.eu to the apex', () => {
  assert.deepEqual(
    resolveEditorialRedirect({ host: 'www.lettrine.eu', pathname: '/revues-scientifiques' }),
    { location: 'https://lettrine.eu/revues-scientifiques', status: 308 }
  )
})

test('picks the landing language for the lettrine.eu root with a temporary redirect', () => {
  assert.deepEqual(
    resolveEditorialRedirect({ host: 'lettrine.eu', pathname: '/', acceptLanguage: 'fr-FR,fr;q=0.9,en;q=0.8' }),
    { location: 'https://lettrine.eu/revues-scientifiques', status: 307 }
  )
  assert.equal(preferredEditorialPath('da-DK,da;q=0.9,en;q=0.8'), '/vetenskapliga-tidskrifter')
  assert.equal(preferredEditorialPath('sv-SE'), '/vetenskapliga-tidskrifter')
  assert.equal(preferredEditorialPath('en-US,en;q=0.9'), '/vetenskapliga-tidskrifter')
  assert.equal(preferredEditorialPath('en;q=0.9,fr;q=0.8'), '/revues-scientifiques')
  assert.equal(preferredEditorialPath('fr;q=0,sv;q=0.5'), '/vetenskapliga-tidskrifter')
  assert.equal(preferredEditorialPath(null), '/vetenskapliga-tidskrifter')
})

test('does nothing on preview and local hosts', () => {
  assert.equal(
    resolveEditorialRedirect({ host: 'localhost:3461', pathname: '/vetenskapliga-tidskrifter' }),
    null
  )
})
