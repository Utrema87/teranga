"use client";

import { useLang } from "@/lib/i18n";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/WhatsAppOrderButton";

export default function WhatsAppFloat() {
  const { t, lang } = useLang();
  const greeting =
    lang === "fr" ? "Bonjour Teranga Cajou 👋" : "Hello Teranga Cajou 👋";

  return (
    <a
      href={waLink(greeting)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("common.whatsappContact")}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-0 overflow-hidden rounded-full text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)] transition-all duration-300 hover:gap-2"
      style={{ backgroundColor: "#25D366" }}
    >
      <span className="relative grid h-14 w-14 shrink-0 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[12rem] group-hover:pr-5">
        {t("common.whatsappContact")}
      </span>
    </a>
  );
}
