import type { IllustrationKind } from "@/data/products";

// ------------------------------------------------------------------
//  Compositions SVG illustratives (remplacent les photos produit)
//  Aucune image externe — tout est vectoriel et stylisé.
// ------------------------------------------------------------------

export function CashewNut({
  className = "",
  fill = "var(--color-or)",
}: {
  className?: string;
  fill?: string;
}) {
  // La forme caractéristique en C / haricot de l'amande de cajou
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M71 18c-15-9-37-4-46 12-7 12-6 28 4 38 9 9 23 12 33 6 5-3 6-9 2-13-3-3-8-3-13-1-6 2-12 0-15-5-4-7-2-16 5-21 6-4 14-5 21-2 5 2 10 0 12-5 2-4 0-9-3-9z"
        fill={fill}
      />
    </svg>
  );
}

export function Leaf({
  className = "",
  fill = "var(--color-vert)",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M50 6C26 18 12 40 14 70c0 0 0 12 8 18 0-26 10-48 38-66 0 0-4-10-10-16z"
        fill={fill}
      />
      <path
        d="M22 86C30 60 40 42 58 30"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Blob({
  className = "",
  fill = "var(--color-orange-vif)",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <path
        fill={fill}
        d="M44.7 -57.6C57.1 -47.6 65.4 -32.8 68.6 -17.1C71.8 -1.4 69.9 15.3 62.3 28.8C54.7 42.4 41.4 52.8 26.5 59.2C11.6 65.6 -4.9 68 -20.6 64C-36.3 60 -51.2 49.6 -60.4 35.4C-69.6 21.2 -73.1 3.2 -69.4 -12.9C-65.7 -29 -54.8 -43.2 -41.3 -53C-27.8 -62.8 -13.9 -68.2 1.6 -70.1C17.1 -72 34.2 -70.5 44.7 -57.6Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

// Pomme de cajou + noix + feuilles — pour le hero
export function CashewAppleArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 360"
      className={className}
      role="img"
      aria-label="Pomme de cajou, noix et feuilles"
    >
      <defs>
        <linearGradient id="apple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F09A3E" />
          <stop offset="55%" stopColor="#E8821E" />
          <stop offset="100%" stopColor="#D9541E" />
        </linearGradient>
        <linearGradient id="nut" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D8B24A" />
          <stop offset="100%" stopColor="#A87E1E" />
        </linearGradient>
        <radialGradient id="appleShine" cx="0.35" cy="0.3" r="0.6">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* feuilles */}
      <g className="tc-leaf-1">
        <path
          d="M150 70C120 60 92 70 78 96c-4 8-5 17-2 26 24-6 44-20 62-44 0 0-4-6-12-8z"
          fill="#6BBF45"
        />
        <path
          d="M150 70c-30-2-58 10-72 36"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <g className="tc-leaf-2">
        <path
          d="M168 66c28-12 58-4 74 20 5 8 7 17 5 26-25-3-47-15-67-37 0 0 3-6 14-9z"
          fill="#3E8E2E"
        />
        <path
          d="M168 66c30-6 58 6 76 32"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* pomme de cajou */}
      <path
        d="M160 110c-44 0-74 30-74 78 0 52 36 92 74 92s74-40 74-92c0-48-30-78-74-78z"
        fill="url(#apple)"
      />
      <path
        d="M160 110c-44 0-74 30-74 78 0 52 36 92 74 92s74-40 74-92c0-48-30-78-74-78z"
        fill="url(#appleShine)"
      />
      {/* texture pomme */}
      <g stroke="rgba(94,46,12,0.18)" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M132 170c8 30 8 64 0 96" />
        <path d="M160 160c6 36 6 74 0 110" />
        <path d="M188 170c-8 30-8 64 0 96" />
      </g>
      {/* attache haut */}
      <path d="M160 112c4-12 4-22 0-34" stroke="#5C3A21" strokeWidth="6" fill="none" strokeLinecap="round" />

      {/* noix de cajou suspendue sous la pomme */}
      <g className="tc-nut">
        <path
          d="M160 278c-24 0-40 14-40 38 0 22 16 38 40 38 10 0 16-6 16-14 0-6-5-10-11-9-7 1-13-3-13-12 0-10 8-16 18-16 9 0 15-5 15-12 0-8-12-13-25-13z"
          fill="url(#nut)"
        />
        <path
          d="M150 300c-6 8-6 24 0 34"
          stroke="rgba(94,46,12,0.25)"
          strokeWidth="2.5"
          fill="none"
        />
      </g>
    </svg>
  );
}

// Petites compositions par gamme pour les cartes et fiches
export function ProductArt({
  kind,
  accent = "var(--color-orange)",
  className = "",
}: {
  kind: IllustrationKind;
  accent?: string;
  className?: string;
}) {
  const common = { className, role: "img" as const };

  switch (kind) {
    case "snack":
      return (
        <svg viewBox="0 0 200 200" {...common} aria-label="Sachet de snacks de cajou">
          {/* sachet */}
          <rect x="58" y="42" width="84" height="120" rx="12" fill={accent} />
          <rect x="58" y="42" width="84" height="34" rx="12" fill="rgba(255,255,255,0.18)" />
          <path d="M58 42h84l-10-16H68z" fill="var(--color-brun)" />
          <rect x="74" y="92" width="52" height="8" rx="4" fill="rgba(255,255,255,0.5)" />
          <rect x="74" y="108" width="36" height="6" rx="3" fill="rgba(255,255,255,0.35)" />
          {/* amandes qui s'échappent */}
          <CashewNutGroup />
        </svg>
      );
    case "bottle":
      return (
        <svg viewBox="0 0 200 200" {...common} aria-label="Bouteille de vinaigre de cajou">
          <rect x="86" y="20" width="28" height="22" rx="3" fill="var(--color-brun)" />
          <path
            d="M84 42h32v22l10 18v74a10 10 0 0 1-10 10H84a10 10 0 0 1-10-10V82l10-18V42z"
            fill={accent}
            opacity="0.92"
          />
          <rect x="80" y="108" width="40" height="46" rx="6" fill="rgba(255,255,255,0.85)" />
          <rect x="88" y="118" width="24" height="5" rx="2.5" fill={accent} />
          <rect x="88" y="128" width="18" height="4" rx="2" fill="var(--color-brun)" opacity="0.5" />
          <circle cx="100" cy="74" r="6" fill="rgba(255,255,255,0.4)" />
        </svg>
      );
    case "vegan":
      return (
        <svg viewBox="0 0 200 200" {...common} aria-label="Barquette de viande végétale">
          <ellipse cx="100" cy="150" rx="64" ry="16" fill="var(--color-brun)" opacity="0.12" />
          <path d="M44 120h112l-10 36a8 8 0 0 1-8 6H62a8 8 0 0 1-8-6z" fill="#fff" stroke="rgba(92,58,33,0.12)" />
          {/* effiloché */}
          <g stroke={accent} strokeWidth="7" strokeLinecap="round">
            <path d="M62 116c10-16 26-22 40-18" fill="none" />
            <path d="M78 110c12-14 30-16 44-8" fill="none" />
            <path d="M96 112c10-12 28-14 40-4" fill="none" />
            <path d="M70 122c14-8 32-8 46 2" fill="none" />
          </g>
          <g transform="translate(132 70) scale(0.42)">
            <path
              d="M50 6C26 18 12 40 14 70c0 0 0 12 8 18 0-26 10-48 38-66 0 0-4-10-10-16z"
              fill="var(--color-vert-feuille)"
            />
          </g>
        </svg>
      );
  }
}

// Affiche la vraie photo produit si disponible, sinon l'illustration SVG.
//  - cover : la photo remplit le conteneur (parent en position relative)
//  - sinon : rendu « vignette » inline à la taille passée par className
export function ProductVisual({
  image,
  kind,
  accent = "var(--color-orange)",
  alt = "",
  cover = false,
  className = "",
}: {
  image?: string;
  kind: IllustrationKind;
  accent?: string;
  alt?: string;
  cover?: boolean;
  className?: string;
}) {
  if (cover) {
    if (image) {
      return (
        <div className="absolute inset-0 grid place-items-center bg-white p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
      );
    }
    return (
      <div className="absolute inset-0 grid place-items-center p-6">
        <ProductArt
          kind={kind}
          accent={accent}
          className="h-full w-full transition-transform duration-700 group-hover:scale-[1.06] group-hover:-rotate-2"
        />
      </div>
    );
  }

  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`object-cover ${className}`}
      />
    );
  }
  return <ProductArt kind={kind} accent={accent} className={className} />;
}

// Vignette carrée auto-suffisante (panier, récap commande) : photo ou SVG.
export function ProductThumb({
  image,
  kind,
  accent = "var(--color-orange)",
  alt = "",
  className = "",
}: {
  image?: string;
  kind: IllustrationKind;
  accent?: string;
  alt?: string;
  className?: string;
}) {
  return (
    <span
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-xl ${image ? "bg-white" : "bg-ivoire"} ${className}`}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-contain p-1"
        />
      ) : (
        <ProductArt kind={kind} accent={accent} className="h-3/4 w-3/4" />
      )}
    </span>
  );
}

function CashewNutGroup() {
  return (
    <g>
      <g transform="translate(120 150) rotate(20) scale(0.4)">
        <CashewNut fill="var(--color-or)" />
      </g>
      <g transform="translate(40 156) rotate(-25) scale(0.34)">
        <CashewNut fill="var(--color-orange-vif)" />
      </g>
      <g transform="translate(86 168) rotate(10) scale(0.3)">
        <CashewNut fill="var(--color-or)" />
      </g>
    </g>
  );
}
