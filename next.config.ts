import type { NextConfig } from "next";
import withSvgr from "next-svgr";

const baseConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "rurpfikinjkrbzuexttr.supabase.co",
      },
    ],
  },
};

const nextConfig = withSvgr(baseConfig);

export default nextConfig;
