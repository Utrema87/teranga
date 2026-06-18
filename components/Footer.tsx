"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { GAMMES } from "@/data/products";

const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com/terangacajou", d: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM17.5 6.5h.01M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" },
  { name: "Facebook", href: "https://facebook.com/terangacajou", d: "M14 9h3V5h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1z" },
  { name: "TikTok", href: "https://tiktok.com/@terangacajou", d: "M15 4c.5 2.3 2 3.8 4 4v3c-1.6 0-3-.5-4-1.3V15a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1v3.1a2.5 2.5 0 1 0 1.6 2.3V4H15z" },
];

export default function Footer() {
  const { t, tr } = useLang();

  return (
    <footer className="relative mt-24 overflow-hidden bg-brun-fonce text-creme">
      <div className="grain" />
      {/* vague décorative */}
      <svg
        className="absolute inset-x-0 -top-px w-full text-creme"
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 48h1440V0c-180 28-420 40-720 16C420 8 180 0 0 24z"
          fill="currentColor"
        />
      </svg>

      <div className="relative mx-auto max-w-7xl px-5 pt-24 pb-10 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* Marque */}
          <div>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="" width={842} height={738} className="h-12 w-auto" />
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-3xl font-semibold italic">
                  Teranga
                </span>
                <span className="font-display text-2xl font-bold uppercase tracking-wide text-orange-vif">
                  Cajou
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-creme/70">
              {t("footer.tagline")}
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="grid h-10 w-10 place-items-center rounded-full bg-creme/8 text-creme/80 transition-colors hover:bg-orange hover:text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d={s.d}
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-or">
              {t("footer.nav")}
            </h3>
            <ul className="space-y-2.5 text-sm text-creme/75">
              <li><Link href="/" className="link-underline hover:text-creme">{t("nav.home")}</Link></li>
              <li><Link href="/produits" className="link-underline hover:text-creme">{t("nav.products")}</Link></li>
              <li><Link href="/notre-histoire" className="link-underline hover:text-creme">{t("nav.story")}</Link></li>
              <li><Link href="/b2b" className="link-underline hover:text-creme">{t("nav.b2b")}</Link></li>
              <li><Link href="/faq" className="link-underline hover:text-creme">{t("nav.faq")}</Link></li>
              <li><Link href="/contact" className="link-underline hover:text-creme">{t("nav.contact")}</Link></li>
            </ul>
          </nav>

          {/* Gammes */}
          <nav>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-or">
              {t("footer.gammesTitle")}
            </h3>
            <ul className="space-y-2.5 text-sm text-creme/75">
              {GAMMES.map((g) => (
                <li key={g.id}>
                  <Link
                    href={`/produits?gamme=${g.id}`}
                    className="link-underline hover:text-creme"
                  >
                    {tr(g.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-or">
              {t("footer.contactTitle")}
            </h3>
            <ul className="space-y-3 text-sm text-creme/75">
              <li>
                <a
                  href="mailto:contact@teranga-cajou.sn"
                  className="link-underline hover:text-creme"
                >
                  contact@teranga-cajou.sn
                </a>
              </li>
              <li>Casamance — Ziguinchor · Sédhiou · Kolda</li>
              <li className="flex items-center gap-2 text-vert-feuille">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t("footer.delivery")}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-creme/12 pt-7 text-xs text-creme/55 sm:flex-row">
          <p>
            © 2026 Teranga Cajou. {t("footer.rights")}{" "}
            <span className="text-creme/40">· {t("footer.legalDemo")}</span>
          </p>
          <p className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-vert-feuille" />
            {t("footer.madeIn")}
          </p>
        </div>
      </div>
    </footer>
  );
}
