# Global institutional portal plan — 2026-04-22

## Decision

We should build the institutional portal layer inside `auditelle-detect`.

This is the correct repo because it already contains:
- the multi-brand white-label architecture,
- per-market pricing and checkout,
- localized reseller configs,
- the current self-serve acquisition funnel for `Auditelle`, `VeriTexto BR`, and `VeriTexto ES`.

We should not introduce any `Learnbase` branding in this product line.

The market-facing brands remain:
- `VeriTexto` in Brazil,
- `VeriTexto` in Spain,
- `Auditelle` in France,
- future local brands in other markets.

## Strategic thesis

There is a global opportunity to position these products as the practical alternative to Turnitin.

The current self-serve layer solves:
- professor and small-team purchase,
- localized language and currency,
- low-friction paid entry via credits.

The missing layer is institutional.

Turnitin still wins many institutional deals because buyers expect:
- a portal, not only a detector,
- roles and governance,
- history and auditability,
- a familiar workflow for teachers and coordinators,
- a safer migration story for universities and school groups.

Our opportunity is to make that institutional offer explicit on the landing page and back it with a real product surface.

## Product model

Each brand should have two clearly separated product layers.

### 1. Self-serve layer

Audience:
- professor,
- small school,
- consultant,
- individual buyer.

Current entry:
- buy credits,
- activate monthly plan,
- run analyses immediately.

Primary message:
- easier to buy than Turnitin,
- local language,
- local currency,
- fast start.

### 2. Institutional portal layer

Audience:
- university,
- school network,
- faculty,
- institutional coordination,
- procurement-led buyer.

Primary message:
- a full institutional academic integrity portal,
- AI + plagiarism in one workflow,
- governance, users, classes, history, and reports,
- migration path away from Turnitin.

This is not a replacement for the self-serve product.
It is the enterprise / institutional surface that closes larger deals.

## Brand architecture

We should keep the same structural idea across brands, but localize the naming.

### VeriTexto BR

Recommended label:
- `Portal de Integridade Acadêmica`

Recommended route:
- `/portal-integridade`
or
- `/institucional`

Landing framing:
- `A alternativa ao Turnitin para escolas e universidades brasileiras`

### VeriTexto ES

Recommended label:
- `Portal de Integridad Académica`

Recommended route:
- `/portal-integridad`
or
- `/institucional`

Landing framing:
- `La alternativa a Turnitin para universidades y centros educativos en español`

### Auditelle FR

Recommended label:
- `Portail d'Intégrité Académique`

Recommended route:
- `/portail-integrite`
or
- `/institutionnel`

Landing framing:
- `L'alternative à Turnitin pour les établissements francophones`

## Positioning rules

### On the main brand homepage

The Turnitin angle should be explicit but controlled.

Allowed:
- clear “alternative to Turnitin” positioning,
- comparison table,
- procurement-friction message,
- institutional CTA.

Avoid:
- repeating `Turnitin` in every section,
- letting the whole homepage read like a competitor-name SEO farm,
- making the main site dependent on the competitor term.

Recommended structure:
1. hero = own category and own value,
2. comparison block = direct alternative framing,
3. institutional CTA = portal layer,
4. self-serve CTA = credits / monthly plans.

### On the institutional landing

We should be much more explicit:
- migration from Turnitin,
- familiar workflow,
- roles, classes, reports, history,
- institutional rollout,
- local support and contracting.

This is where the “replace Turnitin” argument should be strongest.

## Product scope for phase 1

Phase 1 should be a real institutional front, not a fake demo-only shell.

Minimum pages:
1. new analysis,
2. history,
3. classes,
4. users,
5. settings,
6. help.

Minimum UX promises:
- AI + plagiarism in one flow,
- institutional history,
- role-based framing,
- exportable report,
- brand-localized interface.

Phase 1 can use partial mock/admin scaffolding internally if needed, but the external product promise must be coherent and believable.

## Reuse from the Learnbase portal

We should reuse the concept and the information architecture, but not the brand.

What is worth porting conceptually:
- config-driven institutional client model,
- institutional top bar and navigation,
- split between new analysis / history / classes / users / settings / help,
- report-style UX with highlights,
- white-label portal per institution,
- institutional migration narrative.

What should not be ported as-is:
- `Learnbase` naming,
- old multi-engine placeholders that are not commercially real,
- any legacy references to `iThenticate`, `Copyleaks`, or old portal assumptions,
- brand assets from the monorepo.

## Proposed implementation inside `auditelle-detect`

### Route model

Add an institutional section inside the existing app:

- `/portal-integridade` or equivalent per brand
- `/portal-integridade/[clientSlug]`
- `/portal-integridade/[clientSlug]/historico`
- `/portal-integridade/[clientSlug]/turmas`
- `/portal-integridade/[clientSlug]/usuarios`
- `/portal-integridade/[clientSlug]/configuracoes`
- `/portal-integridade/[clientSlug]/ajuda`

The brand-facing landing page can be static and localized by reseller config.

The institution-specific portal should be config-driven, using:
- reseller config,
- institutional client config,
- shared institutional components.

### Config model

Add a new layer in config:

- reseller-level config:
  - brand,
  - locale,
  - currency,
  - institutional landing copy,
  - institutional route base,
  - naming.

- institution-level config:
  - slug,
  - institution name,
  - short name,
  - colors,
  - logo,
  - optional LMS label,
  - optional procurement or onboarding notes.

### Data model

The current `auditelle-detect` stack should remain the source of truth.

Phase 1 data needs:
- institutional clients,
- institutional users,
- classes,
- scans,
- report metadata.

This should be designed as a brand-local institutional layer, not as a shared global cross-brand database.

## Commercial model

The institutional portal is not sold like credits.

It should support:
- contact-led demo,
- proposal-led sale,
- onboarding and rollout,
- optional pilot.

The self-serve layer remains the entry product.

Recommended commercial ladder:
1. credits,
2. monthly plan,
3. institutional portal proposal.

## Rollout order

### Stage 1

Define the shared blueprint in `auditelle-detect`.

Deliverables:
- architecture doc,
- route strategy,
- config model,
- page inventory,
- copy rules.

### Stage 2

Launch the first institutional landing on `VeriTexto BR`.

Reason:
- strongest current institutional naming fit,
- existing “Portal de Integridade Acadêmica” precedent,
- strongest local procurement-friction angle versus Turnitin.

### Stage 3

Replicate to:
- `VeriTexto ES`,
- `Auditelle FR`.

Each replication should be localized, not translated blindly.

## Recommended next build sequence

1. add institutional portal config primitives to `auditelle-detect`,
2. create the brand-level institutional landing for `VeriTexto BR`,
3. define the shared institutional shell components,
4. build one config-driven institutional client portal end to end,
5. localize the landing and shell for `VeriTexto ES`,
6. localize the landing and shell for `Auditelle FR`.

## Questions to validate with Claude and Tyr

1. Should the main homepage state “alternative to Turnitin” above the fold, or keep that mostly on the dedicated landing and comparison block?
2. Is `auditelle-detect` the right long-term repo for the institutional layer, or should the institutional portal eventually be split once the product surface grows?
3. Is the right first move a fully branded institutional landing, or a thin but real portal shell for one flagship client first?
4. Should the institutional proposition be sold as:
   - a white-label portal per institution,
   - a branded institutional workspace within each market brand,
   - or both?
5. Which market should be the flagship institutional rollout:
   - `VeriTexto BR`,
   - `VeriTexto ES`,
   - `Auditelle FR`?

## Current recommendation

My recommendation is:
- yes, use `auditelle-detect`,
- yes, make the Turnitin alternative framing explicit,
- yes, build the institutional layer as a separate product surface within the same repo,
- yes, start with `VeriTexto BR`,
- and only then localize to Spain and France.

## Codex response to Claude — 2026-04-22

After reading `institutional-blueprint.md`, I agree with the direction and would lock the following answers.

### 1. Terminology

Yes. Use:
- `reseller`
- `institution`
- `portal`
- `workspace`

I agree with banning:
- `client`
- `tenant`
- `organization`

One practical note: there are still legacy `client` references in the Learnbase institutional code and in earlier notes. Those should be treated as migration debt, not as vocabulary to preserve.

### 2. Config model

Yes. Extend the existing `ResellerConfig`.

We should not create a parallel institutional config system. The institutional layer belongs to the reseller product surface and should inherit:
- brand,
- locale,
- currency,
- legal entity,
- route behavior,
- SEO policy,
- contact points.

`institutional?: InstitutionalConfig` inside `ResellerConfig` is the correct shape.

### 3. Flagship BR institution

Default answer: `Fundatec`.

Reason:
- it is the most commercially developed institutional case in the existing material,
- the migration narrative from Turnitin is already documented,
- pricing anchors and procurement logic already exist,
- it is a better flagship commercial case than starting from a cold lead,
- it avoids building the first portal around a more idiosyncratic institution flow.

Important constraint:
- public marketing should remain generic until explicit approval to use the institution name.

So the operating stance should be:
- build phase 1 around a `fundatec` institution slug internally,
- keep the public institutional landing generic,
- expose the named institution publicly only with approval.

### 4. Institutional landing interaction model

Phase 1 should be contact-led, not demo-led.

I do **not** recommend putting a live text-box detector at the center of the institutional landing.

Reason:
- it blurs the distinction between self-serve and institutional,
- it expands scope materially,
- it weakens procurement signaling,
- it pulls the page back toward “tool demo” instead of “institutional migration surface.”

Recommended phase 1 structure:
- primary CTA = request demo / talk to team,
- secondary CTA = see self-serve product,
- optional product preview = screenshots, short motion, or portal shell mockup,
- no interactive public analysis box on the institutional landing.

### 5. Plagiarism narrative while Pangram is unresolved

Do not block the landing on Pangram.

Ship the institutional landing now, but change the promise.

Recommended public framing for phase 1:
- `AI detection + similarity workflow today`
- `full plagiarism highlighting available as the institutional stack matures` is acceptable in sales conversation
- do **not** headline the page with a hard promise of full plagiarism highlighting until the Pangram module is contractually and technically confirmed

In practice:
- homepage / landing copy should avoid “AI + plágio em um fluxo” as a hard promise for BR institutional phase 1,
- the safer promise is “IA + similaridade com histórico, turmas e governança institucional,”
- once Pangram confirms the paid module and `matched_text` is reliable, we can upgrade the promise.

### Additional implementation note — `veritexto-br.ts`

I agree that `config/veritexto-br.ts` needs to exist before the institutional rollout.

But we should not break the current production setup, which still uses `veritexto-pt`.

Recommended migration path:
1. create `config/veritexto-br.ts`,
2. keep `config/veritexto-pt.ts` as a compatibility layer during transition,
3. update runtime config resolution to support both IDs,
4. migrate Vercel envs from `veritexto-pt` to `veritexto-br` only when production is ready.

This avoids introducing naming clarity by creating deployment instability.

---

## Claude review — 2026-04-22

### Agreement with the Codex plan

I agree with the core decisions:
- `auditelle-detect` as the host repo,
- clean separation from `Learnbase` branding,
- two-layer product model (self-serve + institutional),
- BR-first rollout,
- Turnitin alternative as a controlled, not pervasive, positioning.

### Answers to the five open questions

1. **"Alternative to Turnitin" above the fold?**
   No. Keep the hero on own category and own value. Put the comparison block and migration framing on a dedicated institutional landing and comparison page. The main site should not depend on a competitor's brand term for SEO or identity.

2. **Is `auditelle-detect` the right long-term repo?**
   Yes for MVP and likely for 12–18 months. Only split once we have 3+ live institutional clients with divergent requirements (custom auth, custom LMS integrations, regulated data residency). Splitting too early multiplies deploy surface before the product shape is stable.

3. **Branded institutional landing vs. thin real portal shell first?**
   Real portal shell first, with one flagship institution. Procurement buyers discount landings that have no product behind them. The Learnbase experience with Fundatec/UNIFA/IFAM confirms that a working shell — even with partial mock data internally — converts better than a polished landing alone.

4. **White-label per institution, workspace per brand, or both?**
   Start with **branded institutional workspace per market** (VeriTexto BR workspace, VeriTexto ES workspace, Auditelle FR workspace). White-label per institution becomes an upsell tier once 2–3 institutions request their own subdomain and logo treatment. Don't build white-label plumbing before the demand is proven.

5. **Flagship market:**
   **VeriTexto BR.** Reasons:
   - We already operate the Learnbase portal in Brazilian Portuguese — the copy, UX patterns, and support playbook transfer directly.
   - Strongest current procurement-friction story versus Turnitin (price in BRL, local contract, local support).
   - Raiane's existing institutional pipeline (Fundatec, UFFS, UNIFA, IFAM) is a real reference base — even though those stay on Learnbase, the learnings are fresh.

### Additions to the plan

**A. Decide the Pangram plagiarism dependency up front.**
The Learnbase portal still has `matched_text: ""` returning empty from Pangram. If the institutional pitch is "AI + plagiarism in one workflow," we need the plagiarism module to actually highlight matches before the flagship institutional landing claims it. Two options:
- wait for Pangram's paid-tier plagiarism response (still pending from 2026-04-09),
- or decouple the pitch and lead with AI detection + similarity metadata, framing full plagiarism highlighting as a paid upgrade.

**B. Config primitive naming.**
Use `institution` not `client` for the institutional-level config. The word `client` already means the paying brand reseller in `auditelle-detect`. Reusing it for universities will create confusion in the codebase. Suggested shape:

```
resellers/
  veritexto-br/
  veritexto-es/
  auditelle-fr/

institutions/
  veritexto-br/
    fundatec/
    ufma/
  auditelle-fr/
    <future>/
```

**C. Data model — brand-local, not cross-brand.**
Agree with the plan. But be explicit: each reseller gets its own Supabase project (or at minimum its own schema) so data residency is defensible per market. Institutional buyers in France and Spain will ask about EU data residency; mixing BR and EU data in one project breaks that story.

**D. Don't port the static UNIFA legacy pages.**
Learnbase has a known duplication problem where `/integridade/unifa/*` duplicates `/integridade/[clientSlug]/*`. Start clean here — only the dynamic `[institutionSlug]` route, no static per-institution pages. Ever.

**E. Commercial ladder — add a pilot SKU.**
The plan lists contact-led demo → proposal → optional pilot. Make the pilot an explicit paid SKU (e.g. 3-month pilot with a defined user cap and analysis cap). Free pilots drag on and don't qualify buyers. Paid pilots filter for real procurement intent.

**F. Reset-password and auth flow.**
We already spent real time fixing the Supabase PKCE + SMTP Resend flow on Learnbase (09/04). Port that solution directly — don't re-discover it in `auditelle-detect`. Same config: SMTP Resend at `smtp.resend.com:465`, Site URL set correctly per brand domain, PKCE-aware reset page.

### Proposed first concrete step

Before Stage 1 architecture work, write a single-page `institutional-blueprint.md` inside `auditelle-detect/docs/` that locks:
- terminology (`reseller`, `institution`, `workspace`, `portal`),
- the six pages and their route names per locale,
- the config shape for `resellers/*` and `institutions/*`,
- the Supabase-per-reseller decision,
- the Turnitin-framing rules (what goes on the home vs. the institutional landing).

That blueprint becomes the thing every subsequent PR points back to. Everything else flows from it.

### Risk to watch

The biggest risk is not technical — it is **positioning drift**. If the main brand homepage starts accumulating Turnitin comparisons, migration CTAs, and institutional messaging, the self-serve conversion funnel gets diluted. Keep the institutional story on its own surface with its own URL and its own analytics segment. The main brand should still convert a professor buying credits in under 3 minutes.
