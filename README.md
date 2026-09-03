# Nomiya

Site et app de commande du restaurant Nomiya (211 bis avenue Charles de Gaulle,
Neuilly-sur-Seine), implémentés d'après les maquettes Claude Design conservées
dans [`design/`](design/).

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4.

## Démarrer

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script              | Rôle                                              |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Serveur de développement                          |
| `npm run build`     | Build de production                               |
| `npm start`         | Sert le build                                     |
| `npm run lint`      | ESLint (`next/core-web-vitals` + `next/typescript`)|
| `npm run typecheck` | `tsc --noEmit`                                    |
| `npm run smoke`     | Parcours navigateur de bout en bout (voir plus bas)|

## Les trois écrans

| Route          | Écran            | Rendu                                    |
| -------------- | ---------------- | ---------------------------------------- |
| `/`            | Landing page     | Statique                                 |
| `/commande`    | App de commande  | Statique, tout l'état vit côté client     |
| `/reservation` | Réservation      | À la demande — les créneaux partent d'aujourd'hui |

**Landing** — héros plein écran, bandeau de services, la maison, trois
signatures, midi/soir, galerie, avis, bloc horaires & accès, pied de page.

**Commande** — choix du mode (livraison / à emporter / sur place via QR de
table), carte de 162 plats en 15 catégories avec recherche, scroll infini et
catégorie active synchronisée au défilement, fiche plat à options obligatoires
et payantes, panier, paliers (livraison offerte dès 30 €, −5 € dès 40 €), code
promo `NOMIYA10`, récapitulatif, paiement, suivi de commande.
Deux mises en page : liste + sidebar sur mobile, grille + panier permanent
au-delà de 900 px.

**Réservation** — couverts, jour, service midi/soir avec créneaux complets et
fermetures, zone de salle, coordonnées, récapitulatif collant sur ordinateur et
barre de confirmation sur mobile, écran de confirmation avec référence.

## Organisation

```
src/
  app/                     Routes et styles globaux
    globals.css            Tokens du design system (@theme Tailwind)
  components/
    Photo.tsx              Emplacement photo, avec repli sur l'aplat des maquettes
    landing/               Sections de la landing
    commande/              App de commande (contexte + vues)
    reservation/           Formulaire de réservation
  hooks/
    useIsDesktop.ts        Point de rupture 900 px
    useMenuScroll.ts       Scroll infini + catégorie active synchronisée
  lib/
    menu-data.ts           Carte : 162 plats, 15 catégories, 15 groupes d'options
    order.ts               Paliers, remises, frais, options, totaux
    reservation.ts         Jours, créneaux, complets, validation
    themes.ts              Trois thèmes de l'app de commande
    photos.ts              Toutes les photos du site, en un seul endroit
    commande-config.ts     Variantes d'UX retenues
    reservation-config.ts  Réglages de salle
```

Les règles métier (prix, paliers, disponibilités) sont dans `src/lib/`, séparées
des composants : ce sont elles qui bougeront en premier quand le back-office du
restaurateur arrivera.

## Photographie

⚠️ **À vérifier avant mise en ligne.** Les maquettes utilisaient des aplats
hachurés légendés. Ils sont remplacés par des photos libres de droits servies
par le CDN Unsplash, déclarées **uniquement** dans
[`src/lib/photos.ts`](src/lib/photos.ts). Ces URL n'ont pas pu être vérifiées
depuis l'environnement de développement, dont la politique réseau bloque tous
les hébergeurs d'images : **ouvrez les trois pages et confirmez que chaque photo
s'affiche**.

Le composant `<Photo />` retombe sur l'aplat hachuré de la maquette, légende
comprise, dès qu'une image manque — une URL morte dégrade la page, elle ne la
casse pas.

Pour passer aux vraies photos du restaurant : déposez les fichiers dans
`public/photos/` et remplacez les `src` de `photos.ts` par `/photos/mon-fichier.jpg`.
Rien d'autre à toucher. Les 162 plats partagent une photo par famille ; pour une
photo par plat, ajoutez un champ à `menu-data.ts` et lisez-le dans `dishPhoto()`.

## Variantes d'UX

Le prototype exposait ses variantes dans les « Tweaks » de Claude Design. Ce sont
des réglages produit, pas des options client : ils sont figés dans
`src/lib/commande-config.ts` et `src/lib/reservation-config.ts`, aux valeurs
retenues à la fin des allers-retours de design.

| Réglage         | Valeur retenue        | Autres valeurs                    |
| --------------- | --------------------- | --------------------------------- |
| `theme`         | Encre & vermillon     | Nuit indigo · Papier & sumi       |
| `navigation`    | Sidebar catégories    | Onglets horizontaux               |
| `navigationPc`  | Sidebar + panier      | Catégories en haut                |
| `ficheplat`     | Bottom sheet          | Page pleine                       |
| `upsells`       | Équilibré             | Discret · Maximal                 |

La variante `vue` (forcer un cadre téléphone de 390 px) n'a pas été reprise :
c'était un outil de comparaison propre au canevas de design. Les deux mises en
page suivent la largeur réelle de la fenêtre.

## Vérification

```bash
npm run build && npm start          # dans un terminal
npm run smoke                       # dans un autre
```

`e2e/smoke.mjs` pilote un vrai navigateur (Playwright) sur les trois écrans :
fiche plat et prix des options, ajout au panier, paliers, scroll infini,
recherche, code promo, suivi de commande, mode sur place, et validation du
formulaire de réservation. Les captures atterrissent dans `e2e/screenshots/`.

## Maquettes d'origine

`design/` conserve le lot exporté depuis Claude Design : le README du transfert,
la conversation de conception (`design/chats/`) et les prototypes HTML
(`design/project/`), dont le design system dont sortent les tokens de
`globals.css`.
