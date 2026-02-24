import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PricingCard from '@/components/PricingCard'
import HeroDemo from '@/components/HeroDemo'
import { Shield, Brain, FileSearch, BarChart3, Zap, Globe, Check, X } from 'lucide-react'
import Link from 'next/link'
import { getResellerConfig } from '@/lib/config'

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain className="w-8 h-8" />,
  FileSearch: <FileSearch className="w-8 h-8" />,
  BarChart3: <BarChart3 className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />,
  Globe: <Globe className="w-8 h-8" />,
}

export default async function Home() {
  const config = await getResellerConfig()
  const s = config.strings

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="gradient-hero pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[var(--teal)]/10 text-[var(--teal-dark)] text-sm font-medium px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-[var(--teal)] rounded-full animate-pulse"></span>
                {s.hero.badge}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--navy)] leading-tight">
                {s.hero.title}
                <span className="text-[var(--accent)]">{s.hero.titleAccent}</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                {s.hero.subtitle}
              </p>

              <div className="flex flex-wrap gap-6 mt-8 justify-center lg:justify-start">
                {s.hero.trustBadges.map((badge) => (
                  <div key={badge} className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-5 h-5 text-[var(--teal)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {badge}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
                <Link href="/signup" className="btn-primary text-lg px-8 py-4 rounded-xl shadow-lg shadow-orange-500/20">
                  {s.hero.ctaPrimary}
                </Link>
                <Link href="/#how-it-works" className="btn-secondary text-lg px-8 py-4 rounded-xl">
                  {s.hero.ctaSecondary}
                </Link>
              </div>
            </div>

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
            {s.trustBar.label}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-gray-400">
            {s.trustBar.names.map((name) => (
              <span key={name} className="text-sm font-medium">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              {s.features.title}
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
              {s.features.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {s.features.items.map((item) => (
              <FeatureCard
                key={item.title}
                icon={iconMap[item.icon] || <Shield className="w-8 h-8" />}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 bg-[var(--bg-light)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              {s.howItWorks.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {s.howItWorks.steps.map((step, i) => (
              <StepCard key={i} number={String(i + 1)} title={step.title} description={step.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              {s.testimonials.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {s.testimonials.items.map((item) => (
              <TestimonialCard key={item.author} quote={item.quote} author={item.author} role={item.role} />
            ))}
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <section className="py-24 px-4 bg-[var(--bg-light)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              {s.comparison.title}
            </h2>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
              {s.comparison.subtitle}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-500"></th>
                  {s.comparison.competitors.map((name, i) => (
                    <th
                      key={name}
                      className={`py-4 px-4 text-sm font-bold text-center ${
                        i === 0
                          ? 'text-[var(--accent)] bg-orange-50 rounded-t-xl'
                          : 'text-[var(--navy)]'
                      }`}
                    >
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {s.comparison.rows.map((row, rowIdx) => (
                  <tr
                    key={row.label}
                    className={rowIdx % 2 === 0 ? 'bg-white' : ''}
                  >
                    <td className="py-4 px-4 text-sm font-medium text-[var(--navy)]">
                      {row.label}
                    </td>
                    {row.values.map((val, colIdx) => (
                      <td
                        key={colIdx}
                        className={`py-4 px-4 text-sm text-center ${
                          colIdx === 0
                            ? 'font-semibold text-[var(--accent)] bg-orange-50'
                            : 'text-gray-600'
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-[var(--bg-light)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              {s.pricing.title}
            </h2>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
              {s.pricing.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto items-start">
            {config.plans.homepage.map((plan) => (
              <PricingCard
                key={plan.name}
                name={plan.name}
                price={plan.price}
                period={plan.period}
                description={plan.description}
                features={plan.features}
                cta={plan.cta}
                href={plan.href}
                popular={plan.popular}
                popularBadge={plan.popularBadge}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              {s.pricing.footer}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            {s.cta.title}
          </h2>
          <p className="text-gray-300 mt-4 text-lg">
            {s.cta.subtitle}
          </p>
          <Link href="/signup" className="btn-primary text-lg px-8 py-4 mt-8 inline-block">
            {s.cta.button}
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
