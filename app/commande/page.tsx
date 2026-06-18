import type { Metadata } from "next";
import Checkout from "@/components/Checkout";

export const metadata: Metadata = {
  title: "Commande",
  description: "Finalisez votre commande Teranga Cajou.",
  robots: { index: false, follow: false },
};

export default function CommandePage() {
  return <Checkout />;
}
