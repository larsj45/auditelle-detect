import assert from 'node:assert/strict'
import test from 'node:test'
import { editorialCopy } from './editorialCopy.ts'
import { lettrineLegalCopy } from './lettrineLegalCopy.ts'

for (const locale of ['fr', 'sv'] as const) {
  test(`${locale} legal pages live under the landing and stay marked as drafts`, () => {
    for (const document of ['terms', 'dpa'] as const) {
      const copy = lettrineLegalCopy[locale][document]
      assert.ok(copy.path.startsWith(`${editorialCopy[locale].path}/`))
      assert.equal(copy.htmlLang, editorialCopy[locale].htmlLang)
      assert.ok(copy.draftNotice, 'draft banner must stay until legal review and Pangram SCCs')
      const text = copy.sections.flatMap((s) => s.paragraphs).join(' ')
      assert.match(text, /945 117 000/)
      assert.match(text, /128 rue La Boétie/)
    }
  })

  test(`${locale} terms state the business rules shown in the app`, () => {
    const text = lettrineLegalCopy[locale].terms.sections.flatMap((s) => s.paragraphs).join(' ')
    assert.match(text, /1 000/)
    assert.match(text, /10 /)
    assert.match(text, /24/)
    assert.match(text, /Stripe/)
  })

  test(`${locale} DPA lists Pangram as a US subprocessor and the 48-hour breach notice`, () => {
    const text = lettrineLegalCopy[locale].dpa.sections.flatMap((s) => s.paragraphs).join(' ')
    assert.match(text, /Pangram Labs/)
    assert.match(text, /48/)
    assert.match(text, /180/)
    assert.match(text, /28/)
  })
}
