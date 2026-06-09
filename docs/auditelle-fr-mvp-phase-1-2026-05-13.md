# Auditelle FR MVP Phase 1

**Date:** 2026-05-13
**Status:** Execution scope for the first revenue-oriented Auditelle build
**Repo inspected:** `auditelle-detect`

## Decision

Use `auditelle-detect` as the immediate build base for Auditelle FR Phase 1.

Do not start Phase 1 by extracting packages from `learnbase-monorepo`. The Learnbase Copyleaks integration is useful reference code, but the Auditelle revenue path is self-serve, Stripe EUR, Pangram-first, and already matches the reseller architecture in this repo.

Auditelle still needs legal and brand separation from Learnbase. That means:

- no Learnbase branding in public Auditelle surfaces;
- Stripe keys must belong to Auditelle SASU;
- Supabase project must be EU-hosted for Auditelle;
- Vercel project/env must be Auditelle-specific;
- any code reused from Learnbase should be treated as implementation reference, not as a shared runtime dependency in Phase 1.

## Current Repo Facts

`auditelle-fr` already exists in `config/auditelle-fr.ts`.

`config/index.ts` already defaults to:

```ts
const RESELLER_ID = process.env.RESELLER_ID || 'auditelle-fr'
```

The repo already has the core building blocks needed for Auditelle self-serve:

- Next.js App Router application;
- config-per-reseller architecture;
- Supabase Auth and profiles;
- Stripe checkout for subscriptions;
- Stripe checkout for credit packs;
- idempotent credit application via `apply_credit_purchase`;
- payment event logging via `payment_events`;
- Pangram AI detection in `src/lib/pangram.ts`;
- Pangram plagiarism/similarity wrapper in `src/lib/pangram.ts`;
- Copyleaks async wrapper in `src/lib/copyleaks.ts`;
- provider resolver in `src/lib/detection-providers.ts`;
- async detection jobs in `src/lib/detection-jobs.ts`;
- public tester, dashboard, history, account, upgrade and Stripe webhook routes.

There is no need to create an `@learnbase/detector-sdk` package before the first Auditelle revenue test.

## Phase 1 Goal

Launch a credible paid Auditelle FR self-serve product that can produce EUR revenue through Stripe SASU without depending on enterprise sales or LTI delivery.

The Phase 1 product is:

> French-language AI detection for educators, powered by Pangram, with paid credits and optional similarity/plagiarism workflow when provider configuration is ready.

## Commercial Shape

Phase 1 should be credit-led, not free-trial-led.

Recommended public offer:

- individual credit packs for teachers and trainers;
- clear EUR pricing;
- no promise of unlimited usage;
- no institutional procurement flow as the primary conversion path;
- paid institutional conversations can route to contact, but should not block the self-serve launch.

The existing subscription plans can stay in the code, but the launch page should emphasize paid credits until monthly usage economics are proven.

## Detector Strategy

### Default

Pangram is the default provider for AI detection.

### Similarity / Plagiarism

Do not over-position plagiarism as complete Turnitin replacement in Phase 1.

Use this positioning:

> detection IA + analyse de similarite

Avoid this as the main headline until provider results, cost, French-language quality and report UX are validated:

> plagiat complet

### Copyleaks

Copyleaks is technically present in this repo, but should remain gated in Phase 1.

Current default resolver behavior:

- AI always resolves to Pangram;
- Copyleaks plagiarism is enabled by reseller allow-list;
- default Copyleaks allow-list is currently `veritexto-br`;
- Auditelle falls back to Pangram plagiarism/similarity unless `COPYLEAKS_PLAGIARISM_ENABLED_RESELLERS` includes `auditelle-fr` and required Copyleaks env vars exist.

This is the right operational posture for Phase 1.

## Copy Risks To Fix Before Launch

`config/auditelle-fr.ts` currently contains several claims that are too aggressive or inconsistent with the current strategy.

Fix these before a paid preview:

- "Essai gratuit" / "gratuit" language, if Auditelle is credit-led;
- "99,9%" claims unless the exact claim is approved and sourced;
- "plagiat" as a complete product promise;
- "IA + plagiat dans le meme rapport" if Copyleaks is not enabled for Auditelle;
- "Integration LMS" / "Moodle" as a live feature;
- "Analyses illimitees" and "SLA 99,9%" for early plans;
- public comparison table claims against Turnitin, GPTZero and Originality unless evidence is documented.

Recommended safer language:

- "Detection IA pour enseignants et organismes de formation";
- "Analyse de similarite en option";
- "Rapports exportables";
- "Service francophone";
- "Facturation EUR par Auditelle SASU";
- "Hebergement et donnees configurees pour l'Europe";
- "Alternative moderne a Turnitin pour les usages self-serve et petites equipes", only in controlled sections.

## Phase 1 Scope

### In Scope

1. Confirm `auditelle-fr` local preview renders cleanly.
2. Tighten Auditelle homepage copy around paid credits and AI detection.
3. Remove or soften unsupported claims from Auditelle config.
4. Confirm `/signup`, `/dashboard`, `/dashboard/upgrade`, `/api/checkout-credits`, `/api/webhooks/stripe`, and `/api/detect` work under `RESELLER_ID=auditelle-fr`.
5. Confirm Stripe SASU env names and webhook secret are present in the Auditelle Vercel project.
6. Confirm Supabase project is EU-hosted and has current migrations:
   - `scan_credits`;
   - `payment_events`;
   - `apply_credit_purchase`;
   - `provider_credentials_cache`;
   - `detection_jobs`.
7. Run one low-value live Stripe credit purchase in test mode or preview-safe mode.
8. Run one Pangram AI detection from a newly credited account.
9. Keep Copyleaks disabled unless a deliberate French-language test is scheduled.
10. Prepare a deploy preview for Auditelle FR.

### Out Of Scope

- extracting `@learnbase/detector-sdk`;
- publishing private npm packages;
- LTI 1.3;
- Moodle/Canvas production integration;
- institutional portal routes for Auditelle;
- enterprise admin dashboard;
- Copyleaks as default provider for Auditelle;
- shared Learnbase/Auditelle billing;
- public fake customer logos or institution examples;
- public claim that Auditelle is already replacing full Turnitin workflows.

## Recommended File Changes

### Required

- `config/auditelle-fr.ts`
  - rewrite public claims;
  - make credit-led CTA explicit;
  - remove free-trial language where inaccurate;
  - soften plagiarism and LTI claims;
  - review pricing table.

- `src/app/page.tsx`
  - institutional band is currently Portuguese when `config.institutional?.enabled`; ensure Auditelle does not render Portuguese copy if institutional is later enabled.

- `src/app/tester/page.tsx` and `src/components/HeroDemo.tsx`
  - verify whether free testing is still intentional for Auditelle.

- Vercel env for Auditelle project
  - `RESELLER_ID=auditelle-fr`;
  - `NEXT_PUBLIC_APP_URL=https://www.auditelle.fr`;
  - Auditelle SASU Stripe keys;
  - Auditelle Supabase keys;
  - Pangram key;
  - Resend sender/domain for Auditelle.

### Optional After Preview

- add `auditelle-fr` to `COPYLEAKS_PLAGIARISM_ENABLED_RESELLERS` only for controlled tests;
- create a dedicated Auditelle institutional/contact landing later;
- carve Auditelle into a separate `auditelle-portal` repo once the current launch surface is clean.

## Execution Checklist

### Day 1: Local Auditelle Preview

- run `RESELLER_ID=auditelle-fr npm run dev -- --port 3005`;
- review `/`, `/signup`, `/dashboard/upgrade`, `/tester`, `/contact`;
- list all visible free-trial, LTI, plagiarism-complete and unsupported precision claims;
- patch `config/auditelle-fr.ts` first, not shared components.

### Day 2: Paid Credits Path

- verify credit packs shown in `/dashboard/upgrade`;
- verify `/api/checkout-credits` uses Auditelle EUR;
- verify Stripe metadata includes `brand=auditelle-fr`;
- verify webhook writes `payment_events`;
- verify `apply_credit_purchase` increments `scan_credits` idempotently.

### Day 3: Detection Path

- verify no-credit users are blocked;
- verify credited users can run Pangram AI detection;
- verify credits decrement by 1 for AI detection;
- verify mode labels do not imply unavailable plagiarism if Copyleaks is gated;
- verify scan history stores expected results.

### Day 4: Deploy Preview

- create or update the Auditelle Vercel project with `RESELLER_ID=auditelle-fr`;
- confirm EU Supabase binding;
- run a preview smoke test;
- prepare a short launch note with known limitations.

## Open Decisions

1. Should Auditelle Phase 1 keep a public free tester, or should all meaningful analysis require paid credits?
2. Should monthly subscriptions remain visible, or should the landing page focus only on credit packs until CAC and activation are known?
3. Should `auditelle-detect` remain the canonical multi-reseller repo, or should Auditelle be carved into `auditelle-portal` before first paid traffic?
4. What exact Pangram accuracy claim is contractually safe to publish in French?
5. Is Copyleaks approved for Auditelle SASU billing and French-language similarity tests, or only for Learnbase/VeriTexto use today?

## Recommended Next Task

Run the local Auditelle preview and patch `config/auditelle-fr.ts` so public copy matches the Phase 1 strategy.

Command:

```bash
RESELLER_ID=auditelle-fr npm run dev -- --port 3005
```

Review:

- `http://localhost:3005/`
- `http://localhost:3005/signup`
- `http://localhost:3005/dashboard/upgrade`
- `http://localhost:3005/tester`
- `http://localhost:3005/contact`

Do not create new Learnbase packages before this preview is clean.
