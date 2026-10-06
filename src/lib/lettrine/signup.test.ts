import assert from 'node:assert/strict'
import test from 'node:test'
import { confirmationUrl, validateSignup } from './signup.ts'

const valid = {
  locale: 'sv',
  name: '  Anna   Andersson ',
  email: ' Redaktion@Tidskrift.SE ',
  journal: 'Syntetisk tidskrift',
  password: 'lång-lösenord-123',
  acceptTerms: true,
}

test('accepts a professional signup and normalises fields', () => {
  const result = validateSignup(valid)
  assert.equal(result.ok, true)
  if (!result.ok) return
  assert.equal(result.data.name, 'Anna Andersson')
  assert.equal(result.data.email, 'redaktion@tidskrift.se')
  assert.equal(result.data.emailDomain, 'tidskrift.se')
})

test('rejects generic mailboxes, short passwords and missing consent', () => {
  assert.deepEqual(validateSignup({ ...valid, email: 'anna@gmail.com' }), { ok: false, errorCode: 'professional_email_required' })
  assert.deepEqual(validateSignup({ ...valid, password: 'kort' }), { ok: false, errorCode: 'weak_password' })
  assert.deepEqual(validateSignup({ ...valid, acceptTerms: 'yes' }), { ok: false, errorCode: 'terms_required' })
  assert.deepEqual(validateSignup({ ...valid, acceptTerms: undefined }), { ok: false, errorCode: 'terms_required' })
})

test('rejects malformed input', () => {
  assert.deepEqual(validateSignup(null), { ok: false, errorCode: 'invalid_request' })
  assert.deepEqual(validateSignup({ ...valid, locale: 'en' }), { ok: false, errorCode: 'invalid_request' })
  assert.deepEqual(validateSignup({ ...valid, email: 'not-an-email' }), { ok: false, errorCode: 'invalid_email' })
  assert.deepEqual(validateSignup({ ...valid, journal: ' ' }), { ok: false, errorCode: 'invalid_journal' })
  assert.deepEqual(validateSignup({ ...valid, name: 'A' }), { ok: false, errorCode: 'invalid_name' })
})

test('confirmation link stays on the app origin and carries the token hash', () => {
  const url = new URL(confirmationUrl('https://lettrine.eu', '/app/sv/confirm', 'abc123'))
  assert.equal(url.origin, 'https://lettrine.eu')
  assert.equal(url.pathname, '/app/sv/confirm')
  assert.equal(url.searchParams.get('token_hash'), 'abc123')
  assert.equal(url.searchParams.get('type'), 'signup')
})
