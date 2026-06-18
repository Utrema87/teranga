"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";

const LINKS = [
  { href: "/produits", key: "nav.products" },
  { href: "/notre-histoire", key: "nav.story" },
  { href: "/b2b", key: "nav.b2b" },
  { href: "/contact", key: "nav.contact" },
] as const;

export default function Header() {
  const { t, lang, setLang } = useLang();
  const { count, openDrawer } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-brun/10 bg-creme/90 backdrop-blur-md shadow-[0_8px_30px_-20px_rgba(62,38,20,0.4)]"
          : "border-b border-transparent bg-creme/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />

        {/* Nav desktop */}
        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors ${
                isActive(l.href)
                  ? "bg-brun/8 text-brun"
                  : "text-brun/70 hover:bg-brun/5 hover:text-brun"
              }`}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Switch langue */}
          <div className="flex items-center rounded-full bg-ivoire p-0.5 text-[0.78rem] font-semibold">
            {(["fr", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors ${
                  lang === l
                    ? "bg-brun text-creme"
                    : "text-brun/60 hover:text-brun"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Panier */}
          <button
            type="button"
            onClick={openDrawer}
            aria-label={t("nav.cart")}
            className="relative grid h-10 w-10 place-items-center rounded-full bg-ivoire text-brun transition-colors hover:bg-brun hover:text-creme"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 8h12l-1 11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="M9 8a3 3 0 0 1 6 0"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-orange px-1 text-[0.7rem] font-bold text-white tabular-nums">
                {count}
              </span>
            )}
          </button>

          {/* Burger mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="grid h-10 w-10 place-items-center rounded-full bg-ivoire text-brun lg:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
                  menuOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-current transition-all duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
                  menuOpen ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        className={`overflow-hidden border-t border-brun/10 bg-creme/95 backdrop-blur-md transition-[max-height,opacity] duration-400 lg:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 py-4 sm:px-8">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                isActive(l.href)
                  ? "bg-brun/8 text-brun"
                  : "text-brun/75 hover:bg-brun/5"
              }`}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
