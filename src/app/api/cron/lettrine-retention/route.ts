import { NextRequest, NextResponse } from 'next/server'
import { lettrineServiceClient } from '@/lib/lettrine/server'

export const dynamic = 'force-dynamic'

// Deletes Lettrine analyses past their retention date (180 days by default).
// Unlike the older crons, this one fails closed when CRON_SECRET is missing.
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await lettrineServiceClient()
    .from('lettrine_analyses')
    .delete()
    .lt('delete_after', new Date().toISOString())
    .select('id')
  if (error) {
    console.error('[lettrine-retention] delete failed:', error.message)
    return NextResponse.json({ success: false }, { status: 500 })
  }
  return NextResponse.json({ success: true, deleted: data?.length ?? 0 })
}
