"use client";

import { articles, eur } from "@/lib/format";
import { useCommande } from "./context";

/**
 * Barre de panier flottante — visible dès le premier article sur mobile.
 * Sur ordinateur, le panier permanent la remplace : elle ne reste que sur
 * l'écran de paiement, où elle porte le bouton « Payer ».
 */
export function CartBar() {
  const {
    view,
    isDesktop,
    totals,
    modeLabel,
    goCart,
    goPay,
    startTracking,
  } = useCommande();

  const visible =
    totals.count > 0 &&
    (view === "pay" || ((view === "menu" || view === "cart") && !isDesktop));

  if (!visible) return null;

  const sub =
    view === "pay"
      ? "Paiement sécurisé"
      : view === "cart"
        ? modeLabel
        : articles(totals.count);
  const cta =
    view === "pay" ? "Payer" : view === "cart" ? "Commander" : "Voir le panier";
  const action =
    view === "menu" ? goCart : view === "cart" ? goPay : startTracking;

  return (
    <div
      className="absolute right-0 bottom-0 left-0 mx-auto w-full bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,var(--bg)_34%)] px-3.5 pt-3 pb-[22px]"
      style={{ maxWidth: isDesktop ? 560 : undefined }}
    >
      <button
        type="button"
        onClick={action}
        className="elev-bar flex h-14 w-full cursor-pointer items-center gap-3 rounded-card border-0 bg-[var(--elev)] pr-3.5 pl-3 text-white"
      >
        <span className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-[10px] bg-[var(--acc)] text-[13px] font-extrabold">
          {totals.count}
        </span>
        <span className="flex flex-col items-start gap-px">
          <span className="text-[16px] font-extrabold tracking-[-0.2px]">
            {eur(totals.total)}
          </span>
          <span className="text-[10.5px] font-semibold opacity-65">{sub}</span>
        </span>
        <span className="ml-auto rounded-field bg-[var(--acc)] px-4 py-2.5 text-[13.5px] font-extrabold">
          {cta}
        </span>
      </button>
    </div>
  );
}
