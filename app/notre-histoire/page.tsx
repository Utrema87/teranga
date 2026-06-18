import type { Metadata } from "next";
import StoryPage from "@/components/StoryPage";

export const metadata: Metadata = {
  title: "Notre histoire — inverser la logique du cajou",
  description:
    "La majorité du cajou africain est exporté brut. Teranga Cajou transforme sur place, en Casamance : mission, vision, valeurs et l'équipe derrière chaque produit.",
  alternates: { canonical: "/notre-histoire" },
};

export default function NotreHistoirePage() {
  return <StoryPage />;
}
