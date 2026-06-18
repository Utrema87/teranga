"use client";

import Link from "next/link";
import { useState } from "react";
import { type Product, startingPrice } from "@/data/products";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { formatFCFA } from "@/lib/format";
import { ProductVisual } from "@/components/art";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { t, tr } = useLang();
  const { add } = useCart();
  const [pop, setPop] = useState(false);

  const start = startingPrice(product);

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.quoteOnly) return;
    const variantId = product.variants[0]?.id ?? null;
    add(product.id, variantId, 1);
    setPop(true);
    setTimeout(() => setPop(false), 600);
  };

  return (
    <Link
      href={`/produits/${product.slug}`}
      className="reveal card-terroir group relative flex flex-col overflow-hidden hover:-translate-y-1.5 hover:shadow-[var(--shadow-terroir)]"
      style={{ transitionDelay: `${(index % 4) * 40}ms` }}
    >
      {/* Visuel */}
      <div className="relative aspect-[4/5] overflow-hidden border-b border-brun/10 bg-ivoire">
        <div
          className="pointer-events-none absolute -right-10 -top-10 z-0 h-40 w-40 rounded-full opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
          style={{ background: product.accent }}
        />
        <ProductVisual
          cover
          image={product.image}
          kind={product.illustration}
          accent={product.accent}
          alt={tr(product.name)}
        />
        {/* badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
          {product.badges.slice(0, 2).map((b) => (
            <span
              key={b}
              className="badge bg-creme/85 text-brun backdrop-blur-sm"
            >
              {t(`badges.${b}`)}
            </span>
          ))}
        </div>
      </div>

      {/* Corps */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-snug transition-colors group-hover:text-orange">
          {tr(product.name)}
        </h3>
        <p className="mt-1 text-sm text-brun/60 text-pretty">
          {tr(product.tagline)}
        </p>

        <div className="mt-4 flex items-end justify-between gap-2 pt-2">
          <div className="leading-none">
            {product.quoteOnly || start === null ? (
              <span className="prix text-base font-semibold text-vert">
                {t("common.quote")}
              </span>
            ) : (
              <>
                {product.priceFrom && (
                  <span className="block text-[0.66rem] uppercase tracking-wide text-brun/40">
                    {t("common.from")}
                  </span>
                )}
                <span className="prix text-lg font-bold text-orange">
                  {formatFCFA(start)}
                </span>
              </>
            )}
          </div>

          {product.quoteOnly ? (
            <span className="grid h-11 w-11 place-items-center rounded-full bg-vert/12 text-vert transition-colors group-hover:bg-vert group-hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          ) : (
            <button
              type="button"
              onClick={quickAdd}
              aria-label={t("common.addToCart")}
              className={`grid h-11 w-11 place-items-center rounded-full bg-brun text-creme transition-all hover:bg-orange ${
                pop ? "scale-90" : "scale-100"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
