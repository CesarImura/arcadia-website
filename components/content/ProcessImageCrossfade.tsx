"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { ProcessStep } from "@/lib/process-section";

type ProcessImageCrossfadeProps = {
  steps: ProcessStep[];
  activeIndex: number;
};

export function ProcessImageCrossfade({
  steps,
  activeIndex,
}: ProcessImageCrossfadeProps) {
  const outgoingRef = useRef<HTMLDivElement>(null);
  const incomingRef = useRef<HTMLDivElement>(null);
  const displayedIndexRef = useRef(activeIndex);
  const tweenRef = useRef<gsap.core.Timeline | null>(null);
  const [fromIndex, setFromIndex] = useState<number | null>(null);

  const activeStep = steps[activeIndex];
  const previousStep = fromIndex !== null ? steps[fromIndex] : null;

  useEffect(() => {
    if (activeIndex === displayedIndexRef.current) return;

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

    tweenRef.current?.kill();
    gsap.set(incoming, { opacity: 0 });
    gsap.set(outgoing, { opacity: 1 });

    tweenRef.current = gsap.timeline({
      onComplete: () => setFromIndex(null),
    });

    tweenRef.current
      .to(outgoing, { opacity: 0, duration: 0.55, ease: "power2.out" }, 0)
      .to(incoming, { opacity: 1, duration: 0.55, ease: "power2.out" }, 0);

    return () => {
      tweenRef.current?.kill();
    };
  }, [fromIndex, activeIndex]);

  if (!activeStep) return null;

  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      {previousStep ? (
        <>
          <div ref={outgoingRef} className="absolute inset-0 will-change-[opacity]">
            <Image
              src={previousStep.imageSrc}
              alt={previousStep.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 60vw, 577px"
            />
          </div>
          <div ref={incomingRef} className="absolute inset-0 will-change-[opacity]">
            <Image
              src={activeStep.imageSrc}
              alt={activeStep.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 60vw, 577px"
              priority
            />
          </div>
        </>
      ) : (
        <Image
          src={activeStep.imageSrc}
          alt={activeStep.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 60vw, 577px"
          priority
        />
      )}
    </div>
  );
}
