# Teranga Cajou

Site vitrine et catalogue e-commerce de **Teranga Cajou**, construit avec [Next.js](https://nextjs.org/) (App Router), TypeScript et Tailwind CSS. Le site est exporté en statique (`output: "export"`).

## Stack technique

- **Next.js 16** (App Router, export statique)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **GSAP** (animations)

## Prérequis

- [Node.js](https://nodejs.org/) **18.18 ou supérieur** (Node 20+ recommandé)
- **npm** (livré avec Node.js)

Vérifier les versions installées :

```bash
node -v
npm -v
```

## Installation

1. Cloner le dépôt :

   ```bash
   git clone https://github.com/Utrema87/teranga.git
   cd teranga
   ```

2. Installer les dépendances :

   ```bash
   npm install
   ```

## Lancer le projet en développement

```bash
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000). Les modifications sont rechargées automatiquement.

## Scripts disponibles

| Commande        | Description                                                      |
| --------------- | ---------------------------------------------------------------- |
| `npm run dev`   | Démarre le serveur de développement (http://localhost:3000)      |
| `npm run build` | Génère la version de production statique dans le dossier `out/`  |
| `npm run start` | Sert la version de production                                    |
| `npm run lint`  | Analyse le code avec ESLint                                      |

## Build de production

```bash
npm run build
```

Le site statique est généré dans le dossier `out/`, prêt à être déployé sur n'importe quel hébergement statique (Vercel, Netlify, GitHub Pages, etc.).

## Structure du projet

```
teranga/
├── app/            # Pages et routes (Next.js App Router)
├── components/     # Composants React réutilisables
│   └── home/       # Composants spécifiques à la page d'accueil
├── data/           # Données du catalogue (produits, FAQ…)
├── lib/            # Utilitaires (panier, i18n, formatage, WhatsApp…)
├── public/         # Fichiers statiques (images, icônes…)
├── next.config.ts  # Configuration Next.js (export statique)
└── package.json
```

## Déploiement

Le projet étant exporté en statique, il suffit de publier le contenu du dossier `out/` après un `npm run build`. Sur Vercel, le déploiement est automatique à chaque push sur la branche `main`.
