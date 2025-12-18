import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/phonestadium',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
