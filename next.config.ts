import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all external hosts
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  /* config options here */
};

export default nextConfig;
