/**
 * Thèmes de l'app de commande.
 *
 * Le prototype exposait trois variantes dans les Tweaks. On les garde sous forme
 * de variables CSS posées sur la racine de l'app : chaque composant lit
 * `var(--acc)`, `var(--ink)`… et suit donc le thème sans condition en JS.
 */

export type ThemeName = "Encre & vermillon" | "Nuit indigo" | "Papier & sumi";

export type Theme = {
  /** Fond d'écran. */
  bg: string;
  /** Surface : cartes, en-têtes, panneaux. */
  sf: string;
  /** Texte principal. */
  ink: string;
  /** Texte secondaire, descriptions. */
  mut: string;
  /** Filets et bordures. */
  line: string;
  /** Couleur d'action — la seule qui ajoute au panier. */
  acc: string;
  /** Fond secondaire, sidebar, option sélectionnée. */
  soft: string;
  /** Fond du bandeau de palier. */
  tint: string;
  /** Texte du bandeau de palier. */
  tinkc: string;
  /** Fond de la barre de panier flottante. */
  elev: string;
  /** Police d'affichage. */
  disp: string;
};

const SERIF = "'Instrument Serif', Georgia, serif";

export const THEMES: Record<ThemeName, Theme> = {
  "Encre & vermillon": {
    bg: "#FBF8F4",
    sf: "#FFFFFF",
    ink: "#171310",
    mut: "#8A8078",
    line: "rgba(23,19,16,.09)",
    acc: "#C5361D",
    soft: "#F3EFE8",
    tint: "#FFF7EC",
    tinkc: "#8A5B06",
    elev: "#171310",
    disp: SERIF,
  },
  "Nuit indigo": {
    bg: "#14161C",
    sf: "#1B1E27",
    ink: "#F1EEE8",
    mut: "#8F94A3",
    line: "rgba(255,255,255,.10)",
    acc: "#E8734A",
    soft: "#232733",
    tint: "#232733",
    tinkc: "#E8B34A",
    elev: "#E8734A",
    disp: SERIF,
  },
  "Papier & sumi": {
    bg: "#F6F5F1",
    sf: "#FFFFFF",
    ink: "#1B1A17",
    mut: "#7C7970",
    line: "rgba(27,26,23,.10)",
    acc: "#1B1A17",
    soft: "#EDEBE4",
    tint: "#EDEBE4",
    tinkc: "#4A473F",
    elev: "#1B1A17",
    disp: "var(--font-manrope), system-ui, sans-serif",
  },
};

export const DEFAULT_THEME: ThemeName = "Encre & vermillon";

/** Variables CSS à poser sur la racine de l'app. */
export function themeVars(theme: Theme): React.CSSProperties {
  return {
    "--bg": theme.bg,
    "--sf": theme.sf,
    "--ink": theme.ink,
    "--mut": theme.mut,
    "--line": theme.line,
    "--acc": theme.acc,
    "--soft": theme.soft,
    "--tint": theme.tint,
    "--tinkc": theme.tinkc,
    "--elev": theme.elev,
    "--disp": theme.disp,
  } as React.CSSProperties;
}
