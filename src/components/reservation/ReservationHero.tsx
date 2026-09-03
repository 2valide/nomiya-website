import Link from "next/link";
import { Photo } from "@/components/Photo";
import { RESERVATION_HERO } from "@/lib/photos";
import { RESTAURANT } from "@/lib/restaurant";

export function ReservationHero() {
  return (
    <div className="relative overflow-hidden bg-nuit">
      <Photo
        photo={RESERVATION_HERO}
        className="absolute inset-0"
        sizes="100vw"
        priority
        tone="dark"
        stripe={14}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,14,12,.6)_0%,rgba(16,14,12,.32)_40%,rgba(16,14,12,.92)_100%)]" />
      <div className="relative z-[2] mx-auto flex min-h-[210px] max-w-[1100px] flex-col justify-end gap-[13px] px-6 pt-[22px] pb-[34px] lg:min-h-[260px]">
        <Link
          href="/"
          className="self-start text-[11px] font-extrabold tracking-[0.6px] text-white/60 hover:text-white"
        >
          ‹ RETOUR AU SITE
        </Link>
        <span className="text-[10.5px] font-extrabold tracking-[2px] text-white/[0.55]">
          RÉSERVER UNE TABLE
        </span>
        <span className="font-display text-[clamp(32px,5.6vw,52px)] leading-none tracking-[-1px] text-white">
          {RESTAURANT.name}
        </span>
        <span className="text-[12.5px] font-bold tracking-[0.4px] text-white/[0.62]">
          {RESTAURANT.addressLine}
        </span>
      </div>
    </div>
  );
}
