import type { Metadata } from "next";
import { CommandeApp } from "@/components/commande/CommandeApp";

export const metadata: Metadata = {
  title: "Commander",
  description:
    "Commandez chez Nomiya en livraison, à emporter ou sur place : 162 plats à la carte, livraison offerte dès 30 €.",
};

export default function CommandePage() {
  return <CommandeApp />;
}
