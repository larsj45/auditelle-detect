'use client'

import { useRef, useState } from 'react'
import { Upload, FileText, Loader2, X } from 'lucide-react'

interface FileUploadProps {
  onTextExtracted: (text: string, filename: string) => void
}

export default function FileUpload({ onTextExtracted }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [extracting, setExtracting] = useState(false)
  const [error, setError] = useState('')
  const [filename, setFilename] = useState('')
  const [dragging, setDragging] = useState(false)

  async function extractText(file: File) {
    setExtracting(true)
    setError('')
    setFilename(file.name)

    try {
      const ext = file.name.split('.').pop()?.toLowerCase()

      if (ext === 'txt' || ext === 'md') {
        const text = await file.text()
        onTextExtracted(text, file.name)

      } else if (ext === 'pdf') {
        const { getDocumentProxy, extractText: pdfExtract } = await import('unpdf')
        const buffer = await file.arrayBuffer()
        const pdf = await getDocumentProxy(new Uint8Array(buffer))
        const { text } = await pdfExtract(pdf, { mergePages: true })
        onTextExtracted(text, file.name)

      } else if (ext === 'docx' || ext === 'doc') {
        const mammoth = await import('mammoth')
        const buffer = await file.arrayBuffer()
        const result = await mammoth.extractRawText({ arrayBuffer: buffer })
        onTextExtracted(result.value, file.name)

      } else {
        setError('Format non supporté. Utilisez PDF, DOCX ou TXT.')
        setFilename('')
      }
    } catch (err) {
      console.error(err)
      setError('Impossible d\'extraire le texte. Vérifiez que le fichier n\'est pas protégé.')
      setFilename('')
    } finally {
      setExtracting(false)
    }
  }

  function handleFile(file: File) {
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      setError('Fichier trop volumineux (max 10 Mo).')
      return
    }
    extractText(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div className="mb-3">
      <div
        onClick={() => !extracting && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        className={`
          flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed cursor-pointer transition
          ${dragging ? 'border-[var(--accent)] bg-[var(--accent)]/5' : 'border-gray-200 hover:border-[var(--accent)]/50 hover:bg-gray-50'}
          ${extracting ? 'opacity-60 cursor-not-allowed' : ''}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.doc,.txt,.md"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        {extracting ? (
          <>
            <Loader2 className="w-5 h-5 text-[var(--accent)] animate-spin shrink-0" />
            <span className="text-sm text-gray-500">Extraction en cours…</span>
          </>
        ) : filename ? (
          <>
            <FileText className="w-5 h-5 text-green-600 shrink-0" />
            <span className="text-sm text-gray-700 truncate flex-1">{filename}</span>
            <button
              onClick={(e) => { e.stopPropagation(); setFilename(''); onTextExtracted('', '') }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <Upload className="w-5 h-5 text-gray-400 shrink-0" />
            <div>
              <span className="text-sm text-gray-600">
                Glisser un fichier ou <span className="text-[var(--accent)] font-medium">parcourir</span>
              </span>
              <p className="text-xs text-gray-400 mt-0.5">PDF, DOCX, TXT — max 10 Mo</p>
            </div>
          </>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-1.5">{error}</p>
      )}
    </div>
  )
}
