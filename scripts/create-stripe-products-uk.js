#!/usr/bin/env node
/**
 * NovaLearn UK - Stripe Products + WELCOME50 Coupon Setup
 * Usage: STRIPE_SECRET_KEY=sk_live_xxx node create-stripe-products-uk.js
 *
 * Creates GBP products for NovaLearn UK and a 50% first-month coupon.
 */

const Stripe = require('stripe');

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_KEY) {
  console.error('❌ Set STRIPE_SECRET_KEY environment variable');
  console.log('Usage: STRIPE_SECRET_KEY=sk_live_xxx node create-stripe-products-uk.js');
  process.exit(1);
}

if (STRIPE_KEY.startsWith('sk_test_')) {
  console.warn('⚠️  WARNING: Using TEST key. For production, use sk_live_xxx');
}

const stripe = new Stripe(STRIPE_KEY);

const products = [
  {
    name: 'NovaLearn Professional',
    description: 'For educators and consultants — 1,000 analyses/month',
    monthlyPrice: 2100, // £21 in pence
    annualPrice: 21000, // £210/year (17% discount)
    metadata: { tier: 'pro', analyses_per_month: '1000', reseller: 'novalearn-uk' }
  },
  {
    name: 'NovaLearn Student',
    description: 'For students and individuals — 200 analyses/month',
    monthlyPrice: 999, // £9.99
    annualPrice: 9900, // £99/year (17% discount)
    metadata: { tier: 'student', analyses_per_month: '200', reseller: 'novalearn-uk' }
  },
  {
    name: 'NovaLearn University',
    description: 'For educational institutions — 10,000 analyses/month',
    monthlyPrice: 12900, // £129
    annualPrice: 129000, // £1,290/year
    metadata: { tier: 'university', analyses_per_month: '10000', reseller: 'novalearn-uk' }
  },
  {
    name: 'NovaLearn Enterprise',
    description: 'For large organisations — Unlimited analyses',
    monthlyPrice: 42900, // £429
    annualPrice: 429000, // £4,290/year
    metadata: { tier: 'enterprise', analyses_per_month: 'unlimited', reseller: 'novalearn-uk' }
  }
];

async function createProducts() {
  console.log('🚀 Creating NovaLearn UK Stripe products (GBP)...\n');

  const results = {
    products: [],
    prices: { monthly: {}, annual: {} }
  };

  for (const p of products) {
    console.log(`📦 Creating product: ${p.name}`);

    const product = await stripe.products.create({
      name: p.name,
      description: p.description,
      metadata: p.metadata
    });
    results.products.push(product);
    console.log(`   ✅ Product ID: ${product.id}`);

    // Monthly price in GBP
    const monthlyPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: p.monthlyPrice,
      currency: 'gbp',
      recurring: { interval: 'month' },
      metadata: { ...p.metadata, billing: 'monthly' }
    });
    results.prices.monthly[p.metadata.tier] = monthlyPrice.id;
    console.log(`   💰 Monthly: ${monthlyPrice.id} (£${p.monthlyPrice/100}/mo)`);

    // Annual price in GBP
    const annualPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: p.annualPrice,
      currency: 'gbp',
      recurring: { interval: 'year' },
      metadata: { ...p.metadata, billing: 'annual' }
    });
    results.prices.annual[p.metadata.tier] = annualPrice.id;
    console.log(`   📅 Annual: ${annualPrice.id} (£${p.annualPrice/100}/yr)\n`);
  }

  // ── Create WELCOME50 coupon ──────────────────────────────────────────
  console.log('🎟️  Creating WELCOME50 coupon...');

  const coupon = await stripe.coupons.create({
    percent_off: 50,
    duration: 'once', // first month only
    name: 'Welcome 50% Off',
    metadata: { reseller: 'novalearn-uk' }
  });
  console.log(`   ✅ Coupon ID: ${coupon.id}`);

  const promoCode = await stripe.promotionCodes.create({
    coupon: coupon.id,
    code: 'WELCOME50',
    active: true,
    metadata: { reseller: 'novalearn-uk' }
  });
  console.log(`   🏷️  Promotion Code: WELCOME50 (ID: ${promoCode.id})\n`);

  // ── Summary ──────────────────────────────────────────────────────────
  console.log('═══════════════════════════════════════════════════════');
  console.log('✅ ALL PRODUCTS + COUPON CREATED!\n');
  console.log('📋 Add these to your Vercel env (novalearn-uk project):\n');
  console.log(`STRIPE_PRO_PRICE_ID=${results.prices.monthly.pro}`);
  console.log(`STRIPE_STUDENT_PRICE_ID=${results.prices.monthly.student}`);
  console.log(`STRIPE_UNIVERSITY_PRICE_ID=${results.prices.monthly.university}`);
  console.log(`STRIPE_ENTERPRISE_PRICE_ID=${results.prices.monthly.enterprise}`);
  console.log(`\n# Annual prices:`);
  console.log(`STRIPE_PRO_ANNUAL_PRICE_ID=${results.prices.annual.pro}`);
  console.log(`STRIPE_STUDENT_ANNUAL_PRICE_ID=${results.prices.annual.student}`);
  console.log(`STRIPE_UNIVERSITY_ANNUAL_PRICE_ID=${results.prices.annual.university}`);
  console.log(`STRIPE_ENTERPRISE_ANNUAL_PRICE_ID=${results.prices.annual.enterprise}`);
  console.log(`\n# Coupon:`);
  console.log(`# WELCOME50 → 50% off first month (promo code active)`);
  console.log('═══════════════════════════════════════════════════════');

  return results;
}

createProducts().catch(console.error);
