import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import type { InstitutionalConfig } from '../../../config/types'

function getInstitutionalCtaHref(institutional: InstitutionalConfig) {
  return (
    institutional.commercial.demoCalendarUrl ||
    `/contact?subject=${encodeURIComponent('Demo institucional')}`
  )
}

export function InstitutionalContactBlock({
  institutional,
}: {
  institutional: InstitutionalConfig
}) {
  const { contactBlock } = institutional.landing
  const { contactEmail } = institutional.commercial
  const ctaHref = getInstitutionalCtaHref(institutional)

  return (
    <section className="gradient-hero px-4 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--accent)] shadow-sm">
          <ShieldCheck className="h-4 w-4" />
          Piloto institucional pago
        </div>

        <h2 className="text-3xl font-bold text-[var(--navy)] sm:text-4xl">
          {contactBlock.title}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          {contactBlock.body}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={ctaHref}
            className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-lg"
          >
            {contactBlock.cta}
            <ArrowRight className="h-5 w-5" />
          </Link>

          <a
            href={`mailto:${contactEmail}`}
            className="text-sm font-medium text-gray-600 hover:text-[var(--accent)]"
          >
            {contactEmail}
          </a>
        </div>
      </div>
    </section>
  )
}
