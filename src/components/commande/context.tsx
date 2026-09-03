"use client";

import { createContext, useContext } from "react";
import type { Dish } from "@/lib/menu-data";
import type {
  CartLine,
  OrderMode,
  Selection,
  Totals,
} from "@/lib/order";
import type { Theme } from "@/lib/themes";
import type { CommandeConfig } from "@/lib/commande-config";

export type View = "home" | "table" | "menu" | "cart" | "pay" | "track";

export type CommandeContextValue = {
  config: CommandeConfig;
  theme: Theme;
  /** 0 discret · 1 équilibré · 2 maximal. */
  upsell: 0 | 1 | 2;
  isDesktop: boolean;

  view: View;
  mode: OrderMode;
  table: number;
  query: string;
  cart: CartLine[];
  totals: Totals;
  tier: { text: string; pct: string };
  /** Le bandeau de palier ne s'affiche pas sur place. */
  showTier: boolean;
  modeLabel: string;

  slot: number;
  pay: number;
  promo: string;
  track: number;
  railTab: "Boissons" | "Desserts";

  /** Fiche plat ouverte, ou null. */
  sheet: Dish | null;
  selection: Selection;
  sheetQty: number;
  sheetNote: string;

  setQuery: (q: string) => void;
  chooseMode: (mode: OrderMode) => void;
  chooseTable: (table: number) => void;
  setSlot: (i: number) => void;
  setPay: (i: number) => void;
  setPromo: (v: string) => void;
  setRailTab: (t: "Boissons" | "Desserts") => void;

  /** Ouvre la fiche si le plat a des options, sinon ajoute directement. */
  openDish: (dish: Dish) => void;
  quickAdd: (dish: Dish) => void;
  closeSheet: () => void;
  pickOption: (groupId: string, index: number) => void;
  setSheetQty: (qty: number) => void;
  setSheetNote: (note: string) => void;
  addSheetToCart: () => void;
  bump: (key: string, delta: number) => void;

  goHome: () => void;
  /** « Sur place » passe d'abord par le choix de la table. */
  goTable: () => void;
  goMenu: () => void;
  goCart: () => void;
  goPay: () => void;
  startTracking: () => void;
  reset: () => void;
};

const CommandeContext = createContext<CommandeContextValue | null>(null);

export const CommandeProvider = CommandeContext.Provider;

export function useCommande(): CommandeContextValue {
  const ctx = useContext(CommandeContext);
  if (!ctx) {
    throw new Error("useCommande doit être utilisé dans <CommandeApp />");
  }
  return ctx;
}
