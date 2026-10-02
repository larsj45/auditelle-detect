export interface CookieConsentCopy {
  message: string
  accept: string
  decline: string
}

const SWEDISH_EDITORIAL_PATH = '/vetenskapliga-tidskrifter'

export const swedishEditorialCookieConsent: CookieConsentCopy = {
  message:
    'Den här webbplatsen använder cookies för att mäta annonsernas resultat och förbättra din upplevelse. Inga personuppgifter säljs.',
  accept: 'Acceptera',
  decline: 'Avvisa',
}

export function getCookieConsentCopy(
  pathname: string,
  defaultCopy: CookieConsentCopy
) {
  const isSwedishEditorial = pathname === SWEDISH_EDITORIAL_PATH
    || pathname.startsWith(`${SWEDISH_EDITORIAL_PATH}/`)

  return isSwedishEditorial ? swedishEditorialCookieConsent : defaultCopy
}
