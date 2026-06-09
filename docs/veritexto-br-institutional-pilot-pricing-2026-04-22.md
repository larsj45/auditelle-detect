# VeriTexto BR institutional pilot pricing — 2026-04-22

## Decision

For `VeriTexto BR`, the institutional pilot should be:

- **paid**
- **semiannual (6 months)**
- **priced in BRL**
- **sold as a pilot cycle, not as a free proof of concept**

This should be the first commercial SKU for the institutional layer.

## Why

Three constraints matter here:

1. Brazilian institutions buy on academic-cycle logic, not startup-trial logic.
2. A free pilot does not qualify procurement; it creates activity without commitment.
3. A 3-month cycle sounds fragile for an institutional product and creates needless renewal friction.

So the right shape is not:
- free trial,
- or cheap exploratory pilot,
- or a public quarterly tier.

The right shape is:
- **paid pilot**
- **semester-aligned**
- **clearly framed as institutional adoption**

## Recommended public commercial structure

### Primary SKU

`Piloto Institucional Semestral`

- Duration: **6 months**
- Included analyses: **800**
- Price: **R$ 32.500**
- Overage: **R$ 6.000 per block of 100 analyses**

Included:
- institutional portal
- unlimited institutional users
- classes and role-based access
- AI detection + similarity workflow
- exportable reports
- onboarding
- 1 remote training session
- usage alerts at 70% and 90%
- 6 months read-only access after non-renewal

### Secondary SKU

`Operação Institucional Anual`

- Duration: **12 months**
- Included analyses: **1.800**
- Price: **R$ 60.000**
- Overage: **R$ 5.000 per block of 100 analyses**

Included:
- everything in the semiannual pilot
- 2 remote training sessions
- higher support priority

## What should not be public

Do not publish a normal quarterly institutional plan.

If sales needs a shorter fallback, it should exist only as an internal concession, not as a menu item.

### Internal-only fallback

Use only if a buyer explicitly refuses the semiannual cycle and a deal would otherwise die.

Suggested fallback:

`Piloto Institucional de Entrada — uso interno apenas`

- Duration: **3 months**
- Included analyses: **300**
- Price: **R$ 18.000**
- Overage: **R$ 6.500 per block of 100 analyses**

This should not appear on the public landing, public pricing, or normal outbound collateral.

## Commercial framing

Recommended label on the public institutional landing:

- `Piloto institucional pago`

Recommended explanation:

- `ciclo inicial de implantação para escolas, faculdades e universidades`
- `prazo alinhado ao semestre letivo`
- `valor em reais, com onboarding e operação institucional`

Avoid:

- `teste`
- `trial`
- `POC gratuita`
- `3 meses` as the default public framing

## Suggested Stripe products

Create these BRL products for `veritexto-br`:

1. `Piloto Institucional Semestral`
   - one-time payment
   - BRL `32500.00`

2. `Operação Institucional Anual`
   - one-time payment
   - BRL `60000.00`

3. Optional internal-only product:
   - `Piloto Institucional de Entrada`
   - one-time payment
   - BRL `18000.00`
   - not linked from public pages

4. Overage block:
   - `Bloco adicional — 100 análises`
   - BRL `6000.00` for semiannual accounts
   - BRL `5000.00` for annual accounts

## Positioning relative to Turnitin

The pricing logic is not “be cheaper at any cost.”

The pricing logic is:
- stay commercially legible against Turnitin,
- keep migration psychologically easy,
- preserve margin,
- and avoid presenting the product as a disposable experiment.

Turnitin remains the reference ceiling, not the design center.

For the first institutional cycle, the message should be:

- simpler to buy in BRL,
- more modern operational layer,
- clearer institutional governance,
- lower friction to adopt than a traditional Turnitin procurement path.

## Recommendation to Claude

For implementation, assume:

- the institutional landing exposes only the **semiannual pilot** as the primary commercial framing;
- the annual plan can appear as a secondary path or in the contact conversation;
- the quarterly fallback does **not** need to exist in public config copy.

## Recommendation to Lars

If only one SKU is created first, create:

- **`Piloto Institucional Semestral — VeriTexto BR — R$ 32.500`**

That is enough to unblock:
- contact-led landing copy,
- commercial conversation,
- and the first real institutional close.
