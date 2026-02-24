import type { ResellerConfig } from './types'

const config: ResellerConfig = {
  id: 'veritexto-pt',

  // ── Branding ──────────────────────────────────────────────────────────────
  name: 'VeriTexto',
  domain: 'veritexto.com.br',
  logoColor: '/brands/veritexto/logo-color.svg',
  logoWhite: '/brands/veritexto/logo-white.svg',

  // ── Locale ────────────────────────────────────────────────────────────────
  locale: 'pt_BR',
  htmlLang: 'pt',
  currency: 'BRL',
  currencySymbol: 'R$',
  timezone: 'America/Sao_Paulo',

  // ── Legal ─────────────────────────────────────────────────────────────────
  legalEntity: 'Learnbase Gestão e Consultoria Educacional S.A.',
  registrationNumber: '',
  registrationLabel: 'CNPJ',
  country: 'Brasil',
  city: 'São Paulo',
  dataProtectionLabel: 'LGPD',

  // ── Contact ───────────────────────────────────────────────────────────────
  supportEmail: 'contato@veritexto.com.br',
  noReplyEmail: 'noreply@veritexto.com.br',

  // ── Pricing ───────────────────────────────────────────────────────────────
  plans: {
    homepage: [
      {
        name: 'Gratuito',
        price: 'R$0',
        description: 'Descubra a precisão',
        features: [
          '10 análises por mês',
          '1 usuário',
          'Pontuação IA 99,9% precisa',
          'Identificação do modelo',
          'Histórico 7 dias',
        ],
        cta: 'Começar',
        href: '/signup',
      },
      {
        name: 'Pro',
        price: 'R$149',
        period: 'mês',
        description: 'Para professores e consultores',
        features: [
          '1.000 análises por mês',
          '1 usuário',
          'API (500 chamadas)',
          'Exportar PDF/CSV',
          'Suporte por email',
        ],
        cta: 'Escolher Pro',
        href: '/signup?plan=pro',
        popular: true,
        popularBadge: 'POPULAR',
      },
      {
        name: 'Equipe',
        price: 'R$549',
        period: 'mês',
        description: 'Para um grupo de professores',
        features: [
          '5.000 análises por mês',
          'Até 5 professores',
          'API (2.500 chamadas)',
          'Exportar PDF/CSV',
          'Suporte prioritário',
        ],
        cta: 'Escolher Equipe',
        href: '/signup?plan=equipe',
      },
      {
        name: 'Departamento',
        price: 'R$1.349',
        period: 'mês',
        description: 'Para departamentos e faculdades',
        features: [
          '20.000 análises por mês',
          'Até 20 professores',
          'API ilimitada',
          'Integração LMS',
          'Painel administrativo',
        ],
        cta: 'Escolher Departamento',
        href: '/signup?plan=departement',
      },
      {
        name: 'Instituição',
        price: 'Sob consulta',
        description: 'Para instituições completas',
        features: [
          'Análises ilimitadas',
          'Todos os professores',
          'API white-label',
          'Gerente de conta dedicado',
          'SLA 99,9%',
        ],
        cta: 'Fale conosco',
        href: '/contact',
      },
    ],
    upgrade: [
      {
        id: 'student',
        name: 'Estudante',
        price: 'R$24,90',
        period: '/mês',
        description: 'Para estudantes e doutorandos',
        features: [
          '100 análises por mês',
          'Detecção 99,9% de precisão',
          'Exportar PDF',
          'Histórico 7 dias',
        ],
        badge: '\ud83c\udf93',
      },
      {
        id: 'starter',
        name: 'Starter',
        price: 'R$149',
        period: '/mês',
        description: 'Para professores e consultores',
        features: [
          '1.000 análises por mês',
          'Integrações LMS (Moodle)',
          'Exportar PDF/CSV',
          'Suporte por email',
          'Histórico 30 dias',
        ],
        popular: true,
      },
      {
        id: 'university',
        name: 'Universidade',
        price: 'R$749',
        period: '/mês',
        description: 'Para instituições de ensino',
        features: [
          '10.000 análises por mês',
          'Múltiplos usuários',
          'API ilimitada',
          'Painel administrativo',
          'Suporte prioritário',
          'Relatórios personalizados',
        ],
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 'R$2.499',
        period: '/mês',
        description: 'Para grandes organizações',
        features: [
          'Análises ilimitadas',
          'API dedicada',
          'Gerente de conta dedicado',
          'SLA 99,9%',
          'Funcionalidades sob medida',
          'Faturamento personalizado',
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
    title: 'VeriTexto \u2014 Detecte Conteúdo Gerado por IA com 99,9% de Precisão',
    description: 'Detecte conteúdo gerado por inteligência artificial com 99,9% de precisão. ChatGPT, Claude, Gemini e mais. Verificação por terceiros, taxa de falsos positivos quase nula.',
    keywords: ['detecção IA', 'detector ChatGPT', 'detecção plágio IA', 'integridade acadêmica', 'VeriTexto'],
    ogTitle: 'VeriTexto \u2014 Detecte Conteúdo Gerado por IA com 99,9% de Precisão',
    ogDescription: 'Detecte conteúdo IA com 99,9% de precisão. Resultados verificados por terceiros.',
  },

  // ── Redirects ─────────────────────────────────────────────────────────────
  redirects: [
    { source: '/teste-gratis', destination: '/signup', permanent: false },
    { source: '/demo', destination: '/demo-video', permanent: false },
  ],

  // ── UI Strings ────────────────────────────────────────────────────────────
  strings: {
    // Navbar
    nav: {
      features: 'Funcionalidades',
      pricing: 'Planos',
      dashboard: 'Painel',
      login: 'Entrar',
      freeTrial: 'Teste grátis',
    },

    // Hero
    hero: {
      badge: '99,9% de precisão verificada',
      title: 'O detector de IA que ',
      titleAccent: 'realmente funciona',
      subtitle: 'Detecte ChatGPT, Claude, Gemini e mais com precisão incomparável. Verificado pela Universidade de Maryland. Taxa de falsos positivos quase nula.',
      trustBadges: [
        'Detecção IA avançada',
        'Verificado por terceiros',
        'Teste gratuito',
      ],
      ctaPrimary: 'Testar grátis \u2192',
      ctaSecondary: 'Como funciona',
    },

    // Trust bar
    trustBar: {
      label: 'Reconhecido pelos especialistas',
      names: ['University of Maryland', 'Chicago Booth', 'Stony Brook University', 'SOC2 Type 2'],
    },

    // Features
    features: {
      title: 'Tecnologia de detecção avançada',
      subtitle: '99,9% de precisão onde outros falham. Desenvolvida por pesquisadores de Stanford, Tesla e Google.',
      items: [
        {
          icon: 'Brain',
          title: 'Pontuação de probabilidade IA',
          description: 'Envie seu conteúdo e obtenha uma pontuação precisa indicando se o texto é de origem humana ou gerado por IA.',
        },
        {
          icon: 'FileSearch',
          title: 'Identificação do modelo',
          description: 'Detecte qual modelo foi utilizado: ChatGPT, Claude, Gemini, Llama, Perplexity e muitos outros.',
        },
        {
          icon: 'BarChart3',
          title: 'Análise por seção',
          description: 'Entenda se todo o texto é IA, humano ou uma combinação dos dois, seção por seção.',
        },
        {
          icon: 'Shield',
          title: 'Detecção de plágio',
          description: 'Busca em bilhões de páginas web, livros e artigos para detectar plágio além de IA.',
        },
        {
          icon: 'Zap',
          title: 'Falsos positivos quase nulos',
          description: 'Verificado independentemente por ter a menor taxa de falsos positivos do mercado. 100% confiável.',
        },
        {
          icon: 'Globe',
          title: 'Multilíngue',
          description: 'Detecção precisa em diversos idiomas, incluindo português, inglês, espanhol e alemão.',
        },
      ],
    },

    // How it works
    howItWorks: {
      title: 'Simples como 1, 2, 3',
      steps: [
        { title: 'Cole seu texto', description: 'Copie e cole o conteúdo a ser analisado em nossa interface intuitiva.' },
        { title: 'Inicie a análise', description: 'Nosso motor IA analisa cada frase em segundos.' },
        { title: 'Consulte o relatório', description: 'Obtenha uma pontuação detalhada com identificação do modelo e análise seção por seção.' },
      ],
    },

    // Testimonials
    testimonials: {
      title: 'O que dizem os especialistas',
      items: [
        {
          quote: 'Entre os detectores automáticos, este sistema supera significativamente todos os outros.',
          author: 'Jenna Russell',
          role: 'University of Maryland',
        },
        {
          quote: 'Um detector quase sobrenaturalmente bom. Ainda não vi nenhum falso positivo ou falso negativo.',
          author: 'Ryan Nicolace',
          role: 'Cloud Architect',
        },
        {
          quote: 'Meus alunos estão tão convencidos de sua precisão que se tornou o melhor elemento dissuasor.',
          author: 'Jarred Phillips',
          role: 'New Roads School',
        },
      ],
    },

    // Competitor comparison
    comparison: {
      title: 'Por que escolher o VeriTexto?',
      subtitle: 'Compare as principais soluções de detecção IA',
      competitors: ['VeriTexto', 'GPTZero', 'Turnitin AI', 'Originality.ai'],
      rows: [
        { label: 'Precisão', values: ['99,9%', '~85%', '~80%', '~94%'] },
        { label: 'Taxa de falsos positivos', values: ['Quase nula', 'Alta', 'Moderada', 'Moderada'] },
        { label: 'Suporte em português', values: [true, false, false, false] },
        { label: 'Preço (a partir de)', values: ['Grátis', '$9.99/mês', 'Sob consulta', '$14.95/mês'] },
        { label: 'Análise por seção', values: [true, false, false, true] },
        { label: 'Identificação do modelo', values: [true, true, false, false] },
      ],
    },

    // Pricing (homepage section)
    pricing: {
      title: 'Preços transparentes e competitivos',
      subtitle: 'Tecnologia Pangram Labs. Suporte em português. Comece grátis, escale conforme sua necessidade.',
      footer: 'Tecnologia Pangram \u2022 99,9% de precisão \u2022 Conformidade LGPD \u2022 Suporte em português',
    },

    // CTA section
    cta: {
      title: 'Pronto para detectar conteúdo IA?',
      subtitle: 'Junte-se a milhares de profissionais que confiam no VeriTexto para proteger a integridade de seus conteúdos.',
      button: 'Criar conta gratuita \u2192',
    },

    // Footer
    footer: {
      description: 'A solução brasileira de detecção de texto gerado por inteligência artificial. Precisão incomparável, conformidade LGPD. Uma solução Learnbase.',
      productLabel: 'Produto',
      companyLabel: 'Empresa',
      contactLabel: 'Contato',
      copyright: 'Todos os direitos reservados.',
      poweredBy: 'Detecção desenvolvida por',
      poweredByName: 'Pangram Labs',
    },

    // Auth
    auth: {
      login: 'Entrar',
      signup: 'Criar conta',
      resetPassword: 'Redefinir senha',
      loginSubtitle: 'Acesse seu painel de detecção IA',
      loginSubtitlePlan: 'Entre para ativar o plano {plan}',
      signupSubtitle: 'Comece a detectar conteúdo IA gratuitamente',
      signupSubtitlePlan: 'Crie sua conta para ativar o plano {plan}',
      resetSubtitle: 'Digite seu email para receber um link de redefinição',
      fullName: 'Nome completo',
      email: 'Email',
      password: 'Senha',
      emailPlaceholder: 'voce@email.com.br',
      namePlaceholder: 'João Silva',
      forgotPassword: 'Esqueceu a senha?',
      noAccount: 'Não tem conta?',
      hasAccount: 'Já tem conta?',
      backToLogin: 'Voltar ao login',
      loading: 'Carregando...',
      accountCreatedRedirect: 'Conta criada! Redirecionando para o pagamento...',
      checkEmail: 'Verifique seu email para confirmar seu cadastro.',
      resetEmailSent: 'Um link de redefinição foi enviado para seu endereço de email.',
    },

    // Dashboard
    dashboard: {
      detection: 'Detecção',
      history: 'Histórico',
      account: 'Conta',
      signOut: 'Sair',
      analyzerTitle: 'Analisador de conteúdo IA',
      analyzerSubtitle: 'Cole seu texto para detectar conteúdo gerado por IA',
      textareaPlaceholder: 'Cole aqui o texto a ser analisado (mínimo 50 caracteres)...',
      characters: 'caracteres',
      analyze: 'Analisar',
      analyzing: 'Analisando...',
      scansRemaining: 'análises restantes',
      subscriptionActivated: 'Assinatura ativada com sucesso!',
      subscriptionActivatedDetail: 'Suas análises adicionais já estão disponíveis.',
      minCharsError: 'Por favor, insira pelo menos 50 caracteres para uma análise confiável.',

      // History
      historyTitle: 'Histórico de análises',
      historyEmpty: 'Nenhuma análise por enquanto.',
      historyEmptyHint: 'Faça sua primeira análise no painel.',
      historyLoading: 'Carregando\u2026',
      historyModel: 'Modelo',

      // Account
      accountTitle: 'Configurações da conta',
      profileLabel: 'Perfil',
      nameLabel: 'Nome',
      emailLabel: 'Email',
      subscriptionLabel: 'Assinatura',
      plan: 'Plano',
      upgradeToPro: 'Assinar Pro',
      manageSubscription: 'Gerenciar assinatura',
      managingSubscription: 'Carregando...',
      scansPerDay: {
        free: '5 análises por dia',
        pro: '100 análises por dia',
        default: 'Análises ilimitadas',
      },

      // Upgrade
      upgradeTitle: 'Escolha seu plano',
      upgradeSubtitle: 'Todos os planos incluem detecção IA com 99,9% de precisão.',
      upgradeBack: 'Voltar à conta',
      upgradePopular: 'POPULAR',
      upgradeFooter: 'Todos os planos são cobrados mensalmente. Cancelamento possível a qualquer momento. Pagamento seguro via Stripe.',
      upgradeLoading: 'Carregando...',
      upgradeContact: 'Fale conosco',
      upgradeChoose: 'Escolher {plan}',
      upgradeError: 'Erro no pagamento. Por favor, tente novamente.',
    },

    // Detection results
    results: {
      probablyHuman: 'Provavelmente humano',
      mixed: 'Misto / Incerto',
      probablyAI: 'Provavelmente IA',
      aiScore: 'Pontuação IA',
      aiProbability: 'Probabilidade de conteúdo gerado por IA: {score}%',
      classification: 'Classificação',
      sectionAnalysis: 'Análise por seção',
      aiPercent: '{score}% IA',
      breakdown: 'Distribuição do texto',
      aiGenerated: 'IA pura',
      aiAssisted: 'IA assistida',
      humanWritten: 'Humano',
      viewReport: 'Ver relatório detalhado',
    },

    // Hero demo
    heroDemo: {
      testNow: 'Teste agora',
      free: 'Grátis',
      placeholder: 'Cole seu texto aqui para uma análise instantânea... (mín. 50 caracteres)',
      tryLabel: 'Experimente:',
      humanButton: 'Humano',
      chatgptButton: 'ChatGPT',
      humanSample: 'Adoro explorar novos lugares. Cada viagem me traz memórias únicas e perspectivas diferentes sobre o mundo.',
      chatgptSample: 'A inteligência artificial representa um avanço tecnológico importante que transforma diversos setores da nossa sociedade moderna.',
      analyzingLabel: 'Analisando...',
      analyzingDetail: 'Detectando padrões IA com Pangram',
      scanner: '\ud83d\udd0d Analisar',
      createAccountFull: 'Crie uma conta para a análise completa',
      veryLikelyAI: 'Muito provavelmente IA',
      possiblyAI: 'Possivelmente IA',
      probablyHuman: 'Provavelmente humano',
      connectionError: 'Erro de conexão',
      ctaButton: 'Criar conta gratuita \u2192',
      ctaTeaser: 'Desbloqueie a análise por seção, a identificação do modelo e mais',
      unlockLabel: 'Crie uma conta para desbloquear a análise completa',
      scansRemaining: '{count} análises gratuitas restantes hoje',
    },

    // File upload
    fileUpload: {
      dropOrBrowse: 'Arraste um arquivo ou',
      browse: 'procurar',
      formats: 'PDF, DOCX, TXT \u2014 máx. 10 MB',
      extracting: 'Extraindo\u2026',
      unsupported: 'Formato não suportado. Use PDF, DOCX ou TXT.',
      tooLarge: 'Arquivo muito grande (máx. 10 MB).',
      extractError: 'Não foi possível extrair o texto. Verifique se o arquivo não está protegido.',
    },

    // Contact page
    contact: {
      title: 'Fale conosco',
      subtitle: 'Alguma dúvida? Um projeto de integração? Nossa equipe responde em 24h.',
      emailLabel: 'Email',
      companyName: 'Learnbase Gestão e Consultoria Educacional S.A.',
      institutionCta: 'Universidades e Instituições',
      institutionDescription: 'Deseja integrar o VeriTexto em sua instituição? Entre em contato para um orçamento personalizado e uma demonstração.',
      formFullName: 'Nome completo *',
      formEmail: 'Email profissional *',
      formOrganization: 'Organização',
      formSubject: 'Assunto *',
      formMessage: 'Mensagem *',
      formSubmit: 'Enviar mensagem',
      formSending: 'Enviando...',
      formSuccess: 'Obrigado pela sua mensagem!',
      formSuccessDetail: 'Responderemos o mais breve possível.',
      namePlaceholder: 'João Silva',
      emailPlaceholder: 'joao.silva@universidade.br',
      orgPlaceholder: 'Universidade de São Paulo',
      messagePlaceholder: 'Descreva sua necessidade...',
      selectSubject: 'Selecione um assunto',
      subjectOptions: [
        { value: 'Demonstração', label: 'Solicitar demonstração' },
        { value: 'Orçamento', label: 'Orçamento universidade / instituição' },
        { value: 'LMS', label: 'Integração LMS' },
        { value: 'Suporte', label: 'Suporte técnico' },
        { value: 'Parceria', label: 'Parceria' },
        { value: 'Outro', label: 'Outro' },
      ],
    },

    // Demo video page
    demoVideo: {
      title: 'Conheça o VeriTexto em 5 minutos',
      subtitle: 'Veja como detectar conteúdo gerado por IA com 99,9% de precisão',
      videoPlaceholder: 'Vídeo de demonstração',
      videoSoon: 'Em breve',
      readyCta: 'Pronto para testar?',
      readySubtitle: 'Crie sua conta gratuita e analise até 10 textos por mês',
      readyButton: 'Começar o teste gratuito \u2192',
      featureCards: [
        { emoji: '\ud83c\udfaf', title: '99,9% de precisão', description: 'Validada pela Universidade de Maryland' },
        { emoji: '\u26a1', title: 'Integração Moodle', description: 'Instalação em menos de 10 minutos' },
        { emoji: '\ud83c\udde7\ud83c\uddf7', title: '100% em português', description: 'LGPD, suporte e faturamento BR' },
      ],
    },

    // Email templates
    emails: {
      headerName: 'VERITEXTO',
      legalFooter: '',

      welcome: {
        subject: 'Bem-vindo ao VeriTexto, {name}! \ud83c\udf89',
        greeting: 'Bem-vindo, {name}! \ud83d\udc4b',
        intro: 'Obrigado por criar sua conta no VeriTexto. Agora você tem acesso ao detector IA mais preciso do mercado, verificado pela Universidade de Maryland.',
        trialTitle: '\ud83c\udf81 Seu teste gratuito inclui:',
        trialFeatures: [
          '10 análises por mês',
          'Precisão de 99,9%',
          'Identificação do modelo IA',
          'Histórico de 7 dias',
        ],
        ctaButton: 'Começar minha primeira análise \u2192',
        question: 'Tem dúvidas? Responda diretamente a este email.',
        ctaUrl: '/dashboard',
      },

      subscriptionConfirmed: {
        subject: 'Sua assinatura {plan} está ativa! \ud83d\ude80',
        greeting: 'Obrigado, {name}!',
        active: 'Sua assinatura {plan} está agora ativa.',
        planTitle: '\u2705 Seu plano inclui:',
        ctaButton: 'Acessar meu painel \u2192',
        manageHint: 'Gerencie sua assinatura nas configurações da sua conta.',
      },

      upgradeReminder: {
        subject: '{name}, você usou {percent}% das suas análises \ud83d\udcca',
        title: 'Você está usando bem o VeriTexto! \ud83c\udfaf',
        body: '{name}, você já usou {percent}% das suas análises gratuitas neste mês.',
        upgradeTitle: '\ud83d\ude80 Passe para o Pro para:',
        upgradeFeatures: [
          '1.000 análises/mês (ao invés de 10)',
          'Acesso API',
          'Exportar PDF/CSV',
          'Suporte prioritário',
        ],
        upgradePrice: 'Apenas R$149/mês',
        ctaButton: 'Assinar Pro \u2192',
      },

      trialExpiring: {
        subjects: {
          lastDay: '{name}, seu teste gratuito termina hoje! \u23f0',
          urgent: '{name}, restam {days} dias de teste \u26a0\ufe0f',
          reminder: '{name}, seu teste termina em {days} dias \ud83d\udcc5',
        },
        titles: {
          lastDay: 'Última chance!',
          remaining: 'Restam {days} dias',
        },
        body: '{name}, seu teste gratuito do VeriTexto termina em {days} dias. Não perca o acesso ao detector IA mais preciso do mercado.',
        bodyLastDay: '{name}, seu teste gratuito do VeriTexto termina hoje. Não perca o acesso ao detector IA mais preciso do mercado.',
        countdown: {
          today: 'HOJE',
          days: '{days} DIAS',
        },
        beforeEnd: 'antes do fim do seu teste',
        keepTitle: '\ud83c\udfaf O que você mantém com o Pro:',
        keepFeatures: [
          '1.000 análises/mês',
          'Histórico completo',
          'Acesso API',
          'Exportar PDF/CSV',
          'Suporte prioritário',
        ],
        ctaButton: 'Assinar Pro \u2014 R$149/mês \u2192',
        question: 'Tem dúvidas? Responda simplesmente a este email.',
      },

      trialEnded: {
        subject: '{name}, seu teste terminou \u2014 mas ainda dá tempo! \ud83d\udd13',
        title: 'Sentimos sua falta, {name}! \ud83d\udc4b',
        body: 'Seu teste gratuito do VeriTexto terminou. Mas não se preocupe \u2014 sua conta e seu histórico ainda estão lá, esperando por você.',
        offerTitle: '\ud83c\udf81 Oferta especial:',
        offerBody: 'Assine o Pro nas próximas 48 horas e ganhe 50% de desconto no primeiro mês.',
        ctaButton: 'Aproveitar -50% \u2192',
        question: 'Ou responda a este email se tiver dúvidas.',
      },
    },

    // API error messages
    errors: {
      unauthorized: 'Não autorizado',
      dailyLimitReached: 'Limite diário atingido. Passe para o plano superior para mais análises.',
      rateLimitRetry: 'Limite atingido. Tente novamente em um momento.',
      textTooShort: 'O texto deve conter pelo menos 50 caracteres.',
      textTooLong: 'O texto não deve ultrapassar 50.000 caracteres.',
      invalidPlan: 'Plano inválido ou não configurado',
      internalError: 'Erro interno',
      paymentError: 'Erro no pagamento',
      billingError: 'Erro de faturamento',
      noSubscription: 'Nenhuma assinatura encontrada',
      userNotFound: 'Usuário não encontrado',
      serviceUnavailable: 'Serviço temporariamente indisponível',
      demoLimitReached: 'Limite atingido. Crie uma conta gratuita para mais análises.',
      demoTextTooLong: 'O texto não deve ultrapassar 5.000 caracteres para o teste gratuito.',
      analysisError: 'Erro durante a análise',
      emailAlreadySent: 'Email já enviado',
    },

    // Plan details for emails
    planDetails: {
      pro: {
        name: 'Profissional',
        features: ['1.000 análises/mês', 'Acesso API', 'Exportar PDF/CSV', 'Suporte por email', 'Histórico 30 dias'],
      },
      starter: {
        name: 'Starter',
        features: ['1.000 análises/mês', 'Integrações LMS', 'Exportar PDF/CSV', 'Suporte por email', 'Histórico 30 dias'],
      },
      university: {
        name: 'Universidade',
        features: ['10.000 análises/mês', 'API ilimitada', 'Integração LMS', 'Painel admin', 'Suporte prioritário'],
      },
      enterprise: {
        name: 'Enterprise',
        features: ['Análises ilimitadas', 'API white-label', 'Gerente de conta', 'SLA 99,9%', 'Funcionalidades sob medida'],
      },
    },
  },
}

export default config
