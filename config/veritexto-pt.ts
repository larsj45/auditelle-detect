import type { ResellerConfig } from './types'

const config: ResellerConfig = {
  id: 'veritexto-pt',

  // ── Branding ──────────────────────────────────────────────────────────────
  name: 'VeriTexto',
  domain: 'veritexto.com.br',
  logoColor: '/brands/veritexto/logo-color.svg',
  logoWhite: '/brands/veritexto/logo-white.svg',
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
  locale: 'pt_BR',
  htmlLang: 'pt',
  currency: 'BRL',
  currencySymbol: 'R$',
  timezone: 'America/Sao_Paulo',
  creditPricePerScanMinor: 50,

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
        name: 'Créditos avulsos',
        price: 'R$4,90',
        period: 'pacote',
        description: 'Entrada barata, sem mensalidade',
        features: [
          'Pacotes de 5, 20 ou 100 créditos',
          'Créditos sem expiração',
          'IA, similaridade ou análise completa',
          'Pontuação IA 99,9% precisa',
          'Ideal para professor e orientador',
        ],
        cta: 'Criar conta e comprar créditos',
        href: '/signup?next=credits',
      },
      {
        name: 'Professor',
        price: 'R$239',
        period: 'mês',
        description: 'Para professores, orientadores e consultores',
        features: [
          '1.000 análises por mês',
          '1 usuário',
          'Integrações LMS (Moodle)',
          'Exportar PDF/CSV',
          'Histórico 30 dias',
        ],
        cta: 'Assinar plano Professor',
        href: '/signup?plan=starter',
        popular: true,
        popularBadge: 'MAIS ESCOLHIDO',
      },
      {
        name: 'Escola',
        price: 'R$1.799',
        period: 'mês',
        description: 'Para coordenações, escolas e polos',
        features: [
          '10.000 análises por mês',
          'Múltiplos usuários',
          'API ilimitada',
          'Painel administrativo',
          'Exportar PDF/CSV',
          'Suporte prioritário',
        ],
        cta: 'Assinar plano Escola',
        href: '/signup?plan=university',
      },
      {
        name: 'Universidade',
        price: 'Sob consulta',
        description: 'Para faculdades, centros universitários e redes',
        features: [
          '50.000 análises/mês ou volume customizado',
          'Onboarding institucional',
          'SSO e integrações sob demanda',
          'Integração LMS',
          'Gerente de conta dedicado',
        ],
        cta: 'Solicitar proposta',
        href: '/contact?subject=Plano%20Universidade',
      },
    ],
    upgrade: [
      {
        id: 'student',
        name: 'Estudante',
        price: 'R$59,90',
        period: '/mês',
        description: 'Para estudantes e doutorandos',
        features: [
          '200 análises por mês',
          'Detecção 99,9% de precisão',
          'Exportar PDF',
          'Histórico 7 dias',
        ],
        badge: '\ud83c\udf93',
      },
      {
        id: 'starter',
        name: 'Professor',
        price: 'R$239',
        period: '/mês',
        description: 'Para professores, orientadores e consultores',
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
        name: 'Escola',
        price: 'R$1.799',
        period: '/mês',
        description: 'Para coordenações, escolas e polos',
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
        name: 'Universidade',
        price: 'Sob consulta',
        period: '',
        description: 'Para faculdades, centros universitários e redes',
        features: [
          '50.000 análises/mês ou volume customizado',
          'Onboarding institucional',
          'SSO e integrações sob demanda',
          'Integração LMS',
          'Gerente de conta dedicado',
          'Proposta comercial personalizada',
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
      description: 'Pacote inicial para uma revisão rápida',
      icon: '🔍',
    },
    {
      id: '20',
      quantity: 20,
      totalPriceMinor: 1490,
      label: '20 créditos',
      description: 'Ideal para corrigir uma turma pequena',
      popular: true,
      icon: '📚',
    },
    {
      id: '100',
      quantity: 100,
      totalPriceMinor: 4990,
      label: '100 créditos',
      description: 'Melhor custo por crédito para uso recorrente',
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
    title: 'VeriTexto — Detecção de IA e plágio para educação',
    description: 'Detecção de IA e plágio para professores, escolas e universidades com relatórios exportáveis, checkout em reais e suporte em português.',
    keywords: ['detecção IA', 'detector ChatGPT', 'detecção plágio IA', 'integridade acadêmica', 'VeriTexto'],
    ogTitle: 'VeriTexto — Detecção de IA e plágio em português',
    ogDescription: 'Detecção de IA + plágio com relatórios claros, suporte local e precisão verificada.',
  },

  // ── Redirects ─────────────────────────────────────────────────────────────
  redirects: [
    { source: '/teste-gratis', destination: '/signup?next=credits', permanent: false },
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
      freeTrial: 'Comprar créditos',
    },

    // Hero
    hero: {
      badge: 'Feito para o mercado educacional brasileiro',
      title: 'A plataforma de integridade acadêmica que ',
      titleAccent: 'detecta IA e plágio',
      subtitle: 'O VeriTexto reúne detecção de IA, plágio, identificação do modelo e relatórios exportáveis em uma plataforma pensada para escolas, universidades e equipes no Brasil.',
      trustBadges: [
        'IA + plágio',
        'Créditos a partir de R$0,50',
        'Suporte em português',
      ],
      ctaPrimary: 'Criar conta e comprar créditos \u2192',
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
      title: 'Compare as principais soluções de integridade acadêmica',
      subtitle: 'Veja lado a lado como VeriTexto, GPTZero, Turnitin e Originality.ai se posicionam para análise de IA e plágio.',
      competitors: ['VeriTexto', 'GPTZero', 'Turnitin', 'Originality.ai'],
      rows: [
        { label: 'Precisão', values: ['99,9%', '~85%', '~80%', '~94%'] },
        { label: 'Taxa de falsos positivos', values: ['Quase nula', 'Alta', 'Moderada', 'Moderada'] },
        { label: 'IA + plágio no mesmo relatório', values: [true, false, true, true] },
        { label: 'Suporte em português', values: [true, false, false, false] },
        { label: 'Modelo comercial', values: ['Créditos + mensalidade', 'Plano individual', 'Cotação institucional', 'Em dólar'] },
        { label: 'Análise por seção', values: [true, false, false, true] },
        { label: 'Identificação do modelo', values: [true, true, false, false] },
      ],
    },

    // Pricing (homepage section)
    pricing: {
      title: 'Planos para professor, escola e universidade',
      subtitle: 'Entrada rápida com créditos avulsos, assinatura mensal para docentes e implantação institucional para escolas e universidades.',
      footer: 'Créditos avulsos a partir de R$0,50 por crédito • 99,9% de precisão • Conformidade LGPD • Suporte em português',
    },

    // CTA section
    cta: {
      title: 'Precisa analisar IA e plágio com menos atrito comercial?',
      subtitle: 'Crie sua conta, compre créditos avulsos e analise IA e plágio em um relatório claro, exportável e adaptado ao mercado brasileiro.',
      button: 'Criar conta e comprar créditos \u2192',
    },

    // Footer
    footer: {
      description: 'A solução em português de integridade acadêmica para detectar IA, plágio e conteúdos suspeitos com conformidade LGPD. Uma solução Learnbase.',
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
      signupSubtitle: 'Crie sua conta para comprar créditos ou ativar um plano',
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
      googleSignIn: 'Continuar com o Google',
      orDivider: 'ou',
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

      // Onboarding
      onboardingTitle: 'Bem-vindo ao VeriTexto! 👋',
      onboardingBody: 'Cole um texto abaixo para verificar se foi gerado por IA — ou experimente com um exemplo.',
      onboardingCta: 'Experimentar com um exemplo →',
      onboardingDismiss: 'Fechar',
      limitUpgradeCta: 'Assinar Pro — R$ 64,50 no primeiro mês →',
      limitUpgradePromo: 'Código BEMVINDO50 — 50% no 1º mês',

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
        free: '0 análises incluídas sem créditos',
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
      upgradeCreditsTitle: 'Comprar créditos',
      upgradeCreditsSubtitle: 'Compre créditos sem assinatura. Detecção IA usa 1 crédito, similaridade usa 2 e análise completa usa 3.',
      upgradeCurrentBalance: 'Saldo atual: {count}',
      upgradeCreditSingular: 'crédito',
      upgradeCreditPlural: 'créditos',
      upgradeCreditPackTrialLabel: '5 créditos',
      upgradeCreditPackTrialDescription: 'Pacote inicial',
      upgradeCreditPackStandardLabel: '20 créditos',
      upgradeCreditPackStandardDescription: 'Pacote professor',
      upgradeCreditPackBestLabel: '100 créditos',
      upgradeCreditPackBestDescription: 'Melhor custo por crédito',
      upgradePerAnalysis: '{price} por crédito',
      upgradeBuy: 'Comprar',
      upgradeRedirecting: 'Redirecionando...',
      upgradeSubscriptionsTitle: 'Assinaturas para escolas e equipes',
      upgradeSubscriptionsSubtitle: 'Para uso recorrente, os planos mensais entregam mais volume, relatórios e melhor custo por análise.',
      upgradeTrustStripe: 'Pagamento seguro via Stripe',
      upgradeTrustCredits: 'Créditos não expiram',
      upgradeTrustReports: 'Relatórios PDF exportáveis',
      upgradeCheckoutCreditsDescription: '{count} créditos para detecção de IA e plágio com relatório exportável',
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
      exportPdf: 'Exportar relatório PDF',
    },

    // Public tester page
    tester: {
      badge: 'Pacotes avulsos a partir de R$0,50',
      title: 'Crie sua conta e analise em minutos',
      subtitle: 'Escolha créditos baratos para verificar IA, plágio ou ambos no painel do VeriTexto.',
      testsRemaining: '{count} análises disponíveis',
      limitReached: 'Compre créditos para continuar',
      minCharsError: 'Insira pelo menos 50 caracteres para uma análise confiável.',
      analysisError: 'Erro durante a análise',
      internalError: 'Ocorreu um erro',
      textareaPlaceholder: 'Cole aqui o texto a analisar (mínimo 50 caracteres, máximo 5000)...',
      characterCount: '{count} / 5000 caracteres',
      analyzeFree: 'Criar conta e comprar créditos',
      loading: 'Analisando...',
      ctaTitle: 'Entrada sem teste grátis',
      ctaTitleLimit: 'Compre créditos e continue',
      ctaBody: 'Os pacotes avulsos começam em R$0,50 por crédito, sem mensalidade, com relatório exportável e créditos sem expiração.',
      ctaButton: 'Ir para créditos',
      featureAccuracyTitle: '99,9% de precisão',
      featureAccuracyBody: 'Tecnologia validada pela Universidade de Maryland',
      featureSectionTitle: 'Análise por seção',
      featureSectionBody: 'Identifica precisamente quais partes foram geradas por IA',
      featureModelTitle: 'Detecção do modelo',
      featureModelBody: 'ChatGPT, Claude, Gemini, Llama... identificamos todos',
    },

    // Hero demo
    heroDemo: {
      testNow: 'Comece agora',
      free: 'A partir de R$0,50/crédito',
      placeholder: 'Cole seu texto aqui e siga para a compra de créditos... (mín. 50 caracteres)',
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
      ctaButton: 'Criar conta e comprar créditos \u2192',
      ctaTeaser: 'Pacotes avulsos com IA + plágio, relatório exportável e créditos sem expiração.',
      unlockLabel: 'Sem análises grátis. Entre com créditos avulsos.',
      scansRemaining: '{count} análises disponíveis',
      pendingBanner: 'Seu texto foi salvo e será analisado imediatamente após a criação da sua conta.',
      signupToAnalyze: 'Crie sua conta e compre créditos para analisar seu texto',
    },

    // Plagiarism detection
    plagiarism: {
      modeAI: 'Detecção IA',
      modePlagiarism: 'Detecção de plágio',
      modeBoth: 'Análise completa',
      noPlagiarism: 'Nenhum plágio detectado',
      plagiarismFound: 'Plágio detectado',
      percentPlagiarized: '{score}% de plágio detectado',
      sourcesFound: '{count} fonte(s) encontrada(s)',
      sourceLabel: 'Fonte',
      matchedText: 'Texto correspondente',
      similarity: 'Similaridade',
      highlightedPassages: 'Trechos detectados no seu texto',
      analyzePlagiarism: 'Verificar plágio',
      analyzeBoth: 'Análise IA + plágio',
      partialWarning: 'Uma parte da análise não pôde ser finalizada. Os resultados disponíveis são exibidos abaixo.',
      originalSample: 'A fotossíntese é um processo biológico fundamental pelo qual as plantas convertem a luz solar em energia química, produzindo oxigênio como subproduto essencial para a vida na Terra.',
      copiedSample: 'A fotossíntese é o processo bioenergético que permite aos organismos clorofilados sintetizar matéria orgânica utilizando a energia luminosa. Consiste em reduzir o dióxido de carbono pela água em glicídios e dioxigênio.',
      originalButton: 'Texto original',
      copiedButton: 'Texto copiado',
    },

    // Cookie consent
    cookieConsent: {
      message: 'Este site utiliza cookies para medir o desempenho dos an\u00fancios e melhorar sua experi\u00eancia. Nenhum dado pessoal \u00e9 vendido.',
      accept: 'Aceitar',
      decline: 'Recusar',
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
      readySubtitle: 'Crie sua conta, compre créditos e comece a analisar na hora',
      readyButton: 'Criar conta e comprar créditos \u2192',
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
        trialTitle: '\ud83d\udcb3 Como começar agora:',
        trialFeatures: [
          'Créditos avulsos a partir de R$0,50 por crédito',
          'Relatório com IA + plágio no mesmo fluxo',
          'Precisão de 99,9%',
          'Créditos sem expiração',
        ],
        ctaButton: 'Comprar créditos e analisar \u2192',
        question: 'Tem dúvidas? Responda diretamente a este email.',
        ctaUrl: '/dashboard/upgrade',
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
        upgradePrice: 'Apenas R$179/mês',
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
        ctaButton: 'Assinar Pro \u2014 R$179/mês \u2192',
        question: 'Tem dúvidas? Responda simplesmente a este email.',
      },

      limitReached: {
        subject: '{name}, você atingiu seu limite 🔒',
        greeting: 'Olá {name},',
        body: 'Você utilizou todas as suas análises gratuitas no VeriTexto este mês. Seu limite será renovado no próximo mês, mas se precisar analisar mais textos agora, temos algo para você.',
        offerTitle: '🎁 Oferta exclusiva — 30% de desconto',
        offerBody: 'Mude para o plano Professor (1.000 análises/mês) ou Estudante (200 análises/mês) com 30% de desconto no primeiro mês.',
        offerFeatures: [
          '1.000 análises/mês — para professores e consultores',
          'Exportação PDF/CSV incluída',
          'Histórico completo de 30 dias',
          'Suporte por email',
        ],
        couponCode: 'LIMITE30',
        ctaButton: 'Aproveitar -30% agora →',
        footer: 'Oferta válida apenas para o primeiro mês. Cancele a qualquer momento.',
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
      noCredits: 'Você está sem créditos. Compre um pacote para continuar.',
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
      demoLimitReached: 'As análises públicas foram desativadas. Crie uma conta e compre créditos para continuar.',
      demoTextTooLong: 'O texto não deve ultrapassar 5.000 caracteres para esta prévia.',
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
        name: 'Professor',
        features: ['1.000 análises/mês', 'Integrações LMS', 'Exportar PDF/CSV', 'Suporte por email', 'Histórico 30 dias'],
      },
      university: {
        name: 'Escola',
        features: ['10.000 análises/mês', 'API ilimitada', 'Integração LMS', 'Painel admin', 'Suporte prioritário'],
      },
      enterprise: {
        name: 'Universidade',
        features: ['50.000 análises/mês ou volume customizado', 'SSO e integrações sob demanda', 'Onboarding institucional', 'Gerente de conta', 'Proposta comercial personalizada'],
      },
    },
  },
}

export default config
