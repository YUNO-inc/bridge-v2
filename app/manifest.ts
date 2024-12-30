import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bridge Inc.",
    short_name: "Bridge",
    description: "Delivery App For All",
    start_url: "/",
    display: "standalone",
    background_color: "#123524",
    theme_color: "#123524",
    icons: [
      {
        src: "/images/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/images/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/images/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/images/icon-1024x1024.png",
        sizes: "1024x1024",
        type: "image/png",
      },
      {
        src: "/images/Dark-Text-Logo-Horizontal-Square.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
