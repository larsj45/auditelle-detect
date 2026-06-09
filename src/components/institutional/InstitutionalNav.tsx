import Link from 'next/link'
import type { ResellerConfig } from '@/lib/config'

export function InstitutionalNav({ config }: { config: ResellerConfig }) {
  const institutional = config.institutional
  if (!institutional) return null

  const primaryCta = institutional.landing.hero.ctaPrimary
  const ctaHref =
    institutional.commercial.demoCalendarUrl ||
    `/contact?subject=${encodeURIComponent('Demo institucional')}`

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex min-w-0 items-center">
          <img
            src={config.logoColor}
            alt={config.name}
            className="block max-w-[12rem] lg:max-w-[17rem]"
            style={{ height: config.logoHeight || '2rem' }}
          />
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden text-sm font-medium text-gray-600 md:inline-flex"
          >
            Voltar para página inicial
          </Link>
          <Link
            href={ctaHref}
            aria-label={primaryCta}
            className="btn-primary whitespace-nowrap !px-4 !py-2 text-sm"
          >
            <span className="lg:hidden">Demo</span>
            <span className="hidden lg:inline">{primaryCta}</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
