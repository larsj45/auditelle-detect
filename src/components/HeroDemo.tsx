'use client'

import { useState } from 'react'
import { Loader2, Sparkles, AlertCircle } from 'lucide-react'

interface DemoResult {
  score: number
  model: string | null
  verdict: string
  isAI: boolean
}

export default function HeroDemo() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<DemoResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const analyze = async () => {
    if (text.trim().length < 50) {
      setError('Veuillez entrer au moins 50 caractères')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/demo-detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.slice(0, 2000) }) // Max 2000 chars for demo
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erreur lors de l\'analyse')
        return
      }

      setResult(data)
    } catch {
      setError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-500'
    if (score >= 50) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Très probablement IA'
    if (score >= 50) return 'Possiblement IA'
    return 'Probablement humain'
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mt-10 max-w-2xl mx-auto border border-white/20">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-[#7c8cf8]" />
        <span className="text-white/90 font-medium">Testez maintenant — gratuit</span>
      </div>
      
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Collez votre texte ici pour une analyse instantanée... (min. 50 caractères)"
        className="w-full h-32 p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 resize-none focus:outline-none focus:ring-2 focus:ring-[#7c8cf8] focus:border-transparent"
        maxLength={2000}
      />
      
      <div className="flex items-center justify-between mt-3">
        <span className="text-white/40 text-sm">{text.length}/2000 caractères</span>
        <button
          onClick={analyze}
          disabled={loading || text.trim().length < 50}
          className="bg-[#7c8cf8] hover:bg-[#6b7bf7] disabled:bg-white/20 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyse...
            </>
          ) : (
            '🔍 Analyser'
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span className="text-red-200">{error}</span>
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-3xl font-bold ${getScoreColor(result.score)}`}>
                {result.score}% IA
              </div>
              <div className="text-white/80 text-sm mt-1 font-medium">
                {result.verdict}
              </div>
            </div>
            {result.isAI && (
              <div className="text-right">
                <div className="text-white/40 text-xs uppercase tracking-wide">Verdict</div>
                <div className="text-red-400 font-medium">Contenu IA</div>
              </div>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <a 
              href="/signup" 
              className="text-[#7c8cf8] hover:text-white transition-colors text-sm font-medium"
            >
              Créez un compte gratuit pour l&apos;analyse complète →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
