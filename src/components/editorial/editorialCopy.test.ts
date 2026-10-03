import assert from 'node:assert/strict'
import test from 'node:test'
import { editorialCopy } from './editorialCopy.ts'

test('preserves the approved French route, brand, CTA, and commercial wording', () => {
  assert.equal(editorialCopy.fr.path, '/revues-scientifiques')
  assert.equal(editorialCopy.fr.brand.name, 'Auditelle')
  assert.equal(editorialCopy.fr.brand.product, 'Éditorial')
  assert.equal(editorialCopy.fr.common.demoCta, 'Demander un compte démo')
  assert.equal(editorialCopy.fr.pricing.plans[0].price, 'Tarif à valider')
  assert.match(editorialCopy.fr.form.successMessage, /Aucun rendez-vous/)
})

test('keeps the Swedish preview isolated under Verify Editorial', () => {
  assert.equal(editorialCopy.sv.path, '/vetenskapliga-tidskrifter')
  assert.equal(editorialCopy.sv.brand.name, 'Verify')
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
