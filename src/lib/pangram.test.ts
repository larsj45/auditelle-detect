import { afterEach, test } from 'node:test'
import assert from 'node:assert/strict'
import { detectAI } from './pangram.ts'

const originalFetch = globalThis.fetch
const originalApiKey = process.env.PANGRAM_API_KEY

afterEach(() => {
  globalThis.fetch = originalFetch
  if (originalApiKey === undefined) {
    delete process.env.PANGRAM_API_KEY
  } else {
    process.env.PANGRAM_API_KEY = originalApiKey
  }
})

test('detectAI creates and polls a Pangram 4 task', async () => {
  process.env.PANGRAM_API_KEY = 'test-api-key'
  const requests: Array<{ url: string; init?: RequestInit }> = []

  globalThis.fetch = async (input, init) => {
    const url = input.toString()
    requests.push({ url, init })

    if (requests.length === 1) {
      return Response.json({ task_id: 'task/with spaces' })
    }

    if (requests.length === 2) {
      return Response.json({
        task_id: 'task/with spaces',
        stage: 'STAGE_PREPROCESSING',
      })
    }

    return Response.json({
      stage: 'STAGE_SUCCESS',
      text: 'AI-assisted passage. Human passage.',
      version: '4.0',
      headline: 'AI Assisted',
      prediction: 'Mixed authorship',
      prediction_short: 'Mixed',
      fraction_ai: 0,
      fraction_ai_assisted: 0.6,
      fraction_human: 0.4,
      windows: [{
        text: 'AI-assisted passage.',
        label: 'AI-Assisted',
        ai_assistance_score: 0.55,
        confidence: 'High',
        start_index: 0,
        end_index: 20,
        word_count: 2,
        token_length: 5,
        is_humanized: true,
        humanizer_score: 0.91,
      }],
    })
  }

  const result = await detectAI('AI-assisted passage. Human passage.')

  assert.equal(requests[0].url, 'https://text.external-api.pangram.com/task')
  assert.equal(requests[0].init?.method, 'POST')
  assert.equal(new Headers(requests[0].init?.headers).get('x-api-key'), 'test-api-key')
  assert.deepEqual(JSON.parse(requests[0].init?.body as string), {
    text: 'AI-assisted passage. Human passage.',
    model: 'pangram-4',
    public_dashboard_link: true,
  })
  assert.equal(
    requests[1].url,
    'https://text.external-api.pangram.com/task/task%2Fwith%20spaces',
  )
  assert.equal(new Headers(requests[1].init?.headers).get('x-api-key'), 'test-api-key')
  assert.equal(requests[2].url, requests[1].url)
  assert.equal(result.ai_likelihood, 0)
  assert.equal(result.ai_assisted_likelihood, 0.6)
  assert.equal(result.human_likelihood, 0.4)
  assert.equal(result.prediction_short, 'Mixed')
  assert.deepEqual(result.sentences?.[0], {
    text: 'AI-assisted passage.',
    ai_likelihood: 0.55,
    label: 'AI-Assisted',
    confidence: 'High',
    start_index: 0,
    end_index: 20,
    is_humanized: true,
    humanizer_score: 0.91,
  })
})

test('detectAI reports a failed async task without polling forever', async () => {
  process.env.PANGRAM_API_KEY = 'test-api-key'
  let requestCount = 0

  globalThis.fetch = async () => {
    requestCount += 1
    if (requestCount === 1) {
      return Response.json({ task_id: 'failed-task' })
    }
    return Response.json({
      stage: 'STAGE_FAILED',
      headline: 'preprocessing: Input text contains no valid text',
    })
  }

  await assert.rejects(
    detectAI('Text that the provider rejects'),
    /Pangram API error: task failed - preprocessing/,
  )
  assert.equal(requestCount, 2)
})

test('detectAI preserves provider status codes in sanitized errors', async () => {
  process.env.PANGRAM_API_KEY = 'test-api-key'
  globalThis.fetch = async () => new Response(
    JSON.stringify({ detail: 'Model is not enabled' }),
    { status: 403, statusText: 'Forbidden' },
  )

  await assert.rejects(
    detectAI('Text for a disabled model selector'),
    /Pangram API error: 403 - .*Model is not enabled/,
  )
})
