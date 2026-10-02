import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { IBM_Plex_Mono, Newsreader, Public_Sans } from 'next/font/google'
import { getResellerConfig } from '@/lib/config'
import EditorialLanding from '@/components/editorial/EditorialLanding'
import { editorialCopy, getEditorialCopy } from '@/components/editorial/editorialCopy'

const content = getEditorialCopy('fr')

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

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: `https://${config.domain}${content.path}`,
      languages: {
        fr: `https://${config.domain}${editorialCopy.fr.path}`,
        sv: `https://${config.domain}${editorialCopy.sv.path}`,
      },
    },
    openGraph: {
      title: content.metadata.title,
      description: content.metadata.description,
      type: 'website',
      locale: content.openGraphLocale,
      url: `https://${config.domain}${content.path}`,
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

export default async function RevuesScientifiquesPage() {
  const config = await getResellerConfig()

  if (config.id !== 'auditelle-fr') {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: content.metadata.pageName,
    description: content.metadata.pageDescription,
    url: `https://${config.domain}${content.path}`,
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
