import { test } from 'node:test'
import assert from 'node:assert/strict'
import { productHomePath, productAnchor, copyrightHolder } from './company-home.ts'
import auditelleFr from '../../config/auditelle-fr.ts'
import novalearnUk from '../../config/novalearn-uk.ts'

test('single-product brands keep the landing on "/"', () => {
  assert.equal(productHomePath({}), '/')
  assert.equal(productAnchor({}, 'pricing'), '/#pricing')
  assert.equal(productHomePath(novalearnUk), '/')
})

test('auditelle-fr moves the Lettrine landing to /lettrine', () => {
  assert.equal(productHomePath(auditelleFr), '/lettrine')
  assert.equal(productAnchor(auditelleFr, 'features'), '/lettrine#features')
})

test('copyright holder falls back to the brand name', () => {
  assert.equal(copyrightHolder({ name: 'X', strings: { footer: {} } }), 'X')
  assert.equal(copyrightHolder(auditelleFr), 'Auditelle SASU')
})

test('auditelle-fr company home lists Lettrine and VigiExam, without "holding"', () => {
  const home = auditelleFr.companyHome
  assert.ok(home)
  assert.deepEqual(home.products.map((p) => p.name), ['Lettrine', 'VigiExam'])
  assert.equal(home.products[1].primary.href, 'https://www.vigiexam.eu')
  assert.doesNotMatch(JSON.stringify(home), /holding/i)
})

test('auditelle-fr pricing has no Université/Enterprise plans and no competitor table', () => {
  const names = auditelleFr.plans.homepage.map((p) => p.name)
  assert.ok(!names.includes('Université'))
  assert.ok(!names.includes('Enterprise'))
  assert.ok(auditelleFr.plans.homepage.some((p) => p.href === '/etablissements'))
  assert.equal(auditelleFr.strings.comparison, undefined)
})

test('auditelle-fr landing copy does not claim EU hosting nor unverified testimonials', () => {
  const landing = JSON.stringify({
    hero: auditelleFr.strings.hero,
    pricing: auditelleFr.strings.pricing,
    testimonials: auditelleFr.strings.testimonials,
    seo: auditelleFr.seo,
  })
  assert.doesNotMatch(landing, /h[eé]berg[eé]es dans l/i)
  assert.doesNotMatch(landing, /faux positif/i)
})
