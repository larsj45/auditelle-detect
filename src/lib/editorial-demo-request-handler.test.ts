import assert from 'node:assert/strict'
import test from 'node:test'
import {
  handleEditorialDemoRequest,
  type EditorialEmailParams,
} from './editorial-demo-request-handler.ts'

const validRequest = {
  version: 1,
  locale: 'fr',
  name: 'Marie Dupont',
  email: 'marie@revue-exemple.fr',
  organization: 'Revue Exemple',
  role: 'Rédactrice en chef',
  journalCount: 'one',
  volume: '300_600',
  plan: 'journal',
  message: 'Contexte éditorial.',
}

function dependencies(
  overrides: Partial<{
    resellerId: string
    supportEmail: string
    clientKey: string
    takeRateLimitSlot: (clientKey: string) => boolean | Promise<boolean>
    sendEmail: (params: EditorialEmailParams) => Promise<{ success: boolean }>
  }> = {}
) {
  return {
    resellerId: 'auditelle-fr',
    supportEmail: 'contact@auditelle.fr',
    clientKey: '127.0.0.1',
    takeRateLimitSlot: () => true,
    sendEmail: async () => ({ success: true }),
    ...overrides,
  }
}

test('sends the required internal email before the best-effort confirmation', async () => {
  const sent: EditorialEmailParams[] = []
  const result = await handleEditorialDemoRequest(
    validRequest,
    dependencies({
      sendEmail: async (params) => {
        sent.push(params)
        return { success: true }
      },
    })
  )

  assert.deepEqual(result, { status: 200, body: { success: true } })
  assert.equal(sent.length, 2)
  assert.equal(sent[0].to, 'contact@auditelle.fr')
  assert.equal(sent[0].replyTo, validRequest.email)
  assert.match(sent[0].subject, /^\[FR\]/)
  assert.match(sent[0].html, /Répondre directement à cet email/)
  assert.doesNotMatch(sent[0].text, /Répondre directement à cet email/)
  assert.equal(sent[1].to, validRequest.email)
  assert.equal(sent[1].replyTo, 'contact@auditelle.fr')
})

test('uses Verify Editorial and Swedish copy for Swedish requests', async () => {
  const sent: EditorialEmailParams[] = []
  const result = await handleEditorialDemoRequest(
    {
      ...validRequest,
      locale: 'sv',
      name: 'Anna Lind',
      email: 'anna@vetenskaplig-tidskrift.se',
      organization: 'Vetenskaplig Tidskrift',
      role: 'Chefredaktör',
    },
    dependencies({
      sendEmail: async (params) => {
        sent.push(params)
        return { success: true }
      },
    })
  )

  assert.equal(result.status, 200)
  assert.equal(sent[0].fromName, 'Verify Editorial')
  assert.match(sent[0].subject, /^\[SV\]/)
  assert.match(sent[0].html, /Svara direkt på detta meddelande/)
  assert.match(sent[0].text, /Svara direkt på detta meddelande/)
  assert.match(sent[1].html, /Inget möte krävs/)
})

test('rejects other reseller deployments without sending email', async () => {
  let sendCount = 0
  const result = await handleEditorialDemoRequest(
    validRequest,
    dependencies({
      resellerId: 'novalearn-uk',
      sendEmail: async () => {
        sendCount += 1
        return { success: true }
      },
    })
  )

  assert.equal(result.status, 404)
  assert.equal(sendCount, 0)
})

test('returns success for honeypot submissions without side effects', async () => {
  let sendCount = 0
  const result = await handleEditorialDemoRequest(
    { ...validRequest, website: 'https://spam.example' },
    dependencies({
      sendEmail: async () => {
        sendCount += 1
        return { success: true }
      },
    })
  )

  assert.deepEqual(result, { status: 200, body: { success: true } })
  assert.equal(sendCount, 0)
})

test('returns rate_limited before sending email', async () => {
  const result = await handleEditorialDemoRequest(
    validRequest,
    dependencies({ takeRateLimitSlot: () => false })
  )

  assert.deepEqual(result, {
    status: 429,
    body: { success: false, errorCode: 'rate_limited' },
  })
})

test('awaits an async durable rate limiter before sending email', async () => {
  let sendCount = 0
  const result = await handleEditorialDemoRequest(
    validRequest,
    dependencies({
      takeRateLimitSlot: async () => false,
      sendEmail: async () => {
        sendCount += 1
        return { success: true }
      },
    })
  )

  assert.deepEqual(result, {
    status: 429,
    body: { success: false, errorCode: 'rate_limited' },
  })
  assert.equal(sendCount, 0)
})

test('fails the request when the internal notification cannot be delivered', async () => {
  const result = await handleEditorialDemoRequest(
    validRequest,
    dependencies({ sendEmail: async () => ({ success: false }) })
  )

  assert.deepEqual(result, {
    status: 503,
    body: { success: false, errorCode: 'delivery_unavailable' },
  })
})

test('keeps a successful request when only applicant confirmation fails', async () => {
  let sendCount = 0
  const result = await handleEditorialDemoRequest(
    validRequest,
    dependencies({
      sendEmail: async () => {
        sendCount += 1
        return { success: sendCount === 1 }
      },
    })
  )

  assert.deepEqual(result, { status: 200, body: { success: true } })
  assert.equal(sendCount, 2)
})
