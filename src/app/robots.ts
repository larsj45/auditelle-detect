import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { EDITORIAL_ORIGIN, LEGACY_ORIGIN, hostKind } from '@/lib/editorial-host'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get('host')
  const origin = hostKind(host) === 'editorial' ? EDITORIAL_ORIGIN : LEGACY_ORIGIN

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/auth/', '/sso/', '/reset-password/'],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
  }
}
