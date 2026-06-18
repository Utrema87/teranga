import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CookieConsent from "@/components/CookieConsent";
import AnnouncementBar from "@/components/AnnouncementBar";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE = "https://teranga-cajou.sn";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Teranga Cajou — De la terre au clic",
    template: "%s · Teranga Cajou",
  },
  description:
    "Teranga Cajou transforme le cajou de Casamance en produits premium : anacardes caramélisées bio, viande vegan et jus 100 % naturel. Zéro déchet, circuits courts, livraison partout au Sénégal.",
  keywords: [
    "cajou",
    "Casamance",
    "Sénégal",
    "anacarde",
    "zéro déchet",
    "anacardes caramélisées",
    "viande vegan cajou",
    "jus de cajou",
    "bio",
  ],
  authors: [{ name: "Teranga Cajou" }],
  openGraph: {
    type: "website",
    locale: "fr_SN",
    url: SITE,
    siteName: "Teranga Cajou",
    title: "Teranga Cajou — De la terre au clic",
    description:
      "Le cajou de Casamance transformé en produits premium, zéro déchet : anacardes caramélisées bio, viande vegan et jus 100 % naturel.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teranga Cajou — De la terre au clic",
    description:
      "Le cajou de Casamance transformé en produits premium, zéro déchet.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FAF6EF",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Teranga Cajou",
  url: SITE,
  email: "contact@teranga-cajou.sn",
  slogan: "De la terre au clic",
  description:
    "Transformation premium du cajou de Casamance, zéro déchet et circuits courts.",
  areaServed: "SN",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Casamance",
    addressCountry: "SN",
  },
  sameAs: [
    "https://instagram.com/terangacajou",
    "https://facebook.com/terangacajou",
    "https://tiktok.com/@terangacajou",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${fraunces.variable} ${outfit.variable} ${jetbrains.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Providers>
          <AnnouncementBar />
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppFloat />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
