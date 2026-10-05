import { NextRequest, NextResponse } from 'next/server'
import { lettrineServiceClient, userFromRequest } from '@/lib/lettrine/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const user = await userFromRequest(request)
  if (!user) return NextResponse.json({ success: false, errorCode: 'unauthorized' }, { status: 401 })

  const service = lettrineServiceClient()
  const { data: membership } = await service
    .from('lettrine_members')
    .select('role, lettrine_orgs(id, name, locale)')
    .eq('user_id', user.id)
    .maybeSingle()

  const org = membership?.lettrine_orgs as unknown as { id: string; name: string; locale: string } | null
  if (!membership || !org) {
    return NextResponse.json({ success: false, errorCode: 'no_org' }, { status: 404 })
  }

  const { data: balance } = await service.rpc('lettrine_org_balance', { p_org: org.id })

  return NextResponse.json({
    success: true,
    user: { name: (user.user_metadata?.full_name as string | undefined) || '', email: user.email },
    org: { name: org.name, locale: org.locale, role: membership.role },
    balance: typeof balance === 'number' ? balance : 0,
  })
}
