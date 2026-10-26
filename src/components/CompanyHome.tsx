import Link from 'next/link'
import { ArrowRight, Building2, Check, ExternalLink, FileSearch, Mail, Scale, ShieldCheck, Video } from 'lucide-react'
import ManageCookiesLink from '@/components/ManageCookiesLink'
import { getResellerConfig } from '@/lib/config'
import { siteOrigin } from '@/lib/site-origin'
import { copyrightHolder } from '@/lib/company-home'
import type { CompanyHomeLink, CompanyHomeProduct } from '../../config/types'

// Company page shown on "/" when the brand config has `companyHome`
// (auditelle.fr: Auditelle SASU with Lettrine and VigiExam). All copy lives in
// config/<reseller>.ts under `companyHome`.

const principleIcons = [Scale, Building2, ShieldCheck]

const tones = {
  accent: {
    band: 'bg-orange-50',
    icon: 'bg-[var(--accent)] text-white',
    tagline: 'text-[var(--accent)]',
    check: 'text-[var(--accent)]',
    ring: 'hover:border-orange-200',
    primary: 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white',
  },
  teal: {
    band: 'bg-teal-50',
    icon: 'bg-teal-600 text-white',
    tagline: 'text-teal-700',
    check: 'text-teal-600',
    ring: 'hover:border-teal-200',
    primary: 'bg-teal-600 hover:bg-teal-700 text-white',
  },
} as const

export default async function CompanyHome() {
  const config = await getResellerConfig()
  const home = config.companyHome!
  const s = config.strings

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.legalEntity,
    url: siteOrigin(config),
    email: config.supportEmail,
    identifier: `${config.registrationLabel} ${config.registrationNumber}`,
    address: { '@type': 'PostalAddress', addressCountry: 'FR' },
    brand: home.products.map((p) => ({ '@type': 'Brand', name: p.name })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2" aria-label={config.legalEntity}>
              <Wordmark name={home.companyName} />
            </Link>
            <div className="flex items-center gap-5 sm:gap-7">
              <a href="#produits" className="hidden sm:inline text-sm text-gray-600 hover:text-[var(--navy)] transition-colors">
                {home.nav.products}
              </a>
              <a href="#qui-sommes-nous" className="hidden sm:inline text-sm text-gray-600 hover:text-[var(--navy)] transition-colors">
                {home.nav.about}
              </a>
              <Link
                href="/contact"
                className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors"
              >
                {home.nav.contact}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="gradient-hero pt-32 pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/80 border border-orange-100 text-[var(--accent)] text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-[var(--accent)] rounded-full"></span>
              {home.hero.badge}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--navy)] leading-tight">
              {home.hero.title}
              <span className="text-[var(--accent)]">{home.hero.titleAccent}</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mt-6 leading-relaxed">{home.hero.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-9">
              <a href="#produits" className="btn-primary text-lg px-8 py-4 rounded-xl shadow-lg shadow-orange-500/20 inline-flex items-center justify-center gap-2">
                {home.hero.ctaPrimary}
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link href="/contact" className="btn-secondary text-lg px-8 py-4 rounded-xl">
                {home.hero.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Visual: the two products as stacked cards */}
          <div className="relative h-80 sm:h-96 hidden sm:block" aria-hidden="true">
            <div className="absolute -top-6 right-6 w-64 h-64 rounded-full bg-orange-200/40 blur-3xl"></div>
            <div className="absolute bottom-0 left-10 w-56 h-56 rounded-full bg-teal-200/40 blur-3xl"></div>
            {home.products.slice(0, 2).map((product, i) => (
              <HeroCard key={product.name} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-white py-14 px-4 border-b border-orange-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {home.principles.map((p, i) => {
            const Icon = principleIcons[i % principleIcons.length]
            return (
              <div key={p.title} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-[var(--navy)]">{p.title}</h2>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{p.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Products */}
      <section id="produits" className="py-24 px-4 bg-[var(--bg-light)] scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">{home.productsTitle}</h2>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">{home.productsSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {home.products.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="qui-sommes-nous" className="py-24 px-4 bg-white scroll-mt-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">{home.about.title}</h2>
            <p className="text-lg text-gray-600 mt-6 leading-relaxed">{home.about.body}</p>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 mt-8 px-7 py-3 rounded-xl">
              <Mail className="w-5 h-5" />
              {home.about.cta}
            </Link>
          </div>
          <dl className="md:col-span-2 rounded-2xl bg-[var(--bg-light)] border border-orange-100 p-6 space-y-4">
            {home.about.facts.map((fact) => (
              <div key={fact.label} className="flex items-center justify-between gap-4 border-b border-orange-100 last:border-0 pb-3 last:pb-0">
                <dt className="text-sm text-gray-500">{fact.label}</dt>
                <dd className="text-sm font-semibold text-[var(--navy)] text-right break-all">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Footer (light) */}
      <footer className="bg-[var(--bg-light)] border-t border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <Wordmark name={home.companyName} />
            <p className="text-sm text-gray-500 mt-2">{home.footerNote}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
            {home.products.map((p) => (
              <ProductLink key={p.name} link={{ ...p.primary, label: p.name }} className="hover:text-[var(--navy)]" />
            ))}
            <Link href="/contact" className="hover:text-[var(--navy)]">{home.nav.contact}</Link>
            <a href={`mailto:${config.supportEmail}`} className="hover:text-[var(--navy)]">{config.supportEmail}</a>
          </div>
        </div>
        <div className="border-t border-orange-100">
          <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {copyrightHolder(config)}. {s.footer.copyright} {config.registrationLabel} {config.registrationNumber}
            <ManageCookiesLink className="ml-4 text-gray-500 hover:text-[var(--navy)] transition-colors" />
          </p>
        </div>
      </footer>
    </>
  )
}

function Wordmark({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="w-8 h-8 rounded-lg bg-[var(--accent)] text-white font-bold flex items-center justify-center text-lg">
        {name.charAt(0)}
      </span>
      <span className="text-xl font-bold text-[var(--navy)] tracking-tight">{name}</span>
    </span>
  )
}

function ProductIcon({ product, className }: { product: CompanyHomeProduct; className: string }) {
  return product.tone === 'teal' ? <Video className={className} /> : <FileSearch className={className} />
}

function HeroCard({ product, index }: { product: CompanyHomeProduct; index: number }) {
  const t = tones[product.tone]
  const position = index === 0 ? 'top-4 left-0 rotate-[-3deg]' : 'bottom-4 right-0 rotate-[3deg]'
  return (
    <div className={`absolute ${position} w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-6`}>
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${t.icon}`}>
          <ProductIcon product={product} className="w-5 h-5" />
        </div>
        <div>
          <p className="font-bold text-[var(--navy)]">{product.name}</p>
          <p className={`text-xs font-medium ${t.tagline}`}>{product.tagline}</p>
        </div>
      </div>
      <ul className="mt-4 space-y-2">
        {product.points.slice(0, 2).map((point) => (
          <li key={point} className="flex items-start gap-2 text-xs text-gray-500">
            <Check className={`w-4 h-4 mt-0.5 shrink-0 ${t.check}`} />
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProductCard({ product }: { product: CompanyHomeProduct }) {
  const t = tones[product.tone]
  return (
    <article className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col transition ${t.ring}`}>
      <div className={`${t.band} px-8 py-6 flex items-center gap-4`}>
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${t.icon}`}>
          <ProductIcon product={product} className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[var(--navy)]">{product.name}</h3>
          <p className={`text-sm font-semibold ${t.tagline}`}>{product.tagline}</p>
        </div>
      </div>
      <div className="px-8 py-7 flex flex-col flex-1">
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
        <ul className="mt-6 space-y-3 flex-1">
          {product.points.map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm text-gray-600">
              <Check className={`w-5 h-5 shrink-0 ${t.check}`} />
              {point}
            </li>
          ))}
        </ul>
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <ProductLink
            link={product.primary}
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${t.primary}`}
          />
          {product.secondary && (
            <ProductLink
              link={product.secondary}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold border border-gray-200 text-[var(--navy)] hover:bg-gray-50 transition-colors"
            />
          )}
        </div>
      </div>
    </article>
  )
}

function ProductLink({ link, className }: { link: CompanyHomeLink; className: string }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={`${className} inline-flex items-center gap-1`}>
        {link.label}
        <ExternalLink className="w-4 h-4" />
      </a>
    )
  }
  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  )
}
