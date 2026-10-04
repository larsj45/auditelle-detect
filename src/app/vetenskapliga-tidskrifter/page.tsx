import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { IBM_Plex_Mono, Newsreader, Public_Sans } from 'next/font/google'
import { getResellerConfig } from '@/lib/config'
import { EDITORIAL_ORIGIN } from '@/lib/editorial-host'
import EditorialLanding from '@/components/editorial/EditorialLanding'
import { editorialCopy, getEditorialCopy } from '@/components/editorial/editorialCopy'

const content = getEditorialCopy('sv')

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
      title: 'Sidan kunde inte hittas',
      robots: { index: false, follow: false },
    }
  }

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    // The root layout carries the education product's keywords.
    keywords: null,
    alternates: {
      canonical: `${EDITORIAL_ORIGIN}${content.path}`,
      languages: {
        fr: `${EDITORIAL_ORIGIN}${editorialCopy.fr.path}`,
        sv: `${EDITORIAL_ORIGIN}${editorialCopy.sv.path}`,
      },
    },
    openGraph: {
      title: content.metadata.title,
      description: content.metadata.description,
      type: 'website',
      locale: content.openGraphLocale,
      url: `${EDITORIAL_ORIGIN}${content.path}`,
      siteName: content.metadata.pageName,
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metadata.title,
      description: content.metadata.description,
    },
    robots: { index: true, follow: true },
  }
}

export default async function VetenskapligaTidskrifterPage() {
  const config = await getResellerConfig()

  if (config.id !== 'auditelle-fr') {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: content.metadata.pageName,
    description: content.metadata.pageDescription,
    url: `${EDITORIAL_ORIGIN}${content.path}`,
    inLanguage: content.htmlLang,
    publisher: {
      '@type': 'Organization',
      name: config.legalEntity,
      url: `https://${config.domain}`,
    },
  }

  return (
    <div
      className={`${editorialSerif.variable} ${editorialSans.variable} ${editorialMono.variable}`}
      lang={content.htmlLang}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EditorialLanding content={content} supportEmail={config.supportEmail} />
    </div>
  )
}
