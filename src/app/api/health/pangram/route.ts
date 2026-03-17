import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { detectAI } from '@/lib/pangram'

export const dynamic = 'force-dynamic'

const CRON_SECRET = process.env.CRON_SECRET

export async function GET(request: NextRequest) {
  const start = Date.now()
  let statusCode: number | undefined

  try {
    await detectAI('This is a health check test.')
    const latency_ms = Date.now() - start

    return NextResponse.json({ status: 'ok', latency_ms })
  } catch (err) {
    const latency_ms = Date.now() - start
    const message = err instanceof Error ? err.message : 'Unknown error'

    // Extract HTTP status code from error message (format: "Pangram API error: 402 - ...")
    const codeMatch = message.match(/Pangram API error: (\d+)/)
    statusCode = codeMatch ? parseInt(codeMatch[1], 10) : undefined

    // Log to Supabase when called by cron
    const authHeader = request.headers.get('Authorization')
    if (CRON_SECRET && authHeader === `Bearer ${CRON_SECRET}`) {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        )
        await supabase.from('api_health_log').insert({
          endpoint: 'pangram',
          status: 'error',
          status_code: statusCode,
          message,
          latency_ms,
        })
      } catch (logErr) {
        console.error('Failed to log health check to Supabase:', logErr)
      }
    }

    return NextResponse.json(
      { status: 'error', code: statusCode, message },
      { status: 502 }
    )
  }
}
