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

test('moves the editorial pages from auditelle.fr to lettrine.eu permanently', () => {
  for (const pathname of [
    '/vetenskapliga-tidskrifter',
    '/vetenskapliga-tidskrifter/integritet',
    '/revues-scientifiques',
    '/revues-scientifiques/confidentialite',
    '/riviste-scientifiche',
    '/riviste-scientifiche/privacy',
    '/revistas-cientificas',
    '/revistas-cientificas/privacidade',
    '/journals',
    '/journals/privacy',
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
  for (const pathname of ['/', '/tester', '/dashboard', '/signup', '/professeurs', '/vetenskapliga', '/etablissements/x']) {
    assert.equal(resolveEditorialRedirect({ host: 'auditelle.fr', pathname }), null)
  }
})

test('serves editorial pages and host-aware files on lettrine.eu', () => {
  for (const pathname of [
    '/vetenskapliga-tidskrifter',
    '/revues-scientifiques/confidentialite',
    '/revistas-cientificas',
    '/journals/privacy',
    '/robots.txt',
    '/sitemap.xml',
  ]) {
    assert.equal(resolveEditorialRedirect({ host: 'lettrine.eu', pathname }), null)
  }
})

test('sends education and account pages on lettrine.eu back to auditelle.fr', () => {
  assert.deepEqual(resolveEditorialRedirect({ host: 'lettrine.eu', pathname: '/login' }), {
    location: 'https://www.auditelle.fr/login',
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
  assert.equal(preferredEditorialPath('it-IT,it;q=0.9,en;q=0.8'), '/riviste-scientifiche')
  assert.equal(preferredEditorialPath('en;q=0.9,it;q=0.8'), '/riviste-scientifiche')
  assert.equal(preferredEditorialPath('en-US,en;q=0.9'), '/journals')
  assert.equal(preferredEditorialPath('en-GB,en;q=0.9,sv;q=0.8'), '/vetenskapliga-tidskrifter')
  assert.equal(preferredEditorialPath('pt-PT,pt;q=0.9,en;q=0.8'), '/revistas-cientificas')
  assert.equal(preferredEditorialPath('en;q=0.9,pt-BR;q=0.8'), '/revistas-cientificas')
  assert.equal(preferredEditorialPath('pl-PL,pl;q=0.9,en;q=0.8'), '/journals')
  assert.equal(preferredEditorialPath('cs-CZ,cs;q=0.9'), '/journals')
  assert.equal(preferredEditorialPath('sk'), '/journals')
  assert.equal(preferredEditorialPath('de-DE,de;q=0.9'), '/vetenskapliga-tidskrifter')
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

test('moves the school landings from auditelle.fr to lettrine.eu, keeping the query', () => {
  for (const pathname of ['/etablissements', '/istituzioni']) {
    for (const host of ['auditelle.fr', 'www.auditelle.fr']) {
      assert.deepEqual(resolveEditorialRedirect({ host, pathname, search: '?utm=x' }), {
        location: `https://lettrine.eu${pathname}?utm=x`,
        status: 308,
      })
    }
  }
})

test('serves the school landings on lettrine.eu', () => {
  for (const pathname of ['/etablissements', '/istituzioni']) {
    assert.equal(resolveEditorialRedirect({ host: 'lettrine.eu', pathname }), null)
  }
  assert.deepEqual(resolveEditorialRedirect({ host: 'www.lettrine.eu', pathname: '/istituzioni' }), {
    location: 'https://lettrine.eu/istituzioni',
    status: 308,
  })
})

test('keeps the app on auditelle.fr when reached through lettrine.eu', () => {
  for (const pathname of ['/signup', '/login', '/contact', '/tester', '/dashboard', '/professeurs']) {
    assert.deepEqual(resolveEditorialRedirect({ host: 'lettrine.eu', pathname, search: '?subject=Pilote' }), {
      location: `https://www.auditelle.fr${pathname}?subject=Pilote`,
      status: 308,
    })
  }
})
