import assert from 'node:assert/strict'
import test from 'node:test'
import {
  getCookieConsentCopy,
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
