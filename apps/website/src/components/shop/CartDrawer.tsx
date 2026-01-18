import React from "react";
import { useCart } from "../../context/CartContext";
import { X, Minus, Plus, Trash2 } from "lucide-react";

import { getStripe } from "../../lib/stripe/client";

export const CartDrawer = () => {
  const {
    cartItems,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    addToCart,
    totalPrice,
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartItems }),
      });

      if (!response.ok) throw new Error("Checkout failed");

      const { sessionId } = await response.json();
      const stripe = await getStripe();

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) console.error("Stripe redirect error:", error);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      // Optional: Show error toast
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!isOpen) return null;

  const handleQuantityChange = (stripePriceId: string, quantity: number) => {
    updateQuantity(stripePriceId, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white shadow-xl h-full flex flex-col animate-in slide-in-from-right">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              Your cart is empty
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.stripePriceId}
                className="flex gap-4 border-b pb-4"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border rounded-md">
                      <button
                        className="p-1 hover:bg-gray-50"
                        onClick={() =>
                          handleQuantityChange(
                            item.stripePriceId,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-2 text-sm">{item.quantity}</span>
                      <button
                        className="p-1 hover:bg-gray-50"
                        onClick={() =>
                          handleQuantityChange(
                            item.stripePriceId,
                            item.quantity + 1
                          )
                        }
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.stripePriceId)}
                      className="ml-auto text-red-500 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t p-4 space-y-4 bg-gray-50">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button
            disabled={cartItems.length === 0 || isCheckingOut}
            onClick={handleCheckout}
            className="w-full py-3 px-4 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex justify-center items-center"
          >
            {isCheckingOut ? "Processing..." : "Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};
