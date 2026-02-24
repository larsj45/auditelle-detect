import type { ResellerConfig } from './types'

const config: ResellerConfig = {
  id: 'veritexto-es',

  // ── Branding ──────────────────────────────────────────────────────────────
  name: 'VeriTexto',
  domain: 'veritexto.es',
  logoColor: '/brands/veritexto/logo-color.svg',
  logoWhite: '/brands/veritexto/logo-white.svg',

  // ── Locale ────────────────────────────────────────────────────────────────
  locale: 'es_ES',
  htmlLang: 'es',
  currency: 'EUR',
  currencySymbol: '\u20ac',
  timezone: 'Europe/Madrid',

  // ── Legal ─────────────────────────────────────────────────────────────────
  legalEntity: 'VeriTexto S.L.',
  registrationNumber: 'PENDIENTE',
  registrationLabel: 'CIF',
  country: 'España',
  city: 'Madrid',
  dataProtectionLabel: 'RGPD',

  // ── Contact ───────────────────────────────────────────────────────────────
  supportEmail: 'hola@veritexto.com',
  noReplyEmail: 'noreply@veritexto.com',

  // ── Pricing ───────────────────────────────────────────────────────────────
  plans: {
    homepage: [
      {
        name: 'Gratuito',
        price: '0\u20ac',
        description: 'Descubre la precisión',
        features: [
          '10 análisis por mes',
          '1 usuario',
          'Puntuación IA 99,9% precisa',
          'Identificación del modelo',
          'Historial 7 días',
        ],
        cta: 'Comenzar',
        href: '/signup',
      },
      {
        name: 'Pro',
        price: '25\u20ac',
        period: 'mes',
        description: 'Para profesores y consultores',
        features: [
          '1.000 análisis por mes',
          '1 usuario',
          'API (500 llamadas)',
          'Exportar PDF/CSV',
          'Soporte por email',
        ],
        cta: 'Elegir Pro',
        href: '/signup?plan=pro',
        popular: true,
        popularBadge: 'POPULAR',
      },
      {
        name: 'Equipo',
        price: '99\u20ac',
        period: 'mes',
        description: 'Para un grupo de profesores',
        features: [
          '5.000 análisis por mes',
          'Hasta 5 profesores',
          'API (2.500 llamadas)',
          'Exportar PDF/CSV',
          'Soporte prioritario',
        ],
        cta: 'Elegir Equipo',
        href: '/signup?plan=equipe',
      },
      {
        name: 'Departamento',
        price: '249\u20ac',
        period: 'mes',
        description: 'Para departamentos y facultades',
        features: [
          '20.000 análisis por mes',
          'Hasta 20 profesores',
          'API ilimitada',
          'Integración LMS',
          'Panel de administrador',
        ],
        cta: 'Elegir Departamento',
        href: '/signup?plan=departement',
      },
      {
        name: 'Institución',
        price: 'Bajo pedido',
        description: 'Para instituciones completas',
        features: [
          'Análisis ilimitados',
          'Todos los profesores',
          'API white-label',
          'Account manager dedicado',
          'SLA 99,9%',
        ],
        cta: 'Contactarnos',
        href: '/contact',
      },
    ],
    upgrade: [
      {
        id: 'student',
        name: 'Estudiante',
        price: '4,99\u20ac',
        period: '/mes',
        description: 'Para estudiantes y doctorandos',
        features: [
          '100 análisis por mes',
          'Detección 99,9% precisión',
          'Exportar PDF',
          'Historial 7 días',
        ],
        badge: '\ud83c\udf93',
      },
      {
        id: 'starter',
        name: 'Starter',
        price: '29\u20ac',
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
        name: 'Universidad',
        price: '149\u20ac',
        period: '/mes',
        description: 'Para instituciones educativas',
        features: [
          '10.000 análisis por mes',
          'Múltiples usuarios',
          'API ilimitada',
          'Panel de administrador',
          'Soporte prioritario',
          'Informes personalizados',
        ],
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: '499\u20ac',
        period: '/mes',
        description: 'Para grandes organizaciones',
        features: [
          'Análisis ilimitados',
          'API dedicada',
          'Account manager dedicado',
          'SLA 99,9%',
          'Funciones a medida',
          'Facturación personalizada',
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
  },

  // ── SEO ───────────────────────────────────────────────────────────────────
  seo: {
    title: 'VeriTexto \u2014 El detector de IA más preciso del mercado',
    description: 'Detecta contenido generado por inteligencia artificial con una precisión del 99,9%. ChatGPT, Claude, Gemini y más. Verificación por terceros, tasa de falsos positivos casi nula.',
    keywords: ['detección IA', 'detector ChatGPT', 'detección plagio IA', 'integridad académica', 'VeriTexto'],
    ogTitle: 'VeriTexto \u2014 El detector de IA más preciso del mercado',
    ogDescription: 'Detecta contenido IA con una precisión del 99,9%. Resultados verificados por terceros.',
  },

  // ── Redirects ─────────────────────────────────────────────────────────────
  redirects: [
    { source: '/prueba-gratuita', destination: '/signup', permanent: false },
    { source: '/demo', destination: '/demo-video', permanent: false },
  ],

  // ── UI Strings ────────────────────────────────────────────────────────────
  strings: {
    // Navbar
    nav: {
      features: 'Características',
      pricing: 'Precios',
      dashboard: 'Panel de control',
      login: 'Iniciar sesión',
      freeTrial: 'Prueba gratis',
    },

    // Hero
    hero: {
      badge: '99,9% de precisión verificada',
      title: 'El detector de IA que ',
      titleAccent: 'realmente funciona',
      subtitle: 'Detecta ChatGPT, Claude, Gemini y más con una precisión inigualable. Verificado por la Universidad de Maryland. Tasa de falsos positivos casi nula.',
      trustBadges: [
        'Detección IA avanzada',
        'Verificado por terceros',
        'Prueba gratuita',
      ],
      ctaPrimary: 'Probar gratis \u2192',
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
          description: 'Envía tu contenido y obtén una puntuación precisa que indica si el texto es de origen humano o generado por IA.',
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
          description: 'Verificado independientemente por tener la tasa de falsos positivos más baja del mercado. 100% confiable.',
        },
        {
          icon: 'Globe',
          title: 'Multilingüe',
          description: 'Detección precisa en múltiples idiomas, incluyendo español, inglés, francés y alemán.',
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
          quote: 'Mis estudiantes están tan convencidos de su precisión que se ha convertido en el mejor elemento disuasorio.',
          author: 'Jarred Phillips',
          role: 'New Roads School',
        },
      ],
    },

    // Competitor comparison
    comparison: {
      title: '¿Por qué elegir VeriTexto?',
      subtitle: 'Compara las principales soluciones de detección IA',
      competitors: ['VeriTexto', 'GPTZero', 'Turnitin AI', 'Originality.ai'],
      rows: [
        { label: 'Precisión', values: ['99,9%', '~85%', '~80%', '~94%'] },
        { label: 'Tasa de falsos positivos', values: ['Casi nula', 'Alta', 'Moderada', 'Moderada'] },
        { label: 'Soporte en español', values: [true, false, false, false] },
        { label: 'Precio (desde)', values: ['Gratis', '$9.99/mes', 'Bajo pedido', '$14.95/mes'] },
        { label: 'Análisis por sección', values: [true, false, false, true] },
        { label: 'Identificación del modelo', values: [true, true, false, false] },
      ],
    },

    // Pricing (homepage section)
    pricing: {
      title: 'Precios transparentes y competitivos',
      subtitle: 'Tecnología Pangram Labs. Soporte en español. Comienza gratis, escala según tus necesidades.',
      footer: 'Tecnología Pangram \u2022 99,9% de precisión \u2022 Cumple RGPD \u2022 Soporte en español',
    },

    // CTA section
    cta: {
      title: '¿Listo para detectar contenido IA?',
      subtitle: 'Únete a miles de profesionales que confían en VeriTexto para proteger la integridad de sus contenidos.',
      button: 'Crear cuenta gratuita \u2192',
    },

    // Footer
    footer: {
      description: 'La solución líder en detección de texto generado por inteligencia artificial. Precisión inigualable, respeto a la privacidad, cumplimiento RGPD.',
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
      signupSubtitle: 'Comienza a detectar contenido IA gratis',
      signupSubtitlePlan: 'Crea tu cuenta para activar el plan {plan}',
      resetSubtitle: 'Introduce tu email para recibir un enlace de restablecimiento',
      fullName: 'Nombre completo',
      email: 'Email',
      password: 'Contraseña',
      emailPlaceholder: 'tu@email.com',
      namePlaceholder: 'María García',
      forgotPassword: '¿Olvidaste tu contraseña?',
      noAccount: '¿No tienes cuenta?',
      hasAccount: '¿Ya tienes cuenta?',
      backToLogin: 'Volver al inicio de sesión',
      loading: 'Cargando...',
      accountCreatedRedirect: '¡Cuenta creada! Redirigiendo al pago...',
      checkEmail: 'Revisa tu email para confirmar tu registro.',
      resetEmailSent: 'Se ha enviado un enlace de restablecimiento a tu dirección de email.',
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

      // History
      historyTitle: 'Historial de análisis',
      historyEmpty: 'Ningún análisis por el momento.',
      historyEmptyHint: 'Lanza tu primer análisis desde el panel de control.',
      historyLoading: 'Cargando\u2026',
      historyModel: 'Modelo',

      // Account
      accountTitle: 'Configuración de la cuenta',
      profileLabel: 'Perfil',
      nameLabel: 'Nombre',
      emailLabel: 'Email',
      subscriptionLabel: 'Suscripción',
      plan: 'Plan',
      upgradeToPro: 'Pasar a Pro',
      manageSubscription: 'Gestionar suscripción',
      managingSubscription: 'Cargando...',
      scansPerDay: {
        free: '5 análisis por día',
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
      upgradeContact: 'Contactarnos',
      upgradeChoose: 'Elegir {plan}',
      upgradeError: 'Error en el pago. Por favor, inténtalo de nuevo.',
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
      breakdown: 'Desglose del texto',
      aiGenerated: 'IA pura',
      aiAssisted: 'IA asistida',
      humanWritten: 'Humano',
      viewReport: 'Ver informe detallado',
    },

    // Hero demo
    heroDemo: {
      testNow: 'Pruébalo ahora',
      free: 'Gratis',
      placeholder: 'Pega tu texto aquí para un análisis instantáneo... (mín. 50 caracteres)',
      tryLabel: 'Prueba con:',
      humanButton: 'Humano',
      chatgptButton: 'ChatGPT',
      humanSample: 'Me encanta explorar nuevos lugares. Cada viaje me trae recuerdos únicos y perspectivas diferentes sobre el mundo.',
      chatgptSample: 'La inteligencia artificial representa un avance tecnológico importante que transforma numerosos sectores de nuestra sociedad moderna.',
      analyzingLabel: 'Analizando...',
      analyzingDetail: 'Detectando patrones IA con Pangram',
      scanner: '\ud83d\udd0d Analizar',
      createAccountFull: 'Crea una cuenta para el análisis completo',
      veryLikelyAI: 'Muy probablemente IA',
      possiblyAI: 'Posiblemente IA',
      probablyHuman: 'Probablemente humano',
      connectionError: 'Error de conexión',
      ctaButton: 'Crear cuenta gratuita \u2192',
      ctaTeaser: 'Desbloquea el análisis por sección, la identificación del modelo y más',
      unlockLabel: 'Crea una cuenta para desbloquear el análisis completo',
      scansRemaining: '{count} análisis gratuitos restantes hoy',
    },

    // File upload
    fileUpload: {
      dropOrBrowse: 'Arrastra un archivo o',
      browse: 'buscar',
      formats: 'PDF, DOCX, TXT \u2014 máx. 10 MB',
      extracting: 'Extrayendo\u2026',
      unsupported: 'Formato no soportado. Usa PDF, DOCX o TXT.',
      tooLarge: 'Archivo demasiado grande (máx. 10 MB).',
      extractError: 'No se pudo extraer el texto. Verifica que el archivo no esté protegido.',
    },

    // Contact page
    contact: {
      title: 'Contáctanos',
      subtitle: '¿Tienes alguna pregunta? ¿Un proyecto de integración? Nuestro equipo responde en 24h.',
      emailLabel: 'Email',
      companyName: 'VeriTexto S.L.',
      institutionCta: 'Universidades e Instituciones',
      institutionDescription: '¿Quieres integrar VeriTexto en tu institución? Contáctanos para un presupuesto personalizado y una demostración.',
      formFullName: 'Nombre completo *',
      formEmail: 'Email profesional *',
      formOrganization: 'Organización',
      formSubject: 'Asunto *',
      formMessage: 'Mensaje *',
      formSubmit: 'Enviar mensaje',
      formSending: 'Enviando...',
      formSuccess: '¡Gracias por tu mensaje!',
      formSuccessDetail: 'Te responderemos lo antes posible.',
      namePlaceholder: 'María García',
      emailPlaceholder: 'maria.garcia@universidad.es',
      orgPlaceholder: 'Universidad de Madrid',
      messagePlaceholder: 'Describe tu necesidad...',
      selectSubject: 'Selecciona un asunto',
      subjectOptions: [
        { value: 'Demostración', label: 'Solicitud de demostración' },
        { value: 'Presupuesto', label: 'Presupuesto universidad / institución' },
        { value: 'LMS', label: 'Integración LMS' },
        { value: 'Soporte', label: 'Soporte técnico' },
        { value: 'Colaboración', label: 'Colaboración' },
        { value: 'Otro', label: 'Otro' },
      ],
    },

    // Demo video page
    demoVideo: {
      title: 'Descubre VeriTexto en 5 minutos',
      subtitle: 'Mira cómo detectar contenido generado por IA con 99,9% de precisión',
      videoPlaceholder: 'Vídeo de demostración',
      videoSoon: 'Próximamente',
      readyCta: '¿Listo para probarlo?',
      readySubtitle: 'Crea tu cuenta gratuita y analiza hasta 10 textos por mes',
      readyButton: 'Comenzar la prueba gratuita \u2192',
      featureCards: [
        { emoji: '\ud83c\udfaf', title: '99,9% de precisión', description: 'Validada por la Universidad de Maryland' },
        { emoji: '\u26a1', title: 'Integración Moodle', description: 'Instalación en menos de 10 minutos' },
        { emoji: '\ud83c\uddea\ud83c\uddf8', title: '100% en español', description: 'RGPD, soporte y facturación ES' },
      ],
    },

    // Email templates
    emails: {
      headerName: 'VERITEXTO',
      legalFooter: '',

      welcome: {
        subject: '¡Bienvenido a VeriTexto, {name}! \ud83c\udf89',
        greeting: '¡Bienvenido, {name}! \ud83d\udc4b',
        intro: 'Gracias por crear tu cuenta en VeriTexto. Ahora tienes acceso al detector IA más preciso del mercado, verificado por la Universidad de Maryland.',
        trialTitle: '\ud83c\udf81 Tu prueba gratuita incluye:',
        trialFeatures: [
          '10 análisis por mes',
          'Precisión del 99,9%',
          'Identificación del modelo IA',
          'Historial de 7 días',
        ],
        ctaButton: 'Comenzar mi primer análisis \u2192',
        question: '¿Tienes preguntas? Responde directamente a este email.',
        ctaUrl: '/dashboard',
      },

      subscriptionConfirmed: {
        subject: '¡Tu suscripción {plan} está activa! \ud83d\ude80',
        greeting: '¡Gracias, {name}!',
        active: 'Tu suscripción {plan} está ahora activa.',
        planTitle: '\u2705 Tu plan incluye:',
        ctaButton: 'Acceder a mi panel \u2192',
        manageHint: 'Gestiona tu suscripción en la configuración de tu cuenta.',
      },

      upgradeReminder: {
        subject: '{name}, has utilizado el {percent}% de tus análisis \ud83d\udcca',
        title: '¡Estás usando bien VeriTexto! \ud83c\udfaf',
        body: '{name}, ya has utilizado el {percent}% de tus análisis gratuitos este mes.',
        upgradeTitle: '\ud83d\ude80 Pasa a Pro para:',
        upgradeFeatures: [
          '1.000 análisis/mes (en lugar de 10)',
          'Acceso API',
          'Exportar PDF/CSV',
          'Soporte prioritario',
        ],
        upgradePrice: 'Solo 25\u20ac/mes',
        ctaButton: 'Pasar a Pro \u2192',
      },

      trialExpiring: {
        subjects: {
          lastDay: '¡{name}, tu prueba gratuita termina hoy! \u23f0',
          urgent: '{name}, te quedan {days} días de prueba \u26a0\ufe0f',
          reminder: '{name}, tu prueba termina en {days} días \ud83d\udcc5',
        },
        titles: {
          lastDay: '¡Última oportunidad!',
          remaining: 'Quedan {days} días',
        },
        body: '{name}, tu prueba gratuita de VeriTexto termina en {days} días. No pierdas el acceso al detector IA más preciso del mercado.',
        bodyLastDay: '{name}, tu prueba gratuita de VeriTexto termina hoy. No pierdas el acceso al detector IA más preciso del mercado.',
        countdown: {
          today: 'HOY',
          days: '{days} DÍAS',
        },
        beforeEnd: 'antes de que termine tu prueba',
        keepTitle: '\ud83c\udfaf Lo que conservas con Pro:',
        keepFeatures: [
          '1.000 análisis/mes',
          'Historial completo',
          'Acceso API',
          'Exportar PDF/CSV',
          'Soporte prioritario',
        ],
        ctaButton: 'Pasar a Pro \u2014 25\u20ac/mes \u2192',
        question: '¿Tienes preguntas? Responde simplemente a este email.',
      },

      trialEnded: {
        subject: '{name}, tu prueba ha terminado \u2014 ¡pero aún estás a tiempo! \ud83d\udd13',
        title: '¡Te echamos de menos, {name}! \ud83d\udc4b',
        body: 'Tu prueba gratuita de VeriTexto ha terminado. Pero no te preocupes \u2014 tu cuenta y tu historial siguen ahí, esperándote.',
        offerTitle: '\ud83c\udf81 Oferta especial:',
        offerBody: 'Pasa a Pro en las próximas 48 horas y obtén un 50% de descuento en tu primer mes.',
        ctaButton: 'Aprovechar -50% \u2192',
        question: 'O responde a este email si tienes preguntas.',
      },
    },

    // API error messages
    errors: {
      unauthorized: 'No autorizado',
      dailyLimitReached: 'Límite diario alcanzado. Pasa al plan superior para más análisis.',
      rateLimitRetry: 'Límite alcanzado. Inténtalo de nuevo en un momento.',
      textTooShort: 'El texto debe contener al menos 50 caracteres.',
      textTooLong: 'El texto no debe superar los 50.000 caracteres.',
      invalidPlan: 'Plan no válido o no configurado',
      internalError: 'Error interno',
      paymentError: 'Error de pago',
      billingError: 'Error de facturación',
      noSubscription: 'No se encontró ninguna suscripción',
      userNotFound: 'Usuario no encontrado',
      serviceUnavailable: 'Servicio temporalmente no disponible',
      demoLimitReached: 'Límite alcanzado. Crea una cuenta gratuita para más análisis.',
      demoTextTooLong: 'El texto no debe superar los 5.000 caracteres para la prueba gratuita.',
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
        name: 'Starter',
        features: ['1.000 análisis/mes', 'Integraciones LMS', 'Exportar PDF/CSV', 'Soporte por email', 'Historial 30 días'],
      },
      university: {
        name: 'Universidad',
        features: ['10.000 análisis/mes', 'API ilimitada', 'Integración LMS', 'Panel admin', 'Soporte prioritario'],
      },
      enterprise: {
        name: 'Enterprise',
        features: ['Análisis ilimitados', 'API white-label', 'Account manager', 'SLA 99,9%', 'Funciones a medida'],
      },
    },
  },
}

export default config
