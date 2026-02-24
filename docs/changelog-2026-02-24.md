# Changelog — 2026-02-24

**Project:** auditelle-detect
**Author:** Claude (via Lars)
**Status:** Build passes, ready for deploy

---

## Overview

Two major batches of work completed in this session:

1. **Phase 1 complete** — Config layer extraction (multi-reseller architecture)
2. **Pangram API integration improvements** — Better data usage, security fixes

---

## 1. Config Layer (Multi-Reseller Architecture)

Every hardcoded Auditelle-specific value has been extracted into a config-per-reseller system. The entire `src/` directory now reads from `config/auditelle-fr.ts` — zero hardcoded French strings remain.

### New files created

| File | Purpose |
|---|---|
| `config/types.ts` | `ResellerConfig` interface (~450 lines) — single source of truth for every reseller-specific value |
| `config/index.ts` | Async config loader with caching. Uses static `switch` for Turbopack compatibility |
| `config/auditelle-fr.ts` | Complete Auditelle config (~620 lines): branding, locale, legal, plans, all French strings, email templates, error messages, plan details |
| `src/lib/config.ts` | Re-export convenience for `@/lib/config` imports |
| `src/lib/sanitize.ts` | `escapeHtml()` utility for safe email template interpolation |
| `src/components/ConfigProvider.tsx` | React context + `useConfig()` hook for client components |

### How config access works

- **Server components** (pages, layouts): call `await getResellerConfig()` directly
- **Client components** ('use client'): use `useConfig()` hook via React context
- **API routes**: call `await getResellerConfig()` at top of handler
- **`next.config.ts`**: imports config statically (separate compilation lifecycle)

### Files updated to use config

**Components (6):**
- `Navbar.tsx` — nav labels, logo, brand name
- `Footer.tsx` — all labels, email, legal, powered-by (converted to client component)
- `HeroDemo.tsx` — all demo labels, sample texts, error messages
- `FileUpload.tsx` — upload messages
- `DetectionResult.tsx` — score labels, breakdown labels, section analysis
- `AuthForm.tsx` — all form labels, placeholders, error messages

**Pages (7):**
- `page.tsx` (homepage) — hero, trust bar, features, how it works, testimonials, pricing, CTA
- `dashboard/layout.tsx` — nav items, logo, sign out
- `dashboard/page.tsx` — analyzer UI, error messages
- `dashboard/history/page.tsx` — date locale, labels
- `dashboard/account/page.tsx` — plan labels, scans-per-day text
- `dashboard/upgrade/page.tsx` — plans, contact mailto
- `contact/page.tsx` — form labels, subject options, company info
- `demo-video/page.tsx` — all text

**API routes (8):**
- `api/detect/route.ts` — error messages, Bearer regex, max text length
- `api/detect-public/route.ts` — error messages, production error sanitization
- `api/checkout/route.ts` — plan whitelist, error messages
- `api/billing-portal/route.ts` — Bearer regex, error messages
- `api/demo-detect/route.ts` — error messages, Pangram error truncation
- `api/webhooks/stripe/route.ts` — imports config, passes to email functions
- `api/email/welcome/route.ts` — Bearer regex, error messages
- `api/cron/emails/route.ts` — passes config to all email template functions

**Email system:**
- `src/lib/email.ts` — full refactor:
  - `sendEmail()` reads `FROM_EMAIL` from config (`name + noReplyEmail`)
  - Shared `emailWrapper()` function (header + footer HTML)
  - All 6 template functions now take `config: ResellerConfig` as first param
  - `escapeHtml()` applied to all user-provided data (names)
  - All French strings come from `config.strings.emails.*`
  - Template functions: `welcomeEmail`, `subscriptionConfirmedEmail`, `upgradeReminderEmail`, `limitReachedEmail`, `trialExpiringEmail`, `trialEndedEmail`

### Email function signature changes

Old:
```typescript
welcomeEmail(name: string)
subscriptionConfirmedEmail(name: string, plan: string)
upgradeReminderEmail(name: string, usagePercent: number)
trialExpiringEmail(name: string, daysLeft: number)
trialEndedEmail(name: string)
```

New (config added as first param):
```typescript
welcomeEmail(config: ResellerConfig, name: string)
subscriptionConfirmedEmail(config: ResellerConfig, name: string, plan: string)
upgradeReminderEmail(config: ResellerConfig, name: string, usagePercent: number)
limitReachedEmail(config: ResellerConfig, name: string)  // new template
trialExpiringEmail(config: ResellerConfig, name: string, daysLeft: number)
trialEndedEmail(config: ResellerConfig, name: string)
```

All callers have been updated.

### Turbopack constraint

Dynamic `import(path)` with computed paths does not work in Turbopack. The config loader uses a static `switch` statement instead:

```typescript
// config/index.ts
switch (RESELLER_ID) {
  case 'auditelle-fr':
  default:
    mod = await import('./auditelle-fr')
}
```

Each new reseller requires adding one `case` + import line here, plus a static import in `next.config.ts`.

---

## 2. Pangram API Integration Improvements

### Changes to `src/lib/pangram.ts`

**Before:**
- Only exposed `fraction_ai` as `ai_likelihood`
- Faked `detected_model: data.fraction_ai > 0.5 ? 'AI Generated' : undefined`
- Ignored `fraction_ai_assisted`, `fraction_human`, `headline`
- Did not request `public_dashboard_link`

**After:**
- Exposes all three fractions: `ai_likelihood`, `ai_assisted_likelihood`, `human_likelihood`
- Uses Pangram's actual `headline` field (e.g. "AI Detected", "Human Written") instead of fake model name
- Sends `public_dashboard_link: true` in requests to get a `dashboard_link` URL
- Passes `confidence` ("High"/"Medium"/"Low") per text window
- Passes `label` per window (e.g. "AI-Generated", "Moderately AI-Assisted")

### Updated `PangramResult` interface

```typescript
export interface PangramResult {
  ai_likelihood: number
  ai_assisted_likelihood: number   // NEW
  human_likelihood: number          // NEW
  headline: string                  // NEW (replaces fake detected_model)
  prediction?: string
  prediction_short?: string
  dashboard_link?: string           // NEW
  sentences?: Array<{
    text: string
    ai_likelihood: number
    label?: string
    confidence?: string             // NEW
  }>
}
```

### Updated `DetectionResult.tsx` component

- Shows Pangram's `headline` as classification label
- New **breakdown bar** (stacked horizontal bar) showing AI / AI-assisted / Human percentages
- Per-section analysis now shows Pangram's `label` and `confidence` per window
- "View detailed report" link pointing to Pangram's dashboard

### Updated consumers

- `dashboard/page.tsx` — passes new fields to DetectionResult
- `tester/page.tsx` — same
- `api/detect/route.ts` — stores `headline` in scans table `detected_model` column
- `api/demo-detect/route.ts` — uses config strings for fallback verdict, passes `prediction_short` instead of hardcoded French

### New config strings added

```typescript
results: {
  // ... existing ...
  classification: string      // "Classification" (replaces old "detectedModel")
  breakdown: string           // "Repartition du texte"
  aiGenerated: string         // "IA pure"
  aiAssisted: string          // "IA assistee"
  humanWritten: string        // "Humain"
  viewReport: string          // "Voir le rapport detaille"
}
```

---

## 3. Security Fixes (bundled with Phase 1)

| Fix | File(s) | Detail |
|---|---|---|
| XSS prevention | `email.ts` | `escapeHtml()` on all user names in email templates |
| Security headers | `next.config.ts` | HSTS, X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Referrer-Policy |
| Max text length | `detect/route.ts` | 50,000 char limit on text input |
| Plan whitelist | `checkout/route.ts` | `VALID_PLAN_IDS` validation before Stripe checkout |
| Bearer token parsing | `detect`, `checkout`, `billing-portal`, `email/welcome` | Regex match instead of naive `split(' ')[1]` |
| Error sanitization | `detect`, `detect-public` | Production responses don't leak internal error messages |
| Pangram error truncation | `demo-detect/route.ts` | Error text truncated to 200 chars |

---

## 4. Adding a New Reseller (e.g. VeriTexto ES)

Steps for OpenClaw:

1. **Create** `config/veritexto-es.ts` — copy `auditelle-fr.ts`, translate all strings to Spanish, update branding/legal/plans/emails
2. **Add case** in `config/index.ts`:
   ```typescript
   case 'veritexto-es':
     mod = await import('./veritexto-es')
     break
   ```
3. **Add import** in `next.config.ts`:
   ```typescript
   import veritextoEs from "./config/veritexto-es";
   // ... in getResellerRedirects():
   case 'veritexto-es':
     return veritextoEs.redirects || []
   ```
4. **Set env var** `RESELLER_ID=veritexto-es` in the new Vercel project
5. **Set up** separate Supabase project + Stripe account for Spain
6. **Deploy** — same codebase, different config

---

## 5. Build Verification

```
npx tsc --noEmit  ✅ (0 errors)
npm run build     ✅ (22/22 routes, 0 errors)

Route (app)
├ ○ /                    (Static)
├ ƒ /api/detect          (Dynamic)
├ ƒ /api/detect-public   (Dynamic)
├ ƒ /api/checkout        (Dynamic)
├ ƒ /api/billing-portal  (Dynamic)
├ ƒ /api/demo-detect     (Dynamic)
├ ƒ /api/webhooks/stripe (Dynamic)
├ ƒ /api/email/welcome   (Dynamic)
├ ƒ /api/cron/emails     (Dynamic)
├ ○ /contact             (Static)
├ ○ /dashboard           (Static)
├ ○ /dashboard/account   (Static)
├ ○ /dashboard/history   (Static)
├ ○ /dashboard/upgrade   (Static)
├ ○ /demo-video          (Static)
├ ○ /login               (Static)
├ ○ /reset-password      (Static)
├ ○ /signup              (Static)
└ ○ /tester              (Static)
```

---

## 6. Files NOT changed

These files were reviewed and confirmed to not need changes:
- `src/lib/stripe.ts` — generic Stripe client, no hardcoded values
- `src/lib/supabase.ts` — generic Supabase client
- `src/lib/pangram.ts` — updated (see section 2)
- `src/components/PricingCard.tsx` — already generic (takes props)
- Database schema — no migrations needed (`detected_model` column now stores Pangram's `headline` instead of fake "AI Generated")
