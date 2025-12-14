import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.68.111",
        port: "8000",
      },
      {
        protocol: "http",
        hostname: "192.168.68.104",
        port: "8000",
      },

      {
        protocol: "https",
        hostname: "backend.workdear.com",
      },
      {
        protocol: "https",
        hostname: "backend.workdear.com",
        pathname: "/public/storage/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
