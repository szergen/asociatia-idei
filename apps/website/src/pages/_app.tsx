import React from "react";
import type { AppProps } from "next/app";
import { builder } from "@builder.io/react";
import "../styles/globals.css";

// Initialize Builder.io
import "../builder/builder.config";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
