import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getResellerConfig } from '@/lib/config'
import { InstitutionalNav } from '@/components/institutional/InstitutionalNav'
import { InstitutionalHero } from '@/components/institutional/InstitutionalHero'
import { InstitutionalComparison } from '@/components/institutional/InstitutionalComparison'
import { InstitutionalFeatures } from '@/components/institutional/InstitutionalFeatures'
import { InstitutionalProcurement } from '@/components/institutional/InstitutionalProcurement'
import { InstitutionalContactBlock } from '@/components/institutional/InstitutionalContactBlock'

// SEO per docs/veritexto-br-institutional-seo-2026-04-22.md:
//   /portal-integridade  → index,follow, sitemap
//   /portal-integridade/[institutionSlug]/* → noindex,nofollow (handled on those pages)

export async function generateMetadata(): Promise<Metadata> {
  const config = await getResellerConfig()
  const institutional = config.institutional

  if (!institutional?.enabled) return {}

  const canonical = `https://${config.domain}/portal-integridade`
  const title = `${institutional.label} | Alternativa ao Turnitin para instituições`
  const description =
    'Portal de Integridade Acadêmica do VeriTexto para escolas, faculdades e universidades brasileiras. Detecção de IA, fluxo de similaridade, turmas, usuários, histórico auditável e implantação institucional em reais.'

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    keywords: [
      'portal de integridade acadêmica',
      'alternativa ao turnitin',
      'turnitin brasil alternativa',
      'detecção de ia para universidades',
      'detecção de ia para faculdades',
      'similaridade acadêmica',
      'plataforma de integridade acadêmica',
      'detector de ia para instituições',
      'software de integridade acadêmica',
      'portal institucional de detecção de ia',
    ],
    openGraph: {
      title: `${institutional.label} do ${config.name}`,
      description:
        'A alternativa ao Turnitin para instituições brasileiras que precisam de detecção de IA, similaridade, histórico institucional e operação acadêmica em português.',
      type: 'website',
      locale: config.locale,
      url: canonical,
    },
  }
}

export default async function PortalIntegridadeLandingPage() {
  const config = await getResellerConfig()
  const institutional = config.institutional

  if (!institutional?.enabled) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: `${institutional.label} — ${config.name}`,
        url: `https://${config.domain}/portal-integridade`,
        description: institutional.landing.hero.subtitle,
        inLanguage: config.htmlLang,
      },
      {
        '@type': 'Organization',
        name: config.name,
        url: `https://${config.domain}`,
        email: institutional.commercial.contactEmail,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <InstitutionalNav config={config} />

      <main className="pt-16">
        <InstitutionalHero institutional={institutional} />
        <InstitutionalComparison config={config} />
        <InstitutionalFeatures institutional={institutional} />
        <InstitutionalProcurement institutional={institutional} />
        <InstitutionalContactBlock institutional={institutional} />
      </main>
    </>
  )
}
