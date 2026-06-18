"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/lib/useReveal";
import { FAQ } from "@/data/faq";
import SectionHead from "@/components/SectionHead";

export default function FaqPage() {
  const { t, tr } = useLang();
  const ref = useReveal<HTMLDivElement>({ stagger: 0.06 });
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="bg-creme">
      <div className="grain relative overflow-hidden bg-ivoire/70">
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-8 sm:pt-20">
          <SectionHead kicker={t("faq.kicker")} title={t("faq.title")} lead={t("faq.lead")} />
        </div>
      </div>

      <div ref={ref} className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
        {FAQ.map((cat) => (
          <div key={cat.labelKey} className="reveal mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-vert">
              <span className="h-px w-7 bg-vert/50" />
              {t(cat.labelKey)}
            </h2>
            <div className="overflow-hidden rounded-2xl border border-brun/10 bg-white">
              {cat.items.map((item, i) => {
                const id = `${cat.labelKey}-${i}`;
                const isOpen = open === id;
                return (
                  <div key={id} className="border-b border-brun/8 last:border-b-0">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-ivoire/50"
                    >
                      <span className="font-display text-[1.05rem] font-semibold text-brun">
                        {tr(item.q)}
                      </span>
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ivoire text-brun transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-[var(--ease-terroir)] ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 text-[0.97rem] leading-relaxed text-brun/70">
                          {tr(item.a)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* encore une question */}
        <div className="reveal mt-12 rounded-2xl bg-brun-fonce p-7 text-center text-creme sm:p-9">
          <h3 className="font-display text-xl font-semibold">{t("faq.stillTitle")}</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-creme/70">{t("faq.stillText")}</p>
          <Link href="/contact" className="btn btn-primary mt-6">
            {t("faq.stillCta")}
          </Link>
        </div>
      </div>
    </div>
  );
}
