import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { IBM_Plex_Mono, Newsreader, Public_Sans } from 'next/font/google'
import { getResellerConfig } from '@/lib/config'
import EditorialLanding from '@/components/editorial/EditorialLanding'

const editorialSerif = Newsreader({
  subsets: ['latin'],
  variable: '--font-editorial-serif',
  display: 'swap',
})

const editorialSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-editorial-sans',
  display: 'swap',
})

const editorialMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-editorial-mono',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const config = await getResellerConfig()

  if (config.id !== 'auditelle-fr') {
    return {
      title: 'Page introuvable',
      robots: { index: false, follow: false },
    }
  }

  const title = 'Auditelle Éditorial | Intégrité pour les revues scientifiques'
  const description =
    "Auditelle Éditorial aide les revues scientifiques francophones à examiner les signaux liés à l'IA et à la similarité, puis à documenter la révision humaine."

  return {
    title,
    description,
    alternates: {
      canonical: `https://${config.domain}/revues-scientifiques`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'fr_FR',
      url: `https://${config.domain}/revues-scientifiques`,
      siteName: 'Auditelle Éditorial',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    // Pricing and provider terms are still being validated. Flip to index/follow
    // when the public offer is commercially approved.
    robots: { index: false, follow: false },
  }
}

export default async function RevuesScientifiquesPage() {
  const config = await getResellerConfig()

  if (config.id !== 'auditelle-fr') {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Auditelle Éditorial',
    description:
      "Plateforme d'intégrité éditoriale pour les revues scientifiques francophones.",
    url: `https://${config.domain}/revues-scientifiques`,
    inLanguage: 'fr',
    publisher: {
      '@type': 'Organization',
      name: config.legalEntity,
      url: `https://${config.domain}`,
    },
  }

  return (
    <div className={`${editorialSerif.variable} ${editorialSans.variable} ${editorialMono.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EditorialLanding supportEmail={config.supportEmail} />
    </div>
  )
}
