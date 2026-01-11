"use client";

import React, { useState } from "react";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useCart } from "../../context/CartContext";

interface ProductActionsProps {
  product: {
    slug: string;
    stripePriceId: string;
    title: string;
    price: number;
    image: string;
  };
}

export const ProductActions = ({ product }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleIncrement = () => setQuantity((q) => Math.min(99, q + 1));
  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    addToCart({
      productId: product.slug,
      stripePriceId: product.stripePriceId,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
    // Optional: Reset quantity or show success feedback
  };

  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center border rounded-md h-12">
        <button
          onClick={handleDecrement}
          className="w-12 h-full flex items-center justify-center hover:bg-gray-50 text-gray-600"
          disabled={quantity <= 1}
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="w-12 text-center font-medium text-lg">{quantity}</div>
        <button
          onClick={handleIncrement}
          className="w-12 h-full flex items-center justify-center hover:bg-gray-50 text-gray-600"
          disabled={quantity >= 99}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="flex-1 h-12 bg-black text-white rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors font-medium text-lg"
      >
        <ShoppingCart className="w-5 h-5" />
        Add to Cart
      </button>
    </div>
  );
};
