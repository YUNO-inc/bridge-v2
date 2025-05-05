import withPWA from "next-pwa";
import type { NextConfig } from "next";

const withPWAConfig: NextConfig = withPWA({
  dest: "public", // Directory where PWA assets will be stored
  register: true, // Automatically registers the service worker
  skipWaiting: true, // Updates the service worker immediately
});

const nextConfig: NextConfig = {
  ...withPWAConfig,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/app",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/w320/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "bridge-version-2.s3.eu-west-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
