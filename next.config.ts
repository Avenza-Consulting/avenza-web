import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/thumbnail",
      },
    ],
  },
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
