import Link from 'next/link'
import ManageCookiesLink from '@/components/ManageCookiesLink'
import { getResellerConfig } from '@/lib/config'
import {
  Shield,
  Layers,
  FileText,
  ScrollText,
  Ruler,
  Cpu,
  Lock,
  Check,
  ArrowRight,
  GraduationCap,
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Verify pour les établissements — La couche d’intégrité académique (pilote de 30 jours)',
  description:
    "Verify aide les établissements à passer de la charte à la mesure : détection IA et plagiat, rapport exportable. Données hébergées dans l'UE (Supabase, Paris). Diagnostic gratuit et pilote de 30 jours pour les équipes pédagogiques.",
  openGraph: {
    title: 'Verify pour les établissements — Couche d’intégrité académique',
    description:
      'De la charte à la mesure : détection IA et plagiat, rapport exportable, données hébergées dans l’UE. Demandez un diagnostic gratuit.',
    type: 'website',
    locale: 'fr_FR',
  },
  alternates: {
    canonical: 'https://www.auditelle.fr/etablissements',
  },
}

export default async function EtablissementsPage() {
  const config = await getResellerConfig()
  const pilot = config.institutionalPilot
  const ctaDiagnostic = pilot?.ctaDiagnostic ?? 'Demander un diagnostic gratuit'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${config.name} pour les établissements`,
    description:
      "Couche d'intégrité académique pour les établissements français : détection IA Pangram, plagiat, rapport exportable.",
    url: 'https://www.auditelle.fr/etablissements',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Minimal sticky nav — institutional, conversion focused */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              {config.logoColor ? (
                <img src={config.logoColor} alt={config.name} style={{ height: config.logoHeight || '2rem' }} />
              ) : (
                <span className="text-xl font-bold text-[var(--navy)]">{config.name}</span>
              )}
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/contact?subject=D%C3%A9monstration"
                className="hidden sm:inline text-sm font-medium text-gray-700 hover:text-navy transition-colors"
              >
                Demander une démo
              </Link>
              <Link
                href="/contact?subject=Diagnostic"
                className="bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-accent-hover transition-colors"
              >
                {ctaDiagnostic}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero — de la charte à la mesure ──────────────────────────────── */}
      <section className="gradient-hero pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--accent-light)] text-[var(--accent)] text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <GraduationCap className="w-4 h-4" />
            Pour les établissements et leurs équipes pédagogiques
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--navy)] leading-tight">
            De la charte à la{' '}
            <span className="text-[var(--accent)]">mesure</span>
          </h1>
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
            Votre établissement a une charte sur l&apos;usage de l&apos;IA. {config.name} la rend
            mesurable : une couche d&apos;intégrité qui aide vos enseignants à objectiver
            l&apos;usage de l&apos;IA dans les travaux, sans rendre de verdict à leur place.
          </p>

          <div className="flex flex-wrap gap-6 mt-8 justify-center">
            {[
              'Détection IA + plagiat',
              'Couche d’intégrité, pas un verdict',
              'Rapport exportable',
              'Données hébergées dans l’UE',
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                {badge}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/contact?subject=Diagnostic"
              className="btn-primary text-lg px-10 py-4 rounded-xl shadow-lg shadow-orange-500/25 inline-flex items-center gap-2"
            >
              {ctaDiagnostic}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#pilote" className="btn-secondary text-lg px-8 py-4 rounded-xl">
              {pilot?.ctaPilot ?? 'Voir le pilote'}
            </a>
          </div>
        </div>
      </section>

      {/* ── Posture : couche d'intégrité, pas verdict ────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
            Une couche d&apos;intégrité,{' '}
            <span className="text-[var(--accent)]">pas un verdict</span>
          </h2>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed">
            {config.name} ne décide pas à la place de l&apos;enseignant et ne sanctionne personne.
            Il fournit un signal mesuré et un rapport clair pour nourrir le dialogue
            pédagogique. La décision reste humaine, éclairée par la donnée.
          </p>
        </div>
      </section>

      {/* ── Ce que la couche apporte ─────────────────────────────────────── */}
      <section className="py-24 px-4 bg-[var(--bg-light)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              Ce que {config.name} apporte à votre établissement
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ScrollText className="w-8 h-8" />}
              title="De la charte à la mesure"
              description="Traduisez votre politique sur l'IA en indicateurs concrets et reproductibles, au lieu d'un texte que personne ne peut appliquer."
            />
            <FeatureCard
              icon={<Cpu className="w-8 h-8" />}
              title="Détection IA + plagiat"
              description="Un moteur de détection reconnu (Pangram Labs) et une recherche de plagiat dans le même rapport."
            />
            <FeatureCard
              icon={<Ruler className="w-8 h-8" />}
              title="Un signal, pas une sentence"
              description="Un score d'intégrité et une analyse par section qui éclairent la décision de l'enseignant, sans la remplacer."
            />
            <FeatureCard
              icon={<FileText className="w-8 h-8" />}
              title="Rapport exportable"
              description="Exportez un rapport clair (PDF/CSV) à joindre au dossier d'évaluation ou à partager avec un jury."
            />
            <FeatureCard
              icon={<Lock className="w-8 h-8" />}
              title="Données stockées dans l’UE"
              description="Les données sont stockées dans l'Union européenne (Supabase, région Paris). Conformité RGPD au cœur du produit."
            />
            <FeatureCard
              icon={<Layers className="w-8 h-8" />}
              title="Pensé pour les équipes"
              description="Un outil que vos enseignants utilisent directement dans le navigateur. Aucune installation, prise en main immédiate."
            />
          </div>
        </div>
      </section>

      {/* ── RGPD — honnête ───────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="card border-l-4 border-l-[var(--accent)]">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-[var(--accent)] shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-[var(--navy)] mb-2">
                  RGPD : ce que nous garantissons aujourd&apos;hui
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Les données de vos analyses sont <strong>stockées dans l&apos;Union européenne</strong>{' '}
                  (Supabase, région Paris). {config.name} est édité par {config.legalEntity},
                  société française ({config.registrationLabel} {config.registrationNumber}).
                  Lors d&apos;un pilote, nous vous communiquons en toute transparence le détail
                  des traitements et des éventuels sous-traitants techniques, pour que votre
                  DPO puisse valider la mise en conformité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pilote payant ─────────────────────────────────────────────────── */}
      {pilot && (
        <section id="pilote" className="py-24 px-4 bg-[var(--bg-light)] scroll-mt-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
                Comment se déroule le pilote
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepCard
                number="1"
                title={pilot.diagnosticTitle}
                description={pilot.diagnosticDescription}
              />
              <StepCard
                number="2"
                title={`Pilote de ${pilot.duration} (${pilot.price})`}
                description="Vos équipes analysent leurs travaux réels avec Verify, accompagnées par notre protocole de lecture des signaux."
              />
              <StepCard
                number="3"
                title="Décision de déploiement"
                description="Le bilan final vous donne les éléments pour décider, en connaissance de cause, d'un déploiement à l'échelle de l'établissement."
              />
            </div>

            <div className="card mt-14 max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
                <h3 className="text-2xl font-bold text-[var(--navy)]">{pilot.title}</h3>
                <div className="sm:text-right">
                  <p className="text-3xl font-bold text-[var(--navy)]">{pilot.price}</p>
                  <p className="text-sm text-gray-500">{pilot.priceNote}</p>
                </div>
              </div>
              <ul className="space-y-3">
                {pilot.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm font-semibold text-gray-500 mt-6 mb-2">Non inclus</p>
              <ul className="space-y-1">
                {pilot.excludes.map((item) => (
                  <li key={item} className="text-sm text-gray-500">{item}</li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  href="/contact?subject=Diagnostic"
                  className="btn-primary px-8 py-3 inline-flex items-center justify-center gap-2"
                >
                  {pilot.ctaDiagnostic}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact?subject=Pilote"
                  className="btn-secondary px-8 py-3 inline-flex items-center justify-center"
                >
                  Commander le pilote
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="gradient-hero py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Rendez votre charte mesurable
          </h2>
          <p className="text-gray-300 mt-4 text-lg">
            Commencez par un diagnostic gratuit de 20 minutes, ou demandez une démo adaptée à
            votre établissement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/contact?subject=Diagnostic"
              className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2"
            >
              {ctaDiagnostic}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact?subject=D%C3%A9monstration"
              className="btn-secondary text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Demander une démo
            </Link>
          </div>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="bg-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {config.name}. Tous droits réservés. {config.legalEntity} &mdash; {config.registrationLabel} {config.registrationNumber}
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <a href={`mailto:${config.supportEmail}`} className="hover:text-white transition-colors">{config.supportEmail}</a>
            <ManageCookiesLink className="hover:text-white transition-colors" />
          </div>
        </div>
      </footer>
    </>
  )
}

/* ── Local components ────────────────────────────────────────────────── */

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="card group">
      <div className="w-14 h-14 rounded-xl bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center mb-4 group-hover:bg-[var(--accent)] group-hover:text-white transition">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[var(--navy)] mb-2">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{description}</p>
    </div>
  )
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-14 h-14 rounded-full bg-[var(--accent)] text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-lg font-bold text-[var(--navy)] mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  )
}
