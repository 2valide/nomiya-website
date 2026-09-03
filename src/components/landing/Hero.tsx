import Link from "next/link";
import { Photo } from "@/components/Photo";
import { LANDING } from "@/lib/photos";
import { NAV } from "@/lib/landing";
import { RESTAURANT } from "@/lib/restaurant";

export function Hero() {
  return (
    <div className="relative flex min-h-[min(92vh,820px)] flex-col overflow-hidden bg-nuit">
      <Photo
        photo={LANDING.hero}
        className="absolute inset-0"
        sizes="100vw"
        priority
        tone="dark"
        stripe={14}
      />
      {/* Le dégradé assombrit le haut pour la navigation et le bas pour le titre. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,14,12,.72)_0%,rgba(16,14,12,.34)_42%,rgba(16,14,12,.88)_100%)]" />

      <header className="relative z-[2] mx-auto flex w-full max-w-[1180px] flex-wrap items-center gap-4 gap-y-2.5 px-6 py-[22px]">
        <span className="flex-none font-display text-[27px] leading-none text-white">
          {RESTAURANT.name}
        </span>
        <nav className="ml-auto flex flex-wrap items-center justify-end gap-5">
          {NAV.map((n) => (
            <Link
              key={n.n}
              href={n.href}
              className="text-[12.5px] font-bold whitespace-nowrap text-white/[0.78] hover:text-white"
            >
              {n.n}
            </Link>
          ))}
          <Link
            href="/reservation"
            className="rounded-full border-[1.5px] border-white/[0.28] px-[17px] py-2.5 text-[12.5px] font-extrabold whitespace-nowrap text-white hover:border-white/60 hover:text-white"
          >
            Réserver
          </Link>
        </nav>
      </header>

      <div className="relative z-[2] mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-end gap-[22px] px-6 pb-14">
        <span className="text-[10.5px] font-extrabold tracking-[2.2px] text-white/[0.62]">
          {RESTAURANT.since}
        </span>
        <h1 className="max-w-[14ch] font-display text-[clamp(42px,8.4vw,86px)] leading-[0.98] tracking-[-1.5px] text-pretty text-white">
          Le Japon à deux pas du pont
        </h1>
        <p className="max-w-[52ch] text-[clamp(14px,1.5vw,17px)] leading-[1.6] font-medium text-pretty text-white/[0.78]">
          Un comptoir de quartier où le poisson est tranché à la commande, les
          brochettes passent sur le charbon et l’on vous reconnaît à la deuxième
          visite.
        </p>
        <div className="mt-1.5 flex flex-wrap gap-3">
          <Link
            href="/reservation"
            className="rounded-[14px] bg-vermillon px-7 py-[17px] text-[14.5px] font-extrabold text-white hover:bg-vermillon-dark hover:text-white"
          >
            Réserver une table
          </Link>
          <Link
            href="/commande"
            className="rounded-[14px] border-[1.5px] border-white/30 px-[26px] py-[17px] text-[14.5px] font-extrabold text-white hover:border-white/70 hover:text-white"
          >
            Commander en ligne
          </Link>
        </div>
      </div>
    </div>
  );
}
