'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function DemoVideoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--bg-light)] pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[var(--navy)] mb-4">
              Découvrez Auditelle en 5 minutes
            </h1>
            <p className="text-xl text-gray-600">
              Voyez comment détecter les contenus générés par IA avec 99,9% de précision
            </p>
          </div>

          {/* Video placeholder - replace with actual Loom embed */}
          <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-xl mb-12">
            <div className="w-full h-full flex items-center justify-center">
              {/* Replace this div with actual Loom embed */}
              <div className="text-center text-white">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-xl">Vidéo de démonstration</p>
                <p className="text-gray-400 mt-2">Bientôt disponible</p>
              </div>
              {/* Example Loom embed:
              <iframe 
                src="https://www.loom.com/embed/VIDEO_ID" 
                frameBorder="0" 
                allowFullScreen 
                className="w-full h-full"
              />
              */}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">
              Prêt à essayer ?
            </h2>
            <p className="text-gray-600 mb-8">
              Créez votre compte gratuit et analysez jusqu&apos;à 50 textes par mois
            </p>
            <Link 
              href="/signup" 
              className="btn-primary px-8 py-4 rounded-xl text-lg inline-block"
            >
              Commencer l&apos;essai gratuit →
            </Link>
          </div>

          {/* Features recap */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-semibold text-[var(--navy)] mb-2">99,9% de précision</h3>
              <p className="text-gray-600 text-sm">Validée par l&apos;Université du Maryland</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-semibold text-[var(--navy)] mb-2">Intégration Moodle</h3>
              <p className="text-gray-600 text-sm">Installation en moins de 10 minutes</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🇫🇷</div>
              <h3 className="font-semibold text-[var(--navy)] mb-2">100% Français</h3>
              <p className="text-gray-600 text-sm">RGPD, support et facturation FR</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
