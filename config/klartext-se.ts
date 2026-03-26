import type { ResellerConfig } from './types'

const config: ResellerConfig = {
  id: 'klartext-se',

  // ── Branding ──────────────────────────────────────────────────────────────
  name: 'TextVakt',
  domain: 'textvakt.com',
  logoColor: '/brands/klartext-se/logo-color.svg',
  logoWhite: '/brands/klartext-se/logo-white.svg',
  logoHeight: '3.5rem',

  // ── Theme ───────────────────────────────────────────────────────────────
  theme: {
    accent: '#FFCC00',           // Swedish gold
    accentHover: '#E6B800',      // darker gold on hover
    accentLight: '#FFF8E1',      // warm gold tint
    navy: '#003366',             // Swedish navy blue
    navyLight: '#0A4080',        // lighter navy
    heroGradient: 'linear-gradient(180deg, #FFF8E1 0%, #FFFDF5 50%, #ffffff 100%)',
  },

  // ── Locale ────────────────────────────────────────────────────────────────
  locale: 'sv_SE',
  htmlLang: 'sv',
  currency: 'SEK',
  currencySymbol: 'kr',
  timezone: 'Europe/Stockholm',

  // ── Legal ─────────────────────────────────────────────────────────────────
  legalEntity: 'TextVakt AB',
  registrationNumber: '',
  registrationLabel: 'Org.nr',
  country: 'Sverige',
  city: 'Stockholm',
  dataProtectionLabel: 'GDPR',

  // ── Contact ───────────────────────────────────────────────────────────────
  supportEmail: 'hej@textvakt.com',
  noReplyEmail: 'noreply@textvakt.com',

  // ── Pricing ───────────────────────────────────────────────────────────────
  plans: {
    homepage: [
      {
        name: 'Gratis',
        price: '0 kr',
        description: 'Upptäck precisionen',
        features: [
          '10 analyser per månad',
          '1 användare',
          'AI-poäng med 99,9 % precision',
          'Modellidentifiering',
          'Historik i 7 dagar',
        ],
        cta: 'Kom igång',
        href: '/signup',
      },
      {
        name: 'Pro',
        price: '249 kr',
        period: 'mån',
        description: 'För lärare och konsulter',
        features: [
          '1 000 analyser per månad',
          '1 användare',
          'API (500 anrop)',
          'Exportera PDF/CSV',
          'E-postsupport',
        ],
        cta: 'Välj Pro',
        href: '/signup?plan=pro',
        popular: true,
        popularBadge: 'POPULÄR',
      },
      {
        name: 'Universitet',
        price: '1 290 kr',
        period: 'mån',
        description: 'För lärosäten och institutioner',
        features: [
          '10 000 analyser per månad',
          'Upp till 20 lärare',
          'Obegränsat API',
          'LMS-integration',
          'Administratörspanel',
        ],
        cta: 'Välj Universitet',
        href: '/signup?plan=university',
      },
      {
        name: 'Företag',
        price: '4 290 kr',
        period: 'mån',
        description: 'För stora organisationer',
        features: [
          '50 000 analyser per månad',
          'Alla användare',
          'White-label API',
          'Dedikerad kontaktperson',
          'SLA 99,9 %',
        ],
        cta: 'Kontakta oss',
        href: '/contact',
      },
    ],
    upgrade: [
      {
        id: 'student',
        name: 'Student',
        price: '99 kr',
        period: '/mån',
        description: 'För studenter och doktorander',
        features: [
          '200 analyser per månad',
          '99,9 % detektionsprecision',
          'Exportera PDF',
          'Historik i 7 dagar',
        ],
        badge: '🎓',
      },
      {
        id: 'starter',
        name: 'Starter',
        price: '399 kr',
        period: '/mån',
        description: 'För lärare och konsulter',
        features: [
          '1 000 analyser per månad',
          'LMS-integrationer (Moodle)',
          'Exportera PDF/CSV',
          'E-postsupport',
          'Historik i 30 dagar',
        ],
        popular: true,
      },
      {
        id: 'university',
        name: 'Universitet',
        price: '2 990 kr',
        period: '/mån',
        description: 'För utbildningsinstitutioner',
        features: [
          '10 000 analyser per månad',
          'Flera användare',
          'Obegränsat API',
          'Administratörspanel',
          'Prioriterad support',
          'Anpassade rapporter',
        ],
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: '7 990 kr',
        period: '/mån',
        description: 'För stora organisationer',
        features: [
          '50 000 analyser per månad',
          'Dedikerat API',
          'Dedikerad kontaktperson',
          'SLA 99,9 %',
          'Skräddarsydda funktioner',
          'Anpassad fakturering',
        ],
      },
    ],
  },

  // ── Feature flags ─────────────────────────────────────────────────────────
  features: {
    fileUpload: true,
    apiAccess: true,
    teamManagement: true,
    demoPage: true,
    heroDemo: true,
    plagiarismDetection: true,
  },

  // ── SEO ───────────────────────────────────────────────────────────────────
  seo: {
    title: 'TextVakt — Upptäck AI-genererat innehåll med 99,9 % precision',
    description: 'Upptäck AI-genererat innehåll med 99,9 % precision. ChatGPT, Claude, Gemini och fler. Tredjepartsverifierad, nästan inga falska positiva resultat.',
    keywords: ['AI-detektion', 'ChatGPT-detektor', 'AI-plagiatkontroll', 'akademisk integritet', 'TextVakt', 'AI-detektor Sverige'],
    ogTitle: 'TextVakt — Upptäck AI-genererat innehåll med 99,9 % precision',
    ogDescription: 'Upptäck AI-innehåll med 99,9 % precision. Tredjepartsverifierade resultat.',
  },

  // ── Redirects ─────────────────────────────────────────────────────────────
  redirects: [
    { source: '/testa-gratis', destination: '/signup', permanent: false },
    { source: '/demo', destination: '/demo-video', permanent: false },
  ],

  // ── UI Strings ────────────────────────────────────────────────────────────
  strings: {
    // Navbar
    nav: {
      features: 'Funktioner',
      pricing: 'Priser',
      dashboard: 'Kontrollpanel',
      login: 'Logga in',
      freeTrial: 'Testa gratis',
    },

    // Hero
    hero: {
      badge: '99,9 % verifierad precision',
      title: 'AI-detektorn som ',
      titleAccent: 'verkligen fungerar',
      subtitle: 'Upptäck ChatGPT, Claude, Gemini och fler med oöverträffad precision. Verifierad av University of Maryland. Nästan inga falska positiva resultat.',
      trustBadges: [
        'Avancerad AI-detektion',
        'Tredjepartsverifierad',
        'Gratis att testa',
      ],
      ctaPrimary: 'Testa gratis →',
      ctaSecondary: 'Så fungerar det',
    },

    // Trust bar
    trustBar: {
      label: 'Erkänd av experterna',
      names: ['University of Maryland', 'Chicago Booth', 'Stony Brook University', 'SOC2 Type 2'],
    },

    // Features
    features: {
      title: 'Avancerad detektionsteknik',
      subtitle: '99,9 % precision där andra misslyckas. Utvecklad av forskare från Stanford, Tesla och Google.',
      items: [
        {
          icon: 'Brain',
          title: 'AI-sannolikhetspoäng',
          description: 'Skicka in ditt innehåll och få en exakt poäng som visar om texten är skriven av människa eller genererad av AI.',
        },
        {
          icon: 'FileSearch',
          title: 'Modellidentifiering',
          description: 'Identifiera vilken modell som användes: ChatGPT, Claude, Gemini, Llama, Perplexity med flera.',
        },
        {
          icon: 'BarChart3',
          title: 'Sektionsanalys',
          description: 'Förstå om hela texten är AI, mänsklig eller en blandning — sektion för sektion.',
        },
        {
          icon: 'Shield',
          title: 'Plagiatkontroll',
          description: 'Sökning bland miljarder webbsidor, böcker och artiklar för att upptäcka plagiat utöver AI.',
        },
        {
          icon: 'Zap',
          title: 'Nästan inga falska positiva',
          description: 'Oberoende verifierad att ha marknadens lägsta andel falska positiva resultat. 100 % tillförlitlig.',
        },
        {
          icon: 'Globe',
          title: 'Flerspråkig',
          description: 'Exakt detektion på flera språk, inklusive svenska, engelska, tyska och norska.',
        },
      ],
    },

    // How it works
    howItWorks: {
      title: 'Enkelt som 1, 2, 3',
      steps: [
        { title: 'Klistra in din text', description: 'Kopiera och klistra in innehållet du vill analysera i vårt intuitiva gränssnitt.' },
        { title: 'Starta analysen', description: 'Vår AI-motor analyserar varje mening på några sekunder.' },
        { title: 'Läs rapporten', description: 'Få en detaljerad poäng med modellidentifiering och sektionsanalys.' },
      ],
    },

    // Testimonials
    testimonials: {
      title: 'Vad experterna säger',
      items: [
        {
          quote: 'Bland automatiserade detektorer överträffar detta system alla andra med bred marginal.',
          author: 'Jenna Russell',
          role: 'University of Maryland',
        },
        {
          quote: 'En nästan övernaturligt bra detektor. Jag har ännu inte sett ett enda falskt positivt eller negativt.',
          author: 'Ryan Nicolace',
          role: 'Cloud Architect',
        },
        {
          quote: 'Mina elever är så övertygade om precisionen att det har blivit det bästa avskräckningsmedlet.',
          author: 'Jarred Phillips',
          role: 'New Roads School',
        },
      ],
    },

    // Competitor comparison
    comparison: {
      title: 'Varför välja TextVakt?',
      subtitle: 'Jämför de ledande AI-detektionslösningarna',
      competitors: ['TextVakt', 'GPTZero', 'Turnitin AI', 'Originality.ai'],
      rows: [
        { label: 'Precision', values: ['99,9 %', '~85 %', '~80 %', '~94 %'] },
        { label: 'Falska positiva', values: ['Nästan noll', 'Hög', 'Måttlig', 'Måttlig'] },
        { label: 'Stöd för svenska', values: [true, false, false, false] },
        { label: 'Pris (från)', values: ['Gratis', '$9.99/mån', 'På förfrågan', '$14.95/mån'] },
        { label: 'Sektionsanalys', values: [true, false, false, true] },
        { label: 'Modellidentifiering', values: [true, true, false, false] },
      ],
    },

    // Pricing (homepage section)
    pricing: {
      title: 'Transparenta och konkurrenskraftiga priser',
      subtitle: 'Pangram Labs-teknik. Support på svenska. Börja gratis, skala efter behov.',
      footer: 'Pangram-teknik • 99,9 % precision • GDPR-kompatibel • Support på svenska',
    },

    // CTA section
    cta: {
      title: 'Redo att upptäcka AI-innehåll?',
      subtitle: 'Gå med tusentals yrkesverksamma som litar på TextVakt för att skydda integriteten i sitt innehåll.',
      button: 'Skapa gratis konto →',
    },

    // Footer
    footer: {
      description: 'Den svenska lösningen för detektion av AI-genererad text. Oöverträffad precision, GDPR-kompatibel.',
      productLabel: 'Produkt',
      companyLabel: 'Företag',
      contactLabel: 'Kontakt',
      copyright: 'Alla rättigheter förbehållna.',
      poweredBy: 'Detektion driven av',
      poweredByName: 'Pangram Labs',
    },

    // Auth
    auth: {
      login: 'Logga in',
      signup: 'Skapa konto',
      resetPassword: 'Återställ lösenord',
      loginSubtitle: 'Gå till din AI-detektionspanel',
      loginSubtitlePlan: 'Logga in för att aktivera planen {plan}',
      signupSubtitle: 'Börja upptäcka AI-innehåll gratis',
      signupSubtitlePlan: 'Skapa ditt konto för att aktivera planen {plan}',
      resetSubtitle: 'Ange din e-post för att få en återställningslänk',
      fullName: 'Fullständigt namn',
      email: 'E-post',
      password: 'Lösenord',
      emailPlaceholder: 'din@epost.se',
      namePlaceholder: 'Anna Andersson',
      forgotPassword: 'Glömt lösenordet?',
      noAccount: 'Har du inget konto?',
      hasAccount: 'Har du redan ett konto?',
      backToLogin: 'Tillbaka till inloggningen',
      loading: 'Laddar...',
      accountCreatedRedirect: 'Konto skapat! Omdirigerar till betalning...',
      checkEmail: 'Kolla din e-post för att bekräfta din registrering.',
      resetEmailSent: 'En återställningslänk har skickats till din e-postadress.',
      googleSignIn: 'Fortsätt med Google',
      orDivider: 'eller',
    },

    // Dashboard
    dashboard: {
      detection: 'Detektion',
      history: 'Historik',
      account: 'Konto',
      signOut: 'Logga ut',
      analyzerTitle: 'AI-innehållsanalysator',
      analyzerSubtitle: 'Klistra in din text för att upptäcka AI-genererat innehåll',
      textareaPlaceholder: 'Klistra in texten du vill analysera här (minst 50 tecken)...',
      characters: 'tecken',
      analyze: 'Analysera',
      analyzing: 'Analyserar...',
      scansRemaining: 'analyser kvar',
      subscriptionActivated: 'Prenumeration aktiverad!',
      subscriptionActivatedDetail: 'Dina extra analyser är nu tillgängliga.',
      minCharsError: 'Ange minst 50 tecken för en tillförlitlig analys.',

      // Onboarding
      onboardingTitle: 'Välkommen till TextVakt! 👋',
      onboardingBody: 'Klistra in valfri text nedan för att kontrollera om den är AI-genererad — eller testa med ett exempel.',
      onboardingCta: 'Testa med ett exempel →',
      onboardingDismiss: 'Stäng',

      // Limit reached upgrade CTA
      limitUpgradeCta: 'Uppgradera till Pro — 99 kr första månaden →',
      limitUpgradePromo: 'Använd kod VÄLKOMMEN50 — 50 % rabatt första månaden',

      // History
      historyTitle: 'Analyshistorik',
      historyEmpty: 'Inga analyser ännu.',
      historyEmptyHint: 'Gör din första analys från kontrollpanelen.',
      historyLoading: 'Laddar…',
      historyModel: 'Modell',

      // Account
      accountTitle: 'Kontoinställningar',
      profileLabel: 'Profil',
      nameLabel: 'Namn',
      emailLabel: 'E-post',
      subscriptionLabel: 'Prenumeration',
      plan: 'Plan',
      upgradeToPro: 'Uppgradera till Pro',
      manageSubscription: 'Hantera prenumeration',
      managingSubscription: 'Laddar...',
      scansPerDay: {
        free: '5 analyser per dag',
        pro: '100 analyser per dag',
        default: 'Obegränsade analyser',
      },

      // Upgrade
      upgradeTitle: 'Välj din plan',
      upgradeSubtitle: 'Alla planer inkluderar AI-detektion med 99,9 % precision.',
      upgradeBack: 'Tillbaka till kontot',
      upgradePopular: 'POPULÄR',
      upgradeFooter: 'Alla planer faktureras månadsvis. Avsluta när som helst. Säker betalning via Stripe.',
      upgradeLoading: 'Laddar...',
      upgradeContact: 'Kontakta oss',
      upgradeChoose: 'Välj {plan}',
      upgradeError: 'Betalningsfel. Försök igen.',
    },

    // Detection results
    results: {
      probablyHuman: 'Troligen människa',
      mixed: 'Blandat / Osäkert',
      probablyAI: 'Troligen AI',
      aiScore: 'AI-poäng',
      aiProbability: 'Sannolikhet för AI-genererat innehåll: {score} %',
      classification: 'Klassificering',
      sectionAnalysis: 'Sektionsanalys',
      aiPercent: '{score} % AI',
      breakdown: 'Textfördelning',
      aiGenerated: 'Rent AI',
      aiAssisted: 'AI-assisterad',
      humanWritten: 'Mänsklig',
      viewReport: 'Visa detaljerad rapport',
    },

    // Hero demo
    heroDemo: {
      testNow: 'Testa nu',
      free: 'Gratis',
      placeholder: 'Klistra in din text här för en omedelbar analys... (min. 50 tecken)',
      tryLabel: 'Prova:',
      humanButton: 'Mänsklig',
      chatgptButton: 'ChatGPT',
      humanSample: 'Jag älskar att utforska nya platser. Varje resa ger mig unika minnen och nya perspektiv på världen.',
      chatgptSample: 'Artificiell intelligens utgör ett betydande teknologiskt framsteg som omvandlar olika sektorer i vårt moderna samhälle.',
      analyzingLabel: 'Analyserar...',
      analyzingDetail: 'Upptäcker AI-mönster med Pangram',
      scanner: '🔍 Analysera',
      createAccountFull: 'Skapa ett konto för fullständig analys',
      veryLikelyAI: 'Mycket troligen AI',
      possiblyAI: 'Möjligen AI',
      probablyHuman: 'Troligen människa',
      connectionError: 'Anslutningsfel',
      ctaButton: 'Skapa gratis konto →',
      ctaTeaser: 'Lås upp sektionsanalys, modellidentifiering och mer',
      unlockLabel: 'Skapa ett konto för att låsa upp fullständig analys',
      scansRemaining: '{count} gratis analyser kvar idag',
      pendingBanner: 'Din text har sparats och analyseras direkt efter att du skapat ditt konto.',
      signupToAnalyze: 'Skapa ett gratis konto för att analysera din text',
    },

    // Plagiarism detection
    plagiarism: {
      modeAI: 'AI-detektion',
      modePlagiarism: 'Plagiatkontroll',
      noPlagiarism: 'Inget plagiat upptäckt',
      plagiarismFound: 'Plagiat upptäckt',
      percentPlagiarized: '{score} % plagiat upptäckt',
      sourcesFound: '{count} källa/källor hittade',
      sourceLabel: 'Källa',
      matchedText: 'Matchande text',
      similarity: 'Likhet',
      analyzePlagiarism: 'Kontrollera plagiat',
      originalSample: 'Fotosyntesen är en grundläggande biologisk process där växter omvandlar solljus till kemisk energi och producerar syre som en viktig biprodukt för livet på jorden.',
      copiedSample: 'Fotosyntesen är den bioenergetiska process som gör det möjligt för klorofyllbärande organismer att syntetisera organiskt material med hjälp av ljusenergi genom att reducera koldioxid med vatten.',
      originalButton: 'Original',
      copiedButton: 'Kopierad text',
    },

    // Cookie consent
    cookieConsent: {
      message: 'Denna webbplats använder cookies för att mäta annonsresultat och förbättra din upplevelse. Inga personuppgifter säljs.',
      accept: 'Acceptera',
      decline: 'Avvisa',
    },

    // File upload
    fileUpload: {
      dropOrBrowse: 'Dra en fil eller',
      browse: 'bläddra',
      formats: 'PDF, DOCX, TXT — max 10 MB',
      extracting: 'Extraherar…',
      unsupported: 'Format stöds ej. Använd PDF, DOCX eller TXT.',
      tooLarge: 'Filen är för stor (max 10 MB).',
      extractError: 'Kunde inte extrahera texten. Kontrollera att filen inte är skyddad.',
    },

    // Contact page
    contact: {
      title: 'Kontakta oss',
      subtitle: 'En fråga? Ett integrationsprojekt? Vårt team svarar inom 24 timmar.',
      emailLabel: 'E-post',
      companyName: 'TextVakt AB',
      institutionCta: 'Universitet och institutioner',
      institutionDescription: 'Vill du integrera TextVakt i din institution? Kontakta oss för en skräddarsydd offert och demonstration.',
      formFullName: 'Fullständigt namn *',
      formEmail: 'E-post *',
      formOrganization: 'Organisation',
      formSubject: 'Ämne *',
      formMessage: 'Meddelande *',
      formSubmit: 'Skicka meddelande',
      formSending: 'Skickar...',
      formSuccess: 'Tack för ditt meddelande!',
      formSuccessDetail: 'Vi återkommer så snart som möjligt.',
      namePlaceholder: 'Anna Andersson',
      emailPlaceholder: 'anna.andersson@universitet.se',
      orgPlaceholder: 'Stockholms universitet',
      messagePlaceholder: 'Beskriv ditt behov...',
      selectSubject: 'Välj ett ämne',
      subjectOptions: [
        { value: 'Demonstration', label: 'Begär demonstration' },
        { value: 'Offert', label: 'Offert universitet / institution' },
        { value: 'LMS', label: 'LMS-integration' },
        { value: 'Support', label: 'Teknisk support' },
        { value: 'Samarbete', label: 'Samarbete' },
        { value: 'Övrigt', label: 'Övrigt' },
      ],
    },

    // Demo video page
    demoVideo: {
      title: 'Lär känna TextVakt på 5 minuter',
      subtitle: 'Upptäck hur du identifierar AI-genererat innehåll med 99,9 % precision',
      videoPlaceholder: 'Demovideo',
      videoSoon: 'Kommer snart',
      readyCta: 'Redo att testa?',
      readySubtitle: 'Skapa ditt gratis konto och analysera upp till 10 texter per månad',
      readyButton: 'Börja din gratis provperiod →',
      featureCards: [
        { emoji: '🎯', title: '99,9 % precision', description: 'Validerad av University of Maryland' },
        { emoji: '⚡', title: 'Moodle-integration', description: 'Installation på under 10 minuter' },
        { emoji: '🇸🇪', title: '100 % på svenska', description: 'GDPR, support och fakturering SE' },
      ],
    },

    // Email templates
    emails: {
      headerName: 'TEXTVAKT',
      legalFooter: '',

      welcome: {
        subject: 'Välkommen till TextVakt, {name}! 🎉',
        greeting: 'Välkommen, {name}! 👋',
        intro: 'Tack för att du skapade ditt konto på TextVakt. Nu har du tillgång till marknadens mest precisa AI-detektor, verifierad av University of Maryland.',
        trialTitle: '🎁 Din gratis provperiod inkluderar:',
        trialFeatures: [
          '10 analyser per månad',
          '99,9 % precision',
          'AI-modellidentifiering',
          'Historik i 7 dagar',
        ],
        ctaButton: 'Starta min första analys →',
        question: 'Har du frågor? Svara direkt på detta mejl.',
        ctaUrl: '/dashboard',
      },

      subscriptionConfirmed: {
        subject: 'Din prenumeration {plan} är aktiv! 🚀',
        greeting: 'Tack, {name}!',
        active: 'Din prenumeration {plan} är nu aktiv.',
        planTitle: '✅ Din plan inkluderar:',
        ctaButton: 'Gå till min kontrollpanel →',
        manageHint: 'Hantera din prenumeration i kontoinställningarna.',
      },

      upgradeReminder: {
        subject: '{name}, du har använt {percent} % av dina analyser 📊',
        title: 'Du använder TextVakt flitigt! 🎯',
        body: '{name}, du har redan använt {percent} % av dina gratis analyser den här månaden.',
        upgradeTitle: '🚀 Uppgradera till Pro för att:',
        upgradeFeatures: [
          '1 000 analyser/mån (istället för 10)',
          'API-åtkomst',
          'Exportera PDF/CSV',
          'Prioriterad support',
        ],
        upgradePrice: 'Bara 249 kr/mån',
        ctaButton: 'Uppgradera till Pro →',
      },

      trialExpiring: {
        subjects: {
          lastDay: '{name}, din provperiod upphör idag! ⏰',
          urgent: '{name}, {days} dagar kvar av provperioden ⚠️',
          reminder: '{name}, din provperiod upphör om {days} dagar 📅',
        },
        titles: {
          lastDay: 'Sista chansen!',
          remaining: '{days} dagar kvar',
        },
        body: '{name}, din gratis provperiod på TextVakt upphör om {days} dagar. Missa inte tillgången till marknadens mest precisa AI-detektor.',
        bodyLastDay: '{name}, din gratis provperiod på TextVakt upphör idag. Missa inte tillgången till marknadens mest precisa AI-detektor.',
        countdown: {
          today: 'IDAG',
          days: '{days} DAGAR',
        },
        beforeEnd: 'innan din provperiod tar slut',
        keepTitle: '🎯 Det du behåller med Pro:',
        keepFeatures: [
          '1 000 analyser/mån',
          'Fullständig historik',
          'API-åtkomst',
          'Exportera PDF/CSV',
          'Prioriterad support',
        ],
        ctaButton: 'Prenumerera på Pro — 249 kr/mån →',
        question: 'Har du frågor? Svara bara på detta mejl.',
      },

      trialEnded: {
        subject: '{name}, din provperiod har avslutats — men det är inte för sent! 🔓',
        title: 'Vi saknar dig, {name}! 👋',
        body: 'Din gratis provperiod på TextVakt har avslutats. Men oroa dig inte — ditt konto och din historik finns kvar och väntar på dig.',
        offerTitle: '🎁 Specialerbjudande:',
        offerBody: 'Uppgradera till Pro inom 48 timmar och få 50 % rabatt på din första månad.',
        ctaButton: 'Utnyttja -50 % →',
        question: 'Eller svara på detta mejl om du har frågor.',
      },
    },

    // API error messages
    errors: {
      unauthorized: 'Ej behörig',
      dailyLimitReached: 'Daglig gräns nådd. Uppgradera till en högre plan för fler analyser.',
      rateLimitRetry: 'Gräns nådd. Försök igen om en stund.',
      textTooShort: 'Texten måste innehålla minst 50 tecken.',
      textTooLong: 'Texten får inte överstiga 50 000 tecken.',
      invalidPlan: 'Ogiltig eller ej konfigurerad plan',
      internalError: 'Internt fel',
      paymentError: 'Betalningsfel',
      billingError: 'Faktureringsfel',
      noSubscription: 'Ingen prenumeration hittad',
      userNotFound: 'Användare hittades ej',
      serviceUnavailable: 'Tjänsten är tillfälligt otillgänglig',
      demoLimitReached: 'Gräns nådd. Skapa ett gratis konto för fler analyser.',
      demoTextTooLong: 'Texten får inte överstiga 5 000 tecken för den gratis provperioden.',
      analysisError: 'Fel under analysen',
      emailAlreadySent: 'E-post redan skickad',
    },

    // Plan details for emails
    planDetails: {
      pro: {
        name: 'Professionell',
        features: ['1 000 analyser/mån', 'API-åtkomst', 'Exportera PDF/CSV', 'E-postsupport', 'Historik i 30 dagar'],
      },
      starter: {
        name: 'Starter',
        features: ['1 000 analyser/mån', 'LMS-integrationer', 'Exportera PDF/CSV', 'E-postsupport', 'Historik i 30 dagar'],
      },
      university: {
        name: 'Universitet',
        features: ['10 000 analyser/mån', 'Obegränsat API', 'LMS-integration', 'Administratörspanel', 'Prioriterad support'],
      },
      enterprise: {
        name: 'Enterprise',
        features: ['50 000 analyser/mån', 'White-label API', 'Dedikerad kontaktperson', 'SLA 99,9 %', 'Skräddarsydda funktioner'],
      },
    },
  },
}

export default config
