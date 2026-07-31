"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { MarqueeImage } from "@/lib/marquee-images";

type ImageMarqueeSectionProps = {
  images: MarqueeImage[];
};

const BASE_SPEED = 0.75;
const VELOCITY_FACTOR = 0.35;
const VELOCITY_DECAY = 0.88;
const DEFAULT_DIRECTION = 1; // idle drift: content moves left

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

export function ImageMarqueeSection({ images }: ImageMarqueeSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef({
    offset: 0,
    direction: DEFAULT_DIRECTION,
    scrollVelocity: 0,
    lastScrollY: 0,
    loopWidth: 0,
  });

  useEffect(() => {
    if (!images.length) return;

    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const measure = () => {
      motionRef.current.loopWidth = track.scrollWidth / 2;
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    if (prefersReducedMotion) {
      return () => resizeObserver.disconnect();
    }

    motionRef.current.lastScrollY = window.scrollY;

    const tick = () => {
      const motion = motionRef.current;
      const { loopWidth } = motion;

      if (!loopWidth) return;

      const currentScrollY = window.scrollY;
      const frameDelta = currentScrollY - motion.lastScrollY;
      motion.lastScrollY = currentScrollY;

      if (Math.abs(frameDelta) > 0.01) {
        motion.scrollVelocity = frameDelta;
      } else {
        motion.scrollVelocity *= VELOCITY_DECAY;
      }

      if (Math.abs(motion.scrollVelocity) > 0.05) {
        // Scroll down → gallery drifts right; scroll up → drifts left.
        motion.direction = motion.scrollVelocity > 0 ? -1 : 1;
      }

      const speed =
        BASE_SPEED + Math.abs(motion.scrollVelocity) * VELOCITY_FACTOR;

      motion.offset += motion.direction * speed;

      if (motion.offset >= loopWidth) {
        motion.offset -= loopWidth;
      } else if (motion.offset < 0) {
        motion.offset += loopWidth;
      }

      track.style.transform = `translate3d(${-motion.offset}px, 0, 0)`;
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      resizeObserver.disconnect();
      track.style.transform = "";
    };
  }, [images.length]);

  if (!images.length) return null;

  const loop = [...images, ...images];

  return (
    <section
      ref={sectionRef}
      className="overflow-x-clip bg-[#04040d] py-14"
      aria-label="Galeria em movimento"
    >
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
