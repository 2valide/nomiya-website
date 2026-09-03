/**
 * Variantes de l'app de commande.
 *
 * Le prototype les exposait dans les « Tweaks » de Claude Design pour comparer
 * les options d'UX. Ce sont en réalité des réglages produit / restaurateur : on
 * les fige ici, aux valeurs retenues à la fin des allers-retours de design, et
 * il suffit d'éditer cet objet pour rebasculer d'une variante à l'autre.
 */

import type { ThemeName } from "./themes";

/** Navigation dans la carte, sur mobile. */
export type MobileNav = "Sidebar catégories" | "Onglets horizontaux";
/** Navigation dans la carte, sur ordinateur. */
export type DesktopNav = "Sidebar + panier" | "Catégories en haut";
/** Présentation de la fiche plat sur mobile. */
export type DishSheetStyle = "Bottom sheet" | "Page pleine";
/** Intensité des suggestions de vente additionnelle. */
export type UpsellLevel = "Discret" | "Équilibré" | "Maximal";

export type CommandeConfig = {
  theme: ThemeName;
  navigation: MobileNav;
  navigationPc: DesktopNav;
  ficheplat: DishSheetStyle;
  upsells: UpsellLevel;
};

export const COMMANDE_CONFIG: CommandeConfig = {
  theme: "Encre & vermillon",
  navigation: "Sidebar catégories",
  navigationPc: "Sidebar + panier",
  ficheplat: "Bottom sheet",
  upsells: "Équilibré",
};

/**
 * 0 = pas de badges ni de preuve sociale, suggestions minimales.
 * 1 = badges, palier, « souvent commandé avec ».
 * 2 = ajoute le rail boissons/desserts dans le panier.
 */
export const upsellLevel = (u: UpsellLevel): 0 | 1 | 2 =>
  u === "Discret" ? 0 : u === "Maximal" ? 2 : 1;

/** Au-delà, on passe en mise en page ordinateur. */
export const DESKTOP_BREAKPOINT = 900;
