import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The chat endpoint is a paid upstream proxy; keep crawlers out of it.
      disallow: "/api/",
    },
    sitemap: "https://porto-ghbs.vercel.app/sitemap.xml",
  };
}
