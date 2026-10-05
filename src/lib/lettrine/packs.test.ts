import assert from 'node:assert/strict'
import test from 'node:test'
import { UNIT_PACKS, formatEuros, getUnitPack, parseLettrineCheckout, pricePerUnitCents } from './packs.ts'

test('defines the three decided packs with decreasing unit prices', () => {
  assert.deepEqual(UNIT_PACKS.map((pack) => [pack.units, pack.amountCents]), [[50, 59000], [200, 199000], [500, 399000]])
  const perUnit = UNIT_PACKS.map(pricePerUnitCents)
  assert.deepEqual(perUnit, [1180, 995, 798])
  assert.ok(perUnit[0] > perUnit[1] && perUnit[1] > perUnit[2])
})

test('resolves packs by id only', () => {
  assert.equal(getUnitPack('p200')?.units, 200)
  assert.equal(getUnitPack('p999'), null)
  assert.equal(getUnitPack(200), null)
})

test('formats euro amounts per locale', () => {
  assert.match(formatEuros(59000, 'sv'), /590\s?€/)
  assert.match(formatEuros(199000, 'fr'), /1\s?990\s?€/)
})

test('reads webhook metadata only when units match the pack', () => {
  const org = '11111111-1111-1111-1111-111111111111'
  assert.deepEqual(parseLettrineCheckout({ type: 'lettrine_units', org_id: org, units: '50', pack: 'p50' }), { orgId: org, units: 50 })
  assert.equal(parseLettrineCheckout({ type: 'lettrine_units', org_id: org, units: '5000', pack: 'p50' }), null)
  assert.equal(parseLettrineCheckout({ type: 'credits', org_id: org, units: '50', pack: 'p50' }), null)
  assert.equal(parseLettrineCheckout({ type: 'lettrine_units', org_id: '', units: '50', pack: 'p50' }), null)
  assert.equal(parseLettrineCheckout(null), null)
})
