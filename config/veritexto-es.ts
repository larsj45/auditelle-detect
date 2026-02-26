import type { ResellerConfig } from './types'

const config: ResellerConfig = {
  id: 'veritexto-es',

  // ── Branding ──────────────────────────────────────────────────────────────
  name: 'VeriTexto',
  domain: 'veritexto.es',
  logoColor: '/brands/veritexto-es/logo-color.svg',
  logoWhite: '/brands/veritexto-es/logo-white.svg',
  logoHeight: '2.5rem',

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
        name: 'Gratuito',
        price: '0€',
        description: 'Descubre la precisión',
        features: [
          '10 análisis por mes',
          '1 usuario',
          'Puntuación IA 99,9% precisa',
          'Identificación del modelo',
          'Historial 7 días',
        ],
        cta: 'Empezar',
        href: '/signup',
      },
      {
        name: 'Pro',
        price: '29€',
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
        price: '149€',
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
        price: '399€',
        period: 'mes',
        description: 'Para departamentos y facultades',
        features: [
          '15.000 análisis por mes',
          'Hasta 20 profesores',
          'API ilimitada',
          'Integración LMS',
          'Panel de administración',
        ],
        cta: 'Elegir Departamento',
        href: '/signup?plan=departement',
      },
      {
        name: 'Institución',
        price: 'Bajo consulta',
        description: 'Para instituciones completas',
        features: [
          'Análisis ilimitados',
          'Todos los profesores',
          'API white-label',
          'Gestor de cuenta dedicado',
          'SLA 99,9%',
        ],
        cta: 'Contáctenos',
        href: '/contact',
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
        name: 'Starter',
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
        name: 'Universidad',
        price: '299€',
        period: '/mes',
        description: 'Para instituciones educativas',
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
        name: 'Enterprise',
        price: '799€',
        period: '/mes',
        description: 'Para grandes organizaciones',
        features: [
          '50.000 análisis por mes',
          'API dedicada',
          'Gestor de cuenta dedicado',
          'SLA 99,9%',
          'Funcionalidades a medida',
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
    plagiarismDetection: true,
  },

  // ── SEO ───────────────────────────────────────────────────────────────────
  seo: {
    title: 'VeriTexto — Detecta Contenido Generado por IA con 99,9% de Precisión',
    description: 'Detecta contenido generado por inteligencia artificial con 99,9% de precisión. ChatGPT, Claude, Gemini y más. Verificación por terceros, tasa de falsos positivos casi nula.',
    keywords: ['detección IA', 'detector ChatGPT', 'detección plagio IA', 'integridad académica', 'VeriTexto'],
    ogTitle: 'VeriTexto — Detecta Contenido Generado por IA con 99,9% de Precisión',
    ogDescription: 'Detecta contenido IA con 99,9% de precisión. Resultados verificados por terceros.',
  },

  // ── Redirects ─────────────────────────────────────────────────────────────
  redirects: [
    { source: '/prueba-gratis', destination: '/signup', permanent: false },
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
      freeTrial: 'Prueba gratis',
    },

    // Hero
    hero: {
      badge: '99,9% de precisión verificada',
      title: 'El detector de IA que ',
      titleAccent: 'realmente funciona',
      subtitle: 'Detecta ChatGPT, Claude, Gemini y más con una precisión incomparable. Verificado por la Universidad de Maryland. Tasa de falsos positivos casi nula.',
      trustBadges: [
        'Detección IA avanzada',
        'Verificado por terceros',
        'Prueba gratuita',
      ],
      ctaPrimary: 'Probar gratis →',
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
      title: '¿Por qué elegir VeriTexto?',
      subtitle: 'Compara las principales soluciones de detección IA',
      competitors: ['VeriTexto', 'GPTZero', 'Turnitin AI', 'Originality.ai'],
      rows: [
        { label: 'Precisión', values: ['99,9%', '~85%', '~80%', '~94%'] },
        { label: 'Tasa de falsos positivos', values: ['Casi nula', 'Alta', 'Moderada', 'Moderada'] },
        { label: 'Soporte en español', values: [true, false, false, false] },
        { label: 'Precio (desde)', values: ['Gratis', '$9.99/mes', 'Bajo consulta', '$14.95/mes'] },
        { label: 'Análisis por sección', values: [true, false, false, true] },
        { label: 'Identificación del modelo', values: [true, true, false, false] },
      ],
    },

    // Pricing (homepage section)
    pricing: {
      title: 'Precios transparentes y competitivos',
      subtitle: 'Tecnología Pangram Labs. Soporte en español. Empieza gratis, escala según tu necesidad.',
      footer: 'Tecnología Pangram • 99,9% de precisión • Conforme RGPD • Soporte en español',
    },

    // CTA section
    cta: {
      title: '¿Listo para detectar contenido IA?',
      subtitle: 'Únete a miles de profesionales que confían en VeriTexto para proteger la integridad de sus contenidos.',
      button: 'Crear cuenta gratuita →',
    },

    // Footer
    footer: {
      description: 'La solución en español para la detección de texto generado por inteligencia artificial. Precisión incomparable, conformidad RGPD.',
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
      signupSubtitle: 'Empieza a detectar contenido IA gratuitamente',
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
      upgradeContact: 'Contáctenos',
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
      breakdown: 'Distribución del texto',
      aiGenerated: 'IA pura',
      aiAssisted: 'IA asistida',
      humanWritten: 'Humano',
      viewReport: 'Ver informe detallado',
    },

    // Hero demo
    heroDemo: {
      testNow: 'Prueba ahora',
      free: 'Gratis',
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
      ctaButton: 'Crear cuenta gratuita →',
      ctaTeaser: 'Desbloquea el análisis por sección, la identificación del modelo y más',
      unlockLabel: 'Crea una cuenta para desbloquear el análisis completo',
      scansRemaining: '{count} análisis gratuitos restantes hoy',
    },

    // Plagiarism detection
    plagiarism: {
      modeAI: 'Detección IA',
      modePlagiarism: 'Detección de plagio',
      noPlagiarism: 'Ningún plagio detectado',
      plagiarismFound: 'Plagio detectado',
      percentPlagiarized: '{score}% de plagio detectado',
      sourcesFound: '{count} fuente(s) encontrada(s)',
      sourceLabel: 'Fuente',
      matchedText: 'Texto correspondiente',
      similarity: 'Similitud',
      analyzePlagiarism: 'Verificar plagio',
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
      readyCta: '¿Listo para probar?',
      readySubtitle: 'Crea tu cuenta gratuita y analiza hasta 10 textos al mes',
      readyButton: 'Comenzar la prueba gratuita →',
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
        trialTitle: '🎁 Tu prueba gratuita incluye:',
        trialFeatures: [
          '10 análisis por mes',
          'Precisión del 99,9%',
          'Identificación del modelo IA',
          'Historial de 7 días',
        ],
        ctaButton: 'Comenzar mi primer análisis →',
        question: '¿Tienes dudas? Responde directamente a este email.',
        ctaUrl: '/dashboard',
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
        body: '{name}, ya has usado {percent}% de tus análisis gratuitos este mes.',
        upgradeTitle: '🚀 Pasa a Pro para:',
        upgradeFeatures: [
          '1.000 análisis/mes (en lugar de 10)',
          'Acceso API',
          'Exportar PDF/CSV',
          'Soporte prioritario',
        ],
        upgradePrice: 'Solo 29€/mes',
        ctaButton: 'Suscribirse a Pro →',
      },

      trialExpiring: {
        subjects: {
          lastDay: '¡{name}, tu prueba gratuita termina hoy! ⏰',
          urgent: '{name}, quedan {days} días de prueba ⚠️',
          reminder: '{name}, tu prueba termina en {days} días 📅',
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
        beforeEnd: 'antes del fin de tu prueba',
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

      trialEnded: {
        subject: '{name}, tu prueba ha terminado — ¡pero aún estás a tiempo! 🔓',
        title: '¡Te echamos de menos, {name}! 👋',
        body: 'Tu prueba gratuita de VeriTexto ha terminado. Pero no te preocupes — tu cuenta y tu historial siguen ahí, esperándote.',
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
        features: ['50.000 análisis/mes', 'API white-label', 'Gestor de cuenta', 'SLA 99,9%', 'Funcionalidades a medida'],
      },
    },
  },
}

export default config
