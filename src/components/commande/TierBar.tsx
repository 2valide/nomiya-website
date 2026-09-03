"use client";

import { useCommande } from "./context";

/**
 * Barre de palier — un seul palier à la fois, toujours exprimé en euros
 * restants. Fond ambre, jauge à la couleur d'accent du thème.
 */
export function TierBar({ variant }: { variant: "bar" | "panel" }) {
  const { showTier, tier } = useCommande();
  if (!showTier) return null;

  const isPanel = variant === "panel";

  return (
    <div
      className={
        isPanel
          ? "mx-5 mb-3 flex flex-none flex-col gap-[7px] rounded-field bg-[var(--tint)] px-[13px] py-[11px]"
          : "flex flex-none flex-col gap-1.5 border-b border-[var(--line)] bg-[var(--tint)] px-4 pt-[9px] pb-2.5"
      }
    >
      <span
        className={`font-bold text-[var(--tinkc)] ${
          isPanel ? "text-[11.5px] leading-[1.35]" : "text-[12px]"
        }`}
      >
        {tier.text}
      </span>
      <div className="h-[5px] overflow-hidden rounded-[99px] bg-black/[0.09]">
        <div
          className="h-full rounded-[99px] bg-[var(--acc)]"
          style={{ width: tier.pct }}
        />
      </div>
    </div>
  );
}
