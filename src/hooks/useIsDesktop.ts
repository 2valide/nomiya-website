"use client";

import { useSyncExternalStore } from "react";
import { DESKTOP_BREAKPOINT } from "@/lib/commande-config";

const query = `(min-width: ${DESKTOP_BREAKPOINT}px)`;

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/**
 * Vrai au-delà de 900 px, comme dans le prototype.
 *
 * Le rendu serveur part du mobile — c'est la mise en page par défaut du projet,
 * et celle qui dégrade le mieux si le JS tarde.
 */
export function useIsDesktop(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
