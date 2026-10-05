import { NextRequest, NextResponse } from 'next/server'
import { emailDomain } from '@/lib/institutional-email'
import { TERMS_VERSION, TRIAL_UNITS, isLettrineLocale } from '@/lib/lettrine/signup'
import { lettrineServiceClient, userFromRequest } from '@/lib/lettrine/server'

export const dynamic = 'force-dynamic'

const fail = (errorCode: string, status: number) => NextResponse.json({ success: false, errorCode }, { status })

interface PendingOrg {
  journal?: unknown
  locale?: unknown
  terms_version?: unknown
  terms_accepted_at?: unknown
}

// Creates the journal organisation after the email is confirmed. Idempotent:
// a user who already belongs to an organisation gets it back unchanged.
export async function POST(request: NextRequest) {
  const user = await userFromRequest(request)
  if (!user) return fail('unauthorized', 401)
  if (!user.email_confirmed_at) return fail('email_not_confirmed', 403)

  const service = lettrineServiceClient()
  const existing = await service.from('lettrine_members').select('org_id').eq('user_id', user.id).maybeSingle()
  if (existing.data) return NextResponse.json({ success: true, created: false, trialGranted: false })

  const pending = (user.user_metadata?.lettrine ?? {}) as PendingOrg
  const journal = typeof pending.journal === 'string' ? pending.journal.trim() : ''
  const locale = isLettrineLocale(pending.locale) ? pending.locale : null
  const domain = user.email ? emailDomain(user.email) : null
  const acceptedAt = typeof pending.terms_accepted_at === 'string' ? pending.terms_accepted_at : null
  if (!journal || !locale || !domain || !acceptedAt || pending.terms_version !== TERMS_VERSION) {
    return fail('no_pending_org', 409)
  }

  const { data: org, error: orgError } = await service
    .from('lettrine_orgs')
    .insert({
      name: journal.slice(0, 200),
      locale,
      email_domain: domain,
      terms_version: TERMS_VERSION,
      terms_accepted_at: acceptedAt,
      terms_accepted_by: user.id,
    })
    .select('id')
    .single()
  if (orgError || !org) {
    console.error('[lettrine-onboard] org insert failed:', orgError?.message)
    return fail('unknown', 500)
  }

  const { error: memberError } = await service
    .from('lettrine_members')
    .insert({ org_id: org.id, user_id: user.id, role: 'owner' })
  if (memberError) {
    // Concurrent onboarding for the same user: keep the first organisation.
    await service.from('lettrine_orgs').delete().eq('id', org.id)
    const again = await service.from('lettrine_members').select('org_id').eq('user_id', user.id).maybeSingle()
    if (again.data) return NextResponse.json({ success: true, created: false, trialGranted: false })
    console.error('[lettrine-onboard] member insert failed:', memberError.message)
    return fail('unknown', 500)
  }

  const { data: granted, error: trialError } = await service.rpc('lettrine_grant_trial', {
    p_org: org.id,
    p_domain: domain,
    p_units: TRIAL_UNITS,
  })
  if (trialError) console.error('[lettrine-onboard] trial grant failed:', trialError.message)

  return NextResponse.json({ success: true, created: true, trialGranted: granted === true })
}
