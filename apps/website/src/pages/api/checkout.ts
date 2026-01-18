import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Invalid items" });
    }

    // Validation: Check for common configuration errors
    for (const item of items) {
      if (item.stripePriceId && item.stripePriceId.startsWith("prod_")) {
        return res.status(400).json({
          error: `Configuration Error: '${item.title}' has a Product ID (${item.stripePriceId}) instead of a Price ID. Please update the stripePriceId in Builder.io to start with 'price_'.`,
        });
      }
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

    return res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
}
