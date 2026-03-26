import type { ResellerConfig } from './types'

const config: ResellerConfig = {
  id: 'novalearn-uk',

  // ── Branding ──────────────────────────────────────────────────────────────
  name: 'NovaLearn',
  domain: 'novalearn.co.uk',
  logoColor: '/brands/novalearn-uk/logo-color.svg',
  logoWhite: '/brands/novalearn-uk/logo-white.svg',

  // ── Theme ───────────────────────────────────────────────────────────────
  theme: {
    accent: '#e85d04',
    accentHover: '#dc2f02',
    accentLight: '#fff4e6',
    navy: '#1a1a2e',
    navyLight: '#16213e',
    heroGradient: 'linear-gradient(180deg, #fef3c7 0%, #fef9ef 50%, #ffffff 100%)',
  },

  // ── Locale ────────────────────────────────────────────────────────────────
  locale: 'en_GB',
  htmlLang: 'en',
  currency: 'GBP',
  currencySymbol: '\u00a3',
  timezone: 'Europe/London',

  // ── Legal ─────────────────────────────────────────────────────────────────
  legalEntity: 'NovaLearn Ltd',
  registrationNumber: '',
  registrationLabel: 'Company No.',
  country: 'United Kingdom',
  city: 'London',
  dataProtectionLabel: 'GDPR',

  // ── Contact ───────────────────────────────────────────────────────────────
  supportEmail: 'hello@novalearn.co.uk',
  noReplyEmail: 'noreply@novalearn.co.uk',

  // ── Pricing ───────────────────────────────────────────────────────────────
  plans: {
    homepage: [
      {
        name: 'Free Trial',
        price: '\u00a30',
        description: 'Discover the precision',
        features: [
          '3 analyses per month',
          '1 user',
          '99.9% accurate AI score',
          'Model identification',
          '7-day history',
        ],
        cta: 'Get Started',
        href: '/signup',
      },
      {
        name: 'Professional',
        price: '\u00a321',
        period: 'month',
        description: 'For teachers and consultants',
        features: [
          '1,000 analyses per month',
          '1 user',
          'API access (500 calls)',
          'PDF/CSV export',
          'Email support',
          '30-day history',
        ],
        cta: 'Choose Pro',
        href: '/signup?plan=pro',
        popular: true,
        popularBadge: 'POPULAR',
      },
      {
        name: 'University',
        price: '\u00a3129',
        period: 'month',
        description: 'For educational institutions',
        features: [
          '10,000 analyses per month',
          'Unlimited API',
          'LMS integration (Canvas, Moodle, Blackboard, Brightspace)',
          'Admin dashboard',
          'Priority support',
        ],
        cta: 'Contact Us',
        href: 'mailto:hello@novalearn.co.uk',
      },
      {
        name: 'Enterprise',
        price: '\u00a3429',
        period: 'month',
        description: 'For national organisations',
        features: [
          'Unlimited analyses',
          'Full LMS integration (all platforms)',
          'White-label API',
          'Dedicated account manager',
          '99.9% SLA',
        ],
        cta: 'Contact Us',
        href: 'mailto:hello@novalearn.co.uk',
      },
    ],
    upgrade: [
      {
        id: 'student',
        name: 'Student',
        price: '\u00a39.99',
        period: '/month',
        description: 'For students and postgraduates',
        features: [
          '200 analyses per month',
          '99.9% detection accuracy',
          'PDF export',
          '7-day history',
        ],
        badge: '\ud83c\udf93',
      },
      {
        id: 'starter',
        name: 'Starter',
        price: '\u00a339',
        period: '/month',
        description: 'For teachers and consultants',
        features: [
          '1,000 analyses per month',
          'LMS integrations (Moodle)',
          'PDF/CSV export',
          'Email support',
          '30-day history',
        ],
        popular: true,
      },
      {
        id: 'university',
        name: 'University',
        price: '\u00a3299',
        period: '/month',
        description: 'For educational institutions',
        features: [
          '10,000 analyses per month',
          'Multi-user',
          'Unlimited API',
          'Admin dashboard',
          'Priority support',
          'Custom reports',
        ],
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: '\u00a3799',
        period: '/month',
        description: 'For large organisations',
        features: [
          '50,000 analyses per month',
          'Dedicated API',
          'Dedicated account manager',
          '99.9% SLA',
          'Custom features',
          'Custom billing',
        ],
      },
    ],
  },

  // ── Analytics ─────────────────────────────────────────────────────────────
  googleAdsId: 'AW-17964304856',
  googleAdsConversionLabel: 'AW-17964304856/vg20CL_2yfsbENiThvZC',
  googleAdsSignupConversionLabel: 'AW-17964304856/vg20CL_2yfsbENiThvZC',

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
    title: 'NovaLearn \u2014 The Most Accurate AI Detector on the Market',
    description: 'Detect AI-generated content with 99.9% accuracy. ChatGPT, Claude, Gemini and more. Third-party verified, near-zero false positive rate. UK-based support.',
    keywords: ['AI detection', 'ChatGPT detector', 'AI plagiarism detection', 'academic integrity', 'NovaLearn', 'UK AI detector'],
    ogTitle: 'NovaLearn \u2014 The Most Accurate AI Detector on the Market',
    ogDescription: 'Detect AI content with 99.9% accuracy. Third-party verified results. UK-based support.',
  },

  // ── Redirects ─────────────────────────────────────────────────────────────
  redirects: [
    { source: '/free-trial', destination: '/signup', permanent: false },
    { source: '/demo', destination: '/demo-video', permanent: false },
  ],

  // ── UI Strings ────────────────────────────────────────────────────────────
  strings: {
    // Navbar
    nav: {
      features: 'Features',
      pricing: 'Pricing',
      dashboard: 'Dashboard',
      login: 'Sign in',
      freeTrial: 'Free trial',
    },

    // Hero
    hero: {
      badge: '99.9% verified accuracy',
      title: 'The AI detector that ',
      titleAccent: 'actually works',
      subtitle: 'Detect ChatGPT, Claude, Gemini and more with unmatched accuracy. Verified by the University of Maryland. Near-zero false positive rate.',
      trustBadges: [
        'Advanced AI Detection',
        'Third-party Verified',
        'Free Trial',
      ],
      ctaPrimary: 'Try for Free \u2192',
      ctaSecondary: 'How it Works',
    },

    // Trust bar
    trustBar: {
      label: 'Trusted by Leading Institutions',
      names: ['University of Maryland', 'Chicago Booth', 'Stony Brook University', 'SOC2 Type 2'],
    },

    // Features
    features: {
      title: 'Advanced Detection Technology',
      subtitle: '99.9% accuracy where others fail. Developed by researchers from Stanford, Tesla and Google.',
      items: [
        {
          icon: 'Brain',
          title: 'AI Probability Score',
          description: 'Submit your content and get a precise score indicating whether the text is human-written or AI-generated.',
        },
        {
          icon: 'FileSearch',
          title: 'Model Identification',
          description: 'Detect which model was used: ChatGPT, Claude, Gemini, Llama, Perplexity and many more.',
        },
        {
          icon: 'BarChart3',
          title: 'Section Analysis',
          description: 'Understand if the entire text is AI, human, or a combination of both, section by section.',
        },
        {
          icon: 'Shield',
          title: 'Plagiarism Detection',
          description: 'Search across billions of web pages, books and articles to detect plagiarism alongside AI.',
        },
        {
          icon: 'Zap',
          title: 'Near-zero False Positives',
          description: 'Independently verified for the lowest false positive rate on the market. 100% reliable.',
        },
        {
          icon: 'Globe',
          title: 'Multilingual',
          description: 'Accurate detection in multiple languages, including English, French, Spanish and German.',
        },
      ],
    },

    // How it works
    howItWorks: {
      title: 'Simple as 1, 2, 3',
      steps: [
        { title: 'Paste your text', description: 'Copy and paste the content to analyse into our intuitive interface.' },
        { title: 'Run the analysis', description: 'Our AI engine analyses every sentence in seconds.' },
        { title: 'View the report', description: 'Get a detailed score with model identification and section-by-section analysis.' },
      ],
    },

    // Testimonials
    testimonials: {
      title: 'What Experts Say',
      items: [
        {
          quote: 'Among automatic detectors, this system significantly outperforms all others.',
          author: 'Jenna Russell',
          role: 'University of Maryland',
        },
        {
          quote: "An almost supernaturally good detector. I haven't seen any false positives or negatives yet.",
          author: 'Ryan Nicolace',
          role: 'Cloud Architect',
        },
        {
          quote: 'My students are so convinced of its accuracy that it has become the best deterrent.',
          author: 'Jarred Phillips',
          role: 'New Roads School',
        },
      ],
    },

    // Competitor comparison
    comparison: {
      title: 'Why Choose NovaLearn?',
      subtitle: 'Compare the leading AI detection solutions',
      competitors: ['NovaLearn', 'GPTZero', 'Turnitin AI', 'Originality.ai'],
      rows: [
        { label: 'Accuracy', values: ['99.9%', '~85%', '~80%', '~94%'] },
        { label: 'False positive rate', values: ['Near-zero', 'High', 'Moderate', 'Moderate'] },
        { label: 'UK support', values: [true, false, false, false] },
        { label: 'Starting price', values: ['Free', '$9.99/mo', 'On request', '$14.95/mo'] },
        { label: 'Section analysis', values: [true, false, false, true] },
        { label: 'Model identification', values: [true, true, false, false] },
      ],
    },

    // Pricing (homepage section)
    pricing: {
      title: 'Transparent & Competitive Pricing',
      subtitle: 'Pangram Labs technology. UK-based support. Start free, scale as you grow.',
      footer: 'Pangram Technology \u2022 99.9% Accuracy \u2022 GDPR Compliant \u2022 UK Support',
    },

    // CTA section
    cta: {
      title: 'Ready to detect AI content?',
      subtitle: 'Join education professionals who trust NovaLearn to protect the integrity of their content.',
      button: 'Create Free Account \u2192',
    },

    // Footer
    footer: {
      description: 'The UK AI detection solution with unmatched accuracy. Privacy-first, GDPR compliant, UK-based support.',
      productLabel: 'Product',
      companyLabel: 'Company',
      contactLabel: 'Contact',
      copyright: 'All rights reserved.',
      poweredBy: 'Detection powered by',
      poweredByName: 'Pangram Labs',
    },

    // Auth
    auth: {
      login: 'Sign in',
      signup: 'Create account',
      resetPassword: 'Reset password',
      loginSubtitle: 'Access your AI detection dashboard',
      loginSubtitlePlan: 'Sign in to activate the {plan} plan',
      signupSubtitle: 'Start detecting AI content for free',
      signupSubtitlePlan: 'Create your account to activate the {plan} plan',
      resetSubtitle: 'Enter your email to receive a reset link',
      fullName: 'Full name',
      email: 'Email',
      password: 'Password',
      emailPlaceholder: 'you@email.ac.uk',
      namePlaceholder: 'Jane Smith',
      forgotPassword: 'Forgot password?',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      backToLogin: 'Back to sign in',
      loading: 'Loading...',
      accountCreatedRedirect: 'Account created! Redirecting to payment...',
      checkEmail: 'Check your email to confirm your account.',
      resetEmailSent: 'A reset link has been sent to your email address.',
      googleSignIn: 'Continue with Google',
      orDivider: 'or',
    },

    // Dashboard
    dashboard: {
      detection: 'Detection',
      history: 'History',
      account: 'Account',
      signOut: 'Sign out',
      analyzerTitle: 'AI content analyser',
      analyzerSubtitle: 'Paste your text to detect AI-generated content',
      textareaPlaceholder: 'Paste the text to analyse here (minimum 50 characters)...',
      characters: 'characters',
      analyze: 'Analyse',
      analyzing: 'Analysing...',
      scansRemaining: 'analyses remaining',
      subscriptionActivated: 'Subscription activated successfully!',
      subscriptionActivatedDetail: 'Your additional analyses are now available.',
      minCharsError: 'Please enter at least 50 characters for a reliable analysis.',

      // Onboarding
      onboardingTitle: 'Welcome to NovaLearn! 👋',
      onboardingBody: 'Paste any text below to check if it was AI-generated — or try with a sample.',
      onboardingCta: 'Try with a sample →',
      onboardingDismiss: 'Close',

      // Limit reached upgrade CTA
      limitUpgradeCta: 'Upgrade to Pro — £10.50 for first month →',
      limitUpgradePromo: 'Use code WELCOME50 — 50% off first month',

      // History
      historyTitle: 'Analysis history',
      historyEmpty: 'No analyses yet.',
      historyEmptyHint: 'Run your first analysis from the dashboard.',
      historyLoading: 'Loading\u2026',
      historyModel: 'Model',

      // Account
      accountTitle: 'Account settings',
      profileLabel: 'Profile',
      nameLabel: 'Name',
      emailLabel: 'Email',
      subscriptionLabel: 'Subscription',
      plan: 'Plan',
      upgradeToPro: 'Upgrade to Pro',
      manageSubscription: 'Manage subscription',
      managingSubscription: 'Loading...',
      scansPerDay: {
        free: '5 analyses per day',
        pro: '100 analyses per day',
        default: 'Unlimited analyses',
      },

      // Upgrade
      upgradeTitle: 'Choose your plan',
      upgradeSubtitle: 'All plans include 99.9% AI detection accuracy.',
      upgradeBack: 'Back to account',
      upgradePopular: 'POPULAR',
      upgradeFooter: 'All plans billed monthly. Cancel anytime. Secure payment by Stripe.',
      upgradeLoading: 'Loading...',
      upgradeContact: 'Contact us',
      upgradeChoose: 'Choose {plan}',
      upgradeError: 'Payment failed. Please try again.',
    },

    // Detection results
    results: {
      probablyHuman: 'Probably human',
      mixed: 'Mixed / Uncertain',
      probablyAI: 'Probably AI',
      aiScore: 'AI score',
      aiProbability: 'Probability of AI-generated content: {score}%',
      classification: 'Classification',
      sectionAnalysis: 'Section analysis',
      aiPercent: '{score}% AI',
      breakdown: 'Text breakdown',
      aiGenerated: 'Pure AI',
      aiAssisted: 'AI-assisted',
      humanWritten: 'Human',
      viewReport: 'View detailed report',
    },

    // Hero demo
    heroDemo: {
      testNow: 'Try now',
      free: 'Free',
      placeholder: 'Paste your text here for an instant analysis... (min. 50 characters)',
      tryLabel: 'Try:',
      humanButton: 'Human',
      chatgptButton: 'ChatGPT',
      humanSample: 'I love exploring new places. Every trip brings me unique memories and different perspectives on the world around us.',
      chatgptSample: 'Artificial intelligence represents a major technological advancement that is transforming numerous sectors of our modern society.',
      analyzingLabel: 'Analysing...',
      analyzingDetail: 'Detecting AI patterns with Pangram',
      scanner: '\ud83d\udd0d Scan',
      createAccountFull: 'Create an account for full analysis',
      veryLikelyAI: 'Very likely AI',
      possiblyAI: 'Possibly AI',
      probablyHuman: 'Probably human',
      connectionError: 'Connection error',
      ctaButton: 'Create free account \u2192',
      ctaTeaser: 'Unlock section analysis, model identification and more',
      unlockLabel: 'Create an account to unlock full analysis',
      scansRemaining: '{count} free analyses remaining today',
      pendingBanner: 'Your text has been saved and will be checked immediately after you create your account.',
      signupToAnalyze: 'Create a free account to analyse your text',
    },

    // Plagiarism detection
    plagiarism: {
      modeAI: 'AI Detection',
      modePlagiarism: 'Plagiarism detection',
      noPlagiarism: 'No plagiarism detected',
      plagiarismFound: 'Plagiarism detected',
      percentPlagiarized: '{score}% plagiarism detected',
      sourcesFound: '{count} source(s) found',
      sourceLabel: 'Source',
      matchedText: 'Matched text',
      similarity: 'Similarity',
      analyzePlagiarism: 'Check for plagiarism',
      originalSample: 'Photosynthesis is a fundamental biological process by which plants convert sunlight into chemical energy, producing oxygen as a by-product essential to life on Earth.',
      copiedSample: 'Photosynthesis is the bioenergetic process allowing chlorophyll-containing organisms to synthesise organic matter from light energy, reducing carbon dioxide with water to produce carbohydrates and dioxygen.',
      originalButton: 'Original text',
      copiedButton: 'Copied text',
    },

    // Cookie consent
    cookieConsent: {
      message: 'This site uses cookies to measure advertising performance and improve your experience. No personal data is sold.',
      accept: 'Accept',
      decline: 'Decline',
    },

    // File upload
    fileUpload: {
      dropOrBrowse: 'Drop a file or',
      browse: 'browse',
      formats: 'PDF, DOCX, TXT \u2014 max 10 MB',
      extracting: 'Extracting\u2026',
      unsupported: 'Unsupported format. Please use PDF, DOCX or TXT.',
      tooLarge: 'File too large (max 10 MB).',
      extractError: 'Unable to extract text. Please check the file is not password-protected.',
    },

    // Contact page
    contact: {
      title: 'Contact us',
      subtitle: 'A question? An integration project? Our team responds within 24 hours.',
      emailLabel: 'Email',
      companyName: 'NovaLearn Ltd',
      institutionCta: 'Universities & Institutions',
      institutionDescription: 'Looking to integrate NovaLearn into your institution? Contact us for a personalised quote and demonstration.',
      formFullName: 'Full name *',
      formEmail: 'Professional email *',
      formOrganization: 'Organisation',
      formSubject: 'Subject *',
      formMessage: 'Message *',
      formSubmit: 'Send message',
      formSending: 'Sending...',
      formSuccess: 'Thank you for your message!',
      formSuccessDetail: "We'll get back to you as soon as possible.",
      namePlaceholder: 'Jane Smith',
      emailPlaceholder: 'jane.smith@university.ac.uk',
      orgPlaceholder: 'University of London',
      messagePlaceholder: 'Describe your needs...',
      selectSubject: 'Select a subject',
      subjectOptions: [
        { value: 'Demo', label: 'Request a demonstration' },
        { value: 'Quote', label: 'University / institution quote' },
        { value: 'LMS', label: 'LMS integration' },
        { value: 'Support', label: 'Technical support' },
        { value: 'Partnership', label: 'Partnership' },
        { value: 'Other', label: 'Other' },
      ],
    },

    // Demo video page
    demoVideo: {
      title: 'Discover NovaLearn in 5 minutes',
      subtitle: 'See how to detect AI-generated content with 99.9% accuracy',
      videoPlaceholder: 'Demo video',
      videoSoon: 'Coming soon',
      readyCta: 'Ready to try?',
      readySubtitle: 'Create your free account and analyse up to 50 texts per month',
      readyButton: 'Start your free trial \u2192',
      featureCards: [
        { emoji: '\ud83c\udfaf', title: '99.9% accuracy', description: 'Validated by the University of Maryland' },
        { emoji: '\u26a1', title: 'Moodle integration', description: 'Installation in under 10 minutes' },
        { emoji: '\ud83c\uddec\ud83c\udde7', title: '100% UK', description: 'GDPR, support and billing in GBP' },
      ],
    },

    // Email templates
    emails: {
      headerName: 'NOVALEARN',
      legalFooter: '',

      welcome: {
        subject: 'Welcome to NovaLearn, {name}! \ud83c\udf89',
        greeting: 'Welcome, {name}! \ud83d\udc4b',
        intro: "Thank you for creating your NovaLearn account. You now have access to the most accurate AI detector on the market, verified by the University of Maryland.",
        trialTitle: '\ud83c\udf81 Your free trial includes:',
        trialFeatures: [
          '3 analyses per month',
          '99.9% accuracy',
          'AI model identification',
          '7-day history',
        ],
        ctaButton: 'Start my first analysis \u2192',
        question: 'Any questions? Reply directly to this email.',
        ctaUrl: '/dashboard',
      },

      subscriptionConfirmed: {
        subject: 'Your {plan} subscription is active! \ud83d\ude80',
        greeting: 'Thank you, {name}!',
        active: 'Your {plan} subscription is now active.',
        planTitle: '\u2705 Your plan includes:',
        ctaButton: 'Go to my dashboard \u2192',
        manageHint: 'Manage your subscription in your account settings.',
      },

      upgradeReminder: {
        subject: '{name}, you have used {percent}% of your analyses \ud83d\udcca',
        title: "You're getting great use out of NovaLearn! \ud83c\udfaf",
        body: '{name}, you have already used {percent}% of your free analyses this month.',
        upgradeTitle: '\ud83d\ude80 Upgrade to Pro for:',
        upgradeFeatures: [
          '1,000 analyses/month (instead of 50)',
          'API access',
          'PDF/CSV export',
          'Priority support',
        ],
        upgradePrice: 'Only \u00a321/month',
        ctaButton: 'Upgrade to Pro \u2192',
      },

      trialExpiring: {
        subjects: {
          lastDay: '{name}, your free trial ends today! \u23f0',
          urgent: '{name}, only {days} days left on your trial \u26a0\ufe0f',
          reminder: '{name}, your trial ends in {days} days \ud83d\udcc5',
        },
        titles: {
          lastDay: 'Last chance!',
          remaining: 'Only {days} days left',
        },
        body: '{name}, your free NovaLearn trial ends in {days} days. Don\'t lose access to the most accurate AI detector on the market.',
        bodyLastDay: '{name}, your free NovaLearn trial ends today. Don\'t lose access to the most accurate AI detector on the market.',
        countdown: {
          today: 'TODAY',
          days: '{days} DAYS',
        },
        beforeEnd: 'before your trial ends',
        keepTitle: '\ud83c\udfaf What you keep with Pro:',
        keepFeatures: [
          '1,000 analyses/month',
          'Full history',
          'API access',
          'PDF/CSV export',
          'Priority support',
        ],
        ctaButton: 'Upgrade to Pro \u2014 \u00a321/month \u2192',
        question: 'Any questions? Just reply to this email.',
      },

      trialEnded: {
        subject: "{name}, your trial has ended \u2014 but it's not too late! \ud83d\udd13",
        title: 'We miss you, {name}! \ud83d\udc4b',
        body: "Your free NovaLearn trial has ended. But don't worry \u2014 your account and history are still there, waiting for you.",
        offerTitle: '\ud83c\udf81 Special offer:',
        offerBody: 'Upgrade to Pro within the next 48 hours and get 50% off your first month.',
        ctaButton: 'Claim 50% off \u2192',
        question: 'Or reply to this email if you have any questions.',
      },
    },

    // API error messages
    errors: {
      unauthorized: 'Unauthorised',
      dailyLimitReached: 'Daily limit reached. Upgrade your plan for more analyses.',
      rateLimitRetry: 'Limit reached. Please try again in a moment.',
      textTooShort: 'Text must contain at least 50 characters.',
      textTooLong: 'Text must not exceed 50,000 characters.',
      invalidPlan: 'Invalid or unconfigured plan',
      internalError: 'Internal error',
      paymentError: 'Payment error',
      billingError: 'Billing error',
      noSubscription: 'No subscription found',
      userNotFound: 'User not found',
      serviceUnavailable: 'Service temporarily unavailable',
      demoLimitReached: 'Limit reached. Create a free account for more analyses.',
      demoTextTooLong: 'Text must not exceed 5,000 characters for the free trial.',
      analysisError: 'Error during analysis',
      emailAlreadySent: 'Email already sent',
    },

    // Plan details for emails
    planDetails: {
      pro: {
        name: 'Professional',
        features: ['1,000 analyses/month', 'API access', 'PDF/CSV export', 'Email support', '30-day history'],
      },
      starter: {
        name: 'Starter',
        features: ['1,000 analyses/month', 'LMS integrations', 'PDF/CSV export', 'Email support', '30-day history'],
      },
      university: {
        name: 'University',
        features: ['10,000 analyses/month', 'Unlimited API', 'LMS integration', 'Admin dashboard', 'Priority support'],
      },
      enterprise: {
        name: 'Enterprise',
        features: ['50,000 analyses per month', 'White-label API', 'Account manager', 'SLA 99.9%', 'Custom features'],
      },
    },
  },
}

export default config
