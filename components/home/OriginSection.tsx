"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/lib/useReveal";
import SectionHead from "@/components/SectionHead";

export default function OriginSection() {
  const { t } = useLang();
  const ref = useReveal<HTMLDivElement>({ stagger: 0.12 });

  const places = [
    { name: t("home.originZig"), text: t("home.originZigText") },
    { name: t("home.originSed"), text: t("home.originSedText") },
    { name: t("home.originKol"), text: t("home.originKolText") },
  ];

  return (
    <section className="grain relative overflow-hidden bg-brun-fonce py-20 text-creme sm:py-28">
      {/* halo */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-orange), transparent 65%)" }}
      />
      <div ref={ref} className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHead
              kicker={t("home.originKicker")}
              title={t("home.originTitle")}
              lead={t("home.originLead")}
              dark
            />
            <Link href="/notre-histoire" className="reveal btn btn-primary mt-8">
              {t("home.originCta")}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* carte stylisée + lieux */}
          <div className="reveal space-y-3">
            {places.map((p, i) => (
              <div
                key={p.name}
                className="flex items-start gap-4 rounded-2xl border border-creme/10 bg-creme/5 p-5 backdrop-blur-sm transition-colors hover:border-orange/40 hover:bg-creme/8"
              >
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-orange/15 text-orange-vif">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" stroke="currentColor" strokeWidth="1.7" />
                    <circle cx="12" cy="9" r="2.4" fill="currentColor" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-creme">
                    {p.name}
                    <span className="ml-2 text-xs font-normal text-creme/40">
                      0{i + 1}
                    </span>
                  </h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-creme/65">
                    {p.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
