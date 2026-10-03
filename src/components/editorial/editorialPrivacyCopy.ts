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
  sections: Array<{ heading: string; paragraphs: string[] }>
}

const CONTACT = 'contact@auditelle.fr'

export const editorialPrivacyCopy: Record<EditorialLocale, EditorialPrivacyCopy> = {
  fr: {
    locale: 'fr',
    htmlLang: 'fr',
    path: '/revues-scientifiques/confidentialite',
    backPath: '/revues-scientifiques',
    backLabel: 'Retour à Auditelle Éditorial',
    metadata: {
      title: 'Données personnelles | Auditelle Éditorial',
      description:
        'Comment Auditelle traite les données transmises via le formulaire de demande de compte démo Éditorial.',
    },
    title: 'Données personnelles : demandes de compte démo',
    updated: 'Dernière mise à jour : octobre 2026',
    sections: [
      {
        heading: 'Responsable du traitement',
        paragraphs: [
          `Auditelle SASU, Paris, France, SIREN 945117000. Contact : ${CONTACT}.`,
        ],
      },
      {
        heading: 'Données traitées',
        paragraphs: [
          "Nom, email professionnel, revue ou organisation, fonction, nombre de revues, volume de manuscrits, formule envisagée et le contexte que vous choisissez de rédiger.",
          "Votre adresse IP est également traitée de façon temporaire pour limiter les abus du formulaire.",
        ],
      },
      {
        heading: 'Finalités et bases légales',
        paragraphs: [
          "Répondre à votre demande de compte démo et échanger avec vous à ce sujet : mesures précontractuelles prises à votre demande (article 6.1.b du RGPD).",
          "Protéger le formulaire contre les abus : intérêt légitime (article 6.1.f du RGPD).",
        ],
      },
      {
        heading: 'Destinataires',
        paragraphs: [
          "Vos données ne sont jamais vendues. Elles sont traitées par nos prestataires techniques : Vercel (hébergement du site), Resend (envoi des emails), Google Workspace (notre messagerie) et Plausible (statistiques de visite sans cookies).",
          "Certains de ces prestataires peuvent traiter des données hors de l'Union européenne. Ces transferts reposent alors sur les clauses contractuelles types de la Commission européenne ou sur le cadre de protection des données UE-États-Unis.",
        ],
      },
      {
        heading: 'Durée de conservation',
        paragraphs: [
          "Les demandes qui ne donnent pas lieu à une collaboration sont supprimées au plus tard 12 mois après notre dernier échange.",
          "Les journaux techniques et les données de protection contre les abus sont conservés au maximum 30 jours.",
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
          "Les cookies de mesure d'audience et de mesure publicitaire ne sont activés que si vous les acceptez dans le bandeau cookies. Vous pouvez modifier votre choix à tout moment via le lien « Gérer les cookies » en bas de la page Auditelle Éditorial.",
        ],
      },
    ],
  },
  sv: {
    locale: 'sv',
    htmlLang: 'sv',
    path: '/vetenskapliga-tidskrifter/integritet',
    backPath: '/vetenskapliga-tidskrifter',
    backLabel: 'Tillbaka till Verify Editorial',
    metadata: {
      title: 'Personuppgifter | Verify Editorial',
      description:
        'Så behandlar Auditelle de uppgifter som skickas via formuläret för demokonto i Verify Editorial.',
    },
    title: 'Personuppgifter: förfrågningar om demokonto',
    updated: 'Senast uppdaterad: oktober 2026',
    sections: [
      {
        heading: 'Personuppgiftsansvarig',
        paragraphs: [
          `Auditelle SASU, Paris, Frankrike, SIREN 945117000. Kontakt: ${CONTACT}.`,
        ],
      },
      {
        heading: 'Vilka uppgifter vi behandlar',
        paragraphs: [
          'Namn, arbetsrelaterad e-postadress, tidskrift eller organisation, roll, antal tidskrifter, antal manuskript per år, önskad prisplan och den bakgrund du själv väljer att skriva.',
          'Din IP-adress behandlas också tillfälligt för att begränsa missbruk av formuläret.',
        ],
      },
      {
        heading: 'Ändamål och rättslig grund',
        paragraphs: [
          'Att besvara din förfrågan om ett demokonto och kommunicera med dig om den: åtgärder som vidtas på din begäran innan ett eventuellt avtal ingås (artikel 6.1 b i dataskyddsförordningen).',
          'Att skydda formuläret mot missbruk: berättigat intresse (artikel 6.1 f i dataskyddsförordningen).',
        ],
      },
      {
        heading: 'Mottagare',
        paragraphs: [
          'Dina uppgifter säljs aldrig. De behandlas av våra tekniska leverantörer: Vercel (drift av webbplatsen), Resend (utskick av e-post), Google Workspace (vår e-post) och Plausible (besöksstatistik utan cookies).',
          'Vissa av dessa leverantörer kan behandla uppgifter utanför EU/EES. Sådana överföringar sker i så fall med stöd av EU-kommissionens standardavtalsklausuler eller ramverket för dataskydd mellan EU och USA.',
        ],
      },
      {
        heading: 'Hur länge uppgifterna sparas',
        paragraphs: [
          'Förfrågningar som inte leder till ett samarbete raderas senast 12 månader efter vår senaste kontakt.',
          'Tekniska loggar och uppgifter för skydd mot missbruk sparas i högst 30 dagar.',
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
          'Cookies för besöksstatistik och annonsmätning används bara om du godkänner dem i cookiebannern. Du kan när som helst ändra ditt val via länken ”Hantera cookies” längst ned på sidan för Verify Editorial.',
        ],
      },
    ],
  },
}

export function getEditorialPrivacyCopy(locale: EditorialLocale) {
  return editorialPrivacyCopy[locale]
}
