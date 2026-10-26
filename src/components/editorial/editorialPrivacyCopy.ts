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
    backLabel: 'Retour à Lettrine Éditorial',
    metadata: {
      title: 'Données personnelles | Lettrine Éditorial',
      description:
        'Comment Auditelle traite les données transmises via le formulaire de demande de compte démo Lettrine Éditorial.',
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
      description:
        'Så behandlar Auditelle de uppgifter som skickas via formuläret för demokonto i Lettrine Editorial.',
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
          'Cookies för besöksstatistik och annonsmätning används bara om du godkänner dem i cookiebannern. Du kan när som helst ändra ditt val via länken ”Hantera cookies” längst ned på sidan för Lettrine Editorial.',
        ],
      },
    ],
  },
  it: {
    locale: 'it',
    htmlLang: 'it',
    path: '/riviste-scientifiche/privacy',
    backPath: '/riviste-scientifiche',
    backLabel: 'Torna a Lettrine Editoriale',
    metadata: {
      title: 'Informativa privacy | Lettrine Editoriale',
      description:
        'Come Auditelle tratta i dati inviati tramite il modulo di richiesta di un account demo di Lettrine Editoriale.',
    },
    title: 'Informativa privacy: richieste di account demo',
    updated: 'Ultimo aggiornamento: ottobre 2026',
    sections: [
      {
        heading: 'Titolare del trattamento',
        paragraphs: [
          `Auditelle SASU, Parigi, Francia, SIREN 945117000. Contatto: ${CONTACT}.`,
        ],
      },
      {
        heading: 'Dati trattati',
        paragraphs: [
          'Nome e cognome, email professionale, rivista o organizzazione, ruolo, numero di riviste, volume annuo di manoscritti, offerta di interesse e le informazioni di contesto che scegliete di fornire.',
          'Il vostro indirizzo IP viene inoltre trattato temporaneamente per prevenire abusi del modulo.',
        ],
      },
      {
        heading: 'Finalità e basi giuridiche',
        paragraphs: [
          'Rispondere alla vostra richiesta di account demo e comunicare con voi in merito: esecuzione di misure precontrattuali adottate su vostra richiesta (articolo 6, paragrafo 1, lettera b), del GDPR).',
          'Proteggere il modulo da abusi: legittimo interesse del titolare (articolo 6, paragrafo 1, lettera f), del GDPR).',
        ],
      },
      {
        heading: 'Destinatari',
        paragraphs: [
          'I vostri dati non vengono mai venduti. Sono trattati dai nostri fornitori tecnici, in qualità di responsabili del trattamento: Vercel (hosting del sito), Resend (invio delle email), Google Workspace (la nostra posta elettronica) e Plausible (statistiche di visita senza cookie).',
          "Alcuni di questi fornitori possono trattare dati al di fuori dell'Unione europea. In tal caso, i trasferimenti si basano sulle clausole contrattuali tipo adottate dalla Commissione europea o sul quadro UE-USA per la protezione dei dati (Data Privacy Framework).",
        ],
      },
      {
        heading: 'Periodo di conservazione',
        paragraphs: [
          'Le richieste che non danno luogo a una collaborazione vengono cancellate entro 12 mesi dall’ultimo scambio.',
          'I log tecnici e i dati utilizzati per prevenire abusi sono conservati per un massimo di 30 giorni.',
        ],
      },
      {
        heading: 'I vostri diritti',
        paragraphs: [
          `Avete il diritto di accesso, rettifica, cancellazione, limitazione del trattamento, opposizione e portabilità dei dati. Scriveteci a ${CONTACT}.`,
          "Potete inoltre proporre reclamo al Garante per la protezione dei dati personali (garanteprivacy.it), alla CNIL in Francia (cnil.fr) o all'autorità di controllo del vostro Paese.",
        ],
      },
      {
        heading: 'Cookie',
        paragraphs: [
          'I cookie di misurazione dell’audience e delle campagne pubblicitarie vengono attivati solo se li accettate nel banner dei cookie. Potete modificare la vostra scelta in qualsiasi momento tramite il link «Gestisci i cookie» in fondo alla pagina di Lettrine Editoriale.',
        ],
      },
    ],
  },
}

export function getEditorialPrivacyCopy(locale: EditorialLocale) {
  return editorialPrivacyCopy[locale]
}
