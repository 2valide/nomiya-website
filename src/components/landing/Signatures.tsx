import Link from "next/link";
import { Photo } from "@/components/Photo";
import { LANDING } from "@/lib/photos";
import { SIGNATURES } from "@/lib/landing";

export function Signatures() {
  return (
    <section className="bg-sable py-[76px]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-11 px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-[10.5px] font-extrabold tracking-[2px] text-vermillon">
              LES SIGNATURES
            </span>
            <h2 className="font-display text-[clamp(30px,4.6vw,46px)] leading-[1.06]">
              Trois plats qui résument la maison
            </h2>
          </div>
          <Link
            href="/commande"
            className="text-[13.5px] font-extrabold whitespace-nowrap text-vermillon"
          >
            Toute la carte ›
          </Link>
        </div>

        {SIGNATURES.map((s) => (
          <article
            key={s.n}
            className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-10"
          >
            <Photo
              photo={LANDING[s.photo]}
              className="aspect-4/3 rounded-[22px]"
              sizes="(min-width: 900px) 550px, 92vw"
              stripe={10}
            />
            <div className="flex flex-col gap-3">
              <span className="text-[10.5px] font-extrabold tracking-[1.6px] text-mut-light">
                {s.kicker}
              </span>
              <h3 className="font-display text-[clamp(26px,3.4vw,36px)] leading-[1.1]">
                {s.n}
              </h3>
              <p className="text-[14.5px] leading-[1.7] font-medium text-pretty text-ink-soft">
                {s.d}
              </p>
              <span className="mt-0.5 text-[15px] font-extrabold text-vermillon">
                {s.price}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
