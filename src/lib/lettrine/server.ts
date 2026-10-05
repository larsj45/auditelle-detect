import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js'
import type { NextRequest } from 'next/server'
import { EDITORIAL_HOST, EDITORIAL_ORIGIN, hostKind } from '@/lib/editorial-host'
import { escapeHtml } from '@/lib/sanitize'
import type { LettrineAppCopy } from '@/components/lettrine/appCopy'

export function lettrineServiceClient(): SupabaseClient {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export async function userFromRequest(request: NextRequest): Promise<User | null> {
  const match = request.headers.get('authorization')?.match(/^Bearer\s+(.+)$/)
  if (!match) return null
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    global: { headers: { Authorization: `Bearer ${match[1]}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  })
  const { data } = await client.auth.getUser()
  return data.user ?? null
}

// Links in emails must point at lettrine.eu in production; local and preview
// builds keep their own origin so the flow can be tested end to end.
export function appOrigin(request: NextRequest): string {
  const host = request.headers.get('host')
  if (hostKind(host) === 'editorial' || process.env.VERCEL_ENV === 'production') return EDITORIAL_ORIGIN
  const proto = request.headers.get('x-forwarded-proto') || 'http'
  return `${proto}://${host || EDITORIAL_HOST}`
}

export function clientKey(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
}

export function confirmationEmail(copy: LettrineAppCopy, name: string, journal: string, link: string) {
  const e = copy.email
  const text = [e.greeting(name), '', e.body(journal), '', `${e.cta}: ${link}`, '', e.ignore, '', e.signature].join('\n')
  const html = `<!doctype html><html lang="${copy.htmlLang}"><body style="font-family:Georgia,serif;color:#10201b;background:#f6f3ec;padding:24px">
<div style="max-width:520px;margin:0 auto;background:#ffffff;padding:28px;border:1px solid #e3ded2">
<p style="font-size:20px;margin:0 0 20px"><strong>Lettrine</strong></p>
<p>${escapeHtml(e.greeting(name))}</p>
<p>${escapeHtml(e.body(journal))}</p>
<p style="margin:28px 0"><a href="${escapeHtml(link)}" style="background:#173d32;color:#ffffff;padding:12px 18px;text-decoration:none;font-family:Arial,sans-serif">${escapeHtml(e.cta)}</a></p>
<p style="color:#697274;font-size:13px">${escapeHtml(e.ignore)}</p>
<p style="color:#697274;font-size:13px">${escapeHtml(e.signature)}</p>
</div></body></html>`
  return { subject: e.subject, html, text }
}
