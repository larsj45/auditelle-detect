import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Report from '@/components/lettrine/Report'
import { getLettrineAppCopy } from '@/components/lettrine/appCopy'
import { isLettrineLocale } from '@/lib/lettrine/signup'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLettrineLocale(locale)) return {}
  return { title: getLettrineAppCopy(locale).report.metaTitle }
}

export default async function Page({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params
  if (!isLettrineLocale(locale) || !UUID.test(id)) notFound()
  return <Report locale={locale} id={id} />
}
