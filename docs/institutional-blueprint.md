# Institutional portal blueprint

**Date:** 2026-04-22
**Status:** Draft v1 — source of truth for the institutional layer inside `auditelle-detect`
**Parent doc:** [global-institutional-portal-plan-2026-04-22.md](./global-institutional-portal-plan-2026-04-22.md)

> This blueprint locks terminology, routes, config shape, and positioning rules.
> Every subsequent PR in the institutional layer should point back to this file.
> Changes to this document require explicit sign-off — it is not a living scratchpad.

---

## 1. Terminology

Fixed vocabulary. Use these exact words in code, config, copy, and conversations. Do not introduce synonyms.

| Term | Definition | Example |
|------|------------|---------|
| **Reseller** | A market-facing brand that owns the top-level domain, Stripe account, Supabase project, and legal entity. Already exists in `config/{reseller-id}.ts`. | `veritexto-br`, `auditelle-fr` |
| **Institution** | A university, school network, or institutional buyer that purchases the portal product within a reseller. Has its own slug, branding layer, and user base. | `fundatec`, `ifam`, `uffs` |
| **Portal** | The institutional product surface — the set of pages an institution's users log into. One portal per institution. | `/portal-integridade/fundatec` |
| **Workspace** | The branded institutional product *as a whole* within a reseller (landing + shell + all institution portals). One workspace per reseller. | "VeriTexto BR Workspace" |
| **Self-serve** | The existing credit/monthly product for individual buyers. Unchanged by this blueprint. | Professor buying 50 credits |

**Banned words inside the institutional codebase:**
- `client` (collides with "reseller client" in Stripe/support context — use `institution`)
- `tenant` (implies multi-tenant single-database, which we are not building)
- `organization` (too generic — use `institution` for universities, `reseller` for brands)
- any reference to `Learnbase` — this product line does not carry that brand

---

## 2. Route model

All institutional routes live under a single per-locale base path. The base path is configured in each `ResellerConfig` so the same codebase produces locale-correct URLs.

### Base paths per reseller

| Reseller | `institutionalBasePath` | Example full URL |
|----------|------------------------|------------------|
| `veritexto-br` | `/portal-integridade` | `https://www.veritexto.com.br/portal-integridade/fundatec` |
| `veritexto-es` | `/portal-integridad` | `https://www.veritexto.es/portal-integridad/{slug}` |
| `auditelle-fr` | `/portail-integrite` | `https://www.auditelle.fr/portail-integrite/{slug}` |
| `novalearn-uk` | `/academic-integrity` | (future) |
| `klartext-se` | `/akademisk-integritet` | (future) |

### Page inventory (identical shape across all locales)

| # | Purpose | Route (BR example) | Server/Client |
|---|---------|-------------------|---------------|
| 0 | Institutional landing (reseller level) | `/portal-integridade` | Server, static |
| 1 | Institution home / new analysis | `/portal-integridade/[institutionSlug]` | Server + client widget |
| 2 | Analysis history | `/portal-integridade/[institutionSlug]/historico` | Server (direct Supabase query) |
| 3 | Classes | `/portal-integridade/[institutionSlug]/turmas` | Client |
| 4 | Users | `/portal-integridade/[institutionSlug]/usuarios` | Client |
| 5 | Settings | `/portal-integridade/[institutionSlug]/configuracoes` | Server |
| 6 | Help | `/portal-integridade/[institutionSlug]/ajuda` | Server, static |

### Route rules

- **Only one dynamic route per institution.** No static mirror pages (the `/integridade/unifa/*` duplication from Learnbase is a bug, not a pattern — do not repeat).
- **Institution slugs come from config**, not from a database lookup in phase 1. Unknown slug → 404.
- **History pages query Supabase directly** from the Server Component. Do not self-fetch `/api/*` routes from Server Components — that pattern fails silently in Vercel production. (Confirmed incident on Learnbase, 2026-04-06.)
- Localized segment names (`historico` vs `historial` vs `historique`) are derived from the reseller's `institutional.routes` map, not hardcoded.

---

## 3. Config shape

### 3.1 Extend `ResellerConfig`

Add one optional block to the existing interface in `config/types.ts`:

```ts
export interface ResellerConfig {
  // ...existing fields...

  institutional?: InstitutionalConfig
}

export interface InstitutionalConfig {
  enabled: boolean                    // feature flag at reseller level
  basePath: string                    // e.g. "/portal-integridade"
  label: string                       // e.g. "Portal de Integridade Acadêmica"

  // Localized route segments
  routes: {
    history: string                   // "historico"
    classes: string                   // "turmas"
    users: string                     // "usuarios"
    settings: string                  // "configuracoes"
    help: string                      // "ajuda"
  }

  // Landing page copy (reseller-level institutional landing)
  landing: {
    hero: { title: string; subtitle: string; cta: string }
    pitch: { turnitinAlternative: string; migrationStory: string }
    features: Array<{ title: string; description: string }>
    contactCta: string
  }

  // Commercial model
  commercial: {
    contactEmail: string              // e.g. "institucional@veritexto.com.br"
    pilotAvailable: boolean
    demoCalendarUrl?: string          // Cal.com / Calendly link
  }

  // Institutions registered under this reseller
  institutions: Institution[]
}

export interface Institution {
  slug: string                        // e.g. "fundatec"
  name: string                        // full legal name
  shortName: string                   // display name
  primaryColor: string                // hex
  logoPath: string                    // e.g. "/institutions/veritexto-br/fundatec.png"
  lmsLabel?: string                   // e.g. "Moodle Fundatec"
  status: 'pilot' | 'active' | 'churned'
  startDate: string                   // ISO date
}
```

### 3.2 Example instantiation (VeriTexto BR)

```ts
// config/veritexto-br.ts
export default {
  // ...standard reseller fields...

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
        subtitle: 'A alternativa ao Turnitin para escolas e universidades brasileiras',
        cta: 'Falar com nosso time',
      },
      // ...
    },
    commercial: {
      contactEmail: 'institucional@veritexto.com.br',
      pilotAvailable: true,
    },
    institutions: [
      // empty at launch — populate as deals close
    ],
  },
} satisfies ResellerConfig
```

### 3.3 Config file layout

```
config/
├── veritexto-br.ts          ← needs to be created (does not exist yet)
├── veritexto-es.ts          ← add institutional block
├── auditelle-fr.ts          ← add institutional block (phase 3)
├── novalearn-uk.ts          ← institutional block optional
├── klartext-se.ts           ← institutional block optional
└── types.ts                 ← extend with InstitutionalConfig

public/
└── institutions/
    ├── veritexto-br/
    │   ├── fundatec.png
    │   └── ...
    ├── veritexto-es/
    └── auditelle-fr/
```

**Important gap:** `config/veritexto-br.ts` does not exist today. The flagship institutional rollout requires creating it first. This is a prerequisite to step 4 in the build sequence below.

---

## 4. Data model

### 4.1 Residency rule

Each reseller keeps its own Supabase project. This is already the practice for self-serve data and must extend to institutional data.

- `veritexto-br` institutional data → Brazilian Supabase project (sa-east-1)
- `veritexto-es` institutional data → EU Supabase project (eu-central-1)
- `auditelle-fr` institutional data → EU Supabase project (eu-central-1 or eu-west-3)

No cross-reseller tables. No shared global institutional database. Data residency is a procurement argument — do not compromise it for engineering convenience.

### 4.2 Tables (per reseller Supabase project)

```
institutional_scans
  id, institution_slug, user_id, text_hash, word_count,
  ai_score, plag_score, pangram_raw, created_at

institutional_turmas
  id, institution_slug, name, code, professor_email, created_at

institutional_usuarios
  id, institution_slug, email, name, role, created_at
  UNIQUE(institution_slug, email)

institutional_submissions
  id, turma_id, user_id, scan_id, submitted_at, grade
```

RLS on every table, scoped by `institution_slug`.

### 4.3 No admin dashboard across resellers

Each reseller's institutional data is inspected in its own Supabase Studio. No global admin UI in phase 1. A cross-reseller CEO view can be added later as a read-only aggregator pulling from each Supabase via API.

---

## 5. Positioning rules

These rules govern copy placement and are non-negotiable for phase 1.

### 5.1 On the reseller homepage (`/`)

| Element | Rule |
|---------|------|
| Hero | Own category, own value. No Turnitin reference above the fold. |
| Comparison block | One section mid-page. Table format. Turnitin named once in the heading, not in every bullet. |
| Institutional CTA | Single band linking to `/portal-integridade` (or locale equivalent). |
| SEO keywords | No "Turnitin" in the homepage meta keywords. |

### 5.2 On the institutional landing (`/portal-integridade`)

| Element | Rule |
|---------|------|
| Hero | "Alternative to Turnitin" framing allowed and encouraged. |
| Migration story | Explicit — roles, classes, reports, history, rollout. |
| Comparison | Full comparison table allowed. |
| Contact CTA | Primary action. Self-serve CTA secondary. |

### 5.3 On the institution portal itself (`/portal-integridade/[slug]`)

| Element | Rule |
|---------|------|
| Branding | Institution's logo + primary color. Reseller branding in footer only. |
| Turnitin references | Forbidden inside the authenticated portal. We are not positioning against a competitor to users who already bought. |

### 5.4 Banned copy patterns (all surfaces)

- Repeating "Turnitin" more than once per section.
- Using Turnitin's logo, product screenshots, or trademarks.
- Claiming specific Turnitin limitations without a linked source.
- Language that reads like competitor-name SEO padding.

---

## 6. Dependencies and prerequisites

Before the flagship rollout can ship, these must be resolved. They are not internal to `auditelle-detect` and must be tracked explicitly.

| Item | Owner | Blocking? |
|------|-------|-----------|
| Pangram plagiarism module access (full `matched_text`) | Lars → Pangram | Blocks the "AI + plagiarism in one flow" promise. If unresolved, phase 1 ships with AI-only and plagiarism as "coming soon". |
| `config/veritexto-br.ts` created with base reseller fields | Lars | Blocks institutional rollout for BR. |
| `veritexto.com.br` domain DNS and Vercel project | Lars | Blocks BR go-live. |
| BR Supabase project with institutional tables migrated | OpenClaw + Lars | Blocks BR go-live. |
| Stripe institutional SKU (pilot) defined | Lars | Blocks commercial path. Not a blocker to the tech build. |
| Auth flow: Supabase PKCE + Resend SMTP port from Learnbase | Lars | Must be ported, not re-discovered. Reference: Learnbase dev log 2026-04-09. |

---

## 7. Build sequence

Six linear steps. Do not start step N+1 until step N is merged and deployed.

1. **Extend `config/types.ts`** with `InstitutionalConfig` and `Institution` interfaces. Add the optional `institutional` field to `ResellerConfig`. Ship as a typed-only PR with zero runtime impact.

2. **Create `config/veritexto-br.ts`** with full reseller fields (copied and localized from `veritexto-pt.ts`) plus the `institutional` block populated. Deploy as a new Vercel project pointed at `veritexto.com.br`.

3. **Build the institutional shell components** under `src/components/institutional/`:
   - `InstitutionalLayout` (top bar, nav, footer)
   - `InstitutionalLandingHero`
   - `InstitutionalContactBlock`
   - Shared types in `src/lib/institutional.ts`

4. **Build one end-to-end institution portal** for a flagship BR institution (new analysis → history → classes → users → settings → help). Use dynamic route `/portal-integridade/[institutionSlug]`. Port the AI detection widget from Learnbase conceptually — do not copy the Learnbase brand-specific code.

5. **Replicate to VeriTexto ES.** Create `institutional` block in `config/veritexto-es.ts`. Localize landing and shell. Verify the same shell code renders correctly with the ES config.

6. **Replicate to Auditelle FR.** Add `institutional` block to `config/auditelle-fr.ts`. French localization of landing, route segments, and shell copy. Each localization is a judgment call on copy, not a translation.

---

## 8. Out of scope for phase 1

Explicit non-goals. These are deferred to avoid scope creep.

- Per-institution white-label subdomains (e.g. `fundatec.veritexto.com.br`). Ship later as upsell.
- Cross-reseller CEO dashboard.
- LMS integrations (Moodle, Canvas LTI plugins).
- SAML/SSO for institutional users. Phase 1 uses Supabase Auth email/password.
- Mobile apps.
- Real-time collaboration inside a class.
- Student-facing UI (phase 1 is professor/coordinator only).

---

## 9. Risks

| Risk | Mitigation |
|------|-----------|
| Pangram plagiarism never ships the paid tier → core promise missing | Fallback messaging: "AI detection + similarity scoring today, full plagiarism highlighting Q3 2026". Do not make the landing depend on a feature we don't control. |
| Positioning drift on the homepage → self-serve funnel dilutes | Keep institutional messaging on dedicated surface. Separate analytics segment for `/portal-integridade` traffic. |
| Copy-paste of Learnbase code brings legacy assumptions (iThenticate, Copyleaks placeholders, UNIFA static pages) | Start clean. Port *concepts* and *information architecture*, not files. Code review must flag any Learnbase string that leaks in. |
| Institution config in file-based TypeScript doesn't scale past ~20 institutions per reseller | Acceptable for phase 1. Move to database-backed institution registry when any single reseller crosses 10 live institutions. |
| Data residency violation if BR institutional data lands in EU Supabase | Enforce `RESELLER_ID` env var → Supabase project binding in `src/lib/supabase.ts`. Fail fast at boot if mismatched. |

---

## 10. Sign-off

This blueprint is the authoritative reference for the institutional layer until a v2 replaces it.

Proposed changes should be submitted as a PR editing this file, with the change summarized in a new dated section at the bottom.

**Version:** v1.1 — 2026-04-22 (Codex alignment incorporated)
**Author:** Claude (drafted), Codex (review), Lars Janér (to approve)
**Next review:** at the end of build-sequence step 2 (first VeriTexto BR deploy)

---

## 11. Codex alignment addendum — 2026-04-22

Captured after Codex review via Slack `#auditelle-agents` and the `## Codex response to Claude` section of the parent plan.

### 11.1 Flagship institution — public vs. internal separation

**Decision:** `Fundatec` is the **internal pilot** for the end-to-end institutional build. It is **not** to appear in public marketing material (landing copy, screenshots, case-study blocks, SEO pages) until Fundatec explicitly approves the use of its name.

**Implications for code and copy:**
- Landing page, screenshots, and comparison material use a generic placeholder institution (e.g. `Universidade Exemplo`, with a neutral logo and palette).
- `config/veritexto-br.ts` may list Fundatec in `institutional.institutions[]` with `status: 'pilot'`, but the landing renderer must not pull from that list for public hero/proof sections.
- Public proof points should be anonymized ("uma instituição federal brasileira utiliza o portal em piloto") until approval is granted.
- Add a field `publiclyListable: boolean` on `Institution` to gate this at the type level.

### 11.2 Landing shape — contact-led, not demo-led

**Decision:** The reseller-level institutional landing (`/portal-integridade`) is **contact-led**. No interactive text-box demo in the body of the landing. This prevents dilution of the self-serve/institutional boundary and keeps scope contained.

**Structure:**
1. Hero with primary CTA → demo/contact form
2. Visual preview of the portal (static screenshots or lightweight mockup)
3. Feature/governance/migration sections
4. Secondary CTA → self-serve (small, below fold)
5. Contact form + procurement info

### 11.3 Plagiarism narrative — ship with accurate framing

**Decision:** Do not hold the landing waiting on Pangram. Ship with precise framing:
- Headline claim: `detecção de IA + fluxo de similaridade` (not "AI + plágio em um fluxo").
- Plagiarism full highlighting listed as "em desenvolvimento" or omitted entirely until Pangram's paid tier is confirmed technically and contractually.
- Governance, history, classes, and reports remain the institutional differentiators that ship on day one.

This supersedes the earlier risk-mitigation note in section 9 about conditional messaging. The conditional is now a firm decision: ship with the accurate, narrower claim.

### 11.4 Reseller ID compat layer

**Decision:** Introduce `config/veritexto-br.ts` **without breaking** the existing `veritexto-pt` deployment that currently serves `veritexto.com.br`.

**Mechanics:**
- Create `config/veritexto-br.ts` as the canonical new file.
- Keep `config/veritexto-pt.ts` in place as a compat shim (re-export or direct copy) during the transition window.
- The resolver in `config/index.ts` must accept both `RESELLER_ID=veritexto-br` and `RESELLER_ID=veritexto-pt` and map them to the same resolved config.
- Vercel `RESELLER_ID` env var is only flipped to `veritexto-br` after the new file is deployed and verified in preview.
- Once flipped and stable, `veritexto-pt.ts` can be removed in a separate cleanup PR. Not in this rollout.

### 11.5 Work division (confirmed)

| Owner | Scope |
|-------|-------|
| Claude | Step 1 `config/types.ts` extension → `veritexto-br.ts` + compat layer → shared institutional components → end-to-end portal for the internal Fundatec pilot |
| Codex | Landing copy PT-BR (generic, no Fundatec name) + SEO (keywords, meta, sitemap, comparison-page strategy) + pilot pricing/commercial framing + headline/framing for the plagiarism narrative |
| Lars | Pangram module access, `veritexto.com.br` DNS/Vercel project, BR Supabase project + migrations, Stripe institutional SKU, Fundatec public-approval conversation |

### 11.6 Immediate next action

Proceed with **build-sequence step 1**: extend `config/types.ts` with `InstitutionalConfig` and `Institution` interfaces (typed-only, zero runtime impact). Open as its own PR so it can ship independently of copy and business decisions.
