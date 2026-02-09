import Stripe from 'stripe'

const stripeKey = process.env.STRIPE_SECRET_KEY

if (!stripeKey) {
  console.warn('STRIPE_SECRET_KEY not set')
}

export const stripe = new Stripe(stripeKey || '', {
  apiVersion: '2026-01-28.clover',
  typescript: true,
})
