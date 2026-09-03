import { Photo } from "@/components/Photo";
import { LANDING } from "@/lib/photos";

export function Gallery() {
  return (
    <section className="pt-[76px]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-[26px] px-6">
        <span className="text-[10.5px] font-extrabold tracking-[2px] text-vermillon">
          LA SALLE
        </span>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-3">
          {LANDING.gallery.map((g) => (
            <Photo
              key={g.caption}
              photo={g}
              className="aspect-4/5 rounded-card"
              sizes="(min-width: 900px) 280px, 45vw"
              stripe={9}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
