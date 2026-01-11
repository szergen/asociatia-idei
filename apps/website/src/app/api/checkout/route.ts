import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../../lib/stripe/server";

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Invalid items" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
        price: item.stripePriceId,
        quantity: item.quantity,
      })),
      success_url: `${
        process.env.NEXT_PUBLIC_URL || "http://localhost:3000"
      }/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${
        process.env.NEXT_PUBLIC_URL || "http://localhost:3000"
      }/shop`,
      metadata: {
        source: "website_shop",
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
