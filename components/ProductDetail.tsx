"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProduct,
  getGamme,
  relatedProducts,
} from "@/data/products";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { formatFCFA } from "@/lib/format";
import { ProductArt } from "@/components/art";
import QuantityStepper from "@/components/QuantityStepper";
import ProductCard from "@/components/ProductCard";
import SectionHead from "@/components/SectionHead";
import { useReveal } from "@/lib/useReveal";

export default function ProductDetail({ slug }: { slug: string }) {
  const product = getProduct(slug);
  const { t, tr } = useLang();
  const { add, openDrawer } = useCart();
  const relatedRef = useReveal<HTMLDivElement>({ stagger: 0.08 });

  const [variantIdx, setVariantIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [angle, setAngle] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) return notFound();

  const gamme = getGamme(product.gamme);
  const hasVariants = product.variants.length > 0;
  const variant = hasVariants ? product.variants[variantIdx] : null;
  const unitPrice = variant ? variant.price : product.price ?? 0;
  const related = relatedProducts(product, 4);

  const handleAdd = () => {
    add(product.id, variant?.id ?? null, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const angles = [
    { r: 0, s: 1 },
    { r: -8, s: 1.05 },
    { r: 10, s: 0.95 },
  ];

  return (
    <div className="bg-creme">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
        {/* fil d'ariane */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-brun/50">
          <Link href="/produits" className="hover:text-brun">
            {t("nav.shop")}
          </Link>
          <span>/</span>
          <Link
            href={`/produits?gamme=${gamme.id}`}
            className="hover:text-brun"
          >
            {tr(gamme.name)}
          </Link>
          <span>/</span>
          <span className="text-brun/80">{tr(product.name)}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Galerie */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-brun/8 bg-white">
              {product.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image}
                  alt={tr(product.name)}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-contain p-6"
                />
              ) : (
                <>
                  <div className="grain z-0" />
                  <div
                    className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
                    style={{ background: product.accent }}
                  />
                  <div
                    className="absolute inset-0 grid place-items-center transition-transform duration-700"
                    style={{
                      transform: `rotate(${angles[angle].r}deg) scale(${angles[angle].s})`,
                    }}
                  >
                    <ProductArt
                      kind={product.illustration}
                      accent={product.accent}
                      className="h-64 w-64 sm:h-80 sm:w-80"
                    />
                  </div>
                </>
              )}
              <div className="absolute left-4 top-4 z-10 flex flex-col gap-1.5">
                {product.badges.map((b) => (
                  <span key={b} className="badge bg-creme/85 text-brun backdrop-blur-sm">
                    {t(`badges.${b}`)}
                  </span>
                ))}
              </div>
            </div>
            {/* miniatures = angles (illustrations uniquement) */}
            {!product.image && (
              <div className="mt-4 flex gap-3">
                {angles.map((a, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setAngle(i)}
                    aria-label={`Vue ${i + 1}`}
                    className={`grid h-20 w-20 place-items-center rounded-2xl border bg-ivoire transition-all ${
                      angle === i
                        ? "border-orange ring-2 ring-orange/25"
                        : "border-brun/10 hover:border-brun/30"
                    }`}
                  >
                    <div style={{ transform: `rotate(${a.r}deg)` }}>
                      <ProductArt
                        kind={product.illustration}
                        accent={product.accent}
                        className="h-12 w-12"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Infos */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-vert">
              {tr(gamme.name)}
            </span>
            <h1 className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] text-balance">
              {tr(product.name)}
            </h1>
            <p className="mt-3 text-lg text-brun/65 text-pretty">
              {tr(product.tagline)}
            </p>

            {/* prix */}
            <div className="mt-6 flex items-end gap-3">
              {product.quoteOnly ? (
                <span className="prix font-display text-3xl font-bold text-vert">
                  {t("common.quote")}
                </span>
              ) : (
                <span className="prix font-display text-4xl font-bold text-orange">
                  {formatFCFA(unitPrice)}
                </span>
              )}
              <span className="mb-1.5 text-sm text-brun/50">
                · {tr(variant ? variant.label : product.format)}
              </span>
            </div>

            <p className="mt-6 leading-relaxed text-brun/75 text-pretty">
              {tr(product.longDescription)}
            </p>

            {/* variantes */}
            {hasVariants && (
              <div className="mt-7">
                <p className="mb-2.5 text-sm font-semibold text-brun/70">
                  {t("product.chooseFormat")}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v, i) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVariantIdx(i)}
                      className={`rounded-2xl border px-4 py-2.5 text-left transition-all ${
                        variantIdx === i
                          ? "border-orange bg-orange/8 ring-1 ring-orange/30"
                          : "border-brun/12 hover:border-brun/30"
                      }`}
                    >
                      <span className="block text-sm font-medium text-brun">
                        {tr(v.label)}
                      </span>
                      <span className="prix block text-sm font-semibold text-orange">
                        {formatFCFA(v.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* actions */}
            {product.quoteOnly ? (
              <div className="mt-8">
                <p className="rounded-2xl border border-vert/20 bg-vert/6 px-5 py-4 text-sm leading-relaxed text-brun/75">
                  {t("product.quoteNote")}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href="/b2b" className="btn btn-primary">
                    {t("common.askQuote")}
                  </Link>
                  <Link href="/contact" className="btn btn-ghost">
                    {t("nav.contact")}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <div>
                  <span className="mb-2 block text-sm font-semibold text-brun/70">
                    {t("common.quantity")}
                  </span>
                  <QuantityStepper value={qty} onChange={setQty} />
                </div>
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`btn mt-7 flex-1 sm:flex-none sm:min-w-[14rem] ${
                    added ? "btn-dark" : "btn-primary"
                  }`}
                >
                  {added ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {t("common.added")}
                    </>
                  ) : (
                    <>
                      {t("common.addToCart")} · {formatFCFA(unitPrice * qty)}
                    </>
                  )}
                </button>
              </div>
            )}

            {!product.quoteOnly && (
              <button
                type="button"
                onClick={openDrawer}
                className="mt-3 text-sm font-medium text-brun/55 underline-offset-2 hover:text-orange hover:underline"
              >
                {t("cart.title")} →
              </button>
            )}

            {/* features */}
            <div className="mt-9 border-t border-brun/10 pt-7">
              <p className="mb-4 text-sm font-semibold text-brun/70">
                {t("product.features")}
              </p>
              <ul className="grid gap-3 sm:grid-cols-3">
                {product.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex flex-col gap-2 rounded-2xl bg-ivoire/70 p-4"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-vert/12 text-vert">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-sm font-medium leading-snug text-brun/80">
                      {tr(f)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* suggestions */}
        <div ref={relatedRef} className="mt-24">
          <SectionHead title={t("product.related")} />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
