"use client";

import { useEffect, useRef } from "react";

// Hook GSAP : reveals au scroll (stagger) + respect de prefers-reduced-motion.
// Cible les éléments .reveal à l'intérieur du conteneur retourné.
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: { y?: number; stagger?: number; selector?: string } = {},
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const targets = el.querySelectorAll<HTMLElement>(
      options.selector ?? ".reveal",
    );
    if (targets.length === 0) return;

    if (reduce) return; // pas d'état caché : le contenu reste visible

    const y = options.y ?? 28;
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
        gsap.set(targets, { opacity: 0, y });
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: options.stagger ?? 0.12,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      }, el);

      cleanup = () => ctx.revert();
    })();

    return () => {
      killed = true;
      cleanup?.();
    };
  }, [options.selector, options.stagger, options.y]);

  return ref;
}
