import React, { useState } from "react";
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
    imageList: { image: string; alt?: string }[];
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

  // Use first image as main image, check for various property names
  const firstItem = product?.data?.imageList?.[0];
  const initialImage =
    firstItem?.image ||
    (firstItem as any)?.imageItem ||
    (firstItem as any)?.file ||
    "";

  const [activeImage, setActiveImage] = useState(initialImage);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const { title, description, price, imageList, stripePriceId, slug } =
    product.data;

  // Update activeImage if initialImage changes (e.g. navigation between products)
  React.useEffect(() => {
    setActiveImage(initialImage);
  }, [initialImage]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Gallery Section */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={activeImage}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          {imageList && imageList.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {imageList.map((imgItem, idx: number) => {
                const imgUrl =
                  imgItem.image ||
                  (imgItem as any).imageItem ||
                  (imgItem as any).file ||
                  "";
                return (
                  <div
                    key={idx}
                    className={`aspect-square bg-gray-50 rounded-md overflow-hidden cursor-pointer border ${
                      activeImage === imgUrl
                        ? "border-black ring-1 ring-black"
                        : "hover:border-black"
                    }`}
                    onClick={() => setActiveImage(imgUrl)}
                  >
                    <img
                      src={imgUrl}
                      alt={imgItem.alt || `${title} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
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
                image: initialImage,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
