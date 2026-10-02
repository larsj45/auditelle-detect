import type { MetadataRoute } from 'next'
import { editorialCopy } from '../components/editorial/editorialCopy.ts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://auditelle.fr'
  const now = new Date()

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/etablissements`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/professeurs`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/partenaires`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tester`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...(['fr', 'sv'] as const).map((locale) => ({
      url: `${baseUrl}${editorialCopy[locale].path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${baseUrl}${editorialCopy.fr.path}`,
          sv: `${baseUrl}${editorialCopy.sv.path}`,
        },
      },
    })),
    {
      url: `${baseUrl}/demo-video`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]
}
