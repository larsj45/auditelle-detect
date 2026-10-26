import type { Metadata } from 'next'
import { getResellerConfig } from '@/lib/config'
import { siteOrigin } from '@/lib/site-origin'
import ProductLanding from '@/components/ProductLanding'
import CompanyHome from '@/components/CompanyHome'

export async function generateMetadata(): Promise<Metadata> {
  const config = await getResellerConfig()
  const home = config.companyHome
  if (!home) return { alternates: { canonical: siteOrigin(config) } }
  return {
    title: home.seo.title,
    description: home.seo.description,
    openGraph: {
      title: home.seo.ogTitle,
      description: home.seo.ogDescription,
      type: 'website',
      locale: config.locale,
      siteName: config.legalEntity,
      url: siteOrigin(config),
    },
    twitter: {
      card: 'summary_large_image',
      title: home.seo.ogTitle,
      description: home.seo.ogDescription,
    },
    alternates: { canonical: siteOrigin(config) },
  }
}

export default async function Home() {
  const config = await getResellerConfig()
  return config.companyHome ? <CompanyHome /> : <ProductLanding />
}
