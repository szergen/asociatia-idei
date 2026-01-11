import React from "react";
import { builder } from "@builder.io/sdk";
import { GetStaticProps } from "next";
import { ProductCard } from "../../components/shop/ProductCard";

// Builder.io Public Key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface Product {
  data: {
    title: string;
    description: string;
    price: number;
    image: string;
    stripePriceId: string;
    slug: string;
  };
}

interface ShopPageProps {
  products: Product[];
}

export const getStaticProps: GetStaticProps<ShopPageProps> = async () => {
  const products = (await builder.getAll("product", {
    options: { noTargeting: true },
  })) as unknown as Product[];

  return {
    props: {
      products: products || [],
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
};

export default function ShopPage({ products }: ShopPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <ProductCard
              key={item.data.slug}
              title={item.data.title}
              description={item.data.description}
              price={item.data.price}
              image={item.data.image}
              stripePriceId={item.data.stripePriceId}
              slug={item.data.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
