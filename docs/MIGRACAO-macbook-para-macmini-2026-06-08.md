# Migração auditelle-detect: MacBook → Mac mini (2026-06-08)

Complemento à migração do `learnbase-monorepo`. A nota original de migração só
cobriu o monorepo — **este repositório (`auditelle-detect`) também foi migrado**,
mas separadamente, porque tinha trabalho não commitado que a primeira passada
deixou de fora.

**GitHub = fonte de verdade.** O MacBook deixa de ser usado para escrever código.

## Estado (feito no MacBook)
- ✅ **Trabalho não commitado salvo no GitHub.** Branch `macmini-migration-2026-06-08`
  (commit `1351859`) contém os 66 arquivos que estavam soltos: 36 modificados + 30 novos.
- Inclui:
  - port Copyleaks: `src/lib/copyleaks.ts`, `src/lib/detection-jobs.ts`, `src/lib/detection-providers.ts`
  - rotas async: `src/app/api/providers/` (webhook), `src/app/api/detect/jobs/` (polling)
  - `config/veritexto-br.ts` (reseller canônico BR)
  - `src/app/portal-integridade/`, `src/app/alternativa-turnitin/`
  - `src/app/api/admin/`, `src/app/dashboard/acquisition/`, `src/components/institutional/`
  - libs: `attribution.ts`, `credit-packs.ts`, `payment-events.ts`
  - 8 migrations novas (ver aviso de banco abaixo)
  - docs: institutional-blueprint, pricing-benchmark, SEO/pricing institucional BR
- ✅ **Sem segredo commitado.** `.env.local` / `.env.production` continuam no `.gitignore`.
  (O arquivo `provider_credentials_cache.sql` é só DDL de tabela, não credencial.)

## Passo a passo no Mac mini
```bash
# 1. Clonar
gh repo clone larsj45/auditelle-detect
cd auditelle-detect

# 2. Pegar a branch com o trabalho migrado
git checkout macmini-migration-2026-06-08

# 3. Variáveis de ambiente (NÃO copie .env à mão)
vercel link            # escolher o projeto auditelle-detect
vercel env pull .env.local --environment=development --yes

# 4. Dependências + rodar
npm install            # confirmar gerenciador no package.json
npm run dev
```

## ⚠️ Banco de dados — LEIA antes de qualquer migration
As 8 migrations abaixo agora estão **commitadas** (seguro), mas **NÃO foram aplicadas**.
Aplicar continua sendo operação sensível — **só com confirmação explícita do Lars**:
- `20260407231429_remote_history_placeholder.sql`
- `20260407231827_remote_history_placeholder.sql`
- `20260412000001_payment_events.sql`
- `20260412000002_zero_free_trial_cleanup.sql`
- `20260412000003_payment_event_attribution.sql`
- `20260428000001_provider_credentials_cache.sql`
- `20260428000002_detection_jobs.sql`
- `20260508000001_credit_purchase_idempotency.sql`

## 📣 Aviso (git / agentes)
- **Pare de gerar código novo no MacBook.**
- A branch `main` deste repo tem upstream `origin/main` (produção). Sempre push
  **explícito** para a própria branch: `git push origin <branch>`.
- No Mac mini, sempre `git pull` antes de começar.

## Próximo passo recomendado
Esta branch é um **snapshot de preservação**, não um PR limpo. No Mac mini, fatiar
o conteúdo em PRs coerentes (ex.: "Copyleaks port", "config veritexto-br",
"portal-integridade") antes de mergear na `main`.
