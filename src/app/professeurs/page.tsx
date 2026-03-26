import Link from 'next/link'
import { getResellerConfig } from '@/lib/config'
import { Shield, Brain, FileSearch, BarChart3, Zap, GraduationCap, Check, X, Clock, Users, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Auditelle pour Professeurs — Detectez le contenu IA dans les travaux etudiants',
  description:
    'Outil de detection IA concu pour les enseignants. Verifiez les copies en quelques secondes avec 99,98% de precision. Conforme RGPD. Support francais.',
  openGraph: {
    title: 'Auditelle pour Professeurs — Detectez le contenu IA',
    description:
      'Verifiez les travaux etudiants en quelques secondes. 99,98% de precision. Conforme RGPD.',
    type: 'website',
    locale: 'fr_FR',
  },
  alternates: {
    canonical: 'https://auditelle.fr/professeurs',
  },
}

export default async function ProfesseursPage() {
  const config = await getResellerConfig()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Auditelle pour Professeurs',
    description: 'Outil de detection IA pour enseignants et universites francaises',
    url: 'https://auditelle.fr/professeurs',
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'Auditelle',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        description: 'Essai gratuit - 3 analyses par mois',
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
            <Link href="/" className="flex items-center">
              {config.logoColor ? (
                <img src={config.logoColor} alt={config.name} style={{ height: config.logoHeight || '2rem' }} />
              ) : (
                <span className="text-xl font-bold text-[var(--navy)]">{config.name}</span>
              )}
            </Link>
            <Link
              href="/signup"
              className="bg-accent text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-accent-hover transition-colors"
            >
              Essai gratuit
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero — strong above-the-fold ─────────────────────────────────── */}
      <section className="gradient-hero pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--accent-light)] text-[var(--accent)] text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <GraduationCap className="w-4 h-4" />
            Concu pour les enseignants
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--navy)] leading-tight">
            Detectez le contenu IA dans les{' '}
            <span className="text-[var(--accent)]">travaux etudiants</span>
          </h1>
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
            Verifiez les copies, memoires et rapports en quelques secondes.
            99,98% de precision. Taux de faux positifs quasi nul.
            Conforme RGPD.
          </p>

          <div className="flex flex-wrap gap-6 mt-8 justify-center">
            {[
              '99,98% de precision verifiee',
              'Faux positifs quasi nuls',
              'Conforme RGPD',
              'Support francais',
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
              Creer un compte gratuit
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact?subject=Demonstration%20pour%20mon%20etablissement"
              className="btn-secondary text-lg px-8 py-4 rounded-xl"
            >
              Demander une demo
            </Link>
          </div>

          <p className="text-sm text-gray-400 mt-4">
            Sans carte bancaire &middot; 3 analyses gratuites par mois
          </p>
        </div>
      </section>

      {/* ── Problem statement ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
            ChatGPT a change la donne.<br />
            <span className="text-[var(--accent)]">Vos outils doivent suivre.</span>
          </h2>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed">
            Depuis novembre 2022, les enseignants font face a un defi sans precedent :
            comment distinguer un travail etudiant authentique d&apos;un texte genere par IA ?
            Les outils existants manquent de precision et generent trop de faux positifs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <StatCard number="72%" label="des etudiants utilisent ChatGPT pour leurs travaux" source="Enquete DGESIP 2025" />
            <StatCard number="40%" label="de faux positifs avec les detecteurs classiques" source="Etude U. Maryland" />
            <StatCard number="99,98%" label="de precision avec Auditelle" source="Verifie independamment" />
          </div>
        </div>
      </section>

      {/* ── Key features for professors ──────────────────────────────────── */}
      <section className="py-24 px-4 bg-[var(--bg-light)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              Tout ce dont vous avez besoin pour proteger l&apos;integrite academique
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="Score de probabilite IA"
              description="Obtenez un score precis pour chaque document. Sachez immediatement si le texte est humain ou genere par IA."
            />
            <FeatureCard
              icon={<FileSearch className="w-8 h-8" />}
              title="Identification du modele"
              description="Detectez quel modele a ete utilise : ChatGPT, Claude, Gemini, Llama, Perplexity et bien d'autres."
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8" />}
              title="Analyse par section"
              description="Comprenez quelles parties sont IA et lesquelles sont humaines. Ideal pour les travaux partiellement assistes."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Detection de plagiat"
              description="Recherche parmi des milliards de pages pour detecter le plagiat en plus de l'IA. Tout-en-un."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Faux positifs quasi nuls"
              description="Ne punissez jamais un etudiant innocent. Notre taux de faux positifs est le plus bas du marche, verifie independamment."
            />
            <FeatureCard
              icon={<Clock className="w-8 h-8" />}
              title="Resultats en secondes"
              description="Collez le texte ou uploadez un fichier PDF/DOCX. Obtenez un rapport detaille en moins de 10 secondes."
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
              Aucune installation necessaire. Fonctionne directement dans votre navigateur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Collez le texte ou uploadez le fichier"
              description="Copiez-collez le contenu du travail etudiant ou uploadez directement le fichier PDF ou Word."
            />
            <StepCard
              number="2"
              title="Lancez l'analyse"
              description="Notre moteur analyse chaque phrase avec la technologie Pangram Labs, la plus precise du marche."
            />
            <StepCard
              number="3"
              title="Consultez le rapport detaille"
              description="Score IA global, identification du modele, analyse section par section. Tout ce qu'il faut pour prendre une decision eclairee."
            />
          </div>
        </div>
      </section>

      {/* ── Comparison with alternatives ─────────────────────────────────── */}
      <section className="py-24 px-4 bg-[var(--bg-light)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              Pourquoi les enseignants choisissent Auditelle
            </h2>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
              Comparez avec les alternatives disponibles sur le marche francais.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-500"></th>
                  <th className="py-4 px-4 text-sm font-bold text-center text-[var(--accent)] bg-orange-50 rounded-t-xl">
                    Auditelle
                  </th>
                  <th className="py-4 px-4 text-sm font-bold text-center text-[var(--navy)]">
                    Turnitin AI
                  </th>
                  <th className="py-4 px-4 text-sm font-bold text-center text-[var(--navy)]">
                    GPTZero
                  </th>
                  <th className="py-4 px-4 text-sm font-bold text-center text-[var(--navy)]">
                    Compilatio
                  </th>
                </tr>
              </thead>
              <tbody>
                <ComparisonRow label="Precision IA" values={['99,98%', '~80%', '~85%', '~75%']} />
                <ComparisonRow label="Faux positifs" values={['Quasi nul', 'Modere', 'Eleve', 'Eleve']} />
                <ComparisonRow label="Support en francais" values={[true, false, false, true]} />
                <ComparisonRow label="Identification du modele" values={[true, false, true, false]} />
                <ComparisonRow label="Analyse par section" values={[true, false, false, false]} />
                <ComparisonRow label="Conforme RGPD" values={[true, true, false, true]} />
                <ComparisonRow label="Essai gratuit" values={[true, false, true, false]} />
                <ComparisonRow label="Prix (a partir de)" values={['Gratuit', 'Sur devis', '$9.99/mois', 'Sur devis']} />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Testimonials / Social proof ───────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              Ce que disent les professionnels de l&apos;education
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Parmi les detecteurs automatiques, ce systeme surpasse significativement tous les autres. La precision est remarquable."
              author="Dr. Jenna Russell"
              role="Chercheur, University of Maryland"
            />
            <TestimonialCard
              quote="Mes etudiants sont tellement convaincus de sa precision que c'est devenu le meilleur moyen de dissuasion contre la triche."
              author="Jarred Phillips"
              role="Enseignant, New Roads School"
            />
            <TestimonialCard
              quote="Un detecteur presque surnaturellement bon. Aucun faux positif constate en 6 mois d'utilisation intensive."
              author="Ryan Nicolace"
              role="Cloud Architect & Formateur"
            />
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-16 pt-12 border-t border-gray-100">
            <div className="text-center">
              <p className="text-3xl font-bold text-[var(--navy)]">500+</p>
              <p className="text-sm text-gray-500 mt-1">Enseignants inscrits</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[var(--navy)]">50 000+</p>
              <p className="text-sm text-gray-500 mt-1">Analyses realisees</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[var(--navy)]">99,98%</p>
              <p className="text-sm text-gray-500 mt-1">Precision verifiee</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[var(--navy)]">SOC2</p>
              <p className="text-sm text-gray-500 mt-1">Type 2 certifie</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Use cases ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-[var(--bg-light)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              Adapte a tous les niveaux d&apos;enseignement
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <UseCaseCard
              icon={<GraduationCap className="w-8 h-8" />}
              title="Universites"
              items={['Memoires et theses', 'Travaux diriges', 'Examens ecrits', 'Rapports de stage']}
            />
            <UseCaseCard
              icon={<Users className="w-8 h-8" />}
              title="Grandes ecoles"
              items={['Etudes de cas', 'Business plans', 'Projets de groupe', 'Examens de synthese']}
            />
            <UseCaseCard
              icon={<Shield className="w-8 h-8" />}
              title="Lycees & BTS"
              items={['Dissertations', 'Commentaires composes', 'Rapports de stage', 'Grand oral prep']}
            />
            <UseCaseCard
              icon={<BarChart3 className="w-8 h-8" />}
              title="Formation pro"
              items={['Evaluations certifiantes', 'Memoires professionnels', 'Etudes de terrain', 'Rapports de mission']}
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
              Commencez gratuitement. Evoluez quand vous en avez besoin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <PricingCard
              name="Gratuit"
              price="0"
              features={[
                '3 analyses par mois',
                'Score IA 99,98% precis',
                'Identification du modele',
                'Historique 7 jours',
              ]}
              cta="Commencer gratuitement"
              href="/signup"
            />
            <PricingCard
              name="Professionnel"
              price="25"
              period="/mois"
              features={[
                '1 000 analyses par mois',
                'Export PDF/CSV',
                'Detection de plagiat',
                'Support email prioritaire',
                'Historique 30 jours',
              ]}
              cta="Choisir Professionnel"
              href="/signup?plan=pro"
              popular
            />
            <PricingCard
              name="Universite"
              price="149"
              period="/mois"
              features={[
                '10 000 analyses par mois',
                'Multi-utilisateurs',
                'API & integration LMS',
                'Support prioritaire',
                'Rapports personnalises',
              ]}
              cta="Demander une demo"
              href="/contact?subject=Demo%20plan%20Universite"
            />
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            Facturation mensuelle. Annulation a tout moment. Paiement securise par Stripe.
          </p>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-[var(--bg-light)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)] text-center mb-16">
            Questions frequentes
          </h2>

          <div className="space-y-6">
            <FaqItem
              question="Auditelle est-il fiable pour prendre des decisions academiques ?"
              answer="Oui. Notre technologie est verifiee independamment par l'Universite du Maryland et atteint 99,98% de precision avec un taux de faux positifs quasi nul. Nous recommandons toutefois de toujours combiner le resultat avec votre jugement pedagogique."
            />
            <FaqItem
              question="Les donnees de mes etudiants sont-elles protegees ?"
              answer="Absolument. Auditelle est conforme RGPD. Les textes analyses ne sont pas stockes sur nos serveurs apres l'analyse. Aucune donnee n'est partagee avec des tiers. Hebergement europeen."
            />
            <FaqItem
              question="Quels modeles d'IA sont detectes ?"
              answer="Auditelle detecte ChatGPT (GPT-3.5, GPT-4, GPT-4o), Claude, Gemini, Llama, Mistral, Perplexity et la plupart des modeles de langage actuels, y compris les textes paraphrases par des outils de reformulation."
            />
            <FaqItem
              question="Puis-je integrer Auditelle dans notre LMS (Moodle, Canvas) ?"
              answer="Oui, avec le plan Universite ou Enterprise. Nous proposons une API et des integrations LMS sur mesure. Contactez-nous pour une demonstration."
            />
            <FaqItem
              question="L'analyse fonctionne-t-elle en francais ?"
              answer="Oui. Auditelle detecte le contenu IA dans de nombreuses langues, dont le francais, l'anglais, l'espagnol, l'allemand et le portugais, avec la meme precision."
            />
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="gradient-hero py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Protegez l&apos;integrite de vos evaluations
          </h2>
          <p className="text-gray-300 mt-4 text-lg">
            Rejoignez des centaines d&apos;enseignants qui utilisent Auditelle pour verifier les travaux etudiants. Essai gratuit, sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/signup"
              className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2"
            >
              Creer un compte gratuit
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact?subject=Demonstration%20Auditelle"
              className="btn-secondary text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Demander une demo
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
            &copy; {new Date().getFullYear()} {config.name}. Tous droits reserves. {config.legalEntity} &mdash; {config.registrationLabel} {config.registrationNumber}
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

function StatCard({ number, label, source }: { number: string; label: string; source: string }) {
  return (
    <div className="card text-center p-8">
      <p className="text-4xl font-bold text-[var(--accent)]">{number}</p>
      <p className="text-gray-600 mt-2 font-medium">{label}</p>
      <p className="text-xs text-gray-400 mt-2">{source}</p>
    </div>
  )
}

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

function ComparisonRow({ label, values }: { label: string; values: Array<string | boolean> }) {
  return (
    <tr className="border-b border-gray-100">
      <td className="py-4 px-4 text-sm font-medium text-[var(--navy)]">{label}</td>
      {values.map((val, i) => (
        <td
          key={i}
          className={`py-4 px-4 text-sm text-center ${
            i === 0 ? 'font-semibold text-[var(--accent)] bg-orange-50' : 'text-gray-600'
          }`}
        >
          {typeof val === 'boolean' ? (
            val ? (
              <Check className="w-5 h-5 text-emerald-500 mx-auto" />
            ) : (
              <X className="w-5 h-5 text-gray-300 mx-auto" />
            )
          ) : (
            val
          )}
        </td>
      ))}
    </tr>
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
}: {
  name: string
  price: string
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
        <span className="text-4xl font-bold text-[var(--navy)]">{price}&euro;</span>
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
