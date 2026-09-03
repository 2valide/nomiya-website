"use client";

import { Photo } from "@/components/Photo";
import { eur } from "@/lib/format";
import type { Dish } from "@/lib/menu-data";
import { dishPhoto } from "@/lib/photos";
import { useCommande } from "./context";

/** Carte de plat, mise en page ordinateur : photo en bandeau, prix en pied. */
export function DishCard({ dish }: { dish: Dish }) {
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
      className="flex cursor-pointer flex-col overflow-hidden rounded-card border border-[var(--line)] bg-[var(--sf)]"
    >
      <Photo
        photo={dishPhoto(dish)}
        className="h-[132px] w-full"
        sizes="240px"
        stripe={8}
        hideCaption
      >
        {dish.badge && upsell > 0 && (
          <span className="absolute top-0 left-0 rounded-br-[9px] bg-[var(--acc)] px-[7px] py-1 text-[9px] font-extrabold text-white">
            {dish.badge}
          </span>
        )}
      </Photo>

      <div className="flex flex-1 flex-col gap-[5px] px-[13px] pt-3 pb-[13px]">
        <span className="text-[14.5px] leading-[1.25] font-bold text-[var(--ink)]">
          {dish.n}
        </span>
        <span className="clamp-2 text-[11.5px] leading-[1.4] font-medium text-[var(--mut)]">
          {dish.d}
        </span>
        <div className="mt-auto flex items-center justify-between gap-2 pt-[9px]">
          <span className="text-[16px] font-extrabold whitespace-nowrap text-[var(--acc)]">
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
            className="cursor-pointer rounded-full px-3.5 py-2 text-[12px] font-extrabold"
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
