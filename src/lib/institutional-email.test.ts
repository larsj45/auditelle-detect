import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  isInstitutionalEmail,
  emailDomain,
} from './institutional-email.ts'

test('emailDomain extracts and lowercases the domain', () => {
  assert.equal(emailDomain('Jean.Dupont@Univ-Lyon1.FR'), 'univ-lyon1.fr')
  assert.equal(emailDomain('  a@b.com  '), 'b.com')
})

test('emailDomain rejects malformed addresses', () => {
  assert.equal(emailDomain('no-at-symbol'), null)
  assert.equal(emailDomain('a@nodot'), null)
  assert.equal(emailDomain('@nope.com'), null)
  assert.equal(emailDomain('a@'), null)
  assert.equal(emailDomain('a@.com'), null)
  assert.equal(emailDomain('a@b.com.'), null)
  // @ts-expect-error testing runtime guard
  assert.equal(emailDomain(undefined), null)
})

test('generic/consumer providers are NOT institutional', () => {
  for (const e of [
    'prof@gmail.com',
    'prof@outlook.com',
    'prof@outlook.fr',
    'prof@yahoo.fr',
    'prof@proton.me',
    'prof@protonmail.com',
    'prof@icloud.com',
    'prof@hotmail.com',
    'prof@free.fr',
    'prof@orange.fr',
    'prof@laposte.net',
  ]) {
    assert.equal(isInstitutionalEmail(e), false, `${e} should be blocked`)
  }
})

test('default allowlist domains are institutional', () => {
  for (const e of [
    'p@universite-paris-saclay.fr',
    'p@escp.eu',
    'p@sciencespo.fr',
    'p@unistra.fr',
    'p@sorbonne-universite.fr',
    'p@polytechnique.edu',
  ]) {
    assert.equal(isInstitutionalEmail(e), true, `${e} should be institutional`)
  }
})

test('subdomains of allowlisted domains are institutional', () => {
  assert.equal(isInstitutionalEmail('p@eco.universite-paris-saclay.fr'), true)
  assert.equal(isInstitutionalEmail('p@etu.sciencespo.fr'), true)
})

test('French academic patterns are institutional', () => {
  assert.equal(isInstitutionalEmail('p@univ-lyon1.fr'), true)
  assert.equal(isInstitutionalEmail('p@univ-amu.fr'), true)
  assert.equal(isInstitutionalEmail('p@ac-paris.fr'), true)
  assert.equal(isInstitutionalEmail('p@ac-versailles.fr'), true)
  assert.equal(isInstitutionalEmail('p@toulouse-univ.fr'), true)
  assert.equal(isInstitutionalEmail('p@anyschool.edu'), true)
})

test('plain .fr companies are NOT institutional by default', () => {
  assert.equal(isInstitutionalEmail('p@boulangerie.fr'), false)
  assert.equal(isInstitutionalEmail('p@startup.fr'), false)
})

test('config-supplied allowlist extends the defaults', () => {
  assert.equal(
    isInstitutionalEmail('p@mon-ecole.fr', { allowlist: ['mon-ecole.fr'] }),
    true,
  )
  // Without the option it stays non-institutional
  assert.equal(isInstitutionalEmail('p@mon-ecole.fr'), false)
})

test('config-supplied allowlist is case-insensitive', () => {
  assert.equal(
    isInstitutionalEmail('P@MON-ECOLE.FR', { allowlist: ['Mon-Ecole.fr'] }),
    true,
  )
})

test('blocklist always wins over allowlist patterns', () => {
  // gmail can never be institutional even if someone allowlists it
  assert.equal(
    isInstitutionalEmail('p@gmail.com', { allowlist: ['gmail.com'] }),
    false,
  )
})
