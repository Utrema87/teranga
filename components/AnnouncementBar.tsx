"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

const STORAGE_KEY = "tc-announce-dismissed";
const KEYS = ["announce.ship", "announce.origin", "announce.bio"];

export default function AnnouncementBar() {
  const { t } = useLang();
  const [dismissed, setDismissed] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY) === "1") setDismissed(true);
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % KEYS.length), 4200);
    return () => clearInterval(id);
  }, [dismissed]);

  if (dismissed) return null;

  const close = () => {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setDismissed(true);
  };

  return (
    <div className="relative z-[55] bg-brun-fonce text-creme">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-2 px-10 text-center sm:px-8">
        <span className="grid h-4 w-4 shrink-0 place-items-center text-orange-vif">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="7" cy="17" r="1.6" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="17.5" cy="17" r="1.6" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </span>
        <p
          key={idx}
          className="animate-[tc-fade_0.5s_ease] text-[0.78rem] font-medium tracking-wide sm:text-sm"
        >
          {t(KEYS[idx])}
        </p>
      </div>
      <button
        type="button"
        onClick={close}
        aria-label={t("announce.close")}
        className="absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-creme/60 transition-colors hover:bg-creme/10 hover:text-creme sm:right-4"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
