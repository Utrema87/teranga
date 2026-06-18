import type { Metadata } from "next";
import FaqPage from "@/components/FaqPage";
import { FAQ } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ — livraison, conservation, bio, paiement",
  description:
    "Toutes les réponses avant de commander Teranga Cajou : livraison partout au Sénégal, conservation des produits, certification bio et moyens de paiement.",
  alternates: { canonical: "/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.flatMap((cat) =>
    cat.items.map((item) => ({
      "@type": "Question",
      name: item.q.fr,
      acceptedAnswer: { "@type": "Answer", text: item.a.fr },
    })),
  ),
};

export default function Faq() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqPage />
    </>
  );
}
