"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/lib/useReveal";
import SectionHead from "@/components/SectionHead";
import { CashewAppleArt, Leaf, Blob } from "@/components/art";

export default function StoryPage() {
  const { t } = useLang();
  const valuesRef = useReveal<HTMLDivElement>({ stagger: 0.08 });
  const teamRef = useReveal<HTMLDivElement>({ stagger: 0.08 });

  const values = [
    { title: t("story.value1"), text: t("story.value1Text") },
    { title: t("story.value2"), text: t("story.value2Text") },
    { title: t("story.value3"), text: t("story.value3Text") },
    { title: t("story.value4"), text: t("story.value4Text") },
    { title: t("story.value5"), text: t("story.value5Text") },
  ];

  const team = [
    { name: "Mamadou Sané", role: t("story.member1Role") },
    { name: "Fatou Diallo", role: t("story.member2Role") },
    { name: "Aïssatou Badji", role: t("story.member3Role") },
    { name: "Ousmane Coly", role: t("story.member4Role") },
  ];

  return (
    <div className="bg-creme">
      {/* Hero */}
      <section className="grain relative overflow-hidden bg-terroir">
        <Blob className="pointer-events-none absolute -right-24 -top-24 h-[30rem] w-[30rem] opacity-[0.07]" fill="var(--color-orange)" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-xl">
            <span className="badge mb-5 bg-vert/12 text-vert">
              <span className="h-1.5 w-1.5 rounded-full bg-vert" />
              {t("story.kicker")}
            </span>
            <h1 className="font-display text-[clamp(2.3rem,5.5vw,4rem)] font-semibold leading-[1.02] text-balance">
              {t("story.title")}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-brun/75 text-pretty">
              {t("story.lead")}
            </p>
          </div>
          <div className="relative flex justify-center">
            <CashewAppleArt className="w-[min(70vw,22rem)] drop-shadow-[0_24px_40px_rgba(94,46,12,0.22)]" />
          </div>
        </div>
        <svg className="block w-full text-creme" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 60h1440V20c-200 30-460 36-740 14C420 18 180 12 0 36z" fill="currentColor" />
        </svg>
      </section>

      {/* Mission / Vision */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-5 lg:grid-cols-2">
            {[
              { k: "story.missionKicker", title: "story.missionTitle", text: "story.missionText", accent: "var(--color-orange)" },
              { k: "story.visionKicker", title: "story.visionTitle", text: "story.visionText", accent: "var(--color-vert)" },
            ].map((b) => (
              <div key={b.k} className="card-terroir relative overflow-hidden p-8 sm:p-10">
                <span className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-15 blur-2xl" style={{ background: b.accent }} />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: b.accent }}>
                  {t(b.k)}
                </span>
                <h2 className="mt-3 font-display text-2xl font-semibold leading-tight">
                  {t(b.title)}
                </h2>
                <p className="mt-4 leading-relaxed text-brun/70 text-pretty">{t(b.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zéro déchet statement */}
      <section className="relative overflow-hidden bg-brun-fonce py-20 text-creme sm:py-24">
        <div className="grain" />
        <Leaf className="pointer-events-none absolute -left-8 bottom-0 h-48 w-48 opacity-[0.08]" fill="var(--color-vert-feuille)" />
        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight text-creme text-balance">
            {t("story.zeroTitle")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-creme/75 text-pretty">
            {t("story.zeroText")}
          </p>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 sm:py-24">
        <div ref={valuesRef} className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead kicker={t("story.valuesKicker")} title={t("story.valuesTitle")} align="center" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`reveal card-terroir flex flex-col p-7 ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <span className="font-display text-4xl font-bold text-orange/25">0{i + 1}</span>
                <h3 className="mt-3 font-display text-xl font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brun/65 text-pretty">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="bg-ivoire py-16 sm:py-24">
        <div ref={teamRef} className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead kicker={t("story.teamKicker")} title={t("story.teamTitle")} lead={t("story.teamLead")} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <div key={m.name} className="reveal card-terroir flex flex-col items-center p-7 text-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-orange to-rouge-pomme font-display text-2xl font-semibold text-white">
                  {m.name.split(" ").map((p) => p.charAt(0)).join("")}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{m.name}</h3>
                <p className="mt-1 text-sm text-brun/55">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-tight text-balance">
            {t("story.ctaTitle")}
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/produits" className="btn btn-primary">{t("story.ctaShop")}</Link>
            <Link href="/contact" className="btn btn-ghost">{t("story.ctaContact")}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
