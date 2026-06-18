import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/panier", "/commande", "/confirmation"],
    },
    sitemap: "https://teranga-cajou.sn/sitemap.xml",
  };
}
