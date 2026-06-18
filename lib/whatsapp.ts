// Configuration WhatsApp (aucun backend) — à remplacer par le vrai numéro pro.
// Format international, chiffres uniquement (indicatif Sénégal 221).
export const WHATSAPP_NUMBER = "221770000000";

// Construit un lien wa.me avec message pré-rempli
export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
