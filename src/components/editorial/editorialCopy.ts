export type EditorialLocale = 'fr' | 'sv' | 'it'
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
          title: 'Inviare',
          description:
            'Caricate un manoscritto e associatelo alla rivista, al fascicolo o al dossier editoriale di riferimento.',
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
            'Il comitato interpreta i risultati nel contesto scientifico. Lettrine non emette verdetti.',
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
        'Seguite lo stato di ogni analisi, i segnali da esaminare e i report disponibili senza moltiplicare i fogli di calcolo.',
    },
    privacy: {
      label: 'Riservatezza fin dalla progettazione',
      title: 'I manoscritti meritano un quadro esplicito.',
      intro:
        'Lettrine è pensata per documentare conservazione, accessi e fornitori coinvolti prima che una redazione inizi a usarla.',
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
            'Una politica di conservazione e cancellazione viene concordata con la rivista prima della messa in produzione.',
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
      label: 'Accordo annuale',
      title: 'Un volume di controlli adatto al ritmo della vostra rivista.',
      intro:
        'Prezzi, volumi e condizioni dei fornitori vengono definiti con ciascuna rivista prima di qualsiasi proposta contrattuale.',
      recommended: 'Consigliato',
      plans: [
        {
          id: 'essential',
          name: 'Essenziale',
          audience: 'Per una piccola rivista o un comitato editoriale ristretto.',
          price: 'Prezzo da definire',
          period: 'offerta annuale preparata con la vostra redazione',
          volume: 'Volume editoriale definito dopo un primo confronto',
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
      noteLead: "l'offerta si definisce su richiesta.",
      noteDetail:
        'Le ipotesi di prezzo e di pacchetti aggiuntivi non vengono pubblicate finché costi e condizioni dei fornitori non sono confermati.',
    },
    faq: {
      label: 'Domande frequenti',
      title: 'Quello che una redazione deve sapere.',
      items: [
        {
          question: "Lettrine stabilisce se un autore ha usato un'IA?",
          answer:
            "No. Lettrine evidenzia segnali e passaggi da esaminare. L'interpretazione spetta sempre al comitato editoriale, nel contesto del manoscritto e della politica della rivista.",
        },
        {
          question: 'Che cosa comprende un controllo editoriale?',
          answer:
            "Il prototipo prevede un'analisi dei contenuti generati con l'IA, un'analisi di similarità, i passaggi segnalati e un report esportabile. La definizione contrattuale finale dipenderà dai motori attivati per la vostra offerta.",
        },
        {
          question: 'I manoscritti vengono usati per addestrare modelli?',
          answer:
            'Le condizioni di trattamento devono essere confermate nella documentazione contrattuale di ciascun fornitore attivato. Lettrine le presenta prima della messa in produzione della rivista.',
        },
        {
          question: "Si possono aggiungere controlli nel corso dell'anno?",
          answer:
            'Sì. Sono previsti pacchetti di controlli aggiuntivi senza modificare la data di rinnovo annuale.',
        },
        {
          question: 'Quanto tempo serve per iniziare?',
          answer:
            'Una piccola redazione può essere configurata rapidamente, dopo aver definito responsabili, ruoli di accesso, politica di conservazione e volume annuale.',
        },
        {
          question: 'Come si richiede un account demo?',
          answer:
            "Inviate le informazioni sulla vostra rivista con un indirizzo email professionale. Lettrine verifica l'idoneità e risponde via email. Se la richiesta viene accolta, le istruzioni di accesso vengono inviate senza bisogno di un appuntamento.",
        },
      ],
    },
    closing: {
      title: 'Date al vostro comitato segnali chiari, non un verdetto automatico.',
      description:
        'Scoprite come Lettrine Editoriale può inserirsi nel flusso di lavoro della vostra rivista scientifica.',
    },
    footer: {
      legal: 'Auditelle SASU · Parigi · SIREN 945117000',
      privacyLink: 'Dati personali',
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
        "I modelli linguistici offrono una maggiore produttività nell'estrazione delle varianti grafiche",
      betweenMarks: ', previa ',
      similarityPassage: 'validazione filologica condotta da specialisti del settore',
      note: 'Da esaminare a cura del comitato di redazione.',
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
            "I modelli linguistici offrono una maggiore produttività nell'estrazione delle varianti grafiche",
          after:
            ', a condizione che i risultati siano validati filologicamente da specialisti.',
          tone: 'ai',
        },
        {
          before: 'Questa evoluzione trasforma le pratiche di documentazione. ',
          marked:
            'La costituzione di corpora comparabili resta tuttavia una condizione essenziale per la solidità delle analisi',
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
        { title: 'Contenuti IA', detail: '3 passaggi segnalati · livello da esaminare', tone: 'ochre' },
        { title: 'Similarità', detail: '18% · 2 fonti associate', tone: 'green' },
        { title: 'Contesto', detail: '6.214 parole · scienze umane' },
        { title: 'Principio', detail: 'Questo report non costituisce un verdetto.' },
      ],
      exportLabel: 'Esporta PDF',
    },
    form: {
      modalTitle: 'Richiedi un account demo istituzionale',
      intro:
        "Riservato a riviste, case editrici e organizzazioni scientifiche. La valutazione e l'attivazione avvengono via email.",
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
      successTitle: 'Richiesta ricevuta.',
      successMessage:
        "Verifichiamo l'idoneità della vostra organizzazione. Se la richiesta viene accolta, le istruzioni di accesso saranno inviate via email. Non è necessario alcun appuntamento.",
      errors: {
        invalid_request: 'Verificate le informazioni inserite.',
        professional_email_required:
          "Usate l'indirizzo professionale della vostra istituzione o della vostra rivista.",
        too_large: 'La richiesta è troppo lunga. Accorciate la descrizione e riprovate.',
        rate_limited: "Troppe richieste. Riprovate tra un'ora.",
        delivery_unavailable: 'Non è stato possibile inviare la richiesta. Riprovate più tardi.',
      },
    },
  },
} satisfies Record<EditorialLocale, EditorialCopy>

export function getEditorialCopy(locale: EditorialLocale) {
  return editorialCopy[locale]
}
