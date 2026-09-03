"use client";

import { Photo } from "@/components/Photo";
import { eur } from "@/lib/format";
import { dishByName } from "@/lib/menu-data";
import { feeName } from "@/lib/order";
import { dishPhoto } from "@/lib/photos";
import { useCommande } from "./context";
import { TierBar } from "./TierBar";
import { useRailDishes, useUpsells } from "./upsells";

export function CartView() {
  const {
    goMenu,
    modeLabel,
    cart,
    totals,
    mode,
    bump,
    quickAdd,
    upsell,
    railTab,
    setRailTab,
    isDesktop,
  } = useCommande();

  const upsellDishes = useUpsells(upsell);
  const railDishes = useRailDishes(railTab);

  return (
    <div
      className="flex min-h-0 w-full flex-1 flex-col bg-[var(--bg)]"
      style={{ maxWidth: isDesktop ? 560 : undefined, margin: "0 auto" }}
    >
      <div className="flex flex-none items-center gap-2.5 border-b border-[var(--line)] bg-[var(--sf)] px-3.5 pt-2 pb-3">
        <button
          type="button"
          onClick={goMenu}
          aria-label="Revenir à la carte"
          className="h-8 w-8 flex-none cursor-pointer rounded-full border-0 bg-[var(--soft)] text-[15px] text-[var(--ink)]"
        >
          ‹
        </button>
        <h1 className="text-[16px] font-extrabold text-[var(--ink)]">
          Mon panier
        </h1>
        <span className="ml-auto text-[11.5px] font-bold text-[var(--mut)]">
          {modeLabel}
        </span>
      </div>

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto pb-[104px]">
        <TierBar variant="bar" />

        {cart.map((l) => {
          const dish = dishByName(l.n);
          return (
            <div
              key={l.key}
              className="flex items-start gap-[11px] border-b border-[var(--line)] px-3.5 py-[13px]"
            >
              {dish ? (
                <Photo
                  photo={dishPhoto(dish)}
                  className="h-14 w-14 flex-none rounded-[11px]"
                  sizes="56px"
                  stripe={7}
                  hideCaption
                />
              ) : (
                <div className="h-14 w-14 flex-none rounded-[11px] bg-[var(--soft)]" />
              )}
              <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
                <span className="text-[13.5px] leading-[1.25] font-bold text-[var(--ink)]">
                  {l.n}
                </span>
                {l.opts && (
                  <span className="text-[11px] leading-[1.35] font-medium text-[var(--mut)]">
                    {l.opts}
                  </span>
                )}
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[14.5px] font-extrabold text-[var(--ink)]">
                    {eur(l.unit * l.qty)}
                  </span>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => bump(l.key, -1)}
                      aria-label={`Retirer un ${l.n}`}
                      className="h-[26px] w-[26px] cursor-pointer rounded-full border border-[var(--line)] bg-transparent text-[14px] leading-none text-[var(--ink)]"
                    >
                      −
                    </button>
                    <span className="min-w-3.5 text-center text-[13px] font-extrabold text-[var(--ink)]">
                      {l.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => bump(l.key, 1)}
                      aria-label={`Ajouter un ${l.n}`}
                      className="h-[26px] w-[26px] cursor-pointer rounded-full border-0 bg-[var(--acc)] text-[14px] leading-none text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {cart.length === 0 && (
          <div className="flex flex-col items-center gap-3 px-[30px] py-[70px] text-center">
            <span className="text-[13.5px] font-semibold text-[var(--mut)]">
              Votre panier est vide
            </span>
            <button
              type="button"
              onClick={goMenu}
              className="cursor-pointer rounded-full border-0 bg-[var(--acc)] px-[18px] py-[11px] text-[13px] font-bold text-white"
            >
              Voir la carte
            </button>
          </div>
        )}

        <div className="flex items-baseline gap-2 px-3.5 pt-[18px] pb-2">
          <h2 className="text-[14.5px] font-extrabold text-[var(--ink)]">
            Souvent commandé avec
          </h2>
          <span className="text-[11px] font-semibold text-[var(--mut)]">
            {upsell >= 2 ? "+3,40 € de panier moyen" : "Sélection du chef"}
          </span>
        </div>
        <div className="no-scrollbar flex gap-2.5 overflow-x-auto px-3.5 pt-0.5 pb-3.5">
          {upsellDishes.map((d) => (
            <div
              key={d.id}
              className="flex w-[124px] flex-none flex-col overflow-hidden rounded-[14px] border border-[var(--line)] bg-[var(--sf)]"
            >
              <Photo
                photo={dishPhoto(d)}
                className="h-[74px] w-full"
                sizes="124px"
                stripe={7}
                hideCaption
              />
              <div className="flex flex-col gap-[5px] px-[9px] pt-2 pb-2.5">
                <span className="h-[29px] overflow-hidden text-[12px] leading-[1.2] font-bold text-[var(--ink)]">
                  {d.n}
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-extrabold text-[var(--acc)]">
                    {eur(d.p)}
                  </span>
                  <button
                    type="button"
                    onClick={() => quickAdd(d)}
                    aria-label={`Ajouter ${d.n}`}
                    className="h-6 w-6 cursor-pointer rounded-full border-0 bg-[var(--acc)] text-[14px] leading-none text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {upsell >= 2 && (
          <div className="mx-3.5 mt-0.5 mb-4 overflow-hidden rounded-card border border-[var(--line)] bg-[var(--sf)]">
            <div className="flex border-b border-[var(--line)]">
              {(["Boissons", "Desserts"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setRailTab(t)}
                  aria-pressed={railTab === t}
                  className="flex-1 cursor-pointer border-0 py-[11px] text-[12.5px] font-extrabold"
                  style={{
                    background: railTab === t ? "var(--soft)" : "transparent",
                    color: railTab === t ? "var(--ink)" : "var(--mut)",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            {railDishes.map((d) => (
              <div
                key={d.id}
                className="flex items-center gap-[11px] border-b border-[var(--line)] px-3 py-2.5"
              >
                <Photo
                  photo={dishPhoto(d)}
                  className="h-10 w-10 flex-none rounded-[9px]"
                  sizes="40px"
                  stripe={6}
                  hideCaption
                />
                <span className="min-w-0 flex-1 text-[12.5px] leading-[1.25] font-bold text-[var(--ink)]">
                  {d.n}
                </span>
                <span className="text-[12.5px] font-extrabold text-[var(--ink)]">
                  {eur(d.p)}
                </span>
                <button
                  type="button"
                  onClick={() => quickAdd(d)}
                  className="flex-none cursor-pointer rounded-full border-[1.5px] border-[var(--acc)] bg-transparent px-[11px] py-1.5 text-[11.5px] font-extrabold text-[var(--acc)]"
                >
                  Ajouter
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mx-3.5 mt-1 mb-6 flex flex-col gap-[9px] rounded-card border border-[var(--line)] bg-[var(--sf)] px-[15px] py-3.5">
          <SummaryRow label="Sous-total" value={eur(totals.subtotal)} />
          {totals.discount > 0 && (
            <SummaryRow
              label="Remise palier 40 €"
              value={`− ${eur(totals.discount)}`}
              tone="green"
            />
          )}
          {totals.promoOk && totals.subtotal > 0 && (
            <SummaryRow
              label="Code NOMIYA10"
              value={`− ${eur(totals.promoAmount)}`}
              tone="green"
            />
          )}
          <SummaryRow
            label={feeName(mode)}
            value={totals.fee === 0 ? "Offerts" : eur(totals.fee)}
          />
          <div className="h-px bg-[var(--line)]" />
          <div className="flex justify-between text-[16px] font-extrabold text-[var(--ink)]">
            <span>Total</span>
            <span>{eur(totals.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SummaryRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "green";
}) {
  return (
    <div
      className={`flex justify-between text-[13px] ${
        tone === "green"
          ? "font-bold text-remise"
          : "font-semibold text-[var(--mut)]"
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
