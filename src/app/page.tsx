import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PricingCard from '@/components/PricingCard'
import HeroDemo from '@/components/HeroDemo'
import { Shield, Brain, FileSearch, BarChart3, Zap, Globe } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="gradient-hero pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[var(--teal)]/10 text-[var(--teal-dark)] text-sm font-medium px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-[var(--teal)] rounded-full animate-pulse"></span>
                99,9% de précision vérifiée
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--navy)] leading-tight">
                Le détecteur IA qui{' '}
                <span className="text-[var(--accent)]">fonctionne vraiment</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Détectez ChatGPT, Claude, Gemini et plus avec une précision inégalée.
                Vérifié par l&apos;Université du Maryland. Taux de faux positifs quasi nul.
              </p>
              
              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 mt-8 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-5 h-5 text-[var(--teal)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Détection IA avancée
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-5 h-5 text-[var(--teal)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Vérifié par des tiers
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-5 h-5 text-[var(--teal)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Essai gratuit
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
                <Link href="/signup" className="btn-primary text-lg px-8 py-4 rounded-xl shadow-lg shadow-orange-500/20">
                  Essayer gratuitement →
                </Link>
                <Link href="/#features" className="btn-secondary text-lg px-8 py-4 rounded-xl">
                  Comment ça marche
                </Link>
              </div>
            </div>

            {/* Right Column - Demo */}
            <div className="lg:pl-8">
              <HeroDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-400 text-sm font-medium uppercase tracking-wider mb-6">
            Reconnue par les experts
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-gray-400">
            <span className="text-sm font-medium">University of Maryland</span>
            <span className="text-sm font-medium">Chicago Booth</span>
            <span className="text-sm font-medium">Stony Brook University</span>
            <span className="text-sm font-medium">SOC2 Type 2</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              Technologie de détection avancée
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
              Une précision de 99,9% là où les autres échouent.
              Développée par des chercheurs de Stanford, Tesla et Google.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="Score de probabilité IA"
              description="Soumettez votre contenu et obtenez un score précis indiquant si le texte est d'origine humaine ou généré par IA."
            />
            <FeatureCard
              icon={<FileSearch className="w-8 h-8" />}
              title="Identification du modèle"
              description="Détectez quel modèle a été utilisé : ChatGPT, Claude, Gemini, Llama, Perplexity et bien d'autres."
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8" />}
              title="Analyse par section"
              description="Comprenez si l'intégralité du texte est IA, humain, ou une combinaison des deux, section par section."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Détection de plagiat"
              description="Recherche parmi des milliards de pages web, livres et articles pour détecter le plagiat en plus de l'IA."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Faux positifs quasi nuls"
              description="Vérifiée indépendamment pour son taux de faux positifs le plus bas du marché. Fiable à 100%."
            />
            <FeatureCard
              icon={<Globe className="w-8 h-8" />}
              title="Multilingue"
              description="Détection précise dans de nombreuses langues, y compris le français, l'anglais, l'espagnol et l'allemand."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-[var(--bg-light)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              Simple comme 1, 2, 3
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StepCard number="1" title="Collez votre texte" description="Copiez-collez le contenu à analyser dans notre interface intuitive." />
            <StepCard number="2" title="Lancez l'analyse" description="Notre moteur IA analyse chaque phrase en quelques secondes." />
            <StepCard number="3" title="Consultez le rapport" description="Obtenez un score détaillé avec identification du modèle et analyse section par section." />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              Ce que disent les experts
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Parmi les détecteurs automatiques, ce système surpasse significativement tous les autres."
              author="Jenna Russell"
              role="University of Maryland"
            />
            <TestimonialCard
              quote="Un détecteur presque surnaturellement bon. Je n'ai encore constaté aucun faux positif ni faux négatif."
              author="Ryan Nicolace"
              role="Cloud Architect"
            />
            <TestimonialCard
              quote="Mes étudiants sont tellement convaincus de sa précision que c'est devenu le meilleur moyen de dissuasion."
              author="Jarred Phillips"
              role="New Roads School"
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-[var(--bg-light)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              Tarification transparente et compétitive
            </h2>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
              Technologie Pangram Labs. Service français. Commencez gratuitement, évoluez selon vos besoins.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto items-start">
            <PricingCard
              name="Gratuit"
              price="0€"
              description="Découvrez la précision"
              features={[
                '50 analyses par mois',
                '1 utilisateur',
                'Score IA 99.9% précis',
                'Identification du modèle',
                'Historique 7 jours',
              ]}
              cta="Commencer"
              href="/signup"
            />
            <PricingCard
              name="Pro"
              price="25€"
              period="mois"
              description="Pour enseignants et consultants"
              features={[
                '1,000 analyses par mois',
                '1 utilisateur',
                'API (500 appels)',
                'Export PDF/CSV',
                'Support email',
              ]}
              cta="Choisir Pro"
              href="/signup?plan=pro"
            />
            <PricingCard
              name="Équipe"
              price="99€"
              period="mois"
              description="Pour un groupe de professeurs"
              features={[
                '5,000 analyses par mois',
                'Jusqu\'à 5 professeurs',
                'API (2,500 appels)',
                'Export PDF/CSV',
                'Support prioritaire',
              ]}
              cta="Choisir Équipe"
              href="/signup?plan=equipe"
              popular
            />
            <PricingCard
              name="Département"
              price="249€"
              period="mois"
              description="Pour départements et facultés"
              features={[
                '20,000 analyses par mois',
                'Jusqu\'à 20 professeurs',
                'API illimitée',
                'Intégration LMS',
                'Dashboard administrateur',
              ]}
              cta="Choisir Département"
              href="/signup?plan=departement"
            />
            <PricingCard
              name="Institution"
              price="Sur devis"
              description="Pour établissements entiers"
              features={[
                'Analyses illimitées',
                'Tous les professeurs',
                'White-label API',
                'Account manager dédié',
                'SLA 99.9%',
              ]}
              cta="Nous contacter"
              href="/contact"
            />
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              Technologie Pangram • 99,9% de précision • Conforme RGPD • Support français • SIREN 945117000
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Prêt à détecter le contenu IA ?
          </h2>
          <p className="text-gray-300 mt-4 text-lg">
            Rejoignez des milliers de professionnels qui font confiance à Auditelle
            pour protéger l&apos;intégrité de leurs contenus.
          </p>
          <Link href="/signup" className="btn-primary text-lg px-8 py-4 mt-8 inline-block">
            Créer un compte gratuit →
          </Link>
        </div>
      </section>

      <Footer />
    </>
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
      <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
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
