import withPWA from "next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = withPWA({
  dest: "public", // Directory where PWA assets will be stored
  register: true, // Automatically registers the service worker
  skipWaiting: true, // Updates the service worker immediately
});

export default nextConfig;
