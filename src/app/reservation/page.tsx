import type { Metadata } from "next";
import { ReservationHero } from "@/components/reservation/ReservationHero";
import { ReservationForm } from "@/components/reservation/ReservationForm";

export const metadata: Metadata = {
  title: "Réserver une table",
  description:
    "Réservez votre table chez Nomiya, 211 bis avenue Charles de Gaulle à Neuilly-sur-Seine. Confirmation immédiate par SMS.",
};

// Les créneaux proposés partent d'aujourd'hui : la page est rendue à la demande
// plutôt que figée à la compilation.
export const dynamic = "force-dynamic";

export default function ReservationPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-creme pb-[104px] min-[900px]:pb-12">
      <ReservationHero />
      <ReservationForm todayIso={new Date().toISOString()} />
    </div>
  );
}
