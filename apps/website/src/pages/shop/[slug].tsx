import React from "react";
import { builder } from "../../builder/builder.config";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { ProductActions } from "../../components/shop/ProductActions";

// Builder initialized in builder.config.ts

interface Product {
  data: {
    title: string;
    description: string;
    price: number;
    image: string;
    gallery?: { image: string }[];
    stripePriceId: string;
    slug: string;
  };
}

interface ProductPageProps {
  product: Product | null;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await builder.getAll("product", {
    options: { noTargeting: true },
    fields: "data.slug",
  });

  return {
    paths: products.map((prod) => ({
      params: { slug: prod.data?.slug },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({
  params,
}) => {
  const product = await builder
    .get("product", {
      query: {
        "data.slug": params?.slug,
      },
    })
    .promise();

  return {
    props: {
      product: (product as unknown as Product) || null,
    },
    revalidate: 60,
  };
};

export default function ProductPage({ product }: ProductPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const { title, description, price, image, gallery, stripePriceId, slug } =
    product.data;

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
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>

          <div className="pt-6 border-t">
            <ProductActions
              product={{
                slug: slug,
                stripePriceId: stripePriceId,
                title: title,
                price: price,
                image: image,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
