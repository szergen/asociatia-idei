import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  image: string;
  stripePriceId: string;
  slug: string;
}

export const ProductCard = ({
  title,
  description,
  price,
  image,
  stripePriceId,
  slug,
}: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if wrapped in Link
    addToCart({
      productId: slug,
      stripePriceId,
      title,
      price,
      image,
      quantity: 1,
    });
  };

  return (
    <Link
      href={`/shop/${slug}`}
      className="group relative bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow block"
    >
      <div className="aspect-square bg-gray-100 overflow-hidden relative">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400 bg-gray-200">
            No Image
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-lg truncate">{title}</h3>
        {/* Simple rich text strip or truncate */}
        <p className="text-gray-600 text-sm line-clamp-2">
          {/* Assume plain text for card or strip tags */}
          {description.replace(/<[^>]*>/g, "")}
        </p>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="font-bold text-lg">${price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </Link>
  );
};
