"use client";

import { useMemo } from "react";
import { CATEGORIES, dishByName, type Dish } from "@/lib/menu-data";

/** Sélection discrète : trois classiques qui ne poussent à rien. */
const QUIET = ["Soupe miso", "Thé vert glacé maison 50 cl", "Mochi glacé (3)"];

/** Sélection courante : sept propositions rattachées au panier. */
const REGULAR = [
  "Gyoza au porc (6)",
  "Mochi glacé (3)",
  "Thé vert glacé maison 50 cl",
  "Edamame au sel de Guérande",
  "Ramune litchi",
  "Cheesecake yuzu",
  "Saké chaud 15 cl",
];

/** Proposé depuis la fiche plat : « On y ajoute souvent ». */
const SHEET_ADDS = [
  "Soupe miso",
  "Edamame au sel de Guérande",
  "Thé vert glacé maison 50 cl",
];

const resolve = (names: string[]): Dish[] =>
  names.map(dishByName).filter((d): d is Dish => Boolean(d));

export function useUpsells(level: 0 | 1 | 2): Dish[] {
  return useMemo(() => resolve(level === 0 ? QUIET : REGULAR), [level]);
}

export function useSheetAdds(): Dish[] {
  return useMemo(() => resolve(SHEET_ADDS), []);
}

/** Rail boissons / desserts du panier, en upsell maximal. */
export function useRailDishes(tab: "Boissons" | "Desserts"): Dish[] {
  return useMemo(() => {
    const cat = CATEGORIES.find((c) => c.id === (tab === "Boissons" ? "boi" : "des"));
    return cat ? cat.dishes.slice(0, 4) : [];
  }, [tab]);
}
