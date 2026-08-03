"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProcessImageFrame } from "@/components/content/ProcessImageFrame";
import { ProcessTimeline } from "@/components/content/ProcessTimeline";
import type { ProcessStep } from "@/lib/process-section";

const PROCESS_SCROLL_STEP_VH = 42;
const STEP_GAP_PX = 96;

type ProcessScrollProps = {
  steps: ProcessStep[];
};

function getStepOpacity(stepIndex: number, floatIndex: number) {
  const distance = Math.abs(stepIndex - floatIndex);
  return 0.5 + Math.max(0, 1 - distance) * 0.5;
}

export function ProcessScroll({ steps }: ProcessScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const floatIndex = progress * Math.max(steps.length - 1, 0);
  const snappedIndex = Math.min(
    Math.round(floatIndex),
    Math.max(steps.length - 1, 0),
  );

  const stepStride = 220 + STEP_GAP_PX;
  const listOffset = useMemo(
    () => -(floatIndex * stepStride),
    [floatIndex, stepStride],
  );

  useEffect(() => {
    if (steps.length <= 1) return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin,
      pinSpacing: false,
      scrub: 0.65,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      ...(steps.length > 1
        ? {
            snap: {
              snapTo: (value: number) => {
                const stepSize = 1 / (steps.length - 1);
                return Math.round(value / stepSize) * stepSize;
              },
              duration: { min: 0.2, max: 0.45 },
              delay: 0,
              ease: "power1.inOut",
            },
          }
        : {}),
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => trigger.kill();
  }, [steps.length]);

  if (!steps.length) return null;

  const sectionHeightVh =
    100 + Math.max(steps.length - 1, 0) * PROCESS_SCROLL_STEP_VH;

  return (
    <>
      <section
        ref={sectionRef}
        className="relative hidden overflow-x-clip lg:block"
        style={{ height: `${sectionHeightVh}vh` }}
        aria-label="Etapas do processo"
      >
        <div ref={pinRef} className="relative h-svh overflow-hidden">
          <div className="mx-auto flex h-full max-w-[1920px] items-center justify-between gap-12 px-20">
            <div className="relative min-w-0 max-w-[805px] flex-1">
              <ProcessTimeline progress={progress} />

              <div
                className="relative will-change-transform pt-[28vh]"
                style={{ transform: `translateY(${listOffset}px)` }}
              >
                <div className="flex flex-col" style={{ gap: STEP_GAP_PX }}>
                  {steps.map((step, index) => (
                    <article
                      key={step.id}
                      className="flex min-h-[220px] gap-14 py-6 pl-12 pr-6 transition-opacity duration-300"
                      style={{ opacity: getStepOpacity(index, floatIndex) }}
                    >
                      <div className="flex h-[62px] shrink-0 items-center justify-center">
                        <span className="bg-[#c0edff] px-1 py-0.5 font-arc-mono text-lg leading-none text-[#04040d]">
                          {step.number}
                        </span>
                      </div>

                      <div className="min-w-0 space-y-4">
                        <h3 className="font-arc-sans text-arc-heading leading-[1.3] text-white">
                          {step.title}
                        </h3>
                        {step.description ? (
                          <p className="max-w-[399px] text-lg leading-[1.5] text-white/70">
                            {step.description}
                          </p>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <ProcessImageFrame steps={steps} activeIndex={snappedIndex} />
          </div>
        </div>
      </section>

      <div className="space-y-12 px-6 pb-16 lg:hidden">
        {steps.map((step) => (
          <article key={`mobile-${step.id}`} className="space-y-6">
            <div className="flex items-start gap-6">
              <span className="bg-[#c0edff] px-1 py-0.5 font-arc-mono text-lg leading-none text-[#04040d]">
                {step.number}
              </span>
              <div className="space-y-3">
                <h3 className="font-arc-sans text-3xl leading-[1.3] text-white">
                  {step.title}
                </h3>
                {step.description ? (
                  <p className="text-lg leading-[1.5] text-white/70">
                    {step.description}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="relative aspect-[577/390] overflow-hidden bg-white">
              <Image
                src={step.imageSrc}
                alt={step.imageAlt}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
