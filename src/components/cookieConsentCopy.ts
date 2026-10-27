export interface CookieConsentCopy {
  message: string
  accept: string
  decline: string
}

const SWEDISH_EDITORIAL_PATH = '/vetenskapliga-tidskrifter'
const ITALIAN_EDITORIAL_PATH = '/riviste-scientifiche'
const ITALIAN_INSTITUTIONS_PATH = '/istituzioni'
const PORTUGUESE_EDITORIAL_PATH = '/revistas-cientificas'
const ENGLISH_EDITORIAL_PATH = '/journals'

export const swedishEditorialCookieConsent: CookieConsentCopy = {
  message:
    'Den här webbplatsen använder cookies för att mäta annonsernas resultat och förbättra din upplevelse. Inga personuppgifter säljs.',
  accept: 'Acceptera',
  decline: 'Avvisa',
}

export const italianEditorialCookieConsent: CookieConsentCopy = {
  message:
    'Questo sito utilizza cookie per misurare i risultati delle campagne pubblicitarie e migliorare la vostra esperienza. Nessun dato personale viene venduto.',
  accept: 'Accetta',
  decline: 'Rifiuta',
}

export const portugueseEditorialCookieConsent: CookieConsentCopy = {
  message:
    'Este sítio utiliza cookies para medir os resultados das campanhas publicitárias e melhorar a sua experiência. Nenhum dado pessoal é vendido.',
  accept: 'Aceitar',
  decline: 'Recusar',
}

export const englishEditorialCookieConsent: CookieConsentCopy = {
  message:
    'This site uses cookies to measure the results of advertising campaigns and improve your experience. No personal data is sold.',
  accept: 'Accept',
  decline: 'Decline',
}

function isUnder(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`)
}

export function getCookieConsentCopy(
  pathname: string,
  defaultCopy: CookieConsentCopy
) {
  if (isUnder(pathname, SWEDISH_EDITORIAL_PATH)) return swedishEditorialCookieConsent
  if (isUnder(pathname, ITALIAN_EDITORIAL_PATH) || isUnder(pathname, ITALIAN_INSTITUTIONS_PATH)) {
    return italianEditorialCookieConsent
  }
  if (isUnder(pathname, PORTUGUESE_EDITORIAL_PATH)) return portugueseEditorialCookieConsent
  if (isUnder(pathname, ENGLISH_EDITORIAL_PATH)) return englishEditorialCookieConsent
  return defaultCopy
}
