"use client";

import { useLang } from "@/lib/i18n";

const KEYS = ["marquee.a", "marquee.b", "marquee.c", "marquee.d", "marquee.e", "marquee.f"];

function Cashew() {
  return (
    <span className="mx-7 inline-flex shrink-0 text-orange-vif sm:mx-10" aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 100 100" fill="currentColor">
        <path d="M71 18c-15-9-37-4-46 12-7 12-6 28 4 38 9 9 23 12 33 6 5-3 6-9 2-13-3-3-8-3-13-1-6 2-12 0-15-5-4-7-2-16 5-21 6-4 14-5 21-2 5 2 10 0 12-5 2-4 0-9-3-9z" />
      </svg>
    </span>
  );
}

export default function Marquee() {
  const { t } = useLang();
  const items = KEYS.map((k) => t(k));
  // Doublé pour une boucle continue (translateX -50 %)
  const sequence = [...items, ...items];

  return (
    <section
      className="tc-marquee grain relative overflow-hidden bg-brun py-5 text-creme"
      aria-label={items.join(", ")}
    >
      <div className="tc-marquee-track">
        {sequence.map((label, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="font-display text-2xl font-semibold italic sm:text-3xl">
              {label}
            </span>
            <Cashew />
          </span>
        ))}
      </div>
      {/* fondus latéraux */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-brun to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-brun to-transparent sm:w-28" />
    </section>
  );
}
