import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },

  // ✅ Fix dev sourcemap warning
  productionBrowserSourceMaps: false,
};

export default nextConfig;
