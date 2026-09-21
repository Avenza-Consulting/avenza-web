import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/leadership",
        destination: "/about#leadership",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
