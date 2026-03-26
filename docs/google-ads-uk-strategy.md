# Google Ads — NovaLearn UK Campaign Strategy

Date: 2026-03-25
Google Ads ID: AW-17964304856

## Objective

Drive paid subscribers (Professional plan, £21/mo) to NovaLearn.co.uk via Search campaigns targeting UK educators, universities, and EdTech decision-makers. Avoid the Auditelle mistake of optimising for student signups.

## Campaign 1: Search — Educators & Academic Integrity

**Budget:** £20/day (£600/mo)
**Bid strategy:** Maximize conversions (target CPA £15)
**Conversion event:** Stripe checkout initiated (not just signup)

### Keywords (exact + phrase match)

```
[ai detection for universities uk]
[detect chatgpt student essays]
[ai checker for teachers]
[academic integrity ai tool]
[detect ai generated coursework]
[ai plagiarism checker university]
[turnitin alternative uk]
[ai detection tool education]
[check student work for ai]
[chatgpt detection software]
"ai detection" + "university"
"detect ai" + "student work"
"academic integrity" + "ai"
```

### Negative keywords

```
-free ai detector
-check my essay
-my homework
-bypass ai detection
-undetectable ai
-humanize ai text
-paraphraser
-how to avoid
-cheat
-free tool
```

### Ad copy

**Responsive Search Ad:**

Headlines:
1. AI Detection For UK Educators
2. 99.9% Accuracy — Verified
3. Detect ChatGPT In Student Work
4. GDPR Compliant — UK Based
5. Used By 200+ Universities
6. Try Free — Upgrade From £10.50/mo
7. Turnitin Alternative — More Accurate
8. Section-by-Section AI Analysis

Descriptions:
1. NovaLearn detects AI-generated text with 99.9% accuracy. Identify ChatGPT, Claude, Gemini and more. Try free today.
2. Trusted by educators across the UK. GDPR compliant. Sentence-level analysis with model identification. Start in seconds.

**Sitelinks:**
- Pricing Plans → /pricing
- How It Works → /#how-it-works
- University Plans → /pricing#university
- Try Free → /register

### Landing page

Homepage (novalearn.co.uk) — hero + social proof + pricing
Ensure UTM params: ?utm_source=google&utm_medium=cpc&utm_campaign=uk-educators

## Campaign 2: Search — EdTech Decision Makers

**Budget:** £10/day (£300/mo)
**Target:** Broad match + audience signals (Education sector, job titles)

### Keywords

```
[ai detection software education]
[ai content detection api]
[institution ai detection platform]
[bulk ai text checker]
[ai detection saas university]
"enterprise ai detection"
```

### Ad copy focus

ROI angle: "Protect Academic Integrity at Scale" / "API Integration Available"

## Key Learnings from Auditelle FR

1. NEVER use Performance Max — it optimises for easy signups (students), not paying customers
2. Conversion = Stripe checkout (not signup) to train the algorithm on real buyers
3. Reduce free plan aggressively (3 scans/mo) to force conversion fast
4. WELCOME50 coupon (50% off first month = £10.50) lowers barrier to entry
5. Negative keywords must block student-intent queries from day 1

## Conversion Tracking Setup

```javascript
// Fire on Stripe checkout redirect (success_url)
gtag('event', 'conversion', {
  send_to: 'AW-17964304856/CHECKOUT',
  value: 21.00,
  currency: 'GBP',
  transaction_id: session_id
});
```

## Budget Summary

| Campaign | Daily | Monthly | Target CPA |
|----------|-------|---------|------------|
| Educators | £20 | £600 | £15 |
| EdTech B2B | £10 | £300 | £25 |
| **Total** | **£30** | **£900** | — |

Expected conversions at target CPA: 40-60 Pro subscribers/month = £840-1,260 MRR
