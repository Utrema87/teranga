import Link from "next/link";

export default function Logo({
  className = "",
  withTagline = false,
  onLight = true,
}: {
  className?: string;
  withTagline?: boolean;
  onLight?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Teranga Cajou — accueil"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt=""
        width={842}
        height={738}
        className="h-10 w-auto shrink-0 transition-transform duration-500 group-hover:-rotate-3 sm:h-11"
      />
      <span className="flex flex-col leading-none">
        <span className="flex items-baseline gap-[0.1em]">
          <span
            className="font-display text-[1.4rem] font-semibold italic tracking-tight"
            style={{ color: onLight ? "var(--color-brun)" : "var(--color-creme)" }}
          >
            Teranga
          </span>
          <span
            className="font-display text-[1.1rem] font-bold not-italic uppercase tracking-[0.06em]"
            style={{ color: "var(--color-orange)" }}
          >
            Cajou
          </span>
        </span>
        {withTagline && (
          <span
            className="mt-0.5 font-body text-[0.6rem] font-medium uppercase tracking-[0.26em]"
            style={{ color: "var(--color-vert)" }}
          >
            de la terre au clic
          </span>
        )}
      </span>
    </Link>
  );
}
