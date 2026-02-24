import type { ResellerConfig } from './types'

const config: ResellerConfig = {
  id: 'auditelle-fr',

  // ── Branding ──────────────────────────────────────────────────────────────
  name: 'Auditelle',
  domain: 'auditelle.fr',
  logoColor: '/images/logo-color.svg',
  logoWhite: '/images/logo-white.svg',

  // ── Locale ────────────────────────────────────────────────────────────────
  locale: 'fr_FR',
  htmlLang: 'fr',
  currency: 'EUR',
  currencySymbol: '\u20ac',
  timezone: 'Europe/Paris',

  // ── Legal ─────────────────────────────────────────────────────────────────
  legalEntity: 'Auditelle SASU',
  registrationNumber: '945117000',
  registrationLabel: 'SIREN',
  country: 'France',
  city: 'Paris',
  dataProtectionLabel: 'RGPD',

  // ── Contact ───────────────────────────────────────────────────────────────
  supportEmail: 'contact@auditelle.fr',
  noReplyEmail: 'noreply@auditelle.fr',

  // ── Pricing ───────────────────────────────────────────────────────────────
  plans: {
    homepage: [
      {
        name: 'Gratuit',
        price: '0\u20ac',
        description: 'D\u00e9couvrez la pr\u00e9cision',
        features: [
          '10 analyses par mois',
          '1 utilisateur',
          'Score IA 99.9% pr\u00e9cis',
          'Identification du mod\u00e8le',
          'Historique 7 jours',
        ],
        cta: 'Commencer',
        href: '/signup',
      },
      {
        name: 'Pro',
        price: '25\u20ac',
        period: 'mois',
        description: 'Pour enseignants et consultants',
        features: [
          '1,000 analyses par mois',
          '1 utilisateur',
          'API (500 appels)',
          'Export PDF/CSV',
          'Support email',
        ],
        cta: 'Choisir Pro',
        href: '/signup?plan=pro',
        popular: true,
        popularBadge: 'POPULAIRE',
      },
      {
        name: '\u00c9quipe',
        price: '99\u20ac',
        period: 'mois',
        description: 'Pour un groupe de professeurs',
        features: [
          '5,000 analyses par mois',
          "Jusqu'\u00e0 5 professeurs",
          'API (2,500 appels)',
          'Export PDF/CSV',
          'Support prioritaire',
        ],
        cta: 'Choisir \u00c9quipe',
        href: '/signup?plan=equipe',
      },
      {
        name: 'D\u00e9partement',
        price: '249\u20ac',
        period: 'mois',
        description: 'Pour d\u00e9partements et facult\u00e9s',
        features: [
          '20,000 analyses par mois',
          "Jusqu'\u00e0 20 professeurs",
          'API illimit\u00e9e',
          'Int\u00e9gration LMS',
          'Dashboard administrateur',
        ],
        cta: 'Choisir D\u00e9partement',
        href: '/signup?plan=departement',
      },
      {
        name: 'Institution',
        price: 'Sur devis',
        description: 'Pour \u00e9tablissements entiers',
        features: [
          'Analyses illimit\u00e9es',
          'Tous les professeurs',
          'White-label API',
          'Account manager d\u00e9di\u00e9',
          'SLA 99.9%',
        ],
        cta: 'Nous contacter',
        href: '/contact',
      },
    ],
    upgrade: [
      {
        id: 'student',
        name: 'Student',
        price: '4,99\u20ac',
        period: '/mois',
        description: 'Pour \u00e9tudiants et doctorants',
        features: [
          '100 analyses par mois',
          'D\u00e9tection 99,9% pr\u00e9cision',
          'Export PDF',
          'Historique 7 jours',
        ],
        badge: '\ud83c\udf93',
      },
      {
        id: 'starter',
        name: 'Starter',
        price: '29\u20ac',
        period: '/mois',
        description: 'Pour enseignants et consultants',
        features: [
          '1 000 analyses par mois',
          'Int\u00e9grations LMS (Moodle)',
          'Export PDF/CSV',
          'Support email',
          'Historique 30 jours',
        ],
        popular: true,
      },
      {
        id: 'university',
        name: 'Universit\u00e9',
        price: '149\u20ac',
        period: '/mois',
        description: 'Pour \u00e9tablissements \u00e9ducatifs',
        features: [
          '10 000 analyses par mois',
          'Multi-utilisateurs',
          'API illimit\u00e9e',
          'Dashboard admin',
          'Support prioritaire',
          'Rapports personnalis\u00e9s',
        ],
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: '499\u20ac',
        period: '/mois',
        description: 'Pour grandes organisations',
        features: [
          'Analyses illimit\u00e9es',
          'API d\u00e9di\u00e9e',
          'Account manager d\u00e9di\u00e9',
          'SLA 99,9%',
          'Fonctionnalit\u00e9s sur mesure',
          'Facturation personnalis\u00e9e',
        ],
      },
    ],
  },

  // ── Analytics ─────────────────────────────────────────────────────────────
  googleAdsId: 'AW-17962560127',
  googleAdsConversionLabel: 'AW-17962560127/0yGyCKHUs_sbEP_Um_VC',
  googleAdsSignupConversionLabel: 'AW-17962560127/QuvLCODYof4bEP_Um_VC',

  // ── Feature flags ─────────────────────────────────────────────────────────
  features: {
    fileUpload: true,
    apiAccess: true,
    teamManagement: true,
    demoPage: true,
    heroDemo: true,
  },

  // ── SEO ───────────────────────────────────────────────────────────────────
  seo: {
    title: 'Auditelle \u2014 D\u00e9tection IA la plus pr\u00e9cise du march\u00e9',
    description: 'D\u00e9tectez le contenu g\u00e9n\u00e9r\u00e9 par intelligence artificielle avec une pr\u00e9cision de 99,9%. ChatGPT, Claude, Gemini et plus. V\u00e9rification par des tiers, taux de faux positifs quasi nul.',
    keywords: ['d\u00e9tection IA', 'd\u00e9tection ChatGPT', 'd\u00e9tection plagiat IA', 'int\u00e9grit\u00e9 acad\u00e9mique', 'Auditelle'],
    ogTitle: 'Auditelle \u2014 D\u00e9tection IA la plus pr\u00e9cise du march\u00e9',
    ogDescription: 'D\u00e9tectez le contenu IA avec une pr\u00e9cision de 99,9%. R\u00e9sultats v\u00e9rifi\u00e9s par des tiers.',
  },

  // ── Redirects ─────────────────────────────────────────────────────────────
  redirects: [
    { source: '/essai-gratuit', destination: '/signup', permanent: false },
    { source: '/demo', destination: '/demo-video', permanent: false },
  ],

  // ── UI Strings ────────────────────────────────────────────────────────────
  strings: {
    // Navbar
    nav: {
      features: 'Fonctionnalit\u00e9s',
      pricing: 'Tarifs',
      dashboard: 'Tableau de bord',
      login: 'Connexion',
      freeTrial: 'Essai gratuit',
    },

    // Hero
    hero: {
      badge: '99,9% de pr\u00e9cision v\u00e9rifi\u00e9e',
      title: 'Le d\u00e9tecteur IA qui ',
      titleAccent: 'fonctionne vraiment',
      subtitle: "D\u00e9tectez ChatGPT, Claude, Gemini et plus avec une pr\u00e9cision in\u00e9gal\u00e9e. V\u00e9rifi\u00e9 par l'Universit\u00e9 du Maryland. Taux de faux positifs quasi nul.",
      trustBadges: [
        'D\u00e9tection IA avanc\u00e9e',
        'V\u00e9rifi\u00e9 par des tiers',
        'Essai gratuit',
      ],
      ctaPrimary: 'Essayer gratuitement \u2192',
      ctaSecondary: 'Comment \u00e7a marche',
    },

    // Trust bar
    trustBar: {
      label: 'Reconnue par les experts',
      names: ['University of Maryland', 'Chicago Booth', 'Stony Brook University', 'SOC2 Type 2'],
    },

    // Features
    features: {
      title: 'Technologie de d\u00e9tection avanc\u00e9e',
      subtitle: "Une pr\u00e9cision de 99,9% l\u00e0 o\u00f9 les autres \u00e9chouent. D\u00e9velopp\u00e9e par des chercheurs de Stanford, Tesla et Google.",
      items: [
        {
          icon: 'Brain',
          title: 'Score de probabilit\u00e9 IA',
          description: "Soumettez votre contenu et obtenez un score pr\u00e9cis indiquant si le texte est d'origine humaine ou g\u00e9n\u00e9r\u00e9 par IA.",
        },
        {
          icon: 'FileSearch',
          title: 'Identification du mod\u00e8le',
          description: "D\u00e9tectez quel mod\u00e8le a \u00e9t\u00e9 utilis\u00e9 : ChatGPT, Claude, Gemini, Llama, Perplexity et bien d'autres.",
        },
        {
          icon: 'BarChart3',
          title: 'Analyse par section',
          description: "Comprenez si l'int\u00e9gralit\u00e9 du texte est IA, humain, ou une combinaison des deux, section par section.",
        },
        {
          icon: 'Shield',
          title: 'D\u00e9tection de plagiat',
          description: "Recherche parmi des milliards de pages web, livres et articles pour d\u00e9tecter le plagiat en plus de l'IA.",
        },
        {
          icon: 'Zap',
          title: 'Faux positifs quasi nuls',
          description: 'V\u00e9rifi\u00e9e ind\u00e9pendamment pour son taux de faux positifs le plus bas du march\u00e9. Fiable \u00e0 100%.',
        },
        {
          icon: 'Globe',
          title: 'Multilingue',
          description: "D\u00e9tection pr\u00e9cise dans de nombreuses langues, y compris le fran\u00e7ais, l'anglais, l'espagnol et l'allemand.",
        },
      ],
    },

    // How it works
    howItWorks: {
      title: 'Simple comme 1, 2, 3',
      steps: [
        { title: 'Collez votre texte', description: 'Copiez-collez le contenu \u00e0 analyser dans notre interface intuitive.' },
        { title: "Lancez l'analyse", description: 'Notre moteur IA analyse chaque phrase en quelques secondes.' },
        { title: 'Consultez le rapport', description: 'Obtenez un score d\u00e9taill\u00e9 avec identification du mod\u00e8le et analyse section par section.' },
      ],
    },

    // Testimonials
    testimonials: {
      title: 'Ce que disent les experts',
      items: [
        {
          quote: "Parmi les d\u00e9tecteurs automatiques, ce syst\u00e8me surpasse significativement tous les autres.",
          author: 'Jenna Russell',
          role: 'University of Maryland',
        },
        {
          quote: "Un d\u00e9tecteur presque surnaturellement bon. Je n'ai encore constat\u00e9 aucun faux positif ni faux n\u00e9gatif.",
          author: 'Ryan Nicolace',
          role: 'Cloud Architect',
        },
        {
          quote: "Mes \u00e9tudiants sont tellement convaincus de sa pr\u00e9cision que c'est devenu le meilleur moyen de dissuasion.",
          author: 'Jarred Phillips',
          role: 'New Roads School',
        },
      ],
    },

    // Competitor comparison
    comparison: {
      title: 'Pourquoi choisir Auditelle ?',
      subtitle: 'Comparez les principales solutions de d\u00e9tection IA',
      competitors: ['Auditelle', 'GPTZero', 'Turnitin AI', 'Originality.ai'],
      rows: [
        { label: 'Pr\u00e9cision', values: ['99,9%', '~85%', '~80%', '~94%'] },
        { label: 'Taux de faux positifs', values: ['Quasi nul', '\u00c9lev\u00e9', 'Mod\u00e9r\u00e9', 'Mod\u00e9r\u00e9'] },
        { label: 'Support fran\u00e7ais', values: [true, false, false, false] },
        { label: 'Prix (\u00e0 partir de)', values: ['Gratuit', '$9.99/mois', 'Sur devis', '$14.95/mois'] },
        { label: 'Analyse par section', values: [true, false, false, true] },
        { label: 'Identification du mod\u00e8le', values: [true, true, false, false] },
      ],
    },

    // Pricing (homepage section)
    pricing: {
      title: 'Tarification transparente et comp\u00e9titive',
      subtitle: 'Technologie Pangram Labs. Service fran\u00e7ais. Commencez gratuitement, \u00e9voluez selon vos besoins.',
      footer: 'Technologie Pangram \u2022 99,9% de pr\u00e9cision \u2022 Conforme RGPD \u2022 Support fran\u00e7ais \u2022 SIREN 945117000',
    },

    // CTA section
    cta: {
      title: 'Pr\u00eat \u00e0 d\u00e9tecter le contenu IA ?',
      subtitle: "Rejoignez des milliers de professionnels qui font confiance \u00e0 Auditelle pour prot\u00e9ger l'int\u00e9grit\u00e9 de leurs contenus.",
      button: 'Cr\u00e9er un compte gratuit \u2192',
    },

    // Footer
    footer: {
      description: 'La solution fran\u00e7aise de d\u00e9tection de texte g\u00e9n\u00e9r\u00e9 par intelligence artificielle. Pr\u00e9cision in\u00e9gal\u00e9e, respect de la vie priv\u00e9e, conformit\u00e9 RGPD.',
      productLabel: 'Produit',
      companyLabel: 'Entreprise',
      contactLabel: 'Contact',
      copyright: 'Tous droits r\u00e9serv\u00e9s.',
      poweredBy: 'D\u00e9tection propuls\u00e9e par',
      poweredByName: 'Pangram Labs',
    },

    // Auth
    auth: {
      login: 'Connexion',
      signup: 'Cr\u00e9er un compte',
      resetPassword: 'R\u00e9initialiser le mot de passe',
      loginSubtitle: 'Acc\u00e9dez \u00e0 votre tableau de bord de d\u00e9tection IA',
      loginSubtitlePlan: 'Connectez-vous pour activer le plan {plan}',
      signupSubtitle: 'Commencez \u00e0 d\u00e9tecter le contenu IA gratuitement',
      signupSubtitlePlan: 'Cr\u00e9ez votre compte pour activer le plan {plan}',
      resetSubtitle: 'Entrez votre email pour recevoir un lien de r\u00e9initialisation',
      fullName: 'Nom complet',
      email: 'Email',
      password: 'Mot de passe',
      emailPlaceholder: 'vous@email.com',
      namePlaceholder: 'Jean Dupont',
      forgotPassword: 'Mot de passe oubli\u00e9 ?',
      noAccount: 'Pas encore de compte ?',
      hasAccount: 'D\u00e9j\u00e0 un compte ?',
      backToLogin: 'Retour \u00e0 la connexion',
      loading: 'Chargement...',
      accountCreatedRedirect: 'Compte cr\u00e9\u00e9 ! Redirection vers le paiement...',
      checkEmail: 'V\u00e9rifiez votre email pour confirmer votre inscription.',
      resetEmailSent: 'Un lien de r\u00e9initialisation a \u00e9t\u00e9 envoy\u00e9 \u00e0 votre adresse email.',
    },

    // Dashboard
    dashboard: {
      detection: 'D\u00e9tection',
      history: 'Historique',
      account: 'Compte',
      signOut: 'D\u00e9connexion',
      analyzerTitle: 'Analyseur de contenu IA',
      analyzerSubtitle: 'Collez votre texte pour d\u00e9tecter le contenu g\u00e9n\u00e9r\u00e9 par IA',
      textareaPlaceholder: 'Collez ici le texte \u00e0 analyser (minimum 50 caract\u00e8res)...',
      characters: 'caract\u00e8res',
      analyze: 'Analyser',
      analyzing: 'Analyse en cours...',
      scansRemaining: 'analyses restantes',
      subscriptionActivated: 'Abonnement activ\u00e9 avec succ\u00e8s !',
      subscriptionActivatedDetail: 'Vos analyses suppl\u00e9mentaires sont maintenant disponibles.',
      minCharsError: 'Veuillez entrer au moins 50 caract\u00e8res pour une analyse fiable.',

      // History
      historyTitle: 'Historique des analyses',
      historyEmpty: 'Aucune analyse pour le moment.',
      historyEmptyHint: 'Lancez votre premi\u00e8re analyse depuis le tableau de bord.',
      historyLoading: 'Chargement\u2026',
      historyModel: 'Mod\u00e8le',

      // Account
      accountTitle: 'Param\u00e8tres du compte',
      profileLabel: 'Profil',
      nameLabel: 'Nom',
      emailLabel: 'Email',
      subscriptionLabel: 'Abonnement',
      plan: 'Plan',
      upgradeToPro: 'Passer au Pro',
      manageSubscription: "G\u00e9rer l'abonnement",
      managingSubscription: 'Chargement...',
      scansPerDay: {
        free: '5 analyses par jour',
        pro: '100 analyses par jour',
        default: 'Analyses illimit\u00e9es',
      },

      // Upgrade
      upgradeTitle: 'Choisir votre plan',
      upgradeSubtitle: 'Tous les plans incluent une pr\u00e9cision de d\u00e9tection IA de 99,9%.',
      upgradeBack: 'Retour au compte',
      upgradePopular: 'POPULAIRE',
      upgradeFooter: 'Tous les plans sont factur\u00e9s mensuellement. Annulation possible \u00e0 tout moment. Paiement s\u00e9curis\u00e9 par Stripe.',
      upgradeLoading: 'Chargement...',
      upgradeContact: 'Nous contacter',
      upgradeChoose: 'Choisir {plan}',
      upgradeError: '\u00c9chec du paiement. Veuillez r\u00e9essayer.',
    },

    // Detection results
    results: {
      probablyHuman: 'Probablement humain',
      mixed: 'Mixte / Incertain',
      probablyAI: 'Probablement IA',
      aiScore: 'Score IA',
      aiProbability: 'Probabilit\u00e9 de contenu g\u00e9n\u00e9r\u00e9 par IA : {score}%',
      classification: 'Classification',
      sectionAnalysis: 'Analyse par section',
      aiPercent: '{score}% IA',
      breakdown: 'R\u00e9partition du texte',
      aiGenerated: 'IA pure',
      aiAssisted: 'IA assist\u00e9e',
      humanWritten: 'Humain',
      viewReport: 'Voir le rapport d\u00e9taill\u00e9',
    },

    // Hero demo
    heroDemo: {
      testNow: 'Testez maintenant',
      free: 'Gratuit',
      placeholder: 'Collez votre texte ici pour une analyse instantan\u00e9e... (min. 50 caract\u00e8res)',
      tryLabel: 'Essayez :',
      humanButton: 'Humain',
      chatgptButton: 'ChatGPT',
      humanSample: "J'adore explorer de nouveaux endroits. Chaque voyage m'apporte des souvenirs uniques et des perspectives diff\u00e9rentes sur le monde.",
      chatgptSample: "L'intelligence artificielle repr\u00e9sente une avanc\u00e9e technologique majeure qui transforme de nombreux secteurs de notre soci\u00e9t\u00e9 moderne.",
      analyzingLabel: 'Analyse en cours...',
      analyzingDetail: 'D\u00e9tection des patterns IA avec Pangram',
      scanner: '\ud83d\udd0d Scanner',
      createAccountFull: "Cr\u00e9er un compte pour l'analyse compl\u00e8te",
      veryLikelyAI: 'Tr\u00e8s probablement IA',
      possiblyAI: 'Possiblement IA',
      probablyHuman: 'Probablement humain',
      connectionError: 'Erreur de connexion',
      ctaButton: 'Cr\u00e9er un compte gratuit \u2192',
      ctaTeaser: "D\u00e9bloquez l'analyse par section, l'identification du mod\u00e8le et plus",
      unlockLabel: "Cr\u00e9ez un compte pour d\u00e9bloquer l'analyse compl\u00e8te",
      scansRemaining: '{count} analyses gratuites restantes aujourd\u2019hui',
    },

    // File upload
    fileUpload: {
      dropOrBrowse: 'Glisser un fichier ou',
      browse: 'parcourir',
      formats: 'PDF, DOCX, TXT \u2014 max 10 Mo',
      extracting: 'Extraction en cours\u2026',
      unsupported: 'Format non support\u00e9. Utilisez PDF, DOCX ou TXT.',
      tooLarge: 'Fichier trop volumineux (max 10 Mo).',
      extractError: "Impossible d'extraire le texte. V\u00e9rifiez que le fichier n'est pas prot\u00e9g\u00e9.",
    },

    // Contact page
    contact: {
      title: 'Contactez-nous',
      subtitle: "Une question ? Un projet d'int\u00e9gration ? Notre \u00e9quipe vous r\u00e9pond sous 24h.",
      emailLabel: 'Email',
      companyName: 'Auditelle SASU',
      institutionCta: 'Universit\u00e9s & Institutions',
      institutionDescription: "Vous souhaitez int\u00e9grer Auditelle dans votre \u00e9tablissement ? Contactez-nous pour un devis personnalis\u00e9 et une d\u00e9monstration.",
      formFullName: 'Nom complet *',
      formEmail: 'Email professionnel *',
      formOrganization: 'Organisation',
      formSubject: 'Sujet *',
      formMessage: 'Message *',
      formSubmit: 'Envoyer le message',
      formSending: 'Envoi en cours...',
      formSuccess: 'Merci pour votre message !',
      formSuccessDetail: 'Nous vous r\u00e9pondrons dans les plus brefs d\u00e9lais.',
      namePlaceholder: 'Jean Dupont',
      emailPlaceholder: 'jean.dupont@universite.fr',
      orgPlaceholder: 'Universit\u00e9 de Paris',
      messagePlaceholder: 'D\u00e9crivez votre besoin...',
      selectSubject: 'S\u00e9lectionnez un sujet',
      subjectOptions: [
        { value: 'D\u00e9monstration', label: 'Demande de d\u00e9monstration' },
        { value: 'Devis', label: 'Devis universit\u00e9 / institution' },
        { value: 'LMS', label: 'Int\u00e9gration LMS' },
        { value: 'Support', label: 'Support technique' },
        { value: 'Partenariat', label: 'Partenariat' },
        { value: 'Autre', label: 'Autre' },
      ],
    },

    // Demo video page
    demoVideo: {
      title: 'D\u00e9couvrez Auditelle en 5 minutes',
      subtitle: 'Voyez comment d\u00e9tecter les contenus g\u00e9n\u00e9r\u00e9s par IA avec 99,9% de pr\u00e9cision',
      videoPlaceholder: 'Vid\u00e9o de d\u00e9monstration',
      videoSoon: 'Bient\u00f4t disponible',
      readyCta: 'Pr\u00eat \u00e0 essayer ?',
      readySubtitle: "Cr\u00e9ez votre compte gratuit et analysez jusqu'\u00e0 10 textes par mois",
      readyButton: "Commencer l'essai gratuit \u2192",
      featureCards: [
        { emoji: '\ud83c\udfaf', title: '99,9% de pr\u00e9cision', description: "Valid\u00e9e par l'Universit\u00e9 du Maryland" },
        { emoji: '\u26a1', title: 'Int\u00e9gration Moodle', description: 'Installation en moins de 10 minutes' },
        { emoji: '\ud83c\uddeb\ud83c\uddf7', title: '100% Fran\u00e7ais', description: 'RGPD, support et facturation FR' },
      ],
    },

    // Email templates
    emails: {
      headerName: 'AUDITELLE',
      legalFooter: '', // built at runtime from config

      welcome: {
        subject: 'Bienvenue sur Auditelle, {name}! \ud83c\udf89',
        greeting: 'Bienvenue, {name}! \ud83d\udc4b',
        intro: "Merci d'avoir cr\u00e9\u00e9 votre compte Auditelle. Vous avez maintenant acc\u00e8s au d\u00e9tecteur IA le plus pr\u00e9cis du march\u00e9, v\u00e9rifi\u00e9 par l'Universit\u00e9 du Maryland.",
        trialTitle: '\ud83c\udf81 Votre essai gratuit inclut :',
        trialFeatures: [
          '10 analyses par mois',
          'Pr\u00e9cision de 99,9%',
          'Identification du mod\u00e8le IA',
          'Historique de 7 jours',
        ],
        ctaButton: 'Commencer ma premi\u00e8re analyse \u2192',
        question: 'Des questions ? R\u00e9pondez directement \u00e0 cet email.',
        ctaUrl: '/dashboard',
      },

      subscriptionConfirmed: {
        subject: 'Votre abonnement {plan} est actif! \ud83d\ude80',
        greeting: 'Merci, {name}!',
        active: 'Votre abonnement {plan} est maintenant actif.',
        planTitle: '\u2705 Votre plan inclut :',
        ctaButton: 'Acc\u00e9der \u00e0 mon dashboard \u2192',
        manageHint: 'G\u00e9rez votre abonnement dans les param\u00e8tres de votre compte.',
      },

      upgradeReminder: {
        subject: '{name}, vous avez utilis\u00e9 {percent}% de vos analyses \ud83d\udcca',
        title: 'Vous utilisez bien Auditelle! \ud83c\udfaf',
        body: '{name}, vous avez d\u00e9j\u00e0 utilis\u00e9 {percent}% de vos analyses gratuites ce mois-ci.',
        upgradeTitle: '\ud83d\ude80 Passez \u00e0 Pro pour :',
        upgradeFeatures: [
          '1,000 analyses/mois (au lieu de 50)',
          'Acc\u00e8s API',
          'Export PDF/CSV',
          'Support prioritaire',
        ],
        upgradePrice: 'Seulement 25\u20ac/mois',
        ctaButton: 'Passer \u00e0 Pro \u2192',
      },

      trialExpiring: {
        subjects: {
          lastDay: "{name}, votre essai gratuit se termine aujourd'hui ! \u23f0",
          urgent: '{name}, plus que {days} jours d\'essai \u26a0\ufe0f',
          reminder: '{name}, votre essai se termine dans {days} jours \ud83d\udcc5',
        },
        titles: {
          lastDay: 'Derni\u00e8re chance !',
          remaining: 'Plus que {days} jours',
        },
        body: "{name}, votre essai gratuit Auditelle se termine dans {days} jours. Ne perdez pas l'acc\u00e8s au d\u00e9tecteur IA le plus pr\u00e9cis du march\u00e9.",
        bodyLastDay: "{name}, votre essai gratuit Auditelle se termine aujourd'hui. Ne perdez pas l'acc\u00e8s au d\u00e9tecteur IA le plus pr\u00e9cis du march\u00e9.",
        countdown: {
          today: "AUJOURD'HUI",
          days: '{days} JOURS',
        },
        beforeEnd: 'avant la fin de votre essai',
        keepTitle: '\ud83c\udfaf Ce que vous gardez avec Pro :',
        keepFeatures: [
          '1,000 analyses/mois',
          'Historique complet',
          'Acc\u00e8s API',
          'Export PDF/CSV',
          'Support prioritaire',
        ],
        ctaButton: 'Passer \u00e0 Pro \u2014 25\u20ac/mois \u2192',
        question: 'Des questions ? R\u00e9pondez simplement \u00e0 cet email.',
      },

      trialEnded: {
        subject: "{name}, votre essai est termin\u00e9 \u2014 mais il n'est pas trop tard ! \ud83d\udd13",
        title: 'Vous nous manquez, {name} ! \ud83d\udc4b',
        body: "Votre essai gratuit Auditelle est termin\u00e9. Mais ne vous inqui\u00e9tez pas \u2014 votre compte et votre historique sont toujours l\u00e0, et vous attendent.",
        offerTitle: '\ud83c\udf81 Offre sp\u00e9ciale :',
        offerBody: 'Passez \u00e0 Pro dans les prochaines 48 heures et b\u00e9n\u00e9ficiez de 50% de r\u00e9duction sur votre premier mois.',
        ctaButton: 'Profiter de -50% \u2192',
        question: 'Ou r\u00e9pondez \u00e0 cet email si vous avez des questions.',
      },
    },

    // API error messages
    errors: {
      unauthorized: 'Non autoris\u00e9',
      dailyLimitReached: "Limite quotidienne atteinte. Passez au plan sup\u00e9rieur pour plus d'analyses.",
      rateLimitRetry: 'Limite atteinte. R\u00e9essayez dans un instant.',
      textTooShort: 'Le texte doit contenir au moins 50 caract\u00e8res.',
      textTooLong: 'Le texte ne doit pas d\u00e9passer 50 000 caract\u00e8res.',
      invalidPlan: 'Plan invalide ou non configur\u00e9',
      internalError: 'Erreur interne',
      paymentError: 'Erreur de paiement',
      billingError: 'Erreur de facturation',
      noSubscription: 'Aucun abonnement trouv\u00e9',
      userNotFound: 'Utilisateur non trouv\u00e9',
      serviceUnavailable: 'Service temporairement indisponible',
      demoLimitReached: "Limite atteinte. Cr\u00e9ez un compte gratuit pour plus d'analyses.",
      demoTextTooLong: 'Le texte ne doit pas d\u00e9passer 5000 caract\u00e8res pour le test gratuit.',
      analysisError: "Erreur lors de l'analyse",
      emailAlreadySent: 'Email d\u00e9j\u00e0 envoy\u00e9',
    },

    // Plan details for emails
    planDetails: {
      pro: {
        name: 'Professionnel',
        features: ['1,000 analyses/mois', 'API access', 'Export PDF/CSV', 'Support email', 'Historique 30 jours'],
      },
      starter: {
        name: 'Starter',
        features: ['1,000 analyses/mois', 'Int\u00e9grations LMS', 'Export PDF/CSV', 'Support email', 'Historique 30 jours'],
      },
      university: {
        name: 'Universit\u00e9',
        features: ['10,000 analyses/mois', 'API illimit\u00e9e', 'Int\u00e9gration LMS', 'Dashboard admin', 'Support prioritaire'],
      },
      enterprise: {
        name: 'Enterprise',
        features: ['Analyses illimit\u00e9es', 'White-label API', 'Account manager', 'SLA 99.9%', 'Custom features'],
      },
    },
  },
}

export default config
