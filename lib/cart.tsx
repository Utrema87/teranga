"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, type Product, type ProductVariant } from "@/data/products";

export interface CartLine {
  productId: string;
  variantId: string | null;
  qty: number;
}

export interface ResolvedLine extends CartLine {
  product: Product;
  variant: ProductVariant | null;
  unitPrice: number;
  lineTotal: number;
  key: string;
}

interface CartContextValue {
  lines: CartLine[];
  resolved: ResolvedLine[];
  count: number;
  subtotal: number;
  add: (productId: string, variantId: string | null, qty?: number) => void;
  setQty: (productId: string, variantId: string | null, qty: number) => void;
  remove: (productId: string, variantId: string | null) => void;
  clear: () => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  justAdded: string | null;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "tc-cart-v1";

function lineKey(productId: string, variantId: string | null): string {
  return `${productId}::${variantId ?? "_"}`;
}

function resolveLine(line: CartLine): ResolvedLine | null {
  const product = PRODUCTS.find((p) => p.id === line.productId);
  if (!product) return null;
  const variant =
    line.variantId != null
      ? product.variants.find((v) => v.id === line.variantId) ?? null
      : null;
  const unitPrice = variant ? variant.price : product.price ?? 0;
  return {
    ...line,
    product,
    variant,
    unitPrice,
    lineTotal: unitPrice * line.qty,
    key: lineKey(line.productId, line.variantId),
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const hydrated = useRef(false);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydratation depuis localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setLines(parsed);
      }
    } catch {
      /* ignore */
    }
    hydrated.current = true;
  }, []);

  // Persistance
  useEffect(() => {
    if (!hydrated.current) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const add = useCallback(
    (productId: string, variantId: string | null, qty = 1) => {
      setLines((prev) => {
        const key = lineKey(productId, variantId);
        const existing = prev.find(
          (l) => lineKey(l.productId, l.variantId) === key,
        );
        if (existing) {
          return prev.map((l) =>
            lineKey(l.productId, l.variantId) === key
              ? { ...l, qty: l.qty + qty }
              : l,
          );
        }
        return [...prev, { productId, variantId, qty }];
      });
      setJustAdded(lineKey(productId, variantId));
      setDrawerOpen(true);
      if (addedTimer.current) clearTimeout(addedTimer.current);
      addedTimer.current = setTimeout(() => setJustAdded(null), 1600);
    },
    [],
  );

  const setQty = useCallback(
    (productId: string, variantId: string | null, qty: number) => {
      setLines((prev) =>
        prev
          .map((l) =>
            lineKey(l.productId, l.variantId) === lineKey(productId, variantId)
              ? { ...l, qty: Math.max(0, qty) }
              : l,
          )
          .filter((l) => l.qty > 0),
      );
    },
    [],
  );

  const remove = useCallback((productId: string, variantId: string | null) => {
    setLines((prev) =>
      prev.filter(
        (l) =>
          lineKey(l.productId, l.variantId) !== lineKey(productId, variantId),
      ),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const resolved = useMemo(
    () => lines.map(resolveLine).filter((l): l is ResolvedLine => l !== null),
    [lines],
  );

  const count = useMemo(
    () => resolved.reduce((n, l) => n + l.qty, 0),
    [resolved],
  );

  const subtotal = useMemo(
    () => resolved.reduce((s, l) => s + l.lineTotal, 0),
    [resolved],
  );

  const value: CartContextValue = {
    lines,
    resolved,
    count,
    subtotal,
    add,
    setQty,
    remove,
    clear,
    drawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    justAdded,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
