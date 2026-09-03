import Link from "next/link";
import { Photo } from "@/components/Photo";
import { LANDING } from "@/lib/photos";

export function Maison() {
  return (
    <section id="maison" className="mx-auto max-w-[1180px] px-6">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-[52px] pt-[82px] pb-[72px]">
        <div className="flex flex-col gap-[18px]">
          <span className="text-[10.5px] font-extrabold tracking-[2px] text-vermillon">
            LA MAISON
          </span>
          <h2 className="font-display text-[clamp(30px,4.6vw,46px)] leading-[1.06] text-pretty">
            Une adresse de quartier, pas une chaîne
          </h2>
          <p className="text-[15px] leading-[1.7] font-medium text-pretty text-ink-soft">
            Nomiya tient une petite salle au 211 bis, entre le pont et le métro.
            Le poisson arrive le matin, la carte suit les saisons, et rien ne
            part en cuisine avant d’être commandé. On y vient pour un déjeuner
            de vingt minutes comme pour un dîner qui s’étire.
          </p>
          <p className="text-[15px] leading-[1.7] font-medium text-pretty text-ink-soft">
            Aux beaux jours, quelques tables prennent l’air sur l’avenue. Le
            reste de l’année, le comptoir reste le meilleur siège de la maison.
          </p>
          <Link
            href="#infos"
            className="mt-1 text-[13.5px] font-extrabold text-vermillon"
          >
            Horaires et accès ›
          </Link>
        </div>

        {/* Deux portraits décalés : le second descend de 36 px. */}
        <div className="grid grid-cols-2 gap-3.5">
          <Photo
            photo={LANDING.chef}
            className="aspect-3/4 rounded-panel"
            sizes="(min-width: 900px) 280px, 45vw"
          />
          <Photo
            photo={LANDING.decoupe}
            className="mt-9 aspect-3/4 rounded-panel"
            sizes="(min-width: 900px) 280px, 45vw"
          />
        </div>
      </div>
    </section>
  );
}
