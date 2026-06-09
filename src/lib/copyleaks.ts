import crypto from 'node:crypto'
import { getSupabaseServer } from '@/lib/supabase'

interface CopyleaksLoginResponse {
  access_token: string
  '.issued'?: string
  '.expires'?: string
}

interface CachedCopyleaksToken {
  accessToken: string
  expiresAtMs: number
}

export interface CopyleaksCompletedWebhookResult {
  id: string
  title?: string
  introduction?: string
  matchedWords?: number
  url?: string
  metadata?: {
    finalUrl?: string
    canonicalUrl?: string
    filename?: string
  }
}

export interface CopyleaksCompletedWebhookPayload {
  status: number
  developerPayload?: string
  scannedDocument?: {
    scanId?: string
    totalWords?: number
    totalExcluded?: number
    credits?: number
    creationTime?: string
    metadata?: {
      filename?: string
    }
  }
  results?: {
    internet?: CopyleaksCompletedWebhookResult[]
    database?: CopyleaksCompletedWebhookResult[]
    batch?: CopyleaksCompletedWebhookResult[]
    repositories?: CopyleaksCompletedWebhookResult[]
    score?: {
      identicalWords?: number
      minorChangedWords?: number
      relatedMeaningWords?: number
      aggregatedScore?: number
    }
  }
  downloadableReport?: {
    status?: number
    report?: string
  }
  notifications?: unknown
}

let cachedToken: CachedCopyleaksToken | null = null
let inflightLogin: Promise<string> | null = null

const TOKEN_REFRESH_BUFFER_MS = 5 * 60 * 1000

function getCopyleaksCredentials() {
  const email = process.env.COPYLEAKS_EMAIL
  const apiKey = process.env.COPYLEAKS_API_KEY

  if (!email || !apiKey) {
    throw new Error('Copyleaks credentials are not configured')
  }

  return { email, apiKey }
}

function getCopyleaksWebhookSecret() {
  const secret = process.env.COPYLEAKS_WEBHOOK_SECRET
  if (!secret) {
    throw new Error('COPYLEAKS_WEBHOOK_SECRET is not configured')
  }
  return secret
}

function getWebhookBaseUrl() {
  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined
  const baseUrl =
    process.env.COPYLEAKS_WEBHOOK_BASE_URL ??
    (process.env.VERCEL_ENV === 'preview' ? vercelUrl : undefined) ??
    process.env.NEXT_PUBLIC_APP_URL ??
    vercelUrl

  if (!baseUrl) {
    throw new Error('COPYLEAKS_WEBHOOK_BASE_URL, NEXT_PUBLIC_APP_URL, or VERCEL_URL must be configured')
  }

  return baseUrl.replace(/\/+$/, '')
}

function getCopyleaksWebhookStatusUrl() {
  const statusUrl = `${getWebhookBaseUrl()}/api/providers/copyleaks/webhook/{STATUS}`
  const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET

  if (process.env.VERCEL_ENV !== 'preview' || !bypassSecret) {
    return statusUrl
  }

  return `${statusUrl}?x-vercel-protection-bypass=${encodeURIComponent(bypassSecret)}`
}

export function buildCopyleaksDeveloperPayload(jobId: string) {
  return JSON.stringify({
    jobId,
    secret: getCopyleaksWebhookSecret(),
  })
}

export function parseCopyleaksDeveloperPayload(payload: unknown): { jobId: string; secret: string } | null {
  if (typeof payload !== 'string' || payload.length === 0) {
    return null
  }

  try {
    const parsed = JSON.parse(payload) as { jobId?: unknown; secret?: unknown }
    if (typeof parsed.jobId !== 'string' || typeof parsed.secret !== 'string') {
      return null
    }
    return { jobId: parsed.jobId, secret: parsed.secret }
  } catch {
    return null
  }
}

export function isWebhookSecretValid(candidate: string): boolean {
  const expected = getCopyleaksWebhookSecret()
  const expectedBuf = Buffer.from(expected, 'utf8')
  const candidateBuf = Buffer.from(candidate, 'utf8')

  if (expectedBuf.length !== candidateBuf.length) {
    crypto.timingSafeEqual(expectedBuf, expectedBuf)
    return false
  }

  return crypto.timingSafeEqual(expectedBuf, candidateBuf)
}

async function readCachedCopyleaksToken(): Promise<CachedCopyleaksToken | null> {
  if (cachedToken && cachedToken.expiresAtMs - Date.now() > TOKEN_REFRESH_BUFFER_MS) {
    return cachedToken
  }

  try {
    const supabase = getSupabaseServer()
    const { data, error } = await supabase
      .from('provider_credentials_cache')
      .select('access_token, expires_at')
      .eq('provider', 'copyleaks')
      .maybeSingle()

    if (error || !data) {
      return null
    }

    const expiresAtMs = Date.parse(data.expires_at)
    if (!Number.isFinite(expiresAtMs) || expiresAtMs - Date.now() <= TOKEN_REFRESH_BUFFER_MS) {
      return null
    }

    cachedToken = { accessToken: data.access_token, expiresAtMs }
    return cachedToken
  } catch (error) {
    console.warn('[copyleaks] persistent cache read failed, falling back to login', error)
    return null
  }
}

async function persistCopyleaksToken(accessToken: string, expiresAtMs: number) {
  try {
    const supabase = getSupabaseServer()
    await supabase
      .from('provider_credentials_cache')
      .upsert(
        {
          provider: 'copyleaks',
          access_token: accessToken,
          expires_at: new Date(expiresAtMs).toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'provider' }
      )
  } catch (error) {
    console.warn('[copyleaks] persistent cache write failed', error)
  }
}

export async function getCopyleaksAccessToken() {
  const fromCache = await readCachedCopyleaksToken()
  if (fromCache) return fromCache.accessToken

  if (inflightLogin) return inflightLogin

  inflightLogin = (async () => {
    const { email, apiKey } = getCopyleaksCredentials()
    const response = await fetch('https://id.copyleaks.com/v3/account/login/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, key: apiKey }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Copyleaks login failed: ${response.status} - ${errorText}`)
    }

    const payload = (await response.json()) as CopyleaksLoginResponse
    const expiresAtMs = payload['.expires']
      ? Date.parse(payload['.expires'])
      : Date.now() + 47 * 60 * 60 * 1000

    cachedToken = {
      accessToken: payload.access_token,
      expiresAtMs,
    }

    void persistCopyleaksToken(payload.access_token, expiresAtMs)

    return payload.access_token
  })()

  try {
    return await inflightLogin
  } finally {
    inflightLogin = null
  }
}

export async function submitCopyleaksPlagiarismTextScan(args: {
  scanId: string
  text: string
  filename: string
  developerPayload: string
}) {
  const accessToken = await getCopyleaksAccessToken()
  const webhookStatusUrl = getCopyleaksWebhookStatusUrl()

  const response = await fetch(
    `https://api.copyleaks.com/v3/scans/submit/file/${encodeURIComponent(args.scanId)}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip',
      },
      body: JSON.stringify({
        base64: Buffer.from(args.text, 'utf8').toString('base64'),
        filename: args.filename,
        properties: {
          developerPayload: args.developerPayload,
          webhooks: {
            status: webhookStatusUrl,
          },
          scanning: {
            internet: true,
          },
          sandbox: false,
          sensitivityLevel: 3,
          expiration: 168,
        },
      }),
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Copyleaks submit failed: ${response.status} - ${errorText}`)
  }
}

export function createCopyleaksScanId(jobId: string) {
  const compactJobId = jobId.replace(/-/g, '').slice(0, 29)
  const suffix = crypto.randomUUID().replace(/-/g, '').slice(0, 4)
  return `ad-${compactJobId}${suffix}`
}
