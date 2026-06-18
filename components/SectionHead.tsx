import type { ReactNode } from "react";

export default function SectionHead({
  kicker,
  title,
  lead,
  align = "left",
  dark = false,
  className = "",
}: {
  kicker?: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  const center = align === "center";
  return (
    <div
      className={`reveal ${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}
    >
      {kicker && (
        <span
          className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] ${
            dark ? "text-orange-vif" : "text-vert"
          }`}
        >
          <span
            className={`h-px w-7 ${dark ? "bg-orange-vif/60" : "bg-vert/50"}`}
          />
          {kicker}
        </span>
      )}
      <h2
        className={`mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] text-balance ${
          dark ? "text-creme" : "text-brun"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-4 text-lg leading-relaxed text-pretty ${
            dark ? "text-creme/70" : "text-brun/65"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
