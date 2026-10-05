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

export interface LettrineAppCopy {
  locale: LettrineLocale
  htmlLang: string
  landingPath: string
  brand: string
  paths: { signup: string; login: string; confirm: string; dashboard: string }
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
    },
  },
}

export function getLettrineAppCopy(locale: LettrineLocale): LettrineAppCopy {
  return lettrineAppCopy[locale]
}
