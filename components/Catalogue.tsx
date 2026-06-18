"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, GAMMES, type GammeId } from "@/data/products";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/lib/useReveal";
import ProductCard from "@/components/ProductCard";
import SectionHead from "@/components/SectionHead";

type Filter = "all" | GammeId;

export default function Catalogue() {
  const { t, tr } = useLang();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<Filter>("all");

  // Pré-sélection depuis l'URL (?gamme=…)
  useEffect(() => {
    const g = searchParams.get("gamme");
    if (g && GAMMES.some((x) => x.id === g)) setFilter(g as GammeId);
  }, [searchParams]);

  const list = useMemo(
    () =>
      filter === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.gamme === filter),
    [filter],
  );

  const ref = useReveal<HTMLDivElement>({ stagger: 0.07 });

  return (
    <div className="bg-creme">
      {/* En-tête */}
      <div className="grain relative overflow-hidden bg-ivoire/70">
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-8 sm:pt-20">
          <SectionHead
            kicker={t("products.kicker")}
            title={t("products.title")}
            lead={t("products.lead")}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        {/* Filtres */}
        <div className="mb-10 flex flex-wrap items-center gap-2.5">
          <FilterChip
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label={t("products.filterAll")}
          />
          {GAMMES.map((g) => (
            <FilterChip
              key={g.id}
              active={filter === g.id}
              onClick={() => setFilter(g.id)}
              label={tr(g.name)}
            />
          ))}
          <span className="ml-auto text-sm text-brun/50">
            {list.length}{" "}
            {t(list.length > 1 ? "products.count_other" : "products.count_one")}
          </span>
        </div>

        {/* Grille */}
        {list.length === 0 ? (
          <p className="py-20 text-center text-brun/50">{t("products.empty")}</p>
        ) : (
          <div
            key={filter}
            ref={ref}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {list.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
        active
          ? "bg-brun text-creme shadow-[var(--shadow-soft)]"
          : "bg-ivoire text-brun/70 hover:bg-brun/8 hover:text-brun"
      }`}
    >
      {label}
    </button>
  );
}
