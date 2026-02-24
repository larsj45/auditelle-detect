'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useConfig } from '@/components/ConfigProvider'

export default function DemoVideoPage() {
  const config = useConfig()
  const s = config.strings.demoVideo

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--bg-light)] pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[var(--navy)] mb-4">
              {s.title}
            </h1>
            <p className="text-xl text-gray-600">
              {s.subtitle}
            </p>
          </div>

          <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-xl mb-12">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-xl">{s.videoPlaceholder}</p>
                <p className="text-gray-400 mt-2">{s.videoSoon}</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">
              {s.readyCta}
            </h2>
            <p className="text-gray-600 mb-8">
              {s.readySubtitle}
            </p>
            <Link
              href="/signup"
              className="btn-primary px-8 py-4 rounded-xl text-lg inline-block"
            >
              {s.readyButton}
            </Link>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {s.featureCards.map((card) => (
              <div key={card.title} className="text-center p-6">
                <div className="text-4xl mb-4">{card.emoji}</div>
                <h3 className="font-semibold text-[var(--navy)] mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
