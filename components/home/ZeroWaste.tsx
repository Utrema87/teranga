"use client";

import { useLang } from "@/lib/i18n";
import { useReveal } from "@/lib/useReveal";
import SectionHead from "@/components/SectionHead";
import { CashewNut, Leaf } from "@/components/art";

export default function ZeroWaste() {
  const { t } = useLang();
  const ref = useReveal<HTMLDivElement>({ stagger: 0.14 });

  const steps = [
    {
      titleKey: "home.zeroNoixTitle",
      textKey: "home.zeroNoixText",
      accent: "var(--color-or)",
      icon: <CashewNut className="h-12 w-12" fill="var(--color-or)" />,
    },
    {
      titleKey: "home.zeroPommeTitle",
      textKey: "home.zeroPommeText",
      accent: "var(--color-orange)",
      icon: (
        <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
          <path d="M24 8c-11 0-18 8-18 22 0 9 7 14 18 14s18-5 18-14C42 16 35 8 24 8z" fill="var(--color-orange)" />
          <path d="M24 8c1-3 1-5 0-7" stroke="var(--color-brun)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        </svg>
      ),
    },
    {
      titleKey: "home.zeroCoqueTitle",
      textKey: "home.zeroCoqueText",
      accent: "var(--color-brun)",
      icon: (
        <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
          <path d="M24 10c-8 0-15 6-15 16s7 14 15 14 15-4 15-14-7-16-15-16z" fill="var(--color-brun)" />
          <path d="M24 10c-4 6-4 24 0 30" stroke="rgba(255,255,255,0.2)" strokeWidth="2.4" fill="none" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-ivoire py-20 sm:py-24">
      <Leaf
        className="pointer-events-none absolute -right-10 top-10 h-44 w-44 rotate-45 opacity-[0.06]"
        fill="var(--color-vert)"
      />
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          kicker={t("home.zeroKicker")}
          title={t("home.zeroTitle")}
          lead={t("home.zeroLead")}
          align="center"
        />

        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          {/* ligne de liaison */}
          <div className="pointer-events-none absolute left-0 right-0 top-[58px] hidden md:block">
            <svg className="w-full" height="2" preserveAspectRatio="none" aria-hidden="true">
              <line x1="0" y1="1" x2="100%" y2="1" stroke="var(--color-brun)" strokeWidth="2" strokeDasharray="2 8" opacity="0.25" />
            </svg>
          </div>

          {steps.map((s, i) => (
            <div key={s.titleKey} className="reveal relative flex flex-col items-center text-center">
              <div className="relative z-10 grid h-28 w-28 place-items-center rounded-full bg-creme shadow-[var(--shadow-soft)] ring-1 ring-brun/8">
                {s.icon}
                <span
                  className="absolute -right-1 -top-1 grid h-8 w-8 place-items-center rounded-full text-sm font-bold text-white"
                  style={{ background: s.accent }}
                >
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">
                {t(s.titleKey)}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-brun/65 text-pretty">
                {t(s.textKey)}
              </p>
              {i < steps.length - 1 && (
                <svg
                  className="mt-5 h-6 w-6 text-orange md:hidden"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
