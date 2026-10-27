import { publicTesterHref } from '@/lib/public-demo-flow'
import Link from 'next/link'
import ManageCookiesLink from '@/components/ManageCookiesLink'
import { getResellerConfig } from '@/lib/config'
import BrandMark from '@/components/BrandMark'
import { copyrightHolder, productHomePath } from '@/lib/company-home'
import { Shield, Brain, FileSearch, BarChart3, Zap, GraduationCap, Check, Clock, Users, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lettrine pour les enseignants — Détectez le contenu IA dans les travaux étudiants',
  description:
    'Outil de détection IA pour les enseignants, motorisé par Pangram Labs. Vérifiez les copies en quelques secondes. Données stockées dans l’UE. Support français.',
  openGraph: {
    title: 'Lettrine pour les enseignants — Détectez le contenu IA',
    description:
      'Vérifiez les travaux étudiants en quelques secondes. Un signal, pas un verdict.',
    type: 'website',
    locale: 'fr_FR',
  },
  alternates: {
    canonical: 'https://www.auditelle.fr/professeurs',
  },
}

export default async function ProfesseursPage() {
  const config = await getResellerConfig()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${config.name} pour les enseignants`,
    description: 'Outil de détection IA pour enseignants et universités françaises',
    url: 'https://www.auditelle.fr/professeurs',
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: config.name,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0.50',
        priceCurrency: 'EUR',
        description: 'Paiement à l’analyse, sans abonnement',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Minimal sticky nav — conversion focused, no distractions */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href={productHomePath(config)} className="flex items-center">
              <BrandMark config={config} />
            </Link>
            <Link
              href={publicTesterHref(config)}
              className="bg-accent text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-accent-hover transition-colors"
            >
              {config.strings.nav.freeTrial}
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero — strong above-the-fold ─────────────────────────────────── */}
      <section className="gradient-hero pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--accent-light)] text-[var(--accent)] text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <GraduationCap className="w-4 h-4" />
            Conçu pour les enseignants
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--navy)] leading-tight">
            Détectez le contenu IA dans les{' '}
            <span className="text-[var(--accent)]">travaux étudiants</span>
          </h1>
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
            Vérifiez les copies, mémoires et rapports en quelques secondes.
            Un signal à interpréter, pas un verdict.
            Données stockées dans l&apos;UE.
          </p>

          <div className="flex flex-wrap gap-6 mt-8 justify-center">
            {[
              'Moteur Pangram Labs',
              'Un signal, pas un verdict',
              'Données stockées dans l’UE',
              'Support français',
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
              Créer un compte
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact?subject=D%C3%A9monstration%20pour%20mon%20%C3%A9tablissement"
              className="btn-secondary text-lg px-8 py-4 rounded-xl"
            >
              Demander une démo
            </Link>
          </div>

          <p className="text-sm text-gray-400 mt-4">
            Sans carte bancaire &middot; 3 tests publics gratuits par jour et par IP, sans compte
          </p>
        </div>
      </section>

      {/* ── Problem statement ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
            ChatGPT a changé la donne.<br />
            <span className="text-[var(--accent)]">Vos outils doivent suivre.</span>
          </h2>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed">
            Depuis novembre 2022, les enseignants font face à un défi sans précédent :
            comment distinguer un travail étudiant authentique d&apos;un texte généré par IA ?
            Un score seul ne suffit pas : il faut un signal clair, et une lecture humaine avant toute décision.
          </p>
        </div>
      </section>

      {/* ── Key features for professors ──────────────────────────────────── */}
      <section className="py-24 px-4 bg-[var(--bg-light)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              Tout ce dont vous avez besoin pour protéger l&apos;intégrité académique
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="Score de probabilité IA"
              description="Obtenez un score précis pour chaque document. Sachez immédiatement si le texte est humain ou généré par IA."
            />
            <FeatureCard
              icon={<FileSearch className="w-8 h-8" />}
              title="Identification du modèle"
              description="Détectez quel modèle a été utilisé : ChatGPT, Claude, Gemini, Llama, Perplexity et bien d'autres."
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8" />}
              title="Analyse par section"
              description="Comprenez quelles parties sont IA et lesquelles sont humaines. Idéal pour les travaux partiellement assistés."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Détection de plagiat"
              description="Recherche parmi des milliards de pages pour détecter le plagiat en plus de l'IA. Tout-en-un."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Un signal, pas un verdict"
              description="Ne punissez jamais un étudiant sur la seule base d'un score. Lettrine vous aide à ouvrir la discussion, pas à la conclure."
            />
            <FeatureCard
              icon={<Clock className="w-8 h-8" />}
              title="Résultats en secondes"
              description="Collez le texte ou uploadez un fichier PDF/DOCX. Obtenez un rapport détaillé en moins de 10 secondes."
            />
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              Simple comme 1, 2, 3
            </h2>
            <p className="text-gray-500 mt-4 text-lg">
              Aucune installation nécessaire. Fonctionne directement dans votre navigateur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Collez le texte ou importez le fichier"
              description="Copiez-collez le contenu du travail étudiant ou importez directement le fichier PDF ou Word."
            />
            <StepCard
              number="2"
              title="Lancez l'analyse"
              description="Notre moteur analyse chaque phrase avec la technologie Pangram Labs, évaluée de façon indépendante."
            />
            <StepCard
              number="3"
              title="Consultez le rapport détaillé"
              description="Score IA global, identification du modèle, analyse section par section. Tout ce qu'il faut pour prendre une décision éclairée."
            />
          </div>
        </div>
      </section>

      {/* ── Testimonials / Social proof ───────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              Ce qu&apos;ils disent du moteur Pangram
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <TestimonialCard
              quote="Parmi les détecteurs automatiques, ce système surpasse significativement tous les autres."
              author="Dr. Jenna Russell"
              role="University of Maryland, à propos du moteur Pangram Labs"
            />
          </div>

        </div>
      </section>

      {/* ── Use cases ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-[var(--bg-light)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              Adapté à tous les niveaux d&apos;enseignement
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <UseCaseCard
              icon={<GraduationCap className="w-8 h-8" />}
              title="Universités"
              items={['Mémoires et thèses', 'Travaux dirigés', 'Examens écrits', 'Rapports de stage']}
            />
            <UseCaseCard
              icon={<Users className="w-8 h-8" />}
              title="Grandes écoles"
              items={['Études de cas', 'Business plans', 'Projets de groupe', 'Examens de synthèse']}
            />
            <UseCaseCard
              icon={<Shield className="w-8 h-8" />}
              title="Lycées & BTS"
              items={['Dissertations', 'Commentaires composés', 'Rapports de stage', 'Préparation au grand oral']}
            />
            <UseCaseCard
              icon={<BarChart3 className="w-8 h-8" />}
              title="Formation pro"
              items={['Évaluations certifiantes', 'Mémoires professionnels', 'Études de terrain', 'Rapports de mission']}
            />
          </div>
        </div>
      </section>

      {/* ── Pricing (simple) ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              Tarification simple et transparente
            </h2>
            <p className="text-gray-500 mt-4 text-lg">
              Commencez gratuitement. Évoluez quand vous en avez besoin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <PricingCard
              name="À l’analyse"
              price="0,50"
              features={[
                '0,50 € par analyse',
                'Aucun engagement',
                'Identification du modèle',
                'Les crédits n’expirent jamais',
              ]}
              cta="Créer un compte"
              href="/signup"
            />
            <PricingCard
              name="Professionnel"
              price="25"
              period="/mois"
              features={[
                '1 000 analyses par mois',
                'Export PDF/CSV',
                'Détection de plagiat',
                'Support email prioritaire',
                'Historique 30 jours',
              ]}
              cta="Choisir Professionnel"
              href="/signup?plan=pro"
              popular
            />
            <PricingCard
              name="Établissements"
              price="1 500 € HT"
              rawPrice
              features={[
                'Pilote de 30 jours, puis déploiement sur devis',
                '5 utilisateurs, jusqu’à 100 unités d’analyse',
                'Onboarding et protocole de lecture des signaux',
                'Bilan final et recommandation de déploiement',
              ]}
              cta="Découvrir le pilote"
              href="/etablissements"
            />
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            Abonnement mensuel résiliable à tout moment. Paiement sécurisé par Stripe. Établissements : sur facture.
          </p>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-[var(--bg-light)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)] text-center mb-16">
            Questions fréquentes
          </h2>

          <div className="space-y-6">
            <FaqItem
              question={`${config.name} est-il fiable pour prendre des décisions académiques ?`}
              answer="Le score est un signal, pas une preuve. Le moteur Pangram Labs a été évalué de façon indépendante (University of Maryland), mais aucune décision académique ne doit reposer sur le seul score : combinez-le toujours avec un entretien et votre jugement pédagogique."
            />
            <FaqItem
              question="Les données de mes étudiants sont-elles protégées ?"
              answer="Les comptes et l'historique des analyses sont stockés dans l'Union européenne (Paris). L'analyse elle-même est effectuée par notre fournisseur de détection, Pangram Labs. Contactez-nous pour le détail des sous-traitants et de la durée de conservation."
            />
            <FaqItem
              question="Quels modèles d'IA sont détectés ?"
              answer={`${config.name} détecte ChatGPT (GPT-3.5, GPT-4, GPT-4o), Claude, Gemini, Llama, Mistral, Perplexity et la plupart des modèles de langage actuels, y compris les textes paraphrasés par des outils de reformulation.`}
            />
            <FaqItem
              question="Puis-je integrer Lettrine dans notre LMS (Moodle, Canvas) ?"
              answer="Pas encore. Nous étudions les intégrations LMS avec nos premiers établissements pilotes."
            />
            <FaqItem
              question="L'analyse fonctionne-t-elle en français ?"
              answer={`Oui. ${config.name} détecte le contenu IA dans de nombreuses langues, dont le français, l'anglais, l'espagnol, l'allemand et le portugais.`}
            />
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="gradient-hero py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
            Protégez l&apos;intégrité de vos évaluations
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            Créez un compte et payez uniquement les analyses que vous lancez, sans abonnement ni engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/signup"
              className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2"
            >
              Créer un compte gratuit
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact?subject=D%C3%A9monstration"
              className="btn-secondary text-lg px-8 py-4"
            >
              Demander une démo
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Sans carte bancaire &middot; Configuration en 30 secondes
          </p>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="bg-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {copyrightHolder(config)}. Tous droits réservés.{' '}
            {copyrightHolder(config) === config.legalEntity ? '' : <>{config.legalEntity} &mdash; </>}
            {config.registrationLabel} {config.registrationNumber}
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

function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <div className="card">
      <div className="text-[var(--accent)] text-4xl font-serif mb-4">&ldquo;</div>
      <p className="text-gray-600 leading-relaxed italic">{quote}</p>
      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="font-semibold text-[var(--navy)]">{author}</p>
        <p className="text-sm text-gray-400">{role}</p>
      </div>
    </div>
  )
}

function UseCaseCard({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <div className="card">
      <div className="w-14 h-14 rounded-xl bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[var(--navy)] mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function PricingCard({
  name,
  price,
  period,
  features,
  cta,
  href,
  popular,
  rawPrice,
}: {
  name: string
  price: string
  rawPrice?: boolean
  period?: string
  features: string[]
  cta: string
  href: string
  popular?: boolean
}) {
  return (
    <div className={`card relative ${popular ? 'border-2 border-[var(--accent)] shadow-xl' : ''}`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white text-xs font-bold px-4 py-1 rounded-full">
          POPULAIRE
        </div>
      )}
      <h3 className="text-lg font-bold text-[var(--navy)]">{name}</h3>
      <div className="mt-4 mb-6">
        <span className="text-4xl font-bold text-[var(--navy)]">
          {price}
          {!rawPrice && <>&euro;</>}
        </span>
        {period && <span className="text-gray-500">{period}</span>}
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className={`block text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
          popular
            ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]'
            : 'bg-gray-100 text-[var(--navy)] hover:bg-gray-200'
        }`}
      >
        {cta}
      </Link>
    </div>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group card">
      <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-[var(--navy)]">
        {question}
        <span className="ml-4 text-gray-400 group-open:rotate-45 transition-transform text-xl">+</span>
      </summary>
      <p className="mt-4 text-gray-600 leading-relaxed">{answer}</p>
    </details>
  )
}
