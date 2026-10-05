export type EditorialLocale = 'fr' | 'sv'
export type EditorialPlanId = 'undecided' | 'essential' | 'journal' | 'organization'
export type EditorialJournalCount = 'one' | 'two_to_five' | 'six_plus'
export type EditorialVolume = 'under_300' | '300_600' | '600_1500' | 'over_1500'
export type EditorialErrorCode =
  | 'invalid_request'
  | 'professional_email_required'
  | 'too_large'
  | 'rate_limited'
  | 'delivery_unavailable'

interface EditorialPlan {
  id: Exclude<EditorialPlanId, 'undecided'>
  name: string
  audience: string
  price: string
  period: string
  volume: string
  features: string[]
  featured?: boolean
}

export interface EditorialCopy {
  locale: EditorialLocale
  htmlLang: string
  openGraphLocale: string
  path: string
  privacyNoticePath: string
  signupPath: string
  metadata: {
    title: string
    description: string
    pageName: string
    pageDescription: string
  }
  brand: {
    name: string
    product: string
    ariaLabel: string
  }
  navigation: {
    ariaLabel: string
    mobileAriaLabel: string
    product: string
    workflow: string
    privacy: string
    pricing: string
    faq: string
    openMenu: string
    closeMenu: string
  }
  common: {
    skipLink: string
    demoCta: string
    reportCta: string
    close: string
  }
  hero: {
    eyebrow: string
    title: string
    lead: string
    offerCta: string
    principlesAriaLabel: string
    principles: string[]
  }
  audience: {
    label: string
    items: string[]
  }
  workflow: {
    label: string
    title: string
    intro: string
    steps: Array<{ number: string; title: string; description: string }>
  }
  product: {
    label: string
    title: string
    intro: string
  }
  privacy: {
    label: string
    title: string
    intro: string
    principles: Array<{ number: string; title: string; description: string }>
  }
  pricing: {
    label: string
    title: string
    intro: string
    recommended: string
    plans: EditorialPlan[]
    noteTitle: string
    noteLead: string
    noteDetail: string
  }
  faq: {
    label: string
    title: string
    items: Array<{ question: string; answer: string }>
  }
  closing: {
    title: string
    description: string
  }
  footer: {
    legal: string
    privacyLink: string
    manageCookies: string
  }
  reportPreview: {
    ariaLabel: string
    id: string
    status: string
    kicker: string
    title: string
    aiValue: string
    aiLabel: string
    similarityValue: string
    similarityLabel: string
    beforeAi: string
    aiPassage: string
    betweenMarks: string
    similarityPassage: string
    note: string
    exportLabel: string
  }
  workspace: {
    ariaLabel: string
    brand: string
    cycle: string
    export: string
    newManuscript: string
    sidebar: string[]
    recentTitle: string
    recentSummary: string
    filter: string
    headers: string[]
    rows: string[][]
    reviewStatus: string
    readyStatus: string
  }
  reportModal: {
    title: string
    kicker: string
    manuscriptTitle: string
    paragraphs: Array<{
      before: string
      marked?: string
      after?: string
      tone?: 'ai' | 'similarity'
    }>
    findingsTitle: string
    findings: Array<{ title: string; detail: string; tone?: 'ochre' | 'green' }>
    exportLabel: string
  }
  form: {
    modalTitle: string
    intro: string
    name: string
    email: string
    organization: string
    role: string
    rolePlaceholder: string
    journalCount: string
    journalCountOptions: Array<{ value: EditorialJournalCount; label: string }>
    volume: string
    volumeOptions: Array<{ value: EditorialVolume; label: string }>
    plan: string
    planOptions: Array<{ value: EditorialPlanId; label: string }>
    context: string
    contextPlaceholder: string
    honeypot: string
    reassurance: string
    privacyNotice: { lead: string; link: string }
    submitting: string
    submit: string
    successTitle: string
    successMessage: string
    errors: Record<EditorialErrorCode, string>
  }
}

export const editorialCopy = {
  fr: {
    locale: 'fr',
    htmlLang: 'fr',
    openGraphLocale: 'fr_FR',
    path: '/revues-scientifiques',
    privacyNoticePath: '/revues-scientifiques/confidentialite',
    signupPath: '/app/fr/signup',
    metadata: {
      title: 'Lettrine Éditorial | Intégrité pour les revues scientifiques',
      description:
        "Lettrine Éditorial aide les revues scientifiques francophones à examiner les signaux liés à l'IA et à la similarité, puis à documenter la révision humaine.",
      pageName: 'Lettrine Éditorial',
      pageDescription:
        "Plateforme d'intégrité éditoriale pour les revues scientifiques francophones.",
    },
    brand: {
      name: 'Lettrine',
      product: 'Éditorial',
      ariaLabel: 'Lettrine Éditorial, accueil',
    },
    navigation: {
      ariaLabel: 'Navigation principale',
      mobileAriaLabel: 'Navigation mobile',
      product: 'Produit',
      workflow: 'Fonctionnement',
      privacy: 'Confidentialité',
      pricing: 'Tarifs',
      faq: 'FAQ',
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
    },
    common: {
      skipLink: 'Aller au contenu',
      demoCta: 'Essayer gratuitement',
      reportCta: 'Voir un exemple de rapport',
      close: 'Fermer',
    },
    hero: {
      eyebrow: "Plateforme d'intégrité éditoriale",
      title: "L'intégrité éditoriale pour les revues scientifiques francophones.",
      lead:
        "Analysez les manuscrits, identifiez les signaux liés à l'IA et à la similarité, puis documentez chaque décision éditoriale dans un rapport clair. La révision reste humaine.",
      offerCta: "Découvrir l'offre Éditorial",
      principlesAriaLabel: 'Principes du produit',
      principles: ['Signaux, pas verdicts', 'Décision documentée', 'Rapports exportables'],
    },
    audience: {
      label: 'Conçu pour celles et ceux qui publient',
      items: [
        'Revues scientifiques',
        "Maisons d'édition",
        'Sociétés savantes',
        'Comités scientifiques',
      ],
    },
    workflow: {
      label: 'Un processus documenté',
      title: 'De la soumission à la décision éditoriale, sans rupture de contexte.',
      intro:
        "Lettrine rassemble l'analyse, les passages à examiner et l'historique de la revue dans un espace de travail commun.",
      steps: [
        {
          number: '01',
          title: 'Soumettre',
          description:
            'Ajoutez un manuscrit et associez-le à la revue, au numéro ou au dossier éditorial concerné.',
        },
        {
          number: '02',
          title: 'Analyser',
          description:
            "Obtenez les signaux liés au contenu IA et à la similarité, avec les passages et sources disponibles.",
        },
        {
          number: '03',
          title: 'Examiner',
          description:
            'Le comité interprète les résultats dans le contexte scientifique. Lettrine ne rend pas de verdict.',
        },
        {
          number: '04',
          title: 'Documenter',
          description:
            "Exportez le rapport et conservez une trace claire de l'analyse dans l'historique éditorial.",
        },
      ],
    },
    product: {
      label: "L'espace éditorial",
      title: 'Une file de manuscrits claire pour la rédaction.',
      intro:
        "Suivez le statut de chaque analyse, les signaux à examiner et les rapports disponibles sans multiplier les feuilles de calcul.",
    },
    privacy: {
      label: 'Confidentialité par conception',
      title: 'Les manuscrits méritent un cadre explicite.',
      intro:
        'Lettrine indique clairement ce qui est conservé, pendant combien de temps et par quels prestataires le texte passe.',
      principles: [
        {
          number: '01',
          title: 'Manuscrit non conservé',
          description:
            'Nous conservons le résultat et les passages signalés, pas le manuscrit complet. Le fichier est lu dans votre navigateur.',
        },
        {
          number: '02',
          title: 'Suppression automatique',
          description:
            'Les analyses sont supprimées automatiquement après 180 jours et peuvent être supprimées plus tôt par la revue.',
        },
        {
          number: '03',
          title: 'Prestataires documentés',
          description:
            "Les moteurs d'analyse et les autres sous-traitants sont listés dans l'accord de traitement des données.",
        },
      ],
    },
    pricing: {
      label: 'Unités prépayées',
      title: 'Payez selon le volume de votre revue, sans abonnement.',
      intro:
        'Une unité correspond à 1 000 mots maximum, avec les signaux IA et la similarité. Les unités valent pour toute la revue pendant 24 mois.',
      recommended: 'Le plus choisi',
      plans: [
        {
          id: 'essential',
          name: '50 unités',
          audience: "Pour une petite revue, environ quinze articles de 3 000 mots.",
          price: '590 €',
          period: 'HT · 11,80 € par unité',
          volume: '1 unité = jusqu’à 1 000 mots',
          features: [
            'Signaux IA et similarité',
            'Passages signalés par niveau',
            'Décision éditoriale documentée',
            'Rapport exportable en PDF',
            'Support par email',
          ],
        },
        {
          id: 'journal',
          name: '200 unités',
          audience: 'Pour une revue active avec un flux régulier de soumissions.',
          price: '1 990 €',
          period: 'HT · 9,95 € par unité',
          volume: '1 unité = jusqu’à 1 000 mots',
          features: [
            'Signaux IA et similarité',
            'Passages signalés par niveau',
            'Décision éditoriale documentée',
            'Historique filtrable par décision',
            'Support par email',
          ],
          featured: true,
        },
        {
          id: 'organization',
          name: '500 unités',
          audience: "Pour une maison d'édition, une société savante ou plusieurs revues.",
          price: '3 990 €',
          period: 'HT · 7,98 € par unité',
          volume: '1 unité = jusqu’à 1 000 mots',
          features: [
            'Signaux IA et similarité',
            'Passages signalés par niveau',
            'Décision éditoriale documentée',
            'Historique filtrable par décision',
            'Support par email',
          ],
        },
      ],
      noteTitle: 'Essai gratuit :',
      noteLead: '10 unités offertes à la création du compte.',
      noteDetail:
        'Paiement par carte, facture envoyée par email, TVA appliquée selon le pays et le numéro de TVA de la revue. Les unités consommées ne sont pas remboursables.',
    },
    faq: {
      label: 'Questions fréquentes',
      title: "Ce qu'une équipe éditoriale doit savoir.",
      items: [
        {
          question: 'Lettrine décide-t-elle si un auteur a utilisé une IA ?',
          answer:
            "Non. Lettrine met en évidence des signaux et des passages à examiner. L'interprétation appartient toujours au comité éditorial, dans le contexte du manuscrit et de la politique de la revue.",
        },
        {
          question: 'Que comprend une analyse ?',
          answer:
            "Chaque analyse comprend les signaux de contenu généré ou assisté par IA, les passages signalés par niveau, une analyse de similarité avec des sources en ligne et un rapport exportable où le comité consigne sa décision.",
        },
        {
          question: 'Les manuscrits sont-ils utilisés pour entraîner des modèles ?',
          answer:
            "Non. Notre moteur d'analyse, Pangram Labs, indique dans sa politique de confidentialité ne pas utiliser les textes soumis pour entraîner ses modèles. Le texte est traité aux États-Unis ; nous ne conservons pas le manuscrit complet.",
        },
        {
          question: 'Que se passe-t-il quand les unités sont épuisées ?',
          answer:
            'Vous achetez un nouveau bloc en ligne, à tout moment. Les unités valent pour toute la revue pendant 24 mois.',
        },
        {
          question: 'Combien de temps faut-il pour démarrer ?',
          answer:
            'Quelques minutes : créez le compte, confirmez votre adresse email et lancez une première analyse avec les unités offertes.',
        },
        {
          question: 'Comment commencer ?',
          answer:
            "Créez un compte avec une adresse professionnelle. Tout se fait sur le site, sans rendez-vous. Pour toute question, écrivez-nous par email.",
        },
      ],
    },
    closing: {
      title: 'Donnez à votre comité des signaux clairs, pas un verdict automatique.',
      description:
        "Découvrez comment Lettrine Éditorial peut s'intégrer au flux de votre revue scientifique.",
    },
    footer: {
      legal: 'Auditelle SASU · Paris · SIREN 945117000',
      privacyLink: 'Données personnelles',
      manageCookies: 'Gérer les cookies',
    },
    reportPreview: {
      ariaLabel: 'Aperçu du rapport Lettrine',
      id: 'RAPPORT-2026-0341',
      status: 'Analyse terminée',
      kicker: 'Manuscrit · 6 214 mots · Revue des humanités numériques',
      title: 'Approches computationnelles de la lexicographie historique',
      aiValue: '3',
      aiLabel: 'passages IA à examiner',
      similarityValue: '18 %',
      similarityLabel: 'similarité · 2 sources',
      beforeAi: 'Les corpus numérisés permettent une couverture diachronique sans précédent. ',
      aiPassage:
        "Les modèles de langue offrent une productivité accrue dans l'extraction des variantes graphiques",
      betweenMarks: ", sous réserve d'une ",
      similarityPassage: 'validation philologique menée par des spécialistes du domaine',
      note: 'À examiner par le comité de rédaction.',
      exportLabel: 'Exporter le rapport PDF',
    },
    workspace: {
      ariaLabel: "Aperçu de l'espace Lettrine Éditorial",
      brand: 'LETTRINE / REVUE DÉMO',
      cycle: 'Cycle éditorial 2026',
      export: 'Exporter',
      newManuscript: 'Nouveau manuscrit',
      sidebar: ['Manuscrits', 'Rapports', 'Équipe', 'Consommation', 'Paramètres'],
      recentTitle: 'Manuscrits récents',
      recentSummary: '24 soumissions · 18 analyses terminées',
      filter: 'Filtrer',
      headers: ['Manuscrit', 'Statut', 'IA', 'Similarité', 'Rapport'],
      rows: [
        ['Lexicographie historique', 'À examiner', '3 passages', '18 %', 'Disponible'],
        ['Archives ouvertes et science', 'Terminée', 'Aucun signal', '6 %', 'Disponible'],
        ['Éthique des données cliniques', 'En cours', '—', '—', 'En attente'],
        ['Pédagogies critiques numériques', 'À examiner', '1 passage', '12 %', 'Disponible'],
        ['Corpus et traduction assistée', 'Terminée', 'Aucun signal', '9 %', 'Disponible'],
      ],
      reviewStatus: 'À examiner',
      readyStatus: 'Terminée',
    },
    reportModal: {
      title: 'Exemple de rapport éditorial',
      kicker: 'RAPPORT-2026-0341 · MANUSCRIT ANONYMISÉ',
      manuscriptTitle: 'Approches computationnelles de la lexicographie historique',
      paragraphs: [
        {
          before:
            'Les corpus numérisés permettent désormais une couverture diachronique sans précédent. ',
          marked:
            "Les modèles de langue offrent une productivité accrue dans l'extraction des variantes graphiques",
          after:
            ", sous réserve d'une validation philologique menée par des spécialistes.",
          tone: 'ai',
        },
        {
          before: 'Cette évolution transforme les pratiques de documentation. ',
          marked:
            'La constitution de corpus comparables reste cependant une condition essentielle de la robustesse des analyses',
          after:
            ', notamment lorsque les sources présentent des niveaux de numérisation hétérogènes.',
          tone: 'similarity',
        },
        {
          before:
            "L'équipe éditoriale met les signaux en relation avec la méthodologie, les citations et la politique de la revue avant toute décision.",
        },
      ],
      findingsTitle: 'Signaux à examiner',
      findings: [
        { title: 'Contenu IA', detail: '3 passages signalés · niveau à examiner', tone: 'ochre' },
        { title: 'Similarité', detail: '18 % · 2 sources associées', tone: 'green' },
        { title: 'Contexte', detail: '6 214 mots · sciences humaines' },
        { title: 'Principe', detail: 'Ce rapport ne constitue pas un verdict.' },
      ],
      exportLabel: 'Exporter PDF',
    },
    form: {
      modalTitle: 'Demander un compte démo institutionnel',
      intro:
        "Réservé aux revues, maisons d'édition et organisations scientifiques. L'évaluation et l'activation se font par email.",
      name: 'Nom',
      email: 'Email professionnel',
      organization: 'Revue ou organisation',
      role: 'Fonction',
      rolePlaceholder: 'Rédaction en chef, direction éditoriale…',
      journalCount: 'Nombre de revues',
      journalCountOptions: [
        { value: 'one', label: '1 revue' },
        { value: 'two_to_five', label: '2 à 5 revues' },
        { value: 'six_plus', label: '6 revues ou plus' },
      ],
      volume: 'Manuscrits par an',
      volumeOptions: [
        { value: 'under_300', label: 'Moins de 300' },
        { value: '300_600', label: '300 à 600' },
        { value: '600_1500', label: '600 à 1 500' },
        { value: 'over_1500', label: 'Plus de 1 500' },
      ],
      plan: 'Offre envisagée',
      planOptions: [
        { value: 'undecided', label: 'À définir' },
        { value: 'essential', label: 'Éditorial Essentiel' },
        { value: 'journal', label: 'Éditorial Revue' },
        { value: 'organization', label: 'Éditorial Organisation' },
      ],
      context: 'Contexte',
      contextPlaceholder:
        'Décrivez votre processus éditorial et les contrôles recherchés.',
      honeypot: 'Site web',
      reassurance: 'Aucun rendez-vous requis. Nous répondons par email.',
      privacyNotice: {
        lead: 'Traitement des données de ce formulaire :',
        link: 'politique de confidentialité',
      },
      submitting: 'Envoi en cours…',
      submit: 'Envoyer la demande',
      successTitle: 'Demande reçue.',
      successMessage:
        "Nous vérifions l'éligibilité de votre organisation. Si la demande est retenue, les instructions d'accès seront envoyées par email. Aucun rendez-vous n'est nécessaire.",
      errors: {
        invalid_request: 'Vérifiez les informations saisies.',
        professional_email_required:
          "Utilisez l'adresse professionnelle de votre institution ou de votre revue.",
        too_large: 'La demande est trop volumineuse.',
        rate_limited: 'Trop de demandes. Réessayez dans une heure.',
        delivery_unavailable: "La demande n'a pas pu être transmise. Réessayez plus tard.",
      },
    },
  },
  sv: {
    locale: 'sv',
    htmlLang: 'sv',
    openGraphLocale: 'sv_SE',
    path: '/vetenskapliga-tidskrifter',
    privacyNoticePath: '/vetenskapliga-tidskrifter/integritet',
    signupPath: '/app/sv/signup',
    metadata: {
      title: 'Lettrine Editorial | Integritet för vetenskapliga tidskrifter',
      description:
        'Lettrine Editorial hjälper vetenskapliga tidskrifter att identifiera tecken på AI-genererat innehåll och textlikhet och dokumentera den mänskliga bedömningen.',
      pageName: 'Lettrine Editorial',
      pageDescription:
        'En plattform för redaktionell integritet för vetenskapliga tidskrifter i Sverige.',
    },
    brand: {
      name: 'Lettrine',
      product: 'Editorial',
      ariaLabel: 'Lettrine Editorial, startsida',
    },
    navigation: {
      ariaLabel: 'Huvudnavigering',
      mobileAriaLabel: 'Mobilnavigering',
      product: 'Produkt',
      workflow: 'Så här fungerar det',
      privacy: 'Integritet',
      pricing: 'Priser',
      faq: 'Vanliga frågor',
      openMenu: 'Öppna menyn',
      closeMenu: 'Stäng menyn',
    },
    common: {
      skipLink: 'Gå till innehållet',
      demoCta: 'Prova gratis',
      reportCta: 'Se ett exempel på en rapport',
      close: 'Stäng',
    },
    hero: {
      eyebrow: 'Plattform för redaktionell integritet',
      title: 'Redaktionell integritet för vetenskapliga tidskrifter.',
      lead:
        'Granska manuskript, identifiera tecken på AI-genererat innehåll och textlikhet och dokumentera den redaktionella bedömningen i en tydlig rapport. Granskningen görs alltid av en människa.',
      offerCta: 'Upptäck Lettrine Editorial',
      principlesAriaLabel: 'Produktprinciper',
      principles: ['Signaler, inte beslut', 'Dokumenterat beslut', 'Exporterbara rapporter'],
    },
    audience: {
      label: 'Utformad för vetenskaplig publicering',
      items: [
        'Vetenskapliga tidskrifter',
        'Förlag',
        'Vetenskapliga sällskap',
        'Vetenskapliga kommittéer',
      ],
    },
    workflow: {
      label: 'En dokumenterad process',
      title: 'Från inskickat manuskript till redaktionellt beslut – med hela sammanhanget samlat.',
      intro:
        'Lettrine samlar analysen, de avsnitt som behöver granskas och tidskriftens historik på ett och samma ställe.',
      steps: [
        {
          number: '01',
          title: 'Skicka in',
          description:
            'Lägg till ett manuskript och koppla det till rätt tidskrift, nummer eller redaktionellt ärende.',
        },
        {
          number: '02',
          title: 'Analysera',
          description:
            'Identifiera tecken på AI-genererat innehåll och textlikhet och se resultaten tillsammans med relevanta avsnitt och källor.',
        },
        {
          number: '03',
          title: 'Granska',
          description:
            'Redaktionen tolkar resultatet i sitt vetenskapliga sammanhang. Lettrine fattar inga egna beslut.',
        },
        {
          number: '04',
          title: 'Dokumentera',
          description:
            'Exportera rapporten och spara ett tydligt underlag i den redaktionella historiken.',
        },
      ],
    },
    product: {
      label: 'Den redaktionella miljön',
      title: 'En tydlig manuskriptkö för redaktionen.',
      intro:
        'Följ analysstatus, signaler som behöver granskas och tillgängliga rapporter utan separata kalkylblad.',
    },
    privacy: {
      label: 'Inbyggd integritet',
      title: 'Manuskript kräver tydliga ramar.',
      intro:
        'Lettrine anger tydligt vad som sparas, hur länge och vilka leverantörer texten passerar.',
      principles: [
        {
          number: '01',
          title: 'Manuskriptet sparas inte',
          description:
            'Vi sparar resultatet och de markerade avsnitten, inte hela manuskriptet. Filen läses i din webbläsare.',
        },
        {
          number: '02',
          title: 'Automatisk radering',
          description:
            'Analyser raderas automatiskt efter 180 dagar och kan raderas tidigare av tidskriften.',
        },
        {
          number: '03',
          title: 'Dokumenterade leverantörer',
          description:
            'Analysmotorer och övriga underbiträden anges i personuppgiftsbiträdesavtalet.',
        },
      ],
    },
    pricing: {
      label: 'Förbetalda enheter',
      title: 'Betala efter tidskriftens volym, utan abonnemang.',
      intro:
        'En enhet motsvarar upp till 1 000 ord, med både AI-signaler och textlikhet. Enheterna gäller för hela tidskriften i 24 månader.',
      recommended: 'Vanligast',
      plans: [
        {
          id: 'essential',
          name: '50 enheter',
          audience: 'För en mindre tidskrift, ungefär femton artiklar på 3 000 ord.',
          price: '590 €',
          period: 'exkl. moms · 11,80 € per enhet',
          volume: '1 enhet = upp till 1 000 ord',
          features: [
            'AI-signaler och textlikhet',
            'Markerade avsnitt efter nivå',
            'Dokumenterat redaktionellt beslut',
            'Rapport som kan exporteras som PDF',
            'Support via e-post',
          ],
        },
        {
          id: 'journal',
          name: '200 enheter',
          audience: 'För en aktiv tidskrift med ett jämnt flöde av manuskript.',
          price: '1 990 €',
          period: 'exkl. moms · 9,95 € per enhet',
          volume: '1 enhet = upp till 1 000 ord',
          features: [
            'AI-signaler och textlikhet',
            'Markerade avsnitt efter nivå',
            'Dokumenterat redaktionellt beslut',
            'Historik som kan filtreras efter beslut',
            'Support via e-post',
          ],
          featured: true,
        },
        {
          id: 'organization',
          name: '500 enheter',
          audience: 'För ett förlag, ett vetenskapligt sällskap eller flera tidskrifter.',
          price: '3 990 €',
          period: 'exkl. moms · 7,98 € per enhet',
          volume: '1 enhet = upp till 1 000 ord',
          features: [
            'AI-signaler och textlikhet',
            'Markerade avsnitt efter nivå',
            'Dokumenterat redaktionellt beslut',
            'Historik som kan filtreras efter beslut',
            'Support via e-post',
          ],
        },
      ],
      noteTitle: 'Prova gratis:',
      noteLead: '10 enheter ingår när ni skapar ett konto.',
      noteDetail:
        'Betalning med kort, faktura via e-post och moms enligt tidskriftens land och momsregistreringsnummer. Använda enheter återbetalas inte.',
    },
    faq: {
      label: 'Vanliga frågor',
      title: 'Vad behöver en redaktion veta.',
      items: [
        {
          question: 'Avgör Lettrine om en författare har använt AI?',
          answer:
            'Nej. Lettrine visar signaler och avsnitt som behöver granskas. Tolkningen görs alltid av redaktionen utifrån manuskriptets sammanhang och tidskriftens policy.',
        },
        {
          question: 'Vad ingår i en analys?',
          answer:
            'Varje analys omfattar tecken på AI-genererat eller AI-assisterat innehåll, markerade avsnitt efter nivå, en textlikhetsanalys mot källor på nätet och en rapport där redaktionen dokumenterar sitt beslut.',
        },
        {
          question: 'Används manuskript för att träna modeller?',
          answer:
            'Nej. Vår analysleverantör Pangram Labs anger i sin integritetspolicy att inskickade texter inte används för att träna modeller. Texten behandlas i USA, och vi sparar inte hela manuskriptet.',
        },
        {
          question: 'Vad händer när enheterna tar slut?',
          answer:
            'Ni köper ett nytt paket på webbplatsen när som helst. Enheterna gäller för hela tidskriften i 24 månader.',
        },
        {
          question: 'Hur snabbt kan en redaktion komma igång?',
          answer:
            'På några minuter: skapa ett konto, bekräfta e-postadressen och starta en första analys med provenheterna.',
        },
        {
          question: 'Hur kommer vi igång?',
          answer:
            'Skapa ett konto med en arbetsrelaterad e-postadress. Allt sköts på webbplatsen, utan möte. Har ni frågor kan ni skriva till oss via e-post.',
        },
      ],
    },
    closing: {
      title: 'Ge redaktionen tydliga signaler, inte ett automatiskt beslut.',
      description:
        'Se hur Lettrine Editorial kan passa in i arbetsflödet för en vetenskaplig tidskrift.',
    },
    footer: {
      legal: 'Auditelle SASU · Paris · SIREN 945117000',
      privacyLink: 'Personuppgifter',
      manageCookies: 'Hantera cookies',
    },
    reportPreview: {
      ariaLabel: 'Förhandsvisning av Lettrine-rapport',
      id: 'RAPPORT-2026-0341',
      status: 'Analysen är klar',
      kicker: 'Manuskript · 6 214 ord · Tidskrift för digital humaniora',
      title: 'Beräkningsmetoder i historisk lexikografi',
      aiValue: '3',
      aiLabel: 'AI-relaterade avsnitt för granskning',
      similarityValue: '18 %',
      similarityLabel: 'textlikhet · 2 källor',
      beforeAi: 'Digitaliserade korpusar ger en tidigare oöverträffad diakron täckning. ',
      aiPassage:
        'Språkmodeller kan effektivisera arbetet med att identifiera grafiska varianter',
      betweenMarks: ', förutsatt att ',
      similarityPassage: 'resultatet valideras filologiskt av ämnesspecialister',
      note: 'Ska granskas av redaktionen.',
      exportLabel: 'Exportera PDF-rapport',
    },
    workspace: {
      ariaLabel: 'Förhandsvisning av miljön i Lettrine Editorial',
      brand: 'LETTRINE / DEMOTIDSKRIFT',
      cycle: 'Redaktionell cykel 2026',
      export: 'Exportera',
      newManuscript: 'Nytt manuskript',
      sidebar: ['Manuskript', 'Rapporter', 'Redaktion', 'Användning', 'Inställningar'],
      recentTitle: 'Senaste manuskript',
      recentSummary: '24 inskickade · 18 slutförda analyser',
      filter: 'Filtrera',
      headers: ['Manuskript', 'Status', 'AI', 'Textlikhet', 'Rapport'],
      rows: [
        ['Historisk lexikografi', 'För granskning', '3 avsnitt', '18 %', 'Tillgänglig'],
        ['Öppen vetenskap och arkiv', 'Klar', 'Ingen signal', '6 %', 'Tillgänglig'],
        ['Klinisk dataetik', 'Pågår', '—', '—', 'Väntar'],
        ['Kritisk digital pedagogik', 'För granskning', '1 avsnitt', '12 %', 'Tillgänglig'],
        ['Korpus och maskinöversättning', 'Klar', 'Ingen signal', '9 %', 'Tillgänglig'],
      ],
      reviewStatus: 'För granskning',
      readyStatus: 'Klar',
    },
    reportModal: {
      title: 'Exempel på redaktionell rapport',
      kicker: 'RAPPORT-2026-0341 · ANONYMISERAT MANUSKRIPT',
      manuscriptTitle: 'Beräkningsmetoder i historisk lexikografi',
      paragraphs: [
        {
          before:
            'Digitaliserade korpusar ger en tidigare oöverträffad diakron täckning. ',
          marked:
            'Språkmodeller kan effektivisera arbetet med att identifiera grafiska varianter',
          after:
            ', förutsatt att resultatet valideras filologiskt av ämnesspecialister.',
          tone: 'ai',
        },
        {
          before: 'Utvecklingen förändrar dokumentationsarbetet. ',
          marked:
            'Jämförbara korpusar är samtidigt en grundläggande förutsättning för robusta analyser',
          after:
            ', särskilt när källorna har digitaliserats i olika omfattning.',
          tone: 'similarity',
        },
        {
          before:
            'Redaktionen bedömer signalerna utifrån metod, källhänvisningar och tidskriftens policy innan ett beslut fattas.',
        },
      ],
      findingsTitle: 'Signaler för granskning',
      findings: [
        { title: 'AI-relaterat innehåll', detail: '3 markerade avsnitt behöver granskas', tone: 'ochre' },
        { title: 'Textlikhet', detail: '18 % · 2 associerade källor', tone: 'green' },
        { title: 'Sammanhang', detail: '6 214 ord · humaniora' },
        { title: 'Princip', detail: 'Rapporten är inte ett automatiskt beslut.' },
      ],
      exportLabel: 'Exportera PDF',
    },
    form: {
      modalTitle: 'Begär ett demokonto för din organisation',
      intro:
        'För vetenskapliga tidskrifter, förlag och forskningsorganisationer. Bedömning och aktivering sker via e-post.',
      name: 'Namn',
      email: 'Arbetsrelaterad e-postadress',
      organization: 'Tidskrift eller organisation',
      role: 'Roll',
      rolePlaceholder: 'Chefredaktör, redaktionsansvarig…',
      journalCount: 'Antal tidskrifter',
      journalCountOptions: [
        { value: 'one', label: '1 tidskrift' },
        { value: 'two_to_five', label: '2 till 5 tidskrifter' },
        { value: 'six_plus', label: '6 tidskrifter eller fler' },
      ],
      volume: 'Manuskript per år',
      volumeOptions: [
        { value: 'under_300', label: 'Färre än 300' },
        { value: '300_600', label: '300 till 600' },
        { value: '600_1500', label: '600 till 1 500' },
        { value: 'over_1500', label: 'Fler än 1 500' },
      ],
      plan: 'Önskad prisplan',
      planOptions: [
        { value: 'undecided', label: 'Inte bestämd' },
        { value: 'essential', label: 'Editorial Essential' },
        { value: 'journal', label: 'Editorial Journal' },
        { value: 'organization', label: 'Editorial Organisation' },
      ],
      context: 'Bakgrund',
      contextPlaceholder:
        'Beskriv ert redaktionella arbetsflöde och vilka granskningar ni vill utvärdera.',
      honeypot: 'Webbplats',
      reassurance: 'Inget möte krävs. Vi svarar via e-post.',
      privacyNotice: {
        lead: 'Så behandlar vi uppgifterna i formuläret:',
        link: 'integritetspolicy',
      },
      submitting: 'Skickar…',
      submit: 'Begär demokonto',
      successTitle: 'Din begäran har tagits emot.',
      successMessage:
        'Vi bedömer om organisationen är relevant. Om begäran godkänns skickas åtkomstinstruktioner via e-post. Inget möte krävs.',
      errors: {
        invalid_request: 'Kontrollera uppgifterna och försök igen.',
        professional_email_required:
          'Använd en arbetsrelaterad e-postadress från tidskriften eller organisationen.',
        too_large: 'Begäran innehåller för mycket text. Förkorta beskrivningen och försök igen.',
        rate_limited: 'För många försök. Försök igen om en timme.',
        delivery_unavailable: 'Begäran kunde inte skickas. Försök igen senare.',
      },
    },
  },
} satisfies Record<EditorialLocale, EditorialCopy>

export function getEditorialCopy(locale: EditorialLocale) {
  return editorialCopy[locale]
}
