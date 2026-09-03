"use client";

import { useCommande } from "./context";

const TABLE_COUNT = 12;

export function TablePicker() {
  const { goHome, chooseTable, table, isDesktop } = useCommande();

  return (
    <div
      className="flex w-full flex-1 flex-col bg-[var(--bg)] px-5 py-[22px]"
      style={{ maxWidth: isDesktop ? 560 : undefined, margin: "0 auto" }}
    >
      <button
        type="button"
        onClick={goHome}
        aria-label="Revenir au choix du mode"
        className="h-[34px] w-[34px] cursor-pointer self-start rounded-full border-0 bg-[var(--soft)] text-[16px] text-[var(--ink)]"
      >
        ‹
      </button>

      <h1 className="mt-5 font-[family-name:var(--disp)] text-[29px] leading-[1.1] text-[var(--ink)]">
        Vous êtes à table
      </h1>
      <p className="mt-2 text-[13px] leading-[1.5] font-semibold text-[var(--mut)]">
        Scannez le QR de la table ou choisissez son numéro. La commande part
        directement en cuisine.
      </p>

      <div className="mt-[22px] flex h-[150px] flex-col items-center justify-center gap-2 rounded-panel border-[1.5px] border-dashed border-[var(--line)]">
        <div className="h-14 w-14 rounded-field bg-[repeating-linear-gradient(45deg,var(--ink)_0_4px,transparent_4px_8px)] opacity-50" />
        <span className="font-mono text-[10px] text-[var(--mut)]">
          scanner le QR de la table
        </span>
      </div>

      <span className="mt-[22px] text-[12px] font-extrabold text-[var(--ink)]">
        Ou choisir la table
      </span>
      <div className="mt-2.5 grid grid-cols-4 gap-[9px]">
        {Array.from({ length: TABLE_COUNT }, (_, i) => i + 1).map((n) => {
          const on = table === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => chooseTable(n)}
              className="h-[46px] cursor-pointer rounded-field border-[1.5px] text-[14px] font-extrabold"
              style={{
                borderColor: on ? "var(--acc)" : "var(--line)",
                background: on ? "var(--soft)" : "var(--sf)",
                color: on ? "var(--acc)" : "var(--ink)",
              }}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}
