import type { Metadata } from "next";
import CartPage from "@/components/CartPage";

export const metadata: Metadata = {
  title: "Panier",
  description: "Votre panier Teranga Cajou.",
  robots: { index: false, follow: true },
};

export default function PanierPage() {
  return <CartPage />;
}
