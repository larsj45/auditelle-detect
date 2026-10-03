import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isWaiverMissing, waiverMetadata } from './checkout-waiver.ts'

const waiver = { label: 'label', required: 'required', version: '2026-10-02' }

test('isWaiverMissing only blocks brands that configure the waiver', () => {
  assert.equal(isWaiverMissing(undefined, {}), false)
  assert.equal(isWaiverMissing(waiver, { withdrawalWaiverAccepted: true }), false)
  assert.equal(isWaiverMissing(waiver, { withdrawalWaiverAccepted: 'true' }), true)
  assert.equal(isWaiverMissing(waiver, {}), true)
  assert.equal(isWaiverMissing(waiver, null), true)
})

test('waiverMetadata records version and acceptance time', () => {
  const at = new Date('2026-10-02T12:00:00.000Z')
  assert.deepEqual(waiverMetadata(waiver, at), {
    withdrawal_waiver_version: '2026-10-02',
    withdrawal_waiver_accepted_at: '2026-10-02T12:00:00.000Z',
  })
  assert.deepEqual(waiverMetadata(undefined, at), {})
})
