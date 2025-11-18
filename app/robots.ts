import type { MetadataRoute } from "next";

// Necesario cuando usas output: "export"
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://segurosconmaritza.com/sitemap.xml",
  };
}
