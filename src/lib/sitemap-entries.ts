import type { MetadataRoute } from 'next'
import { editorialCopy } from '../components/editorial/editorialCopy.ts'
import { EDITORIAL_ORIGIN, LEGACY_ORIGIN, type HostKind } from './editorial-host.ts'

// The Lettrine landings (journals and schools) live on lettrine.eu;
// auditelle.fr keeps the rest.
export function editorialSitemap(now = new Date()): MetadataRoute.Sitemap {
  const journals = (['fr', 'sv', 'it', 'pt', 'en'] as const).map((locale) => ({
    url: `${EDITORIAL_ORIGIN}${editorialCopy[locale].path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    alternates: {
      languages: {
        fr: `${EDITORIAL_ORIGIN}${editorialCopy.fr.path}`,
        sv: `${EDITORIAL_ORIGIN}${editorialCopy.sv.path}`,
        it: `${EDITORIAL_ORIGIN}${editorialCopy.it.path}`,
        pt: `${EDITORIAL_ORIGIN}${editorialCopy.pt.path}`,
        en: `${EDITORIAL_ORIGIN}${editorialCopy.en.path}`,
      },
    },
  }))

  const schoolAlternates = {
    languages: {
      fr: `${EDITORIAL_ORIGIN}/etablissements`,
      it: `${EDITORIAL_ORIGIN}/istituzioni`,
    },
  }
  const schools: MetadataRoute.Sitemap = [
    {
      url: `${EDITORIAL_ORIGIN}/etablissements`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: schoolAlternates,
    },
    {
      url: `${EDITORIAL_ORIGIN}/istituzioni`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: schoolAlternates,
    },
  ]

  return [...journals, ...schools, { url: EDITORIAL_ORIGIN + '/lettrine', lastModified: now, changeFrequency: 'weekly', priority: 0.95 }]
}

export function legacySitemap(now = new Date()): MetadataRoute.Sitemap {
  const baseUrl = LEGACY_ORIGIN

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
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
    {
      url: `${baseUrl}/demo-video`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]
}

export function sitemapForHost(kind: HostKind, now = new Date()): MetadataRoute.Sitemap {
  return kind === 'editorial' ? editorialSitemap(now) : legacySitemap(now)
}
