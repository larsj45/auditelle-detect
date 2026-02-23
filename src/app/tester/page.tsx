'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DetectionResult from '@/components/DetectionResult'
import { FileSearch, Loader2, Sparkles, ArrowRight } from 'lucide-react'
import FileUpload from '@/components/FileUpload'

interface DetectionResponse {
  ai_likelihood: number
  detected_model?: string
  sentences?: Array<{ text: string; ai_likelihood: number; detected_model?: string }>
  tests_remaining?: number
  limit_reached?: boolean
}

export default function TesterPage() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<DetectionResponse | null>(null)
  const [error, setError] = useState('')
  const [testsRemaining, setTestsRemaining] = useState<number | null>(null)
  const [limitReached, setLimitReached] = useState(false)

  const handleAnalyze = async () => {
    if (!text.trim() || text.trim().length < 50) {
      setError('Veuillez entrer au moins 50 caractères pour une analyse fiable.')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/detect-public', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.limit_reached) {
          setLimitReached(true)
          setTestsRemaining(0)
        }
        throw new Error(data.error || 'Erreur lors de l\'analyse')
      }

      setResult(data)
      if (data.tests_remaining !== undefined) {
        setTestsRemaining(data.tests_remaining)
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--bg-light)] pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[var(--accent)]/10 text-[var(--accent)] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Test gratuit — Aucun compte requis
            </div>
            <h1 className="text-4xl font-bold text-[var(--navy)] mb-4">
              Testez la détection IA
            </h1>
            <p className="text-xl text-gray-600">
              Collez un texte et découvrez s&apos;il a été généré par IA — en quelques secondes
            </p>
          </div>

          {/* Tests remaining indicator */}
          {testsRemaining !== null && (
            <div className="text-center mb-6">
              <span className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200">
                {testsRemaining > 0 ? (
                  <>
                    <span className="font-semibold text-[var(--navy)]">{testsRemaining}</span> test{testsRemaining > 1 ? 's' : ''} gratuit{testsRemaining > 1 ? 's' : ''} restant{testsRemaining > 1 ? 's' : ''}
                  </>
                ) : (
                  <span className="text-amber-600">Limite atteinte — créez un compte pour continuer</span>
                )}
              </span>
            </div>
          )}

          {/* Main card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
            <FileUpload onTextExtracted={(extractedText) => { if (extractedText) setText(extractedText) }} />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Collez ici le texte à analyser (minimum 50 caractères, maximum 5000)..."
              className="w-full h-48 resize-y border border-gray-200 rounded-lg p-4 text-sm focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition"
              disabled={limitReached}
            />
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-gray-400">
                {text.length} / 5000 caractères
              </span>
              <button
                onClick={handleAnalyze}
                disabled={loading || text.trim().length < 50 || limitReached}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyse en cours...
                  </>
                ) : (
                  <>
                    <FileSearch className="w-4 h-4" />
                    Analyser gratuitement
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-700 text-sm p-4 rounded-lg mb-6">{error}</div>
          )}

          {/* Result */}
          {result && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
              <DetectionResult
                score={Math.round(result.ai_likelihood * 100)}
                detectedModel={result.detected_model}
                sentences={result.sentences?.map(s => ({
                  ...s,
                  ai_likelihood: Math.round(s.ai_likelihood * 100),
                }))}
              />
            </div>
          )}

          {/* CTA */}
          {(result || limitReached) && (
            <div className="bg-gradient-to-r from-[var(--navy)] to-[var(--accent)] rounded-2xl p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-4">
                {limitReached ? 'Continuez avec un compte gratuit' : 'Vous aimez Auditelle ?'}
              </h2>
              <p className="text-white/80 mb-6">
                Créez un compte gratuit pour analyser jusqu&apos;à 50 textes par mois, avec l&apos;historique complet et l&apos;intégration Moodle.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-white text-[var(--navy)] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                Créer un compte gratuit
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Features */}
          {!result && !limitReached && (
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="font-semibold text-[var(--navy)] mb-2">99,9% de précision</h3>
                <p className="text-gray-600 text-sm">Technologie validée par l&apos;Université du Maryland</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="text-3xl mb-4">🔍</div>
                <h3 className="font-semibold text-[var(--navy)] mb-2">Analyse par section</h3>
                <p className="text-gray-600 text-sm">Identifie précisément quelles parties sont générées par IA</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="text-3xl mb-4">🤖</div>
                <h3 className="font-semibold text-[var(--navy)] mb-2">Détection du modèle</h3>
                <p className="text-gray-600 text-sm">ChatGPT, Claude, Gemini, Llama... on les identifie tous</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
