import type { LettrineLocale } from '../../lib/lettrine/signup.ts'
import type { SignupErrorCode } from '../../lib/lettrine/signup.ts'

// UI copy for the Lettrine self-service app. Swedish is conservative and has
// not had a native review yet (to schedule before launch).

export type AppErrorCode =
  | SignupErrorCode
  | 'already_registered'
  | 'rate_limited'
  | 'delivery_unavailable'
  | 'invalid_credentials'
  | 'email_not_confirmed'
  | 'unknown'
  | 'manuscript_ref_required'
  | 'too_short'
  | 'too_long'
  | 'insufficient_units'
  | 'analysis_failed'
  | 'no_org'
  | 'unsupported_file'
  | 'extract_failed'

export interface LettrineAppCopy {
  locale: LettrineLocale
  htmlLang: string
  landingPath: string
  brand: string
  paths: { signup: string; login: string; confirm: string; dashboard: string; newAnalysis: string; analysis: (id: string) => string }
  common: { back: string; logout: string; loading: string; required: string }
  signup: {
    metaTitle: string
    title: string
    intro: string
    name: string
    email: string
    emailHint: string
    journal: string
    password: string
    passwordHint: string
    termsLead: string
    termsLink: string
    dpaLink: string
    termsJoin: string
    dataNotice: string
    submit: string
    submitting: string
    haveAccount: string
    loginLink: string
    sentTitle: string
    sentBody: (email: string) => string
  }
  login: {
    metaTitle: string
    title: string
    email: string
    password: string
    submit: string
    submitting: string
    noAccount: string
    signupLink: string
  }
  confirm: {
    metaTitle: string
    working: string
    failed: string
  }
  dashboard: {
    metaTitle: string
    balanceLabel: string
    unitsSuffix: string
    unitExplainer: string
    trialGranted: (units: number) => string
    trialAlreadyUsed: string
    newAnalysis: string
    newAnalysisSoon: string
    historyTitle: string
    historyEmpty: string
  }
  analysis: {
    metaTitle: string
    title: string
    intro: string
    reference: string
    referenceHint: string
    titleField: string
    optional: string
    text: string
    textPlaceholder: string
    upload: string
    uploadHint: string
    extracting: string
    words: (n: number) => string
    cost: (units: number) => string
    balance: (units: number) => string
    notEnough: string
    buyMore: string
    dataNotice: string
    submit: (units: number) => string
    submitting: string
  }
  report: {
    metaTitle: string
    disclaimerTitle: string
    disclaimer: string
    reference: string
    created: string
    wordsUnits: (words: number, units: number) => string
    aiTitle: string
    aiShares: (ai: number, assisted: number, human: number) => string
    aiLegend: { ai: string; assisted: string; human: string }
    segmentsTitle: string
    segmentsSummary: (high: number, medium: number, words: number) => string
    level: { high: string; medium: string }
    noSegments: string
    aiUnavailable: string
    similarityTitle: string
    similarityPercent: (percent: number) => string
    noSources: string
    similarityUnavailable: string
    partial: string
    backToOverview: string
    notFound: string
  }
  email: {
    subject: string
    greeting: (name: string) => string
    body: (journal: string) => string
    cta: string
    ignore: string
    signature: string
  }
  errors: Record<AppErrorCode, string>
}

export const lettrineAppCopy: Record<LettrineLocale, LettrineAppCopy> = {
  sv: {
    locale: 'sv',
    htmlLang: 'sv',
    landingPath: '/vetenskapliga-tidskrifter',
    brand: 'Lettrine',
    paths: {
      signup: '/app/sv/signup',
      login: '/app/sv/login',
      confirm: '/app/sv/confirm',
      dashboard: '/app/sv',
      newAnalysis: '/app/sv/new',
      analysis: (id) => `/app/sv/analysis/${id}`,
    },
    common: {
      back: 'Tillbaka till Lettrine Editorial',
      logout: 'Logga ut',
      loading: 'Laddar…',
      required: 'Obligatoriskt',
    },
    signup: {
      metaTitle: 'Skapa konto | Lettrine Editorial',
      title: 'Skapa ett konto för er tidskrift',
      intro: 'Kontot är gratis och innehåller 10 analysenheter för att prova tjänsten. Inget möte krävs.',
      name: 'Namn',
      email: 'Arbetsrelaterad e-postadress',
      emailHint: 'Använd tidskriftens eller organisationens adress.',
      journal: 'Tidskrift eller organisation',
      password: 'Lösenord',
      passwordHint: 'Minst 10 tecken.',
      termsLead: 'Jag godkänner',
      termsLink: 'användarvillkoren',
      dpaLink: 'personuppgiftsbiträdesavtalet',
      termsJoin: 'och',
      dataNotice: 'Texter som analyseras behandlas av vår underleverantör Pangram Labs i USA. Hela manuskriptet sparas inte hos oss.',
      submit: 'Skapa konto',
      submitting: 'Skapar konto…',
      haveAccount: 'Har ni redan ett konto?',
      loginLink: 'Logga in',
      sentTitle: 'Bekräfta din e-postadress',
      sentBody: (email) => `Vi har skickat en länk till ${email}. Klicka på länken för att aktivera kontot.`,
    },
    login: {
      metaTitle: 'Logga in | Lettrine Editorial',
      title: 'Logga in',
      email: 'E-postadress',
      password: 'Lösenord',
      submit: 'Logga in',
      submitting: 'Loggar in…',
      noAccount: 'Inget konto ännu?',
      signupLink: 'Skapa ett konto',
    },
    confirm: {
      metaTitle: 'Bekräftar | Lettrine Editorial',
      working: 'Vi aktiverar ert konto…',
      failed: 'Länken är ogiltig eller har gått ut. Logga in eller skapa kontot igen.',
    },
    dashboard: {
      metaTitle: 'Översikt | Lettrine Editorial',
      balanceLabel: 'Tillgängliga analysenheter',
      unitsSuffix: 'enheter',
      unitExplainer: 'En enhet motsvarar upp till 1 000 ord, med både AI-signaler och textlikhet.',
      trialGranted: (units) => `Välkommen! ${units} enheter har lagts till för att prova tjänsten.`,
      trialAlreadyUsed: 'Provenheterna har redan använts av en annan användare med samma e-postdomän.',
      newAnalysis: 'Ny analys',
      newAnalysisSoon: 'Analysfunktionen öppnar inom kort.',
      historyTitle: 'Analyser',
      historyEmpty: 'Inga analyser ännu.',
    },
    analysis: {
      metaTitle: 'Ny analys | Lettrine Editorial',
      title: 'Ny analys',
      intro: 'Klistra in manuskriptets text eller ladda upp en fil. Du ser kostnaden innan analysen startar.',
      reference: 'Manuskriptets referens',
      referenceHint: 'Er interna beteckning, till exempel MS-2026-014. Ange inte författarens namn.',
      titleField: 'Titel',
      optional: 'valfritt',
      text: 'Text',
      textPlaceholder: 'Klistra in manuskriptets text här.',
      upload: 'Ladda upp PDF, DOCX eller TXT',
      uploadHint: 'Texten läses i din webbläsare. Filen skickas inte till oss.',
      extracting: 'Läser filen…',
      words: (n) => `${n.toLocaleString('sv-SE')} ord`,
      cost: (units) => `Kostnad: ${units} ${units === 1 ? 'enhet' : 'enheter'}`,
      balance: (units) => `Tillgängligt: ${units} enheter`,
      notEnough: 'Saldot räcker inte för den här texten.',
      buyMore: 'Köp fler enheter',
      dataNotice: 'Texten skickas till Pangram Labs (USA) för analys. Vi sparar resultatet och de markerade avsnitten, inte hela manuskriptet.',
      submit: (units) => `Starta analysen (${units} ${units === 1 ? 'enhet' : 'enheter'})`,
      submitting: 'Analyserar… det kan ta upp till en minut.',
    },
    report: {
      metaTitle: 'Rapport | Lettrine Editorial',
      disclaimerTitle: 'Signaler, inte beslut',
      disclaimer: 'Rapporten visar signaler och avsnitt som kan behöva granskas. Den bevisar inte hur texten har skrivits. Tolkningen och beslutet görs alltid av redaktionen.',
      reference: 'Referens',
      created: 'Analyserad',
      wordsUnits: (words, units) => `${words.toLocaleString('sv-SE')} ord · ${units} ${units === 1 ? 'enhet' : 'enheter'}`,
      aiTitle: 'Tecken på AI-genererat innehåll',
      aiShares: (ai, assisted, human) => `Uppskattad andel av texten: ${ai} % AI-genererad, ${assisted} % AI-assisterad, ${human} % mänskligt skriven.`,
      aiLegend: { ai: 'AI-genererad', assisted: 'AI-assisterad', human: 'Mänskligt skriven' },
      segmentsTitle: 'Avsnitt att granska',
      segmentsSummary: (high, medium, words) => `${high} avsnitt med stark signal och ${medium} med måttlig signal (${words.toLocaleString('sv-SE')} ord).`,
      level: { high: 'Stark signal', medium: 'Måttlig signal' },
      noSegments: 'Inga avsnitt med tydliga signaler.',
      aiUnavailable: 'AI-analysen kunde inte genomföras för den här texten.',
      similarityTitle: 'Textlikhet',
      similarityPercent: (percent) => `${percent} % av texten liknar andra källor.`,
      noSources: 'Inga matchande källor hittades.',
      similarityUnavailable: 'Textlikhetsanalysen kunde inte genomföras för den här texten.',
      partial: 'En av analyserna kunde inte genomföras. Rapporten visar det som finns.',
      backToOverview: 'Till översikten',
      notFound: 'Rapporten finns inte eller har raderats.',
    },
    email: {
      subject: 'Bekräfta ditt konto hos Lettrine Editorial',
      greeting: (name) => `Hej ${name},`,
      body: (journal) => `Tack för att du skapade ett konto för ${journal}. Bekräfta din e-postadress för att aktivera kontot.`,
      cta: 'Bekräfta e-postadressen',
      ignore: 'Om du inte har skapat något konto kan du bortse från detta meddelande.',
      signature: 'Lettrine Editorial · Auditelle SASU',
    },
    errors: {
      invalid_request: 'Kontrollera uppgifterna och försök igen.',
      invalid_name: 'Ange ditt namn.',
      invalid_email: 'Ange en giltig e-postadress.',
      professional_email_required: 'Använd en arbetsrelaterad e-postadress, inte en privat adress.',
      invalid_journal: 'Ange tidskriftens eller organisationens namn.',
      weak_password: 'Lösenordet måste ha minst 10 tecken.',
      terms_required: 'Du behöver godkänna villkoren för att skapa kontot.',
      already_registered: 'Det finns redan ett konto med den här adressen. Logga in i stället.',
      rate_limited: 'För många försök. Vänta en stund och försök igen.',
      delivery_unavailable: 'Vi kunde inte skicka e-postmeddelandet just nu. Försök igen om en stund.',
      invalid_credentials: 'Fel e-postadress eller lösenord.',
      email_not_confirmed: 'Bekräfta din e-postadress via länken vi skickade.',
      unknown: 'Något gick fel. Försök igen.',
      manuscript_ref_required: 'Ange manuskriptets referens.',
      too_short: 'Texten är för kort för en analys (minst 50 ord).',
      too_long: 'Texten är för lång (högst 20 000 ord per analys).',
      insufficient_units: 'Saldot räcker inte för den här texten.',
      analysis_failed: 'Analysen kunde inte genomföras. Inga enheter har dragits. Försök igen om en stund.',
      no_org: 'Kontot är inte kopplat till någon tidskrift ännu.',
      unsupported_file: 'Filformatet stöds inte. Använd PDF, DOCX eller TXT.',
      extract_failed: 'Texten kunde inte läsas från filen. Klistra in den i stället.',
    },
  },
  fr: {
    locale: 'fr',
    htmlLang: 'fr',
    landingPath: '/revues-scientifiques',
    brand: 'Lettrine',
    paths: {
      signup: '/app/fr/signup',
      login: '/app/fr/login',
      confirm: '/app/fr/confirm',
      dashboard: '/app/fr',
      newAnalysis: '/app/fr/new',
      analysis: (id) => `/app/fr/analysis/${id}`,
    },
    common: {
      back: 'Retour à Lettrine Éditorial',
      logout: 'Se déconnecter',
      loading: 'Chargement…',
      required: 'Obligatoire',
    },
    signup: {
      metaTitle: 'Créer un compte | Lettrine Éditorial',
      title: 'Créer un compte pour votre revue',
      intro: 'Le compte est gratuit et inclut 10 unités d’analyse pour essayer le service. Aucun rendez-vous requis.',
      name: 'Nom',
      email: 'Adresse email professionnelle',
      emailHint: 'Utilisez l’adresse de la revue ou de votre institution.',
      journal: 'Revue ou organisation',
      password: 'Mot de passe',
      passwordHint: '10 caractères minimum.',
      termsLead: 'J’accepte',
      termsLink: 'les conditions d’utilisation',
      dpaLink: 'l’accord de traitement des données',
      termsJoin: 'et',
      dataNotice: 'Les textes analysés sont traités par notre sous-traitant Pangram Labs aux États-Unis. Le manuscrit complet n’est pas conservé chez nous.',
      submit: 'Créer le compte',
      submitting: 'Création du compte…',
      haveAccount: 'Vous avez déjà un compte ?',
      loginLink: 'Se connecter',
      sentTitle: 'Confirmez votre adresse email',
      sentBody: (email) => `Nous avons envoyé un lien à ${email}. Cliquez sur ce lien pour activer le compte.`,
    },
    login: {
      metaTitle: 'Connexion | Lettrine Éditorial',
      title: 'Se connecter',
      email: 'Adresse email',
      password: 'Mot de passe',
      submit: 'Se connecter',
      submitting: 'Connexion…',
      noAccount: 'Pas encore de compte ?',
      signupLink: 'Créer un compte',
    },
    confirm: {
      metaTitle: 'Confirmation | Lettrine Éditorial',
      working: 'Nous activons votre compte…',
      failed: 'Ce lien est invalide ou a expiré. Connectez-vous ou créez à nouveau le compte.',
    },
    dashboard: {
      metaTitle: 'Tableau de bord | Lettrine Éditorial',
      balanceLabel: 'Unités d’analyse disponibles',
      unitsSuffix: 'unités',
      unitExplainer: 'Une unité correspond à 1 000 mots maximum, avec les signaux IA et la similarité.',
      trialGranted: (units) => `Bienvenue ! ${units} unités ont été ajoutées pour essayer le service.`,
      trialAlreadyUsed: 'Les unités d’essai ont déjà été utilisées par un autre compte du même domaine email.',
      newAnalysis: 'Nouvelle analyse',
      newAnalysisSoon: 'La fonction d’analyse ouvre très bientôt.',
      historyTitle: 'Analyses',
      historyEmpty: 'Aucune analyse pour le moment.',
    },
    analysis: {
      metaTitle: 'Nouvelle analyse | Lettrine Éditorial',
      title: 'Nouvelle analyse',
      intro: 'Collez le texte du manuscrit ou importez un fichier. Le coût s’affiche avant le lancement.',
      reference: 'Référence du manuscrit',
      referenceHint: 'Votre référence interne, par exemple MS-2026-014. N’indiquez pas le nom de l’auteur.',
      titleField: 'Titre',
      optional: 'facultatif',
      text: 'Texte',
      textPlaceholder: 'Collez ici le texte du manuscrit.',
      upload: 'Importer un PDF, DOCX ou TXT',
      uploadHint: 'Le texte est lu dans votre navigateur. Le fichier ne nous est pas envoyé.',
      extracting: 'Lecture du fichier…',
      words: (n) => `${n.toLocaleString('fr-FR')} mots`,
      cost: (units) => `Coût : ${units} ${units === 1 ? 'unité' : 'unités'}`,
      balance: (units) => `Disponible : ${units} unités`,
      notEnough: 'Le solde ne suffit pas pour ce texte.',
      buyMore: 'Acheter des unités',
      dataNotice: 'Le texte est envoyé à Pangram Labs (États-Unis) pour l’analyse. Nous conservons le résultat et les passages signalés, pas le manuscrit complet.',
      submit: (units) => `Lancer l’analyse (${units} ${units === 1 ? 'unité' : 'unités'})`,
      submitting: 'Analyse en cours… cela peut prendre jusqu’à une minute.',
    },
    report: {
      metaTitle: 'Rapport | Lettrine Éditorial',
      disclaimerTitle: 'Des signaux, pas un verdict',
      disclaimer: 'Le rapport présente des signaux et des passages à examiner. Il ne prouve pas la manière dont le texte a été écrit. L’interprétation et la décision appartiennent toujours au comité éditorial.',
      reference: 'Référence',
      created: 'Analysé le',
      wordsUnits: (words, units) => `${words.toLocaleString('fr-FR')} mots · ${units} ${units === 1 ? 'unité' : 'unités'}`,
      aiTitle: 'Signaux de contenu généré par IA',
      aiShares: (ai, assisted, human) => `Part estimée du texte : ${ai} % générée par IA, ${assisted} % assistée par IA, ${human} % rédigée par un humain.`,
      aiLegend: { ai: 'Générée par IA', assisted: 'Assistée par IA', human: 'Rédigée par un humain' },
      segmentsTitle: 'Passages à examiner',
      segmentsSummary: (high, medium, words) => `${high} passage(s) avec un signal fort et ${medium} avec un signal modéré (${words.toLocaleString('fr-FR')} mots).`,
      level: { high: 'Signal fort', medium: 'Signal modéré' },
      noSegments: 'Aucun passage avec un signal net.',
      aiUnavailable: 'L’analyse IA n’a pas pu être réalisée pour ce texte.',
      similarityTitle: 'Similarité',
      similarityPercent: (percent) => `${percent} % du texte ressemble à d’autres sources.`,
      noSources: 'Aucune source correspondante.',
      similarityUnavailable: 'L’analyse de similarité n’a pas pu être réalisée pour ce texte.',
      partial: 'L’une des analyses n’a pas pu être réalisée. Le rapport présente ce qui est disponible.',
      backToOverview: 'Retour au tableau de bord',
      notFound: 'Ce rapport n’existe pas ou a été supprimé.',
    },
    email: {
      subject: 'Confirmez votre compte Lettrine Éditorial',
      greeting: (name) => `Bonjour ${name},`,
      body: (journal) => `Merci d’avoir créé un compte pour ${journal}. Confirmez votre adresse email pour activer le compte.`,
      cta: 'Confirmer l’adresse email',
      ignore: 'Si vous n’avez pas créé de compte, vous pouvez ignorer ce message.',
      signature: 'Lettrine Éditorial · Auditelle SASU',
    },
    errors: {
      invalid_request: 'Vérifiez les informations et réessayez.',
      invalid_name: 'Indiquez votre nom.',
      invalid_email: 'Indiquez une adresse email valide.',
      professional_email_required: 'Utilisez une adresse professionnelle, pas une adresse personnelle.',
      invalid_journal: 'Indiquez le nom de la revue ou de l’organisation.',
      weak_password: 'Le mot de passe doit contenir au moins 10 caractères.',
      terms_required: 'Vous devez accepter les conditions pour créer le compte.',
      already_registered: 'Un compte existe déjà avec cette adresse. Connectez-vous.',
      rate_limited: 'Trop de tentatives. Patientez un instant et réessayez.',
      delivery_unavailable: 'Nous n’avons pas pu envoyer l’email. Réessayez dans un instant.',
      invalid_credentials: 'Adresse email ou mot de passe incorrect.',
      email_not_confirmed: 'Confirmez votre adresse email via le lien envoyé.',
      unknown: 'Une erreur est survenue. Réessayez.',
      manuscript_ref_required: 'Indiquez la référence du manuscrit.',
      too_short: 'Le texte est trop court pour une analyse (50 mots minimum).',
      too_long: 'Le texte est trop long (20 000 mots maximum par analyse).',
      insufficient_units: 'Le solde ne suffit pas pour ce texte.',
      analysis_failed: 'L’analyse n’a pas pu être réalisée. Aucune unité n’a été décomptée. Réessayez dans un instant.',
      no_org: 'Ce compte n’est encore rattaché à aucune revue.',
      unsupported_file: 'Format non pris en charge. Utilisez un PDF, DOCX ou TXT.',
      extract_failed: 'Le texte n’a pas pu être lu dans le fichier. Collez-le plutôt.',
    },
  },
}

export function getLettrineAppCopy(locale: LettrineLocale): LettrineAppCopy {
  return lettrineAppCopy[locale]
}
