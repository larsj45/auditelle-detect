# Pangram Reseller Platform — Architecture Proposal

**Prepared by:** Lars Janér (Global Edtech Ventures)
**Date:** 23 February 2026
**For:** OpenClaw collaboration
**Status:** Implemented — 3 resellers live (auditelle-fr, veritexto-es, veritexto-pt) as of 2026-02-25
**Note:** Repo was NOT renamed to `pangram-resellers` as proposed — still `auditelle-detect`.

---

## Context

We are building white-label SaaS platforms that wrap the Pangram AI detection API for resellers in different countries. Three deployments are already live:

- **Auditelle** (France) — full SaaS, auditelle.fr
- **NovaLearn** (UK) — live, novalearn.co.uk
- **VeriTexto** (Spain) — live, veritexto.es
- **VeriTexto** (Brazil) — live, veritexto.com.br

**Goal:** Launch **10+ reseller platforms** with the same core functionality but localised branding, language, pricing, legal entities, and payment infrastructure.

**Current approach:** Forking the repo per reseller. **Target:** Migrate to a single source repo with config-per-reseller.

---

## Current State

| Layer | Implementation |
|-------|---------------|
| Frontend | Next.js 16 (App Router) |
| Auth | Supabase Auth (separate project per reseller) |
| Database | Supabase Postgres + RLS (separate per reseller) |
| Payments | Stripe (separate account per reseller, local currency) |
| AI Detection | Pangram Labs API v3 (shared key — rate limits TBD with Pangram) |
| Email | Resend API |
| Hosting | Vercel (auto-deploy on push, already running 4+ projects from separate repos) |
| Analytics | Google Ads conversion tracking |
| Monitoring | Daily Python script → Discord (needs improvement) |

### What's hardcoded per reseller

After a full audit of the Auditelle codebase, **32 source files** contain reseller-specific content:

| Category | Scope | Examples |
|----------|-------|---------|
| **Branding** | 15+ file instances | "Auditelle", logo files, domain references |
| **Language** | ~50+ strings across components, pages, emails | All UI copy in French, no i18n layer |
| **Pricing** | 7 Stripe price IDs, plan names, EUR currency | "Équipe", "Département", "Institution" |
| **Legal** | 5+ file instances | "Auditelle SASU", SIREN 945117000, "Paris, France", RGPD claims |
| **Contact** | 6 instances across 4 files | contact@auditelle.fr, noreply@auditelle.fr |
| **SEO/Meta** | Layout file | French titles, descriptions, keywords, `lang="fr"`, `locale: 'fr_FR'` |
| **Analytics** | Layout + dashboard | Google Ads ID `AW-17962560127` |
| **Email templates** | 7 templates in `email.ts` | All copy in French, Auditelle branding, legal footer |
| **External services** | `.env` files | Stripe, Supabase, Pangram, Resend API keys |

**Key files with heaviest concentration:**
- `src/lib/email.ts` — 7 email templates, all French, all Auditelle-branded
- `src/app/page.tsx` — entire homepage content
- `src/app/layout.tsx` — metadata, analytics, lang
- `src/app/dashboard/upgrade/page.tsx` — pricing/plans
- `src/components/Footer.tsx` — legal entity, contact
- `scripts/create-stripe-products.js` — Stripe product setup (EUR)

---

## Agreed Architecture: Config-Per-Reseller

Both parties agree: **Option C (single repo, config-per-reseller)** is the right approach at this stage.

### Options Rejected

| Option | Why rejected |
|--------|-------------|
| **Fork per reseller** | Current approach — unsustainable past 4-5 resellers. Bug fixes applied N times, drift inevitable. |
| **Monorepo (Turborepo/Nx)** | Over-engineering for now. Good migration target later if per-reseller customisation needs grow. |
| **Multi-tenant single deploy** | Shared database = data isolation concerns. Single point of failure. Hard to hand off to independent resellers. |

### Repository Structure

```
pangram-resellers/                    (consolidated from current forks)
├── config/
│   ├── index.ts                      ← exports getResellerConfig()
│   ├── auditelle-fr.ts               ← France (pilot for refactoring)
│   ├── novalearn-uk.ts               ← UK
│   ├── veritexto-es.ts               ← Spain (first to launch from unified repo)
│   └── types.ts                      ← ResellerConfig type definition
│
├── public/
│   └── brands/
│       ├── auditelle/                ← logos, favicon, OG images
│       ├── novalearn/
│       └── veritexto/
│
├── src/
│   ├── app/                          ← shared app code (no hardcoded strings)
│   ├── components/                   ← shared components (read from config)
│   ├── lib/
│   │   ├── config.ts                 ← runtime config accessor
│   │   ├── email.ts                  ← templates parameterised by config
│   │   ├── pangram.ts                ← unchanged
│   │   └── stripe.ts                 ← unchanged
│   └── ...
│
├── scripts/
│   └── create-stripe-products.js     ← already functional, document usage
│
├── .env.example                      ← template for all required env vars
└── vercel.json
```

**Note on i18n:** No library (e.g. next-intl) for now. All UI strings live directly in the config files per reseller. Revisit when non-technical translators need to edit strings without touching code.

### The ResellerConfig Type

Each reseller config file exports a typed object containing all localised content:

```typescript
// config/types.ts

export interface ResellerConfig {
  id: string                          // e.g. "auditelle-fr"

  // Branding
  name: string                        // e.g. "Auditelle"
  domain: string                      // e.g. "auditelle.fr"
  logoPath: string                    // e.g. "/brands/auditelle/logo.svg"
  tagline: string                     // e.g. "Détection IA la plus précise du marché"

  // Locale
  locale: string                      // e.g. "fr", "en", "de"
  htmlLang: string                    // e.g. "fr", "en", "es"
  currency: string                    // e.g. "EUR", "GBP", "USD"
  timezone: string                    // e.g. "Europe/Paris"

  // Legal
  legalEntity: string                 // e.g. "Auditelle SASU"
  registrationNumber: string          // e.g. SIREN, Companies House number
  registrationLabel: string           // e.g. "SIREN", "Company No."
  country: string                     // e.g. "France"
  city: string                        // e.g. "Paris"
  dataProtectionLabel: string         // e.g. "RGPD", "GDPR", "DSGVO"

  // Contact
  supportEmail: string                // e.g. "contact@auditelle.fr"
  noReplyEmail: string                // e.g. "noreply@auditelle.fr"

  // Pricing — plan definitions
  plans: PlanDefinition[]

  // Analytics (optional)
  googleAdsId?: string
  googleAdsConversionLabel?: string

  // Feature flags
  features: {
    fileUpload: boolean
    apiAccess: boolean
    teamManagement: boolean
    demoPage: boolean
  }

  // UI strings — all user-facing text lives here
  strings: {
    nav: { features: string; pricing: string; dashboard: string; login: string; freeTrial: string }
    hero: { title: string; subtitle: string; cta: string }
    features: Record<string, { title: string; description: string }>
    pricing: { title: string; subtitle: string; ctaFree: string; ctaPaid: string; enterprise: string }
    footer: { description: string; copyright: string; allRightsReserved: string }
    auth: { signIn: string; signUp: string; forgotPassword: string; errors: Record<string, string> }
    dashboard: { /* scan UI, history, upgrade strings */ }
    emails: { /* welcome, confirmation, reminder template strings */ }
    errors: Record<string, string>
  }
}

export interface PlanDefinition {
  id: string                          // internal key: "starter", "pro", etc.
  name: string                        // display name in local language
  scansPerDay: number
  priceMonthly: number                // display price (e.g. 25 for €25)
  highlighted: boolean                // show as "recommended"
  // Stripe price ID comes from env var, not config
}
```

### Config Loading

```typescript
// config/index.ts

import type { ResellerConfig } from './types'

const RESELLER_ID = process.env.RESELLER_ID || 'auditelle-fr'

export async function getResellerConfig(): Promise<ResellerConfig> {
  const config = await import(`./${RESELLER_ID}`)
  return config.default
}
```

### Environment Variables Per Reseller

Each Vercel project sets:

```env
# Identity
RESELLER_ID="auditelle-fr"
NEXT_PUBLIC_APP_URL="https://www.auditelle.fr"

# Supabase (separate project per reseller)
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."

# Pangram (shared key for now — check rate limits with Pangram)
PANGRAM_API_KEY="..."

# Stripe (separate account per reseller)
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_STUDENT_PRICE_ID="price_..."
STRIPE_STARTER_PRICE_ID="price_..."
STRIPE_PRO_PRICE_ID="price_..."
STRIPE_EQUIPE_PRICE_ID="price_..."
STRIPE_DEPARTEMENT_PRICE_ID="price_..."
STRIPE_UNIVERSITY_PRICE_ID="price_..."
STRIPE_ENTERPRISE_PRICE_ID="price_..."

# Resend
RESEND_API_KEY="re_..."

# Analytics (optional)
NEXT_PUBLIC_GOOGLE_ADS_ID="AW-..."
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL="..."
```

---

## Deployment Model

```
GitHub repo: pangram-resellers (single source of truth)
    │
    ├── Vercel Project: auditelle-prod
    │   ├── Domain: auditelle.fr
    │   ├── Env: RESELLER_ID=auditelle-fr
    │   ├── Supabase: auditelle project
    │   └── Stripe: Auditelle SASU (EUR)
    │
    ├── Vercel Project: novalearn-prod
    │   ├── Domain: novalearn.co.uk
    │   ├── Env: RESELLER_ID=novalearn-uk
    │   ├── Supabase: novalearn project
    │   └── Stripe: NovaLearn Ltd (GBP)
    │
    ├── Vercel Project: veritexto-prod
    │   ├── Domain: veritexto.es
    │   ├── Env: RESELLER_ID=veritexto-es
    │   ├── Supabase: veritexto project
    │   └── Stripe: VeriTexto SL (EUR)
    │
    └── ... (10+ more)
```

**Push to `main`** → all Vercel projects rebuild automatically with their own env vars.

---

## Implementation Plan

### Approach: Pilot on Auditelle, launch VeriTexto ES clean

OpenClaw's recommendation (agreed): Use Auditelle as the refactoring pilot. VeriTexto ES becomes the first reseller deployed from the unified repo. Existing forks (NovaLearn, etc.) continue running independently until consolidated.

### Phase 1: Extract config layer (Auditelle pilot)
1. Define `ResellerConfig` type with `strings` object for all UI text
2. Create `config/auditelle-fr.ts` — move all hardcoded French strings, branding, legal, pricing into it
3. Create `config/index.ts` loader
4. Wire up components/pages to read from config instead of hardcoded values
5. **Verify Auditelle still works identically** — no user-visible changes

### Phase 2: Parameterise email templates
1. Move email template strings into `config.strings.emails`
2. Refactor `src/lib/email.ts` to accept config object
3. Add HTML escaping for user-provided data (security fix — do this now)

### Phase 3: Asset separation
1. Move Auditelle logos/favicons to `public/brands/auditelle/`
2. Update layout/components to load from `config.logoPath`

### Phase 4: Create VeriTexto ES config
1. Create `config/veritexto-es.ts` with Spanish strings, pricing, legal entity
2. Add brand assets to `public/brands/veritexto/`
3. Deploy as new Vercel project with `RESELLER_ID=veritexto-es`
4. End-to-end test: signup → scan → payment → email

### Phase 5: Document and consolidate
1. Document Stripe setup process per reseller (scripts already functional)
2. Set up Supabase CLI for repeatable schema migrations (currently manual via SQL Editor)
3. Consolidate NovaLearn and other existing forks into the unified repo

### Phase 6+: Onboard remaining resellers
Each new reseller = new config file + brand assets + Vercel project + Supabase project + Stripe account.

---

## Per-Reseller Onboarding Checklist

| Item | Owner | Notes |
|------|-------|-------|
| Legal entity registered | Lars | Country-specific business entity |
| Domain purchased | Lars | e.g. veritexto.es |
| Brand assets (logo, colours, favicon) | Lars/Designer | SVG + PNG, light + dark variants |
| Config file with translated strings | Lars → OpenClaw | `config/{reseller-id}.ts` |
| Supabase project created | OpenClaw | New project, schema migrated via CLI |
| Stripe account created | Lars | Country-specific, correct currency |
| Stripe products created | OpenClaw | Run existing setup script |
| Resend domain verified | OpenClaw | For noreply@{domain} |
| Vercel project created | OpenClaw | Linked to repo, all env vars set |
| DNS configured | Lars/OpenClaw | Domain → Vercel |
| Google Ads account (optional) | Lars | Per-country tracking |
| End-to-end test | OpenClaw | Signup → scan → payment → email |

---

## Decisions Log

| Decision | Agreed | Notes |
|----------|--------|-------|
| Architecture: config-per-reseller | Yes | Both parties agree. Monorepo is future fallback if needed. |
| Supabase: separate per reseller | Yes | Already the practice (Auditelle, Learnbase BR separated). |
| i18n: no library, strings in config | Yes | Revisit when non-technical translators are involved. |
| Pangram API key: shared for now | Yes | Need to check rate limits with Pangram. |
| Stripe scripts: document, don't re-automate | Yes | Already functional. Documentation is the priority. |
| Schema migrations: adopt Supabase CLI | Yes | Currently manual via SQL Editor — needs to change for 10+ projects. |
| Monitoring: improve beyond Discord script | Yes | Scope TBD. |
| Pilot: Auditelle refactor → VeriTexto ES first | Yes | VeriTexto ES is the next launch. |

---

## Security Fixes to Bundle Into Refactoring

These should be addressed during Phase 1-2, not deferred:

| Fix | Effort | Impact |
|-----|--------|--------|
| HTML-escape user data in email templates | Small | Prevents XSS in emails |
| Add max text length validation on detect API | Small | Prevents payload abuse |
| Add security headers (HSTS, CSP, X-Frame-Options) | Small | Standard web security |
| Validate plan names against whitelist in checkout | Small | Prevents enumeration |
| Replace in-memory rate limiting with persistent store | Medium | Rate limits survive deploys |
| Truncate Pangram error messages in production | Small | Prevents info leakage |

---

## Open Items

| Item | Owner | Status |
|------|-------|--------|
| Check Pangram rate limits for shared API key | Lars | Pending — contact Pangram |
| Define monitoring/alerting improvements | OpenClaw | Pending — scope TBD |
| Supabase CLI setup for migrations | OpenClaw | Pending |
| VeriTexto ES: legal entity, domain, brand assets | Lars | Pending |

---

## Summary

**Approach:** Single codebase, config-per-reseller, separate Vercel/Supabase/Stripe per country. No i18n library — strings live in config files.

**Strategy:** Refactor Auditelle as pilot (Phases 1-3), then launch VeriTexto ES as the first clean deployment (Phase 4). Consolidate existing forks afterwards. New resellers onboard via checklist.

**Why this works:** Minimal refactoring from current state. One bug fix deploys to all resellers. Each reseller keeps independent data, payments, and legal entity. Can evolve to monorepo later if needed.
