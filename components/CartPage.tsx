"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import {
  formatFCFA,
  shippingCost,
  FREE_SHIPPING_THRESHOLD,
  type Zone,
} from "@/lib/format";
import { ProductThumb } from "@/components/art";
import WhatsAppOrderButton from "@/components/WhatsAppOrderButton";

export default function CartPage() {
  const { resolved, subtotal, count, setQty, remove } = useCart();
  const { t, tr } = useLang();
  const [zone, setZone] = useState<Zone>("dakar");

  const shipping = shippingCost(subtotal, zone);
  const total = subtotal + shipping;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  if (resolved.length === 0) {
    return (
      <div className="bg-creme">
        <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-6 px-5 py-24 text-center">
          <div className="grid h-28 w-28 place-items-center rounded-full bg-ivoire">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 8h12l-1 11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8z" stroke="var(--color-brun)" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M9 8a3 3 0 0 1 6 0" stroke="var(--color-brun)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h1 className="font-display text-3xl font-semibold">{t("cart.empty")}</h1>
            <p className="mt-2 text-brun/60">{t("cart.emptyLead")}</p>
          </div>
          <Link href="/produits" className="btn btn-primary">
            {t("cart.emptyCta")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-creme">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold">
          {t("cart.title")}
          <span className="ml-3 text-lg font-normal text-brun/45">
            {count} {t(count > 1 ? "cart.item_other" : "cart.item_one")}
          </span>
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Lignes */}
          <div className="space-y-4">
            {resolved.map((l) => (
              <div
                key={l.key}
                className="flex gap-4 rounded-2xl border border-brun/8 bg-white p-4 shadow-[var(--shadow-soft)]"
              >
                <Link href={`/produits/${l.product.slug}`} className="shrink-0">
                  <ProductThumb
                    image={l.product.image}
                    kind={l.product.illustration}
                    accent={l.product.accent}
                    alt={tr(l.product.name)}
                    className="h-24 w-24 sm:h-28 sm:w-28"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/produits/${l.product.slug}`}
                        className="font-display text-lg font-semibold leading-tight hover:text-orange"
                      >
                        {tr(l.product.name)}
                      </Link>
                      {l.variant && (
                        <p className="text-sm text-brun/55">{tr(l.variant.label)}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(l.productId, l.variantId)}
                      aria-label={t("cart.remove")}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-brun/40 transition-colors hover:bg-rouge-pomme/10 hover:text-rouge-pomme"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-auto flex items-end justify-between pt-3">
                    <div className="inline-flex items-center rounded-full bg-ivoire">
                      <button
                        type="button"
                        onClick={() => setQty(l.productId, l.variantId, l.qty - 1)}
                        className="grid h-9 w-9 place-items-center rounded-full text-brun hover:bg-brun hover:text-creme"
                        aria-label="−"
                      >−</button>
                      <span className="prix w-8 text-center text-sm font-semibold">{l.qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(l.productId, l.variantId, l.qty + 1)}
                        className="grid h-9 w-9 place-items-center rounded-full text-brun hover:bg-brun hover:text-creme"
                        aria-label="+"
                      >+</button>
                    </div>
                    <div className="text-right">
                      <span className="prix text-lg font-bold text-orange">
                        {formatFCFA(l.lineTotal)}
                      </span>
                      {l.qty > 1 && (
                        <span className="block text-xs text-brun/45">
                          {formatFCFA(l.unitPrice)} × {l.qty}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link
              href="/produits"
              className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-brun/60 hover:text-orange"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t("cart.continue")}
            </Link>
          </div>

          {/* Résumé */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-brun/8 bg-ivoire/60 p-6">
              <h2 className="font-display text-xl font-semibold">{t("checkout.recap")}</h2>

              {/* jauge */}
              <div className="mt-5">
                <p className="mb-2 text-xs font-medium text-brun/65">
                  {remaining > 0
                    ? t("cart.freeShippingRemaining", { x: formatFCFA(remaining) })
                    : t("cart.freeShippingReached")}
                </p>
                <div className="h-1.5 overflow-hidden rounded-full bg-brun/10">
                  <div className="h-full rounded-full bg-vert transition-all duration-700" style={{ width: `${pct}%` }} />
                </div>
              </div>

              {/* zone */}
              <div className="mt-6">
                <p className="mb-2 text-sm font-semibold text-brun/70">{t("checkout.zone")}</p>
                <div className="flex rounded-full bg-white p-1 text-sm font-medium">
                  {(["dakar", "regions"] as const).map((z) => (
                    <button
                      key={z}
                      type="button"
                      onClick={() => setZone(z)}
                      className={`flex-1 rounded-full px-3 py-2 transition-colors ${
                        zone === z ? "bg-brun text-creme" : "text-brun/60 hover:text-brun"
                      }`}
                    >
                      {t(z === "dakar" ? "cart.shippingDakar" : "cart.shippingRegions")}
                    </button>
                  ))}
                </div>
              </div>

              <dl className="mt-6 space-y-3 border-t border-brun/10 pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-brun/65">{t("cart.subtotal")}</dt>
                  <dd className="prix font-semibold">{formatFCFA(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-brun/65">{t("cart.shipping")}</dt>
                  <dd className="prix font-semibold">
                    {shipping === 0 ? (
                      <span className="text-vert">{t("common.free")}</span>
                    ) : (
                      formatFCFA(shipping)
                    )}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-brun/10 pt-4">
                  <dt className="font-display text-lg font-semibold">{t("cart.total")}</dt>
                  <dd className="prix font-display text-2xl font-bold text-orange">
                    {formatFCFA(total)}
                  </dd>
                </div>
              </dl>

              <Link href="/commande" className="btn btn-primary mt-6 w-full">
                {t("cart.checkout")}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <WhatsAppOrderButton className="mt-2 w-full" />
              <p className="mt-3 text-center text-xs text-brun/45">
                {t("checkout.demoNote")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
