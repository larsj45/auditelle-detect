import assert from 'node:assert/strict'
import test from 'node:test'
import { editorialCopy } from './editorialCopy.ts'

test('preserves the approved French route, brand, CTA, and commercial wording', () => {
  assert.equal(editorialCopy.fr.path, '/revues-scientifiques')
  assert.equal(editorialCopy.fr.brand.name, 'Lettrine')
  assert.equal(editorialCopy.fr.brand.product, 'Éditorial')
  assert.equal(editorialCopy.fr.common.demoCta, 'Demander un compte démo')
  assert.equal(editorialCopy.fr.pricing.plans[0].price, 'Tarif à valider')
  assert.match(editorialCopy.fr.form.successMessage, /Aucun rendez-vous/)
})

test('keeps the Swedish page under the Lettrine Editorial brand', () => {
  assert.equal(editorialCopy.sv.path, '/vetenskapliga-tidskrifter')
  assert.equal(editorialCopy.sv.brand.name, 'Lettrine')
  assert.equal(editorialCopy.sv.brand.product, 'Editorial')
  assert.equal(editorialCopy.sv.htmlLang, 'sv')
  assert.match(editorialCopy.sv.form.successMessage, /Inget möte krävs/)
})

test('uses the native-reviewed Swedish report sentence', () => {
  assert.equal(
    editorialCopy.sv.reportModal.paragraphs[0].after,
    ', förutsatt att resultatet valideras filologiskt av ämnesspecialister.'
  )
  assert.equal(
    editorialCopy.fr.reportModal.paragraphs[0].after,
    ", sous réserve d'une validation philologique menée par des spécialistes."
  )
})

test('uses the same semantic qualification values in both locales', () => {
  assert.deepEqual(
    editorialCopy.fr.form.volumeOptions.map((option) => option.value),
    editorialCopy.sv.form.volumeOptions.map((option) => option.value)
  )
  assert.deepEqual(
    editorialCopy.fr.form.planOptions.map((option) => option.value),
    editorialCopy.sv.form.planOptions.map((option) => option.value)
  )
})

test('keeps the company only where it is the legal entity, never as the product name', () => {
  for (const locale of ['fr', 'sv'] as const) {
    const text = JSON.stringify(editorialCopy[locale])
    assert.ok(!/Verify/.test(text))
    assert.ok(!/Auditelle(?! SASU)/.test(text))
    assert.match(editorialCopy[locale].footer.legal, /Auditelle SASU/)
  }
})

test('uses feminine agreement for Lettrine in French', () => {
  const text = JSON.stringify(editorialCopy.fr)
  assert.match(text, /Lettrine est conçue/)
  assert.match(text, /Lettrine décide-t-elle/)
})
