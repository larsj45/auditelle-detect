import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isLikelyBot, parseContactSubmission } from './contact.ts'

const subjects = ['Diagnostic gratuit établissement (20 min)', 'Autre']
const valid = {
  name: ' Jeanne Martin ',
  email: 'jeanne.martin@univ-exemple.fr',
  organization: '',
  subject: 'Autre',
  message: 'Bonjour',
}

test('parseContactSubmission accepts and trims a valid submission', () => {
  assert.deepEqual(parseContactSubmission(valid, subjects), { ...valid, name: 'Jeanne Martin' })
})

test('parseContactSubmission rejects bad email, unknown subject and oversize message', () => {
  assert.equal(parseContactSubmission({ ...valid, email: 'not-an-email' }, subjects), null)
  assert.equal(parseContactSubmission({ ...valid, subject: 'Injected' }, subjects), null)
  assert.equal(parseContactSubmission({ ...valid, message: 'x'.repeat(5001) }, subjects), null)
  assert.equal(parseContactSubmission({ ...valid, name: 42 }, subjects), null)
  assert.equal(parseContactSubmission(null, subjects), null)
})

test('isLikelyBot flags a filled honeypot only', () => {
  assert.equal(isLikelyBot({ ...valid, website: 'http://spam' }), true)
  assert.equal(isLikelyBot({ ...valid, website: '' }), false)
  assert.equal(isLikelyBot(valid), false)
})
