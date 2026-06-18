"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { formatFCFA, shippingCost, type Zone } from "@/lib/format";
import {
  generateOrderNumber,
  saveOrder,
  type Order,
} from "@/lib/order";
import { ProductThumb } from "@/components/art";

type Method = "wave" | "om" | "card";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Checkout() {
  const { resolved, subtotal, clear } = useCart();
  const { t, tr } = useLang();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zone: "dakar" as Zone,
    note: "",
  });
  const [method, setMethod] = useState<Method>("wave");

  const shipping = shippingCost(subtotal, form.zone);
  const total = subtotal + shipping;

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  if (resolved.length === 0 && !processing) {
    return (
      <div className="bg-creme">
        <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-6 px-5 text-center">
          <h1 className="font-display text-3xl font-semibold">
            {t("checkout.emptyRedirect")}
          </h1>
          <Link href="/produits" className="btn btn-primary">
            {t("cart.emptyCta")}
          </Link>
        </div>
      </div>
    );
  }

  const validateStep = (s: number): boolean => {
    const e: Record<string, boolean> = {};
    if (s === 0) {
      if (!form.firstName.trim()) e.firstName = true;
      if (!form.lastName.trim()) e.lastName = true;
      if (!EMAIL_RE.test(form.email)) e.email = true;
      if (form.phone.trim().length < 6) e.phone = true;
    }
    if (s === 1) {
      if (!form.address.trim()) e.address = true;
      if (!form.city.trim()) e.city = true;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(2, s + 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const pay = () => {
    setProcessing(true);
    setTimeout(() => {
      const order: Order = {
        number: generateOrderNumber(),
        date: new Date().toISOString(),
        lines: resolved.map((l) => ({
          name: tr(l.product.name),
          format: l.variant ? tr(l.variant.label) : tr(l.product.format),
          qty: l.qty,
          unitPrice: l.unitPrice,
          lineTotal: l.lineTotal,
        })),
        subtotal,
        shipping,
        total,
        zone: form.zone,
        method,
        customer: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
        },
      };
      saveOrder(order);
      clear();
      router.push("/confirmation");
    }, 2000);
  };

  const steps = [t("checkout.step1"), t("checkout.step2"), t("checkout.step3")];

  return (
    <div className="bg-creme">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold">
          {t("checkout.title")}
        </h1>

        {/* Stepper */}
        <div className="mt-8 flex items-center gap-2 sm:gap-4">
          {steps.map((label, i) => (
            <div key={i} className="flex flex-1 items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2.5">
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold transition-colors ${
                    i < step
                      ? "bg-vert text-white"
                      : i === step
                        ? "bg-brun text-creme"
                        : "bg-ivoire text-brun/40"
                  }`}
                >
                  {i < step ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                <span
                  className={`hidden text-sm font-medium sm:block ${
                    i <= step ? "text-brun" : "text-brun/40"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <span
                  className={`h-px flex-1 ${i < step ? "bg-vert" : "bg-brun/15"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Formulaire */}
          <div className="rounded-2xl border border-brun/8 bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
            {/* Étape 1 */}
            {step === 0 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t("checkout.firstName")} error={errors.firstName} errorMsg={t("common.required")}>
                  <input className={inputCls(errors.firstName)} value={form.firstName} onChange={(e) => set("firstName", e.target.value)} autoComplete="given-name" />
                </Field>
                <Field label={t("checkout.lastName")} error={errors.lastName} errorMsg={t("common.required")}>
                  <input className={inputCls(errors.lastName)} value={form.lastName} onChange={(e) => set("lastName", e.target.value)} autoComplete="family-name" />
                </Field>
                <Field label={t("checkout.email")} error={errors.email} errorMsg={t("common.required")}>
                  <input type="email" className={inputCls(errors.email)} value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
                </Field>
                <Field label={t("checkout.phone")} error={errors.phone} errorMsg={t("common.required")}>
                  <input type="tel" className={inputCls(errors.phone)} value={form.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" placeholder="+221 …" />
                </Field>
              </div>
            )}

            {/* Étape 2 */}
            {step === 1 && (
              <div className="grid gap-5">
                <Field label={t("checkout.address")} error={errors.address} errorMsg={t("common.required")}>
                  <input className={inputCls(errors.address)} value={form.address} onChange={(e) => set("address", e.target.value)} autoComplete="street-address" />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t("checkout.city")} error={errors.city} errorMsg={t("common.required")}>
                    <input className={inputCls(errors.city)} value={form.city} onChange={(e) => set("city", e.target.value)} autoComplete="address-level2" />
                  </Field>
                  <Field label={t("checkout.zone")}>
                    <div className="flex rounded-xl bg-ivoire p-1 text-sm font-medium">
                      {(["dakar", "regions"] as const).map((z) => (
                        <button
                          key={z}
                          type="button"
                          onClick={() => set("zone", z)}
                          className={`flex-1 rounded-lg px-3 py-2 transition-colors ${
                            form.zone === z ? "bg-brun text-creme" : "text-brun/60"
                          }`}
                        >
                          {t(z === "dakar" ? "checkout.zoneDakar" : "checkout.zoneRegions")}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
                <Field label={`${t("checkout.note")} (${t("common.optional")})`}>
                  <textarea rows={3} className={`${inputCls(false)} resize-none`} value={form.note} onChange={(e) => set("note", e.target.value)} placeholder={t("checkout.notePlaceholder")} />
                </Field>
              </div>
            )}

            {/* Étape 3 */}
            {step === 2 && (
              <div>
                <p className="mb-4 text-sm font-semibold text-brun/70">
                  {t("checkout.payMethod")}
                </p>
                <div className="grid gap-3">
                  {METHODS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMethod(m.id)}
                      className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                        method === m.id
                          ? "border-orange bg-orange/6 ring-1 ring-orange/30"
                          : "border-brun/12 hover:border-brun/30"
                      }`}
                    >
                      <span
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-xl font-display text-base font-bold text-white"
                        style={{ background: m.color }}
                      >
                        {m.mark}
                      </span>
                      <span className="flex-1">
                        <span className="block font-semibold text-brun">
                          {t(`checkout.${m.id}`)}
                        </span>
                        <span className="block text-sm text-brun/55">
                          {t(`checkout.${m.id}Desc`)}
                        </span>
                      </span>
                      <span
                        className={`grid h-6 w-6 place-items-center rounded-full border-2 transition-colors ${
                          method === m.id ? "border-orange bg-orange" : "border-brun/25"
                        }`}
                      >
                        {method === m.id && (
                          <span className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="mt-5 flex items-center gap-2 rounded-xl bg-or/8 px-4 py-3 text-sm text-brun/70">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-or">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
                    <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  {t("checkout.demoNote")}
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between gap-3">
              {step > 0 ? (
                <button type="button" onClick={back} className="btn btn-ghost" disabled={processing}>
                  {t("checkout.back")}
                </button>
              ) : (
                <Link href="/panier" className="btn btn-ghost">
                  {t("cart.title")}
                </Link>
              )}

              {step < 2 ? (
                <button type="button" onClick={next} className="btn btn-primary">
                  {t("checkout.next")}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ) : (
                <button type="button" onClick={pay} className="btn btn-primary min-w-[12rem]" disabled={processing}>
                  {processing ? (
                    <>
                      <Spinner />
                      {t("checkout.processing")}
                    </>
                  ) : (
                    <>
                      {t("checkout.pay")} · {formatFCFA(total)}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Récap */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-brun/8 bg-ivoire/60 p-6">
              <h2 className="font-display text-xl font-semibold">{t("checkout.recap")}</h2>
              <div className="mt-5 space-y-3">
                {resolved.map((l) => (
                  <div key={l.key} className="flex items-center gap-3">
                    <ProductThumb
                      image={l.product.image}
                      kind={l.product.illustration}
                      accent={l.product.accent}
                      alt={tr(l.product.name)}
                      className="h-14 w-14"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-brun">{tr(l.product.name)}</p>
                      <p className="text-xs text-brun/50">× {l.qty}</p>
                    </div>
                    <span className="prix text-sm font-semibold">{formatFCFA(l.lineTotal)}</span>
                  </div>
                ))}
              </div>
              <dl className="mt-5 space-y-2.5 border-t border-brun/10 pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-brun/65">{t("cart.subtotal")}</dt>
                  <dd className="prix font-semibold">{formatFCFA(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-brun/65">{t("cart.shipping")}</dt>
                  <dd className="prix font-semibold">
                    {shipping === 0 ? <span className="text-vert">{t("common.free")}</span> : formatFCFA(shipping)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-brun/10 pt-4">
                  <dt className="font-display text-lg font-semibold">{t("cart.total")}</dt>
                  <dd className="prix font-display text-2xl font-bold text-orange">{formatFCFA(total)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const METHODS: { id: Method; mark: string; color: string }[] = [
  { id: "wave", mark: "W", color: "#1DC6F2" },
  { id: "om", mark: "OM", color: "#FF7900" },
  { id: "card", mark: "CB", color: "var(--color-brun)" },
];

function inputCls(error?: boolean) {
  return `w-full rounded-xl border bg-creme px-4 py-3 text-brun outline-none transition-colors placeholder:text-brun/35 focus:ring-2 focus:ring-orange/20 ${
    error ? "border-rouge-pomme focus:border-rouge-pomme" : "border-brun/15 focus:border-orange"
  }`;
}

function Field({
  label,
  error,
  errorMsg,
  children,
}: {
  label: string;
  error?: boolean;
  errorMsg?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-brun/70">{label}</span>
      {children}
      {error && errorMsg && (
        <span className="mt-1 block text-xs text-rouge-pomme">{errorMsg}</span>
      )}
    </label>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
