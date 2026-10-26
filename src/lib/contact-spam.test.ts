import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  MAX_TOKEN_AGE_MS,
  MIN_FILL_MS,
  checkContactToken,
  contactTokenSecret,
  detectSpam,
  issueContactToken,
} from './contact-spam.ts'

const secret = 'test-secret'
const t0 = 1_790_000_000_000

test('a token signed long enough ago is accepted', () => {
  const token = issueContactToken(secret, t0)
  assert.equal(checkContactToken(token, secret, t0 + MIN_FILL_MS), 'ok')
  assert.equal(checkContactToken(token, secret, t0 + 60_000), 'ok')
})

test('missing, forged or malformed tokens are refused', () => {
  const token = issueContactToken(secret, t0)
  assert.equal(checkContactToken(undefined, secret, t0 + 10_000), 'missing')
  assert.equal(checkContactToken('', secret, t0 + 10_000), 'missing')
  assert.equal(checkContactToken(token, 'other-secret', t0 + 10_000), 'invalid')
  assert.equal(checkContactToken(`${t0 - 50_000}.${token.split('.')[1]}`, secret, t0 + 10_000), 'invalid')
  assert.equal(checkContactToken('abc.def', secret, t0), 'invalid')
  assert.equal(checkContactToken(`${token}.x`, secret, t0 + 10_000), 'invalid')
  assert.equal(checkContactToken(42, secret, t0), 'missing')
})

test('a form sent within 3 seconds is too fast, a day-old token has expired', () => {
  const token = issueContactToken(secret, t0)
  assert.equal(checkContactToken(token, secret, t0 + MIN_FILL_MS - 1), 'too_fast')
  assert.equal(checkContactToken(token, secret, t0 + MAX_TOKEN_AGE_MS + 1), 'expired')
})

const real = {
  name: 'Jeanne Martin',
  email: 'jeanne.martin@neoma-bs.fr',
  organization: 'NEOMA Business School',
  message: 'Bonjour, nous aimerions un diagnostic. Voir https://www.neoma-bs.fr/fr pour le contexte.',
}

test('real messages pass, including ones with ordinary links', () => {
  assert.equal(detectSpam(real), null)
  assert.equal(detectSpam({ ...real, email: 'j.martin@gmail.com', organization: '' }), null)
})

test('the 26/10 spam submission is caught', () => {
  const spam = {
    name: 'détection IA',
    email: 'nicolas.hocquet6617@northmail.web.id',
    organization: '',
    message:
      "Pouvez-vous indiquer le tarif par document, comme exposé ici : https://sharez.online/fr/sw/auditelle",
  }
  assert.equal(detectSpam(spam), 'blocked_email_domain')
  assert.equal(detectSpam({ ...spam, email: 'n.hocquet@gmail.com' }), 'blocked_link')
  assert.equal(
    detectSpam({ ...real, message: 'voir sharez.online/fr/sw/auditelle' }),
    'blocked_link',
  )
  assert.equal(detectSpam({ ...real, message: 'see http://cdn.SHAREZ.online/x' }), 'blocked_link')
})

test('disposable sender domains and URLs in the name are caught', () => {
  assert.equal(detectSpam({ ...real, email: 'x@mailinator.com' }), 'blocked_email_domain')
  assert.equal(detectSpam({ ...real, email: 'x@sub.northmail.web.id' }), 'blocked_email_domain')
  assert.equal(detectSpam({ ...real, name: 'Win big https://casino.example' }), 'url_in_name')
  assert.equal(detectSpam({ ...real, email: 'x@notmailinator.com' }), null)
})

test('the token secret falls back to secrets every deployment has', () => {
  assert.equal(contactTokenSecret({ CONTACT_FORM_SECRET: 'a', SUPABASE_SERVICE_ROLE_KEY: 'b' }), 'a')
  assert.equal(contactTokenSecret({ SUPABASE_SERVICE_ROLE_KEY: 'b' }), 'b')
  assert.equal(contactTokenSecret({}), null)
})
