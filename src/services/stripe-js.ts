import { loadStripe } from '@stripe/stripe-js'

export async function getStripeJs() {
  const stripejs = await loadStripe(`${process.env.STRIPE_PUBLIC}`)
}