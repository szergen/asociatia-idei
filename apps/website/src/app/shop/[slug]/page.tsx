import React from "react";
import { builder } from "@builder.io/sdk";
import { notFound } from "next/navigation";
// import { AddToCartButton } from '../../components/shop/AddToCartButton'; // We will inline or create dedicated comp

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await builder
    .get("product", {
      query: {
        "data.slug": params.slug,
      },
    })
    .promise();

  if (!product) {
    notFound();
  }

  const { title, description, price, image, gallery, stripePriceId } =
    product.data;

  // Placeholder for client component to handle add to cart
  // For now, we can reuse ProductCard logic or make a Client Component wrapper.
  // Let's assume we will make a dedicated Client Component for the actions part in next steps if needed.
  // T019 says "Connect ProductDetail Add to Cart button...".
  // We'll scaffold the page structure here.

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Gallery Section */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          {gallery && gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {gallery.map((img: any, idx: number) => (
                <div
                  key={idx}
                  className="aspect-square bg-gray-50 rounded-md overflow-hidden cursor-pointer border hover:border-black"
                >
                  <img
                    src={img.image}
                    alt={`${title} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-2xl font-medium">${price.toFixed(2)}</p>
          <div className="prose max-w-none">
            {/* Render rich text safely later, for now string dump or simple render */}
            {/* Builder provides HTML usually, or we use a renderer */}
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
          import {ProductActions} from
          '../../../components/shop/ProductActions'; // ... (previous imports)
          // ...
          <div className="pt-6 border-t">
            <ProductActions
              product={{
                slug: product.data.slug,
                stripePriceId: product.data.stripePriceId,
                title: product.data.title,
                price: product.data.price,
                image: product.data.image,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
