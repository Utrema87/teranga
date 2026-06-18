// Formatage des montants en FCFA (espaces fines, déterministe pour l'export statique)
export function formatFCFA(amount: number): string {
  const sign = amount < 0 ? "-" : "";
  const digits = Math.abs(Math.round(amount))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${sign}${digits} FCFA`;
}

// Frais de livraison
export const FREE_SHIPPING_THRESHOLD = 25000;
export const SHIPPING_DAKAR = 2000;
export const SHIPPING_REGIONS = 3500;

export type Zone = "dakar" | "regions";

export function shippingCost(subtotal: number, zone: Zone): number {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  if (subtotal === 0) return 0;
  return zone === "dakar" ? SHIPPING_DAKAR : SHIPPING_REGIONS;
}
