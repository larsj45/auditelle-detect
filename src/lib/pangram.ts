const PANGRAM_API_URL = 'https://text.api.pangramlabs.com/v3'

export interface PangramResult {
  ai_likelihood: number
  detected_model?: string
  prediction?: string
  prediction_short?: string
  sentences?: Array<{
    text: string
    ai_likelihood: number
    detected_model?: string
    label?: string
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
    body: JSON.stringify({ text }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Pangram API error: ${response.status} - ${err}`)
  }

  const data: PangramV3Response = await response.json()

  // Transform Pangram v3 response to our format
  return {
    ai_likelihood: data.fraction_ai,
    prediction: data.prediction,
    prediction_short: data.prediction_short,
    detected_model: data.fraction_ai > 0.5 ? 'AI Generated' : undefined,
    sentences: data.windows?.map(w => ({
      text: w.text,
      ai_likelihood: w.ai_assistance_score,
      label: w.label,
    })),
  }
}
