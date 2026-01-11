import React, { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        We have received your order and will begin processing it shortly. 
        You will receive an email confirmation soon.
      </p>
      <Link 
        href="/shop" 
        className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-medium"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
