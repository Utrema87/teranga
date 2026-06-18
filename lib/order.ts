// Stockage de la dernière commande (démo, localStorage) pour la page confirmation
export interface OrderLineSnapshot {
  name: string;
  format: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  number: string;
  date: string; // ISO
  lines: OrderLineSnapshot[];
  subtotal: number;
  shipping: number;
  total: number;
  zone: "dakar" | "regions";
  method: "wave" | "om" | "card";
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
}

const STORAGE_KEY = "tc-last-order";

export function generateOrderNumber(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `TC-2026-${n}`;
}

export function saveOrder(order: Order): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
}

export function getLastOrder(): Order | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}
