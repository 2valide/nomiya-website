/** Contenu éditorial de la landing page. */

export const NAV = [
  { n: "La maison", href: "#maison" },
  { n: "La carte", href: "/commande" },
  { n: "Horaires & accès", href: "#infos" },
] as const;

export const STRIP = [
  { n: "Sur place", d: "Salle et terrasse, 32 couverts" },
  { n: "À emporter", d: "Prêt en quinze minutes" },
  { n: "Livraison", d: "Neuilly et alentours, 25-35 min" },
  { n: "Prix moyen", d: "16 € à la carte" },
] as const;

export const SIGNATURES = [
  {
    kicker: "LE PLATEAU",
    n: "Plateau Nomiya, 18 pièces",
    d: "Saumon, thon, crevette, avocat et california, dressés au moment. C’est le plat que la salle commande le plus, et celui qu’on conseille pour une première visite.",
    price: "26,90 €",
    photo: "signaturePlateau",
  },
  {
    kicker: "LE COMPTOIR",
    n: "Tartare saumon-avocat",
    d: "Saumon taillé au couteau, avocat, ciboule et sésame torréfié. Une entrée simple qui dit tout du poisson servi ici.",
    price: "12,90 €",
    photo: "signatureTartare",
  },
  {
    kicker: "LE CHARBON",
    n: "Yakitori bœuf au fromage",
    d: "Bœuf finement roulé, fondant à cœur, passé sur le charbon et laqué à la sauce tare. À prendre par deux, jamais par une.",
    price: "7,50 €",
    photo: "signatureYakitori",
  },
] as const;

export const SERVICES = [
  {
    hours: "12 H – 15 H, DU LUNDI AU VENDREDI",
    n: "Le déjeuner",
    d: "Formules servies en vingt minutes : une entrée, un plat, une boisson. La salle tourne vite, on ne vous fait pas attendre.",
    note: "Formules de 16,90 € à 22,90 €",
    photo: "dejeuner",
  },
  {
    hours: "19 H – 23 H, TOUS LES JOURS",
    n: "Le dîner",
    d: "Le comptoir prend son temps : plateaux à partager, brochettes au charbon, saké tiède. Réservation conseillée le week-end.",
    note: "Réservation au 01 46 37 49 02",
    photo: "diner",
  },
] as const;

export const REVIEWS = [
  {
    stars: "★★★★★",
    t: "Une carte originale et variée, un service sympathique. Très bons plats.",
    a: "Avis client",
  },
  {
    stars: "★★★★★",
    t: "Un bon restaurant japonais les yeux fermés. Excellente cuisine.",
    a: "Avis client",
  },
  {
    stars: "★★★★☆",
    t: "Les plats sont copieux et le service rapide. Un bon japonais de quartier.",
    a: "Avis client",
  },
] as const;

export const FOOTER_LINKS = [
  { n: "La carte", href: "/commande" },
  { n: "Réserver", href: "/reservation" },
  { n: "Horaires & accès", href: "#infos" },
  { n: "Mentions légales", href: "#" },
] as const;
