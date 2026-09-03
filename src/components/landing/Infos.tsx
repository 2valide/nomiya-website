import Link from "next/link";
import { Photo } from "@/components/Photo";
import { LANDING } from "@/lib/photos";
import { HOURS, RESTAURANT } from "@/lib/restaurant";

export function Infos() {
  return (
    <section id="infos" className="scroll-mt-6 bg-ink py-[76px] text-white">
      <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-12 px-6">
        <div className="flex flex-col gap-5">
          <span className="text-[10.5px] font-extrabold tracking-[2px] text-vermillon-bright">
            RÉSERVER
          </span>
          <h2 className="font-display text-[clamp(30px,4.6vw,46px)] leading-[1.06]">
            Une table vous attend ce soir
          </h2>
          <p className="max-w-[46ch] text-[14.5px] leading-[1.7] font-medium text-pretty text-white/[0.66]">
            Réservation par téléphone, du service du midi jusqu’à la fermeture.
            Pour un dîner de groupe, prévenez-nous la veille.
          </p>
          <div className="mt-1 flex flex-wrap gap-3">
            <a
              href={RESTAURANT.phoneHref}
              className="rounded-[14px] bg-vermillon px-[26px] py-[17px] text-[14.5px] font-extrabold text-white hover:bg-vermillon-dark hover:text-white"
            >
              {RESTAURANT.phone}
            </a>
            <Link
              href="/commande"
              className="rounded-[14px] border-[1.5px] border-white/[0.28] px-[26px] py-[17px] text-[14.5px] font-extrabold text-white hover:border-white/60 hover:text-white"
            >
              Commander à emporter
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-[22px]">
          <div className="flex flex-col gap-2.5">
            <span className="text-[10.5px] font-extrabold tracking-[1.6px] text-white/[0.45]">
              HORAIRES
            </span>
            {HOURS.map((h) => (
              <div
                key={h.d}
                className="flex justify-between gap-4 border-b border-white/10 pb-[9px] text-[13.5px]"
              >
                <span className="font-bold">{h.d}</span>
                <span className="text-right font-semibold text-white/[0.62]">
                  {h.h}
                </span>
              </div>
            ))}
          </div>

          <address className="flex flex-col gap-[9px] not-italic">
            <span className="text-[10.5px] font-extrabold tracking-[1.6px] text-white/[0.45]">
              ADRESSE
            </span>
            <span className="text-[14.5px] leading-[1.5] font-bold">
              {RESTAURANT.street}
              <br />
              {RESTAURANT.postcode} {RESTAURANT.city}
            </span>
            <span className="text-[12.5px] leading-[1.6] font-semibold text-white/[0.55]">
              {RESTAURANT.metro}
            </span>
            <Photo
              photo={LANDING.plan}
              className="mt-1 h-[120px] rounded-[14px]"
              sizes="(min-width: 900px) 560px, 92vw"
              tone="dark"
              stripe={9}
            />
          </address>
        </div>
      </div>
    </section>
  );
}
