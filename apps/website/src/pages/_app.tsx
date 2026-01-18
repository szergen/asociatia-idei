import React from "react";
import type { AppProps } from "next/app";
import { builder } from "@builder.io/react";
import "../styles/globals.css";
import { CartProvider } from "../context/CartContext";
import { CartDrawer } from "../components/shop/CartDrawer";
import Layout from "../components/Layout";

// Initialize Builder.io
import "../builder/builder.config";

function MyApp({ Component, pageProps }: AppProps) {
  // Check if the page explicitly disables layout (e.g. Builder pages with useLayout: false)
  // Default to true if not specified
  const useLayout = pageProps?.page?.data?.useLayout !== false;

  return (
    <CartProvider>
      {useLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
      <CartDrawer />
    </CartProvider>
  );
}

export default MyApp;
