"use client";

import Image from "next/image";
import { useRef } from "react";
import { SectionBracketLabel } from "@/components/content/SectionBracketLabel";
import { getSectionDefaultLabel } from "@/lib/section-index";
import { useScrollVelocityMarquee } from "@/lib/use-scroll-velocity-marquee";
import type { MarqueeImage } from "@/lib/marquee-images";

type ImageMarqueeSectionProps = {
  images: MarqueeImage[];
  label?: string;
};

function MarqueeTrack({ images }: { images: MarqueeImage[] }) {
  return (
    <>
      {images.map((image, index) => (
        <figure
          key={`${image.src}-${index}`}
          className="relative h-[280px] w-[420px] shrink-0 overflow-hidden sm:h-[360px] sm:w-[540px] lg:h-[480px] lg:w-[720px]"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 420px, (max-width: 1024px) 540px, 720px"
            draggable={false}
          />
        </figure>
      ))}
    </>
  );
}

export function ImageMarqueeSection({
  images,
  label = getSectionDefaultLabel("gallery"),
}: ImageMarqueeSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useScrollVelocityMarquee(trackRef, images.length > 0);

  if (!images.length) return null;

  const loop = [...images, ...images];

  return (
    <section
      className="overflow-x-clip bg-[#04040d] py-14"
      aria-label="Galeria em movimento"
      data-header-theme="dark"
    >
      <div className="mx-auto mb-8 flex max-w-[1920px] justify-center px-6 md:px-20">
        <SectionBracketLabel sectionKey="gallery" label={label} tone="cyan" />
      </div>
      <div className="relative">
        <div
          ref={trackRef}
          className="flex w-max gap-4 will-change-transform"
        >
          <MarqueeTrack images={loop} />
        </div>
      </div>
    </section>
  );
}
