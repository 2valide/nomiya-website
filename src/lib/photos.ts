/**
 * Photographie du site.
 *
 * Les maquettes Claude Design utilisaient des aplats hachurés légendés
 * (« photo pleine page · comptoir à sushi »). On garde exactement ces légendes
 * comme texte alternatif, et on branche par-dessus des photos libres de droits
 * servies par le CDN Unsplash.
 *
 * ── Pour passer aux vraies photos du restaurant ──────────────────────────────
 * Déposez les fichiers dans `public/photos/` et remplacez le `src` ci-dessous
 * par `/photos/mon-fichier.jpg`. Rien d'autre à toucher : chaque emplacement de
 * l'app lit ce fichier. Si une image ne charge pas, le composant <Photo /> se
 * rabat automatiquement sur l'aplat hachuré de la maquette, légende comprise —
 * la page reste donc lisible même avec une URL cassée.
 */

export type Photo = {
  /** URL de l'image. Vide = on affiche directement l'aplat de la maquette. */
  src: string;
  /** Texte alternatif, en français, décrivant réellement l'image. */
  alt: string;
  /** Légende de la maquette, réutilisée par l'aplat de repli. */
  caption: string;
};

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* ── Landing ──────────────────────────────────────────────────────────────── */

export const LANDING = {
  hero: {
    src: unsplash("1579871494447-9811cf80d66c", 2000),
    alt: "Comptoir à sushi éclairé en fin de journée",
    caption: "photo pleine page · comptoir à sushi, lumière du soir",
  },
  chef: {
    src: unsplash("1533777324565-a040eb52facd", 900),
    alt: "Le chef derrière le comptoir, en plein service",
    caption: "portrait · chef au comptoir",
  },
  decoupe: {
    src: unsplash("1611143669185-af224c5e3252", 900),
    alt: "Découpe d'un filet de saumon au couteau",
    caption: "détail · découpe du saumon",
  },
  signaturePlateau: {
    src: unsplash("1553621042-f6e147245754", 1200),
    alt: "Plateau de sushi assortis dressé au moment",
    caption: "photo plateau signature",
  },
  signatureTartare: {
    src: unsplash("1580822184713-fc5400e7fe10", 1200),
    alt: "Tartare de saumon à l'avocat et au sésame",
    caption: "photo tartare",
  },
  signatureYakitori: {
    src: unsplash("1552912470-ee1b8fb42ee6", 1200),
    alt: "Brochettes yakitori laquées sur le charbon",
    caption: "photo yakitori sur le grill",
  },
  dejeuner: {
    src: unsplash("1517248135467-4c7edcad34c4", 1200),
    alt: "Salle du restaurant pendant le service du midi",
    caption: "photo salle au déjeuner",
  },
  diner: {
    src: unsplash("1590846406792-0adc7f938f1d", 1200),
    alt: "Comptoir du restaurant en soirée",
    caption: "photo comptoir le soir",
  },
  gallery: [
    {
      src: unsplash("1414235077428-338989a2e8c0", 900),
      alt: "Vue d'ensemble de la salle",
      caption: "photo salle",
    },
    {
      src: unsplash("1552566626-52f8b828add9", 900),
      alt: "Places assises le long du comptoir",
      caption: "photo comptoir",
    },
    {
      src: unsplash("1559339352-11d035aa65de", 900),
      alt: "Quelques tables en terrasse sur l'avenue",
      caption: "photo terrasse",
    },
    {
      src: unsplash("1546069901-ba9599a7e63c", 900),
      alt: "Détail d'une table dressée",
      caption: "photo détail table",
    },
  ],
  plan: {
    src: "",
    alt: "Plan d'accès au restaurant",
    caption: "plan d'accès",
  },
} satisfies Record<string, Photo | Photo[]>;

/* ── Réservation ──────────────────────────────────────────────────────────── */

export const RESERVATION_HERO: Photo = {
  src: unsplash("1590846406792-0adc7f938f1d", 2000),
  alt: "La salle du restaurant pendant le service du soir",
  caption: "photo salle · service du soir",
};

/* ── Commande ─────────────────────────────────────────────────────────────── */

export const COMMANDE_HERO: Photo = {
  src: unsplash("1579871494447-9811cf80d66c", 2000),
  alt: "Le comptoir à sushi du restaurant",
  caption: "photo comptoir à sushi",
};

export const COMMANDE_MODES: Record<"deliv" | "pickup" | "table", Photo> = {
  deliv: {
    src: unsplash("1526367790999-0150786686a2", 900),
    alt: "Commande emballée pour la livraison",
    caption: "photo livraison",
  },
  pickup: {
    src: unsplash("1552566626-52f8b828add9", 900),
    alt: "Le comptoir de retrait",
    caption: "photo comptoir",
  },
  table: {
    src: unsplash("1517248135467-4c7edcad34c4", 900),
    alt: "La salle du restaurant",
    caption: "photo salle",
  },
};

export const TRACK_MAP: Photo = {
  src: "",
  alt: "Plan de livraison",
  caption: "carte / plan de livraison",
};

/**
 * Les 162 plats de la carte ne peuvent pas avoir chacun leur photo tant que le
 * restaurant ne les a pas fournies : on sert une image par famille de plats, et
 * le nom du plat reste le texte alternatif. Pour une photo par plat, ajoutez une
 * entrée `photo` dans `src/lib/menu-data.ts` et lisez-la dans `dishPhoto()`.
 */
const CATEGORY_PHOTOS: Record<string, string> = {
  pop: unsplash("1553621042-f6e147245754", 800), // Les + commandés
  men: unsplash("1607301405390-d831c242f59b", 800), // Menus & Formules
  efr: unsplash("1580822184713-fc5400e7fe10", 800), // Entrées froides
  ech: unsplash("1563245372-f21724e3856d", 800), // Entrées chaudes
  sus: unsplash("1579871494447-9811cf80d66c", 800), // Sushi à la pièce
  sas: unsplash("1611143669185-af224c5e3252", 800), // Sashimi
  mak: unsplash("1617196034796-73dfa7b1fd56", 800), // Makis
  cal: unsplash("1615361200098-9e630ae7b28d", 800), // California & Spring
  bwl: unsplash("1546069901-ba9599a7e63c", 800), // Chirashi & Poké
  pla: unsplash("1553621042-f6e147245754", 800), // Plateaux à partager
  yak: unsplash("1552912470-ee1b8fb42ee6", 800), // Yakitori & Grillades
  ram: unsplash("1569718212165-3a8278d5f624", 800), // Ramen & Nouilles
  riz: unsplash("1512058564366-18510be2db19", 800), // Riz & Donburi
  des: unsplash("1551024506-0bccd828d307", 800), // Desserts
  boi: unsplash("1544145945-f90425340c7e", 800), // Boissons
};

const DISH_FALLBACK = unsplash("1553621042-f6e147245754", 800);

export function dishPhoto(dish: { n: string; cat: string; ph: string }): Photo {
  return {
    src: CATEGORY_PHOTOS[dish.cat] ?? DISH_FALLBACK,
    alt: dish.n,
    caption: dish.ph,
  };
}
