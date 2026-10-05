import type { EditorialLocale } from './editorialCopy.ts'

export interface EditorialPrivacyCopy {
  locale: EditorialLocale
  htmlLang: string
  path: string
  backPath: string
  backLabel: string
  metadata: {
    title: string
    description: string
  }
  title: string
  updated: string
  // Shown as a banner while a legal text is still a draft.
  draftNotice?: string
  sections: Array<{ heading: string; paragraphs: string[] }>
}

const CONTACT = 'contact@auditelle.fr'

export const editorialPrivacyCopy: Record<EditorialLocale, EditorialPrivacyCopy> = {
  fr: {
    locale: 'fr',
    htmlLang: 'fr',
    path: '/revues-scientifiques/confidentialite',
    backPath: '/revues-scientifiques',
    backLabel: 'Retour à Lettrine Éditorial',
    metadata: {
      title: 'Données personnelles | Lettrine Éditorial',
      description: 'Comment Auditelle traite les données des comptes, des analyses et des paiements de Lettrine Éditorial.',
    },
    title: 'Données personnelles : Lettrine Éditorial',
    updated: 'Dernière mise à jour : octobre 2026',
    draftNotice: "Projet. Cette politique n'a pas encore fait l'objet d'une revue juridique.",
    sections: [
      {
        heading: 'Responsable du traitement',
        paragraphs: [
          `Auditelle SASU, 128 rue La Boétie, 75008 Paris, France, SIREN 945117000. Contact : ${CONTACT}.`,
          "Pour les textes soumis à l'analyse, Auditelle agit comme sous-traitant de la revue, selon l'accord de traitement des données. La présente politique couvre les données dont Auditelle est responsable : comptes, paiements et sécurité du site.",
        ],
      },
      {
        heading: 'Données traitées',
        paragraphs: [
          "Compte : nom, adresse email professionnelle, nom de la revue, mot de passe (stocké sous forme chiffrée par notre fournisseur d'authentification), acceptation des conditions.",
          "Utilisation : références des manuscrits, nombre de mots, unités consommées, décisions et notes éditoriales.",
          "Paiement : nom et adresse de facturation, numéro de TVA. Les données de carte sont traitées uniquement par Stripe.",
          "Sécurité : adresse IP, traitée temporairement pour limiter les abus.",
        ],
      },
      {
        heading: 'Finalités et bases légales',
        paragraphs: [
          "Fournir le compte et le service : exécution du contrat (article 6.1.b du RGPD).",
          "Facturation et comptabilité : obligation légale (article 6.1.c du RGPD).",
          "Sécurité et prévention des abus : intérêt légitime (article 6.1.f du RGPD).",
        ],
      },
      {
        heading: 'Destinataires',
        paragraphs: [
          "Vos données ne sont jamais vendues. Elles sont traitées par nos prestataires : Supabase (base de données et authentification, Union européenne, Paris), Vercel (hébergement du site, région de Paris), Resend (emails du service), Stripe (paiement), Pangram Labs (analyse des textes, États-Unis), Google Workspace (notre messagerie) et Plausible (statistiques de visite sans cookies).",
          "Certains prestataires peuvent traiter des données hors de l'Union européenne. Ces transferts reposent sur les clauses contractuelles types de la Commission européenne ou sur le cadre de protection des données UE-États-Unis.",
        ],
      },
      {
        heading: 'Durée de conservation',
        paragraphs: [
          "Données de compte : pendant la durée du compte, puis 12 mois après sa fermeture.",
          "Analyses et décisions : suppression automatique 180 jours après l'analyse, ou plus tôt à la demande de la revue.",
          "Factures et pièces comptables : 10 ans, conformément au Code de commerce.",
          "Journaux techniques et données de protection contre les abus : 30 jours maximum.",
        ],
      },
      {
        heading: 'Vos droits',
        paragraphs: [
          `Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité. Écrivez-nous à ${CONTACT}.`,
          "Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr) ou de l'autorité de protection des données de votre pays.",
        ],
      },
      {
        heading: 'Cookies',
        paragraphs: [
          "Les cookies de mesure d'audience et de mesure publicitaire ne sont activés que si vous les acceptez dans le bandeau cookies. Vous pouvez modifier votre choix à tout moment via le lien « Gérer les cookies » en bas de la page Lettrine Éditorial.",
        ],
      },
    ],
  },
  sv: {
    locale: 'sv',
    htmlLang: 'sv',
    path: '/vetenskapliga-tidskrifter/integritet',
    backPath: '/vetenskapliga-tidskrifter',
    backLabel: 'Tillbaka till Lettrine Editorial',
    metadata: {
      title: 'Personuppgifter | Lettrine Editorial',
      description: 'Så behandlar Auditelle personuppgifter för konton, analyser och betalningar i Lettrine Editorial.',
    },
    title: 'Personuppgifter i Lettrine Editorial',
    updated: 'Senast uppdaterad: oktober 2026',
    draftNotice: 'Utkast. Policyn har ännu inte granskats juridiskt.',
    sections: [
      {
        heading: 'Personuppgiftsansvarig',
        paragraphs: [
          `Auditelle SASU, 128 rue La Boétie, 75008 Paris, Frankrike, SIREN 945117000. Kontakt: ${CONTACT}.`,
          'För texter som skickas in för analys är Auditelle personuppgiftsbiträde åt tidskriften enligt personuppgiftsbiträdesavtalet. Den här policyn gäller de uppgifter som Auditelle själv ansvarar för: konton, betalningar och webbplatsens säkerhet.',
        ],
      },
      {
        heading: 'Vilka uppgifter vi behandlar',
        paragraphs: [
          'Konto: namn, arbetsrelaterad e-postadress, tidskriftens namn, lösenord (sparas krypterat hos vår autentiseringsleverantör) och godkännande av villkoren.',
          'Användning: manuskriptreferenser, antal ord, använda enheter samt redaktionella beslut och anteckningar.',
          'Betalning: faktureringsnamn, adress och momsregistreringsnummer. Kortuppgifter behandlas endast av Stripe.',
          'Säkerhet: IP-adress, som behandlas tillfälligt för att begränsa missbruk.',
        ],
      },
      {
        heading: 'Ändamål och rättslig grund',
        paragraphs: [
          'Tillhandahålla konto och tjänst: fullgörande av avtal (artikel 6.1 b i dataskyddsförordningen).',
          'Fakturering och bokföring: rättslig förpliktelse (artikel 6.1 c i dataskyddsförordningen).',
          'Säkerhet och skydd mot missbruk: berättigat intresse (artikel 6.1 f i dataskyddsförordningen).',
        ],
      },
      {
        heading: 'Mottagare',
        paragraphs: [
          'Dina uppgifter säljs aldrig. De behandlas av våra leverantörer: Supabase (databas och autentisering, Europeiska unionen, Paris), Vercel (drift av webbplatsen, region Paris), Resend (e-post från tjänsten), Stripe (betalning), Pangram Labs (analys av texter, USA), Google Workspace (vår e-post) och Plausible (besöksstatistik utan cookies).',
          'Vissa leverantörer kan behandla uppgifter utanför EU/EES. Sådana överföringar sker med stöd av EU-kommissionens standardavtalsklausuler eller ramverket för dataskydd mellan EU och USA.',
        ],
      },
      {
        heading: 'Hur länge uppgifterna sparas',
        paragraphs: [
          'Kontouppgifter: så länge kontot finns och 12 månader efter att det har avslutats.',
          'Analyser och beslut: raderas automatiskt 180 dagar efter analysen, eller tidigare om tidskriften begär det.',
          'Fakturor och bokföringsunderlag: 10 år enligt fransk handelsrätt.',
          'Tekniska loggar och uppgifter för skydd mot missbruk: högst 30 dagar.',
        ],
      },
      {
        heading: 'Dina rättigheter',
        paragraphs: [
          `Du har rätt till tillgång, rättelse, radering, begränsning, invändning och dataportabilitet. Skriv till oss på ${CONTACT}.`,
          'Du kan också lämna klagomål till Integritetsskyddsmyndigheten (imy.se) eller till CNIL i Frankrike (cnil.fr).',
        ],
      },
      {
        heading: 'Cookies',
        paragraphs: [
          'Cookies för besöksstatistik och annonsmätning används bara om du godkänner dem i cookiebannern. Du kan när som helst ändra ditt val via länken ”Hantera cookies” längst ned på sidan för Lettrine Editorial.',
        ],
      },
    ],
  },
}

export function getEditorialPrivacyCopy(locale: EditorialLocale) {
  return editorialPrivacyCopy[locale]
}
