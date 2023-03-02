/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "services.ts","services/gatewayService.js","util/commonUtils.js","helper/config.js"],
};

module.exports = nextConfig;
