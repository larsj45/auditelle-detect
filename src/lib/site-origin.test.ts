import assert from 'node:assert/strict'
import test from 'node:test'
import { siteOrigin } from './site-origin.ts'

test('uses the explicit site URL when the brand serves from www', () => {
  assert.equal(siteOrigin({ domain: 'auditelle.fr', siteUrl: 'https://www.auditelle.fr' }), 'https://www.auditelle.fr')
})

test('falls back to the bare domain for other brands', () => {
  assert.equal(siteOrigin({ domain: 'novalearn.co.uk' }), 'https://novalearn.co.uk')
})
