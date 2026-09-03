/** Informations réelles du restaurant, partagées par les trois écrans. */

export const RESTAURANT = {
  name: "Nomiya",
  phone: "01 46 37 49 02",
  phoneHref: "tel:+33146374902",
  street: "211 bis avenue Charles de Gaulle",
  postcode: "92200",
  city: "Neuilly-sur-Seine",
  addressLine: "211 BIS AV. CHARLES DE GAULLE · NEUILLY-SUR-SEINE",
  metro: "Métro Pont de Neuilly, ligne 1 · deux minutes à pied",
  since: "NEUILLY-SUR-SEINE · DEPUIS 2009",
} as const;

export const HOURS = [
  { d: "Lundi au vendredi", h: "12 h – 15 h · 19 h – 23 h" },
  { d: "Samedi", h: "19 h – 23 h" },
  { d: "Dimanche", h: "19 h – 23 h" },
] as const;
