'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, FileSearch, Search, Sparkles } from 'lucide-react'
import { useConfig } from '@/components/ConfigProvider'
import DetectionModeToggle, { type DetectionMode } from '@/components/DetectionModeToggle'
import FileUpload from '@/components/FileUpload'

export default function HeroDemo() {
  const config = useConfig()
  const s = config.strings.heroDemo
  const p = config.strings.plagiarism
  const router = useRouter()
  const [text, setText] = useState('')
  const [mode, setMode] = useState<DetectionMode>('ai')
  const [redirecting, setRedirecting] = useState(false)

  async function handleStart() {
    setRedirecting(true)
    try {
      const { supabase } = await import('@/lib/supabase')
      const { data: { session } } = await supabase.auth.getSession()
      router.push(session ? '/dashboard/upgrade' : '/signup?next=credits')
    } catch {
      router.push('/signup?next=credits')
    }
  }

  const sampleButtons = mode === 'ai' ? (
    <>
      <button
        onClick={() => setText(s.humanSample)}
        className="text-xs px-3 py-1 bg-green-50 text-green-700 rounded-full hover:bg-green-100 transition-colors"
      >
        {s.humanButton}
      </button>
      <button
        onClick={() => setText(s.chatgptSample)}
        className="text-xs px-3 py-1 bg-red-50 text-red-700 rounded-full hover:bg-red-100 transition-colors"
      >
        {s.chatgptButton}
      </button>
    </>
  ) : mode === 'both' ? (
    <>
      <button
        onClick={() => setText(s.chatgptSample)}
        className="text-xs px-3 py-1 bg-red-50 text-red-700 rounded-full hover:bg-red-100 transition-colors"
      >
        {s.chatgptButton}
      </button>
      <button
        onClick={() => setText(p.copiedSample)}
        className="text-xs px-3 py-1 bg-amber-50 text-amber-700 rounded-full hover:bg-amber-100 transition-colors"
      >
        {p.copiedButton}
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() => setText(p.originalSample)}
        className="text-xs px-3 py-1 bg-green-50 text-green-700 rounded-full hover:bg-green-100 transition-colors"
      >
        {p.originalButton}
      </button>
      <button
        onClick={() => setText(p.copiedSample)}
        className="text-xs px-3 py-1 bg-amber-50 text-amber-700 rounded-full hover:bg-amber-100 transition-colors"
      >
        {p.copiedButton}
      </button>
    </>
  )

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100">
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[var(--accent)]" />
          <span className="text-gray-800 font-semibold">{s.testNow}</span>
        </div>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{s.free}</span>
      </div>

      <div className="mb-4">
        <DetectionModeToggle mode={mode} onModeChange={setMode} disabled={redirecting} />
      </div>

      <FileUpload onTextExtracted={(extracted) => { if (extracted) setText(extracted) }} />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={s.placeholder}
        disabled={redirecting}
        className={`w-full h-32 p-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all ${redirecting ? 'opacity-50 cursor-not-allowed' : ''}`}
        maxLength={2000}
      />

      <div className="flex items-center gap-2 mt-3 flex-wrap">
        <span className="text-xs text-gray-400">{s.tryLabel}</span>
        {sampleButtons}
      </div>

      <div className="mt-5 rounded-xl border border-[var(--accent)]/15 bg-[var(--accent-light)] p-4">
        <p className="text-sm font-semibold text-[var(--navy)]">{s.unlockLabel}</p>
        <p className="text-sm text-gray-600 mt-1">{s.ctaTeaser}</p>
      </div>

      <div className="flex items-center justify-between mt-4 gap-3">
        <span className="text-gray-400 text-sm">{text.length}/2000</span>
        <button
          onClick={handleStart}
          disabled={redirecting}
          className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-orange-500/20"
        >
          {mode === 'both' ? <FileSearch className="w-4 h-4" /> : mode === 'plagiarism' ? <Search className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
          {redirecting ? s.analyzingLabel : s.ctaButton}
          {!redirecting && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}
