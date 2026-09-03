"use client";

import { useEffect } from "react";
import { Photo } from "@/components/Photo";
import { eur } from "@/lib/format";
import { groupsOf, unitPrice } from "@/lib/order";
import { dishPhoto } from "@/lib/photos";
import { useCommande } from "./context";
import { useSheetAdds } from "./upsells";

/**
 * Fiche plat.
 *
 * Bottom sheet par défaut, page pleine si la variante est activée. Cercle =
 * choix unique, carré = choix multiple ; le supplément est toujours à droite,
 * « Inclus » quand il est gratuit.
 */
export function DishSheet() {
  const {
    sheet,
    selection,
    sheetQty,
    setSheetQty,
    sheetNote,
    setSheetNote,
    pickOption,
    closeSheet,
    addSheetToCart,
    quickAdd,
    upsell,
    isDesktop,
    config,
  } = useCommande();

  const sheetAdds = useSheetAdds();
  const fullPage = config.ficheplat === "Page pleine";

  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSheet();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheet, closeSheet]);

  if (!sheet) return null;

  const groups = groupsOf(sheet);
  const unit = unitPrice(sheet, selection);
  const withScrim = isDesktop || !fullPage;

  return (
    <>
      {withScrim && (
        <div
          onClick={closeSheet}
          className="absolute inset-0 z-[5] bg-ink/45"
          aria-hidden
        />
      )}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={sheet.n}
        className="absolute right-0 left-0 z-[6] mx-auto flex w-full flex-col overflow-hidden bg-[var(--sf)] elev-sheet"
        style={{
          top: isDesktop ? "6vh" : fullPage ? 0 : 96,
          bottom: isDesktop ? "6vh" : 0,
          maxWidth: isDesktop ? 580 : undefined,
          borderRadius: isDesktop
            ? 20
            : fullPage
              ? 0
              : "24px 24px 0 0",
        }}
      >
        <Photo
          photo={dishPhoto(sheet)}
          className="flex-none"
          style={{ height: isDesktop ? 200 : fullPage ? 210 : 150 }}
          sizes="(min-width: 900px) 580px, 100vw"
          stripe={8}
        >
          <button
            type="button"
            onClick={closeSheet}
            aria-label="Fermer la fiche"
            className="absolute top-3 right-3 h-[30px] w-[30px] cursor-pointer rounded-full border-0 bg-white/90 text-[15px] leading-none text-ink"
          >
            ×
          </button>
        </Photo>

        <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-[18px] pt-4 pb-5">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-[19px] leading-[1.2] font-extrabold text-[var(--ink)]">
              {sheet.n}
            </h2>
            <p className="text-[12.5px] leading-[1.45] font-medium text-[var(--mut)]">
              {sheet.d}
            </p>
            <span className="mt-0.5 text-[18px] font-extrabold text-[var(--acc)]">
              {eur(sheet.p)}
            </span>
          </div>

          {groups.map((g) => {
            const required = g.type === "single" && g.req;
            const hint = required
              ? "Obligatoire"
              : g.type === "multi"
                ? `Jusqu’à ${g.max}`
                : "Facultatif";
            return (
              <fieldset key={g.id} className="mt-5 flex flex-col gap-[9px]">
                <legend className="flex items-baseline gap-2">
                  <span className="text-[14px] font-extrabold text-[var(--ink)]">
                    {g.label}
                  </span>
                  <span
                    className="rounded-[5px] bg-[var(--soft)] px-1.5 py-0.5 text-[10.5px] font-bold"
                    style={{ color: required ? "var(--acc)" : "var(--mut)" }}
                  >
                    {hint}
                  </span>
                </legend>
                <div className="flex flex-col gap-[7px]">
                  {g.opts.map((o, i) => {
                    const value = selection[g.id];
                    const on =
                      g.type === "single"
                        ? value === i
                        : Array.isArray(value) && value.includes(i);
                    return (
                      <button
                        key={o.n}
                        type="button"
                        onClick={() => pickOption(g.id, i)}
                        aria-pressed={on}
                        className="flex w-full cursor-pointer items-center gap-2.5 rounded-field border-[1.5px] px-[13px] py-[11px] text-left"
                        style={{
                          borderColor: on ? "var(--acc)" : "var(--line)",
                          background: on ? "var(--soft)" : "transparent",
                        }}
                      >
                        <span
                          className="flex h-[18px] w-[18px] flex-none items-center justify-center border-[1.5px] text-[11px] leading-none text-white"
                          style={{
                            borderRadius: g.type === "single" ? "50%" : 6,
                            borderColor: on ? "var(--acc)" : "var(--line)",
                            background: on ? "var(--acc)" : "transparent",
                          }}
                        >
                          {on ? "✓" : ""}
                        </span>
                        <span className="flex-1 text-[13.5px] font-semibold text-[var(--ink)]">
                          {o.n}
                        </span>
                        <span
                          className="text-[13px] font-bold"
                          style={{ color: o.p ? "var(--acc)" : "var(--mut)" }}
                        >
                          {o.p ? `+ ${eur(o.p)}` : "Inclus"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}

          {upsell >= 1 && (
            <div className="mt-5 flex flex-col gap-[9px]">
              <span className="text-[14px] font-extrabold text-[var(--ink)]">
                On y ajoute souvent
              </span>
              {sheetAdds.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => quickAdd(a)}
                  className="flex w-full cursor-pointer items-center gap-[11px] rounded-field border-[1.5px] border-[var(--line)] bg-transparent px-[13px] py-2.5 text-left"
                >
                  <Photo
                    photo={dishPhoto(a)}
                    className="h-[34px] w-[34px] flex-none rounded-[9px]"
                    sizes="34px"
                    stripe={6}
                    hideCaption
                  />
                  <span className="flex-1 text-[13px] font-bold text-[var(--ink)]">
                    {a.n}
                  </span>
                  <span className="text-[12.5px] font-extrabold text-[var(--acc)]">
                    + {eur(a.p)}
                  </span>
                </button>
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-col gap-2">
            <label
              htmlFor="nmy-note"
              className="text-[14px] font-extrabold text-[var(--ink)]"
            >
              Note pour la cuisine
            </label>
            <input
              id="nmy-note"
              value={sheetNote}
              onChange={(e) => setSheetNote(e.target.value)}
              placeholder="Sans wasabi, sauce à part…"
              className="w-full rounded-field border-[1.5px] border-[var(--line)] bg-[var(--bg)] px-[13px] py-3 text-[13px] font-medium text-[var(--ink)] outline-none"
            />
          </div>
        </div>

        <div className="flex flex-none items-center gap-3 border-t border-[var(--line)] bg-[var(--sf)] px-4 pt-3 pb-5">
          <div className="flex flex-none items-center gap-3 rounded-full border-[1.5px] border-[var(--line)] px-2.5 py-1.5">
            <button
              type="button"
              onClick={() => setSheetQty(Math.max(1, sheetQty - 1))}
              aria-label="Diminuer la quantité"
              className="w-4 cursor-pointer border-0 bg-transparent text-[17px] leading-none text-[var(--ink)]"
            >
              −
            </button>
            <span className="min-w-3.5 text-center text-[14px] font-extrabold text-[var(--ink)]">
              {sheetQty}
            </span>
            <button
              type="button"
              onClick={() => setSheetQty(sheetQty + 1)}
              aria-label="Augmenter la quantité"
              className="w-4 cursor-pointer border-0 bg-transparent text-[17px] leading-none text-[var(--acc)]"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={addSheetToCart}
            className="flex h-[50px] flex-1 cursor-pointer items-center justify-center rounded-[14px] border-0 bg-[var(--acc)] text-[14.5px] font-extrabold text-white"
          >
            Ajouter · {eur(unit * sheetQty)}
          </button>
        </div>
      </div>
    </>
  );
}
