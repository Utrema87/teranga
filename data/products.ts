// ------------------------------------------------------------------
//  Teranga Cajou — gamme retenue : 3 produits phares (100 % local)
// ------------------------------------------------------------------

export type GammeId = "snacks" | "vegan" | "boisson";

export type IllustrationKind = "snack" | "bottle" | "vegan";

export type BadgeKey =
  | "zero-dechet"
  | "casamance"
  | "artisanal"
  | "vegan"
  | "bio"
  | "naturel";

export interface Localized {
  fr: string;
  en: string;
}

export interface ProductVariant {
  id: string;
  label: Localized;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  gamme: GammeId;
  name: Localized;
  tagline: Localized;
  format: Localized;
  price: number | null;
  priceFrom: boolean;
  quoteOnly: boolean;
  illustration: IllustrationKind;
  image?: string; // photo packshot (cartes, fiche)
  heroImage?: string; // version détourée (hero)
  accent: string;
  badges: BadgeKey[];
  description: Localized;
  longDescription: Localized;
  features: Localized[];
  variants: ProductVariant[];
}

export interface GammeInfo {
  id: GammeId;
  slug: string;
  name: Localized;
  short: Localized;
  description: Localized;
  illustration: IllustrationKind;
  image?: string;
  accent: string;
  priceFrom: number | null;
}

// ------------------------------------------------------------------
//  Gammes (1 produit phare par gamme)
// ------------------------------------------------------------------
export const GAMMES: GammeInfo[] = [
  {
    id: "snacks",
    slug: "snacks",
    name: { fr: "Snacks Cajou", en: "Cashew Snacks" },
    short: { fr: "L'amande, caramélisée", en: "The kernel, caramelised" },
    description: {
      fr: "Nos anacardes enrobées d'un caramel au sucre de canne, certifiées bio.",
      en: "Our cashews coated in cane-sugar caramel, certified organic.",
    },
    illustration: "snack",
    image: "/produits/caramel.jpg",
    accent: "var(--color-orange)",
    priceFrom: 6500,
  },
  {
    id: "vegan",
    slug: "viande-vegan",
    name: { fr: "Viande Vegan", en: "Vegan Meat" },
    short: { fr: "La pomme, réinventée", en: "The apple, reinvented" },
    description: {
      fr: "Un émincé végétal charnu tiré de la pomme de cajou, riche en protéines.",
      en: "Meaty plant-based strips drawn from the cashew apple, rich in protein.",
    },
    illustration: "vegan",
    image: "/produits/vegan.jpg",
    accent: "var(--color-vert)",
    priceFrom: 5000,
  },
  {
    id: "boisson",
    slug: "boisson",
    name: { fr: "Jus de Cajou", en: "Cashew Juice" },
    short: { fr: "La pomme, désaltérante", en: "The apple, refreshing" },
    description: {
      fr: "Le jus 100 % naturel de la pomme de cajou, frais et fruité, en canette.",
      en: "The 100% natural juice of the cashew apple, fresh and fruity, in a can.",
    },
    illustration: "bottle",
    image: "/produits/jus.jpg",
    accent: "var(--color-or)",
    priceFrom: 1500,
  },
];

export function getGamme(id: GammeId): GammeInfo {
  return GAMMES.find((g) => g.id === id)!;
}

// ------------------------------------------------------------------
//  Produits
// ------------------------------------------------------------------
export const PRODUCTS: Product[] = [
  {
    id: "anacardes-caramel",
    slug: "anacardes-caramelisees",
    gamme: "snacks",
    name: { fr: "Anacardes Caramélisées", en: "Caramelised Cashews" },
    tagline: {
      fr: "Caramel au sucre de canne",
      en: "Cane-sugar caramel",
    },
    format: { fr: "Étui 500 g", en: "500 g box" },
    price: 6500,
    priceFrom: false,
    quoteOnly: false,
    illustration: "snack",
    image: "/produits/caramel.jpg",
    heroImage: "/hero-caramel.png",
    accent: "var(--color-orange)",
    badges: ["bio", "casamance", "vegan"],
    description: {
      fr: "Des anacardes entières enrobées d'un caramel doré au sucre de canne, croustillant et à peine salé.",
      en: "Whole cashews glazed in a golden cane-sugar caramel — crisp and barely salted.",
    },
    longDescription: {
      fr: "Notre best-seller gourmand, certifié agriculture biologique. Le sucre de canne, réduit en caramel jusqu'à la cassure, enrobe chaque amande d'une coque brillante. Une pincée de sel pour trancher le sucre, et c'est tout : ni huile de palme, ni conservateur. Le compagnon idéal d'un café, d'un thé à la menthe ou d'un moment de partage.",
      en: "Our gourmet best-seller, certified organic. Cane sugar, reduced to a hard caramel, wraps each kernel in a glossy shell. A pinch of salt cuts the sweetness — no palm oil, no preservatives.",
    },
    features: [
      { fr: "Certifié bio (AB)", en: "Certified organic" },
      { fr: "Caramel au sucre de canne", en: "Cane-sugar caramel" },
      { fr: "Sans conservateur", en: "No preservatives" },
    ],
    variants: [],
  },
  {
    id: "viande-vegan",
    slug: "viande-vegan-de-cajou",
    gamme: "vegan",
    name: { fr: "Viande Vegan de Cajou", en: "Cashew Vegan Meat" },
    tagline: { fr: "Émincé végétal — nature", en: "Plant-based strips — plain" },
    format: { fr: "Étui 500 g", en: "500 g box" },
    price: 5000,
    priceFrom: false,
    quoteOnly: false,
    illustration: "vegan",
    image: "/produits/vegan.jpg",
    heroImage: "/hero-vegan.png",
    accent: "var(--color-vert)",
    badges: ["vegan", "casamance", "artisanal"],
    description: {
      fr: "Un émincé végétal fibreux et charnu, façonné à partir de la pulpe de pomme de cajou. Riche en protéines.",
      en: "Fibrous, meaty plant-based strips shaped from cashew-apple pulp. High in protein.",
    },
    longDescription: {
      fr: "La chair de la pomme de cajou, riche en fibres, est effilochée puis pressée pour obtenir une texture proche du poulet effiloché. Nature, elle se prête à toutes les cuisines : à poêler, à mijoter, à griller, à mariner. Une protéine 100 % végétale née d'un fruit qu'on jetait hier, sans soja et sans conservateur.",
      en: "The fibre-rich flesh of the cashew apple is pulled and pressed into a texture close to shredded chicken. Plain, it suits any kitchen — soy-free and preservative-free.",
    },
    features: [
      { fr: "Riche en protéines", en: "High in protein" },
      { fr: "100 % végétal", en: "100% plant-based" },
      { fr: "Sans conservateur", en: "No preservatives" },
    ],
    variants: [],
  },
  {
    id: "jus-cajou",
    slug: "jus-de-cajou",
    gamme: "boisson",
    name: { fr: "Jus de Cajou", en: "Cashew Juice" },
    tagline: { fr: "100 % naturel", en: "100% natural" },
    format: { fr: "Canette 300 ml", en: "300 ml can" },
    price: 1500,
    priceFrom: false,
    quoteOnly: false,
    illustration: "bottle",
    image: "/produits/jus.jpg",
    heroImage: "/hero-jus.png",
    accent: "var(--color-or)",
    badges: ["naturel", "casamance", "vegan"],
    description: {
      fr: "Le jus 100 % naturel de la pomme de cajou — fruité, légèrement acidulé, à boire bien frais.",
      en: "The 100% natural juice of the cashew apple — fruity, lightly tart, best served cold.",
    },
    longDescription: {
      fr: "« De la terre au clic, la nature connectée. » La pomme de cajou, longtemps gaspillée, est pressée à froid pour livrer un jus vif et désaltérant. Sans arôme artificiel ni sucre ajouté : juste le fruit, en canette de 300 ml. Une autre façon de valoriser tout le cajou de Casamance.",
      en: "The cashew apple, long discarded, is cold-pressed into a bright, thirst-quenching juice. No artificial flavour, no added sugar — just the fruit, in a 300 ml can.",
    },
    features: [
      { fr: "100 % naturel", en: "100% natural" },
      { fr: "Sans sucre ajouté", en: "No added sugar" },
      { fr: "Pomme de cajou pressée", en: "Pressed cashew apple" },
    ],
    variants: [],
  },
];

// ------------------------------------------------------------------
//  Helpers
// ------------------------------------------------------------------
export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsByGamme(gamme: GammeId): Product[] {
  return PRODUCTS.filter((p) => p.gamme === gamme);
}

export function relatedProducts(product: Product, count = 2): Product[] {
  return PRODUCTS.filter((p) => p.id !== product.id).slice(0, count);
}

export function startingPrice(product: Product): number | null {
  if (product.quoteOnly || product.price === null) return null;
  if (product.variants.length > 0) {
    return Math.min(...product.variants.map((v) => v.price));
  }
  return product.price;
}
