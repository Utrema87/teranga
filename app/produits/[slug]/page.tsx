import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct, startingPrice } from "@/data/products";
import ProductDetail from "@/components/ProductDetail";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Produit introuvable" };
  return {
    title: product.name.fr,
    description: product.description.fr,
    alternates: { canonical: `/produits/${product.slug}` },
    openGraph: {
      title: `${product.name.fr} · Teranga Cajou`,
      description: product.description.fr,
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const start = startingPrice(product);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name.fr,
    description: product.description.fr,
    category: product.gamme,
    brand: { "@type": "Brand", name: "Teranga Cajou" },
    ...(start !== null
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "XOF",
            price: start,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail slug={slug} />
    </>
  );
}
