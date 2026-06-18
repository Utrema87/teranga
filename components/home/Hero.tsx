"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";

// Les 3 produits retenus, détourés (cluster flottant du hero)
const TRIO = [
  {
    src: "/hero-jus.png",
    w: 576,
    h: 931,
    alt: "Jus de cajou 100 % naturel, canette 300 ml",
    cls: "w-[26%] translate-y-3 -rotate-[4deg] tc-float-1",
  },
  {
    src: "/hero-caramel.png",
    w: 1190,
    h: 1024,
    alt: "Anacardes caramélisées bio, étui 500 g",
    cls: "w-[46%] z-10 -mx-[3%] tc-float-2",
  },
  {
    src: "/hero-vegan.png",
    w: 1220,
    h: 1161,
    alt: "Viande vegan de cajou, émincé végétal 500 g",
    cls: "w-[38%] translate-y-2 rotate-[3deg] tc-float-3",
  },
];

export default function Hero() {
  const { t } = useLang();
  const artRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let killed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (killed) return;
      const gsap = gsapMod.default ?? gsapMod;
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.from(".tc-hero-stagger", {
          opacity: 0,
          y: 26,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.1,
        });
        gsap.from(".tc-hero-prod", {
          opacity: 0,
          scale: 0.86,
          y: 30,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.14,
          delay: 0.25,
        });

        // Flottement continu (décalé par produit)
        gsap.to(".tc-float-1", { y: -12, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(".tc-float-2", { y: -16, duration: 3.8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.3 });
        gsap.to(".tc-float-3", { y: -10, duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.6 });

        gsap.to(".tc-hero-art", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 0.6 },
        });
      }, rootRef);

      const onMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 14;
        const y = (e.clientY / window.innerHeight - 0.5) * 14;
        gsap.to(artRef.current, { x, y, duration: 0.9, ease: "power2.out" });
      };
      window.addEventListener("mousemove", onMove);

      cleanup = () => {
        ctx.revert();
        window.removeEventListener("mousemove", onMove);
      };
    })();

    return () => {
      killed = true;
      cleanup?.();
    };
  }, []);

  return (
    <section ref={rootRef} className="grain relative overflow-hidden bg-brun-fonce text-creme">
      {/* halos d'ambiance */}
      <div
        className="pointer-events-none absolute -left-40 -top-32 h-[40rem] w-[40rem] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(232,130,30,0.30), transparent 62%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-48 right-[-10rem] h-[42rem] w-[42rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(62,142,46,0.30), transparent 62%)" }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 select-none font-display text-[26vw] font-semibold italic leading-none text-creme/[0.04] lg:block"
      >
        Cajou
      </span>

      <div className="relative mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center gap-12 px-5 pb-16 pt-12 sm:px-8 lg:grid lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-6 lg:pb-20 lg:pt-12">
        {/* Texte */}
        <div className="order-2 max-w-md text-center lg:order-1 lg:text-left">
          <h1 className="tc-hero-stagger font-display text-[clamp(2.6rem,5.2vw,4.2rem)] font-semibold leading-[1.0] tracking-tight text-creme text-balance">
            <span className="block">{t("home.heroTitle1")}</span>
            <span className="relative inline-block italic text-orange-vif">
              {t("home.heroTitle2")}
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 8c40-6 120-7 196-2" stroke="var(--color-vert-feuille)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="tc-hero-stagger mx-auto mt-6 max-w-sm text-base leading-relaxed text-creme/70 text-pretty lg:mx-0">
            {t("home.heroLead")}
          </p>

          <div className="tc-hero-stagger mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Link href="/produits" className="btn bg-creme text-brun-fonce hover:bg-white hover:-translate-y-0.5">
              {t("home.heroCtaShop")}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/notre-histoire" className="group inline-flex items-center gap-3 text-sm font-semibold text-creme">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-creme/10 ring-1 ring-creme/20 transition-colors group-hover:bg-orange group-hover:ring-orange">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              {t("home.heroCtaHow")}
            </Link>
          </div>

          {/* mini-ligne de confiance */}
          <div className="tc-hero-stagger mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium uppercase tracking-wider text-creme/55 lg:justify-start">
            <span className="inline-flex items-center gap-1.5"><Dot /> {t("badges.bio")}</span>
            <span className="inline-flex items-center gap-1.5"><Dot /> {t("badges.casamance")}</span>
            <span className="inline-flex items-center gap-1.5"><Dot /> {t("home.stat2Label")}</span>
          </div>
        </div>

        {/* Cluster produits */}
        <div className="relative order-1 w-full lg:order-2">
          <div
            ref={artRef}
            className="tc-hero-art relative mx-auto flex w-[min(94vw,40rem)] items-end justify-center"
          >
            {/* sol lumineux */}
            <div
              className="pointer-events-none absolute bottom-[8%] left-1/2 h-16 w-[80%] -translate-x-1/2 rounded-[50%] opacity-70 blur-2xl"
              style={{ background: "radial-gradient(circle, rgba(243,236,221,0.28), transparent 70%)" }}
            />
            {TRIO.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={p.src}
                src={p.src}
                width={p.w}
                height={p.h}
                decoding="async"
                fetchPriority="high"
                alt={p.alt}
                className={`tc-hero-prod relative h-auto drop-shadow-[0_30px_45px_rgba(0,0,0,0.5)] ${p.cls}`}
              />
            ))}
          </div>
        </div>
      </div>

      <svg className="relative block w-full text-creme" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 60h1440V22c-200 28-460 34-740 14C420 22 180 16 0 38z" fill="currentColor" />
      </svg>
    </section>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-vert-feuille" />;
}
