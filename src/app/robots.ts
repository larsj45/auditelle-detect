import type { MetadataRoute } from 'next'
import { getResellerConfig } from '@/lib/config'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const config = await getResellerConfig()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/auth/', '/sso/', '/reset-password/'],
      },
    ],
    sitemap: `https://${config.domain}/sitemap.xml`,
  }
}
