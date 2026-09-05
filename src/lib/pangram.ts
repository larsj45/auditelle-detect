const PANGRAM_API_URL = 'https://text.external-api.pangram.com/task'
const PANGRAM_PLAGIARISM_URL = 'https://plagiarism.api.pangram.com'
const PANGRAM_MODEL = process.env.PANGRAM_MODEL?.trim() || 'pangram-4'
const PANGRAM_POLL_INTERVAL_MS = 500
const PANGRAM_TASK_TIMEOUT_MS = 30_000
const PANGRAM_MOCK_ENABLED = process.env.PANGRAM_MOCK_RESPONSES === '1'

export interface PangramResult {
  ai_likelihood: number
  ai_assisted_likelihood: number
  human_likelihood: number
  headline: string
  prediction?: string
  prediction_short?: string
  dashboard_link?: string
  sentences?: Array<{
    text: string
    ai_likelihood: number
    label?: string
    confidence?: string
    start_index?: number
    end_index?: number
    is_humanized?: boolean
    humanizer_score?: number
  }>
}

export interface PlagiarismMatch {
  source_url: string
  matched_text: string
  similarity_score: number
}

export interface PlagiarismResult {
  plagiarism_detected: boolean
  percent_plagiarized: number
  plagiarized_content: PlagiarismMatch[]
}

function asFiniteNumber(value: unknown): number | null {
  const numberValue = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(numberValue) ? numberValue : null
}

function normalizePercent(value: unknown): number {
  const numberValue = asFiniteNumber(value)
  if (numberValue === null) return 0
  return numberValue <= 1 ? numberValue * 100 : numberValue
}

function normalizeRatio(value: unknown): number {
  const numberValue = asFiniteNumber(value)
  if (numberValue === null) return Number.NaN
  return numberValue > 1 ? numberValue / 100 : numberValue
}

interface PangramTaskResponse {
  task_id?: string
  stage?: string
  text?: string
  version?: string
  headline?: string
  prediction?: string
  prediction_short?: string
  fraction_ai?: number
  fraction_ai_assisted?: number
  fraction_human?: number
  num_ai_segments?: number
  num_ai_assisted_segments?: number
  num_human_segments?: number
  dashboard_link?: string
  windows?: Array<{
    text: string
    label: string
    ai_assistance_score: number
    confidence: string
    start_index: number
    end_index: number
    word_count: number
    token_length: number
    is_humanized?: boolean
    humanizer_score?: number
  }>
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function providerErrorDetail(response: Response): Promise<string> {
  const detail = (await response.text()).replace(/\s+/g, ' ').trim()
  return detail.slice(0, 500) || response.statusText || 'Unknown provider error'
}

async function assertPangramResponse(response: Response): Promise<void> {
  if (!response.ok) {
    const detail = await providerErrorDetail(response)
    throw new Error(`Pangram API error: ${response.status} - ${detail}`)
  }
}

function completedTaskResult(data: PangramTaskResponse): PangramResult {
  const fractionAI = asFiniteNumber(data.fraction_ai)
  const fractionAIAssisted = asFiniteNumber(data.fraction_ai_assisted)
  const fractionHuman = asFiniteNumber(data.fraction_human)

  if (
    data.stage !== 'STAGE_SUCCESS' ||
    fractionAI === null ||
    fractionAIAssisted === null ||
    fractionHuman === null ||
    typeof data.headline !== 'string'
  ) {
    throw new Error('Pangram API error: invalid completed task response')
  }

  return {
    ai_likelihood: normalizeRatio(fractionAI),
    ai_assisted_likelihood: normalizeRatio(fractionAIAssisted),
    human_likelihood: normalizeRatio(fractionHuman),
    headline: data.headline,
    prediction: data.prediction,
    prediction_short: data.prediction_short,
    dashboard_link: data.dashboard_link,
    sentences: data.windows?.map(window => ({
      text: window.text,
      ai_likelihood: normalizeRatio(window.ai_assistance_score),
      label: window.label,
      confidence: window.confidence,
      start_index: window.start_index,
      end_index: window.end_index,
      is_humanized: window.is_humanized,
      humanizer_score: window.humanizer_score === undefined
        ? undefined
        : normalizeRatio(window.humanizer_score),
    })),
  }
}

function mockAIResult(text: string): PangramResult {
  const lowerText = text.toLowerCase()
  const aiMarkers = ['as an ai', 'in conclusion', 'moreover', 'furthermore', 'delve', 'tapestry']
  const markerHits = aiMarkers.filter(marker => lowerText.includes(marker)).length
  const aiLikelihood = Math.min(0.92, 0.22 + markerHits * 0.16 + Math.min(text.length / 20000, 0.2))
  const aiAssistedLikelihood = Math.min(0.35, aiLikelihood * 0.25)
  const humanLikelihood = Math.max(0.03, 1 - aiLikelihood - aiAssistedLikelihood)

  return {
    ai_likelihood: aiLikelihood,
    ai_assisted_likelihood: aiAssistedLikelihood,
    human_likelihood: humanLikelihood,
    headline: aiLikelihood >= 0.5 ? 'Mock result: possibly AI-generated' : 'Mock result: probably human-written',
    prediction: aiLikelihood >= 0.5 ? 'AI-generated text' : 'Human-written text',
    prediction_short: aiLikelihood >= 0.5 ? 'AI' : 'Human',
    dashboard_link: undefined,
    sentences: [{
      text: text.slice(0, 240),
      ai_likelihood: aiLikelihood,
      label: aiLikelihood >= 0.5 ? 'ai' : 'human',
      confidence: 'mock',
    }],
  }
}

function mockPlagiarismResult(): PlagiarismResult {
  return {
    plagiarism_detected: false,
    percent_plagiarized: 0,
    plagiarized_content: [],
  }
}

export async function detectAI(text: string): Promise<PangramResult> {
  if (PANGRAM_MOCK_ENABLED) {
    return mockAIResult(text)
  }

  const apiKey = process.env.PANGRAM_API_KEY
  if (!apiKey) {
    throw new Error('PANGRAM_API_KEY is not configured')
  }

  const response = await fetch(PANGRAM_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({
      text,
      model: PANGRAM_MODEL,
      public_dashboard_link: true,
    }),
  })

  await assertPangramResponse(response)

  const task: PangramTaskResponse = await response.json()
  if (!task.task_id) {
    throw new Error('Pangram API error: task creation returned no task_id')
  }

  const deadline = Date.now() + PANGRAM_TASK_TIMEOUT_MS
  const taskUrl = `${PANGRAM_API_URL}/${encodeURIComponent(task.task_id)}`

  while (Date.now() < deadline) {
    const pollResponse = await fetch(taskUrl, {
      headers: {
        'x-api-key': apiKey,
      },
      cache: 'no-store',
    })

    await assertPangramResponse(pollResponse)
    const data: PangramTaskResponse = await pollResponse.json()

    if (data.stage === 'STAGE_SUCCESS') {
      return completedTaskResult(data)
    }

    if (data.stage === 'STAGE_FAILED') {
      const detail = [data.headline, data.prediction]
        .filter((value): value is string => typeof value === 'string' && value.length > 0)
        .join(' - ')
        .slice(0, 500)
      throw new Error(`Pangram API error: task failed${detail ? ` - ${detail}` : ''}`)
    }

    await sleep(PANGRAM_POLL_INTERVAL_MS)
  }

  throw new Error(`Pangram API error: task timed out after ${PANGRAM_TASK_TIMEOUT_MS}ms`)
}

export async function detectPlagiarism(text: string): Promise<PlagiarismResult> {
  if (PANGRAM_MOCK_ENABLED) {
    return mockPlagiarismResult()
  }

  const apiKey = process.env.PANGRAM_API_KEY
  if (!apiKey) {
    throw new Error('PANGRAM_API_KEY is not configured')
  }

  const response = await fetch(PANGRAM_PLAGIARISM_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({ text }),
  })

  if (!response.ok) {
    const detail = await providerErrorDetail(response)
    throw new Error(`Pangram Plagiarism API error: ${response.status} - ${detail}`)
  }

  const data = await response.json()

  return {
    plagiarism_detected: data.plagiarism_detected ?? data.is_plagiarized ?? false,
    percent_plagiarized: normalizePercent(data.percent_plagiarized ?? data.plagiarism_percentage ?? data.similarity_score),
    plagiarized_content: (data.plagiarized_content ?? data.sources ?? data.matches ?? data.results ?? []).map((item: Record<string, unknown>) => ({
      source_url: (item.source_url ?? item.url ?? item.source ?? '') as string,
      matched_text: (item.matched_text ?? item.text ?? item.snippet ?? '') as string,
      similarity_score: normalizeRatio(item.similarity_score ?? item.similarity ?? item.score),
    })),
  }
}
