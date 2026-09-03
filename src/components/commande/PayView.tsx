"use client";

import { articles, eur } from "@/lib/format";
import { feeName, paymentOptions, slotNames } from "@/lib/order";
import { RESTAURANT } from "@/lib/restaurant";
import { useCommande } from "./context";
import { SummaryRow } from "./CartView";

export function PayView() {
  const {
    goCart,
    mode,
    table,
    slot,
    setSlot,
    pay,
    setPay,
    promo,
    setPromo,
    totals,
    isDesktop,
  } = useCommande();

  const onSite = mode === "table";
  const destTitle =
    mode === "deliv"
      ? "Adresse de livraison"
      : onSite
        ? "Votre table"
        : "Retrait au restaurant";
  const destLine =
    mode === "deliv"
      ? "18 rue Oberkampf, 75011 Paris\nInterphone 4B · 3e étage"
      : onSite
        ? `Table ${table} · salle principale`
        : `${RESTAURANT.name} · ${RESTAURANT.street}, ${RESTAURANT.postcode} ${RESTAURANT.city}`;

  return (
    <div
      className="flex min-h-0 w-full flex-1 flex-col bg-[var(--bg)]"
      style={{ maxWidth: isDesktop ? 560 : undefined, margin: "0 auto" }}
    >
      <div className="flex flex-none items-center gap-2.5 border-b border-[var(--line)] bg-[var(--sf)] px-3.5 pt-2 pb-3">
        <button
          type="button"
          onClick={goCart}
          aria-label="Revenir au panier"
          className="h-8 w-8 flex-none cursor-pointer rounded-full border-0 bg-[var(--soft)] text-[15px] text-[var(--ink)]"
        >
          ‹
        </button>
        <h1 className="text-[16px] font-extrabold text-[var(--ink)]">
          Récapitulatif
        </h1>
      </div>

      <div className="no-scrollbar flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3.5 pt-3.5 pb-[110px]">
        <section className="flex flex-col gap-2.5 rounded-card border border-[var(--line)] bg-[var(--sf)] px-[15px] py-3.5">
          <h2 className="text-[13.5px] font-extrabold text-[var(--ink)]">
            {destTitle}
          </h2>
          <div className="flex items-start gap-2.5">
            <span className="h-[34px] w-[34px] flex-none rounded-[10px] bg-[var(--soft)]" />
            <span className="flex-1 text-[12.5px] leading-[1.45] font-semibold whitespace-pre-line text-[var(--mut)]">
              {destLine}
            </span>
            <button
              type="button"
              className="cursor-pointer border-0 bg-transparent text-[12px] font-extrabold text-[var(--acc)]"
            >
              Modifier
            </button>
          </div>

          <div className="h-px bg-[var(--line)]" />

          <h2 className="text-[13.5px] font-extrabold text-[var(--ink)]">
            Créneau
          </h2>
          <div className="flex flex-wrap gap-2">
            {slotNames(mode).map((n, i) => {
              const on = slot === i;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setSlot(i)}
                  aria-pressed={on}
                  className="cursor-pointer rounded-full border-[1.5px] px-[13px] py-2 text-[12px] font-bold"
                  style={{
                    borderColor: on ? "var(--acc)" : "var(--line)",
                    background: on ? "var(--soft)" : "transparent",
                    color: on ? "var(--acc)" : "var(--mut)",
                  }}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-[9px] rounded-card border border-[var(--line)] bg-[var(--sf)] px-[15px] py-3.5">
          <h2 className="text-[13.5px] font-extrabold text-[var(--ink)]">
            Paiement
          </h2>
          {paymentOptions(mode).map(([n, sub], i) => {
            const on = pay === i;
            return (
              <button
                key={n}
                type="button"
                onClick={() => setPay(i)}
                aria-pressed={on}
                className="flex w-full cursor-pointer items-center gap-2.5 rounded-field border-[1.5px] px-[13px] py-[11px] text-left"
                style={{
                  borderColor: on ? "var(--acc)" : "var(--line)",
                  background: on ? "var(--soft)" : "transparent",
                }}
              >
                <span
                  className="flex h-[18px] w-[18px] flex-none items-center justify-center rounded-full border-[1.5px] text-[11px] leading-none text-white"
                  style={{
                    borderColor: on ? "var(--acc)" : "var(--line)",
                    background: on ? "var(--acc)" : "transparent",
                  }}
                >
                  {on ? "✓" : ""}
                </span>
                <span className="flex-1 text-[13.5px] font-bold text-[var(--ink)]">
                  {n}
                </span>
                <span className="text-[11.5px] font-semibold text-[var(--mut)]">
                  {sub}
                </span>
              </button>
            );
          })}
        </section>

        <section className="flex flex-col gap-[11px] rounded-card border border-[var(--line)] bg-[var(--sf)] px-[15px] py-3.5">
          <h2 className="text-[13.5px] font-extrabold text-[var(--ink)]">
            Code promo
          </h2>
          <div className="flex gap-2">
            <input
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="NOMIYA10"
              aria-label="Code promo"
              className="min-w-0 flex-1 rounded-[11px] border-[1.5px] border-[var(--line)] bg-[var(--bg)] px-3 py-[11px] text-[13px] font-semibold text-[var(--ink)] outline-none"
            />
            <span
              className="self-center text-[11.5px] font-bold"
              style={{ color: totals.promoOk ? "#1E7A4C" : "var(--mut)" }}
            >
              {promo ? (totals.promoOk ? "Appliqué · −10 %" : "Code inconnu") : ""}
            </span>
          </div>

          <div className="h-px bg-[var(--line)]" />

          <SummaryRow
            label={`Sous-total · ${articles(totals.count)}`}
            value={eur(totals.subtotal)}
          />
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
          <div className="flex justify-between text-[17px] font-extrabold text-[var(--ink)]">
            <span>Total</span>
            <span>{eur(totals.total)}</span>
          </div>
        </section>
      </div>
    </div>
  );
}
