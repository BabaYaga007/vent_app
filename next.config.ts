import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/vent_app',
  assetPrefix: '/vent_app',
};

export default nextConfig;
