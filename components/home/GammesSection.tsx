"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/lib/useReveal";
import { GAMMES } from "@/data/products";
import { formatFCFA } from "@/lib/format";
import { ProductVisual } from "@/components/art";
import SectionHead from "@/components/SectionHead";

export default function GammesSection() {
  const { t, tr } = useLang();
  const ref = useReveal<HTMLDivElement>({ stagger: 0.1 });

  return (
    <section className="bg-creme py-20 sm:py-24" id="gammes">
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHead
            kicker={t("home.gammesKicker")}
            title={t("home.gammesTitle")}
            lead={t("home.gammesLead")}
          />
          <Link
            href="/produits"
            className="reveal btn btn-ghost shrink-0"
          >
            {t("home.gammesCta")}
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GAMMES.map((g, i) => (
            <Link
              key={g.id}
              href={`/produits?gamme=${g.id}`}
              className="reveal card-terroir group relative flex flex-col overflow-hidden hover:-translate-y-1.5 hover:shadow-[var(--shadow-terroir)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden border-b border-brun/10 bg-ivoire">
                <div
                  className="pointer-events-none absolute -left-8 -top-8 z-0 h-36 w-36 rounded-full opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
                  style={{ background: g.accent }}
                />
                <ProductVisual
                  cover
                  image={g.image}
                  kind={g.illustration}
                  accent={g.accent}
                  alt={tr(g.name)}
                />
                <span
                  className="absolute right-4 top-4 z-10 font-display text-5xl font-bold leading-none text-brun/10"
                >
                  0{i + 1}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-vert">
                  {tr(g.short)}
                </span>
                <h3 className="mt-1.5 font-display text-2xl font-semibold transition-colors group-hover:text-orange">
                  {tr(g.name)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brun/60 text-pretty">
                  {tr(g.description)}
                </p>
                <div className="mt-5 flex items-center justify-between pt-2">
                  <span className="prix text-sm font-semibold text-brun/80">
                    {g.priceFrom === null
                      ? t("common.quote")
                      : `${t("common.from")} ${formatFCFA(g.priceFrom)}`}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-orange transition-transform group-hover:translate-x-1">
                    {t("common.discover")}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
