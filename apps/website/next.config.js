/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.builder.io"], // For Builder.io images
  },
  env: {
    BUILDER_PUBLIC_KEY: process.env.BUILDER_PUBLIC_KEY,
  },
  experimental: {
    // Enable if needed for better performance
    optimizeCss: true,
  },
  output: "standalone",
};

module.exports = nextConfig;
