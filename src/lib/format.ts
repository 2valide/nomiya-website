/** Prix à la française : virgule décimale, espace insécable avant l'euro. */
export const eur = (n: number): string =>
  `${n.toFixed(2).replace(".", ",")} €`;

/** « 4 articles » / « 1 article ». */
export const articles = (n: number): string =>
  `${n} ${n > 1 ? "articles" : "article"}`;

/** « 4 personnes » / « 1 personne ». */
export const personnes = (n: number): string =>
  `${n} ${n > 1 ? "personnes" : "personne"}`;
