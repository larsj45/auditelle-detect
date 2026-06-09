import type { ResellerConfig } from './types'

const config: ResellerConfig = {
  id: 'veritexto-es',

  // ── Branding ──────────────────────────────────────────────────────────────
  name: 'VeriTexto',
  domain: 'veritexto.es',
  logoColor: '/brands/veritexto-es/logo-color.svg',
  logoWhite: '/brands/veritexto-es/logo-white.svg',
  logoHeight: '3.5rem',

  // ── Theme ───────────────────────────────────────────────────────────────
  theme: {
    accent: '#3B82F6',           // bright blue from logo
    accentHover: '#2563EB',      // darker blue on hover
    accentLight: '#EFF6FF',      // blue-50 tint
    navy: '#1E3A5F',             // navy from logo
    navyLight: '#2A4A6B',        // lighter navy
    heroGradient: 'linear-gradient(180deg, #EFF6FF 0%, #F8FAFC 50%, #ffffff 100%)',
  },

  // ── Locale ────────────────────────────────────────────────────────────────
  locale: 'es_ES',
  htmlLang: 'es',
  currency: 'EUR',
  currencySymbol: '€',
  timezone: 'Europe/Madrid',
  creditPricePerScanMinor: 50,

  // ── Legal ─────────────────────────────────────────────────────────────────
  legalEntity: 'Learnbase Gestão e Consultoria Educacional S.A.',
  registrationNumber: '',
  registrationLabel: 'CIF',
  country: 'España',
  city: 'Madrid',
  dataProtectionLabel: 'RGPD',

  // ── Contact ───────────────────────────────────────────────────────────────
  supportEmail: 'contacto@veritexto.es',
  noReplyEmail: 'noreply@veritexto.es',

  // ── Pricing ───────────────────────────────────────────────────────────────
  plans: {
    homepage: [
      {
        name: 'Créditos',
        price: '4,90€',
        period: 'paquete',
        description: 'Entrada flexible, sin suscripción',
        features: [
          'Paquetes de 5, 20 o 100 créditos',
          'Créditos sin caducidad',
          'IA, similitud o análisis completo',
          'Puntuación IA 99,9% precisa',
          'Ideal para profesor y consultor',
        ],
        cta: 'Crear cuenta y comprar créditos',
        href: '/signup?next=credits',
      },
      {
        name: 'Profesor',
        price: '39€',
        period: 'mes',
        description: 'Para profesores y consultores',
        features: [
          '1.000 análisis por mes',
          '1 usuario',
          'Integraciones LMS (Moodle)',
          'Exportar PDF/CSV',
          'Soporte por email',
        ],
        cta: 'Activar plan Profesor',
        href: '/signup?plan=starter',
        popular: true,
        popularBadge: 'POPULAR',
      },
      {
        name: 'Centro',
        price: '299€',
        period: 'mes',
        description: 'Para coordinaciones, centros y equipos docentes',
        features: [
          '10.000 análisis por mes',
          'Múltiples usuarios',
          'API ilimitada',
          'Panel de administración',
          'Exportar PDF/CSV',
          'Soporte prioritario',
        ],
        cta: 'Activar plan Centro',
        href: '/signup?plan=university',
      },
      {
        name: 'Universidad',
        price: 'Bajo consulta',
        description: 'Para facultades, universidades y redes educativas',
        features: [
          '50.000 análisis/mes o volumen personalizado',
          'Onboarding institucional',
          'SSO e integraciones a medida',
          'Integración LMS',
          'Gestor de cuenta dedicado',
        ],
        cta: 'Solicitar propuesta',
        href: '/contact?subject=Plan%20Universidad',
      },
    ],
    upgrade: [
      {
        id: 'student',
        name: 'Estudiante',
        price: '9,99€',
        period: '/mes',
        description: 'Para estudiantes y doctorandos',
        features: [
          '200 análisis por mes',
          'Detección 99,9% de precisión',
          'Exportar PDF',
          'Historial 7 días',
        ],
        badge: '🎓',
      },
      {
        id: 'starter',
        name: 'Profesor',
        price: '39€',
        period: '/mes',
        description: 'Para profesores y consultores',
        features: [
          '1.000 análisis por mes',
          'Integraciones LMS (Moodle)',
          'Exportar PDF/CSV',
          'Soporte por email',
          'Historial 30 días',
        ],
        popular: true,
      },
      {
        id: 'university',
        name: 'Centro',
        price: '299€',
        period: '/mes',
        description: 'Para coordinaciones, centros y equipos docentes',
        features: [
          '10.000 análisis por mes',
          'Múltiples usuarios',
          'API ilimitada',
          'Panel de administración',
          'Soporte prioritario',
          'Informes personalizados',
        ],
      },
      {
        id: 'enterprise',
        name: 'Universidad',
        price: 'Bajo consulta',
        period: '',
        description: 'Para facultades, universidades y redes educativas',
        features: [
          '50.000 análisis/mes o volumen personalizado',
          'Onboarding institucional',
          'SSO e integraciones a medida',
          'Integración LMS',
          'Gestor de cuenta dedicado',
          'Propuesta comercial personalizada',
        ],
      },
    ],
  },
  creditPacks: [
    {
      id: '5',
      quantity: 5,
      totalPriceMinor: 490,
      label: '5 créditos',
      description: 'Paquete inicial para una revisión rápida',
      icon: '🔍',
    },
    {
      id: '20',
      quantity: 20,
      totalPriceMinor: 1490,
      label: '20 créditos',
      description: 'Ideal para corregir un grupo pequeño',
      popular: true,
      icon: '📚',
    },
    {
      id: '100',
      quantity: 100,
      totalPriceMinor: 4990,
      label: '100 créditos',
      description: 'Mejor coste por crédito para uso recurrente',
      icon: '🏫',
    },
  ],

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
    title: 'VeriTexto — La mejor alternativa a Turnitin para IA y plagio',
    description: 'Alternativa moderna a Turnitin para centros educativos: detección de IA, plagio, identificación del modelo e informes exportables. Precisión 99,9% y soporte en español.',
    keywords: ['alternativa Turnitin', 'detección IA', 'detector ChatGPT', 'detección plagio IA', 'integridad académica', 'VeriTexto'],
    ogTitle: 'VeriTexto — Alternativa a Turnitin en español',
    ogDescription: 'Detección de IA + plagio con informes claros, soporte local y precisión verificada.',
  },

  // ── Redirects ─────────────────────────────────────────────────────────────
  redirects: [
    { source: '/prueba-gratis', destination: '/signup?next=credits', permanent: false },
    { source: '/demo', destination: '/demo-video', permanent: false },
  ],

  // ── UI Strings ────────────────────────────────────────────────────────────
  strings: {
    // Navbar
    nav: {
      features: 'Funcionalidades',
      pricing: 'Precios',
      dashboard: 'Panel',
      login: 'Iniciar sesión',
      freeTrial: 'Comprar créditos',
    },

    // Hero
    hero: {
      badge: 'Hecho para centros educativos en español',
      title: 'La plataforma de integridad académica que ',
      titleAccent: 'detecta IA y plagio',
      subtitle: 'VeriTexto reúne detección de IA, plagio, identificación del modelo e informes exportables en una plataforma pensada para profesorado, centros y universidades.',
      trustBadges: [
        'IA + plagio',
        'Créditos desde 0,50 €',
        'Soporte en español',
      ],
      ctaPrimary: 'Crear cuenta y comprar créditos →',
      ctaSecondary: 'Cómo funciona',
    },

    // Trust bar
    trustBar: {
      label: 'Reconocido por los expertos',
      names: ['University of Maryland', 'Chicago Booth', 'Stony Brook University', 'SOC2 Type 2'],
    },

    // Features
    features: {
      title: 'Tecnología de detección avanzada',
      subtitle: '99,9% de precisión donde otros fallan. Desarrollada por investigadores de Stanford, Tesla y Google.',
      items: [
        {
          icon: 'Brain',
          title: 'Puntuación de probabilidad IA',
          description: 'Envía tu contenido y obtén una puntuación precisa indicando si el texto es de origen humano o generado por IA.',
        },
        {
          icon: 'FileSearch',
          title: 'Identificación del modelo',
          description: 'Detecta qué modelo se utilizó: ChatGPT, Claude, Gemini, Llama, Perplexity y muchos más.',
        },
        {
          icon: 'BarChart3',
          title: 'Análisis por sección',
          description: 'Comprende si todo el texto es IA, humano o una combinación de ambos, sección por sección.',
        },
        {
          icon: 'Shield',
          title: 'Detección de plagio',
          description: 'Búsqueda en miles de millones de páginas web, libros y artículos para detectar plagio además de IA.',
        },
        {
          icon: 'Zap',
          title: 'Falsos positivos casi nulos',
          description: 'Verificado independientemente por tener la tasa de falsos positivos más baja del mercado. 100% fiable.',
        },
        {
          icon: 'Globe',
          title: 'Multilingüe',
          description: 'Detección precisa en múltiples idiomas, incluyendo español, inglés, portugués y alemán.',
        },
      ],
    },

    // How it works
    howItWorks: {
      title: 'Simple como 1, 2, 3',
      steps: [
        { title: 'Pega tu texto', description: 'Copia y pega el contenido a analizar en nuestra interfaz intuitiva.' },
        { title: 'Inicia el análisis', description: 'Nuestro motor IA analiza cada frase en segundos.' },
        { title: 'Consulta el informe', description: 'Obtén una puntuación detallada con identificación del modelo y análisis sección por sección.' },
      ],
    },

    // Testimonials
    testimonials: {
      title: 'Lo que dicen los expertos',
      items: [
        {
          quote: 'Entre los detectores automáticos, este sistema supera significativamente a todos los demás.',
          author: 'Jenna Russell',
          role: 'University of Maryland',
        },
        {
          quote: 'Un detector casi sobrenaturalmente bueno. Aún no he visto ningún falso positivo ni falso negativo.',
          author: 'Ryan Nicolace',
          role: 'Cloud Architect',
        },
        {
          quote: 'Mis alumnos están tan convencidos de su precisión que se ha convertido en el mejor elemento disuasorio.',
          author: 'Jarred Phillips',
          role: 'New Roads School',
        },
      ],
    },

    // Competitor comparison
    comparison: {
      title: 'VeriTexto, la alternativa en español a Turnitin',
      subtitle: 'Compara las principales soluciones de integridad académica para detectar IA y plagio.',
      competitors: ['VeriTexto', 'GPTZero', 'Turnitin', 'Originality.ai'],
      rows: [
        { label: 'Precisión', values: ['99,9%', '~85%', '~80%', '~94%'] },
        { label: 'Tasa de falsos positivos', values: ['Casi nula', 'Alta', 'Moderada', 'Moderada'] },
        { label: 'IA + plagio en el mismo informe', values: [true, false, true, true] },
        { label: 'Soporte en español', values: [true, false, false, false] },
        { label: 'Modelo comercial', values: ['Créditos + mensualidad', 'Plan individual', 'Cotización institucional', 'En dólares'] },
        { label: 'Análisis por sección', values: [true, false, false, true] },
        { label: 'Identificación del modelo', values: [true, true, false, false] },
      ],
    },

    // Pricing (homepage section)
    pricing: {
      title: 'Planes para profesor, centro y universidad',
      subtitle: 'Empieza con créditos sueltos, pasa a un plan mensual para uso recurrente y solicita propuesta para implantación institucional.',
      footer: 'Tecnología Pangram • 99,9% de precisión • Conforme RGPD • Soporte en español',
    },

    // CTA section
    cta: {
      title: '¿Necesitas analizar IA y plagio con una entrada de pago más simple?',
      subtitle: 'Crea tu cuenta, compra créditos y trabaja con IA + plagio en un informe claro, exportable y adaptado a centros hispanohablantes.',
      button: 'Crear cuenta y comprar créditos →',
    },

    // Footer
    footer: {
      description: 'La solución en español de integridad académica y alternativa a Turnitin para detectar IA, plagio y contenidos sospechosos con conformidad RGPD.',
      productLabel: 'Producto',
      companyLabel: 'Empresa',
      contactLabel: 'Contacto',
      copyright: 'Todos los derechos reservados.',
      poweredBy: 'Detección impulsada por',
      poweredByName: 'Pangram Labs',
    },

    // Auth
    auth: {
      login: 'Iniciar sesión',
      signup: 'Crear cuenta',
      resetPassword: 'Restablecer contraseña',
      loginSubtitle: 'Accede a tu panel de detección IA',
      loginSubtitlePlan: 'Inicia sesión para activar el plan {plan}',
      signupSubtitle: 'Crea tu cuenta para comprar créditos o activar un plan',
      signupSubtitlePlan: 'Crea tu cuenta para activar el plan {plan}',
      resetSubtitle: 'Introduce tu email para recibir un enlace de restablecimiento',
      fullName: 'Nombre completo',
      email: 'Email',
      password: 'Contraseña',
      emailPlaceholder: 'tu@email.com',
      namePlaceholder: 'Juan García',
      forgotPassword: '¿Olvidaste tu contraseña?',
      noAccount: '¿No tienes cuenta?',
      hasAccount: '¿Ya tienes cuenta?',
      backToLogin: 'Volver al inicio de sesión',
      loading: 'Cargando...',
      accountCreatedRedirect: '¡Cuenta creada! Redirigiendo al pago...',
      checkEmail: 'Revisa tu email para confirmar tu registro.',
      resetEmailSent: 'Se ha enviado un enlace de restablecimiento a tu dirección de email.',
      googleSignIn: 'Continuar con Google',
      orDivider: 'o',
    },

    // Dashboard
    dashboard: {
      detection: 'Detección',
      history: 'Historial',
      account: 'Cuenta',
      signOut: 'Cerrar sesión',
      analyzerTitle: 'Analizador de contenido IA',
      analyzerSubtitle: 'Pega tu texto para detectar contenido generado por IA',
      textareaPlaceholder: 'Pega aquí el texto a analizar (mínimo 50 caracteres)...',
      characters: 'caracteres',
      analyze: 'Analizar',
      analyzing: 'Analizando...',
      scansRemaining: 'análisis restantes',
      subscriptionActivated: '¡Suscripción activada con éxito!',
      subscriptionActivatedDetail: 'Tus análisis adicionales ya están disponibles.',
      minCharsError: 'Por favor, introduce al menos 50 caracteres para un análisis fiable.',

      // Onboarding
      onboardingTitle: '¡Bienvenido a VeriTexto! 👋',
      onboardingBody: 'Pega un texto abajo para verificar si fue generado por IA — o prueba con un ejemplo.',
      onboardingCta: 'Probar con un ejemplo →',
      onboardingDismiss: 'Cerrar',
      limitUpgradeCta: 'Pasar a Pro — 12,50€ el primer mes →',
      limitUpgradePromo: 'Código BIENVENIDO50 — 50% en el 1er mes',

      // History
      historyTitle: 'Historial de análisis',
      historyEmpty: 'Ningún análisis por el momento.',
      historyEmptyHint: 'Realiza tu primer análisis desde el panel.',
      historyLoading: 'Cargando…',
      historyModel: 'Modelo',

      // Account
      accountTitle: 'Configuración de la cuenta',
      profileLabel: 'Perfil',
      nameLabel: 'Nombre',
      emailLabel: 'Email',
      subscriptionLabel: 'Suscripción',
      plan: 'Plan',
      upgradeToPro: 'Suscribirse a Pro',
      manageSubscription: 'Gestionar suscripción',
      managingSubscription: 'Cargando...',
      scansPerDay: {
        free: '0 análisis incluidos sin créditos',
        pro: '100 análisis por día',
        default: 'Análisis ilimitados',
      },

      // Upgrade
      upgradeTitle: 'Elige tu plan',
      upgradeSubtitle: 'Todos los planes incluyen detección IA con 99,9% de precisión.',
      upgradeBack: 'Volver a la cuenta',
      upgradePopular: 'POPULAR',
      upgradeFooter: 'Todos los planes se facturan mensualmente. Cancelación posible en cualquier momento. Pago seguro con Stripe.',
      upgradeLoading: 'Cargando...',
      upgradeContact: 'Contáctenos',
      upgradeChoose: 'Elegir {plan}',
      upgradeError: 'Error en el pago. Por favor, inténtalo de nuevo.',
      upgradeCreditsTitle: 'Comprar créditos',
      upgradeCreditsSubtitle: 'Compra créditos sin suscripción. Detección IA usa 1 crédito, similitud usa 2 y análisis completo usa 3.',
      upgradeCurrentBalance: 'Saldo actual: {count}',
      upgradeCreditSingular: 'crédito',
      upgradeCreditPlural: 'créditos',
      upgradeCreditPackTrialLabel: '5 créditos',
      upgradeCreditPackTrialDescription: 'Paquete inicial',
      upgradeCreditPackStandardLabel: '20 créditos',
      upgradeCreditPackStandardDescription: 'Pack para un grupo pequeño',
      upgradeCreditPackBestLabel: '100 créditos',
      upgradeCreditPackBestDescription: 'Mejor coste por crédito',
      upgradePerAnalysis: '{price} por crédito',
      upgradeBuy: 'Comprar',
      upgradeRedirecting: 'Redirigiendo...',
      upgradeSubscriptionsTitle: 'Suscripciones para centros y equipos',
      upgradeSubscriptionsSubtitle: 'Para uso recurrente, los planes mensuales ofrecen más volumen, informes y mejor coste por análisis.',
      upgradeTrustStripe: 'Pago seguro con Stripe',
      upgradeTrustCredits: 'Los créditos no caducan',
      upgradeTrustReports: 'Informes PDF exportables',
      upgradeCheckoutCreditsDescription: '{count} créditos para detección de IA y plagio con informe exportable',
    },

    // Detection results
    results: {
      probablyHuman: 'Probablemente humano',
      mixed: 'Mixto / Incierto',
      probablyAI: 'Probablemente IA',
      aiScore: 'Puntuación IA',
      aiProbability: 'Probabilidad de contenido generado por IA: {score}%',
      classification: 'Clasificación',
      sectionAnalysis: 'Análisis por sección',
      aiPercent: '{score}% IA',
      breakdown: 'Distribución del texto',
      aiGenerated: 'IA pura',
      aiAssisted: 'IA asistida',
      humanWritten: 'Humano',
      viewReport: 'Ver informe detallado',
      exportPdf: 'Exportar informe PDF',
    },

    // Public tester page
    tester: {
      badge: 'Entrada por créditos — Sin análisis gratis',
      title: 'Activa tu acceso a VeriTexto',
      subtitle: 'Pega un texto, crea tu cuenta y sigue con créditos para analizar IA, plagio o ambos.',
      testsRemaining: 'Sin análisis de prueba disponibles',
      limitReached: 'Crea una cuenta y compra créditos para continuar',
      minCharsError: 'Introduce al menos 50 caracteres para un análisis fiable.',
      analysisError: 'Error durante el análisis',
      internalError: 'Se produjo un error',
      textareaPlaceholder: 'Pega aquí el texto a analizar (mínimo 50 caracteres, máximo 5000)...',
      characterCount: '{count} / 5000 caracteres',
      analyzeFree: 'Crear cuenta y comprar créditos',
      loading: 'Analizando...',
      ctaTitle: '¿Te gusta VeriTexto?',
      ctaTitleLimit: 'Continúa con créditos',
      ctaBody: 'Crea tu cuenta para analizar textos con historial completo, informes exportables y compra directa de créditos.',
      ctaButton: 'Crear cuenta y comprar créditos',
      featureAccuracyTitle: '99,9% de precisión',
      featureAccuracyBody: 'Tecnología validada por la Universidad de Maryland',
      featureSectionTitle: 'Análisis por sección',
      featureSectionBody: 'Identifica con precisión qué partes fueron generadas por IA',
      featureModelTitle: 'Detección del modelo',
      featureModelBody: 'ChatGPT, Claude, Gemini, Llama... los identificamos todos',
    },

    // Hero demo
    heroDemo: {
      testNow: 'Prueba ahora',
      free: 'Desde 0,50 €/crédito',
      placeholder: 'Pega tu texto aquí para un análisis instantáneo... (mín. 50 caracteres)',
      tryLabel: 'Prueba:',
      humanButton: 'Humano',
      chatgptButton: 'ChatGPT',
      humanSample: 'Me encanta explorar nuevos lugares. Cada viaje me trae recuerdos únicos y perspectivas diferentes sobre el mundo.',
      chatgptSample: 'La inteligencia artificial representa un avance tecnológico importante que transforma diversos sectores de nuestra sociedad moderna.',
      analyzingLabel: 'Analizando...',
      analyzingDetail: 'Detectando patrones IA con Pangram',
      scanner: '🔍 Analizar',
      createAccountFull: 'Crea una cuenta para el análisis completo',
      veryLikelyAI: 'Muy probablemente IA',
      possiblyAI: 'Posiblemente IA',
      probablyHuman: 'Probablemente humano',
      connectionError: 'Error de conexión',
      ctaButton: 'Crear cuenta y comprar créditos →',
      ctaTeaser: 'Desbloquea el análisis por sección, la identificación del modelo y más',
      unlockLabel: 'Crea una cuenta para desbloquear el análisis completo',
      scansRemaining: 'Sin análisis gratis',
      pendingBanner: 'Tu texto ha sido guardado y será analizado inmediatamente después de crear tu cuenta.',
      signupToAnalyze: 'Crea una cuenta para analizar tu texto con créditos',
    },

    // Plagiarism detection
    plagiarism: {
      modeAI: 'Detección IA',
      modePlagiarism: 'Detección de plagio',
      modeBoth: 'Análisis completo',
      noPlagiarism: 'Ningún plagio detectado',
      plagiarismFound: 'Plagio detectado',
      percentPlagiarized: '{score}% de plagio detectado',
      sourcesFound: '{count} fuente(s) encontrada(s)',
      sourceLabel: 'Fuente',
      matchedText: 'Texto correspondiente',
      similarity: 'Similitud',
      highlightedPassages: 'Fragmentos detectados en tu texto',
      analyzePlagiarism: 'Verificar plagio',
      analyzeBoth: 'Análisis IA + plagio',
      partialWarning: 'Una parte del análisis no pudo finalizarse. Los resultados disponibles se muestran abajo.',
      originalSample: 'La fotosíntesis es un proceso biológico fundamental por el cual las plantas convierten la luz solar en energía química, produciendo oxígeno como subproducto esencial para la vida en la Tierra.',
      copiedSample: 'La fotosíntesis es el proceso bioenergético que permite a los organismos clorofílicos sintetizar materia orgánica utilizando la energía luminosa. Consiste en reducir el dióxido de carbono por el agua en glúcidos y dioxígeno.',
      originalButton: 'Texto original',
      copiedButton: 'Texto copiado',
    },

    // Cookie consent
    cookieConsent: {
      message: 'Este sitio utiliza cookies para medir el rendimiento publicitario y mejorar su experiencia. No se venden datos personales.',
      accept: 'Aceptar',
      decline: 'Rechazar',
    },

    // File upload
    fileUpload: {
      dropOrBrowse: 'Arrastra un archivo o',
      browse: 'buscar',
      formats: 'PDF, DOCX, TXT — máx. 10 MB',
      extracting: 'Extrayendo…',
      unsupported: 'Formato no soportado. Usa PDF, DOCX o TXT.',
      tooLarge: 'Archivo demasiado grande (máx. 10 MB).',
      extractError: 'No se pudo extraer el texto. Verifica que el archivo no esté protegido.',
    },

    // Contact page
    contact: {
      title: 'Contáctenos',
      subtitle: '¿Una pregunta? ¿Un proyecto de integración? Nuestro equipo responde en 24h.',
      emailLabel: 'Email',
      companyName: 'Learnbase Gestão e Consultoria Educacional S.A.',
      institutionCta: 'Universidades e Instituciones',
      institutionDescription: '¿Desea integrar VeriTexto en su institución? Contáctenos para un presupuesto personalizado y una demostración.',
      formFullName: 'Nombre completo *',
      formEmail: 'Email profesional *',
      formOrganization: 'Organización',
      formSubject: 'Asunto *',
      formMessage: 'Mensaje *',
      formSubmit: 'Enviar mensaje',
      formSending: 'Enviando...',
      formSuccess: '¡Gracias por tu mensaje!',
      formSuccessDetail: 'Te responderemos lo antes posible.',
      namePlaceholder: 'Juan García',
      emailPlaceholder: 'juan.garcia@universidad.es',
      orgPlaceholder: 'Universidad Complutense de Madrid',
      messagePlaceholder: 'Describe tu necesidad...',
      selectSubject: 'Selecciona un asunto',
      subjectOptions: [
        { value: 'Demostración', label: 'Solicitar demostración' },
        { value: 'Presupuesto', label: 'Presupuesto universidad / institución' },
        { value: 'LMS', label: 'Integración LMS' },
        { value: 'Soporte', label: 'Soporte técnico' },
        { value: 'Colaboración', label: 'Colaboración' },
        { value: 'Otro', label: 'Otro' },
      ],
    },

    // Demo video page
    demoVideo: {
      title: 'Conoce VeriTexto en 5 minutos',
      subtitle: 'Descubre cómo detectar contenido generado por IA con 99,9% de precisión',
      videoPlaceholder: 'Vídeo de demostración',
      videoSoon: 'Próximamente',
      readyCta: '¿Listo para empezar?',
      readySubtitle: 'Crea tu cuenta, compra créditos y analiza textos con acceso inmediato.',
      readyButton: 'Crear cuenta y comprar créditos →',
      featureCards: [
        { emoji: '🎯', title: '99,9% de precisión', description: 'Validada por la Universidad de Maryland' },
        { emoji: '⚡', title: 'Integración Moodle', description: 'Instalación en menos de 10 minutos' },
        { emoji: '🇪🇸', title: '100% en español', description: 'RGPD, soporte y facturación ES' },
      ],
    },

    // Email templates
    emails: {
      headerName: 'VERITEXTO',
      legalFooter: '',

      welcome: {
        subject: '¡Bienvenido a VeriTexto, {name}! 🎉',
        greeting: '¡Bienvenido, {name}! 👋',
        intro: 'Gracias por crear tu cuenta en VeriTexto. Ahora tienes acceso al detector IA más preciso del mercado, verificado por la Universidad de Maryland.',
        trialTitle: '🎁 Tu cuenta está lista para:',
        trialFeatures: [
          'Comprar créditos cuando los necesites',
          'Precisión del 99,9%',
          'Identificación del modelo IA',
          'Informes exportables',
        ],
        ctaButton: 'Comprar créditos y empezar →',
        question: '¿Tienes dudas? Responde directamente a este email.',
        ctaUrl: '/dashboard/upgrade',
      },

      subscriptionConfirmed: {
        subject: '¡Tu suscripción {plan} está activa! 🚀',
        greeting: '¡Gracias, {name}!',
        active: 'Tu suscripción {plan} ya está activa.',
        planTitle: '✅ Tu plan incluye:',
        ctaButton: 'Acceder a mi panel →',
        manageHint: 'Gestiona tu suscripción en la configuración de tu cuenta.',
      },

      upgradeReminder: {
        subject: '{name}, has usado {percent}% de tus análisis 📊',
        title: '¡Estás usando bien VeriTexto! 🎯',
        body: '{name}, ya has usado {percent}% del volumen incluido en tu cuenta este mes.',
        upgradeTitle: '🚀 Pasa a Pro para:',
        upgradeFeatures: [
          '1.000 análisis/mes',
          'Acceso API',
          'Exportar PDF/CSV',
          'Soporte prioritario',
        ],
        upgradePrice: 'Solo 29€/mes',
        ctaButton: 'Suscribirse a Pro →',
      },

      trialExpiring: {
        subjects: {
          lastDay: '{name}, mantén tu acceso activo hoy ⏰',
          urgent: '{name}, revisa tu acceso a VeriTexto ⚠️',
          reminder: '{name}, sigue analizando con VeriTexto 📅',
        },
        titles: {
          lastDay: 'Mantén tu acceso activo',
          remaining: 'Sigue analizando sin interrupciones',
        },
        body: '{name}, activa un plan o compra créditos para seguir usando VeriTexto sin interrupciones.',
        bodyLastDay: '{name}, activa un plan o compra créditos hoy para seguir usando VeriTexto sin interrupciones.',
        countdown: {
          today: 'HOY',
          days: '{days} DÍAS',
        },
        beforeEnd: 'antes de pausar tu acceso',
        keepTitle: '🎯 Lo que conservas con Pro:',
        keepFeatures: [
          '1.000 análisis/mes',
          'Historial completo',
          'Acceso API',
          'Exportar PDF/CSV',
          'Soporte prioritario',
        ],
        ctaButton: 'Suscribirse a Pro — 29€/mes →',
        question: '¿Tienes dudas? Responde simplemente a este email.',
      },

      limitReached: {
        subject: '{name}, has alcanzado tu límite 🔒',
        greeting: 'Hola {name},',
        body: 'Has utilizado el volumen disponible en tu cuenta. Si necesitas analizar más textos ahora, puedes comprar créditos o pasar a un plan con más capacidad.',
        offerTitle: '🎁 Oferta exclusiva — 30% de descuento',
        offerBody: 'Pasa al plan Starter (1.000 análisis/mes) o Student (200 análisis/mes) con un 30% de descuento en tu primer mes.',
        offerFeatures: [
          '1.000 análisis/mes — para profesores y consultores',
          'Exportación PDF/CSV incluida',
          'Historial completo de 30 días',
          'Soporte por email',
        ],
        couponCode: 'LIMITE30',
        ctaButton: 'Obtener -30% ahora →',
        footer: 'Oferta válida solo para el primer mes. Cancela en cualquier momento.',
      },

      trialEnded: {
        subject: '{name}, reactiva tu acceso a VeriTexto 🔓',
        title: '¡Te echamos de menos, {name}! 👋',
        body: 'Tu acceso sin saldo activo está pausado. Pero no te preocupes: tu cuenta y tu historial siguen ahí, esperándote.',
        offerTitle: '🎁 Oferta especial:',
        offerBody: 'Pasa a Pro en las próximas 48 horas y obtén un 50% de descuento en tu primer mes.',
        ctaButton: 'Aprovechar -50% →',
        question: 'O responde a este email si tienes dudas.',
      },
    },

    // API error messages
    errors: {
      unauthorized: 'No autorizado',
      dailyLimitReached: 'Límite diario alcanzado. Pasa al plan superior para más análisis.',
      noCredits: 'No te quedan créditos. Compra un paquete para continuar.',
      rateLimitRetry: 'Límite alcanzado. Inténtalo de nuevo en un momento.',
      textTooShort: 'El texto debe contener al menos 50 caracteres.',
      textTooLong: 'El texto no debe superar los 50.000 caracteres.',
      invalidPlan: 'Plan inválido o no configurado',
      internalError: 'Error interno',
      paymentError: 'Error de pago',
      billingError: 'Error de facturación',
      noSubscription: 'Ninguna suscripción encontrada',
      userNotFound: 'Usuario no encontrado',
      serviceUnavailable: 'Servicio temporalmente no disponible',
      demoLimitReached: 'Los análisis públicos están desactivados. Crea una cuenta y compra créditos para continuar.',
      demoTextTooLong: 'El texto no debe superar los 5.000 caracteres para esta vista previa.',
      analysisError: 'Error durante el análisis',
      emailAlreadySent: 'Email ya enviado',
    },

    // Plan details for emails
    planDetails: {
      pro: {
        name: 'Profesional',
        features: ['1.000 análisis/mes', 'Acceso API', 'Exportar PDF/CSV', 'Soporte por email', 'Historial 30 días'],
      },
      starter: {
        name: 'Profesor',
        features: ['1.000 análisis/mes', 'Integraciones LMS', 'Exportar PDF/CSV', 'Soporte por email', 'Historial 30 días'],
      },
      university: {
        name: 'Centro',
        features: ['10.000 análisis/mes', 'API ilimitada', 'Integración LMS', 'Panel admin', 'Soporte prioritario'],
      },
      enterprise: {
        name: 'Universidad',
        features: ['50.000 análisis/mes o volumen personalizado', 'Onboarding institucional', 'SSO e integraciones a medida', 'Gestor de cuenta', 'Propuesta comercial personalizada'],
      },
    },
  },
}

export default config
