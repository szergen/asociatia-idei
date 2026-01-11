"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

export const CartIcon = () => {
  const { openCart, cartItems } = useCart();
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <button
      onClick={openCart}
      className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
      aria-label="Open cart"
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </button>
  );
};
