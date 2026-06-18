"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";

const STATS = [
  { value: 55, suffix: " %", labelKey: "home.stat1Label" },
  { value: 3, suffix: "", labelKey: "home.stat2Label" },
  { value: 24, suffix: " h", labelKey: "home.stat3Label" },
  { value: 100, suffix: " %", labelKey: "home.stat4Label" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.textContent = `${value}${suffix}`;
      return;
    }

    let killed = false;
    let cleanup: (() => void) | undefined;
    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (killed) return;
      const gsap = gsapMod.default ?? gsapMod;
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      const obj = { n: 0 };
      const tween = gsap.to(obj, {
        n: value,
        duration: 1.6,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${Math.round(obj.n)}${suffix}`;
        },
        scrollTrigger: { trigger: el, start: "top 90%" },
      });
      cleanup = () => tween.scrollTrigger?.kill();
    })();

    return () => {
      killed = true;
      cleanup?.();
    };
  }, [value, suffix]);

  return (
    <span ref={ref} className="prix">
      0{suffix}
    </span>
  );
}

export default function StatsBand() {
  const { t } = useLang();
  return (
    <section className="relative bg-creme py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-y-10 rounded-3xl border border-brun/8 bg-ivoire/60 px-6 py-10 sm:px-10 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.labelKey}
              className={`flex flex-col items-center text-center lg:items-start lg:text-left ${
                i < STATS.length - 1 ? "lg:border-r lg:border-brun/10" : ""
              }`}
            >
              <span className="font-display text-[clamp(2.6rem,5vw,3.6rem)] font-bold leading-none text-orange">
                <Counter value={s.value} suffix={s.suffix} />
              </span>
              <span className="mt-3 max-w-[14ch] text-sm leading-snug text-brun/65">
                {t(s.labelKey)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
