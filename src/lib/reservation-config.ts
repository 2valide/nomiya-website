/**
 * Réglages restaurateur de la page de réservation.
 *
 * Le prototype les exposait dans les Tweaks ; ce sont des paramètres de salle,
 * qui viendraient du back-office une fois l'app branchée.
 */
export const RESERVATION_CONFIG = {
  /** Au-delà, on renvoie vers le téléphone pour réunir les tables du fond. */
  maxCouverts: 8,
  /** Propose les étiquettes d'occasion sous le champ de précision. */
  afficherOccasions: true,
  /** Le comptoir accepte-t-il les réservations ? */
  comptoirDisponible: true,
} as const;
