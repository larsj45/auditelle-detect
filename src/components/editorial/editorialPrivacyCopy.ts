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
  pt: {
    locale: 'pt',
    htmlLang: 'pt-PT',
    path: '/revistas-cientificas/privacidade',
    backPath: '/revistas-cientificas',
    backLabel: 'Voltar à Lettrine Editorial',
    metadata: {
      title: 'Política de privacidade | Lettrine Editorial',
      description:
        'Como a Auditelle trata os dados enviados através do formulário de pedido de conta de demonstração da Lettrine Editorial.',
    },
    title: 'Política de privacidade: pedidos de conta de demonstração',
    updated: 'Última atualização: outubro de 2026',
    sections: [
      {
        heading: 'Responsável pelo tratamento',
        paragraphs: [
          `Auditelle SASU, Paris, França, SIREN 945117000. Contacto: ${CONTACT}.`,
        ],
      },
      {
        heading: 'Dados tratados',
        paragraphs: [
          'Nome completo, email profissional, revista ou organização, função, número de revistas, volume anual de manuscritos, oferta de interesse e as informações de contexto que decida fornecer.',
          'O seu endereço IP é também tratado temporariamente para prevenir a utilização abusiva do formulário.',
        ],
      },
      {
        heading: 'Finalidades e fundamentos jurídicos',
        paragraphs: [
          'Responder ao seu pedido de conta de demonstração e comunicar consigo a esse respeito: diligências pré-contratuais a seu pedido (artigo 6.º, n.º 1, alínea b), do RGPD).',
          'Proteger o formulário contra utilizações abusivas: interesse legítimo do responsável pelo tratamento (artigo 6.º, n.º 1, alínea f), do RGPD).',
        ],
      },
      {
        heading: 'Destinatários',
        paragraphs: [
          'Os seus dados nunca são vendidos. São tratados pelos nossos prestadores técnicos, na qualidade de subcontratantes: Vercel (alojamento do sítio), Resend (envio de emails), Google Workspace (o nosso correio eletrónico) e Plausible (estatísticas de visitas sem cookies).',
          'Alguns destes prestadores podem tratar dados fora da União Europeia. Nesse caso, as transferências baseiam-se nas cláusulas contratuais-tipo adotadas pela Comissão Europeia ou no Quadro de Privacidade de Dados UE-EUA (Data Privacy Framework).',
        ],
      },
      {
        heading: 'Prazo de conservação',
        paragraphs: [
          'Os pedidos que não deem origem a uma colaboração são eliminados no prazo de 12 meses após o último contacto.',
          'Os registos técnicos e os dados utilizados para prevenir abusos são conservados durante um máximo de 30 dias.',
        ],
      },
      {
        heading: 'Os seus direitos',
        paragraphs: [
          `Tem direito de acesso, retificação, apagamento, limitação do tratamento, oposição e portabilidade dos dados. Escreva-nos para ${CONTACT}.`,
          'Pode também apresentar reclamação à Comissão Nacional de Proteção de Dados (cnpd.pt), à CNIL em França (cnil.fr) ou à autoridade de controlo do seu país.',
        ],
      },
      {
        heading: 'Cookies',
        paragraphs: [
          'Os cookies de medição de audiência e de campanhas publicitárias só são ativados se os aceitar no aviso de cookies. Pode alterar a sua escolha a qualquer momento através da ligação «Gerir cookies», no fundo da página da Lettrine Editorial.',
        ],
      },
    ],
  },
  en: {
    locale: 'en',
    htmlLang: 'en',
    path: '/journals/privacy',
    backPath: '/journals',
    backLabel: 'Back to Lettrine Editorial',
    metadata: {
      title: 'Privacy notice | Lettrine Editorial',
      description:
        'How Auditelle processes the data sent through the Lettrine Editorial demo account request form.',
    },
    title: 'Privacy notice: demo account requests',
    updated: 'Last updated: October 2026',
    sections: [
      {
        heading: 'Controller',
        paragraphs: [
          `Auditelle SASU, Paris, France, SIREN 945117000. Contact: ${CONTACT}.`,
        ],
      },
      {
        heading: 'Data processed',
        paragraphs: [
          'Full name, professional email, journal or organisation, role, number of journals, annual manuscript volume, offer of interest and any context you choose to provide.',
          'Your IP address is also processed temporarily to prevent abuse of the form.',
        ],
      },
      {
        heading: 'Purposes and legal bases',
        paragraphs: [
          'Replying to your demo account request and corresponding with you about it: steps taken at your request prior to entering into a contract (Article 6(1)(b) GDPR).',
          'Protecting the form against abuse: the controller’s legitimate interest (Article 6(1)(f) GDPR).',
        ],
      },
      {
        heading: 'Recipients',
        paragraphs: [
          'Your data is never sold. It is processed by our technical providers acting as processors: Vercel (website hosting), Resend (email delivery), Google Workspace (our email) and Plausible (cookie-free visit statistics).',
          'Some of these providers may process data outside the European Union. Where they do, transfers rely on the standard contractual clauses adopted by the European Commission or on the EU-US Data Privacy Framework.',
        ],
      },
      {
        heading: 'Retention',
        paragraphs: [
          'Requests that do not lead to a collaboration are deleted within 12 months of the last exchange.',
          'Technical logs and data used to prevent abuse are kept for up to 30 days.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          `You have the right of access, rectification, erasure, restriction of processing, objection and data portability. Write to us at ${CONTACT}.`,
          'You may also lodge a complaint with the CNIL in France (cnil.fr) or with the supervisory authority of your country.',
        ],
      },
      {
        heading: 'Cookies',
        paragraphs: [
          'Audience and advertising measurement cookies are only enabled if you accept them in the cookie banner. You can change your choice at any time through the “Manage cookies” link at the bottom of the Lettrine Editorial page.',
        ],
      },
    ],
  },
}

export function getEditorialPrivacyCopy(locale: EditorialLocale) {
  return editorialPrivacyCopy[locale]
}
