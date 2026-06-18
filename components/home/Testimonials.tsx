"use client";

import { useLang } from "@/lib/i18n";
import { useReveal } from "@/lib/useReveal";
import SectionHead from "@/components/SectionHead";

export default function Testimonials() {
  const { t } = useLang();
  const ref = useReveal<HTMLDivElement>({ stagger: 0.12 });

  const items = [
    { quote: t("testimonials.t1"), name: t("testimonials.t1Name"), role: t("testimonials.t1Role") },
    { quote: t("testimonials.t2"), name: t("testimonials.t2Name"), role: t("testimonials.t2Role") },
    { quote: t("testimonials.t3"), name: t("testimonials.t3Name"), role: t("testimonials.t3Role") },
  ];

  return (
    <section className="bg-ivoire py-20 sm:py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          kicker={t("home.testimonialsKicker")}
          title={t("home.testimonialsTitle")}
          align="center"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((it, i) => (
            <figure
              key={i}
              className="reveal card-terroir flex flex-col p-7"
            >
              <span className="font-display text-6xl leading-none text-orange/30">
                &ldquo;
              </span>
              <div className="mb-5 -mt-4 flex gap-0.5 text-or">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3z" />
                  </svg>
                ))}
              </div>
              <blockquote className="flex-1 text-[1.02rem] leading-relaxed text-brun/80 text-pretty">
                {it.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-brun/8 pt-5">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-brun font-display text-lg font-semibold text-creme">
                  {it.name.charAt(0)}
                </span>
                <div>
                  <p className="font-semibold leading-tight text-brun">{it.name}</p>
                  <p className="text-sm text-brun/55">{it.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
