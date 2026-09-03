import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/landing";
import { RESTAURANT } from "@/lib/restaurant";

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1180px] flex-wrap items-end justify-between gap-[26px] px-6 pt-[34px] pb-[52px]">
      <div className="flex flex-col gap-2">
        <span className="font-display text-[30px] leading-none">
          {RESTAURANT.name}
        </span>
        <span className="text-[12.5px] leading-[1.6] font-semibold text-mut">
          Restaurant japonais · Sur place, à emporter, livraison
          <br />
          {RESTAURANT.street}, {RESTAURANT.postcode} {RESTAURANT.city}
        </span>
      </div>
      <nav className="flex flex-wrap gap-6">
        {FOOTER_LINKS.map((f) => (
          <Link
            key={f.n}
            href={f.href}
            className="text-[12.5px] font-bold text-ink-soft hover:text-vermillon"
          >
            {f.n}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
