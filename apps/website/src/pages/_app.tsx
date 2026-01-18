import React from "react";
import type { AppProps } from "next/app";
import { builder } from "@builder.io/react";
import "../styles/globals.css";
import { CartProvider } from "../context/CartContext";
import { CartDrawer } from "../components/shop/CartDrawer";

// Initialize Builder.io
import "../builder/builder.config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
      <CartDrawer />
    </CartProvider>
  );
}

export default MyApp;
