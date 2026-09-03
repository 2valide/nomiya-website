"use client";

import { useCallback, useRef, useState } from "react";
import type { Category } from "@/lib/menu-data";

/** Nombre de catégories rendues au premier affichage. */
const INITIAL_SECTIONS = 4;
/** Distance au bas de liste qui déclenche le chargement des suivantes. */
const LOAD_AHEAD_PX = 800;
/** Fenêtre pendant laquelle le scroll programmé ne repositionne pas l'onglet actif. */
const LOCK_MS = 400;

export const sectionDomId = (categoryId: string) => `sec-${categoryId}`;

/**
 * Carte longue : scroll infini, et catégorie active synchronisée au défilement.
 *
 * Les sections sont rendues par paquets, pour ne pas monter 162 plats d'un coup.
 * On calcule les positions dans le repère du conteneur qui défile — et non via
 * `offsetTop`, dont l'`offsetParent` est la racine de l'app : c'est le bug qui
 * faisait dépasser le titre de section pendant les allers-retours de design.
 */
export function useMenuScroll(categories: Category[]) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const lockRef = useRef(0);

  const [shown, setShown] = useState(INITIAL_SECTIONS);
  const [active, setActive] = useState(categories[0]?.id ?? "");

  const centerRail = useCallback((index: number) => {
    const rail = railRef.current;
    const tile = rail?.children[index] as HTMLElement | undefined;
    if (!rail || !tile) return;
    const rr = rail.getBoundingClientRect();
    const tr = tile.getBoundingClientRect();
    rail.scrollLeft += tr.left - rr.left - (rail.clientWidth - tr.width) / 2;
  }, []);

  const scrollToSection = useCallback((categoryId: string) => {
    const list = listRef.current;
    const section = list?.querySelector<HTMLElement>(
      `#${sectionDomId(categoryId)}`,
    );
    if (!list || !section) return;
    lockRef.current = Date.now();
    list.scrollTop +=
      section.getBoundingClientRect().top - list.getBoundingClientRect().top;
  }, []);

  /** Clic sur une catégorie : on la rend visible, puis on s'y rend. */
  const pickCategory = useCallback(
    (categoryId: string) => {
      const index = categories.findIndex((c) => c.id === categoryId);
      setActive(categoryId);
      setShown((s) => Math.max(s, index + 2));
      centerRail(index);
      // La section n'est peut-être pas encore montée : on attend le rendu.
      requestAnimationFrame(() => scrollToSection(categoryId));
    },
    [categories, centerRail, scrollToSection],
  );

  const onScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const el = event.currentTarget;

      if (
        el.scrollHeight - el.scrollTop - el.clientHeight < LOAD_AHEAD_PX &&
        shown < categories.length
      ) {
        setShown((s) => Math.min(categories.length, s + 2));
      }

      if (Date.now() - lockRef.current < LOCK_MS) return;

      const base = el.getBoundingClientRect().top + 8;
      let current = categories[0]?.id ?? "";
      for (const c of categories) {
        const section = el.querySelector<HTMLElement>(`#${sectionDomId(c.id)}`);
        if (section && section.getBoundingClientRect().top <= base) {
          current = c.id;
        }
      }
      if (current !== active) {
        setActive(current);
        centerRail(categories.findIndex((c) => c.id === current));
      }
    },
    [active, categories, centerRail, shown],
  );

  const scrollRail = useCallback((delta: number) => {
    railRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  return {
    listRef,
    railRef,
    shown,
    active,
    onScroll,
    pickCategory,
    scrollRail,
  };
}
