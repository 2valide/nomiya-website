/** Règles de réservation : jours ouverts, créneaux, complets, validation. */

const DOW = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"];
const MON = [
  "janv",
  "févr",
  "mars",
  "avr",
  "mai",
  "juin",
  "juil",
  "août",
  "sept",
  "oct",
  "nov",
  "déc",
];

export const LUNCH_SLOTS = [
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "14:00",
];

export const DINNER_SLOTS = [
  "19:00",
  "19:15",
  "19:30",
  "19:45",
  "20:00",
  "20:15",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

/** Créneaux déjà pleins pour les tables de quatre et plus. */
const BUSY_SLOTS = ["20:00", "13:00", "21:00"];

/** Nombre de jours proposés dans le sélecteur. */
export const DAYS_AHEAD = 10;

export type ReservationDay = {
  index: number;
  /** « lun », « mar »… */
  dow: string;
  dayOfMonth: number;
  month: string;
  /** Le service du midi est fermé le samedi et le dimanche. */
  weekend: boolean;
};

export function buildDays(from: Date): ReservationDay[] {
  return Array.from({ length: DAYS_AHEAD }, (_, i) => {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + i);
    const day = d.getDay();
    return {
      index: i,
      dow: DOW[day],
      dayOfMonth: d.getDate(),
      month: MON[d.getMonth()],
      weekend: day === 0 || day === 6,
    };
  });
}

/** « Lun 28 août ». */
export const dayLabel = (d: ReservationDay): string =>
  `${d.dow.charAt(0).toUpperCase()}${d.dow.slice(1)} ${d.dayOfMonth} ${d.month}`;

export const isSlotFull = (slot: string, size: number): boolean =>
  BUSY_SLOTS.includes(slot) && size >= 4;

/** Un créneau tient s'il existe, n'est pas complet, et si le service est ouvert. */
export function isSlotValid(
  slot: string,
  size: number,
  weekend: boolean,
): boolean {
  if (!slot) return false;
  if (isSlotFull(slot, size)) return false;
  if (weekend && LUNCH_SLOTS.includes(slot)) return false;
  return true;
}

/** Premier créneau libre du jour, pour rattraper un choix devenu impossible. */
export function firstFreeSlot(size: number, weekend: boolean): string {
  const pool = weekend ? DINNER_SLOTS : [...LUNCH_SLOTS, ...DINNER_SLOTS];
  return pool.find((s) => !isSlotFull(s, size)) ?? "";
}

export type Zone = { id: string; n: string; d: string };

export const ZONES: Zone[] = [
  { id: "salle", n: "En salle", d: "La grande table ou les banquettes." },
  { id: "comptoir", n: "Au comptoir", d: "Face au chef, deux places maximum." },
  {
    id: "terrasse",
    n: "En terrasse",
    d: "Selon la météo, quelques tables sur l’avenue.",
  },
];

export const OCCASIONS = [
  "Anniversaire",
  "Dîner d’affaires",
  "En amoureux",
  "Avec des enfants",
];

/** Un numéro français saisi librement compte au moins huit chiffres. */
export const isPhoneValid = (phone: string): boolean =>
  phone.replace(/\D/g, "").length >= 8;

/** Référence de dossier, communiquée au client. */
export const bookingRef = (dayIndex: number, size: number): string =>
  `NMY-${4200 + dayIndex * 7 + size}`;
