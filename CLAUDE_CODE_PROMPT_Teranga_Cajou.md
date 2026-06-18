# PROMPT CLAUDE CODE — Site Teranga Cajou (front-end only, 100 % fonctionnel)

> Copier-coller l'intégralité de ce fichier dans Claude Code, ou le placer à la racine du projet sous le nom `CLAUDE.md` et lancer : *"Lis CLAUDE.md et construis le site complet."*

---

## 1. Mission

Construire le site vitrine + e-commerce **Teranga Cajou** (teranga-cajou.sn), **entièrement front-end** : aucun backend, aucune API externe. Tout doit fonctionner en local et en déploiement statique (Vercel) :

- Catalogue produits depuis un fichier de données local (`data/products.ts`)
- Panier persistant en `localStorage`
- Checkout **simulé** (Wave / Orange Money / Carte bancaire → écran de confirmation avec numéro de commande généré)
- Formulaires contact & devis B2B → validation front + écran de succès (mailto en fallback)
- Site bilingue FR/EN (FR par défaut, switch dans le header)

## 2. Stack imposée

- **Next.js 16** (App Router, `output: 'export'` — site statique)
- **React 19** + **TypeScript 5**
- **Tailwind CSS 4**
- **GSAP 3** + ScrollTrigger pour les animations
- Images : placeholders SVG/CSS stylisés en attendant les photos produits (pas d'images externes)
- Déployable sur Vercel sans variable d'environnement

## 3. Identité visuelle (issue du logo officiel)

Le logo : « Teranga » en script chocolat/bois 3D, « CAJOU » en lettres orange, tagline « de la terre au clic » en vert, pomme de cajou orange + noix + feuilles vertes, fond crème, bouchon doré.

### Palette (CSS variables obligatoires)

```css
--brun: #5C3A21;        /* chocolat/bois — titres, texte fort */
--brun-fonce: #3E2614;  /* fond sections sombres, footer */
--orange: #E8821E;      /* CAJOU — CTA, prix, accents */
--orange-vif: #F09A3E;  /* hovers, dégradés */
--vert: #3E8E2E;        /* tagline, badges "100% local", éco */
--vert-feuille: #6BBF45;/* accents secondaires */
--creme: #FAF6EF;       /* fond principal */
--ivoire: #F3ECDD;      /* cartes, sections alternées */
--or: #C9A227;          /* détails premium (bordures fines, étoiles) */
--rouge-pomme: #D9541E; /* rare, pour promos */
```

### Typographie

- **Display** : `Fraunces` (Google Fonts, weights 400–900, avec italique soft) — évoque le côté script/terroir du logo sans le singer
- **Body** : `Outfit` (300–700)
- **Mono/prix** : `JetBrains Mono` pour les montants FCFA
- Interdits : Inter, Roboto, Arial, Space Grotesk

### Direction artistique

Premium-terroir éditorial : généreuse respiration, grandes typos serif, textures grain léger sur fonds crème, formes organiques (blobs feuille en SVG décoratif), photos remplacées par des compositions SVG illustratives (noix, pomme de cajou, feuilles). **Anti-template, anti-IA générique** : asymétrie, chevauchements, sections qui alternent crème/brun foncé. Mode clair uniquement.

## 4. Architecture des pages

```
/                  → Accueil
/produits          → Catalogue (filtres par gamme)
/produits/[slug]   → Fiche produit
/notre-histoire    → À propos (Casamance, zéro déchet, équipe)
/b2b               → Offre professionnelle + formulaire devis
/contact           → Contact
/panier            → Panier
/commande          → Checkout simulé (3 étapes)
/confirmation      → Confirmation de commande
```

### Accueil (sections dans l'ordre)

1. **Hero** : grand titre « De la Terre au Clic », sous-titre sur la valorisation du cajou de Casamance, double CTA (« Découvrir la boutique » / « Offre B2B »), composition SVG animée (pomme de cajou + feuilles, parallax GSAP léger)
2. **Bandeau stats** animé au scroll : `55 %` du cajou mondial vient d'Afrique · `5` gammes zéro déchet · `24 h` délai de réponse · `100 %` Casamance
3. **Gammes produits** : 5 cartes (Snacks, Vinaigre, Viande Vegan, Charbon Écologique, Amandes Premium) avec prix de départ, hover élégant, lien vers le catalogue filtré
4. **Démarche zéro déchet** : schéma horizontal Noix → Pomme → Coque avec ce que chacune devient (amandes/snacks, vinaigre/vegan, charbon) — animation au scroll
5. **Casamance / origine** : section sombre (brun foncé) éditoriale, ancrage Ziguinchor · Sédhiou · Kolda, circuits courts, planteurs partenaires
6. **B2B teaser** : hôtels, restaurants, lounges — commande min. 10 unités, réponse sous 24 h
7. **Témoignages** (3 fictifs réalistes : restaurant Dakar, épicerie fine, hôtel Ziguinchor)
8. **CTA final + newsletter** (simulée, succès en front)

### Catalogue & fiches produit

Données dans `data/products.ts` — générer 12–15 produits répartis dans les 5 gammes. Base du cahier des charges :

| Gamme | Variantes à créer | Prix départ |
|---|---|---|
| Snacks Cajou | salées, épicées, caramélisées, chocolatées (sachets 100 g / 250 g) | 2 500 FCFA |
| Vinaigre de Cajou | nature 25 cl, infusé herbes 25 cl | 3 500 FCFA |
| Viande Vegan | nature, marinée yassa | 4 000 FCFA |
| Charbon Écologique | sac 1 kg, sac 5 kg, spécial chicha | 1 800 FCFA |
| Amandes Premium | W240, W320 (export — « sur devis », bouton devis au lieu d'ajout panier) |  — |

Fiche produit : galerie (placeholders), description, badges (« Zéro déchet », « 100 % Casamance », « Artisanal »), sélecteur quantité, ajout panier avec micro-animation, suggestion « Vous aimerez aussi ».

### Panier & checkout simulé

- Drawer panier accessible depuis le header (badge compteur)
- `localStorage` : persistance, quantités modifiables, sous-total + livraison (2 000 FCFA Dakar / 3 500 FCFA régions, gratuite dès 25 000 FCFA)
- Checkout 3 étapes : Coordonnées → Livraison → Paiement
- Paiement : 3 options visuelles **Wave / Orange Money / Carte** — sélection puis bouton « Payer » → spinner 2 s → page confirmation avec n° de commande type `TC-2026-XXXX`, récap, et mention claire « Démo — paiement simulé »

## 5. Composants & comportements

- Header sticky : logo texte stylisé (Fraunces brun + « CAJOU » orange), nav, switch FR/EN, icône panier
- Footer brun foncé : contact (contact@teranga-cajou.sn, Casamance — Ziguinchor/Sédhiou/Kolda), liens, réseaux (Instagram/Facebook/TikTok), mention « Livraison partout au Sénégal »
- Animations GSAP : reveals au scroll (stagger), compteurs stats, parallax hero — **désactivées si `prefers-reduced-motion`**
- i18n : dictionnaire `lib/i18n.ts` (FR/EN), pas de lib externe, langue mémorisée en localStorage
- SEO : metadata par page, OpenGraph, JSON-LD `Organization` + `Product`
- Responsive mobile-first irréprochable ; Lighthouse > 90 partout

## 6. Contenu rédactionnel

Rédiger tous les textes en français soigné, ton premium-chaleureux (la « Teranga »), sans phrases creuses marketing. S'appuyer sur : mission (transformer le cajou de Casamance en produits premium, zéro déchet, circuits courts), vision (marque de référence du cajou sénégalais transformé), valeurs (Excellence, Durabilité, Proximité, Innovation, Teranga). Page histoire : mentionner que la majorité du cajou africain est exporté brut et que Teranga Cajou inverse cette logique.

## 7. Ordre de travail demandé à Claude Code

1. Init projet Next.js 16 + Tailwind 4 + GSAP, structure de dossiers, design tokens
2. `data/products.ts` + `lib/i18n.ts` + store panier (context + localStorage)
3. Layout (header/footer) + Accueil complète
4. Catalogue + fiches produit
5. Panier + checkout + confirmation
6. Notre histoire, B2B, Contact
7. Passe finale : animations, SEO, responsive, `next build` (export statique) sans erreur

À chaque étape, vérifier que `npm run build` passe avant de continuer.
