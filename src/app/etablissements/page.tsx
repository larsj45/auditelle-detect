import Link from 'next/link'
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
  title: 'Verify pour les établissements — La couche d’intégrité académique (pilote gratuit)',
  description:
    "Verify aide les établissements à passer de la charte à la mesure : détection IA multi-moteur, plagiat et rapport exportable. Données stockées dans l'UE (Supabase, Paris). Pilote gratuit pour les équipes pédagogiques.",
  openGraph: {
    title: 'Verify pour les établissements — Couche d’intégrité académique',
    description:
      'De la charte à la mesure : détection IA multi-moteur, rapport exportable, données stockées dans l’UE. Démarrez un pilote gratuit.',
    type: 'website',
    locale: 'fr_FR',
  },
  alternates: {
    canonical: 'https://auditelle.fr/etablissements',
  },
}

export default async function EtablissementsPage() {
  const config = await getResellerConfig()
  const pilotCredits = config.institutionalPilotCredits ?? 20

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${config.name} pour les établissements`,
    description:
      "Couche d'intégrité académique pour les établissements français : détection IA multi-moteur, plagiat, rapport exportable.",
    url: 'https://auditelle.fr/etablissements',
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
                href="/contact?subject=Demande%20de%20d%C3%A9mo%20%C3%A9tablissement"
                className="hidden sm:inline text-sm font-medium text-gray-700 hover:text-navy transition-colors"
              >
                Demander une démo
              </Link>
              <Link
                href="/signup"
                className="bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-accent-hover transition-colors"
              >
                Démarrer le pilote gratuit
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
              'Détection IA multi-moteur',
              'Couche d’intégrité, pas un verdict',
              'Rapport exportable',
              'Données stockées dans l’UE',
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                {badge}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/signup"
              className="btn-primary text-lg px-10 py-4 rounded-xl shadow-lg shadow-orange-500/25 inline-flex items-center gap-2"
            >
              Démarrer le pilote gratuit
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact?subject=Demande%20de%20d%C3%A9mo%20%C3%A9tablissement"
              className="btn-secondary text-lg px-8 py-4 rounded-xl"
            >
              Demander une démo
            </Link>
          </div>

          <p className="text-sm text-gray-400 mt-4">
            Pilote gratuit de {pilotCredits} analyses avec votre email institutionnel &middot; sans carte bancaire
          </p>
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
              title="Détection multi-moteur"
              description="Plusieurs moteurs de détection, pas un seul point de vue. Vous obtenez un signal plus robuste et moins dépendant d'un fournisseur unique."
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

      {/* ── Comment se déroule un pilote ─────────────────────────────────── */}
      <section className="py-24 px-4 bg-[var(--bg-light)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              Comment se déroule le pilote
            </h2>
            <p className="text-gray-500 mt-4 text-lg">
              Gratuit, sans engagement, prêt en quelques minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Créez un compte avec votre email institutionnel"
              description={`Avec une adresse de votre établissement, vous recevez automatiquement un pilote de ${pilotCredits} analyses.`}
            />
            <StepCard
              number="2"
              title="Analysez vos travaux"
              description="Collez un texte ou uploadez un fichier. Obtenez un score d'intégrité, l'identification du modèle et l'analyse par section."
            />
            <StepCard
              number="3"
              title="Partagez les résultats"
              description="Exportez le rapport, évaluez la valeur pour vos équipes, puis échangeons sur un déploiement à l'échelle de l'établissement."
            />
          </div>

          <div className="text-center mt-14">
            <Link
              href="/signup"
              className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2"
            >
              Démarrer le pilote gratuit
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="gradient-hero py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Rendez votre charte mesurable
          </h2>
          <p className="text-gray-300 mt-4 text-lg">
            Démarrez un pilote gratuit avec vos équipes, ou demandez une démo adaptée à
            votre établissement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/signup"
              className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2"
            >
              Démarrer le pilote gratuit
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact?subject=Demande%20de%20d%C3%A9mo%20%C3%A9tablissement"
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
