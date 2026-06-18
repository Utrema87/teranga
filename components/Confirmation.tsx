"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { formatFCFA } from "@/lib/format";
import { getLastOrder, type Order } from "@/lib/order";

const METHOD_LABEL: Record<Order["method"], string> = {
  wave: "Wave",
  om: "Orange Money",
  card: "Carte bancaire",
};

export default function Confirmation() {
  const { t } = useLang();
  const [order, setOrder] = useState<Order | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOrder(getLastOrder());
    setReady(true);
  }, []);

  if (!ready) {
    return <div className="min-h-[60vh] bg-creme" />;
  }

  if (!order) {
    return (
      <div className="bg-creme">
        <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-6 px-5 text-center">
          <h1 className="font-display text-3xl font-semibold">{t("confirmation.noOrder")}</h1>
          <Link href="/produits" className="btn btn-primary">{t("cart.emptyCta")}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grain relative overflow-hidden bg-creme bg-terroir">
      <div className="relative mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        {/* en-tête succès */}
        <div className="text-center">
          <span className="tc-check mx-auto grid h-20 w-20 place-items-center rounded-full bg-vert text-white shadow-[0_18px_40px_-16px_rgba(62,142,46,0.7)]">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="mt-6 inline-block text-xs font-semibold uppercase tracking-[0.22em] text-vert">
            {t("confirmation.kicker")}
          </span>
          <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.2rem)] font-semibold leading-tight text-balance">
            {t("confirmation.title")}
          </h1>
          <p className="mt-3 text-lg text-brun/65">{t("confirmation.lead")}</p>
        </div>

        {/* numéro */}
        <div className="mt-10 rounded-2xl border border-brun/8 bg-white p-6 text-center shadow-[var(--shadow-soft)]">
          <p className="text-sm font-medium text-brun/55">{t("confirmation.orderNumber")}</p>
          <p className="prix mt-1 font-display text-3xl font-bold tracking-wide text-orange">
            {order.number}
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-or/10 px-4 py-1.5 text-xs text-brun/60">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-or">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
              <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {t("confirmation.demoNote")}
          </p>
        </div>

        {/* récap */}
        <div className="mt-6 rounded-2xl border border-brun/8 bg-ivoire/60 p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold">{t("confirmation.recap")}</h2>

          <div className="mt-5 space-y-3">
            {order.lines.map((l, i) => (
              <div key={i} className="flex items-start justify-between gap-4 text-sm">
                <div>
                  <p className="font-medium text-brun">{l.name}</p>
                  <p className="text-brun/50">{l.format} · × {l.qty}</p>
                </div>
                <span className="prix shrink-0 font-semibold">{formatFCFA(l.lineTotal)}</span>
              </div>
            ))}
          </div>

          <dl className="mt-5 space-y-2.5 border-t border-brun/10 pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-brun/65">{t("cart.subtotal")}</dt>
              <dd className="prix font-semibold">{formatFCFA(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-brun/65">{t("cart.shipping")}</dt>
              <dd className="prix font-semibold">
                {order.shipping === 0 ? <span className="text-vert">{t("common.free")}</span> : formatFCFA(order.shipping)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-brun/10 pt-4">
              <dt className="font-display text-lg font-semibold">{t("cart.total")}</dt>
              <dd className="prix font-display text-2xl font-bold text-orange">{formatFCFA(order.total)}</dd>
            </div>
          </dl>

          <div className="mt-5 grid gap-4 border-t border-brun/10 pt-5 text-sm sm:grid-cols-2">
            <div>
              <p className="mb-1 font-semibold text-brun/70">{t("checkout.step2")}</p>
              <p className="text-brun/65">
                {order.customer.firstName} {order.customer.lastName}<br />
                {order.customer.address}, {order.customer.city}<br />
                {order.customer.phone}
              </p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-brun/70">{t("checkout.payMethod")}</p>
              <p className="text-brun/65">{METHOD_LABEL[order.method]}</p>
            </div>
          </div>
        </div>

        {/* suite */}
        <div className="mt-6 rounded-2xl bg-brun-fonce p-6 text-creme sm:p-8">
          <h3 className="font-display text-lg font-semibold">{t("confirmation.nextTitle")}</h3>
          <p className="mt-2 text-sm leading-relaxed text-creme/70">{t("confirmation.nextText")}</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/produits" className="btn btn-primary">{t("confirmation.keepShopping")}</Link>
          <Link href="/" className="btn btn-ghost">{t("confirmation.backHome")}</Link>
        </div>
      </div>
    </div>
  );
}
