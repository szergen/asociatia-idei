import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-ignore - Bypassing strict version check caused by Docker npm install drift
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});
