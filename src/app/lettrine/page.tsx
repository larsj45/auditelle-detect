import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getResellerConfig } from '@/lib/config'
import { siteOrigin } from '@/lib/site-origin'
import ProductLanding from '@/components/ProductLanding'

// Product landing for brands whose "/" is the company page (auditelle-fr).
// The folder name is the route; companyHome.productPath must match it.
export async function generateMetadata(): Promise<Metadata> {
  const config = await getResellerConfig()
  if (!config.companyHome) return {}
  return { alternates: { canonical: `${siteOrigin(config)}${config.companyHome.productPath}` } }
}

export default async function LettrinePage() {
  const config = await getResellerConfig()
  if (config.companyHome?.productPath !== '/lettrine') notFound()
  return <ProductLanding />
}
