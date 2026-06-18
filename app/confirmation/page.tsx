import type { Metadata } from "next";
import Confirmation from "@/components/Confirmation";

export const metadata: Metadata = {
  title: "Commande confirmée",
  description: "Merci pour votre commande Teranga Cajou.",
  robots: { index: false, follow: false },
};

export default function ConfirmationPage() {
  return <Confirmation />;
}
