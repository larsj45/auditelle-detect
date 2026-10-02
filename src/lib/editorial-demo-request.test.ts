import assert from 'node:assert/strict'
import test from 'node:test'
import { validateEditorialDemoRequest } from './editorial-demo-request.ts'

const validRequest = {
  version: 1,
  locale: 'fr',
  name: 'Marie Dupont',
  email: 'marie@revue-exemple.fr',
  organization: 'Revue Exemple',
  role: 'Rédactrice en chef',
  journalCount: 'one',
  volume: '300_600',
  plan: 'journal',
  message: 'Nous souhaitons évaluer le flux avec notre comité.',
}

test('accepts and normalizes a complete French institutional request', () => {
  const result = validateEditorialDemoRequest({
    ...validRequest,
    email: '  Marie@Revue-Exemple.FR  ',
  })

  assert.equal(result.success, true)
  if (result.success && !result.isSpam) {
    assert.equal(result.data.email, 'marie@revue-exemple.fr')
    assert.equal(result.data.locale, 'fr')
    assert.equal(result.data.plan, 'journal')
  }
})

test('accepts the same semantic contract for Swedish requests', () => {
  const result = validateEditorialDemoRequest({
    ...validRequest,
    locale: 'sv',
    name: 'Anna Lind',
    email: 'anna@vetenskaplig-tidskrift.se',
    organization: 'Vetenskaplig Tidskrift',
    role: 'Chefredaktör',
  })

  assert.equal(result.success, true)
  if (result.success && !result.isSpam) {
    assert.equal(result.data.locale, 'sv')
    assert.equal(result.data.journalCount, 'one')
  }
})

test('rejects generic French and Swedish consumer email providers', () => {
  for (const email of ['marie@gmail.com', 'anna@telia.com']) {
    assert.deepEqual(
      validateEditorialDemoRequest({ ...validRequest, email }),
      { success: false, errorCode: 'professional_email_required' }
    )
  }
})

test('rejects localized labels in place of semantic values', () => {
  assert.deepEqual(
    validateEditorialDemoRequest({
      ...validRequest,
      volume: '300 à 600',
    }),
    { success: false, errorCode: 'invalid_request' }
  )
})

test('rejects unsupported versions and locales', () => {
  assert.deepEqual(
    validateEditorialDemoRequest({ ...validRequest, version: 2 }),
    { success: false, errorCode: 'invalid_request' }
  )
  assert.deepEqual(
    validateEditorialDemoRequest({ ...validRequest, locale: 'da' }),
    { success: false, errorCode: 'invalid_request' }
  )
})

test('silently accepts honeypot submissions without returning data', () => {
  assert.deepEqual(
    validateEditorialDemoRequest({
      ...validRequest,
      website: 'https://spam.example',
    }),
    { success: true, data: null, isSpam: true }
  )
})

test('limits freeform context length', () => {
  assert.deepEqual(
    validateEditorialDemoRequest({
      ...validRequest,
      message: 'a'.repeat(2001),
    }),
    { success: false, errorCode: 'invalid_request' }
  )
})
