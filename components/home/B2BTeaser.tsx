"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/lib/useReveal";

export default function B2BTeaser() {
  const { t } = useLang();
  const ref = useReveal<HTMLDivElement>({ stagger: 0.1 });

  const points = [
    t("home.b2bPoint1"),
    t("home.b2bPoint2"),
    t("home.b2bPoint3"),
  ];

  return (
    <section className="bg-creme py-20 sm:py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brun to-brun-fonce px-7 py-12 text-creme sm:px-12 sm:py-16">
          <div className="grain" />
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--color-orange)" }}
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <span className="badge bg-orange/20 text-orange-vif">
                {t("home.b2bKicker")}
              </span>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-semibold leading-tight text-creme text-balance">
                {t("home.b2bTitle")}
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-creme/70 text-pretty">
                {t("home.b2bLead")}
              </p>
              <Link href="/b2b" className="btn btn-primary mt-8">
                {t("home.b2bCta")}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <ul className="space-y-3">
              {points.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-3 rounded-xl border border-creme/10 bg-creme/5 px-4 py-3.5 text-sm text-creme/85"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-vert text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
