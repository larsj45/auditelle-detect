# VeriTexto BR institutional SEO — 2026-04-22

## Target route

Public institutional landing:

- `/portal-integridade`

This route should be indexed.

Institution-specific portal routes should not be indexed:

- `/portal-integridade/[institutionSlug]`
- `/portal-integridade/[institutionSlug]/historico`
- `/portal-integridade/[institutionSlug]/turmas`
- `/portal-integridade/[institutionSlug]/usuarios`
- `/portal-integridade/[institutionSlug]/configuracoes`
- `/portal-integridade/[institutionSlug]/ajuda`

## Metadata

### Title

`Portal de Integridade Acadêmica | Alternativa ao Turnitin para instituições`

### Meta description

`Portal de Integridade Acadêmica do VeriTexto para escolas, faculdades e universidades brasileiras. Detecção de IA, fluxo de similaridade, turmas, usuários, histórico auditável e implantação institucional em reais.`

### OG title

`Portal de Integridade Acadêmica do VeriTexto`

### OG description

`A alternativa ao Turnitin para instituições brasileiras que precisam de detecção de IA, similaridade, histórico institucional e operação acadêmica em português.`

## Keywords

Use these on the institutional landing only, not on the main homepage:

- `portal de integridade acadêmica`
- `alternativa ao turnitin`
- `turnitin brasil alternativa`
- `detecção de ia para universidades`
- `detecção de ia para faculdades`
- `similaridade acadêmica`
- `plataforma de integridade acadêmica`
- `detector de ia para instituições`
- `software de integridade acadêmica`
- `portal institucional de detecção de ia`

## Copy/SEO rules

### Allowed on `/portal-integridade`

- direct mention of `Turnitin`
- explicit migration framing
- institutional procurement framing
- language about schools, colleges, universities, and academic governance

### Avoid

- repeating `Turnitin` in every section
- turning the page into competitor-keyword stuffing
- unsupported claims about competitor weaknesses
- promising `plágio completo` as a hard headline while Pangram is unresolved

## Recommended H1

`Portal de Integridade Acadêmica`

## Recommended hero subheadline

`A alternativa ao Turnitin para escolas, faculdades e universidades brasileiras que precisam de governança, histórico e operação institucional em português.`

## Indexing policy

### Public landing

- `index,follow`
- include in sitemap

### Institution portal routes

- `noindex,nofollow`
- exclude from sitemap

Reason:
- they are institutional workspaces, not acquisition pages
- public indexing adds noise and potential leakage of institution names
- the commercial discovery page is the reseller-level landing, not the portal itself

## Internal linking

Recommended links into `/portal-integridade`:

- one institutional CTA band on the homepage
- one institutional CTA on the Turnitin comparison landing
- contact page mention for universities / school networks

## Structured data

Phase 1 recommendation:

- keep it simple
- use `WebPage` and `Organization`
- do not add overly specific product schema until the landing is live and stable

## Decision on plagiarism wording

Until Pangram confirms the full paid plagiarism module technically and contractually, the institutional landing should optimize for:

- `detecção de IA`
- `fluxo de similaridade`
- `histórico auditável`
- `turmas e usuários`
- `implantação institucional`

Avoid making `plágio` the core SEO promise of the landing until the backend promise is stable enough to defend.
