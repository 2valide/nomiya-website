import { REVIEWS } from "@/lib/landing";

export function Reviews() {
  return (
    <section className="py-[76px]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-4 px-6">
        {REVIEWS.map((r) => (
          <figure
            key={r.t}
            className="flex flex-col gap-3.5 rounded-panel border border-ink/8 bg-surface px-7 py-[26px]"
          >
            <span
              className="text-[13px] font-extrabold tracking-[2px] text-vermillon"
              aria-label={`${r.stars.split("★").length - 1} étoiles sur 5`}
            >
              {r.stars}
            </span>
            <blockquote className="font-display text-[21px] leading-[1.4] text-pretty text-ink">
              {r.t}
            </blockquote>
            <figcaption className="mt-auto text-[11.5px] font-bold text-mut">
              {r.a}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
