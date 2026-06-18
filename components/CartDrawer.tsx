"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { formatFCFA, FREE_SHIPPING_THRESHOLD } from "@/lib/format";
import { ProductThumb } from "@/components/art";
import WhatsAppOrderButton from "@/components/WhatsAppOrderButton";

export default function CartDrawer() {
  const { resolved, count, subtotal, setQty, remove, drawerOpen, closeDrawer } =
    useCart();
  const { t, tr } = useLang();

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeDrawer]);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeDrawer}
        aria-hidden={!drawerOpen}
        className={`fixed inset-0 z-[60] bg-brun-fonce/40 backdrop-blur-[2px] transition-opacity duration-400 ${
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panneau */}
      <aside
        role="dialog"
        aria-label={t("cart.drawerTitle")}
        aria-modal="true"
        className={`fixed inset-y-0 right-0 z-[70] flex w-full max-w-[26rem] flex-col bg-creme shadow-[-20px_0_60px_-30px_rgba(62,38,20,0.6)] transition-transform duration-500 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionTimingFunction: "var(--ease-terroir)" }}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between border-b border-brun/10 px-6 py-5">
          <h2 className="font-display text-xl font-semibold">
            {t("cart.drawerTitle")}
            {count > 0 && (
              <span className="ml-2 text-sm font-normal text-brun/50">
                {count} {t(count > 1 ? "cart.item_other" : "cart.item_one")}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Fermer"
            className="grid h-9 w-9 place-items-center rounded-full bg-ivoire text-brun transition-colors hover:bg-brun hover:text-creme"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {resolved.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-ivoire">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 8h12l-1 11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8z" stroke="var(--color-brun)" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M9 8a3 3 0 0 1 6 0" stroke="var(--color-brun)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="font-display text-lg font-semibold">{t("cart.empty")}</p>
              <p className="mt-1 text-sm text-brun/60">{t("cart.emptyLead")}</p>
            </div>
            <Link href="/produits" onClick={closeDrawer} className="btn btn-primary">
              {t("cart.emptyCta")}
            </Link>
          </div>
        ) : (
          <>
            {/* Jauge livraison offerte */}
            <div className="border-b border-brun/8 px-6 py-4">
              <p className="mb-2 text-xs font-medium text-brun/70">
                {remaining > 0
                  ? t("cart.freeShippingRemaining", { x: formatFCFA(remaining) })
                  : t("cart.freeShippingReached")}
              </p>
              <div className="h-1.5 overflow-hidden rounded-full bg-ivoire">
                <div
                  className="h-full rounded-full bg-vert transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            {/* Lignes */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
              {resolved.map((l) => (
                <div
                  key={l.key}
                  className="flex gap-3 rounded-2xl p-2 transition-colors hover:bg-ivoire/60"
                >
                  <ProductThumb
                    image={l.product.image}
                    kind={l.product.illustration}
                    accent={l.product.accent}
                    alt={tr(l.product.name)}
                    className="h-20 w-20"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link
                      href={`/produits/${l.product.slug}`}
                      onClick={closeDrawer}
                      className="truncate font-display text-[0.98rem] font-semibold leading-tight hover:text-orange"
                    >
                      {tr(l.product.name)}
                    </Link>
                    {l.variant && (
                      <span className="text-xs text-brun/55">{tr(l.variant.label)}</span>
                    )}
                    <span className="prix mt-0.5 text-sm font-semibold text-orange">
                      {formatFCFA(l.unitPrice)}
                    </span>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="inline-flex items-center rounded-full bg-ivoire">
                        <button
                          type="button"
                          onClick={() => setQty(l.productId, l.variantId, l.qty - 1)}
                          className="grid h-7 w-7 place-items-center rounded-full text-brun hover:bg-brun hover:text-creme"
                          aria-label="−"
                        >−</button>
                        <span className="prix w-6 text-center text-sm font-semibold">{l.qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(l.productId, l.variantId, l.qty + 1)}
                          className="grid h-7 w-7 place-items-center rounded-full text-brun hover:bg-brun hover:text-creme"
                          aria-label="+"
                        >+</button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(l.productId, l.variantId)}
                        className="text-xs text-brun/45 underline-offset-2 hover:text-rouge-pomme hover:underline"
                      >
                        {t("cart.remove")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pied */}
            <div className="border-t border-brun/10 bg-ivoire/50 px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-brun/70">{t("cart.subtotal")}</span>
                <span className="prix text-xl font-bold">{formatFCFA(subtotal)}</span>
              </div>
              <div className="flex flex-col gap-2">
                <Link href="/commande" onClick={closeDrawer} className="btn btn-primary w-full">
                  {t("cart.checkout")}
                </Link>
                <WhatsAppOrderButton onClick={closeDrawer} className="w-full" />
                <Link href="/panier" onClick={closeDrawer} className="btn btn-ghost w-full">
                  {t("cart.title")}
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
