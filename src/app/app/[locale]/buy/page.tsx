import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BuyUnits from '@/components/lettrine/BuyUnits'
import { getLettrineAppCopy } from '@/components/lettrine/appCopy'
import { isLettrineLocale } from '@/lib/lettrine/signup'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLettrineLocale(locale)) return {}
  return { title: getLettrineAppCopy(locale).buy.metaTitle }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLettrineLocale(locale)) notFound()
  return <BuyUnits locale={locale} />
}
