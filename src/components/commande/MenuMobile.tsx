"use client";

import { CATEGORIES } from "@/lib/menu-data";
import { useMenuScroll } from "@/hooks/useMenuScroll";
import { useCommande } from "./context";
import { useSections } from "./useSections";
import { CategorySidebar, CategoryTabs } from "./CategoryNav";
import { SearchField } from "./SearchField";
import { TierBar } from "./TierBar";
import { DishRow } from "./DishRow";

export function MenuMobile() {
  const { config, goHome, modeLabel, query, setQuery } = useCommande();
  const { listRef, shown, active, onScroll, pickCategory } =
    useMenuScroll(CATEGORIES);
  const { sections, noResults } = useSections(query, shown);

  const searching = query.trim().length > 0;
  const onPick = (id: string) => {
    setQuery("");
    pickCategory(id);
  };

  return (
    <>
      <div className="flex-none border-b border-[var(--line)] bg-[var(--sf)] px-4 pt-1.5 pb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-[9px]">
            <button
              type="button"
              onClick={goHome}
              aria-label="Changer de mode de commande"
              className="h-[30px] w-[30px] flex-none cursor-pointer rounded-full border-0 bg-[var(--soft)] text-[15px] text-[var(--ink)]"
            >
              ‹
            </button>
            <div className="flex min-w-0 flex-col gap-px">
              <span className="font-[family-name:var(--disp)] text-[21px] leading-[1.05] text-[var(--ink)]">
                Nomiya
              </span>
              <span className="truncate text-[10.5px] font-bold text-[var(--acc)]">
                {modeLabel}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={goHome}
            className="flex-none cursor-pointer rounded-full border-[1.5px] border-[var(--line)] bg-transparent px-2.5 py-[7px] text-[11px] font-bold text-[var(--mut)]"
          >
            Changer
          </button>
        </div>
        <SearchField size="mobile" />
      </div>

      <TierBar variant="bar" />

      {config.navigation === "Onglets horizontaux" && (
        <CategoryTabs active={active} searching={searching} onPick={onPick} />
      )}

      <div className="flex min-h-0 flex-1">
        {config.navigation === "Sidebar catégories" && (
          <CategorySidebar
            size="mobile"
            active={active}
            searching={searching}
            onPick={onPick}
          />
        )}

        <div
          ref={listRef}
          onScroll={onScroll}
          className="no-scrollbar min-w-0 flex-1 overflow-y-auto bg-[var(--bg)] pb-[110px]"
        >
          {sections.map((s) => (
            <section key={s.domId} id={s.domId}>
              <div className="flex items-baseline gap-2 px-3.5 pt-3.5 pb-2">
                <h2 className="text-[14.5px] font-extrabold text-[var(--ink)]">
                  {s.name}
                </h2>
                <span className="text-[11px] font-semibold text-[var(--mut)]">
                  {s.count}
                </span>
              </div>
              {s.dishes.map((d) => (
                <DishRow key={d.id} dish={d} />
              ))}
            </section>
          ))}

          {noResults && (
            <p className="px-6 py-[60px] text-center text-[13px] font-semibold text-[var(--mut)]">
              Aucun plat pour «&nbsp;{query}&nbsp;»
            </p>
          )}
        </div>
      </div>
    </>
  );
}
