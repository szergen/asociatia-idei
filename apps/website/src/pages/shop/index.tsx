import React from "react";
import { builder } from "../../builder/builder.config";
import { GetStaticProps } from "next";
import { ProductCard } from "../../components/shop/ProductCard";

// Builder initialized in builder.config.ts

interface Product {
  data: {
    title: string;
    description: string;
    price: number;
    imageList: { image: string; alt?: string }[];
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
    <div>
      <div className="relative w-full h-[400px] mb-8 bg-[#444E72]">
        <img
          src="/img/idei-hero-image.jpg"
          alt="Shop Hero"
          className="w-full h-full object-contain object-right"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
          <p className="text-white text-xl md:text-2xl font-medium text-center max-w-3xl leading-relaxed">
            Vânzarea produselor de pe această platformă nu are ca scop obținerea
            de profit. Banii merg în contul Asociației IDEI, deci se transformă
            într-o donație pentru asociație.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shop</h1>

        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => {
              const firstItem = item.data.imageList?.[0];
              // Check for 'image' or 'imageItem' or any file property
              const imageSrc =
                firstItem?.image ||
                (firstItem as any)?.imageItem ||
                (firstItem as any)?.file ||
                "";

              return (
                <ProductCard
                  key={item.data.slug}
                  title={item.data.title}
                  description={item.data.description}
                  price={item.data.price}
                  image={imageSrc}
                  stripePriceId={item.data.stripePriceId}
                  slug={item.data.slug}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
