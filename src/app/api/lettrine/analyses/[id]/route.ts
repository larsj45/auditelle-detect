import { NextRequest, NextResponse } from 'next/server'
import { validateDecision } from '@/lib/lettrine/decision'
import { lettrineServiceClient, userFromRequest } from '@/lib/lettrine/server'

export const dynamic = 'force-dynamic'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const fail = (errorCode: string, status: number) => NextResponse.json({ success: false, errorCode }, { status })

// Resolves the analysis only if it belongs to the caller's organisation.
async function ownedAnalysis(request: NextRequest, id: string) {
  if (!UUID.test(id)) return { error: fail('not_found', 404) }
  const user = await userFromRequest(request)
  if (!user) return { error: fail('unauthorized', 401) }
  const service = lettrineServiceClient()
  const { data: membership } = await service.from('lettrine_members').select('org_id').eq('user_id', user.id).maybeSingle()
  if (!membership) return { error: fail('no_org', 404) }
  const { data: analysis } = await service
    .from('lettrine_analyses')
    .select('id')
    .eq('id', id)
    .eq('org_id', membership.org_id)
    .maybeSingle()
  if (!analysis) return { error: fail('not_found', 404) }
  return { service, user, analysisId: analysis.id as string }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const owned = await ownedAnalysis(request, id)
  if ('error' in owned) return owned.error

  let payload: unknown
  try {
    payload = JSON.parse(await request.text())
  } catch {
    return fail('invalid_decision', 400)
  }
  const validated = validateDecision(payload)
  if (!validated.ok) return fail(validated.errorCode, 400)

  const decidedAt = new Date().toISOString()
  const { error } = await owned.service
    .from('lettrine_analyses')
    .update({
      decision: validated.decision,
      decision_note: validated.note,
      decided_by: owned.user.id,
      decided_at: decidedAt,
    })
    .eq('id', owned.analysisId)
  if (error) return fail('unknown', 500)

  return NextResponse.json({ success: true, decision: validated.decision, note: validated.note, decidedAt })
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const owned = await ownedAnalysis(request, id)
  if ('error' in owned) return owned.error
  const { error } = await owned.service.from('lettrine_analyses').delete().eq('id', owned.analysisId)
  if (error) return fail('unknown', 500)
  return NextResponse.json({ success: true })
}
