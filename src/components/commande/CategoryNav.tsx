"use client";

import { CATEGORIES } from "@/lib/menu-data";
import { useCommande } from "./context";

type NavProps = {
  active: string;
  /** Une recherche en cours neutralise la catégorie active. */
  searching: boolean;
  onPick: (categoryId: string) => void;
};

/** Colonne de catégories — mobile (98 px) et ordinateur (236 px). */
export function CategorySidebar({
  active,
  searching,
  onPick,
  size,
}: NavProps & { size: "mobile" | "desktop" }) {
  const { upsell } = useCommande();
  const desktop = size === "desktop";

  return (
    <div
      className={
        desktop
          ? "no-scrollbar overflow-y-auto border-r border-[var(--line)] bg-[var(--soft)] pt-3 pb-10"
          : "no-scrollbar w-[98px] flex-none overflow-y-auto border-r border-[var(--line)] bg-[var(--soft)] pb-[90px]"
      }
    >
      {CATEGORIES.map((c) => {
        const on = c.id === active && !searching;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onPick(c.id)}
            aria-current={on ? "true" : undefined}
            className={`relative flex w-full cursor-pointer text-left ${
              desktop
                ? "items-center gap-[9px] py-[13px] pr-4 pl-5 text-[13.5px] leading-[1.3]"
                : "flex-col gap-[3px] py-3 pr-2 pl-3 text-[11.5px] leading-[1.25]"
            }`}
            style={{
              background: on ? "var(--bg)" : "transparent",
              color: on ? "var(--ink)" : "var(--mut)",
              fontWeight: on ? 800 : 600,
            }}
          >
            <span
              className="absolute left-0 w-[3px] rounded-r-[3px]"
              style={{
                top: desktop ? 9 : 10,
                bottom: desktop ? 9 : 10,
                background: on ? "var(--acc)" : "transparent",
              }}
            />
            <span className={desktop ? "flex-1" : undefined}>{c.name}</span>
            {c.badge && upsell > 0 && (
              <span
                className={`rounded-[4px] bg-[var(--acc)] font-extrabold tracking-[0.3px] text-white ${
                  desktop
                    ? "px-[5px] py-0.5 text-[9px]"
                    : "self-start px-1 py-0.5 text-[8.5px]"
                }`}
              >
                {c.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Onglets horizontaux — variante mobile de la navigation dans la carte. */
export function CategoryTabs({ active, searching, onPick }: NavProps) {
  return (
    <div className="no-scrollbar flex flex-none gap-[7px] overflow-x-auto border-b border-[var(--line)] bg-[var(--sf)] px-3.5 pt-[9px] pb-2.5">
      {CATEGORIES.map((c) => {
        const on = c.id === active && !searching;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onPick(c.id)}
            aria-current={on ? "true" : undefined}
            className="flex-none cursor-pointer rounded-full border-[1.5px] px-[13px] py-2 text-[12.5px] whitespace-nowrap"
            style={{
              borderColor: on ? "var(--acc)" : "var(--line)",
              background: on ? "var(--acc)" : "transparent",
              color: on ? "#fff" : "var(--mut)",
              fontWeight: on ? 800 : 600,
            }}
          >
            {c.name}
          </button>
        );
      })}
    </div>
  );
}

/** Rail de catégories en haut — variante ordinateur. */
export function CategoryRail({
  active,
  searching,
  onPick,
  railRef,
  onScrollRail,
}: NavProps & {
  railRef: React.RefObject<HTMLDivElement | null>;
  onScrollRail: (delta: number) => void;
}) {
  return (
    <div className="relative flex flex-none items-center gap-2.5 border-b border-[var(--line)] bg-[var(--sf)] px-[46px] py-3.5">
      <RailArrow side="left" onClick={() => onScrollRail(-400)} />
      <div
        ref={railRef}
        className="no-scrollbar flex min-w-0 flex-1 gap-2.5 overflow-x-auto py-0.5"
      >
        {CATEGORIES.map((c) => {
          const on = c.id === active && !searching;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onPick(c.id)}
              aria-current={on ? "true" : undefined}
              className="flex w-[126px] flex-none cursor-pointer flex-col items-center gap-[9px] rounded-[14px] border-[1.5px] px-2 pt-3 pb-[11px]"
              style={{
                borderColor: on ? "var(--acc)" : "var(--line)",
                background: on ? "var(--sf)" : "transparent",
              }}
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full font-mono text-[7px] leading-[1.2]"
                style={{
                  background: on ? "var(--acc)" : "var(--soft)",
                  color: on ? "#fff" : "var(--mut)",
                }}
              >
                visuel
              </span>
              <span
                className="h-[29px] overflow-hidden text-center text-[11.5px] leading-[1.25]"
                style={{
                  color: on ? "var(--ink)" : "var(--mut)",
                  fontWeight: on ? 800 : 600,
                }}
              >
                {c.name}
              </span>
            </button>
          );
        })}
      </div>
      <RailArrow side="right" onClick={() => onScrollRail(400)} />
    </div>
  );
}

function RailArrow({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Catégories précédentes" : "Catégories suivantes"}
      className={`absolute top-1/2 z-[2] h-7 w-7 -translate-y-1/2 cursor-pointer rounded-full border border-[var(--line)] bg-[var(--sf)] text-[14px] leading-none text-[var(--ink)] ${
        side === "left" ? "left-2.5" : "right-2.5"
      }`}
    >
      {side === "left" ? "‹" : "›"}
    </button>
  );
}
