import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { hostKind } from '@/lib/editorial-host'
import { sitemapForHost } from '@/lib/sitemap-entries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get('host')
  return sitemapForHost(hostKind(host))
}
