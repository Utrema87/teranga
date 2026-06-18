import type { Localized } from "@/data/products";

export interface FaqItem {
  q: Localized;
  a: Localized;
}

export interface FaqCategory {
  labelKey: string; // clé i18n faq.cat*
  items: FaqItem[];
}

export const FAQ: FaqCategory[] = [
  {
    labelKey: "faq.catLivraison",
    items: [
      {
        q: { fr: "Livrez-vous partout au Sénégal ?", en: "Do you deliver across Senegal?" },
        a: {
          fr: "Oui, partout au Sénégal. La livraison est de 2 000 FCFA à Dakar, 3 500 FCFA en régions, et offerte dès 25 000 FCFA d'achat.",
          en: "Yes, anywhere in Senegal. Delivery is 2,000 FCFA in Dakar, 3,500 FCFA in the regions, and free from 25,000 FCFA.",
        },
      },
      {
        q: { fr: "Quels sont les délais de livraison ?", en: "What are the delivery times?" },
        a: {
          fr: "Comptez 24 à 48 h à Dakar et 2 à 4 jours en régions, selon la zone.",
          en: "Allow 24–48 h in Dakar and 2–4 days in the regions, depending on the area.",
        },
      },
      {
        q: { fr: "Puis-je commander sur WhatsApp ?", en: "Can I order on WhatsApp?" },
        a: {
          fr: "Oui : depuis le panier, le bouton « Commander sur WhatsApp » ouvre une conversation avec votre commande pré-remplie. Nous confirmons tout par message.",
          en: "Yes: from the cart, the “Order on WhatsApp” button opens a chat with your order pre-filled. We confirm everything by message.",
        },
      },
    ],
  },
  {
    labelKey: "faq.catConservation",
    items: [
      {
        q: { fr: "Comment conserver les anacardes caramélisées ?", en: "How do I store the caramelised cashews?" },
        a: {
          fr: "À l'abri de la chaleur et de l'humidité, sachet bien refermé. Elles se conservent plusieurs semaines en gardant leur croquant.",
          en: "Away from heat and humidity, bag well sealed. They keep for several weeks and stay crunchy.",
        },
      },
      {
        q: { fr: "Et la viande vegan de cajou ?", en: "And the cashew vegan meat?" },
        a: {
          fr: "Conservez l'étui au sec. Une fois réhydratée et cuisinée, gardez-la au frais et consommez sous 48 h.",
          en: "Keep the box dry. Once rehydrated and cooked, refrigerate and eat within 48 h.",
        },
      },
      {
        q: { fr: "Comment servir le jus de cajou ?", en: "How should I serve the cashew juice?" },
        a: {
          fr: "Bien frais, c'est meilleur. Après ouverture, conservez la canette au réfrigérateur et consommez sous 24 h.",
          en: "Chilled is best. Once opened, keep the can refrigerated and drink within 24 h.",
        },
      },
    ],
  },
  {
    labelKey: "faq.catBio",
    items: [
      {
        q: { fr: "Vos produits sont-ils bio ?", en: "Are your products organic?" },
        a: {
          fr: "Les anacardes caramélisées sont certifiées agriculture biologique (AB). Tous nos produits sont sans conservateur et transformés en Casamance.",
          en: "The caramelised cashews are certified organic (AB). All our products are preservative-free and processed in Casamance.",
        },
      },
      {
        q: { fr: "D'où vient le cajou ?", en: "Where does the cashew come from?" },
        a: {
          fr: "De Casamance — Ziguinchor, Sédhiou et Kolda — en circuits courts, avec des planteurs partenaires.",
          en: "From Casamance — Ziguinchor, Sédhiou and Kolda — in short supply chains, with partner growers.",
        },
      },
      {
        q: { fr: "Y a-t-il des additifs ?", en: "Are there any additives?" },
        a: {
          fr: "Aucun colorant ni arôme artificiel. Du sucre de canne pour le caramel, et rien d'ajouté au jus : juste le fruit.",
          en: "No colourings or artificial flavours. Cane sugar for the caramel, and nothing added to the juice — just the fruit.",
        },
      },
    ],
  },
  {
    labelKey: "faq.catPaiement",
    items: [
      {
        q: { fr: "Quels moyens de paiement acceptez-vous ?", en: "What payment methods do you accept?" },
        a: {
          fr: "Wave, Orange Money et carte bancaire — ou paiement à la livraison selon la zone, à confirmer avec nous sur WhatsApp.",
          en: "Wave, Orange Money and bank card — or cash on delivery depending on the area, to confirm with us on WhatsApp.",
        },
      },
      {
        q: { fr: "Le paiement en ligne est-il réel ?", en: "Is the online payment real?" },
        a: {
          fr: "Ce site est une démonstration : le paiement à l'écran est simulé. Les commandes se finalisent via WhatsApp ou avec notre équipe.",
          en: "This site is a demo: the on-screen payment is simulated. Orders are finalised via WhatsApp or with our team.",
        },
      },
      {
        q: { fr: "Y a-t-il une commande minimum ?", en: "Is there a minimum order?" },
        a: {
          fr: "Aucune pour les particuliers. Pour les professionnels, la commande minimum est de 10 unités (voir la page Professionnels).",
          en: "None for individuals. For businesses, the minimum order is 10 units (see the Business page).",
        },
      },
    ],
  },
];
