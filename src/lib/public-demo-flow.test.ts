import { test } from 'node:test'
import assert from 'node:assert/strict'
import { publicTesterHref } from './public-demo-flow.ts'

test('Auditelle public test uses the app origin without text in URL', () => {
  const href = publicTesterHref({ features: { publicDemoWithoutSignup: true }, siteUrl: 'https://www.auditelle.fr' })
  assert.equal(href, 'https://www.auditelle.fr/tester')
  assert.equal(new URL(href).search, '')
})

test('other brands preserve signup behavior', () => {
  assert.equal(publicTesterHref({ features: {}, siteUrl: 'https://elsewhere.example' }), '/signup')
})
