"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import SectionHead from "@/components/SectionHead";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com/terangacajou", d: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM17.5 6.5h.01M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" },
  { name: "Facebook", href: "https://facebook.com/terangacajou", d: "M14 9h3V5h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1z" },
  { name: "TikTok", href: "https://tiktok.com/@terangacajou", d: "M15 4c.5 2.3 2 3.8 4 4v3c-1.6 0-3-.5-4-1.3V15a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1v3.1a2.5 2.5 0 1 0 1.6 2.3V4H15z" },
];

export default function ContactPage() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);
  const [mailto, setMailto] = useState("");

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, boolean> = {};
    if (!form.name.trim()) er.name = true;
    if (!EMAIL_RE.test(form.email)) er.email = true;
    if (!form.message.trim()) er.message = true;
    setErrors(er);
    if (Object.keys(er).length > 0) return;

    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    setMailto(
      `mailto:contact@teranga-cajou.sn?subject=${encodeURIComponent(
        form.subject || `Message de ${form.name}`,
      )}&body=${encodeURIComponent(body)}`,
    );
    setSent(true);
  };

  const infos = [
    { label: t("contact.emailLabel"), value: "contact@teranga-cajou.sn", href: "mailto:contact@teranga-cajou.sn" },
    { label: t("contact.zoneLabel"), value: t("contact.zoneValue") },
    { label: t("contact.deliveryLabel"), value: t("contact.deliveryValue") },
    { label: t("contact.hoursLabel"), value: t("contact.hoursValue") },
  ];

  return (
    <div className="bg-creme">
      <div className="grain relative overflow-hidden bg-ivoire/70">
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-8 sm:pt-20">
          <SectionHead kicker={t("contact.kicker")} title={t("contact.title")} lead={t("contact.lead")} />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Coordonnées */}
          <div>
            <h2 className="font-display text-2xl font-semibold">{t("contact.infoTitle")}</h2>
            <div className="mt-6 space-y-4">
              {infos.map((info) => (
                <div key={info.label} className="rounded-2xl border border-brun/8 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vert">{info.label}</p>
                  {info.href ? (
                    <a href={info.href} className="mt-1 block font-medium text-brun hover:text-orange">{info.value}</a>
                  ) : (
                    <p className="mt-1 font-medium text-brun">{info.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold text-brun/70">{t("contact.followLabel")}</p>
              <div className="flex gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="grid h-11 w-11 place-items-center rounded-full bg-brun text-creme transition-colors hover:bg-orange"
                  >
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d={s.d} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="rounded-[1.8rem] border border-brun/8 bg-white p-6 shadow-[var(--shadow-soft)] sm:p-9">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center gap-5 py-10 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-vert text-white">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold">{t("contact.okTitle")}</h3>
                  <p className="mx-auto mt-2 max-w-sm text-brun/65 text-pretty">{t("contact.okText")}</p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  <a href={mailto} className="btn btn-primary">contact@teranga-cajou.sn</a>
                  <button type="button" onClick={() => setSent(false)} className="btn btn-ghost">{t("contact.okAgain")}</button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t("contact.name")} error={errors.name} msg={t("common.required")}>
                    <input className={inputCls(errors.name)} value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
                  </Field>
                  <Field label={t("contact.email")} error={errors.email} msg={t("common.required")}>
                    <input type="email" className={inputCls(errors.email)} value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
                  </Field>
                </div>
                <Field label={t("contact.subject")}>
                  <input className={inputCls(false)} value={form.subject} onChange={(e) => set("subject", e.target.value)} />
                </Field>
                <Field label={t("contact.message")} error={errors.message} msg={t("common.required")}>
                  <textarea rows={5} className={`${inputCls(errors.message)} resize-none`} value={form.message} onChange={(e) => set("message", e.target.value)} />
                </Field>
                <button type="submit" className="btn btn-primary w-full">{t("contact.submit")}</button>
              </form>
            )}
          </div>
        </div>
      </div>
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
