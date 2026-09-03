"use client";

import { Photo } from "@/components/Photo";
import { articles, eur } from "@/lib/format";
import { CATEGORIES, dishByName } from "@/lib/menu-data";
import { feeName } from "@/lib/order";
import { dishPhoto } from "@/lib/photos";
import { useMenuScroll } from "@/hooks/useMenuScroll";
import { useCommande } from "./context";
import { useSections } from "./useSections";
import { CategoryRail, CategorySidebar } from "./CategoryNav";
import { SearchField } from "./SearchField";
import { TierBar } from "./TierBar";
import { DishCard } from "./DishCard";
import { useUpsells } from "./upsells";

export function MenuDesktop() {
  const {
    config,
    goHome,
    modeLabel,
    query,
    setQuery,
    cart,
    totals,
    mode,
    bump,
    goPay,
    quickAdd,
    upsell,
  } = useCommande();

  const { listRef, railRef, shown, active, onScroll, pickCategory, scrollRail } =
    useMenuScroll(CATEGORIES);
  const { sections, noResults } = useSections(query, shown);
  const upsellDishes = useUpsells(upsell);

  const topNav = config.navigationPc === "Catégories en haut";
  const searching = query.trim().length > 0;
  const onPick = (id: string) => {
    setQuery("");
    pickCategory(id);
  };

  return (
    <>
      <div className="flex flex-none items-center gap-5 border-b border-[var(--line)] bg-[var(--sf)] px-7 py-3.5">
        <div className="flex flex-none items-baseline gap-3">
          <span className="font-[family-name:var(--disp)] text-[26px] leading-none text-[var(--ink)]">
            Nomiya
          </span>
          <span className="text-[12px] font-bold text-[var(--acc)]">
            {modeLabel}
          </span>
        </div>
        <SearchField size="desktop" />
        <button
          type="button"
          onClick={goHome}
          className="ml-auto flex-none cursor-pointer rounded-full border-[1.5px] border-[var(--line)] bg-transparent px-3.5 py-[9px] text-[12px] font-bold text-[var(--mut)]"
        >
          Changer de mode
        </button>
      </div>

      {topNav && (
        <CategoryRail
          active={active}
          searching={searching}
          onPick={onPick}
          railRef={railRef}
          onScrollRail={scrollRail}
        />
      )}

      <div
        className="grid min-h-0 flex-1"
        style={{
          gridTemplateColumns: topNav
            ? "minmax(0,1fr) 348px"
            : "236px minmax(0,1fr) 348px",
        }}
      >
        {!topNav && (
          <CategorySidebar
            size="desktop"
            active={active}
            searching={searching}
            onPick={onPick}
          />
        )}

        <div
          ref={listRef}
          onScroll={onScroll}
          className="no-scrollbar overflow-y-auto bg-[var(--bg)] px-[26px] pb-[60px]"
        >
          {sections.map((s) => (
            <section key={s.domId} id={s.domId}>
              <div className="flex items-baseline gap-2.5 pt-[26px] pb-3.5">
                <h2 className="text-[20px] font-extrabold text-[var(--ink)]">
                  {s.name}
                </h2>
                <span className="text-[12px] font-semibold text-[var(--mut)]">
                  {s.count}
                </span>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(228px,1fr))] gap-4">
                {s.dishes.map((d) => (
                  <DishCard key={d.id} dish={d} />
                ))}
              </div>
            </section>
          ))}

          {noResults && (
            <p className="px-6 py-[60px] text-center text-[14px] font-semibold text-[var(--mut)]">
              Aucun plat pour «&nbsp;{query}&nbsp;»
            </p>
          )}
        </div>

        {/* Panier permanent : sur ordinateur il remplace la barre flottante. */}
        <aside className="flex min-h-0 flex-col border-l border-[var(--line)] bg-[var(--sf)]">
          <div className="flex flex-none items-baseline justify-between px-5 pt-[18px] pb-3">
            <h2 className="text-[16px] font-extrabold text-[var(--ink)]">
              Mon panier
            </h2>
            <span className="text-[12px] font-bold text-[var(--mut)]">
              {articles(totals.count)}
            </span>
          </div>

          <TierBar variant="panel" />

          <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-5">
            {cart.map((l) => {
              const dish = dishByName(l.n);
              return (
                <div
                  key={l.key}
                  className="flex items-start gap-2.5 border-b border-[var(--line)] py-3"
                >
                  {dish ? (
                    <Photo
                      photo={dishPhoto(dish)}
                      className="h-12 w-12 flex-none rounded-[10px]"
                      sizes="48px"
                      stripe={6}
                      hideCaption
                    />
                  ) : (
                    <div className="h-12 w-12 flex-none rounded-[10px] bg-[var(--soft)]" />
                  )}
                  <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
                    <span className="text-[13px] leading-[1.25] font-bold text-[var(--ink)]">
                      {l.n}
                    </span>
                    {l.opts && (
                      <span className="text-[10.5px] leading-[1.35] font-medium text-[var(--mut)]">
                        {l.opts}
                      </span>
                    )}
                    <div className="mt-[3px] flex items-center justify-between">
                      <span className="text-[13.5px] font-extrabold text-[var(--ink)]">
                        {eur(l.unit * l.qty)}
                      </span>
                      <QtyStepper
                        label={l.n}
                        qty={l.qty}
                        onMinus={() => bump(l.key, -1)}
                        onPlus={() => bump(l.key, 1)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {cart.length === 0 && (
              <p className="py-10 text-center text-[12.5px] leading-[1.5] font-semibold text-[var(--mut)]">
                Votre panier est vide.
                <br />
                Cliquez un plat pour le personnaliser.
              </p>
            )}

            <div className="pt-4 pb-2 text-[13px] font-extrabold text-[var(--ink)]">
              Souvent commandé avec
            </div>
            {upsellDishes.map((d) => (
              <div key={d.id} className="flex items-center gap-2.5 py-2">
                <Photo
                  photo={dishPhoto(d)}
                  className="h-[38px] w-[38px] flex-none rounded-[9px]"
                  sizes="38px"
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
                  className="flex-none cursor-pointer rounded-full border-[1.5px] border-[var(--acc)] bg-transparent px-2.5 py-[5px] text-[11px] font-extrabold text-[var(--acc)]"
                >
                  Ajouter
                </button>
              </div>
            ))}
            <div className="h-4" />
          </div>

          <div className="flex flex-none flex-col gap-2 border-t border-[var(--line)] px-5 pt-3.5 pb-[18px]">
            <Row label="Sous-total" value={eur(totals.subtotal)} />
            {totals.discount > 0 && (
              <Row
                label="Remise palier 40 €"
                value={`− ${eur(totals.discount)}`}
                tone="green"
              />
            )}
            <Row
              label={feeName(mode)}
              value={totals.fee === 0 ? "Offerts" : eur(totals.fee)}
            />
            <div className="mt-0.5 flex justify-between text-[17px] font-extrabold text-[var(--ink)]">
              <span>Total</span>
              <span>{eur(totals.total)}</span>
            </div>
            <button
              type="button"
              onClick={goPay}
              disabled={totals.count === 0}
              className="mt-1.5 h-[50px] rounded-[14px] border-0 text-[14.5px] font-extrabold disabled:cursor-not-allowed"
              style={{
                background: totals.count > 0 ? "var(--acc)" : "var(--soft)",
                color: totals.count > 0 ? "#fff" : "var(--mut)",
                cursor: totals.count > 0 ? "pointer" : "not-allowed",
              }}
            >
              {totals.count > 0
                ? `Commander · ${eur(totals.total)}`
                : "Ajoutez un plat pour commander"}
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}

function Row({
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
      className={`flex justify-between text-[12.5px] ${
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

function QtyStepper({
  label,
  qty,
  onMinus,
  onPlus,
}: {
  label: string;
  qty: number;
  onMinus: () => void;
  onPlus: () => void;
}) {
  return (
    <div className="flex items-center gap-[9px]">
      <button
        type="button"
        onClick={onMinus}
        aria-label={`Retirer un ${label}`}
        className="h-6 w-6 cursor-pointer rounded-full border border-[var(--line)] bg-transparent text-[13px] leading-none text-[var(--ink)]"
      >
        −
      </button>
      <span className="min-w-3 text-center text-[12.5px] font-extrabold text-[var(--ink)]">
        {qty}
      </span>
      <button
        type="button"
        onClick={onPlus}
        aria-label={`Ajouter un ${label}`}
        className="h-6 w-6 cursor-pointer rounded-full border-0 bg-[var(--acc)] text-[13px] leading-none text-white"
      >
        +
      </button>
    </div>
  );
}
