import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/auth/', '/sso/', '/reset-password/'],
      },
    ],
    sitemap: 'https://auditelle.fr/sitemap.xml',
  }
}
