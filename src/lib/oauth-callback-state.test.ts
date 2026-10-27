import { test } from 'node:test'
import assert from 'node:assert/strict'
import { oauthCallbackState, oauthSuccessPath } from './oauth-callback-state.ts'

test('implicit OAuth requires a persisted session and rejects provider errors', () => {
  assert.equal(oauthCallbackState('https://www.auditelle.fr/auth/callback#access_token=secret', true, false), 'success')
  assert.equal(oauthCallbackState('https://www.auditelle.fr/auth/callback#access_token=secret', false, false), 'error')
  assert.equal(oauthCallbackState('https://www.auditelle.fr/auth/callback#error=access_denied', true, false), 'error')
  assert.equal(oauthCallbackState('https://www.auditelle.fr/auth/callback?error=auth', true, false), 'error')
})

test('callback does not trust redirect URL or put analysis text into query', () => {
  assert.equal(oauthCallbackState('https://www.auditelle.fr/auth/callback?next=https://evil.example/?text=private', true, false), 'success')
  assert.equal(oauthSuccessPath, '/dashboard')
  assert.ok(!oauthSuccessPath.includes('?'))
})
