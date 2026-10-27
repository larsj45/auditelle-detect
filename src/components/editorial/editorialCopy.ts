export type EditorialLocale = 'fr' | 'sv' | 'it' | 'pt' | 'en'
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
      demoCta: 'Demander un compte démo',
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
      principles: ['Signaux, pas verdicts', 'Accès multi-éditeurs', 'Rapports exportables'],
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
      title: "Une file de manuscrits lisible par toute l'équipe.",
      intro:
        "Suivez le statut de chaque analyse, les signaux à examiner et les rapports disponibles sans multiplier les feuilles de calcul.",
    },
    privacy: {
      label: 'Confidentialité par conception',
      title: 'Les manuscrits méritent un cadre explicite.',
      intro:
        "Lettrine est conçue pour documenter la conservation, les accès et les prestataires impliqués avant le déploiement d'une équipe éditoriale.",
      principles: [
        {
          number: '01',
          title: 'Accès maîtrisés',
          description:
            'Des rôles distincts pour les responsables, éditeurs et lecteurs, avec un historique rattaché à chaque manuscrit.',
        },
        {
          number: '02',
          title: 'Conservation définie',
          description:
            'Une politique de conservation et de suppression est fixée avec la revue avant la mise en production.',
        },
        {
          number: '03',
          title: 'Prestataires documentés',
          description:
            "Les moteurs d'analyse et leurs conditions de traitement sont identifiés dans la documentation contractuelle.",
        },
      ],
    },
    pricing: {
      label: 'Cadrage annuel',
      title: 'Un volume de contrôles adapté au rythme de votre revue.',
      intro:
        'Les prix, volumes et conditions prestataires sont validés avec chaque revue avant toute proposition contractuelle.',
      recommended: 'Recommandé',
      plans: [
        {
          id: 'essential',
          name: 'Essentiel',
          audience: 'Pour une petite revue ou un comité éditorial resserré.',
          price: 'Tarif à valider',
          period: 'offre annuelle préparée avec votre équipe',
          volume: 'Volume éditorial défini après cadrage',
          features: [
            'Équipe éditoriale restreinte',
            'Analyse IA et similarité',
            'Rapports PDF exportables',
            'Historique des manuscrits',
            'Support par email',
          ],
        },
        {
          id: 'journal',
          name: 'Revue',
          audience: 'Pour une revue active avec plusieurs éditeurs ou sections.',
          price: 'Tarif à valider',
          period: 'offre annuelle préparée avec votre équipe',
          volume: 'Volume adapté au rythme de publication',
          features: [
            'Plusieurs éditeurs ou sections',
            'Analyse IA et similarité',
            'Rapports et historique complet',
            'Suivi de consommation',
            "Parcours d'activation documenté",
          ],
          featured: true,
        },
        {
          id: 'organization',
          name: 'Organisation',
          audience: "Pour une maison d'édition, une société savante ou un portefeuille de revues.",
          price: 'Sur devis',
          period: 'volume et gouvernance personnalisés',
          volume: 'Plusieurs revues ou équipes',
          features: [
            'Éditeurs et administrateurs',
            'Volumes adaptés par revue',
            'Activation guidée par email',
            'Conditions de conservation dédiées',
            'Support prioritaire',
          ],
        },
      ],
      noteTitle: 'Tarifs non publiés :',
      noteLead: "l'offre reste contact-led.",
      noteDetail:
        'Les hypothèses de prix et de blocs supplémentaires ne sont pas affichées tant que les coûts et les termes prestataires ne sont pas validés.',
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
          question: 'Que comprend un contrôle éditorial ?',
          answer:
            "Le prototype prévoit une analyse du contenu IA, une analyse de similarité, les passages signalés et un rapport exportable. La définition contractuelle finale dépendra des moteurs activés pour votre offre.",
        },
        {
          question: 'Les manuscrits sont-ils utilisés pour entraîner des modèles ?',
          answer:
            "Les conditions de traitement doivent être confirmées dans la documentation contractuelle de chaque prestataire activé. Lettrine les présente avant la mise en production de la revue.",
        },
        {
          question: "Peut-on ajouter des contrôles en cours d'année ?",
          answer:
            'Oui. Des blocs de contrôles supplémentaires sont prévus sans modifier la date de renouvellement annuelle.',
        },
        {
          question: 'Combien de temps faut-il pour démarrer ?',
          answer:
            "Une petite équipe peut être configurée rapidement après validation des responsables, des rôles d'accès, de la politique de conservation et du volume annuel.",
        },
        {
          question: 'Comment demander un compte démo ?',
          answer:
            "Transmettez les informations de votre revue avec une adresse professionnelle. Lettrine vérifie l'éligibilité et répond par email. Si la demande est retenue, les instructions d'accès sont envoyées sans rendez-vous obligatoire.",
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
      brand: 'AUDITELLE / REVUE DÉMO',
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
      demoCta: 'Begär ett demokonto',
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
      principles: ['Signaler, inte beslut', 'Åtkomst för flera redaktörer', 'Exporterbara rapporter'],
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
      title: 'En tydlig manuskriptkö för hela redaktionen.',
      intro:
        'Följ analysstatus, signaler som behöver granskas och tillgängliga rapporter utan separata kalkylblad.',
    },
    privacy: {
      label: 'Inbyggd integritet',
      title: 'Manuskript kräver tydliga ramar.',
      intro:
        'Lettrine är utformat för att dokumentera lagring, åtkomst och berörda leverantörer innan en redaktion börjar använda tjänsten.',
      principles: [
        {
          number: '01',
          title: 'Behörighetsstyrning',
          description:
            'Separata roller för ansvariga, redaktörer och läsare, med historik kopplad till varje manuskript.',
        },
        {
          number: '02',
          title: 'Fastställda lagringsrutiner',
          description:
            'Villkor för lagring och radering fastställs med tidskriften innan produktionsstart.',
        },
        {
          number: '03',
          title: 'Dokumenterade leverantörer',
          description:
            'Analysmotorer och villkor för databehandling anges i avtalsdokumentationen.',
        },
      ],
    },
    pricing: {
      label: 'Årlig planering',
      title: 'En granskningsvolym som följer tidskriftens utgivningstakt.',
      intro:
        'Pris, volym och leverantörsvillkor fastställs med varje tidskrift innan ett avtalsförslag tas fram.',
      recommended: 'Rekommenderad',
      plans: [
        {
          id: 'essential',
          name: 'Essential',
          audience: 'För en mindre tidskrift eller en liten redaktion.',
          price: 'Pris fastställs',
          period: 'årlig prisplan utformas med redaktionen',
          volume: 'Antalet granskningar fastställs efter behovsbedömning',
          features: [
            'Mindre redaktion',
            'Tecken på AI-genererat innehåll och textlikhet',
            'Exporterbara PDF-rapporter',
            'Manuskripthistorik',
            'Support via e-post',
          ],
        },
        {
          id: 'journal',
          name: 'Journal',
          audience: 'För en aktiv tidskrift med flera redaktörer eller sektioner.',
          price: 'Pris fastställs',
          period: 'årlig prisplan utformas med redaktionen',
          volume: 'Volym anpassad till utgivningstakten',
          features: [
            'Flera redaktörer eller sektioner',
            'Tecken på AI-genererat innehåll och textlikhet',
            'Rapporter och fullständig historik',
            'Användningsöversikt',
            'Dokumenterad startprocess',
          ],
          featured: true,
        },
        {
          id: 'organization',
          name: 'Organisation',
          audience: 'För ett förlag, ett vetenskapligt sällskap eller en tidskriftsportfölj.',
          price: 'Enligt offert',
          period: 'anpassad volym och styrning',
          volume: 'Flera tidskrifter eller redaktioner',
          features: [
            'Redaktörer och administratörer',
            'Volymer per tidskrift',
            'Aktivering via e-post',
            'Särskilda lagringsvillkor',
            'Prioriterad support',
          ],
        },
      ],
      noteTitle: 'Priser publiceras inte:',
      noteLead: 'prisplanen är kontaktbaserad.',
      noteDetail:
        'Pris- och volymantaganden visas inte innan kostnader och leverantörsvillkor har fastställts.',
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
          question: 'Vad ingår i en redaktionell granskning?',
          answer:
            'Prototypen omfattar tecken på AI-genererat innehåll, textlikhet, markerade avsnitt och en exporterbar rapport. Tjänstens slutliga omfattning beror på vilka analysmotorer som aktiveras.',
        },
        {
          question: 'Används manuskript för att träna modeller?',
          answer:
            'Villkoren för databehandling måste bekräftas i dokumentationen för varje aktiverad leverantör. Lettrine redovisar dem innan tidskriften går i produktion.',
        },
        {
          question: 'Kan fler granskningar läggas till under året?',
          answer:
            'Ytterligare granskningar kan ingå i den planerade prisplanen utan att ändra den årliga förnyelsedagen.',
        },
        {
          question: 'Hur snabbt kan en redaktion komma igång?',
          answer:
            'En mindre redaktion kan konfigureras efter att ansvariga, åtkomstroller, lagringspolicy och årlig volym har fastställts.',
        },
        {
          question: 'Hur begär vi ett demokonto?',
          answer:
            'Skicka information om tidskriften från en arbetsrelaterad e-postadress. Lettrine bedömer om organisationen är relevant och svarar via e-post. Om begäran godkänns skickas åtkomstinstruktioner utan krav på möte.',
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
      brand: 'VERIFY / DEMOTIDSKRIFT',
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
  it: {
    locale: 'it',
    htmlLang: 'it',
    openGraphLocale: 'it_IT',
    path: '/riviste-scientifiche',
    privacyNoticePath: '/riviste-scientifiche/privacy',
    metadata: {
      title: 'Lettrine Editoriale | Integrità per le riviste scientifiche',
      description:
        "Lettrine Editoriale aiuta le riviste scientifiche di lingua italiana a esaminare i segnali legati all'IA e alla similarità e a documentare la revisione umana.",
      pageName: 'Lettrine Editoriale',
      pageDescription:
        'Piattaforma di integrità editoriale per le riviste scientifiche di lingua italiana.',
    },
    brand: {
      name: 'Lettrine',
      product: 'Editoriale',
      ariaLabel: 'Lettrine Editoriale, home',
    },
    navigation: {
      ariaLabel: 'Navigazione principale',
      mobileAriaLabel: 'Navigazione mobile',
      product: 'Prodotto',
      workflow: 'Come funziona',
      privacy: 'Riservatezza',
      pricing: 'Prezzi',
      faq: 'FAQ',
      openMenu: 'Apri il menu',
      closeMenu: 'Chiudi il menu',
    },
    common: {
      skipLink: 'Vai al contenuto',
      demoCta: 'Richiedi un account demo',
      reportCta: 'Vedi un esempio di report',
      close: 'Chiudi',
    },
    hero: {
      eyebrow: 'Piattaforma di integrità editoriale',
      title: "L'integrità editoriale per le riviste scientifiche di lingua italiana.",
      lead:
        "Analizzate i manoscritti, individuate i segnali legati all'IA e alla similarità e documentate ogni decisione editoriale in un report chiaro. La revisione resta umana.",
      offerCta: "Scopri l'offerta Editoriale",
      principlesAriaLabel: 'Principi del prodotto',
      principles: ['Segnali, non verdetti', 'Accesso per più redattori', 'Report esportabili'],
    },
    audience: {
      label: 'Pensato per chi pubblica',
      items: [
        'Riviste scientifiche',
        'Case editrici',
        'Società scientifiche',
        'Comitati scientifici',
      ],
    },
    workflow: {
      label: 'Un processo documentato',
      title: "Dall'invio alla decisione editoriale, senza perdere il contesto.",
      intro:
        "Lettrine riunisce l'analisi, i passaggi da esaminare e lo storico della rivista in un unico spazio di lavoro condiviso.",
      steps: [
        {
          number: '01',
          title: 'Caricare',
          description:
            'Caricate un manoscritto e associatelo alla rivista, al fascicolo o alla sezione monografica di riferimento.',
        },
        {
          number: '02',
          title: 'Analizzare',
          description:
            "Ottenete i segnali relativi ai contenuti generati con l'IA e alla similarità, con i passaggi e le fonti disponibili.",
        },
        {
          number: '03',
          title: 'Esaminare',
          description:
            'La redazione interpreta i risultati nel contesto scientifico. Lettrine non emette verdetti.',
        },
        {
          number: '04',
          title: 'Documentare',
          description:
            "Esportate il report e conservate una traccia chiara dell'analisi nello storico editoriale.",
        },
      ],
    },
    product: {
      label: 'Lo spazio editoriale',
      title: 'Una coda di manoscritti leggibile da tutta la redazione.',
      intro:
        'Seguite lo stato di ogni analisi, i segnali da esaminare e i report disponibili senza dover gestire fogli di calcolo separati.',
    },
    privacy: {
      label: 'Riservatezza by design',
      title: 'I manoscritti richiedono regole chiare.',
      intro:
        'Lettrine è pensata per definire per iscritto conservazione, accessi e fornitori coinvolti prima che una redazione inizi a usarla.',
      principles: [
        {
          number: '01',
          title: 'Accessi controllati',
          description:
            'Ruoli distinti per responsabili, redattori e lettori, con uno storico collegato a ciascun manoscritto.',
        },
        {
          number: '02',
          title: 'Conservazione definita',
          description:
            "Una politica di conservazione e cancellazione viene concordata con la rivista prima dell'avvio del servizio.",
        },
        {
          number: '03',
          title: 'Fornitori documentati',
          description:
            'I motori di analisi e le relative condizioni di trattamento sono indicati nella documentazione contrattuale.',
        },
      ],
    },
    pricing: {
      label: 'Offerta annuale',
      title: 'Un volume di controlli adatto al ritmo della vostra rivista.',
      intro:
        'Prezzi, volumi e condizioni dei fornitori vengono definiti con ciascuna rivista prima di qualsiasi proposta contrattuale.',
      recommended: 'Consigliato',
      plans: [
        {
          id: 'essential',
          name: 'Essenziale',
          audience: 'Per una piccola rivista o una redazione ristretta.',
          price: 'Prezzo da definire',
          period: 'offerta annuale preparata con la vostra redazione',
          volume: 'Volume definito dopo un primo confronto',
          features: [
            'Redazione ristretta',
            'Analisi IA e similarità',
            'Report PDF esportabili',
            'Storico dei manoscritti',
            'Assistenza via email',
          ],
        },
        {
          id: 'journal',
          name: 'Rivista',
          audience: 'Per una rivista attiva con più redattori o sezioni.',
          price: 'Prezzo da definire',
          period: 'offerta annuale preparata con la vostra redazione',
          volume: 'Volume adeguato al ritmo di pubblicazione',
          features: [
            'Più redattori o sezioni',
            'Analisi IA e similarità',
            'Report e storico completo',
            'Monitoraggio dei consumi',
            'Percorso di attivazione documentato',
          ],
          featured: true,
        },
        {
          id: 'organization',
          name: 'Organizzazione',
          audience: 'Per una casa editrice, una società scientifica o un portafoglio di riviste.',
          price: 'Su preventivo',
          period: 'volume e governance personalizzati',
          volume: 'Più riviste o redazioni',
          features: [
            'Redattori e amministratori',
            'Volumi adattati per rivista',
            'Attivazione guidata via email',
            'Condizioni di conservazione dedicate',
            'Assistenza prioritaria',
          ],
        },
      ],
      noteTitle: 'Prezzi non pubblicati:',
      noteLead: "l'offerta viene definita su richiesta.",
      noteDetail:
        'Le ipotesi di prezzo e di pacchetti aggiuntivi non vengono pubblicate finché costi e condizioni dei fornitori non sono confermati.',
    },
    faq: {
      label: 'Domande frequenti',
      title: 'Quello che una redazione deve sapere.',
      items: [
        {
          question: "Lettrine stabilisce se un autore ha usato l'IA?",
          answer:
            "No. Lettrine evidenzia segnali e passaggi da esaminare. L'interpretazione spetta sempre alla redazione, nel contesto del manoscritto e della politica della rivista.",
        },
        {
          question: 'Che cosa comprende un controllo editoriale?',
          answer:
            "Il prototipo prevede un'analisi dei contenuti generati con l'IA, un'analisi di similarità, i passaggi segnalati e un report esportabile. La definizione contrattuale finale dipenderà dai motori attivati per la vostra offerta.",
        },
        {
          question: 'I manoscritti vengono usati per addestrare modelli?',
          answer:
            'Le condizioni di trattamento devono essere confermate nella documentazione contrattuale di ciascun fornitore attivato. Lettrine le illustra prima che la rivista inizi a usare il servizio.',
        },
        {
          question: "Si possono aggiungere controlli nel corso dell'anno?",
          answer:
            'Sì. Sono previsti pacchetti di controlli aggiuntivi, senza modificare la data di rinnovo annuale.',
        },
        {
          question: 'Quanto tempo serve per iniziare?',
          answer:
            'Una piccola redazione può essere configurata rapidamente, dopo aver definito responsabili, ruoli di accesso, politica di conservazione e volume annuale.',
        },
        {
          question: 'Come si richiede un account demo?',
          answer:
            "Inviate le informazioni sulla vostra rivista con un indirizzo email professionale. Lettrine verifica l'idoneità e risponde via email. Se la richiesta viene accolta, inviamo le istruzioni di accesso senza bisogno di fissare un appuntamento.",
        },
      ],
    },
    closing: {
      title: 'Date alla vostra redazione segnali chiari, non un verdetto automatico.',
      description:
        'Scoprite come Lettrine Editoriale può inserirsi nel flusso di lavoro della vostra rivista scientifica.',
    },
    footer: {
      legal: 'Auditelle SASU · Parigi · SIREN 945117000',
      privacyLink: 'Informativa privacy',
      manageCookies: 'Gestisci i cookie',
    },
    reportPreview: {
      ariaLabel: 'Anteprima del report Lettrine',
      id: 'REPORT-2026-0341',
      status: 'Analisi completata',
      kicker: 'Manoscritto · 6.214 parole · Rivista di studi umanistici digitali',
      title: 'Approcci computazionali alla lessicografia storica',
      aiValue: '3',
      aiLabel: 'passaggi IA da esaminare',
      similarityValue: '18%',
      similarityLabel: 'similarità · 2 fonti',
      beforeAi: 'I corpora digitalizzati consentono una copertura diacronica senza precedenti. ',
      aiPassage:
        "I modelli linguistici rendono più efficiente l'estrazione delle varianti grafiche",
      betweenMarks: ', previa ',
      similarityPassage: 'validazione filologica condotta da specialisti del settore',
      note: 'Da esaminare a cura della redazione.',
      exportLabel: 'Esporta il report PDF',
    },
    workspace: {
      ariaLabel: 'Anteprima dello spazio Lettrine Editoriale',
      brand: 'AUDITELLE / RIVISTA DEMO',
      cycle: 'Ciclo editoriale 2026',
      export: 'Esporta',
      newManuscript: 'Nuovo manoscritto',
      sidebar: ['Manoscritti', 'Report', 'Redazione', 'Consumi', 'Impostazioni'],
      recentTitle: 'Manoscritti recenti',
      recentSummary: '24 invii · 18 analisi completate',
      filter: 'Filtra',
      headers: ['Manoscritto', 'Stato', 'IA', 'Similarità', 'Report'],
      rows: [
        ['Lessicografia storica', 'Da esaminare', '3 passaggi', '18%', 'Disponibile'],
        ['Archivi aperti e scienza', 'Completata', 'Nessun segnale', '6%', 'Disponibile'],
        ['Etica dei dati clinici', 'In corso', 'n.d.', 'n.d.', 'In attesa'],
        ['Pedagogie critiche digitali', 'Da esaminare', '1 passaggio', '12%', 'Disponibile'],
        ['Corpora e traduzione assistita', 'Completata', 'Nessun segnale', '9%', 'Disponibile'],
      ],
      reviewStatus: 'Da esaminare',
      readyStatus: 'Completata',
    },
    reportModal: {
      title: 'Esempio di report editoriale',
      kicker: 'REPORT-2026-0341 · MANOSCRITTO ANONIMIZZATO',
      manuscriptTitle: 'Approcci computazionali alla lessicografia storica',
      paragraphs: [
        {
          before:
            'I corpora digitalizzati consentono ormai una copertura diacronica senza precedenti. ',
          marked:
            "I modelli linguistici rendono più efficiente l'estrazione delle varianti grafiche",
          after:
            ', purché i risultati siano sottoposti a validazione filologica da parte di specialisti.',
          tone: 'ai',
        },
        {
          before: 'Questa evoluzione sta trasformando le pratiche di documentazione. ',
          marked:
            "La costruzione di corpora comparabili resta tuttavia una condizione essenziale per l'affidabilità delle analisi",
          after:
            ', in particolare quando le fonti presentano livelli di digitalizzazione eterogenei.',
          tone: 'similarity',
        },
        {
          before:
            'La redazione mette in relazione i segnali con la metodologia, le citazioni e la politica della rivista prima di qualsiasi decisione.',
        },
      ],
      findingsTitle: 'Segnali da esaminare',
      findings: [
        { title: 'Contenuti IA', detail: '3 passaggi segnalati da esaminare', tone: 'ochre' },
        { title: 'Similarità', detail: '18% · 2 fonti associate', tone: 'green' },
        { title: 'Contesto', detail: '6.214 parole · scienze umane' },
        { title: 'Principio', detail: 'Questo report non costituisce un verdetto.' },
      ],
      exportLabel: 'Esporta PDF',
    },
    form: {
      modalTitle: 'Richiedi un account demo istituzionale',
      intro:
        "Riservato a riviste, case editrici e società scientifiche. Valutazione e attivazione avvengono via email.",
      name: 'Nome e cognome',
      email: 'Email professionale',
      organization: 'Rivista o organizzazione',
      role: 'Ruolo',
      rolePlaceholder: 'Direzione, redazione, segreteria di redazione…',
      journalCount: 'Numero di riviste',
      journalCountOptions: [
        { value: 'one', label: '1 rivista' },
        { value: 'two_to_five', label: 'Da 2 a 5 riviste' },
        { value: 'six_plus', label: '6 riviste o più' },
      ],
      volume: "Manoscritti all'anno",
      volumeOptions: [
        { value: 'under_300', label: 'Meno di 300' },
        { value: '300_600', label: 'Da 300 a 600' },
        { value: '600_1500', label: 'Da 600 a 1.500' },
        { value: 'over_1500', label: 'Più di 1.500' },
      ],
      plan: 'Offerta di interesse',
      planOptions: [
        { value: 'undecided', label: 'Da definire' },
        { value: 'essential', label: 'Editoriale Essenziale' },
        { value: 'journal', label: 'Editoriale Rivista' },
        { value: 'organization', label: 'Editoriale Organizzazione' },
      ],
      context: 'Contesto',
      contextPlaceholder:
        'Descrivete il vostro processo editoriale e i controlli di cui avete bisogno.',
      honeypot: 'Sito web',
      reassurance: 'Nessun appuntamento necessario. Rispondiamo via email.',
      privacyNotice: {
        lead: 'Trattamento dei dati di questo modulo:',
        link: 'informativa sulla privacy',
      },
      submitting: 'Invio in corso…',
      submit: 'Invia la richiesta',
      successTitle: 'Richiesta ricevuta',
      successMessage:
        "Verificheremo l'idoneità della vostra organizzazione. Se la richiesta viene accolta, vi invieremo via email le istruzioni di accesso. Non è necessario alcun appuntamento.",
      errors: {
        invalid_request: 'Verificate le informazioni inserite.',
        professional_email_required:
          "Usate l'indirizzo istituzionale della vostra università, ente o rivista.",
        too_large: 'La richiesta è troppo lunga. Accorciate la descrizione e riprovate.',
        rate_limited: "Troppe richieste. Riprovate tra un'ora.",
        delivery_unavailable: 'Non è stato possibile inviare la richiesta. Riprovate più tardi.',
      },
    },
  },
  pt: {
    locale: 'pt',
    htmlLang: 'pt-PT',
    openGraphLocale: 'pt_PT',
    path: '/revistas-cientificas',
    privacyNoticePath: '/revistas-cientificas/privacidade',
    metadata: {
      title: 'Lettrine Editorial | Integridade para revistas científicas',
      description:
        'A Lettrine Editorial ajuda as revistas científicas de língua portuguesa a examinar os sinais relacionados com a IA e a similaridade, e a documentar a revisão humana.',
      pageName: 'Lettrine Editorial',
      pageDescription:
        'Plataforma de integridade editorial para revistas científicas de língua portuguesa.',
    },
    brand: {
      name: 'Lettrine',
      product: 'Editorial',
      ariaLabel: 'Lettrine Editorial, página inicial',
    },
    navigation: {
      ariaLabel: 'Navegação principal',
      mobileAriaLabel: 'Navegação móvel',
      product: 'Produto',
      workflow: 'Como funciona',
      privacy: 'Confidencialidade',
      pricing: 'Preços',
      faq: 'Perguntas',
      openMenu: 'Abrir o menu',
      closeMenu: 'Fechar o menu',
    },
    common: {
      skipLink: 'Ir para o conteúdo',
      demoCta: 'Pedir uma conta de demonstração',
      reportCta: 'Ver um exemplo de relatório',
      close: 'Fechar',
    },
    hero: {
      eyebrow: 'Plataforma de integridade editorial',
      title: 'Integridade editorial para revistas científicas de língua portuguesa.',
      lead:
        'Analise os manuscritos, identifique os sinais relacionados com a IA e a similaridade e documente cada decisão editorial num relatório claro. A revisão continua a ser humana.',
      offerCta: 'Conhecer a oferta Editorial',
      principlesAriaLabel: 'Princípios do produto',
      principles: ['Sinais, não veredictos', 'Acesso para vários editores', 'Relatórios exportáveis'],
    },
    audience: {
      label: 'Pensado para quem publica',
      items: [
        'Revistas científicas',
        'Editoras',
        'Sociedades científicas',
        'Conselhos editoriais',
      ],
    },
    workflow: {
      label: 'Um processo documentado',
      title: 'Da submissão à decisão editorial, sem perder o contexto.',
      intro:
        'A Lettrine reúne a análise, os excertos a examinar e o histórico da revista num espaço de trabalho comum.',
      steps: [
        {
          number: '01',
          title: 'Submeter',
          description:
            'Carregue um manuscrito e associe-o à revista, ao número ou ao dossiê temático correspondente.',
        },
        {
          number: '02',
          title: 'Analisar',
          description:
            'Obtenha os sinais relacionados com conteúdo gerado por IA e com a similaridade, com os excertos e as fontes disponíveis.',
        },
        {
          number: '03',
          title: 'Examinar',
          description:
            'A equipa editorial interpreta os resultados no contexto científico. A Lettrine não emite veredictos.',
        },
        {
          number: '04',
          title: 'Documentar',
          description:
            'Exporte o relatório e guarde um registo claro da análise no histórico editorial.',
        },
      ],
    },
    product: {
      label: 'O espaço editorial',
      title: 'Uma fila de manuscritos legível por toda a equipa.',
      intro:
        'Acompanhe o estado de cada análise, os sinais a examinar e os relatórios disponíveis sem multiplicar folhas de cálculo.',
    },
    privacy: {
      label: 'Confidencialidade desde a conceção',
      title: 'Os manuscritos merecem regras claras.',
      intro:
        'A Lettrine foi concebida para documentar a conservação, os acessos e os prestadores envolvidos antes de uma equipa editorial começar a utilizá-la.',
      principles: [
        {
          number: '01',
          title: 'Acessos controlados',
          description:
            'Perfis distintos para responsáveis, editores e leitores, com um histórico associado a cada manuscrito.',
        },
        {
          number: '02',
          title: 'Conservação definida',
          description:
            'A política de conservação e eliminação é acordada com a revista antes do início do serviço.',
        },
        {
          number: '03',
          title: 'Prestadores documentados',
          description:
            'Os motores de análise e as respetivas condições de tratamento são identificados na documentação contratual.',
        },
      ],
    },
    pricing: {
      label: 'Oferta anual',
      title: 'Um volume de análises adequado ao ritmo da sua revista.',
      intro:
        'Os preços, volumes e condições dos prestadores são definidos com cada revista antes de qualquer proposta contratual.',
      recommended: 'Recomendado',
      plans: [
        {
          id: 'essential',
          name: 'Essencial',
          audience: 'Para uma revista pequena ou uma equipa editorial reduzida.',
          price: 'Preço a definir',
          period: 'oferta anual preparada com a sua equipa',
          volume: 'Volume definido após uma primeira conversa',
          features: [
            'Equipa editorial reduzida',
            'Análise de IA e de similaridade',
            'Relatórios PDF exportáveis',
            'Histórico dos manuscritos',
            'Apoio por email',
          ],
        },
        {
          id: 'journal',
          name: 'Revista',
          audience: 'Para uma revista ativa com vários editores ou secções.',
          price: 'Preço a definir',
          period: 'oferta anual preparada com a sua equipa',
          volume: 'Volume ajustado ao ritmo de publicação',
          features: [
            'Vários editores ou secções',
            'Análise de IA e de similaridade',
            'Relatórios e histórico completo',
            'Acompanhamento do consumo',
            'Processo de ativação documentado',
          ],
          featured: true,
        },
        {
          id: 'organization',
          name: 'Organização',
          audience: 'Para uma editora, uma sociedade científica ou um conjunto de revistas.',
          price: 'Sob orçamento',
          period: 'volume e governação personalizados',
          volume: 'Várias revistas ou equipas',
          features: [
            'Editores e administradores',
            'Volumes ajustados por revista',
            'Ativação acompanhada por email',
            'Condições de conservação dedicadas',
            'Apoio prioritário',
          ],
        },
      ],
      noteTitle: 'Preços não publicados:',
      noteLead: 'a oferta é definida mediante contacto.',
      noteDetail:
        'As hipóteses de preço e de pacotes adicionais não são publicadas enquanto os custos e as condições dos prestadores não estiverem confirmados.',
    },
    faq: {
      label: 'Perguntas frequentes',
      title: 'O que uma equipa editorial deve saber.',
      items: [
        {
          question: 'A Lettrine decide se um autor utilizou IA?',
          answer:
            'Não. A Lettrine assinala sinais e excertos a examinar. A interpretação cabe sempre à equipa editorial, no contexto do manuscrito e da política da revista.',
        },
        {
          question: 'O que inclui uma análise editorial?',
          answer:
            'O protótipo prevê uma análise de conteúdo gerado por IA, uma análise de similaridade, os excertos assinalados e um relatório exportável. A definição contratual final dependerá dos motores ativados para a sua oferta.',
        },
        {
          question: 'Os manuscritos são utilizados para treinar modelos?',
          answer:
            'As condições de tratamento têm de ser confirmadas na documentação contratual de cada prestador ativado. A Lettrine apresenta-as antes de a revista começar a utilizar o serviço.',
        },
        {
          question: 'É possível acrescentar análises ao longo do ano?',
          answer:
            'Sim. Estão previstos pacotes de análises adicionais, sem alterar a data de renovação anual.',
        },
        {
          question: 'Quanto tempo é preciso para começar?',
          answer:
            'Uma equipa pequena pode ser configurada rapidamente, depois de definidos os responsáveis, os perfis de acesso, a política de conservação e o volume anual.',
        },
        {
          question: 'Como se pede uma conta de demonstração?',
          answer:
            'Envie os dados da sua revista com um endereço de email profissional. A Lettrine verifica a elegibilidade e responde por email. Se o pedido for aceite, enviamos as instruções de acesso sem necessidade de marcar reunião.',
        },
      ],
    },
    closing: {
      title: 'Dê à sua equipa editorial sinais claros, não um veredicto automático.',
      description:
        'Descubra como a Lettrine Editorial se pode integrar no fluxo de trabalho da sua revista científica.',
    },
    footer: {
      legal: 'Auditelle SASU · Paris · SIREN 945117000',
      privacyLink: 'Política de privacidade',
      manageCookies: 'Gerir cookies',
    },
    reportPreview: {
      ariaLabel: 'Pré-visualização do relatório Lettrine',
      id: 'RELATÓRIO-2026-0341',
      status: 'Análise concluída',
      kicker: 'Manuscrito · 6.214 palavras · Revista de humanidades digitais',
      title: 'Abordagens computacionais à lexicografia histórica',
      aiValue: '3',
      aiLabel: 'excertos de IA a examinar',
      similarityValue: '18%',
      similarityLabel: 'similaridade · 2 fontes',
      beforeAi: 'Os corpora digitalizados permitem uma cobertura diacrónica sem precedentes. ',
      aiPassage:
        'Os modelos de linguagem tornam mais eficiente a extração de variantes gráficas',
      betweenMarks: ', mediante ',
      similarityPassage: 'validação filológica realizada por especialistas da área',
      note: 'A examinar pela equipa editorial.',
      exportLabel: 'Exportar o relatório PDF',
    },
    workspace: {
      ariaLabel: 'Pré-visualização do espaço Lettrine Editorial',
      brand: 'AUDITELLE / REVISTA DEMO',
      cycle: 'Ciclo editorial 2026',
      export: 'Exportar',
      newManuscript: 'Novo manuscrito',
      sidebar: ['Manuscritos', 'Relatórios', 'Equipa', 'Consumo', 'Definições'],
      recentTitle: 'Manuscritos recentes',
      recentSummary: '24 submissões · 18 análises concluídas',
      filter: 'Filtrar',
      headers: ['Manuscrito', 'Estado', 'IA', 'Similaridade', 'Relatório'],
      rows: [
        ['Lexicografia histórica', 'A examinar', '3 excertos', '18%', 'Disponível'],
        ['Arquivos abertos e ciência', 'Concluída', 'Sem sinais', '6%', 'Disponível'],
        ['Ética dos dados clínicos', 'Em curso', 'n.d.', 'n.d.', 'Pendente'],
        ['Pedagogias críticas digitais', 'A examinar', '1 excerto', '12%', 'Disponível'],
        ['Corpora e tradução assistida', 'Concluída', 'Sem sinais', '9%', 'Disponível'],
      ],
      reviewStatus: 'A examinar',
      readyStatus: 'Concluída',
    },
    reportModal: {
      title: 'Exemplo de relatório editorial',
      kicker: 'RELATÓRIO-2026-0341 · MANUSCRITO ANONIMIZADO',
      manuscriptTitle: 'Abordagens computacionais à lexicografia histórica',
      paragraphs: [
        {
          before:
            'Os corpora digitalizados permitem hoje uma cobertura diacrónica sem precedentes. ',
          marked:
            'Os modelos de linguagem tornam mais eficiente a extração de variantes gráficas',
          after:
            ', desde que os resultados sejam submetidos a validação filológica por especialistas.',
          tone: 'ai',
        },
        {
          before: 'Esta evolução está a transformar as práticas de documentação. ',
          marked:
            'A constituição de corpora comparáveis continua, contudo, a ser uma condição essencial para a fiabilidade das análises',
          after:
            ', em especial quando as fontes apresentam níveis de digitalização heterogéneos.',
          tone: 'similarity',
        },
        {
          before:
            'A equipa editorial relaciona os sinais com a metodologia, as citações e a política da revista antes de qualquer decisão.',
        },
      ],
      findingsTitle: 'Sinais a examinar',
      findings: [
        { title: 'Conteúdo de IA', detail: '3 excertos assinalados a examinar', tone: 'ochre' },
        { title: 'Similaridade', detail: '18% · 2 fontes associadas', tone: 'green' },
        { title: 'Contexto', detail: '6.214 palavras · ciências humanas' },
        { title: 'Princípio', detail: 'Este relatório não constitui um veredicto.' },
      ],
      exportLabel: 'Exportar PDF',
    },
    form: {
      modalTitle: 'Pedir uma conta de demonstração institucional',
      intro:
        'Reservado a revistas, editoras e sociedades científicas. A avaliação e a ativação são feitas por email.',
      name: 'Nome completo',
      email: 'Email profissional',
      organization: 'Revista ou organização',
      role: 'Função',
      rolePlaceholder: 'Direção, edição, secretariado editorial…',
      journalCount: 'Número de revistas',
      journalCountOptions: [
        { value: 'one', label: '1 revista' },
        { value: 'two_to_five', label: '2 a 5 revistas' },
        { value: 'six_plus', label: '6 revistas ou mais' },
      ],
      volume: 'Manuscritos por ano',
      volumeOptions: [
        { value: 'under_300', label: 'Menos de 300' },
        { value: '300_600', label: '300 a 600' },
        { value: '600_1500', label: '600 a 1.500' },
        { value: 'over_1500', label: 'Mais de 1.500' },
      ],
      plan: 'Oferta de interesse',
      planOptions: [
        { value: 'undecided', label: 'A definir' },
        { value: 'essential', label: 'Editorial Essencial' },
        { value: 'journal', label: 'Editorial Revista' },
        { value: 'organization', label: 'Editorial Organização' },
      ],
      context: 'Contexto',
      contextPlaceholder:
        'Descreva o vosso processo editorial e as análises de que precisam.',
      honeypot: 'Sítio web',
      reassurance: 'Sem reuniões obrigatórias. Respondemos por email.',
      privacyNotice: {
        lead: 'Tratamento dos dados deste formulário:',
        link: 'política de privacidade',
      },
      submitting: 'A enviar…',
      submit: 'Enviar o pedido',
      successTitle: 'Pedido recebido',
      successMessage:
        'Vamos verificar a elegibilidade da sua organização. Se o pedido for aceite, enviaremos as instruções de acesso por email. Não é necessário marcar reunião.',
      errors: {
        invalid_request: 'Verifique os dados introduzidos.',
        professional_email_required:
          'Utilize o endereço institucional da sua universidade, instituição ou revista.',
        too_large: 'O pedido é demasiado longo. Encurte a descrição e tente novamente.',
        rate_limited: 'Demasiados pedidos. Tente novamente dentro de uma hora.',
        delivery_unavailable: 'Não foi possível enviar o pedido. Tente novamente mais tarde.',
      },
    },
  },
  en: {
    locale: 'en',
    htmlLang: 'en',
    openGraphLocale: 'en_GB',
    path: '/journals',
    privacyNoticePath: '/journals/privacy',
    metadata: {
      title: 'Lettrine Editorial | Integrity for scholarly journals',
      description:
        'Lettrine Editorial helps European scholarly journals review AI and similarity signals in manuscripts written in their own language, and document the human editorial decision.',
      pageName: 'Lettrine Editorial',
      pageDescription:
        'Editorial integrity platform for European scholarly journals publishing in their own language.',
    },
    brand: {
      name: 'Lettrine',
      product: 'Editorial',
      ariaLabel: 'Lettrine Editorial, home',
    },
    navigation: {
      ariaLabel: 'Main navigation',
      mobileAriaLabel: 'Mobile navigation',
      product: 'Product',
      workflow: 'How it works',
      privacy: 'Confidentiality',
      pricing: 'Pricing',
      faq: 'FAQ',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    common: {
      skipLink: 'Skip to content',
      demoCta: 'Request a demo account',
      reportCta: 'See a sample report',
      close: 'Close',
    },
    hero: {
      eyebrow: 'Editorial integrity platform',
      title: 'Editorial integrity for journals that publish in their own language.',
      lead:
        'Analyse manuscripts in Polish, Czech, Portuguese, Italian, French and other supported languages, review AI and similarity signals, and record each editorial decision in a clear report. The review stays human.',
      offerCta: 'Explore the Editorial offer',
      principlesAriaLabel: 'Product principles',
      principles: ['Signals, not verdicts', 'Access for several editors', 'Exportable reports'],
    },
    audience: {
      label: 'Built for those who publish',
      items: [
        'Scholarly journals',
        'University presses',
        'Learned societies',
        'Editorial boards',
      ],
    },
    workflow: {
      label: 'A documented process',
      title: 'From submission to editorial decision, without losing context.',
      intro:
        'Lettrine brings the analysis, the passages to review and the journal history together in one shared workspace.',
      steps: [
        {
          number: '01',
          title: 'Submit',
          description:
            'Add a manuscript and link it to the journal, issue or special issue it belongs to.',
        },
        {
          number: '02',
          title: 'Analyse',
          description:
            'Get the signals related to AI-generated content and similarity, with the passages and sources available.',
        },
        {
          number: '03',
          title: 'Review',
          description:
            'The editorial team interprets the results in their scholarly context. Lettrine does not deliver a verdict.',
        },
        {
          number: '04',
          title: 'Document',
          description:
            'Export the report and keep a clear record of the analysis in the editorial history.',
        },
      ],
    },
    product: {
      label: 'The editorial workspace',
      title: 'A manuscript queue the whole team can read.',
      intro:
        'Follow the status of each analysis, the signals to review and the reports available, without juggling spreadsheets.',
    },
    privacy: {
      label: 'Confidentiality by design',
      title: 'Manuscripts deserve clear rules.',
      intro:
        'Lettrine is designed to document retention, access and the providers involved before an editorial team starts using it.',
      principles: [
        {
          number: '01',
          title: 'Controlled access',
          description:
            'Separate roles for managing editors, editors and readers, with a history attached to each manuscript.',
        },
        {
          number: '02',
          title: 'Defined retention',
          description:
            'A retention and deletion policy is agreed with the journal before the service starts.',
        },
        {
          number: '03',
          title: 'Documented providers',
          description:
            'The analysis engines and their processing terms are identified in the contractual documentation.',
        },
      ],
    },
    pricing: {
      label: 'Annual offer',
      title: 'A volume of checks that matches your journal’s pace.',
      intro:
        'Prices, volumes and provider terms are agreed with each journal before any contractual proposal.',
      recommended: 'Recommended',
      plans: [
        {
          id: 'essential',
          name: 'Essential',
          audience: 'For a small journal or a compact editorial team.',
          price: 'Price to be agreed',
          period: 'annual offer prepared with your team',
          volume: 'Volume set after a first conversation',
          features: [
            'Small editorial team',
            'AI and similarity analysis',
            'Exportable PDF reports',
            'Manuscript history',
            'Email support',
          ],
        },
        {
          id: 'journal',
          name: 'Journal',
          audience: 'For an active journal with several editors or sections.',
          price: 'Price to be agreed',
          period: 'annual offer prepared with your team',
          volume: 'Volume matched to your publication pace',
          features: [
            'Several editors or sections',
            'AI and similarity analysis',
            'Reports and full history',
            'Usage tracking',
            'Documented onboarding',
          ],
          featured: true,
        },
        {
          id: 'organization',
          name: 'Organisation',
          audience: 'For a publisher, a learned society or a portfolio of journals.',
          price: 'On quotation',
          period: 'custom volume and governance',
          volume: 'Several journals or teams',
          features: [
            'Editors and administrators',
            'Volumes set per journal',
            'Guided activation by email',
            'Dedicated retention terms',
            'Priority support',
          ],
        },
      ],
      noteTitle: 'Prices are not published:',
      noteLead: 'the offer is agreed on request.',
      noteDetail:
        'Price and add-on assumptions are not published until provider costs and terms are confirmed.',
    },
    faq: {
      label: 'Frequently asked questions',
      title: 'What an editorial team should know.',
      items: [
        {
          question: 'Does Lettrine decide whether an author used AI?',
          answer:
            'No. Lettrine highlights signals and passages to review. Interpretation always rests with the editorial team, in the context of the manuscript and the journal’s policy.',
        },
        {
          question: 'Which languages can be analysed?',
          answer:
            'The analysis engine supports Polish, Czech, Portuguese, Italian, French, Spanish, German, Swedish and other languages. We confirm coverage for your language before you start.',
        },
        {
          question: 'What does an editorial check include?',
          answer:
            'The prototype provides an AI content analysis, a similarity analysis, the flagged passages and an exportable report. The final contractual scope depends on the engines activated for your offer.',
        },
        {
          question: 'Are manuscripts used to train models?',
          answer:
            'Processing terms must be confirmed in the contractual documentation of each activated provider. Lettrine sets them out before the journal starts using the service.',
        },
        {
          question: 'Can checks be added during the year?',
          answer:
            'Yes. Additional blocks of checks are available without changing the annual renewal date.',
        },
        {
          question: 'How do we request a demo account?',
          answer:
            'Send your journal’s details from a professional email address. Lettrine checks eligibility and replies by email. If the request is accepted, access instructions are sent without any need for a meeting.',
        },
      ],
    },
    closing: {
      title: 'Give your editors clear signals, not an automated verdict.',
      description:
        'See how Lettrine Editorial can fit into your journal’s workflow.',
    },
    footer: {
      legal: 'Auditelle SASU · Paris · SIREN 945117000',
      privacyLink: 'Privacy notice',
      manageCookies: 'Manage cookies',
    },
    reportPreview: {
      ariaLabel: 'Lettrine report preview',
      id: 'REPORT-2026-0341',
      status: 'Analysis complete',
      kicker: 'Manuscript · 6,214 words · Journal of digital humanities',
      title: 'Computational approaches to historical lexicography',
      aiValue: '3',
      aiLabel: 'AI passages to review',
      similarityValue: '18%',
      similarityLabel: 'similarity · 2 sources',
      beforeAi: 'Digitised corpora now allow unprecedented diachronic coverage. ',
      aiPassage:
        'Language models make the extraction of spelling variants more efficient',
      betweenMarks: ', subject to ',
      similarityPassage: 'philological validation by specialists in the field',
      note: 'For review by the editorial team.',
      exportLabel: 'Export PDF report',
    },
    workspace: {
      ariaLabel: 'Lettrine Editorial workspace preview',
      brand: 'AUDITELLE / DEMO JOURNAL',
      cycle: 'Editorial cycle 2026',
      export: 'Export',
      newManuscript: 'New manuscript',
      sidebar: ['Manuscripts', 'Reports', 'Team', 'Usage', 'Settings'],
      recentTitle: 'Recent manuscripts',
      recentSummary: '24 submissions · 18 analyses complete',
      filter: 'Filter',
      headers: ['Manuscript', 'Status', 'AI', 'Similarity', 'Report'],
      rows: [
        ['Historical lexicography', 'To review', '3 passages', '18%', 'Available'],
        ['Open archives and science', 'Complete', 'No signal', '6%', 'Available'],
        ['Ethics of clinical data', 'In progress', 'n/a', 'n/a', 'Pending'],
        ['Critical digital pedagogies', 'To review', '1 passage', '12%', 'Available'],
        ['Corpora and assisted translation', 'Complete', 'No signal', '9%', 'Available'],
      ],
      reviewStatus: 'To review',
      readyStatus: 'Complete',
    },
    reportModal: {
      title: 'Sample editorial report',
      kicker: 'REPORT-2026-0341 · ANONYMISED MANUSCRIPT',
      manuscriptTitle: 'Computational approaches to historical lexicography',
      paragraphs: [
        {
          before:
            'Digitised corpora now allow unprecedented diachronic coverage. ',
          marked:
            'Language models make the extraction of spelling variants more efficient',
          after:
            ', provided the results undergo philological validation by specialists.',
          tone: 'ai',
        },
        {
          before: 'This shift is changing documentation practices. ',
          marked:
            'Building comparable corpora nevertheless remains an essential condition for reliable analysis',
          after:
            ', especially when sources have uneven levels of digitisation.',
          tone: 'similarity',
        },
        {
          before:
            'The editorial team weighs the signals against the methodology, the citations and the journal’s policy before any decision.',
        },
      ],
      findingsTitle: 'Signals to review',
      findings: [
        { title: 'AI content', detail: '3 flagged passages to review', tone: 'ochre' },
        { title: 'Similarity', detail: '18% · 2 linked sources', tone: 'green' },
        { title: 'Context', detail: '6,214 words · humanities' },
        { title: 'Principle', detail: 'This report is not a verdict.' },
      ],
      exportLabel: 'Export PDF',
    },
    form: {
      modalTitle: 'Request an institutional demo account',
      intro:
        'For journals, publishers and learned societies. Review and activation happen by email.',
      name: 'Full name',
      email: 'Professional email',
      organization: 'Journal or organisation',
      role: 'Role',
      rolePlaceholder: 'Editor-in-chief, managing editor, editorial office…',
      journalCount: 'Number of journals',
      journalCountOptions: [
        { value: 'one', label: '1 journal' },
        { value: 'two_to_five', label: '2 to 5 journals' },
        { value: 'six_plus', label: '6 journals or more' },
      ],
      volume: 'Manuscripts per year',
      volumeOptions: [
        { value: 'under_300', label: 'Fewer than 300' },
        { value: '300_600', label: '300 to 600' },
        { value: '600_1500', label: '600 to 1,500' },
        { value: 'over_1500', label: 'More than 1,500' },
      ],
      plan: 'Offer of interest',
      planOptions: [
        { value: 'undecided', label: 'Not decided yet' },
        { value: 'essential', label: 'Editorial Essential' },
        { value: 'journal', label: 'Editorial Journal' },
        { value: 'organization', label: 'Editorial Organisation' },
      ],
      context: 'Context',
      contextPlaceholder:
        'Describe your editorial process, the languages you publish in and the checks you need.',
      honeypot: 'Website',
      reassurance: 'No meeting required. We reply by email.',
      privacyNotice: {
        lead: 'How we process the data in this form:',
        link: 'privacy notice',
      },
      submitting: 'Sending…',
      submit: 'Send request',
      successTitle: 'Request received',
      successMessage:
        'We will check your organisation’s eligibility. If the request is accepted, we will email you access instructions. No meeting is required.',
      errors: {
        invalid_request: 'Please check the information you entered.',
        professional_email_required:
          'Please use the institutional address of your university, institution or journal.',
        too_large: 'The request is too long. Please shorten the description and try again.',
        rate_limited: 'Too many requests. Please try again in an hour.',
        delivery_unavailable: 'The request could not be sent. Please try again later.',
      },
    },
  },
} satisfies Record<EditorialLocale, EditorialCopy>

export function getEditorialCopy(locale: EditorialLocale) {
  return editorialCopy[locale]
}
