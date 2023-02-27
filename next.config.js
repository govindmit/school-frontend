/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "services.ts","gatewayService.js","commonUtils.js","config.js"],
};

module.exports = nextConfig;
