import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { editorialFontVariables } from '@/components/editorial/editorialFonts'
import { isLettrineLocale } from '@/lib/lettrine/signup'
import { getLettrineAppCopy } from '@/components/lettrine/appCopy'

export const metadata: Metadata = {
  // Account pages are never indexed; the landing pages carry the SEO.
  robots: { index: false, follow: false },
  keywords: null,
}

export function generateStaticParams() {
  return [{ locale: 'sv' }, { locale: 'fr' }]
}

export default async function LettrineAppLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLettrineLocale(locale)) notFound()
  const copy = getLettrineAppCopy(locale)

  return (
    <div className={editorialFontVariables} lang={copy.htmlLang}>
      {children}
    </div>
  )
}
