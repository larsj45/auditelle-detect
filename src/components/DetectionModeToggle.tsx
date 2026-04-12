'use client'

import { Brain, Search, ShieldCheck } from 'lucide-react'
import { useConfig } from '@/components/ConfigProvider'

export type DetectionMode = 'ai' | 'plagiarism' | 'both'

interface DetectionModeToggleProps {
  mode: DetectionMode
  onModeChange: (mode: DetectionMode) => void
  disabled?: boolean
}

export default function DetectionModeToggle({ mode, onModeChange, disabled }: DetectionModeToggleProps) {
  const config = useConfig()

  if (!config.features.plagiarismDetection) return null

  const s = config.strings.plagiarism

  return (
    <div className="inline-flex flex-wrap gap-1 rounded-lg bg-gray-100 p-1">
      <button
        onClick={() => onModeChange('ai')}
        disabled={disabled}
        aria-pressed={mode === 'ai'}
        className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          mode === 'ai'
            ? 'bg-[var(--accent)] text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Brain className="w-3.5 h-3.5" />
        {s.modeAI}
      </button>
      <button
        onClick={() => onModeChange('plagiarism')}
        disabled={disabled}
        aria-pressed={mode === 'plagiarism'}
        className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          mode === 'plagiarism'
            ? 'bg-[var(--accent)] text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Search className="w-3.5 h-3.5" />
        {s.modePlagiarism}
      </button>
      <button
        onClick={() => onModeChange('both')}
        disabled={disabled}
        aria-pressed={mode === 'both'}
        className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          mode === 'both'
            ? 'bg-[var(--accent)] text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <ShieldCheck className="w-3.5 h-3.5" />
        {s.modeBoth}
      </button>
    </div>
  )
}
