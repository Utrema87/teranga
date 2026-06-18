import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Une question, une commande, un partenariat ? Écrivez à Teranga Cajou : contact@teranga-cajou.sn, Casamance. Réponse sous 24 h, livraison partout au Sénégal.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return <ContactPage />;
}
