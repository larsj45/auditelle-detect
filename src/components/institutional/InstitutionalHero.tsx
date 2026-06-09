import Link from 'next/link'
import { ArrowRight, BadgeCheck } from 'lucide-react'
import type { InstitutionalConfig } from '../../../config/types'

function getInstitutionalCtaHref(institutional: InstitutionalConfig) {
  return (
    institutional.commercial.demoCalendarUrl ||
    `/contact?subject=${encodeURIComponent('Demo institucional')}`
  )
}

export function InstitutionalHero({
  institutional,
}: {
  institutional: InstitutionalConfig
}) {
  const { hero, pitch, portalPreview } = institutional.landing
  const ctaHref = getInstitutionalCtaHref(institutional)

  return (
    <section className="gradient-hero px-4 pb-20 pt-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--accent-light)] px-4 py-2 text-sm font-semibold text-[var(--accent)]">
            <BadgeCheck className="h-4 w-4" />
            {institutional.label}
          </div>

          <h1 className="text-4xl font-bold leading-tight text-[var(--navy)] sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-gray-600">
            {hero.subtitle}
          </p>

          <div className="mt-6 space-y-3 text-base leading-relaxed text-gray-600">
            <p>{pitch.turnitinAlternative}</p>
            <p>{pitch.migrationStory}</p>
          </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={ctaHref}
              className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-lg"
            >
              {hero.ctaPrimary}
              <ArrowRight className="h-5 w-5" />
            </Link>
            {hero.ctaSecondary ? (
              <Link
                href="/#planos"
                className="btn-secondary inline-flex items-center justify-center px-8 py-4 text-lg"
              >
                {hero.ctaSecondary}
              </Link>
            ) : null}
          </div>
        </div>

        {portalPreview ? (
          <figure className="overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-gray-100">
            <img
              src={portalPreview.imagePath}
              alt={portalPreview.caption}
              className="block h-auto w-full"
              loading="eager"
            />
            <figcaption className="border-t border-gray-100 bg-white px-5 py-3 text-sm text-gray-500">
              {portalPreview.caption}
            </figcaption>
          </figure>
        ) : null}
      </div>
    </section>
  )
}
