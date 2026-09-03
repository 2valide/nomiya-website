"use client";

import Link from "next/link";
import { Photo } from "@/components/Photo";
import { COMMANDE_HERO, COMMANDE_MODES } from "@/lib/photos";
import { DISH_COUNT } from "@/lib/menu-data";
import { HOURS, RESTAURANT } from "@/lib/restaurant";
import type { OrderMode } from "@/lib/order";
import { useCommande } from "./context";

const MODES: {
  mode: OrderMode;
  title: string;
  sub: string;
  cta: string;
}[] = [
  {
    mode: "deliv",
    title: "Livraison",
    sub: "Neuilly et communes limitrophes, 25 à 35 minutes. Offerte dès 30 €.",
    cta: "Commander en livraison",
  },
  {
    mode: "pickup",
    title: "À emporter",
    sub: "Prêt en quinze minutes, retrait au comptoir. 5 % de remise.",
    cta: "Commander à emporter",
  },
  {
    mode: "table",
    title: "Sur place",
    sub: "Salle et terrasse. Scannez le QR de votre table, la commande part en cuisine.",
    cta: "Commander à table",
  },
];

export function ModeHome() {
  const { isDesktop, chooseMode, goTable } = useCommande();

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-[var(--bg)]">
      <div className="relative overflow-hidden bg-nuit">
        <Photo
          photo={COMMANDE_HERO}
          className="absolute inset-0"
          sizes="100vw"
          priority
          tone="dark"
          stripe={14}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,14,12,.62)_0%,rgba(16,14,12,.3)_40%,rgba(16,14,12,.92)_100%)]" />
        <div
          className={`relative z-[2] mx-auto flex w-full flex-col justify-end gap-3.5 ${
            isDesktop
              ? "max-w-[1100px] px-8 pt-[26px] pb-[34px]"
              : "px-5 pt-[18px] pb-6"
          }`}
          style={{ minHeight: isDesktop ? 320 : 250 }}
        >
          <Link
            href="/"
            className="self-start text-[11px] font-extrabold tracking-[0.6px] text-white/60 hover:text-white"
          >
            ‹ RETOUR AU SITE
          </Link>
          <span className="font-[family-name:var(--disp)] text-[clamp(34px,6vw,54px)] leading-none tracking-[-0.8px] text-white">
            {RESTAURANT.name}
          </span>
          <span className="text-[12.5px] font-bold tracking-[0.4px] text-white/[0.62]">
            {RESTAURANT.addressLine}
          </span>
          <div className="flex flex-wrap gap-x-[18px] gap-y-2 text-[12px] font-bold text-white">
            <span>Ouvert jusqu’à 23 h</span>
            <span className="text-white/30">·</span>
            <span>{DISH_COUNT} plats à la carte</span>
            <span className="text-white/30">·</span>
            <span>Prix moyen 16 €</span>
          </div>
        </div>
      </div>

      <div
        className={`mx-auto flex w-full flex-col gap-[18px] ${
          isDesktop
            ? "max-w-[1100px] px-8 pt-[34px] pb-10"
            : "px-[18px] pt-[22px] pb-[30px]"
        }`}
      >
        <div className="flex flex-col gap-[5px]">
          <span className="text-[10.5px] font-extrabold tracking-[1.8px] text-[var(--acc)]">
            COMMANDER
          </span>
          <h1 className="font-[family-name:var(--disp)] text-[clamp(24px,3.4vw,34px)] leading-[1.1] text-[var(--ink)]">
            Comment souhaitez-vous dîner&nbsp;?
          </h1>
        </div>

        <div
          className={`grid gap-3 ${
            isDesktop ? "grid-cols-[repeat(3,minmax(0,1fr))]" : "grid-cols-1"
          }`}
        >
          {MODES.map((m) => (
            <button
              key={m.mode}
              type="button"
              onClick={() => (m.mode === "table" ? goTable() : chooseMode(m.mode))}
              className="flex cursor-pointer flex-col overflow-hidden rounded-panel border border-[var(--line)] bg-[var(--sf)] p-0 text-left"
            >
              <Photo
                photo={COMMANDE_MODES[m.mode]}
                className="w-full"
                style={{ height: isDesktop ? 150 : 112 }}
                sizes="(min-width: 900px) 360px, 92vw"
                stripe={9}
              />
              <span className="flex flex-1 flex-col gap-1.5 px-[17px] pt-[15px] pb-[17px]">
                <span className="text-[16.5px] font-extrabold text-[var(--ink)]">
                  {m.title}
                </span>
                <span className="text-[12px] leading-[1.5] font-medium text-[var(--mut)]">
                  {m.sub}
                </span>
                <span className="mt-1.5 text-[12px] font-extrabold text-[var(--acc)]">
                  {m.cta} ›
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-[5px] rounded-[18px] bg-[var(--tint)] px-[17px] py-[15px]">
          <span className="text-[12.5px] font-extrabold text-[var(--tinkc)]">
            Livraison offerte dès 30 € · 5 € de remise dès 40 €
          </span>
          <span className="text-[11.5px] leading-[1.5] font-semibold text-[var(--tinkc)] opacity-[0.78]">
            Les formules du midi sont 15 % moins chères qu’à la carte, du lundi
            au vendredi.
          </span>
        </div>

        <div
          className={`grid gap-3 ${
            isDesktop ? "grid-cols-[repeat(2,minmax(0,1fr))]" : "grid-cols-1"
          }`}
        >
          <div className="flex flex-col gap-[9px] rounded-[18px] border border-[var(--line)] px-[18px] py-4">
            <span className="text-[10px] font-extrabold tracking-[1.4px] text-[var(--mut)]">
              HORAIRES
            </span>
            {HOURS.map((h) => (
              <div
                key={h.d}
                className="flex justify-between gap-3 text-[12.5px]"
              >
                <span className="font-bold text-[var(--ink)]">{h.d}</span>
                <span className="text-right font-semibold text-[var(--mut)]">
                  {h.h}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-[9px] rounded-[18px] border border-[var(--line)] px-[18px] py-4">
            <span className="text-[10px] font-extrabold tracking-[1.4px] text-[var(--mut)]">
              UNE QUESTION
            </span>
            <span className="text-[12.5px] leading-[1.55] font-semibold text-[var(--mut)]">
              Allergènes, commande de groupe, plat hors carte : appelez la
              salle, on décroche pendant le service.
            </span>
            <a
              href={RESTAURANT.phoneHref}
              className="text-[14px] font-extrabold text-[var(--acc)]"
            >
              {RESTAURANT.phone}
            </a>
          </div>
        </div>
        <div className="h-2" />
      </div>
    </div>
  );
}
