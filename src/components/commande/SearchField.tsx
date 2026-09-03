"use client";

import { DISH_COUNT } from "@/lib/menu-data";
import { useCommande } from "./context";

/** Recherche dans la carte — toujours en haut, sur les deux mises en page. */
export function SearchField({ size }: { size: "mobile" | "desktop" }) {
  const { query, setQuery } = useCommande();
  const desktop = size === "desktop";

  return (
    <div
      className={`flex items-center gap-2 rounded-field bg-[var(--soft)] px-3 ${
        desktop ? "h-10 max-w-[420px] flex-1 gap-[9px] px-[13px]" : "mt-2.5 h-[38px]"
      }`}
    >
      <span
        aria-hidden
        className="h-3.5 w-3.5 flex-none rounded-full border-2 border-[var(--mut)]"
      />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Rechercher parmi ${DISH_COUNT} plats…`}
        aria-label="Rechercher un plat"
        className="min-w-0 flex-1 border-0 bg-transparent text-[13.5px] font-medium text-[var(--ink)] outline-none"
      />
      {!desktop && query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          aria-label="Effacer la recherche"
          className="h-5 w-5 flex-none cursor-pointer rounded-full border-0 bg-[var(--line)] text-[12px] leading-none text-[var(--ink)]"
        >
          ×
        </button>
      )}
    </div>
  );
}
