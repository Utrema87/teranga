import type { Metadata } from "next";
import B2BPage from "@/components/B2BPage";

export const metadata: Metadata = {
  title: "Professionnels — offre B2B",
  description:
    "Hôtels, restaurants, lounges et épiceries fines : tarifs dégressifs dès 10 unités, conditionnement sur mesure et devis sous 24 h. Le cajou de Casamance pour les professionnels.",
  alternates: { canonical: "/b2b" },
};

export default function B2bPage() {
  return <B2BPage />;
}
