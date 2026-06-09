import { NextResponse } from 'next/server'
import { getResellerConfig } from '@/lib/config'

export const dynamic = 'force-dynamic'

export async function POST() {
  const config = await getResellerConfig()
  const errors = config.strings.errors

  return NextResponse.json({
    error: errors.demoLimitReached,
    limit_reached: true,
    tests_remaining: 0,
    purchase_required: true,
    redirect_to: '/signup?next=credits',
  }, { status: 402 })
}
