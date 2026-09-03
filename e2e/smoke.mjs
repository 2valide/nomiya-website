/**
 * Parcours de bout en bout des trois écrans.
 *
 * Lancer un serveur d'abord (`npm run build && npm start`), puis `npm run smoke`.
 * En développement, passez l'URL : `BASE_URL=http://127.0.0.1:3000 npm run smoke`.
 * Les captures atterrissent dans `e2e/screenshots/`.
 */
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const OUT = new URL("./screenshots/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const problems = [];
const ok = [];

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);

async function newPage(width, height) {
  const ctx = await browser.newContext({ viewport: { width, height } });
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (m.type() === "error" && !/ERR_|net::|Failed to load resource/.test(m.text()))
      problems.push(`console: ${m.text().slice(0, 200)}`);
  });
  page.on("pageerror", (e) => problems.push(`pageerror: ${e.message.slice(0, 200)}`));
  return { ctx, page };
}

/* ── Landing ─────────────────────────────────────────────── */
{
  const { ctx, page } = await newPage(1280, 900);
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const h1 = await page.locator("h1").first().textContent();
  if (!h1?.includes("Japon")) problems.push(`landing h1: ${h1}`);
  else ok.push("landing h1");
  // 0 si les photos chargent, 1 si l'aplat de repli a pris le relais.
  const fallbackCaptions = await page.locator("text=photo pleine page").count();
  ok.push(`landing hero fallback in use: ${fallbackCaptions === 1 ? "oui" : "non"}`);
  const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
  if (scrollW > 1281) problems.push(`landing horizontal overflow: ${scrollW}px`);
  else ok.push("landing no horizontal overflow");
  await page.screenshot({ path: `${OUT}shot-landing.png`, fullPage: false });
  await ctx.close();
}

/* ── Commande desktop : mode → carte → panier → paiement → suivi ── */
{
  const { ctx, page } = await newPage(1280, 900);
  await page.goto(`${BASE}/commande`, { waitUntil: "networkidle" });

  await page.getByRole("button", { name: /Livraison/ }).first().click();
  await page.waitForSelector("text=Mon panier");
  ok.push("desktop: menu + permanent cart");

  // Sidebar catégories présente, avec la première catégorie active.
  const catCount = await page.locator("aside, div").locator("text=Sushi à la pièce").count();
  ok.push(`desktop: category label found ${catCount}x`);

  // Plat sans options → ajout direct. Plat avec options → fiche.
  await page.getByRole("button", { name: /^Choisir Plateau Nomiya/ }).click();
  await page.waitForSelector('[role="dialog"]');
  ok.push("desktop: dish sheet opens");

  const addBtn = page.getByRole("button", { name: /^Ajouter · / });
  const before = await addBtn.textContent();
  // Choisir une option payante et vérifier que le total unitaire bouge.
  await page.getByRole("button", { name: /Wasabi frais râpé/ }).click();
  const after = await addBtn.textContent();
  if (before === after) problems.push(`sheet price did not change: ${before}`);
  else ok.push(`sheet price ${before?.trim()} → ${after?.trim()}`);

  await addBtn.click();
  await page.waitForSelector('[role="dialog"]', { state: "detached" });

  const cartHas = await page.locator("text=Plateau Nomiya 18 pièces").count();
  if (cartHas < 1) problems.push("cart line missing after add");
  else ok.push("desktop: cart line added");

  const tier = await page.locator("text=/Plus que .* pour la livraison offerte/").count();
  ok.push(`desktop: tier bar shown ${tier}x`);

  // Scroll de la liste → catégorie active suivie + scroll infini.
  const sectionsBefore = await page.locator("section[id^='sec-']").count();
  await page.evaluate(() => {
    const el = [...document.querySelectorAll("div")].find(
      (d) => d.scrollHeight > d.clientHeight + 200 && d.querySelector("section[id^='sec-']"),
    );
    if (el) el.scrollTop = el.scrollHeight;
  });
  await page.waitForTimeout(900);
  const sectionsAfter = await page.locator("section[id^='sec-']").count();
  if (sectionsAfter <= sectionsBefore)
    problems.push(`infinite scroll did not load more: ${sectionsBefore} → ${sectionsAfter}`);
  else ok.push(`infinite scroll ${sectionsBefore} → ${sectionsAfter} sections`);

  await page.screenshot({ path: `${OUT}shot-commande-desktop.png` });

  // Recherche
  await page.getByRole("searchbox").fill("ramen");
  await page.waitForTimeout(300);
  const results = await page.locator("text=Résultats").count();
  if (results < 1) problems.push("search did not produce Résultats section");
  else ok.push("desktop: search works");
  await page.getByRole("searchbox").fill("");

  // Commander → paiement
  await page.getByRole("button", { name: /^Commander · / }).click();
  await page.waitForSelector("text=Récapitulatif");
  ok.push("desktop: pay view");
  await page.getByPlaceholder("NOMIYA10").fill("NOMIYA10");
  await page.waitForTimeout(200);
  if ((await page.locator("text=Appliqué · −10 %").count()) < 1)
    problems.push("promo code not applied");
  else ok.push("promo code applied");

  await page.getByRole("button", { name: /Payer$/ }).click();
  await page.waitForSelector("text=COMMANDE #4821");
  ok.push("desktop: tracking view");
  await page.waitForTimeout(4500);
  const step2 = await page.locator("h1").first().textContent();
  ok.push(`tracking advanced to: ${step2?.trim()}`);
  await ctx.close();
}

/* ── Commande mobile ─────────────────────────────────────── */
{
  const { ctx, page } = await newPage(390, 844);
  await page.goto(`${BASE}/commande`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Sur place/ }).first().click();
  await page.waitForSelector("text=Vous êtes à table");
  await page.getByRole("button", { name: "7", exact: true }).click();
  await page.waitForTimeout(300);
  if ((await page.locator("text=Sur place · table 7").count()) < 1)
    problems.push("table mode label missing");
  else ok.push("mobile: QR table flow → table 7");

  // Sur place : pas de bandeau de palier.
  if ((await page.locator("text=/Plus que .* pour/").count()) > 0)
    problems.push("tier bar shown in table mode");
  else ok.push("mobile: no tier bar on site (correct)");

  // Tous les plats des « + commandés » ont des options : on passe par la fiche.
  await page.getByRole("button", { name: /^Choisir / }).first().click();
  await page.waitForSelector('[role="dialog"]');
  await page.getByRole("button", { name: /^Ajouter · / }).click();
  await page.waitForSelector('[role="dialog"]', { state: "detached" });
  const bar = await page.locator("text=Voir le panier").count();
  if (bar < 1) problems.push("mobile floating cart bar missing after add");
  else ok.push("mobile: floating cart bar appears");
  await page.screenshot({ path: `${OUT}shot-commande-mobile.png` });
  await ctx.close();
}

/* ── Réservation ─────────────────────────────────────────── */
{
  const { ctx, page } = await newPage(1280, 900);
  await page.goto(`${BASE}/reservation`, { waitUntil: "networkidle" });

  const cta = page.getByRole("button", { name: /Confirmer la réservation|Nom et téléphone requis|Choisissez un créneau/ }).first();
  ok.push(`reservation initial CTA: ${(await cta.textContent())?.trim()}`);
  if (!(await cta.isDisabled())) problems.push("reservation CTA enabled with empty form");
  else ok.push("reservation: CTA disabled while incomplete");

  // Table de 4 → 20:00 devient complet et la sélection bascule.
  await page.getByRole("button", { name: "4", exact: true }).first().click();
  await page.waitForTimeout(200);
  const full2000 = page.getByRole("button", { name: "20:00" });
  if (!(await full2000.isDisabled()))
    problems.push("20:00 should be full for 4 covers");
  else ok.push("reservation: 20:00 marked full for 4 covers");

  await page.getByRole("button", { name: "19:30" }).click();
  await page.locator('input[type="text"]').first().fill("Camille Roussel");
  await page.locator('input[type="tel"]').fill("06 12 34 56 78");
  await page.waitForTimeout(200);
  const cta2 = page.getByRole("button", { name: "Confirmer la réservation" }).first();
  if (!(await cta2.count())) problems.push("reservation CTA never became confirmable");
  else {
    ok.push("reservation: CTA enabled once valid");
    await cta2.click();
    await page.waitForSelector("text=/Table réservée, Camille/");
    ok.push("reservation: confirmation screen");
    const ref = await page.locator("text=/Référence NMY-/").first().textContent();
    ok.push(`reservation: ${ref?.trim().slice(0, 40)}`);
  }
  await page.screenshot({ path: `${OUT}shot-reservation.png` });
  await ctx.close();
}

await browser.close();

console.log("PASSED:");
for (const o of ok) console.log("  ✓ " + o);
if (problems.length) {
  console.log("\nPROBLEMS:");
  for (const p of problems) console.log("  ✗ " + p);
  process.exit(1);
}
console.log("\nno problems");
