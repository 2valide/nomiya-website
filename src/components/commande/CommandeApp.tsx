"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { COMMANDE_CONFIG, upsellLevel } from "@/lib/commande-config";
import { OPTION_GROUPS, type Dish } from "@/lib/menu-data";
import {
  computeTotals,
  initialSelection,
  modeLabel as buildModeLabel,
  optionLabel,
  tierState,
  toggleOption,
  unitPrice,
  type CartLine,
  type OrderMode,
  type Selection,
} from "@/lib/order";
import { THEMES, themeVars } from "@/lib/themes";
import { CommandeProvider, type View } from "./context";
import { ModeHome } from "./ModeHome";
import { TablePicker } from "./TablePicker";
import { MenuMobile } from "./MenuMobile";
import { MenuDesktop } from "./MenuDesktop";
import { CartView } from "./CartView";
import { PayView } from "./PayView";
import { TrackView } from "./TrackView";
import { DishSheet } from "./DishSheet";
import { CartBar } from "./CartBar";

/** Cadence de la simulation de suivi de commande. */
const TRACK_STEP_MS = 4000;

export function CommandeApp() {
  const config = COMMANDE_CONFIG;
  const theme = THEMES[config.theme];
  const upsell = upsellLevel(config.upsells);
  const isDesktop = useIsDesktop();

  const [view, setView] = useState<View>("home");
  const [mode, setMode] = useState<OrderMode>("deliv");
  const [table, setTable] = useState(0);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [slot, setSlot] = useState(0);
  const [pay, setPay] = useState(0);
  const [promo, setPromo] = useState("");
  const [track, setTrack] = useState(0);
  const [railTab, setRailTab] = useState<"Boissons" | "Desserts">("Boissons");

  const [sheet, setSheet] = useState<Dish | null>(null);
  const [selection, setSelection] = useState<Selection>({});
  const [sheetQty, setSheetQty] = useState(1);
  const [sheetNote, setSheetNote] = useState("");

  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const stopTimer = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);
  useEffect(() => stopTimer, [stopTimer]);

  const totals = useMemo(
    () => computeTotals(cart, mode, promo),
    [cart, mode, promo],
  );
  const tier = useMemo(
    () => tierState(totals.subtotal, mode, table),
    [totals.subtotal, mode, table],
  );

  const addLine = useCallback(
    (dish: Dish, unit: number, qty: number, opts: string) => {
      setCart((c) => [
        ...c,
        {
          key: `${dish.id}-${Date.now()}-${c.length}`,
          n: dish.n,
          unit,
          qty,
          opts,
          cat: dish.cat,
        },
      ]);
    },
    [],
  );

  const quickAdd = useCallback(
    (dish: Dish) => addLine(dish, dish.p, 1, ""),
    [addLine],
  );

  const openDish = useCallback(
    (dish: Dish) => {
      if (dish.g.length === 0) {
        quickAdd(dish);
        return;
      }
      setSheet(dish);
      setSelection(initialSelection(dish));
      setSheetQty(1);
      setSheetNote("");
    },
    [quickAdd],
  );

  const pickOption = useCallback(
    (groupId: string, index: number) => {
      if (!sheet) return;
      const group = sheet.g
        .map((k) => OPTION_GROUPS[k])
        .find((g) => g.id === groupId);
      if (!group) return;
      setSelection((sel) => toggleOption(sel, group, index));
    },
    [sheet],
  );

  const addSheetToCart = useCallback(() => {
    if (!sheet) return;
    addLine(
      sheet,
      unitPrice(sheet, selection),
      sheetQty,
      optionLabel(sheet, selection, sheetNote),
    );
    setSheet(null);
  }, [addLine, selection, sheet, sheetNote, sheetQty]);

  const bump = useCallback((key: string, delta: number) => {
    setCart((c) =>
      c
        .map((l) => (l.key === key ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const startTracking = useCallback(() => {
    setView("track");
    setTrack(0);
    stopTimer();
    timer.current = setInterval(() => {
      setTrack((t) => {
        if (t >= 3) {
          stopTimer();
          return t;
        }
        return t + 1;
      });
    }, TRACK_STEP_MS);
  }, [stopTimer]);

  const reset = useCallback(() => {
    stopTimer();
    setView("home");
    setCart([]);
    setQuery("");
    setPromo("");
    setTrack(0);
  }, [stopTimer]);

  const value = {
    config,
    theme,
    upsell,
    isDesktop,
    view,
    mode,
    table,
    query,
    cart,
    totals,
    tier,
    showTier: upsell > 0 && mode !== "table",
    modeLabel: buildModeLabel(mode, table),
    slot,
    pay,
    promo,
    track,
    railTab,
    sheet,
    selection,
    sheetQty,
    sheetNote,
    setQuery,
    chooseMode: (m: OrderMode) => {
      setMode(m);
      setSlot(0);
      setView("menu");
    },
    chooseTable: (t: number) => {
      setTable(t);
      setMode("table");
      setSlot(0);
      setPay(1);
      setView("menu");
    },
    setSlot,
    setPay,
    setPromo,
    setRailTab,
    openDish,
    quickAdd,
    closeSheet: () => setSheet(null),
    pickOption,
    setSheetQty,
    setSheetNote,
    addSheetToCart,
    bump,
    goHome: () => setView("home"),
    goTable: () => setView("table"),
    goMenu: () => setView("menu"),
    goCart: () => setView("cart"),
    goPay: () => {
      if (totals.count > 0) setView("pay");
    },
    startTracking,
    reset,
  };

  return (
    <CommandeProvider value={value}>
      <div
        style={themeVars(theme)}
        className="relative flex h-screen w-full flex-col overflow-hidden bg-[var(--bg)]"
      >
        {view === "home" && <ModeHome />}
        {view === "table" && <TablePicker />}
        {view === "menu" && (isDesktop ? <MenuDesktop /> : <MenuMobile />)}
        {view === "cart" && <CartView />}
        {view === "pay" && <PayView />}
        {view === "track" && <TrackView />}
        <CartBar />
        <DishSheet />
      </div>
    </CommandeProvider>
  );
}
