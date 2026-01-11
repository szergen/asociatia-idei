import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../../lib/stripe/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error("Webhook signature verification failed.", error.message);
    return NextResponse.json(
      { error: "Webhook signature verification failed." },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log(`Order confirmed for session: ${session.id}`);
    console.log(`Customer details:`, session.customer_details);
    // TODO: Add order fulfillment logic here (e.g., email, database, CRM sync)
  }

  return NextResponse.json({ received: true });
}
