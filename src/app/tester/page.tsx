'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DetectionModeToggle, { type DetectionMode } from '@/components/DetectionModeToggle'
import FileUpload from '@/components/FileUpload'
import { ArrowRight, FileSearch, Loader2, Search, Sparkles } from 'lucide-react'
import { useConfig } from '@/components/ConfigProvider'

export default function TesterPage() {
  const config = useConfig()
  const p = config.strings.plagiarism
  const tester = config.strings.tester
  const router = useRouter()
  const [text, setText] = useState('')
  const [mode, setMode] = useState<DetectionMode>('ai')
  const [loading, setLoading] = useState(false)

  async function handleStart() {
    setLoading(true)
    try {
      const { supabase } = await import('@/lib/supabase')
      const { data: { session } } = await supabase.auth.getSession()
      router.push(session ? '/dashboard/upgrade' : '/signup?next=credits')
    } catch {
      router.push('/signup?next=credits')
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--bg-light)] pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[var(--accent)]/10 text-[var(--accent)] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              {tester.badge}
            </div>
            <h1 className="text-4xl font-bold text-[var(--navy)] mb-4">{tester.title}</h1>
            <p className="text-xl text-gray-600">{tester.subtitle}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
            <div className="mb-4">
              <DetectionModeToggle mode={mode} onModeChange={setMode} disabled={loading} />
            </div>

            <FileUpload onTextExtracted={(extractedText) => { if (extractedText) setText(extractedText) }} />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={tester.textareaPlaceholder}
              className="w-full h-48 resize-y border border-gray-200 rounded-lg p-4 text-sm focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition"
            />

            <div className="flex items-center justify-between mt-4 gap-4">
              <span className="text-xs text-gray-400">
                {tester.characterCount.replace('{count}', String(text.length))}
              </span>
              <button
                onClick={handleStart}
                disabled={loading}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {tester.loading}
                  </>
                ) : mode === 'both' ? (
                  <>
                    <FileSearch className="w-4 h-4" />
                    {tester.ctaButton}
                  </>
                ) : mode === 'plagiarism' ? (
                  <>
                    <Search className="w-4 h-4" />
                    {tester.ctaButton}
                  </>
                ) : (
                  <>
                    <FileSearch className="w-4 h-4" />
                    {tester.analyzeFree}
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[var(--navy)] to-[var(--accent)] rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">{tester.ctaTitle}</h2>
            <p className="text-white/80 mb-6">{tester.ctaBody}</p>
            <button
              onClick={handleStart}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-white text-[var(--navy)] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition disabled:opacity-60"
            >
              {tester.ctaButton}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="font-semibold text-[var(--navy)] mb-2">{tester.featureAccuracyTitle}</h3>
              <p className="text-gray-600 text-sm">{tester.featureAccuracyBody}</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="font-semibold text-[var(--navy)] mb-2">{tester.featureSectionTitle}</h3>
              <p className="text-gray-600 text-sm">{tester.featureSectionBody}</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="font-semibold text-[var(--navy)] mb-2">{tester.featureModelTitle}</h3>
              <p className="text-gray-600 text-sm">{tester.featureModelBody}</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-[var(--navy)] mb-2">{p.modeBoth}</h2>
            <p className="text-sm text-gray-600">
              IA, plagio, identificación del modelo e informe exportable en el mismo flujo, con entrada por créditos sueltos o suscripción mensual.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
