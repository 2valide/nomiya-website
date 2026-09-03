"use client";

import { useMemo } from "react";
import { ALL_DISHES, CATEGORIES, type Dish } from "@/lib/menu-data";
import { sectionDomId } from "@/hooks/useMenuScroll";

export type Section = {
  domId: string;
  name: string;
  count: string;
  dishes: Dish[];
};

/**
 * Sections affichées dans la liste.
 *
 * Recherche active : une seule section de résultats. Sinon les `shown`
 * premières catégories, complétées au fil du défilement.
 */
export function useSections(query: string, shown: number) {
  const q = query.trim().toLowerCase();

  return useMemo(() => {
    if (q) {
      const matches = ALL_DISHES.filter((d) =>
        `${d.n} ${d.d}`.toLowerCase().includes(q),
      );
      return {
        sections: [
          {
            domId: "sec-res",
            name: "Résultats",
            count: `${matches.length} plats`,
            dishes: matches,
          },
        ] satisfies Section[],
        noResults: matches.length === 0,
      };
    }

    return {
      sections: CATEGORIES.slice(0, shown).map((c) => ({
        domId: sectionDomId(c.id),
        name: c.name,
        count: `${c.dishes.length} plats`,
        dishes: c.dishes,
      })) satisfies Section[],
      noResults: false,
    };
  }, [q, shown]);
}
