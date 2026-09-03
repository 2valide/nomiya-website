"use client";

import { Photo } from "@/components/Photo";
import { articles, eur } from "@/lib/format";
import { trackingSteps } from "@/lib/order";
import { TRACK_MAP } from "@/lib/photos";
import { useCommande } from "./context";

export function TrackView() {
  const { mode, table, track, totals, reset, isDesktop } = useCommande();

  const onSite = mode === "table";
  const steps = trackingSteps(mode, table);

  const title = [
    "Commande confirmée",
    "En préparation",
    mode === "deliv" ? "En route" : "Bientôt prête",
    "C’est servi",
  ][track];

  const subtitle =
    track >= 3
      ? "Merci d’avoir commandé chez Nomiya."
      : mode === "deliv"
        ? "Arrivée estimée à 19 h 42 · Karim, à vélo"
        : onSite
          ? "La cuisine envoie les plats au fur et à mesure."
          : "Retrait au comptoir dans environ 14 min.";

  return (
    <div
      className="flex min-h-0 w-full flex-1 flex-col bg-[var(--bg)]"
      style={{ maxWidth: isDesktop ? 560 : undefined, margin: "0 auto" }}
    >
      <Photo
        photo={TRACK_MAP}
        className="h-[150px] flex-none"
        sizes="(min-width: 900px) 560px, 100vw"
        stripe={9}
      />

      <div className="no-scrollbar flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto px-[18px] pt-[18px] pb-[30px]">
        <span className="text-[11.5px] font-extrabold tracking-[0.6px] text-[var(--acc)]">
          COMMANDE #4821
        </span>
        <h1 className="font-[family-name:var(--disp)] text-[28px] leading-[1.15] text-[var(--ink)]">
          {title}
        </h1>
        <p className="text-[12.5px] leading-[1.5] font-semibold text-[var(--mut)]">
          {subtitle}
        </p>

        <ol className="mt-[18px] flex flex-col">
          {steps.map(([n, sub], i) => {
            const done = i < track;
            const current = i === track;
            const reached = done || current;
            return (
              <li key={n} className="flex items-start gap-[13px]">
                <div className="flex w-[18px] flex-none flex-col items-center">
                  <span
                    className="h-3.5 w-3.5 rounded-full border-2"
                    style={{
                      borderColor: reached ? "var(--acc)" : "var(--line)",
                      background: reached ? "var(--acc)" : "transparent",
                      animation: current
                        ? "nmy-pulse 1.4s ease-in-out infinite"
                        : "none",
                    }}
                  />
                  <span
                    className="w-0.5"
                    style={{
                      height: i === steps.length - 1 ? 0 : 34,
                      background: done ? "var(--acc)" : "var(--line)",
                    }}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-0.5 pb-3.5">
                  <span
                    className="text-[13.5px] font-extrabold"
                    style={{ color: reached ? "var(--ink)" : "var(--mut)" }}
                  >
                    {n}
                  </span>
                  <span className="text-[11.5px] font-semibold text-[var(--mut)]">
                    {sub}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-1 flex flex-col gap-2 rounded-card border border-[var(--line)] bg-[var(--sf)] px-[15px] py-3.5">
          <div className="flex justify-between text-[13px] font-bold text-[var(--ink)]">
            <span>{articles(totals.count)}</span>
            <span>{eur(totals.total)}</span>
          </div>
          <span className="text-[11.5px] leading-[1.45] font-semibold text-[var(--mut)]">
            {onSite
              ? "L’addition sera présentée en fin de repas."
              : "Un reçu vous a été envoyé par e-mail."}
          </span>
        </div>

        <button
          type="button"
          onClick={reset}
          className="mt-3.5 cursor-pointer rounded-[14px] border-[1.5px] border-[var(--line)] bg-transparent p-[13px] text-[13px] font-extrabold text-[var(--ink)]"
        >
          Nouvelle commande
        </button>
      </div>
    </div>
  );
}
