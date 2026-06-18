import type { Metadata } from "next";
import { Suspense } from "react";
import Catalogue from "@/components/Catalogue";

export const metadata: Metadata = {
  title: "Boutique — tous nos produits",
  description:
    "Snacks, vinaigre, viande vegan, charbon écologique et amandes premium : tout le cajou de Casamance transformé, réparti en cinq gammes zéro déchet.",
  alternates: { canonical: "/produits" },
};

export default function ProduitsPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-creme" />}>
      <Catalogue />
    </Suspense>
  );
}
