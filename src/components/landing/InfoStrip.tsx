import Link from "next/link";
import { STRIP } from "@/lib/landing";

export function InfoStrip() {
  return (
    <div className="bg-ink text-white">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-11 gap-y-[26px] px-6 py-[22px]">
        {STRIP.map((s) => (
          <div key={s.n} className="flex flex-col gap-[3px]">
            <span className="text-[12.5px] font-extrabold">{s.n}</span>
            <span className="text-[11.5px] font-semibold text-white/[0.55]">
              {s.d}
            </span>
          </div>
        ))}
        <Link
          href="/commande"
          className="ml-auto text-[12.5px] font-extrabold whitespace-nowrap text-vermillon-bright hover:text-white"
        >
          Voir la carte ›
        </Link>
      </div>
    </div>
  );
}
