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
        src: "/images/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
