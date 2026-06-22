#!/usr/bin/env node
/**
 * NovaLearn UK - Stripe Products Setup (GBP)
 * Creates 4 products + WELCOME50 coupon for UK market
 *
 * Usage: STRIPE_SECRET_KEY=sk_live_xxx node scripts/create-stripe-products-uk.js
 */

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_KEY) {
  console.error('❌ Set STRIPE_SECRET_KEY environment variable');
  console.log('Usage: STRIPE_SECRET_KEY=sk_live_xxx node scripts/create-stripe-products-uk.js');
  process.exit(1);
}

const products = [
  {
    name: 'NovaLearn Student',
    description: 'For students and postgraduates — 200 analyses/month',
    monthlyPrice: 999, // £9.99
    metadata: { tier: 'student', analyses_per_month: '200', reseller: 'novalearn-uk' }
  },
  {
    name: 'NovaLearn Starter',
    description: 'For teachers and consultants — 1,000 analyses/month',
    monthlyPrice: 3900, // £39
    metadata: { tier: 'starter', analyses_per_month: '1000', reseller: 'novalearn-uk' }
  },
  {
    name: 'NovaLearn University',
    description: 'For educational institutions — 10,000 analyses/month',
    monthlyPrice: 29900, // £299
    metadata: { tier: 'university', analyses_per_month: '10000', reseller: 'novalearn-uk' }
  },
  {
    name: 'NovaLearn Enterprise',
    description: 'For large organisations — 50,000 analyses/month',
    monthlyPrice: 79900, // £799
    metadata: { tier: 'enterprise', analyses_per_month: '50000', reseller: 'novalearn-uk' }
  }
];

async function createProducts() {
  const { default: Stripe } = await import('stripe');
  const stripe = new Stripe(STRIPE_KEY);

  console.log('🚀 Creating NovaLearn UK Stripe products (GBP)...\n');

  const priceIds = {};

  for (const p of products) {
    console.log(`📦 Creating product: ${p.name}`);

    const product = await stripe.products.create({
      name: p.name,
      description: p.description,
      metadata: p.metadata
    });
    console.log(`   ✅ Product ID: ${product.id}`);

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: p.monthlyPrice,
      currency: 'gbp',
      recurring: { interval: 'month' },
      metadata: { ...p.metadata, billing: 'monthly' }
    });
    priceIds[p.metadata.tier] = price.id;
    console.log(`   💰 Price: ${price.id} (£${(p.monthlyPrice / 100).toFixed(2)}/month)\n`);
  }

  // Create WELCOME50 coupon (50% off first month)
  console.log('🎟️  Creating WELCOME50 coupon...');
  const coupon = await stripe.coupons.create({
    percent_off: 50,
    duration: 'once',
    name: 'Welcome 50% Off',
    metadata: { reseller: 'novalearn-uk' }
  });

  const promotionCode = await stripe.promotionCodes.create({
    coupon: coupon.id,
    code: 'WELCOME50',
    active: true,
  });
  console.log(`   ✅ Coupon: ${coupon.id}`);
  console.log(`   ✅ Promotion code: ${promotionCode.code} (${promotionCode.id})\n`);

  console.log('═══════════════════════════════════════════════');
  console.log('✅ ALL PRODUCTS + COUPON CREATED!\n');
  console.log('📋 Add these env vars to Vercel:\n');
  console.log(`STRIPE_STUDENT_PRICE_ID=${priceIds.student}`);
  console.log(`STRIPE_STARTER_PRICE_ID=${priceIds.starter}`);
  console.log(`STRIPE_UNIVERSITY_PRICE_ID=${priceIds.university}`);
  console.log(`STRIPE_ENTERPRISE_PRICE_ID=${priceIds.enterprise}`);
  console.log('\n# Legacy mapping (if checkout uses "pro" plan ID):');
  console.log(`STRIPE_PRO_PRICE_ID=${priceIds.starter}`);
  console.log('═══════════════════════════════════════════════');
}

createProducts().catch(console.error);
