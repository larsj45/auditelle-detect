import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  ArrowRight,
  Check,
  Cpu,
  FileText,
  GraduationCap,
  Languages,
  Layers,
  Lock,
  Ruler,
  Shield,
} from 'lucide-react'
import { getResellerConfig } from '@/lib/config'
import { EDITORIAL_ORIGIN, LEGACY_ORIGIN } from '@/lib/editorial-host'
import OpenCookieConsentButton from '@/components/OpenCookieConsentButton'
import {
  ISTITUZIONI_CONTACT,
  ISTITUZIONI_PATH,
  istituzioniCopy as copy,
  istituzioniMailto,
  istituzioniPilotMailto,
} from '@/lib/istituzioni-copy'

const PAGE_URL = `${EDITORIAL_ORIGIN}${ISTITUZIONI_PATH}`

const ICONS = {
  cpu: Cpu,
  languages: Languages,
  ruler: Ruler,
  file: FileText,
  lock: Lock,
  layers: Layers,
} as const

export async function generateMetadata(): Promise<Metadata> {
  const config = await getResellerConfig()
  if (config.id !== 'auditelle-fr') {
    return { title: 'Pagina non trovata', robots: { index: false, follow: false } }
  }

  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
    keywords: null,
    alternates: {
      canonical: PAGE_URL,
      languages: {
        fr: `${EDITORIAL_ORIGIN}/etablissements`,
        it: PAGE_URL,
      },
    },
    openGraph: {
      title: copy.metadata.title,
      description: copy.metadata.description,
      type: 'website',
      locale: 'it_IT',
      url: PAGE_URL,
      siteName: 'Lettrine',
    },
    robots: { index: true, follow: true },
  }
}

export default async function IstituzioniPage() {
  const config = await getResellerConfig()
  if (config.id !== 'auditelle-fr') notFound()

  const mailto = istituzioniMailto()
  const pilotMailto = istituzioniPilotMailto()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Lettrine per le università e le business school',
    description: copy.metadata.description,
    url: PAGE_URL,
    inLanguage: 'it',
    publisher: { '@type': 'Organization', name: config.legalEntity, url: LEGACY_ORIGIN },
  }

  return (
    <div lang="it">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href={ISTITUZIONI_PATH} className="flex items-center">
              {config.logoColor ? (
                <img src={config.logoColor} alt={config.name} style={{ height: config.logoHeight || '2rem' }} />
              ) : (
                <span className="text-xl font-bold text-[var(--navy)]">{config.name}</span>
              )}
            </a>
            <a
              href={mailto}
              className="bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-accent-hover transition-colors"
            >
              {copy.hero.primaryCta}
            </a>
          </div>
        </div>
      </nav>

      <section className="gradient-hero pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--accent-light)] text-[var(--accent)] text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <GraduationCap className="w-4 h-4" />
            {copy.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--navy)] leading-tight">
            {copy.hero.title} <span className="text-[var(--accent)]">{copy.hero.highlight}</span>
          </h1>
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">{copy.hero.lead}</p>
          <div className="flex flex-wrap gap-6 mt-8 justify-center">
            {copy.hero.badges.map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                {badge}
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a
              href={mailto}
              className="btn-primary text-lg px-10 py-4 rounded-xl shadow-lg shadow-orange-500/25 inline-flex items-center gap-2"
            >
              {copy.hero.primaryCta}
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#pilota" className="btn-secondary text-lg px-8 py-4 rounded-xl">
              {copy.hero.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
            {copy.posture.title} <span className="text-[var(--accent)]">{copy.posture.highlight}</span>
          </h2>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed">{copy.posture.body}</p>
        </div>
      </section>

      <section className="py-24 px-4 bg-[var(--bg-light)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)] text-center mb-16">{copy.features.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {copy.features.items.map((item) => {
              const Icon = ICONS[item.icon]
              return (
                <div key={item.title} className="card group">
                  <div className="w-14 h-14 rounded-xl bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center mb-4 group-hover:bg-[var(--accent)] group-hover:text-white transition">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--navy)] mb-2">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto grid gap-8">
          <div className="card border-l-4 border-l-[var(--accent)]">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-[var(--accent)] shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-[var(--navy)] mb-2">{copy.gdpr.title}</h3>
                <p className="text-gray-600 leading-relaxed">{copy.gdpr.body}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold text-[var(--navy)] mb-2">{copy.trial.title}</h3>
            <p className="text-gray-600 leading-relaxed">{copy.trial.body}</p>
            <p className="text-sm text-gray-500 mt-3">{copy.trial.note}</p>
            <a href={mailto} className="btn-primary px-8 py-3 mt-6 inline-flex items-center gap-2">
              {copy.hero.primaryCta}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <section id="pilota" className="py-24 px-4 bg-[var(--bg-light)] scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)] text-center mb-16">{copy.pilot.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {copy.pilot.steps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--accent)] text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-[var(--navy)] mb-2">{step.title}</h3>
                <p className="text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="card mt-14 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
              <h3 className="text-2xl font-bold text-[var(--navy)]">{copy.pilot.card.title}</h3>
              <div className="sm:text-right">
                <p className="text-3xl font-bold text-[var(--navy)]">{copy.pilot.card.price}</p>
                <p className="text-sm text-gray-500">{copy.pilot.card.priceNote}</p>
              </div>
            </div>
            <ul className="space-y-3">
              {copy.pilot.card.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm font-semibold text-gray-500 mt-6 mb-2">{copy.pilot.card.excludesTitle}</p>
            <ul className="space-y-1">
              {copy.pilot.card.excludes.map((item) => (
                <li key={item} className="text-sm text-gray-500">{item}</li>
              ))}
            </ul>
            <a href={pilotMailto} className="btn-secondary px-8 py-3 mt-8 inline-flex items-center justify-center">
              {copy.pilot.card.cta}
            </a>
          </div>
        </div>
      </section>

      <section className="gradient-hero py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{copy.closing.title}</h2>
          <p className="text-gray-300 mt-4 text-lg">{copy.closing.body}</p>
          <a href={mailto} className="btn-primary text-lg px-10 py-4 mt-10 inline-flex items-center gap-2">
            {copy.closing.cta}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <footer className="bg-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {config.legalEntity}. {copy.footer.rights} {config.registrationLabel}{' '}
            {config.registrationNumber}
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <a href={`mailto:${ISTITUZIONI_CONTACT}`} className="hover:text-white transition-colors">
              {ISTITUZIONI_CONTACT}
            </a>
            {config.googleAdsId && (
              <OpenCookieConsentButton label="Gestisci i cookie" className="hover:text-white transition-colors" />
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}
