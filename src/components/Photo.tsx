"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo as PhotoRef } from "@/lib/photos";

type Tone = "light" | "dark";

type Props = {
  photo: PhotoRef;
  /** Classes du conteneur : ratio, rayon, position. Il doit être positionné. */
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Aplat de repli sombre (héros, plan d'accès) plutôt que crème. */
  tone?: Tone;
  /** Pas des hachures de l'aplat, en pixels. */
  stripe?: number;
  /** Masque la légende de repli (vignettes trop petites pour la porter). */
  hideCaption?: boolean;
  /** Dimensions calculées à l'exécution (hauteurs qui suivent le point de rupture). */
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

/**
 * Emplacement photo du site.
 *
 * Tant qu'une image charge, on affiche la photo. Dès qu'elle manque — URL vide,
 * 404, réseau coupé — on retombe sur l'aplat hachuré des maquettes, légende
 * comprise, pour que la mise en page tienne toujours debout.
 */
export function Photo({
  photo,
  className = "",
  sizes = "100vw",
  priority = false,
  tone = "light",
  stripe = 10,
  hideCaption = false,
  style,
  children,
}: Props) {
  const [failed, setFailed] = useState(false);
  const showImage = photo.src !== "" && !failed;

  const hatch =
    tone === "dark"
      ? `repeating-linear-gradient(135deg,#2A2420 0 ${stripe}px,#211C19 ${stripe}px ${stripe * 2}px)`
      : `repeating-linear-gradient(135deg,#EFE8DE 0 ${stripe}px,#E5DCCF ${stripe}px ${stripe * 2}px)`;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={showImage ? style : { ...style, background: hatch }}
    >
      {showImage ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={() => setFailed(true)}
          unoptimized={photo.src.startsWith("/")}
        />
      ) : (
        !hideCaption && (
          <span
            className={`absolute bottom-0 left-0 m-3 rounded-[6px] px-2 py-1 font-mono text-[9.5px] ${
              tone === "dark"
                ? "bg-white/[0.07] text-white/50"
                : "bg-creme/90 text-mut"
            }`}
          >
            {photo.caption}
          </span>
        )
      )}
      {children}
    </div>
  );
}
