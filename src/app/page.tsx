import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PricingCard from '@/components/PricingCard'
import { Shield, Brain, FileSearch, BarChart3, Zap, Globe } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="gradient-hero pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block bg-white/10 text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
            🏆 Vérifiée par l&apos;Université du Maryland comme la plus précise
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight">
            La détection IA la plus{' '}
            <span className="text-[#7c8cf8]">précise</span>{' '}
            du marché
          </h1>
          <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto leading-relaxed">
            Détectez le contenu généré par ChatGPT, Claude, Gemini et plus.
            Résultats vérifiés par des tiers. Taux de faux positifs quasi nul.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/signup" className="btn-primary text-lg px-8 py-4">
              Essayer gratuitement →
            </Link>
            <Link href="/#features" className="btn-secondary text-lg px-8 py-4 !bg-transparent !text-white !border-white/30 hover:!bg-white/10">
              Découvrir
            </Link>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            5 analyses gratuites par jour · Aucune carte bancaire requise
          </p>
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
              Tarifs simples et transparents
            </h2>
            <p className="text-gray-500 mt-4 text-lg">
              Commencez gratuitement. Passez au Pro quand vous êtes prêt.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            <PricingCard
              name="Gratuit"
              price="0€"
              description="Pour découvrir la détection IA"
              features={[
                '5 analyses par jour',
                'Score de probabilité IA',
                'Identification du modèle',
                'Historique 7 jours',
              ]}
              cta="Commencer gratuitement"
              href="/signup"
            />
            <PricingCard
              name="Pro"
              price="29€"
              period="mois"
              description="Pour les professionnels et enseignants"
              features={[
                '100 analyses par jour',
                'Analyse section par section',
                'Détection de plagiat',
                'Export PDF des rapports',
                'Historique illimité',
                'Support prioritaire',
              ]}
              cta="Démarrer l'essai Pro"
              href="/signup?plan=pro"
              popular
            />
            <PricingCard
              name="Entreprise"
              price="Sur devis"
              description="Pour les institutions et grandes organisations"
              features={[
                'Analyses illimitées',
                'Accès API',
                'Intégration LMS',
                'Gestion multi-utilisateurs',
                'SLA & support dédié',
                'Facturation personnalisée',
              ]}
              cta="Nous contacter"
              href="mailto:contact@auditelle.eu"
            />
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
