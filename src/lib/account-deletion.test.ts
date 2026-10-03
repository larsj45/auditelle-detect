import { test } from 'node:test'
import assert from 'node:assert/strict'
import { confirmationMatches, isBillableSubscription } from './account-deletion.ts'

test('confirmationMatches requires the account email, ignoring case and spaces', () => {
  assert.equal(confirmationMatches(' Jeanne@Univ.fr ', 'jeanne@univ.fr'), true)
  assert.equal(confirmationMatches('autre@univ.fr', 'jeanne@univ.fr'), false)
  assert.equal(confirmationMatches('', 'jeanne@univ.fr'), false)
  assert.equal(confirmationMatches(undefined, 'jeanne@univ.fr'), false)
  assert.equal(confirmationMatches('jeanne@univ.fr', undefined), false)
})

test('isBillableSubscription cancels anything that can still charge', () => {
  for (const status of ['active', 'trialing', 'past_due', 'unpaid', 'incomplete', 'paused']) {
    assert.equal(isBillableSubscription(status), true, status)
  }
  for (const status of ['canceled', 'incomplete_expired']) {
    assert.equal(isBillableSubscription(status), false, status)
  }
})
