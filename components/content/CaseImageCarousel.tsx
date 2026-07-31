"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { CaseShowcaseItem } from "@/lib/cases-showcase";

const IMAGE_MASK =
  "polygon(0 0, calc(100% - 52px) 0, 100% 52px, 100% 100%, 0 100%)";

type CaseImageCarouselProps = {
  cases: CaseShowcaseItem[];
  activeIndex: number;
};

export function CaseImageCarousel({
  cases,
  activeIndex,
}: CaseImageCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const outgoingRef = useRef<HTMLDivElement>(null);
  const incomingRef = useRef<HTMLDivElement>(null);
  const displayedIndexRef = useRef(activeIndex);
  const tweenRef = useRef<gsap.core.Timeline | null>(null);
  const [fromIndex, setFromIndex] = useState<number | null>(null);

  const activeCase = cases[activeIndex];
  const previousCase = fromIndex !== null ? cases[fromIndex] : null;

  useEffect(() => {
    if (activeIndex === displayedIndexRef.current) return;

    const direction = activeIndex > displayedIndexRef.current ? 1 : -1;
    const from = displayedIndexRef.current;
    displayedIndexRef.current = activeIndex;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setFromIndex(null);
      return;
    }

    setFromIndex(from);
  }, [activeIndex]);

  useEffect(() => {
    if (fromIndex === null) return;

    const outgoing = outgoingRef.current;
    const incoming = incomingRef.current;
    if (!outgoing || !incoming) return;

    const direction = activeIndex > fromIndex ? 1 : -1;
    const enterY = direction > 0 ? "-100%" : "100%";
    const exitY = direction > 0 ? "100%" : "-100%";

    tweenRef.current?.kill();

    gsap.set(incoming, { y: enterY });
    gsap.set(outgoing, { y: "0%" });

    tweenRef.current = gsap.timeline({
      onComplete: () => setFromIndex(null),
    });

    tweenRef.current
      .to(incoming, { y: "0%", duration: 0.5, ease: "power2.out" }, 0)
      .to(outgoing, { y: exitY, duration: 0.5, ease: "power2.out" }, 0);

    return () => {
      tweenRef.current?.kill();
    };
  }, [fromIndex, activeIndex]);

  if (!activeCase) return null;

  return (
    <div
      ref={containerRef}
      className="relative size-[min(72vw,364px)] overflow-hidden bg-[#0a0a12]"
      style={{ clipPath: IMAGE_MASK }}
    >
      {previousCase ? (
        <>
          <div ref={outgoingRef} className="absolute inset-0 will-change-transform">
            <Image
              src={previousCase.imageSrc}
              alt={previousCase.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 72vw, 364px"
            />
          </div>
          <div ref={incomingRef} className="absolute inset-0 will-change-transform">
            <Image
              src={activeCase.imageSrc}
              alt={activeCase.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 72vw, 364px"
              priority
            />
          </div>
        </>
      ) : (
        <Image
          src={activeCase.imageSrc}
          alt={activeCase.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 72vw, 364px"
          priority
        />
      )}
    </div>
  );
}
