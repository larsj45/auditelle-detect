import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { resolveEditorialRedirect } from '@/lib/editorial-host'

export function proxy(request: NextRequest) {
  const redirect = resolveEditorialRedirect({
    host: request.headers.get('host'),
    pathname: request.nextUrl.pathname,
    search: request.nextUrl.search,
    acceptLanguage: request.headers.get('accept-language'),
  })

  if (!redirect) return NextResponse.next()
  return NextResponse.redirect(redirect.location, redirect.status)
}

export const config = {
  // API routes (Stripe webhook, crons, auth) and static assets never go through host routing.
  matcher: ['/((?!api/|_next/static|_next/image|favicon.ico|brands/|images/).*)'],
}
