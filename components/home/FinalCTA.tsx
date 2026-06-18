"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/lib/useReveal";
import { Blob } from "@/components/art";

export default function FinalCTA() {
  const { t } = useLang();
  const ref = useReveal<HTMLDivElement>({ stagger: 0.1 });
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };

  return (
    <section className="bg-creme py-20 sm:py-24">
      <div ref={ref} className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.2rem] border border-brun/8 bg-ivoire px-7 py-14 text-center sm:px-12 sm:py-16">
          <Blob className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 opacity-10" fill="var(--color-vert)" />
          <Blob className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 opacity-10" fill="var(--color-orange)" />

          <div className="relative">
            <span className="reveal badge mx-auto bg-vert/12 text-vert">
              {t("home.newsletterKicker")}
            </span>
            <h2 className="reveal mx-auto mt-5 max-w-2xl font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight text-balance">
              {t("home.newsletterTitle")}
            </h2>
            <p className="reveal mx-auto mt-4 max-w-md text-lg text-brun/65 text-pretty">
              {t("home.newsletterLead")}
            </p>

            {done ? (
              <div className="reveal mx-auto mt-8 inline-flex items-center gap-2.5 rounded-full bg-vert/12 px-6 py-3.5 font-medium text-vert">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-vert text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {t("home.newsletterOk")}
              </div>
            ) : (
              <form
                onSubmit={submit}
                className="reveal mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("home.newsletterPlaceholder")}
                  className="flex-1 rounded-full border border-brun/15 bg-creme px-5 py-3.5 text-brun outline-none transition-colors placeholder:text-brun/40 focus:border-orange focus:ring-2 focus:ring-orange/20"
                />
                <button type="submit" className="btn btn-primary shrink-0">
                  {t("home.newsletterCta")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
