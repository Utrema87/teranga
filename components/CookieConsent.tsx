"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

const STORAGE_KEY = "tc-consent";
// Mesure d'audience respectueuse de la vie privée (sans cookie). À enregistrer
// sur plausible.io pour activer la collecte — le script reste inerte sinon.
const PLAUSIBLE_DOMAIN = "teranga-cajou.sn";

function loadAnalytics() {
  if (document.getElementById("tc-plausible")) return;
  const s = document.createElement("script");
  s.id = "tc-plausible";
  s.defer = true;
  s.setAttribute("data-domain", PLAUSIBLE_DOMAIN);
  s.src = "https://plausible.io/js/script.js";
  document.head.appendChild(s);
}

export default function CookieConsent() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = window.localStorage.getItem(STORAGE_KEY);
    if (choice === "accepted") {
      loadAnalytics();
    } else if (choice !== "declined") {
      setVisible(true);
    }
  }, []);

  const decide = (accepted: boolean) => {
    window.localStorage.setItem(STORAGE_KEY, accepted ? "accepted" : "declined");
    if (accepted) loadAnalytics();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookies"
      className="fixed bottom-4 left-4 right-4 z-[90] mx-auto max-w-md rounded-2xl border border-brun/10 bg-creme/95 p-5 shadow-[var(--shadow-terroir)] backdrop-blur-md sm:left-4 sm:right-auto"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-vert/12 text-vert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="9" cy="13" r="1" fill="currentColor" />
            <circle cx="14" cy="16" r="1" fill="currentColor" />
            <circle cx="15" cy="11" r="1" fill="currentColor" />
          </svg>
        </span>
        <p className="text-sm leading-relaxed text-brun/75">
          {t("cookies.text")}{" "}
          <a href="/faq" className="font-medium text-vert underline-offset-2 hover:underline">
            {t("cookies.learn")}
          </a>
        </p>
      </div>
      <div className="mt-4 flex gap-2.5">
        <button
          type="button"
          onClick={() => decide(true)}
          className="btn btn-primary flex-1 py-2.5 text-sm"
        >
          {t("cookies.accept")}
        </button>
        <button
          type="button"
          onClick={() => decide(false)}
          className="btn btn-ghost flex-1 py-2.5 text-sm"
        >
          {t("cookies.refuse")}
        </button>
      </div>
    </div>
  );
}
