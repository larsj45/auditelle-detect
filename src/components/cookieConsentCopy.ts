export interface CookieConsentCopy {
  message: string
  accept: string
  decline: string
}

const SWEDISH_EDITORIAL_PATH = '/vetenskapliga-tidskrifter'
const ITALIAN_EDITORIAL_PATH = '/riviste-scientifiche'

export const swedishEditorialCookieConsent: CookieConsentCopy = {
  message:
    'Den här webbplatsen använder cookies för att mäta annonsernas resultat och förbättra din upplevelse. Inga personuppgifter säljs.',
  accept: 'Acceptera',
  decline: 'Avvisa',
}

export const italianEditorialCookieConsent: CookieConsentCopy = {
  message:
    'Questo sito utilizza cookie per misurare i risultati degli annunci e migliorare la vostra esperienza. Nessun dato personale viene venduto.',
  accept: 'Accetta',
  decline: 'Rifiuta',
}

function isUnder(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`)
}

export function getCookieConsentCopy(
  pathname: string,
  defaultCopy: CookieConsentCopy
) {
  if (isUnder(pathname, SWEDISH_EDITORIAL_PATH)) return swedishEditorialCookieConsent
  if (isUnder(pathname, ITALIAN_EDITORIAL_PATH)) return italianEditorialCookieConsent
  return defaultCopy
}
