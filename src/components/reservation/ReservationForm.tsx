"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { personnes } from "@/lib/format";
import { RESTAURANT } from "@/lib/restaurant";
import { RESERVATION_CONFIG } from "@/lib/reservation-config";
import {
  bookingRef,
  buildDays,
  dayLabel,
  DINNER_SLOTS,
  firstFreeSlot,
  isPhoneValid,
  isSlotFull,
  isSlotValid,
  LUNCH_SLOTS,
  OCCASIONS,
  ZONES,
} from "@/lib/reservation";

const ACCENT = "var(--color-vermillon)";
const SOFT = "var(--color-vermillon-soft)";
const LINE = "rgba(23,19,16,.12)";

type View = "form" | "done";

export function ReservationForm({ todayIso }: { todayIso: string }) {
  const config = RESERVATION_CONFIG;
  const maxSeats = Math.max(4, config.maxCouverts);
  const zones = useMemo(
    () => ZONES.filter((z) => config.comptoirDisponible || z.id !== "comptoir"),
    [config.comptoirDisponible],
  );
  // La date de départ vient du serveur : le rendu client la reprend telle quelle,
  // sans risque de décalage à l'hydratation.
  const days = useMemo(() => buildDays(new Date(todayIso)), [todayIso]);

  const [view, setView] = useState<View>("form");
  const [size, setSize] = useState(2);
  const [dayIndex, setDayIndex] = useState(0);
  const [slot, setSlot] = useState("20:00");
  const [zone, setZone] = useState(zones[0].id);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [occasion, setOccasion] = useState("");

  const day = days[dayIndex];
  const noLunch = day.weekend;
  const slotOk = isSlotValid(slot, size, noLunch);
  const ready = slotOk && name.trim() !== "" && isPhoneValid(phone);

  const zoneLabel = (zones.find((z) => z.id === zone) ?? zones[0]).n;
  const label = dayLabel(day);

  const recap: { k: string; v: string }[] = [
    { k: "Couverts", v: personnes(size) },
    { k: "Date", v: label },
    { k: "Heure", v: slotOk ? slot : "à choisir" },
    { k: "Table", v: zoneLabel },
    { k: "Au nom de", v: name.trim() || "—" },
  ];
  if (occasion) recap.push({ k: "Occasion", v: occasion });

  const pickSize = (n: number) => {
    setSize(n);
    if (slot && isSlotFull(slot, n)) setSlot(firstFreeSlot(n, noLunch));
  };

  const pickDay = (index: number) => {
    setDayIndex(index);
    if (days[index].weekend && LUNCH_SLOTS.includes(slot)) {
      setSlot(firstFreeSlot(size, true));
    }
  };

  const submit = () => {
    if (ready) setView("done");
  };

  if (view === "done") {
    return (
      <div className="mx-auto flex max-w-[640px] flex-col items-start gap-[18px] px-6 pt-11">
        <span className="flex h-13 w-13 items-center justify-center rounded-full bg-remise text-[24px] text-white">
          ✓
        </span>
        <h1 className="font-display text-[clamp(30px,5vw,42px)] leading-[1.08]">
          Table réservée, {name.trim().split(" ")[0]}
        </h1>
        <p className="text-[14.5px] leading-[1.65] font-medium text-ink-soft">
          Nous vous attendons {label.toLowerCase()} à {slot},{" "}
          {zoneLabel.toLowerCase()}, pour {personnes(size)}.
        </p>

        <div className="flex w-full flex-col gap-2.5 rounded-panel border border-ink/8 bg-surface px-[22px] py-5">
          {recap.map((r) => (
            <div
              key={r.k}
              className="flex justify-between gap-3.5 border-b border-ink/6 pb-[9px] text-[13.5px]"
            >
              <span className="font-semibold text-mut">{r.k}</span>
              <span className="text-right font-extrabold">{r.v}</span>
            </div>
          ))}
          <span className="mt-0.5 text-[12px] leading-[1.55] font-semibold text-mut">
            Référence {bookingRef(dayIndex, size)} · un SMS de confirmation
            vient de partir.
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/commande"
            className="rounded-[14px] bg-vermillon px-[22px] py-[15px] text-[14px] font-extrabold text-white hover:bg-vermillon-dark hover:text-white"
          >
            Voir la carte
          </Link>
          <button
            type="button"
            onClick={() => setView("form")}
            className="cursor-pointer rounded-[14px] border-[1.5px] border-ink/14 bg-transparent px-[22px] py-[15px] text-[14px] font-extrabold text-ink"
          >
            Modifier la réservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-start gap-[22px] px-6 pt-[30px] min-[900px]:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex flex-col gap-3.5">
          <Card step="01 — COMBIEN ÊTES-VOUS ?">
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: maxSeats }, (_, i) => i + 1).map((n) => {
                const on = size === n;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => pickSize(n)}
                    aria-pressed={on}
                    className="h-[46px] min-w-12 cursor-pointer rounded-field border-[1.5px] px-3.5 text-[14px] font-extrabold"
                    style={{
                      borderColor: on ? ACCENT : LINE,
                      background: on ? SOFT : "#fff",
                      color: on ? ACCENT : "var(--color-ink)",
                    }}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
            <p className="text-[11.5px] leading-[1.5] font-semibold text-mut">
              Au-delà de {maxSeats} couverts, appelez la salle au{" "}
              {RESTAURANT.phone} : nous réunissons les tables du fond.
            </p>
          </Card>

          <Card step="02 — QUEL JOUR ?">
            <div className="no-scrollbar flex gap-[9px] overflow-x-auto pb-0.5">
              {days.map((d) => {
                const on = dayIndex === d.index;
                return (
                  <button
                    key={d.index}
                    type="button"
                    onClick={() => pickDay(d.index)}
                    aria-pressed={on}
                    className="flex w-[74px] flex-none cursor-pointer flex-col items-center gap-[3px] rounded-[14px] border-[1.5px] pt-[11px] pb-3"
                    style={{
                      borderColor: on ? ACCENT : LINE,
                      background: on ? SOFT : "#fff",
                    }}
                  >
                    <span
                      className="text-[10px] font-extrabold tracking-[0.6px]"
                      style={{ color: on ? ACCENT : "var(--color-mut)" }}
                    >
                      {d.dow.toUpperCase()}
                    </span>
                    <span
                      className="text-[19px] leading-[1.1] font-extrabold"
                      style={{ color: on ? ACCENT : "var(--color-ink)" }}
                    >
                      {d.dayOfMonth}
                    </span>
                    <span
                      className="text-[9.5px] font-bold"
                      style={{ color: on ? ACCENT : "var(--color-mut)" }}
                    >
                      {d.month}
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>

          <Card step="03 — À QUELLE HEURE ?" gap="gap-4">
            <Service
              name="Déjeuner"
              range="12 h – 15 h"
              closedText={noLunch ? "Fermé le midi le week-end." : undefined}
              slots={LUNCH_SLOTS}
              size={size}
              current={slot}
              onPick={setSlot}
            />
            <Service
              name="Dîner"
              range="19 h – 23 h"
              slots={DINNER_SLOTS}
              size={size}
              current={slot}
              onPick={setSlot}
            />
            <p className="text-[11.5px] leading-[1.5] font-semibold text-mut">
              La table reste tenue quinze minutes après l’heure réservée.
            </p>
          </Card>

          <Card step="04 — OÙ VOUS INSTALLER ?">
            <div className="grid grid-cols-1 gap-2.5 min-[900px]:grid-cols-3">
              {zones.map((z) => {
                const on = zone === z.id;
                return (
                  <button
                    key={z.id}
                    type="button"
                    onClick={() => setZone(z.id)}
                    aria-pressed={on}
                    className="flex cursor-pointer flex-col gap-1 rounded-[14px] border-[1.5px] px-[15px] py-[13px] text-left"
                    style={{
                      borderColor: on ? ACCENT : LINE,
                      background: on ? SOFT : "transparent",
                    }}
                  >
                    <span className="text-[13.5px] font-extrabold text-ink">
                      {z.n}
                    </span>
                    <span className="text-[11.5px] leading-[1.45] font-semibold text-mut">
                      {z.d}
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>

          <Card step="05 — VOS COORDONNÉES" gap="gap-3.5">
            <div className="grid grid-cols-1 gap-2.5 min-[900px]:grid-cols-2">
              <Field
                label="Nom"
                placeholder="Camille Roussel"
                value={name}
                onChange={setName}
                filled={name !== ""}
              />
              <Field
                label="Téléphone"
                type="tel"
                placeholder="06 12 34 56 78"
                value={phone}
                onChange={setPhone}
                filled={phone !== ""}
              />
              <Field
                label="E-mail (facultatif)"
                type="email"
                placeholder="camille@exemple.fr"
                value={email}
                onChange={setEmail}
                filled={email !== ""}
              />
            </div>

            <Field
              label="Une précision pour la salle"
              placeholder="Anniversaire, allergie, poussette, table calme…"
              value={note}
              onChange={setNote}
              filled={false}
            />

            {config.afficherOccasions && (
              <div className="flex flex-wrap gap-2">
                {OCCASIONS.map((o) => {
                  const on = occasion === o;
                  return (
                    <button
                      key={o}
                      type="button"
                      onClick={() => setOccasion(on ? "" : o)}
                      aria-pressed={on}
                      className="cursor-pointer rounded-full border-[1.5px] px-3.5 py-[9px] text-[12px] font-bold"
                      style={{
                        borderColor: on ? ACCENT : LINE,
                        background: on ? SOFT : "transparent",
                        color: on ? ACCENT : "var(--color-ink-soft)",
                      }}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        <div className="static flex flex-col gap-3 min-[900px]:sticky min-[900px]:top-6">
          <div className="flex flex-col gap-4 rounded-panel bg-ink px-6 py-[22px] text-white">
            <span className="text-[10.5px] font-extrabold tracking-[1.6px] text-white/[0.45]">
              VOTRE RÉSERVATION
            </span>
            <span className="font-display text-[28px] leading-[1.15]">
              {size} couverts, {label.toLowerCase()}
              {slotOk ? ` à ${slot}` : ""}
            </span>
            <div className="flex flex-col gap-2.5">
              {recap.map((r) => (
                <div
                  key={r.k}
                  className="flex justify-between gap-3.5 border-b border-white/10 pb-[9px] text-[13px]"
                >
                  <span className="font-semibold text-white/[0.55]">{r.k}</span>
                  <span className="text-right font-extrabold">{r.v}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={submit}
              disabled={!ready}
              className="h-13 w-full rounded-[14px] border-0 text-[14.5px] font-extrabold"
              style={{
                background: ready ? ACCENT : "rgba(255,255,255,.12)",
                color: ready ? "#fff" : "rgba(255,255,255,.45)",
                cursor: ready ? "pointer" : "not-allowed",
              }}
            >
              {!slotOk
                ? "Choisissez un créneau disponible"
                : ready
                  ? "Confirmer la réservation"
                  : "Nom et téléphone requis"}
            </button>
            <span className="text-[11px] leading-[1.5] font-semibold text-white/[0.45]">
              Confirmation immédiate par SMS. Annulation libre jusqu’à deux
              heures avant.
            </span>
          </div>

          <div className="flex flex-col gap-2 rounded-panel border border-ink/9 px-5 py-[18px]">
            <span className="text-[10.5px] font-extrabold tracking-[1.6px] text-mut">
              COMPLET SUR VOTRE CRÉNEAU ?
            </span>
            <span className="text-[12.5px] leading-[1.55] font-semibold text-mut">
              Le comptoir accepte les sans-réservation, ou commandez à emporter
              et récupérez en quinze minutes.
            </span>
            <Link
              href="/commande"
              className="text-[13px] font-extrabold text-vermillon"
            >
              Commander à emporter ›
            </Link>
          </div>
        </div>
      </div>

      {/* Barre de confirmation mobile : le récapitulatif reste à portée de pouce. */}
      <div className="fixed right-0 bottom-0 left-0 z-30 bg-[linear-gradient(180deg,rgba(251,248,244,0)_0%,var(--color-creme)_32%)] px-4 pt-3 pb-5 min-[900px]:hidden">
        <button
          type="button"
          onClick={submit}
          disabled={!ready}
          className="elev-bar flex h-14 w-full items-center gap-3 rounded-card border-0 px-[18px]"
          style={{
            background: ready ? "var(--color-ink)" : "#EDE7DE",
            color: ready ? "#fff" : "var(--color-mut-light)",
            cursor: ready ? "pointer" : "not-allowed",
          }}
        >
          <span className="flex min-w-0 flex-col items-start gap-px">
            <span className="truncate text-[14.5px] font-extrabold whitespace-nowrap">
              {size} couverts · {label}
              {slotOk ? ` · ${slot}` : ""}
            </span>
            <span className="text-[10.5px] font-semibold opacity-70">
              {ready
                ? zoneLabel
                : !slotOk
                  ? "Choisissez un créneau disponible"
                  : "Renseignez nom et téléphone"}
            </span>
          </span>
          <span className="ml-auto text-[13.5px] font-extrabold whitespace-nowrap">
            {ready ? "Confirmer" : "Incomplet"}
          </span>
        </button>
      </div>
    </>
  );
}

function Card({
  step,
  gap = "gap-[13px]",
  children,
}: {
  step: string;
  gap?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`flex flex-col ${gap} rounded-panel border border-ink/8 bg-surface px-[22px] py-5`}
    >
      <h2 className="text-[10.5px] font-extrabold tracking-[1.6px] text-mut">
        {step}
      </h2>
      {children}
    </section>
  );
}

function Service({
  name,
  range,
  closedText,
  slots,
  size,
  current,
  onPick,
}: {
  name: string;
  range: string;
  closedText?: string;
  slots: string[];
  size: number;
  current: string;
  onPick: (slot: string) => void;
}) {
  return (
    <div className="flex flex-col gap-[9px]">
      <div className="flex items-baseline gap-[9px]">
        <h3 className="text-[13.5px] font-extrabold">{name}</h3>
        <span className="text-[11px] font-bold text-mut-light">{range}</span>
      </div>
      {closedText ? (
        <p className="rounded-[10px] bg-sable px-[13px] py-[11px] text-[12px] font-semibold text-mut">
          {closedText}
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {slots.map((s) => {
            const full = isSlotFull(s, size);
            const on = current === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => !full && onPick(s)}
                disabled={full}
                aria-pressed={on}
                className="h-11 rounded-[11px] border-[1.5px] px-4 text-[13.5px] font-extrabold"
                style={{
                  borderColor: on ? ACCENT : LINE,
                  background: on ? SOFT : "transparent",
                  color: full
                    ? "#BDB4AA"
                    : on
                      ? ACCENT
                      : "var(--color-ink)",
                  cursor: full ? "not-allowed" : "pointer",
                  textDecoration: full ? "line-through" : "none",
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  filled,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  filled: boolean;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11.5px] font-extrabold text-ink-soft">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-field border-[1.5px] bg-creme px-3.5 py-[13px] text-[13.5px] font-semibold text-ink outline-none"
        style={{ borderColor: filled ? ACCENT : LINE }}
      />
    </label>
  );
}
