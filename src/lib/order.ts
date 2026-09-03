/**
 * Règles de commande : paliers, remises, frais, total.
 *
 * Tout est regroupé ici plutôt que dans les composants, parce que ce sont les
 * règles commerciales du restaurateur : ce sont elles qui bougeront en premier.
 */

import { eur } from "./format";
import type { Dish, OptionGroup, OptionGroupKey } from "./menu-data";
import { OPTION_GROUPS } from "./menu-data";

export type OrderMode = "deliv" | "pickup" | "table";

export type CartLine = {
  /** Clé de ligne : deux fois le même plat avec des options différentes = deux lignes. */
  key: string;
  n: string;
  /** Prix unitaire, options comprises. */
  unit: number;
  qty: number;
  /** Options choisies, aplaties pour l'affichage (« Riz complet · Wasabi frais »). */
  opts: string;
  /** Catégorie du plat, pour retrouver sa photo. */
  cat: string;
};

/** Paliers annoncés au client. */
export const FREE_DELIVERY_FROM = 30;
export const DISCOUNT_FROM = 40;
export const DISCOUNT_AMOUNT = 5;
export const DELIVERY_FEE = 3.5;
export const PROMO_CODE = "NOMIYA10";
export const PROMO_RATE = 0.1;

export type Totals = {
  subtotal: number;
  count: number;
  discount: number;
  promoOk: boolean;
  promoAmount: number;
  fee: number;
  total: number;
};

export function computeTotals(
  cart: CartLine[],
  mode: OrderMode,
  promo: string,
): Totals {
  const subtotal = cart.reduce((a, l) => a + l.unit * l.qty, 0);
  const count = cart.reduce((a, l) => a + l.qty, 0);
  const onSite = mode === "table";

  const discount = !onSite && subtotal >= DISCOUNT_FROM ? DISCOUNT_AMOUNT : 0;
  const promoOk = promo.trim().toUpperCase() === PROMO_CODE;
  const promoAmount = promoOk ? (subtotal - discount) * PROMO_RATE : 0;
  const fee =
    count > 0 && mode === "deliv"
      ? subtotal >= FREE_DELIVERY_FROM
        ? 0
        : DELIVERY_FEE
      : 0;

  return {
    subtotal,
    count,
    discount,
    promoOk,
    promoAmount,
    fee,
    total: Math.max(0, subtotal - discount - promoAmount + fee),
  };
}

/**
 * Un seul palier visible à la fois, toujours exprimé en euros restants —
 * règle du design system.
 */
export function tierState(
  subtotal: number,
  mode: OrderMode,
  table: number,
): { text: string; pct: string } {
  if (mode === "table") {
    return {
      text: `Table ${table} · les plats partent en cuisine dès validation`,
      pct: "100%",
    };
  }
  if (mode === "deliv" && subtotal < FREE_DELIVERY_FROM) {
    return {
      text: `Plus que ${eur(FREE_DELIVERY_FROM - subtotal)} pour la livraison offerte`,
      pct: `${Math.min(100, (subtotal / FREE_DELIVERY_FROM) * 100)}%`,
    };
  }
  if (subtotal < DISCOUNT_FROM) {
    return {
      text: `${mode === "deliv" ? "Livraison offerte. " : ""}Plus que ${eur(
        DISCOUNT_FROM - subtotal,
      )} pour ${DISCOUNT_AMOUNT} € de remise`,
      pct: `${(subtotal / DISCOUNT_FROM) * 100}%`,
    };
  }
  return {
    text: `Remise de ${DISCOUNT_AMOUNT} € débloquée. Palier maximal atteint`,
    pct: "100%",
  };
}

/* ── Fiche plat : sélection d'options ──────────────────────────────────────── */

/**
 * Sélection en cours dans la fiche plat, indexée par identifiant de groupe.
 * Groupe `single` : index choisi, ou -1 quand rien n'est choisi (facultatif).
 * Groupe `multi` : liste d'index.
 */
export type Selection = Record<string, number | number[]>;

export const groupsOf = (dish: Dish): OptionGroup[] =>
  dish.g.map((k: OptionGroupKey) => OPTION_GROUPS[k]);

/** Un groupe obligatoire démarre sur sa première option ; les autres à vide. */
export function initialSelection(dish: Dish): Selection {
  const sel: Selection = {};
  for (const g of groupsOf(dish)) {
    sel[g.id] = g.type === "single" ? (g.req ? 0 : -1) : [];
  }
  return sel;
}

/** Prix unitaire du plat, suppléments choisis compris. */
export function unitPrice(dish: Dish, sel: Selection): number {
  let p = dish.p;
  for (const g of groupsOf(dish)) {
    const s = sel[g.id];
    if (g.type === "single") {
      if (typeof s === "number" && s >= 0 && g.opts[s]) p += g.opts[s].p;
    } else if (Array.isArray(s)) {
      for (const i of s) p += g.opts[i].p;
    }
  }
  return p;
}

/** Résumé des options, affiché sous la ligne de panier. */
export function optionLabel(
  dish: Dish,
  sel: Selection,
  note: string,
): string {
  const out: string[] = [];
  for (const g of groupsOf(dish)) {
    const s = sel[g.id];
    if (g.type === "single") {
      if (typeof s === "number" && s >= 0 && g.opts[s]) out.push(g.opts[s].n);
    } else if (Array.isArray(s)) {
      for (const i of s) out.push(g.opts[i].n);
    }
  }
  if (note) out.push(`« ${note} »`);
  return out.join(" · ");
}

/** Applique un clic sur une option, en respectant `req` et `max`. */
export function toggleOption(
  sel: Selection,
  group: OptionGroup,
  index: number,
): Selection {
  const next = { ...sel };
  if (group.type === "single") {
    const on = sel[group.id] === index;
    next[group.id] = on && !group.req ? -1 : index;
  } else {
    const cur = (sel[group.id] as number[]) ?? [];
    const on = cur.includes(index);
    next[group.id] = on
      ? cur.filter((x) => x !== index)
      : cur.length >= (group.max ?? Infinity)
        ? cur
        : [...cur, index];
  }
  return next;
}

/* ── Libellés dépendant du mode ───────────────────────────────────────────── */

export function modeLabel(mode: OrderMode, table: number): string {
  if (mode === "deliv") return "Livraison · 25-35 min";
  if (mode === "table") return `Sur place · table ${table}`;
  return "À emporter · prêt en 15 min";
}

export function feeName(mode: OrderMode): string {
  if (mode === "deliv") return "Frais de livraison";
  if (mode === "table") return "Service";
  return "Frais";
}

export function slotNames(mode: OrderMode): string[] {
  if (mode === "deliv") return ["Au plus vite · 30 min", "19:30", "20:00", "20:30"];
  if (mode === "table") return ["Dès que prêt", "Après l’apéritif"];
  return ["Dans 20 min", "19:15", "19:45", "20:15"];
}

export function paymentOptions(mode: OrderMode): [string, string][] {
  if (mode === "table") {
    return [
      ["Payer maintenant", "Carte bancaire"],
      ["Payer à la fin du repas", "Ajouté à l’addition"],
      ["Apple Pay", "Face ID"],
    ];
  }
  return [
    ["Carte bancaire", "•••• 4218"],
    ["Apple Pay", "Face ID"],
    [
      mode === "deliv" ? "Espèces à la livraison" : "Espèces sur place",
      "Appoint apprécié",
    ],
  ];
}

export function trackingSteps(
  mode: OrderMode,
  table: number,
): [string, string][] {
  if (mode === "deliv") {
    return [
      ["Commande confirmée", "Le restaurant a reçu votre commande"],
      ["En préparation", "Sushi dressés à la minute"],
      ["En route", "Votre livreur arrive"],
      ["Livrée", "Bon appétit"],
    ];
  }
  if (mode === "table") {
    return [
      ["Envoyée en cuisine", `Table ${table}`],
      ["En préparation", "Les plats arrivent au fur et à mesure"],
      ["Premiers plats servis", "Entrées et sushi"],
      ["Repas servi", "Bon appétit"],
    ];
  }
  return [
    ["Commande confirmée", "Le restaurant a reçu votre commande"],
    ["En préparation", "Sushi dressés à la minute"],
    ["Prête", "À retirer au comptoir"],
    ["Retirée", "Bon appétit"],
  ];
}
