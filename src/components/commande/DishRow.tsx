"use client";

import { Photo } from "@/components/Photo";
import { eur } from "@/lib/format";
import type { Dish } from "@/lib/menu-data";
import { dishPhoto } from "@/lib/photos";
import { useCommande } from "./context";

/** Ligne de plat, mise en page mobile : photo 82 px à gauche, prix en bas. */
export function DishRow({ dish }: { dish: Dish }) {
  const { openDish, upsell } = useCommande();
  const hasOptions = dish.g.length > 0;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => openDish(dish)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDish(dish);
        }
      }}
      className="flex cursor-pointer items-start gap-[11px] border-b border-[var(--line)] px-3.5 pt-3 pb-3.5"
    >
      <Photo
        photo={dishPhoto(dish)}
        className="h-[82px] w-[82px] flex-none rounded-[13px]"
        sizes="82px"
        stripe={7}
        hideCaption
      >
        {dish.badge && upsell > 0 && (
          <span className="absolute top-0 left-0 rounded-br-lg bg-[var(--acc)] px-[5px] py-[3px] text-[8.5px] font-extrabold tracking-[0.2px] text-white">
            {dish.badge}
          </span>
        )}
      </Photo>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-[14.5px] leading-[1.25] font-bold text-[var(--ink)]">
          {dish.n}
        </span>
        <span className="clamp-2 text-[11.5px] leading-[1.35] font-medium text-[var(--mut)]">
          {dish.d}
        </span>
        {upsell > 0 && (
          <span className="text-[10.5px] font-semibold text-[var(--mut)]">
            {dish.sold}
          </span>
        )}
        <div className="mt-0.5 flex items-end justify-between gap-2">
          <span className="flex-none text-[16px] font-extrabold tracking-[-0.3px] whitespace-nowrap text-[var(--acc)]">
            {hasOptions ? "dès " : ""}
            {eur(dish.p)}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openDish(dish);
            }}
            aria-label={
              hasOptions ? `Choisir ${dish.n}` : `Ajouter ${dish.n} au panier`
            }
            className="flex h-7 min-w-7 cursor-pointer items-center justify-center rounded-full px-3 text-[12px] font-extrabold"
            style={{
              background: hasOptions ? "var(--soft)" : "var(--acc)",
              color: hasOptions ? "var(--acc)" : "#FFFFFF",
            }}
          >
            {hasOptions ? "Choisir" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
}
