"use client";

import Image from "next/image";
import { ProcessImageCrossfade } from "@/components/content/ProcessImageCrossfade";
import type { ProcessStep } from "@/lib/process-section";

type ProcessImageFrameProps = {
  steps: ProcessStep[];
  activeIndex: number;
};

const CORNER_MARKERS = [
  { left: "6.1%", top: "13.2%" },
  { left: "6.1%", top: "84.5%" },
  { left: "47%", top: "13.2%" },
  { left: "47%", top: "84.5%" },
  { left: "91.6%", top: "13.2%" },
  { left: "91.6%", top: "84.5%" },
];

export function ProcessImageFrame({ steps, activeIndex }: ProcessImageFrameProps) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[722px] shrink-0">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/process/grid-base.png"
            alt=""
            fill
            className="object-cover"
            aria-hidden
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="size-full rotate-90">
            <Image
              src="/images/process/grid-rotated.png"
              alt=""
              fill
              className="object-cover"
              aria-hidden
            />
          </div>
        </div>

        {CORNER_MARKERS.map((marker, index) => (
          <div
            key={`marker-${index}`}
            className="absolute size-4"
            style={{ left: marker.left, top: marker.top }}
            aria-hidden
          >
            <Image
              src="/images/process/corner-marker.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        ))}

        <div className="absolute left-[10%] top-[23%] h-[54%] w-[80%]">
          <ProcessImageCrossfade steps={steps} activeIndex={activeIndex} />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/process/frame-overlay.svg"
          alt=""
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
