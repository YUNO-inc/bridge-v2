import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bridge Inc.",
    short_name: "Bridge",
    description: "Delivery App For All",
    start_url: "/",
    display: "standalone",
    background_color: process.env.THEME_COLOR,
    theme_color: "#ffffff",
    icons: [
      {
        src: "/images/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
