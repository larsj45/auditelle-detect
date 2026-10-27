import type { ResellerConfig } from '../../config/types'

type PathConfig = Pick<ResellerConfig, 'companyHome'>

// Where the product landing lives: "/" for single-product brands, or the
// configured path (e.g. "/lettrine") when "/" is the publisher's company page.
export function productHomePath(config: PathConfig): string {
  return config.companyHome ? `${config.companyHome.productOrigin ?? ''}${config.companyHome.productPath}` : '/'
}

// Anchor on the product landing, e.g. "/#pricing" or "/lettrine#pricing".
export function productAnchor(config: PathConfig, anchor: string): string {
  const base = productHomePath(config)
  return base === '/' ? `/#${anchor}` : `${base}#${anchor}`
}

// Name shown after the © sign.
export function copyrightHolder(
  config: Pick<ResellerConfig, 'name'> & { strings: { footer: { copyrightHolder?: string } } },
): string {
  return config.strings.footer.copyrightHolder ?? config.name
}
