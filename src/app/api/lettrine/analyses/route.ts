import { NextRequest, NextResponse } from 'next/server'
import { detectAI, detectPlagiarism } from '@/lib/pangram'
import { checkAnalysisSize } from '@/lib/lettrine/units'
import { sanitizeAiResult, sanitizeSimilarity } from '@/lib/lettrine/report'
import { lettrineServiceClient, userFromRequest } from '@/lib/lettrine/server'

export const dynamic = 'force-dynamic'
// Long manuscripts: Pangram tasks are asynchronous and similarity can be slow.
export const maxDuration = 120

const MAX_BODY_BYTES = 400_000

const fail = (errorCode: string, status: number, extra: Record<string, unknown> = {}) =>
  NextResponse.json({ success: false, errorCode, ...extra }, { status })

export async function POST(request: NextRequest) {
  const user = await userFromRequest(request)
  if (!user) return fail('unauthorized', 401)

  let body: Record<string, unknown>
  try {
    const raw = await request.text()
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return fail('too_long', 413)
    body = JSON.parse(raw)
  } catch {
    return fail('invalid_request', 400)
  }

  const text = typeof body.text === 'string' ? body.text : ''
  const manuscriptRef = typeof body.manuscriptRef === 'string' ? body.manuscriptRef.trim().slice(0, 120) : ''
  const title = typeof body.title === 'string' && body.title.trim() ? body.title.trim().slice(0, 300) : null
  if (!manuscriptRef) return fail('manuscript_ref_required', 400)

  const size = checkAnalysisSize(text)
  if (!size.ok) return fail(size.reason, 400, { words: size.words })

  const service = lettrineServiceClient()
  const { data: membership } = await service
    .from('lettrine_members')
    .select('org_id')
    .eq('user_id', user.id)
    .maybeSingle()
  if (!membership) return fail('no_org', 404)
  const orgId = membership.org_id as string

  const { data: balance } = await service.rpc('lettrine_org_balance', { p_org: orgId })
  if (typeof balance !== 'number' || balance < size.units) {
    return fail('insufficient_units', 402, { balance: typeof balance === 'number' ? balance : 0, units: size.units })
  }

  const trimmed = text.trim()
  const [aiOutcome, similarityOutcome] = await Promise.allSettled([
    detectAI(trimmed, { publicDashboardLink: false }),
    detectPlagiarism(trimmed),
  ])
  const ai = aiOutcome.status === 'fulfilled' ? sanitizeAiResult(aiOutcome.value) : null
  const similarity = similarityOutcome.status === 'fulfilled' ? sanitizeSimilarity(similarityOutcome.value) : null
  if (!ai && !similarity) {
    console.error('[lettrine-analysis] both engines failed', {
      ai: aiOutcome.status === 'rejected' ? String(aiOutcome.reason).slice(0, 200) : null,
      similarity: similarityOutcome.status === 'rejected' ? String(similarityOutcome.reason).slice(0, 200) : null,
    })
    return fail('analysis_failed', 502)
  }

  const { data: analysis, error: insertError } = await service
    .from('lettrine_analyses')
    .insert({
      org_id: orgId,
      created_by: user.id,
      manuscript_ref: manuscriptRef,
      title,
      word_count: size.words,
      units: size.units,
      ai_result: ai,
      similarity_result: similarity,
    })
    .select('id')
    .single()
  if (insertError || !analysis) {
    console.error('[lettrine-analysis] insert failed:', insertError?.message)
    return fail('unknown', 500)
  }

  const { data: remaining, error: debitError } = await service.rpc('lettrine_consume_units', {
    p_org: orgId,
    p_units: size.units,
    p_analysis: analysis.id,
  })
  if (debitError) {
    // Another analysis spent the balance in the meantime: do not keep an
    // unpaid report.
    await service.from('lettrine_analyses').delete().eq('id', analysis.id)
    const insufficient = /insufficient_units/.test(debitError.message)
    return fail(insufficient ? 'insufficient_units' : 'unknown', insufficient ? 402 : 500)
  }

  return NextResponse.json({
    success: true,
    id: analysis.id,
    balance: remaining,
    partial: !ai || !similarity,
  })
}
