# Auditelle Detect — Estrutura Operacional

Este documento define a estrutura base para operar o app multi-brand/multi-reseller do Auditelle Detect a partir de um único repositório.

## Objetivo

- Manter uma base de código única para todas as marcas.
- Isolar identidade, conteúdo, pricing, legal, SEO e feature flags por `RESELLER_ID`.
- Padronizar onboarding, deploy, QA e acompanhamento de cada país/marca.
- Espelhar a operação em uma estrutura Notion importável.

## Estrutura Do Repo

```text
auditelle-detect/
├── config/
│   ├── index.ts                    # loader por RESELLER_ID
│   ├── types.ts                    # contrato ResellerConfig
│   ├── auditelle-fr.ts             # França / Auditelle
│   ├── novalearn-uk.ts             # Reino Unido / NovaLearn
│   ├── veritexto-pt.ts             # Brasil / VeriTexto
│   ├── veritexto-es.ts             # Espanha / VeriTexto
│   └── klartext-se.ts              # Suécia / TextVakt
├── public/
│   ├── images/                     # assets legacy/default Auditelle
│   └── brands/                     # assets por marca
├── src/
│   ├── app/                        # rotas Next.js compartilhadas
│   ├── components/                 # componentes parametrizados por config
│   └── lib/                        # auth, config, stripe, supabase, email
├── scripts/                        # utilitários operacionais
├── supabase/                       # schema e migrations
└── docs/
    ├── operations/                 # runbooks e estrutura operacional
    └── notion/                     # blueprint e CSVs para Notion
```

## Marcas Atuais

| ID | Marca | Domínio | Janela tmux | Config | Assets |
| --- | --- | --- | --- | --- | --- |
| `auditelle-fr` | Auditelle | `auditelle.fr` | `auditelle-fr` | `config/auditelle-fr.ts` | `public/images/` |
| `novalearn-uk` | NovaLearn | `novalearn.co.uk` | `novalearn-uk` | `config/novalearn-uk.ts` | `public/brands/novalearn-uk/` |
| `veritexto-pt` | VeriTexto | `veritexto.com.br` | `veritexto-pt` | `config/veritexto-pt.ts` | `public/brands/veritexto/` |
| `veritexto-es` | VeriTexto | `veritexto.es` | `veritexto-es` | `config/veritexto-es.ts` | `public/brands/veritexto-es/` |
| `klartext-se` | TextVakt | `textvakt.com` | `klartext-se` | `config/klartext-se.ts` | `public/brands/klartext-se/` |

## Fluxo Para Nova Marca

1. **Definir posicionamento**: país, idioma, nome, domínio, público e moeda.
2. **Criar config**: adicionar `config/<reseller-id>.ts` com o contrato `ResellerConfig`.
3. **Registrar loader**: adicionar o novo `RESELLER_ID` no `switch` de `config/index.ts`.
4. **Adicionar assets**: criar `public/brands/<reseller-id>/logo-color.svg` e `logo-white.svg`.
5. **Preparar env**: definir `RESELLER_ID`, Supabase, Stripe, Resend, Pangram e URL pública.
6. **Criar Vercel project**: um projeto por marca, apontando para o mesmo repo.
7. **Criar Supabase project**: um projeto isolado por marca quando houver dados/usuários próprios.
8. **Criar Stripe products**: preços locais e webhooks por marca/conta.
9. **QA local**: rodar build com o `RESELLER_ID` alvo e revisar páginas críticas.
10. **Launch checklist**: liberar domínio, sitemap, robots, analytics e tracking de conversão.

## Checklist De QA Por Marca

- Homepage usa idioma, moeda, logos e SEO corretos.
- Navbar, footer, auth, dashboard e upgrade não têm strings hardcoded de outra marca.
- `NEXT_PUBLIC_APP_URL` aponta para o domínio correto.
- Stripe checkout abre produtos/preços corretos.
- Webhook Stripe salva créditos/plano no Supabase correto.
- Detector público, detector autenticado e demo retornam resultados válidos.
- Emails usam remetente, idioma e branding corretos.
- Sitemap e robots refletem o domínio correto.
- Políticas legais citam entidade, país e lei de dados corretos.

## Estrutura De tmux Sugerida

Sessão: `Auditelle`

| Janela | Uso |
| --- | --- |
| `zsh` | comandos gerais, git, inspeção rápida |
| `node` | servidor default ou build principal |
| `auditelle-fr` | ambiente França |
| `veritexto-pt` | ambiente Brasil |
| `veritexto-es` | ambiente Espanha |
| `novalearn-uk` | ambiente Reino Unido |
| `klartext-se` | ambiente Suécia |

Comando padrão para cada janela:

```bash
RESELLER_ID=<reseller-id> npm run dev -- --port <port>
```

Portas sugeridas:

| ID | Porta |
| --- | ---: |
| `auditelle-fr` | `3000` |
| `veritexto-pt` | `3001` |
| `veritexto-es` | `3002` |
| `novalearn-uk` | `3003` |
| `klartext-se` | `3004` |

## Fontes De Verdade

| Área | Fonte |
| --- | --- |
| Config da marca | `config/<reseller-id>.ts` |
| Contrato de config | `config/types.ts` |
| Loader de marca | `config/index.ts` |
| Operação e runbooks | `docs/operations/` |
| Gestão operacional | Notion: workspace “Auditelle OS” |
| Templates Notion | `docs/notion/` |

## Próximos Documentos Recomendados

- `docs/operations/deployment-runbook.md`
- `docs/operations/reseller-onboarding-checklist.md`
- `docs/operations/stripe-products.md`
- `docs/operations/supabase-projects.md`
- `docs/operations/qa-checklist.md`
