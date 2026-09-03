import { Photo } from "@/components/Photo";
import { LANDING } from "@/lib/photos";
import { SERVICES } from "@/lib/landing";

export function Services() {
  return (
    <section className="mx-auto flex max-w-[1180px] flex-col gap-[30px] px-6 pt-[76px]">
      <div className="flex max-w-[640px] flex-col gap-3">
        <span className="text-[10.5px] font-extrabold tracking-[2px] text-vermillon">
          MIDI OU SOIR
        </span>
        <h2 className="font-display text-[clamp(30px,4.6vw,46px)] leading-[1.06]">
          Deux services, deux ambiances
        </h2>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {SERVICES.map((sv) => (
          <article
            key={sv.n}
            className="flex flex-col overflow-hidden rounded-[22px] border border-ink/8 bg-surface"
          >
            <Photo
              photo={LANDING[sv.photo]}
              className="aspect-video"
              sizes="(min-width: 900px) 560px, 92vw"
            />
            <div className="flex flex-1 flex-col gap-[11px] px-[26px] pt-6 pb-[26px]">
              <span className="text-[10.5px] font-extrabold tracking-[1.6px] text-mut-light">
                {sv.hours}
              </span>
              <h3 className="font-display text-[30px] leading-[1.1]">{sv.n}</h3>
              <p className="text-[14px] leading-[1.65] font-medium text-pretty text-ink-soft">
                {sv.d}
              </p>
              <span className="mt-auto pt-3 text-[13px] font-extrabold text-ink">
                {sv.note}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
