import assert from 'node:assert/strict'
import test from 'node:test'
import { MAX_DECISION_NOTE, validateDecision } from './decision.ts'

test('accepts the four editorial decisions with an optional trimmed note', () => {
  assert.deepEqual(validateDecision({ decision: 'clarify', note: '  Fråga författaren om avsnitt 3.  ' }), {
    ok: true,
    decision: 'clarify',
    note: 'Fråga författaren om avsnitt 3.',
  })
  assert.deepEqual(validateDecision({ decision: 'proceed' }), { ok: true, decision: 'proceed', note: null })
  assert.deepEqual(validateDecision({ decision: 'no_action', note: '   ' }), { ok: true, decision: 'no_action', note: null })
})

test('rejects unknown decisions and oversized notes', () => {
  assert.deepEqual(validateDecision({ decision: 'reject_ai' }), { ok: false, errorCode: 'invalid_decision' })
  assert.deepEqual(validateDecision(null), { ok: false, errorCode: 'invalid_decision' })
  assert.deepEqual(validateDecision({ decision: 'proceed', note: 'x'.repeat(MAX_DECISION_NOTE + 1) }), {
    ok: false,
    errorCode: 'note_too_long',
  })
})
