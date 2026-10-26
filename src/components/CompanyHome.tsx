import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import ManageCookiesLink from '@/components/ManageCookiesLink'
import { getResellerConfig } from '@/lib/config'
import { siteOrigin } from '@/lib/site-origin'
import { copyrightHolder } from '@/lib/company-home'
import type { CompanyHomeLink, CompanyHomeProduct } from '../../config/types'

// Company page shown on "/" when the brand config has `companyHome`
// (auditelle.fr: Auditelle SASU with Lettrine and VigiExam). Visual direction
// "Papier & encre" (2026-10-26): cream paper, serif headings, flat cards with a
// thin top rule in the product colour, terracotta drop cap. Tokens come from
// the 'paper' skin in globals.css. All copy lives in config under `companyHome`.

const productColor: Record<CompanyHomeProduct['tone'], string> = {
  accent: 'var(--accent)',
  teal: 'var(--vigi)',
}

// Button fill: same hue, dark enough for white text (WCAG AA).
const productButton: Record<CompanyHomeProduct['tone'], string> = {
  accent: 'var(--accent)',
  teal: 'var(--vigi-dark)',
}

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
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--paper)]/95 backdrop-blur-sm border-b border-[var(--paper-line)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[4.5rem]">
            <Link href="/" aria-label={config.legalEntity} className="brand-wordmark text-[1.75rem] text-[var(--ink)]">
              {home.companyName}
            </Link>
            <div className="flex items-center gap-6 sm:gap-8">
              <a href="#produits" className="hidden sm:inline text-[0.95rem] text-[var(--ink-soft)] hover:text-[var(--accent)] transition-colors">
                {home.nav.products}
              </a>
              <a href="#qui-sommes-nous" className="hidden sm:inline text-[0.95rem] text-[var(--ink-soft)] hover:text-[var(--accent)] transition-colors">
                {home.nav.about}
              </a>
              <Link
                href="/contact"
                className="bg-[var(--accent)] text-white px-[1.125rem] py-2.5 rounded-[6px] text-[0.95rem] font-semibold hover:bg-[var(--accent-hover)] transition-colors"
              >
                {home.nav.contact}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <p className="small-caps-label mb-8">{home.hero.badge}</p>
            <div className="flow-root">
              <span aria-hidden="true" className="drop-cap text-[8.5rem] sm:text-[11rem] lg:text-[13.5rem] mr-4 sm:mr-5 -ml-1 mt-2 sm:mt-4 lg:mt-[1.75rem]">
                {home.companyName.charAt(0)}
              </span>
              <h1 className="text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] leading-[1.06] text-[var(--ink)] pt-1">
                {home.hero.title}
                <em className="not-italic lg:italic text-[var(--accent)]">{home.hero.titleAccent}</em>
              </h1>
            </div>
            <p className="text-lg leading-relaxed text-[var(--ink-soft)] mt-8 max-w-2xl">{home.hero.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-9">
              <a
                href="#produits"
                className="inline-flex items-center justify-center gap-2 bg-[var(--accent)] text-white px-6 py-3.5 rounded-[6px] font-semibold hover:bg-[var(--accent-hover)] transition-colors"
              >
                {home.hero.ctaPrimary}
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-[6px] font-semibold border-[1.5px] border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-light)] transition-colors"
              >
                {home.hero.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {home.products.map((product) => (
              <HeroCard key={product.name} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-y border-[var(--paper-line)] bg-[var(--paper-card)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-3 md:divide-x divide-[var(--paper-line)]">
          {home.principles.map((p, i) => (
            <div key={p.title} className="py-9 md:px-8 first:md:pl-0 last:md:pr-0 border-b md:border-b-0 border-[var(--paper-line)] last:border-b-0">
              <p className="small-caps-label mb-2">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="text-[1.35rem] leading-snug text-[var(--ink)]">{p.title}</h2>
              <p className="text-[0.95rem] text-[var(--ink-soft)] mt-2 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="produits" className="py-24 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-14">
            <p className="small-caps-label mb-3">{home.nav.products}</p>
            <h2 className="text-[2.4rem] sm:text-[2.8rem] leading-tight text-[var(--ink)]">{home.productsTitle}</h2>
            <p className="text-lg text-[var(--ink-soft)] mt-4 leading-relaxed">{home.productsSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {home.products.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="qui-sommes-nous" className="py-24 border-t border-[var(--paper-line)] scroll-mt-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid md:grid-cols-[1.4fr_1fr] gap-14 items-start">
          <div>
            <p className="small-caps-label mb-3">{home.companyName}</p>
            <h2 className="text-[2.4rem] sm:text-[2.8rem] leading-tight text-[var(--ink)]">{home.about.title}</h2>
            <p className="text-lg text-[var(--ink-soft)] mt-6 leading-relaxed">{home.about.body}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-8 bg-[var(--accent)] text-white px-6 py-3.5 rounded-[6px] font-semibold hover:bg-[var(--accent-hover)] transition-colors"
            >
              {home.about.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <dl className="bg-[var(--paper-card)] border border-[var(--paper-line)] rounded-[4px] shadow-[6px_6px_0_var(--paper-shadow)] px-7 py-5">
            {home.about.facts.map((fact) => (
              <div key={fact.label} className="flex items-baseline justify-between gap-4 py-3 border-b border-dotted border-[var(--paper-line)] last:border-0">
                <dt className="text-sm text-[var(--ink-muted)]">{fact.label}</dt>
                <dd className="text-[0.95rem] font-semibold text-[var(--ink)] text-right break-all">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Footer (light) */}
      <footer className="bg-[var(--paper-deep)] border-t border-[var(--paper-line)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <span className="brand-wordmark text-[1.5rem] text-[var(--ink)]">{home.companyName}</span>
            <p className="text-sm text-[var(--ink-muted)] mt-2">{home.footerNote}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.95rem] text-[var(--ink-soft)]">
            {home.products.map((p) => (
              <ProductLink key={p.name} link={{ ...p.primary, label: p.name }} className="hover:text-[var(--accent)]" plain />
            ))}
            <Link href="/contact" className="hover:text-[var(--accent)]">{home.nav.contact}</Link>
            <a href={`mailto:${config.supportEmail}`} className="hover:text-[var(--accent)]">{config.supportEmail}</a>
          </div>
        </div>
        <div className="border-t border-[var(--paper-line)]">
          <p className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-5 text-xs text-[var(--ink-muted)]">
            &copy; {new Date().getFullYear()} {copyrightHolder(config)}. {s.footer.copyright} {config.registrationLabel} {config.registrationNumber}
            <ManageCookiesLink className="ml-4 text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors" />
          </p>
        </div>
      </footer>
    </div>
  )
}

function HeroCard({ product }: { product: CompanyHomeProduct }) {
  return (
    <article
      className="bg-[var(--paper-card)] border border-[var(--paper-line)] rounded-[4px] shadow-[6px_6px_0_var(--paper-shadow)] px-7 py-6"
      style={{ borderTop: `5px solid ${productColor[product.tone]}` }}
    >
      <p className="brand-wordmark text-[1.65rem] text-[var(--ink)]">{product.name}</p>
      <p className="small-caps-label mt-2">{product.tagline}</p>
      <p className="text-[0.98rem] leading-relaxed text-[var(--ink-soft)] mt-3">{product.summary}</p>
      <ProductLink
        link={product.primary}
        className="mt-4 font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]"
      />
    </article>
  )
}

function ProductCard({ product }: { product: CompanyHomeProduct }) {
  const color = productColor[product.tone]
  return (
    <article
      className="bg-[var(--paper-card)] border border-[var(--paper-line)] rounded-[4px] shadow-[6px_6px_0_var(--paper-shadow)] flex flex-col"
      style={{ borderTop: `5px solid ${color}` }}
    >
      <div className="px-8 pt-8">
        <h3 className="brand-wordmark text-[2.1rem] text-[var(--ink)]">{product.name}</h3>
        <p className="small-caps-label mt-3">{product.tagline}</p>
      </div>
      <div className="px-8 pb-8 pt-5 flex flex-col flex-1">
        <p className="text-[var(--ink-soft)] leading-relaxed">{product.description}</p>
        <ul className="mt-6 space-y-3 flex-1 border-t border-[var(--paper-line)] pt-5">
          {product.points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-[0.95rem] text-[var(--ink-soft)]">
              <span aria-hidden="true" className="mt-[0.55rem] w-2 h-2 shrink-0 rotate-45" style={{ background: color }} />
              {point}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3 mt-8">
          <ProductLink
            link={product.primary}
            className="justify-center whitespace-nowrap px-5 py-3 rounded-[6px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: productButton[product.tone] }}
          />
          {product.secondary && (
            <ProductLink
              link={product.secondary}
              className="justify-center whitespace-nowrap px-5 py-3 rounded-[6px] font-semibold border-[1.5px] border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-light)] transition-colors"
            />
          )}
        </div>
      </div>
    </article>
  )
}

function ProductLink({
  link,
  className,
  style,
  plain = false,
}: {
  link: CompanyHomeLink
  className: string
  style?: React.CSSProperties
  plain?: boolean
}) {
  if (plain) {
    return link.external ? (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>{link.label}</a>
    ) : (
      <Link href={link.href} className={className}>{link.label}</Link>
    )
  }
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 ${className}`} style={style}>
        {link.label}
        <ArrowUpRight className="w-4 h-4" />
      </a>
    )
  }
  return (
    <Link href={link.href} className={`inline-flex items-center gap-1.5 ${className}`} style={style}>
      {link.label}
      <ArrowRight className="w-4 h-4" />
    </Link>
  )
}
