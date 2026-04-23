import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BIG Bulk",
    short_name: "BIG Bulk",
    description: "Fast, private workout tracking for focused training sessions.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#f6f7f5",
    theme_color: "#163a31",
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      },
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable"
      }
    ]
  };
}
