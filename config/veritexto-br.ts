// =============================================================================
// VeriTexto BR — canonical reseller config
// =============================================================================
// This is the canonical BR config. During the transition window, it inherits
// all reseller-base strings from `veritexto-pt.ts` (currently in production
// on veritexto.com.br). Once Codex delivers the final BR copy, we flip:
// veritexto-pt.ts will re-export from this file, and this file becomes the
// single source of truth for BR.
//
// Blueprint: docs/institutional-blueprint.md
// Alignment: §11 Codex alignment addendum (2026-04-22)
// =============================================================================

import ptConfig from './veritexto-pt'
import type { ResellerConfig } from './types'

const config: ResellerConfig = {
  ...ptConfig,

  id: 'veritexto-br',
  legalEntity: 'VeriTexto',

  strings: {
    ...ptConfig.strings,
    footer: {
      ...ptConfig.strings.footer,
      description:
        'A solução em português de integridade acadêmica para detectar IA, plágio e conteúdos suspeitos com conformidade LGPD.',
    },
    contact: {
      ...ptConfig.strings.contact,
      companyName: 'VeriTexto',
    },
  },

  // ── Institutional portal layer ────────────────────────────────────────────
  // Public ship rule (blueprint §11.1): institutions[] stays empty until a
  // real client publicly approves name and logo use. Fundatec runs as internal
  // pilot and is tracked in a private ops doc, not in this config.
  institutional: {
    enabled: true,
    basePath: '/portal-integridade',
    label: 'Portal de Integridade Acadêmica',

    routes: {
      history: 'historico',
      classes: 'turmas',
      users: 'usuarios',
      settings: 'configuracoes',
      help: 'ajuda',
    },

    landing: {
      hero: {
        title: 'Portal de Integridade Acadêmica',
        subtitle:
          'A alternativa ao Turnitin para escolas, faculdades e universidades brasileiras que precisam de governança, histórico e operação institucional em português.',
        ctaPrimary: 'Agendar demonstração',
        ctaSecondary: 'Ver planos para professor',
      },
      pitch: {
        turnitinAlternative:
          'O VeriTexto posiciona sua instituição em um modelo mais simples de contratar, operar e expandir do que o fluxo tradicional do Turnitin.',
        migrationStory:
          'Em vez de depender de ferramenta isolada ou processo fragmentado, sua equipe passa a operar um portal com usuários, turmas, histórico auditável, relatórios exportáveis e onboarding guiado para adoção acadêmica.',
      },
      features: [
        {
          title: 'Detecção de IA pronta para operação institucional',
          description:
            'Pontuação de IA com alta precisão, leitura por trecho e relatórios que podem ser compartilhados por coordenação, banca e corpo docente.',
          icon: 'Sparkles',
        },
        {
          title: 'Fluxo de similaridade no mesmo workspace',
          description:
            'Sua instituição trabalha com verificação de similaridade no mesmo ambiente operacional, sem depender de remendos entre ferramentas e planilhas.',
          icon: 'FileSearch',
        },
        {
          title: 'Turmas, usuários e papéis por instituição',
          description:
            'Professores, coordenação e operação trabalham no mesmo portal, com visibilidade clara sobre quem analisou, quando analisou e em qual contexto acadêmico.',
          icon: 'ShieldCheck',
        },
        {
          title: 'Histórico auditável e relatórios exportáveis',
          description:
            'Cada análise fica registrada com trilha institucional, pronta para consulta posterior, exportação e acompanhamento de casos recorrentes.',
          icon: 'FileDown',
        },
        {
          title: 'Implantação guiada para migração real',
          description:
            'O piloto nasce como operação institucional paga, com onboarding, treinamento e modelo comercial compatível com calendário letivo e procurement brasileiro.',
          icon: 'Building2',
        },
      ],
      // Static preview (blueprint §11.1 decision (b)): no fake institution
      // in config. Asset lives outside config as a static image. When we have
      // real public-approved client logos, they come here.
      portalPreview: {
        // Provisional neutral mockup (SVG) — no real institution data.
        // Replace with a real screenshot once the portal shell is presentable.
        imagePath: '/institutional/veritexto-br/portal-preview.svg',
        caption: 'Preview do portal institucional do VeriTexto — histórico, turmas e operação acadêmica em uma única interface.',
      },
      contactBlock: {
        title: 'Leve o VeriTexto para a sua instituição',
        body: 'Agende uma demonstração com nosso time e receba a estrutura do piloto institucional pago, com onboarding, operação semestral e proposta em reais para a sua instituição.',
        cta: 'Falar com o time institucional',
      },
    },

    commercial: {
      contactEmail: 'institucional@veritexto.com.br',
      pilotAvailable: true,
      pilotPaid: true, // Blueprint §5.3 — pilots are paid, never free.
      // TODO(codex): demoCalendarUrl once Cal.com/Calendly link is set up.
      procurementNotes:
        'Piloto institucional semestral recomendado: R$ 32.500 por 6 meses com 800 análises incluídas e excedente em blocos de 100 análises por R$ 6.000. Operação anual secundária: R$ 60.000 com 1.800 análises incluídas e excedente em blocos de 100 análises por R$ 5.000.',
    },

    // Blueprint §11.1 decision (b): start empty. Real institutions are added
    // only after they publicly approve the use of their name and logo.
    institutions: [],
  },
}

export default config
