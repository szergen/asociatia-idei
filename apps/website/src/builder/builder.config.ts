import { builder } from "@builder.io/react";

// Initialize Builder with your public API key
// Make sure to add your Builder.io public key to your environment variables
const BUILDER_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_BUILDER_PUBLIC_KEY || process.env.BUILDER_PUBLIC_KEY;

if (!BUILDER_PUBLIC_KEY) {
  throw new Error("Missing BUILDER_PUBLIC_KEY environment variable");
}

builder.init(BUILDER_PUBLIC_KEY);

// Configure Builder.io settings
builder.apiVersion = "v3";

// Custom field types for better content management
export const builderConfig = {
  apiKey: BUILDER_PUBLIC_KEY,
  models: {
    page: "page",
    section: "section",
    symbol: "symbol",
    data: "data",
  },
  // Custom targeting attributes
  customTargeting: {
    urlPath: true,
    device: true,
    locale: true,
  },
};

export { builder };
export default builder;
