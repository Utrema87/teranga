import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";

const SITE = "https://teranga-cajou.sn";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/produits",
    "/notre-histoire",
    "/b2b",
    "/faq",
    "/contact",
  ].map((path) => ({
    url: `${SITE}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const products = PRODUCTS.map((p) => ({
    url: `${SITE}/produits/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...products];
}
