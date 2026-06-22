# Notion — Auditelle OS

Blueprint para criar o workspace operacional do Auditelle Detect no Notion.

> Não há integração Notion conectada nesta sessão. Use este blueprint para criar as páginas manualmente ou importe os CSVs em `docs/notion/import/` como databases.

## Página Raiz

Nome: **Auditelle OS**

Seções:

1. **Command Center** — visão executiva de marcas, lançamentos e bloqueios.
2. **Brands / Resellers** — database principal de marcas.
3. **Deployments** — ambientes Vercel/Supabase/Stripe por marca.
4. **Tasks** — backlog operacional e técnico.
5. **Env Vars** — checklist de variáveis por marca, sem valores secretos.
6. **Launch Checklist** — checklist padronizado para go-live.
7. **Docs & Decisions** — decisões, runbooks, links e aprendizados.

## Database: Brands / Resellers

Import: `docs/notion/import/resellers.csv`

Propriedades:

| Nome | Tipo | Descrição |
| --- | --- | --- |
| `Name` | Title | Nome da marca |
| `Reseller ID` | Text | Valor usado em `RESELLER_ID` |
| `Domain` | URL/Text | Domínio público |
| `Market` | Select | País ou região |
| `Locale` | Select | Locale da marca |
| `Currency` | Select | Moeda local |
| `Status` | Select | `Idea`, `Config Ready`, `QA`, `Live`, `Paused` |
| `Config File` | Text | Caminho no repo |
| `Assets Path` | Text | Caminho dos logos/assets |
| `tmux Window` | Text | Janela associada na sessão `Auditelle` |
| `Owner` | Person | Responsável interno |
| `Next Action` | Text | Próximo passo claro |

Views sugeridas:

- **Board by Status**: agrupado por `Status`.
- **Launch Pipeline**: filtro `Status != Live`.
- **Live Brands**: filtro `Status = Live`.
- **By Market**: agrupado por `Market`.

Template de página por marca:

```text
# <Brand>

## Positioning
- ICP:
- Promise:
- Main competitors:
- Key objections:

## Technical
- RESELLER_ID:
- Domain:
- Config:
- Assets:
- Vercel project:
- Supabase project:
- Stripe account/products:

## Launch
- Status:
- Blockers:
- QA notes:
- Next action:
```

## Database: Deployments

Import: `docs/notion/import/deployments.csv`

Propriedades:

| Nome | Tipo | Descrição |
| --- | --- | --- |
| `Name` | Title | Ambiente ou projeto |
| `Brand` | Relation | Relacionar com `Brands / Resellers` |
| `Environment` | Select | `Local`, `Preview`, `Production` |
| `Vercel Project` | Text | Nome do projeto Vercel |
| `Supabase Project` | Text | Nome/ref do projeto Supabase |
| `Stripe Account` | Text | Conta/país Stripe |
| `App URL` | URL | URL pública ou local |
| `Status` | Select | `Not Started`, `Configured`, `Needs QA`, `Live` |
| `Last QA` | Date | Última checagem completa |
| `Notes` | Text | Observações rápidas |

Views sugeridas:

- **Production Status**: filtro `Environment = Production`.
- **Needs QA**: filtro `Status = Needs QA`.
- **Local Ports**: filtro `Environment = Local`.

## Database: Tasks

Import: `docs/notion/import/tasks.csv`

Propriedades:

| Nome | Tipo | Descrição |
| --- | --- | --- |
| `Name` | Title | Tarefa clara e acionável |
| `Brand` | Relation | Marca relacionada, se aplicável |
| `Area` | Select | `Code`, `Content`, `Design`, `Legal`, `Stripe`, `Supabase`, `Vercel`, `Marketing`, `QA` |
| `Status` | Select | `Backlog`, `Next`, `Doing`, `Blocked`, `Done` |
| `Priority` | Select | `P0`, `P1`, `P2`, `P3` |
| `Owner` | Person | Responsável |
| `Due` | Date | Prazo |
| `Blocker` | Text | O que impede avanço |
| `Repo Path` | Text | Arquivo/pasta relevante |

Views sugeridas:

- **Today / Next**: filtro `Status = Next` ou `Doing`.
- **Launch Blockers**: filtro `Status = Blocked` ou `Priority = P0`.
- **By Area**: board agrupado por `Area`.
- **By Brand**: board agrupado por `Brand`.

## Database: Env Vars

Import: `docs/notion/import/env-vars.csv`

Propriedades:

| Nome | Tipo | Descrição |
| --- | --- | --- |
| `Name` | Title | Nome da variável |
| `Brand` | Relation | Marca relacionada |
| `Environment` | Select | `Local`, `Preview`, `Production` |
| `Required` | Checkbox | Se é obrigatória |
| `Set?` | Checkbox | Se já foi configurada |
| `Secret?` | Checkbox | Se contém segredo |
| `Source` | Select | `Vercel`, `Supabase`, `Stripe`, `Resend`, `Pangram`, `App` |
| `Notes` | Text | Nunca colar valores secretos aqui |

Regra: registrar somente presença, origem e observações. Não armazenar tokens, keys ou secrets no Notion.

## Database: Docs & Decisions

Propriedades:

| Nome | Tipo | Descrição |
| --- | --- | --- |
| `Name` | Title | Documento ou decisão |
| `Type` | Select | `Decision`, `Runbook`, `Meeting`, `Research`, `Postmortem` |
| `Brand` | Relation | Marca relacionada, opcional |
| `Status` | Select | `Draft`, `Active`, `Superseded` |
| `Date` | Date | Data da decisão/documento |
| `Repo Link` | Text | Caminho no repo |
| `Summary` | Text | Resumo da decisão |

## Launch Checklist Template

Crie como botão/template dentro da database `Tasks`:

```text
## Launch Checklist — <Brand>

### Config
- [ ] `config/<reseller-id>.ts` completo
- [ ] `config/index.ts` atualizado
- [ ] Logos e favicon revisados
- [ ] SEO e metadata revisados

### Infra
- [ ] Vercel project criado
- [ ] Domínio configurado
- [ ] Supabase project criado/migrado
- [ ] Stripe products e prices criados
- [ ] Stripe webhook configurado
- [ ] Resend sender/domain configurado

### QA
- [ ] Homepage
- [ ] Signup/login/reset password
- [ ] Public detector
- [ ] Authenticated detector
- [ ] Checkout
- [ ] Billing portal
- [ ] Emails
- [ ] Sitemap/robots

### Go-live
- [ ] Analytics ativo
- [ ] Conversion tracking ativo
- [ ] Legal pages revisadas
- [ ] Smoke test pós-deploy
- [ ] Primeira campanha liberada
```

## Importação Rápida

1. No Notion, crie a página **Auditelle OS**.
2. Para cada CSV em `docs/notion/import/`, escolha **Import > CSV**.
3. Renomeie as databases para os nomes deste blueprint.
4. Converta colunas de texto para `Select`, `Checkbox`, `Date`, `Person` e `Relation` conforme indicado.
5. Crie relations entre `Tasks`, `Deployments`, `Env Vars` e `Brands / Resellers` usando a coluna `Brand`.
6. Crie as views sugeridas.
7. Adicione o template de página por marca e o Launch Checklist.
