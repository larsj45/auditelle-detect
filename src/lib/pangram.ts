const PANGRAM_API_URL = 'https://text.api.pangramlabs.com/v3'

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
  }>
}

interface PangramV3Response {
  text: string
  version: string
  headline: string
  prediction: string
  prediction_short: string
  fraction_ai: number
  fraction_ai_assisted: number
  fraction_human: number
  num_ai_segments: number
  num_ai_assisted_segments: number
  num_human_segments: number
  dashboard_link?: string
  windows: Array<{
    text: string
    label: string
    ai_assistance_score: number
    confidence: string
    start_index: number
    end_index: number
    word_count: number
    token_length: number
  }>
}

export async function detectAI(text: string): Promise<PangramResult> {
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
    body: JSON.stringify({ text, public_dashboard_link: true }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Pangram API error: ${response.status} - ${err}`)
  }

  const data: PangramV3Response = await response.json()

  return {
    ai_likelihood: data.fraction_ai,
    ai_assisted_likelihood: data.fraction_ai_assisted,
    human_likelihood: data.fraction_human,
    headline: data.headline,
    prediction: data.prediction,
    prediction_short: data.prediction_short,
    dashboard_link: data.dashboard_link,
    sentences: data.windows?.map(w => ({
      text: w.text,
      ai_likelihood: w.ai_assistance_score,
      label: w.label,
      confidence: w.confidence,
    })),
  }
}
