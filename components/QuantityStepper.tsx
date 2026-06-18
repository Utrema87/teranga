"use client";

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const txt = size === "sm" ? "text-sm w-8" : "text-base w-10";

  const btn =
    "grid place-items-center rounded-full text-brun transition-colors hover:bg-brun hover:text-creme disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brun";

  return (
    <div className="inline-flex items-center rounded-full bg-ivoire p-1">
      <button
        type="button"
        className={`${btn} ${dim}`}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Diminuer la quantité"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <span
        className={`prix grid place-items-center text-center font-semibold tabular-nums ${txt}`}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        className={`${btn} ${dim}`}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Augmenter la quantité"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
