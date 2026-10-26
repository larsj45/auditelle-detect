import type { ResellerConfig } from '../../config/types'

type BrandConfig = Pick<ResellerConfig, 'name' | 'logoColor' | 'logoWhite' | 'logoHeight' | 'wordmark'>

// Brand logo: the configured image, or a serif text wordmark when the brand
// sets `wordmark` (auditelle-fr: "Lettrine", as on lettrine.eu).
export default function BrandMark({
  config,
  variant = 'color',
  scale = 1,
  className = '',
}: {
  config: BrandConfig
  variant?: 'color' | 'white'
  scale?: number
  className?: string
}) {
  const height = config.logoHeight || '2rem'
  if (config.wordmark) {
    return (
      <span
        className={`brand-wordmark ${variant === 'white' ? 'text-white' : 'text-[var(--navy)]'} ${className}`}
        style={{ fontSize: `calc(${height} * 0.8 * ${scale})` }}
      >
        {config.wordmark}
      </span>
    )
  }
  const src = variant === 'white' ? config.logoWhite : config.logoColor
  if (!src) {
    return (
      <span className={`text-xl font-bold ${variant === 'white' ? 'text-white' : 'text-[var(--navy)]'} ${className}`}>
        {config.name}
      </span>
    )
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={config.name} className={className} style={{ height: `calc(${height} * ${scale})` }} />
}
