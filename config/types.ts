// =============================================================================
// ResellerConfig — the single source of truth for each reseller deployment
// =============================================================================
// Every reseller-specific value lives here. Components, pages, API routes,
// and email templates read from this config instead of hardcoding strings.
// =============================================================================

export interface ResellerConfig {
  id: string            // e.g. "auditelle-fr"

  // ── Branding ──────────────────────────────────────────────────────────────
  name: string          // e.g. "Auditelle"
  domain: string        // e.g. "auditelle.fr"
  logoColor: string     // path: e.g. "/brands/auditelle/logo-color.svg"
  logoWhite: string     // path: e.g. "/brands/auditelle/logo-white.svg"

  // ── Locale ────────────────────────────────────────────────────────────────
  locale: string        // e.g. "fr_FR"
  htmlLang: string      // e.g. "fr"
  currency: string      // e.g. "EUR"
  currencySymbol: string // e.g. "€"
  timezone: string      // e.g. "Europe/Paris"

  // ── Legal ─────────────────────────────────────────────────────────────────
  legalEntity: string           // e.g. "Auditelle SASU"
  registrationNumber: string    // e.g. "945117000"
  registrationLabel: string     // e.g. "SIREN"
  country: string               // e.g. "France"
  city: string                  // e.g. "Paris"
  dataProtectionLabel: string   // e.g. "RGPD"

  // ── Contact ───────────────────────────────────────────────────────────────
  supportEmail: string   // e.g. "contact@auditelle.fr"
  noReplyEmail: string   // e.g. "noreply@auditelle.fr"

  // ── Pricing ───────────────────────────────────────────────────────────────
  plans: {
    homepage: HomepagePlan[]
    upgrade: UpgradePlan[]
  }

  // ── Analytics (optional) ──────────────────────────────────────────────────
  googleAdsId?: string
  googleAdsConversionLabel?: string
  googleAdsSignupConversionLabel?: string

  // ── Feature flags ─────────────────────────────────────────────────────────
  features: {
    fileUpload: boolean
    apiAccess: boolean
    teamManagement: boolean
    demoPage: boolean
    heroDemo: boolean
  }

  // ── SEO / Meta ────────────────────────────────────────────────────────────
  seo: {
    title: string
    description: string
    keywords: string[]
    ogTitle: string
    ogDescription: string
  }

  // ── URL redirects (next.config) ───────────────────────────────────────────
  redirects: Array<{
    source: string
    destination: string
    permanent: boolean
  }>

  // ── UI Strings ────────────────────────────────────────────────────────────
  strings: ResellerStrings
}

// ── Plan types ──────────────────────────────────────────────────────────────

export interface HomepagePlan {
  name: string
  price: string            // display: "0€", "25€", "Sur devis"
  period?: string          // display: "mois"
  description: string
  features: string[]
  cta: string
  href: string
  popular?: boolean
  popularBadge?: string        // e.g. "POPULAIRE" — config-driven badge text
}

export interface UpgradePlan {
  id: string               // Stripe lookup: "starter", "pro", etc.
  name: string
  price: string            // display: "29€"
  period: string           // display: "/mois"
  description: string
  features: string[]
  popular?: boolean
  badge?: string | null
}

// ── All user-facing strings ─────────────────────────────────────────────────

export interface ResellerStrings {
  // Navbar
  nav: {
    features: string
    pricing: string
    dashboard: string
    login: string
    freeTrial: string
  }

  // Hero section
  hero: {
    badge: string
    title: string
    titleAccent: string
    subtitle: string
    trustBadges: string[]
    ctaPrimary: string
    ctaSecondary: string
  }

  // Trust bar
  trustBar: {
    label: string
    names: string[]
  }

  // Features section
  features: {
    title: string
    subtitle: string
    items: Array<{
      icon: string       // lucide icon name
      title: string
      description: string
    }>
  }

  // How it works
  howItWorks: {
    title: string
    steps: Array<{
      title: string
      description: string
    }>
  }

  // Testimonials
  testimonials: {
    title: string
    items: Array<{
      quote: string
      author: string
      role: string
    }>
  }

  // Pricing section (homepage)
  pricing: {
    title: string
    subtitle: string
    footer: string
  }

  // Competitor comparison
  comparison: {
    title: string
    subtitle: string
    competitors: string[]
    rows: Array<{
      label: string
      values: Array<string | boolean>
    }>
  }

  // CTA section
  cta: {
    title: string
    subtitle: string
    button: string
  }

  // Footer
  footer: {
    description: string
    productLabel: string
    companyLabel: string
    contactLabel: string
    copyright: string
    poweredBy: string
    poweredByName: string
  }

  // Auth
  auth: {
    login: string
    signup: string
    resetPassword: string
    loginSubtitle: string
    loginSubtitlePlan: string     // with {plan} placeholder
    signupSubtitle: string
    signupSubtitlePlan: string    // with {plan} placeholder
    resetSubtitle: string
    fullName: string
    email: string
    password: string
    emailPlaceholder: string
    namePlaceholder: string
    forgotPassword: string
    noAccount: string
    hasAccount: string
    backToLogin: string
    loading: string
    accountCreatedRedirect: string
    checkEmail: string
    resetEmailSent: string
  }

  // Dashboard
  dashboard: {
    detection: string
    history: string
    account: string
    signOut: string
    analyzerTitle: string
    analyzerSubtitle: string
    textareaPlaceholder: string
    characters: string
    analyze: string
    analyzing: string
    scansRemaining: string
    subscriptionActivated: string
    subscriptionActivatedDetail: string
    minCharsError: string

    // History page
    historyTitle: string
    historyEmpty: string
    historyEmptyHint: string
    historyLoading: string
    historyModel: string

    // Account page
    accountTitle: string
    profileLabel: string
    nameLabel: string
    emailLabel: string
    subscriptionLabel: string
    plan: string
    upgradeToPro: string
    manageSubscription: string
    managingSubscription: string
    scansPerDay: Record<string, string>

    // Upgrade page
    upgradeTitle: string
    upgradeSubtitle: string
    upgradeBack: string
    upgradePopular: string
    upgradeFooter: string
    upgradeLoading: string
    upgradeContact: string
    upgradeChoose: string      // with {plan} placeholder
    upgradeError: string
  }

  // Detection results
  results: {
    probablyHuman: string
    mixed: string
    probablyAI: string
    aiScore: string
    aiProbability: string       // with {score} placeholder
    classification: string      // label for Pangram headline
    sectionAnalysis: string
    aiPercent: string           // with {score} placeholder
    // Breakdown labels
    breakdown: string
    aiGenerated: string
    aiAssisted: string
    humanWritten: string
    viewReport: string
  }

  // Hero demo
  heroDemo: {
    testNow: string
    free: string
    placeholder: string
    tryLabel: string
    humanButton: string
    chatgptButton: string
    humanSample: string
    chatgptSample: string
    analyzingLabel: string
    analyzingDetail: string
    scanner: string
    createAccountFull: string
    veryLikelyAI: string
    possiblyAI: string
    probablyHuman: string
    connectionError: string
    ctaButton: string           // big CTA button text after demo scan
    ctaTeaser: string           // teaser line below CTA button
    unlockLabel: string         // blurred preview overlay text
    scansRemaining: string      // "{count} analyses gratuites restantes aujourd'hui"
  }

  // File upload
  fileUpload: {
    dropOrBrowse: string
    browse: string
    formats: string
    extracting: string
    unsupported: string
    tooLarge: string
    extractError: string
  }

  // Contact page
  contact: {
    title: string
    subtitle: string
    emailLabel: string
    companyName: string
    institutionCta: string
    institutionDescription: string
    formFullName: string
    formEmail: string
    formOrganization: string
    formSubject: string
    formMessage: string
    formSubmit: string
    formSending: string
    formSuccess: string
    formSuccessDetail: string
    namePlaceholder: string
    emailPlaceholder: string
    orgPlaceholder: string
    messagePlaceholder: string
    subjectOptions: Array<{ value: string; label: string }>
    selectSubject: string
  }

  // Demo video page
  demoVideo: {
    title: string
    subtitle: string
    videoPlaceholder: string
    videoSoon: string
    readyCta: string
    readySubtitle: string
    readyButton: string
    featureCards: Array<{
      emoji: string
      title: string
      description: string
    }>
  }

  // Email templates
  emails: {
    welcome: {
      subject: string             // with {name} placeholder
      greeting: string            // with {name} placeholder
      intro: string
      trialTitle: string
      trialFeatures: string[]
      ctaButton: string
      question: string
      ctaUrl: string              // will use config.domain
    }
    subscriptionConfirmed: {
      subject: string             // with {plan} placeholder
      greeting: string            // with {name} placeholder
      active: string              // with {plan} placeholder
      planTitle: string
      ctaButton: string
      manageHint: string
    }
    upgradeReminder: {
      subject: string             // with {name}, {percent} placeholders
      title: string
      body: string                // with {name}, {percent} placeholders
      upgradeTitle: string
      upgradeFeatures: string[]
      upgradePrice: string
      ctaButton: string
    }
    trialExpiring: {
      subjects: {
        lastDay: string           // with {name} placeholder
        urgent: string            // with {name}, {days} placeholders
        reminder: string          // with {name}, {days} placeholders
      }
      titles: {
        lastDay: string
        remaining: string         // with {days} placeholder
      }
      body: string                // with {name} placeholder
      bodyLastDay: string         // with {name} placeholder
      countdown: {
        today: string
        days: string              // with {days} placeholder
      }
      beforeEnd: string
      keepTitle: string
      keepFeatures: string[]
      ctaButton: string
      question: string
    }
    trialEnded: {
      subject: string             // with {name} placeholder
      title: string               // with {name} placeholder
      body: string
      offerTitle: string
      offerBody: string
      ctaButton: string
      question: string
    }
    // Shared across all templates
    headerName: string            // "AUDITELLE", "NOVALEARN", etc.
    legalFooter: string           // built from config at runtime
  }

  // API error messages
  errors: {
    unauthorized: string
    dailyLimitReached: string
    rateLimitRetry: string
    textTooShort: string
    textTooLong: string
    invalidPlan: string
    internalError: string
    paymentError: string
    billingError: string
    noSubscription: string
    userNotFound: string
    serviceUnavailable: string
    demoLimitReached: string
    demoTextTooLong: string
    analysisError: string
    emailAlreadySent: string
  }

  // Plan details for subscription emails
  planDetails: Record<string, {
    name: string
    features: string[]
  }>
}

// ── Daily scan limits (shared across all resellers for now) ─────────────────

export const DAILY_LIMITS: Record<string, number> = {
  free: 5,
  student: 10,
  starter: 50,
  pro: 50,
  university: 500,
  enterprise: 10000,
}

// ── Valid plan IDs for checkout validation ──────────────────────────────────

export const VALID_PLAN_IDS = [
  'student', 'starter', 'pro', 'equipe',
  'departement', 'university', 'enterprise',
] as const

export type PlanId = typeof VALID_PLAN_IDS[number]
