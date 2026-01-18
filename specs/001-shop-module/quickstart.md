# Quickstart: Shop Module Development

## Prerequisites

1. **Stripe Account**: You need a Stripe test account.
2. **Environment Variables**:
   Add these to `apps/website/.env.local`:
   ```bash
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
3. **Builder.io Model**:
   Ensure a model named `product` exists in Builder.io with fields: `title`, `description`, `image`, `price`, `stripePriceId`.

## Running Locally

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Start Development Server**:

   ```bash
   npm run dev
   ```

3. **Stripe Webhook Forwarding** (Optional):
   If testing webhooks locally, use the Stripe CLI:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

## Key Commands

- `npm run dev`: Start website.
- `stripe products create`: Create test products in Stripe Dashboard to get `price_...` IDs.
