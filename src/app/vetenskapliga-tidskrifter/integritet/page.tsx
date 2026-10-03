import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getResellerConfig } from '@/lib/config'
import EditorialPrivacyNotice from '@/components/editorial/EditorialPrivacyNotice'
import { getEditorialCopy } from '@/components/editorial/editorialCopy'
import { editorialFontVariables } from '@/components/editorial/editorialFonts'
import { getEditorialPrivacyCopy } from '@/components/editorial/editorialPrivacyCopy'

const content = getEditorialPrivacyCopy('sv')
const landing = getEditorialCopy('sv')

export async function generateMetadata(): Promise<Metadata> {
  const config = await getResellerConfig()

  if (config.id !== 'auditelle-fr') {
    return {
      title: 'Sidan kunde inte hittas',
      robots: { index: false, follow: false },
    }
  }

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: `https://${config.domain}${content.path}`,
    },
    robots: { index: false, follow: true },
  }
}

export default async function IntegritetPage() {
  const config = await getResellerConfig()

  if (config.id !== 'auditelle-fr') {
    notFound()
  }

  return (
    <div className={editorialFontVariables}>
      <EditorialPrivacyNotice content={content} footerLegal={landing.footer.legal} />
    </div>
  )
}
