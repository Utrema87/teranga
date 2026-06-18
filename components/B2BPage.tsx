"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/lib/useReveal";
import SectionHead from "@/components/SectionHead";
import { GAMMES } from "@/data/products";
import { Blob } from "@/components/art";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function B2BPage() {
  const { t, tr } = useLang();
  const pointsRef = useReveal<HTMLDivElement>({ stagger: 0.08 });
  const useCasesRef = useReveal<HTMLDivElement>({ stagger: 0.08 });

  const [form, setForm] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    sector: "",
    volume: "",
    message: "",
  });
  const [interest, setInterest] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);
  const [mailto, setMailto] = useState("");

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleInterest = (id: string) =>
    setInterest((arr) => (arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]));

  const points = [
    { title: t("b2b.point1Title"), text: t("b2b.point1Text") },
    { title: t("b2b.point2Title"), text: t("b2b.point2Text") },
    { title: t("b2b.point3Title"), text: t("b2b.point3Text") },
    { title: t("b2b.point4Title"), text: t("b2b.point4Text") },
  ];

  const useCases = [
    { title: t("b2b.use1"), text: t("b2b.use1Text") },
    { title: t("b2b.use2"), text: t("b2b.use2Text") },
    { title: t("b2b.use3"), text: t("b2b.use3Text") },
    { title: t("b2b.use4"), text: t("b2b.use4Text") },
  ];

  const sectors = [
    t("b2b.sectorHotel"),
    t("b2b.sectorResto"),
    t("b2b.sectorBar"),
    t("b2b.sectorShop"),
    t("b2b.sectorOther"),
  ];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, boolean> = {};
    if (!form.company.trim()) er.company = true;
    if (!form.name.trim()) er.name = true;
    if (!EMAIL_RE.test(form.email)) er.email = true;
    if (!form.message.trim()) er.message = true;
    setErrors(er);
    if (Object.keys(er).length > 0) return;

    const gammeNames = interest
      .map((id) => GAMMES.find((g) => g.id === id))
      .filter(Boolean)
      .map((g) => tr(g!.name))
      .join(", ");

    const body =
      `Établissement : ${form.company}\n` +
      `Contact : ${form.name}\n` +
      `E-mail : ${form.email}\n` +
      `Téléphone : ${form.phone}\n` +
      `Secteur : ${form.sector || "—"}\n` +
      `Gammes : ${gammeNames || "—"}\n` +
      `Volume : ${form.volume || "—"}\n\n` +
      `${form.message}`;

    setMailto(
      `mailto:contact@teranga-cajou.sn?subject=${encodeURIComponent(
        `Demande de devis B2B — ${form.company}`,
      )}&body=${encodeURIComponent(body)}`,
    );
    setSent(true);
  };

  return (
    <div className="bg-creme">
      {/* Hero */}
      <section className="grain relative overflow-hidden bg-brun-fonce py-16 text-creme sm:py-20">
        <Blob className="pointer-events-none absolute -right-20 -top-16 h-80 w-80 opacity-20" fill="var(--color-orange)" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="badge mb-5 bg-orange/20 text-orange-vif">{t("b2b.kicker")}</span>
            <h1 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.04] text-creme text-balance">
              {t("b2b.title")}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-creme/75 text-pretty">
              {t("b2b.lead")}
            </p>
          </div>
        </div>
      </section>

      {/* Points */}
      <section className="py-16 sm:py-20">
        <div ref={pointsRef} className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {points.map((p, i) => (
              <div key={p.title} className="reveal card-terroir p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange/12 font-display text-lg font-bold text-orange">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brun/65 text-pretty">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cas d'usage */}
      <section className="bg-ivoire py-16 sm:py-20">
        <div ref={useCasesRef} className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead kicker={t("b2b.useKicker")} title={t("b2b.useTitle")} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((u) => (
              <div key={u.title} className="reveal flex flex-col gap-2 rounded-2xl border border-brun/8 bg-white p-6">
                <h3 className="font-display text-lg font-semibold text-orange">{u.title}</h3>
                <p className="text-sm leading-relaxed text-brun/65 text-pretty">{u.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire devis */}
      <section className="py-16 sm:py-24" id="devis">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <SectionHead kicker={t("b2b.formKicker")} title={t("b2b.formTitle")} lead={t("b2b.formLead")} align="center" />

          <div className="mt-10 rounded-[1.8rem] border border-brun/8 bg-white p-6 shadow-[var(--shadow-soft)] sm:p-9">
            {sent ? (
              <div className="flex flex-col items-center gap-5 py-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-vert text-white">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold">{t("b2b.okTitle")}</h3>
                  <p className="mx-auto mt-2 max-w-md text-brun/65 text-pretty">{t("b2b.okText")}</p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  <a href={mailto} className="btn btn-primary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
                      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    </svg>
                    contact@teranga-cajou.sn
                  </a>
                  <button type="button" onClick={() => setSent(false)} className="btn btn-ghost">
                    {t("b2b.okAgain")}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t("b2b.company")} error={errors.company} msg={t("common.required")}>
                    <input className={inputCls(errors.company)} value={form.company} onChange={(e) => set("company", e.target.value)} />
                  </Field>
                  <Field label={t("b2b.contactName")} error={errors.name} msg={t("common.required")}>
                    <input className={inputCls(errors.name)} value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
                  </Field>
                  <Field label={t("b2b.email")} error={errors.email} msg={t("common.required")}>
                    <input type="email" className={inputCls(errors.email)} value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
                  </Field>
                  <Field label={t("b2b.phone")}>
                    <input type="tel" className={inputCls(false)} value={form.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" placeholder="+221 …" />
                  </Field>
                  <Field label={t("b2b.sector")}>
                    <select className={inputCls(false)} value={form.sector} onChange={(e) => set("sector", e.target.value)}>
                      <option value="">—</option>
                      {sectors.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label={t("b2b.volume")}>
                    <input className={inputCls(false)} value={form.volume} onChange={(e) => set("volume", e.target.value)} placeholder="ex. 50 unités / mois" />
                  </Field>
                </div>

                <div>
                  <span className="mb-2 block text-sm font-medium text-brun/70">{t("b2b.interest")}</span>
                  <div className="flex flex-wrap gap-2">
                    {GAMMES.map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => toggleInterest(g.id)}
                        className={`rounded-full px-3.5 py-2 text-sm font-medium transition-all ${
                          interest.includes(g.id)
                            ? "bg-vert text-white"
                            : "bg-ivoire text-brun/65 hover:bg-brun/8"
                        }`}
                      >
                        {tr(g.name)}
                      </button>
                    ))}
                  </div>
                </div>

                <Field label={t("b2b.message")} error={errors.message} msg={t("common.required")}>
                  <textarea rows={4} className={`${inputCls(errors.message)} resize-none`} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder={t("b2b.messagePlaceholder")} />
                </Field>

                <button type="submit" className="btn btn-primary w-full">
                  {t("b2b.submit")}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function inputCls(error?: boolean) {
  return `w-full rounded-xl border bg-creme px-4 py-3 text-brun outline-none transition-colors placeholder:text-brun/35 focus:ring-2 focus:ring-orange/20 ${
    error ? "border-rouge-pomme focus:border-rouge-pomme" : "border-brun/15 focus:border-orange"
  }`;
}

function Field({
  label,
  error,
  msg,
  children,
}: {
  label: string;
  error?: boolean;
  msg?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-brun/70">{label}</span>
      {children}
      {error && msg && <span className="mt-1 block text-xs text-rouge-pomme">{msg}</span>}
    </label>
  );
}
