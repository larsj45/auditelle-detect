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
  for (const locale of ['fr', 'sv', 'it', 'pt', 'en'] as const) {
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

test('keeps the Italian page under the Lettrine Editoriale brand', () => {
  assert.equal(editorialCopy.it.path, '/riviste-scientifiche')
  assert.equal(editorialCopy.it.privacyNoticePath, '/riviste-scientifiche/privacy')
  assert.equal(editorialCopy.it.brand.name, 'Lettrine')
  assert.equal(editorialCopy.it.brand.product, 'Editoriale')
  assert.equal(editorialCopy.it.htmlLang, 'it')
  assert.equal(editorialCopy.it.openGraphLocale, 'it_IT')
  assert.equal(editorialCopy.it.pricing.plans[0].price, 'Prezzo da definire')
  assert.match(editorialCopy.it.form.successMessage, /Non è necessario alcun appuntamento/)
})

test('uses the same semantic qualification values in the Italian locale', () => {
  for (const key of ['volumeOptions', 'planOptions', 'journalCountOptions'] as const) {
    assert.deepEqual(
      editorialCopy.it.form[key].map((option) => option.value),
      editorialCopy.fr.form[key].map((option) => option.value)
    )
  }
  assert.deepEqual(
    editorialCopy.it.pricing.plans.map((plan) => plan.id),
    editorialCopy.fr.pricing.plans.map((plan) => plan.id)
  )
})

test('keeps the Italian copy free of em dashes', () => {
  assert.ok(!JSON.stringify(editorialCopy.it).includes('\u2014'))
})

test('keeps the Portuguese page in European Portuguese under the Lettrine brand', () => {
  const pt = editorialCopy.pt
  assert.equal(pt.path, '/revistas-cientificas')
  assert.equal(pt.privacyNoticePath, '/revistas-cientificas/privacidade')
  assert.equal(pt.htmlLang, 'pt-PT')
  assert.equal(pt.openGraphLocale, 'pt_PT')
  const text = JSON.stringify(pt)
  assert.match(text, /equipa/)
  assert.match(text, /contacto/)
  // Brazilian forms we do not want on the PT-PT page.
  assert.ok(!/\b(equipe|contato|registro|usuário|cadastro)\b/.test(text))
})

test('keeps the English page for multilingual European journals', () => {
  const en = editorialCopy.en
  assert.equal(en.path, '/journals')
  assert.equal(en.privacyNoticePath, '/journals/privacy')
  assert.match(en.hero.lead, /Polish, Czech, Portuguese, Italian, French/)
  assert.ok(!/\d+(\.\d+)?\s?% (accuracy|accurate)/i.test(JSON.stringify(en)))
})

test('uses the same semantic values in the PT and EN locales and no em dashes', () => {
  for (const locale of ['pt', 'en'] as const) {
    for (const key of ['volumeOptions', 'planOptions', 'journalCountOptions'] as const) {
      assert.deepEqual(
        editorialCopy[locale].form[key].map((option) => option.value),
        editorialCopy.fr.form[key].map((option) => option.value)
      )
    }
    assert.deepEqual(
      editorialCopy[locale].pricing.plans.map((plan) => plan.id),
      editorialCopy.fr.pricing.plans.map((plan) => plan.id)
    )
    assert.ok(!JSON.stringify(editorialCopy[locale]).includes('\u2014'))
  }
})
