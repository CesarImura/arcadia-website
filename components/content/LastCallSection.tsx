"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { LastCallFrames } from "@/components/content/LastCallFrames";
import { SectionBracketLabel } from "@/components/content/SectionBracketLabel";
import type { LastCallSectionContent } from "@/lib/last-call-section";

export function LastCallSection({
  label,
  title,
  description,
  contactName,
  contactRole,
  contactPhotoSrc,
  contactPhotoAlt,
  ctaLabel,
  ctaHref,
}: LastCallSectionContent) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-x-clip bg-[#ececec] py-12 text-black md:py-16"
      aria-label="Last call"
      data-header-theme="light"
    >
      <div
        ref={contentRef}
        className="relative mx-auto flex min-h-[680px] w-full max-w-[1920px] flex-col items-center justify-center gap-12 px-6 md:min-h-[760px] md:gap-[59px] md:px-20"
      >
        <LastCallFrames
          sectionRef={sectionRef}
          contentRef={contentRef}
        />

        <div className="relative z-10 flex w-full max-w-[678px] flex-col items-center gap-4 text-center">
          <SectionBracketLabel
            sectionKey="lastCall"
            label={label}
            tone="black"
          />

          <h2 className="max-w-[585px] font-arc-sans text-arc-heading font-medium leading-[1.3]">
            {title}
          </h2>

          <p className="text-lg leading-[1.5] text-black/80">{description}</p>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
          <div className="flex items-center gap-4">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-[#d9d9d9]">
              <Image
                src={contactPhotoSrc}
                alt={contactPhotoAlt}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>

            <div className="text-lg leading-[1.5]">
              <p className="font-medium">{contactName}</p>
              <p className="text-black/70">{contactRole}</p>
            </div>
          </div>

          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center bg-black px-3 py-2 text-lg leading-[1.5] text-white transition-opacity hover:opacity-90"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
