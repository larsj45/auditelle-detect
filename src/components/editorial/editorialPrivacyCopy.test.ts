import assert from 'node:assert/strict'
import test from 'node:test'
import { editorialCopy } from './editorialCopy.ts'
import { editorialPrivacyCopy } from './editorialPrivacyCopy.ts'

for (const locale of ['fr', 'sv'] as const) {
  test(`${locale} privacy notice is linked from the landing and stays under its route`, () => {
    const privacy = editorialPrivacyCopy[locale]
    const landing = editorialCopy[locale]
    assert.equal(landing.privacyNoticePath, privacy.path)
    assert.equal(privacy.backPath, landing.path)
    assert.ok(privacy.path.startsWith(`${landing.path}/`))
    assert.equal(privacy.htmlLang, landing.htmlLang)
  })

  test(`${locale} privacy notice names controller, contact, retention and processors`, () => {
    const text = editorialPrivacyCopy[locale].sections
      .flatMap((section) => section.paragraphs)
      .join(' ')
    assert.match(text, /Auditelle SASU/)
    assert.match(text, /SIREN 945117000/)
    assert.match(text, /contact@auditelle\.fr/)
    assert.match(text, /12/)
    assert.match(text, /Vercel/)
    assert.match(text, /Resend/)
    assert.match(text, /6\.1/)
  })
}

test('Swedish notice points to the Swedish supervisory authority', () => {
  const text = editorialPrivacyCopy.sv.sections.flatMap((s) => s.paragraphs).join(' ')
  assert.match(text, /Integritetsskyddsmyndigheten/)
})

test('notices cover the self-service processors and retention', () => {
  for (const locale of ['fr', 'sv'] as const) {
    const text = editorialPrivacyCopy[locale].sections.flatMap((s) => s.paragraphs).join(' ')
    for (const processor of ['Supabase', 'Stripe', 'Pangram Labs', 'Plausible']) assert.match(text, new RegExp(processor))
    assert.match(text, /180/)
    assert.match(text, /10/)
  }
})
