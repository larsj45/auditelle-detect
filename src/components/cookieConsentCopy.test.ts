import assert from 'node:assert/strict'
import test from 'node:test'
import {
  getCookieConsentCopy,
  englishEditorialCookieConsent,
  italianEditorialCookieConsent,
  portugueseEditorialCookieConsent,
  swedishEditorialCookieConsent,
} from './cookieConsentCopy.ts'

const frenchCopy = {
  message: 'Message français',
  accept: 'Accepter',
  decline: 'Refuser',
}

test('uses Swedish consent copy only on the Swedish editorial route', () => {
  assert.strictEqual(
    getCookieConsentCopy('/vetenskapliga-tidskrifter', frenchCopy),
    swedishEditorialCookieConsent
  )
  assert.strictEqual(
    getCookieConsentCopy('/vetenskapliga-tidskrifter/preview', frenchCopy),
    swedishEditorialCookieConsent
  )
})

test('preserves the reseller copy on French and non-editorial routes', () => {
  for (const pathname of ['/', '/revues-scientifiques', '/etablissements']) {
    assert.strictEqual(getCookieConsentCopy(pathname, frenchCopy), frenchCopy)
  }
})

test('uses Italian consent copy only on the Italian routes', () => {
  for (const pathname of ['/riviste-scientifiche', '/riviste-scientifiche/privacy', '/istituzioni']) {
    assert.strictEqual(getCookieConsentCopy(pathname, frenchCopy), italianEditorialCookieConsent)
  }
  assert.strictEqual(getCookieConsentCopy('/riviste', frenchCopy), frenchCopy)
})

test('uses Portuguese and English consent copy on their journal routes', () => {
  for (const pathname of ['/revistas-cientificas', '/revistas-cientificas/privacidade']) {
    assert.strictEqual(getCookieConsentCopy(pathname, frenchCopy), portugueseEditorialCookieConsent)
  }
  for (const pathname of ['/journals', '/journals/privacy']) {
    assert.strictEqual(getCookieConsentCopy(pathname, frenchCopy), englishEditorialCookieConsent)
  }
  assert.strictEqual(getCookieConsentCopy('/journalism', frenchCopy), frenchCopy)
})
