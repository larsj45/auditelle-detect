import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getResellerConfig } from '@/lib/config'
import { getDetectionJobForUser } from '@/lib/detection-jobs'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ jobId: string }> }
) {
  const config = await getResellerConfig()
  const errors = config.strings.errors

  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: errors.unauthorized }, { status: 401 })
    }

    const match = authHeader.match(/^Bearer\s+(.+)$/)
    if (!match) {
      return NextResponse.json({ error: errors.unauthorized }, { status: 401 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: `Bearer ${match[1]}` } } }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: errors.unauthorized }, { status: 401 })
    }

    const { jobId } = await context.params
    const job = await getDetectionJobForUser(jobId, user.id)

    if (!job) {
      return NextResponse.json({ error: 'Job não encontrado' }, { status: 404 })
    }

    return NextResponse.json(
      {
        id: job.id,
        status: job.status,
        provider: job.provider,
        capability: job.capability,
        error: job.error_message,
        result: job.result_payload,
        completed_at: job.completed_at,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
      }
    )
  } catch (error) {
    console.error('[detect/jobs] failed', error)
    return NextResponse.json({ error: errors.internalError }, { status: 500 })
  }
}
