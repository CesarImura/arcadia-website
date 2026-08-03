"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CaseImageCarousel } from "@/components/content/CaseImageCarousel";
import { SectionBracketLabel } from "@/components/content/SectionBracketLabel";
import { ScrambleText } from "@/components/ui/ScrambleText";
import type { CaseShowcaseItem } from "@/lib/cases-showcase";

const ROW_HEIGHT = 78;
const CASE_SCROLL_STEP_VH = 42;

type CasesGalleryScrollProps = {
  cases: CaseShowcaseItem[];
  label?: string;
};

function getListItemStyle(rowIndex: number, floatIndex: number) {
  const distance = Math.abs(rowIndex - floatIndex);
  const focus = Math.max(0, 1 - distance);
  const indent = Math.min(distance, 4) * 28;
  const color = `color-mix(in srgb, #c0edff ${focus * 100}%, rgb(255 255 255 / 0.3))`;

  return {
    indent,
    color,
  };
}

function CaseListColumn({
  cases,
  floatIndex,
  side,
  listOffset,
}: {
  cases: CaseShowcaseItem[];
  floatIndex: number;
  side: "left" | "right";
  listOffset: number;
}) {
  return (
    <div
      className={`absolute top-1/2 w-[min(42vw,320px)] will-change-transform ${
        side === "left"
          ? "left-6 md:left-20"
          : "right-6 md:right-20 text-right"
      }`}
      style={{ transform: `translateY(${listOffset}px)` }}
    >
      <div className="flex flex-col gap-4">
        {cases.map((caseItem, rowIndex) => {
          const item = getListItemStyle(rowIndex, floatIndex);

          return (
            <div
              key={`${side}-${caseItem.id}`}
              className={`flex h-[62px] items-center uppercase ${
                side === "left" ? "justify-start" : "justify-end"
              }`}
              style={{
                paddingLeft: side === "left" ? item.indent : undefined,
                paddingRight: side === "right" ? item.indent : undefined,
              }}
            >
              <span
                className="truncate font-arc-display text-arc-heading leading-[1.3]"
                style={{ color: item.color }}
              >
                {side === "left" ? caseItem.client : caseItem.location}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CasesGalleryScroll({
  cases,
  label = "nosso impacto",
}: CasesGalleryScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const floatIndex = progress * Math.max(cases.length - 1, 0);
  const snappedIndex = Math.min(
    Math.round(floatIndex),
    Math.max(cases.length - 1, 0),
  );
  const activeCase = cases[snappedIndex];

  const listOffset = useMemo(
    () => -(floatIndex * ROW_HEIGHT + ROW_HEIGHT / 2),
    [floatIndex],
  );

  useEffect(() => {
    if (cases.length <= 1) return;

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
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => trigger.kill();
  }, [cases.length]);

  if (!activeCase) return null;

  const metaLine = `${activeCase.client.toLowerCase()} / ${activeCase.year || "2026"}`;
  const sectionHeightVh =
    100 + Math.max(cases.length - 1, 0) * CASE_SCROLL_STEP_VH;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-clip bg-[#04040d]"
      style={{ height: `${sectionHeightVh}vh` }}
      aria-label="Galeria de cases"
      data-header-theme="dark"
    >
      <div
        ref={pinRef}
        className="relative flex h-svh flex-col overflow-hidden"
      >
        <div className="absolute left-1/2 top-[83px] z-20 -translate-x-1/2">
          <SectionBracketLabel sectionKey="cases" label={label} tone="cyan" />
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-px -translate-y-1/2 bg-white/15"
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
          <CaseListColumn
            cases={cases}
            floatIndex={floatIndex}
            side="left"
            listOffset={listOffset}
          />
          <CaseListColumn
            cases={cases}
            floatIndex={floatIndex}
            side="right"
            listOffset={listOffset}
          />
        </div>

        <div className="absolute left-1/2 top-1/2 z-20 flex w-[min(92vw,473px)] -translate-x-1/2 -translate-y-[calc(50%-40px)] flex-col items-center gap-8 text-center">
          <Link
            href={activeCase.href}
            className="group flex w-full flex-col items-center gap-8 text-center"
          >
            <div className="w-full space-y-2 opacity-30 transition-opacity group-hover:opacity-50">
              <div className="flex h-5 items-center justify-center">
                <ScrambleText
                  text={metaLine}
                  as="p"
                  className="font-arc-mono text-sm lowercase text-white"
                  duration={0.45}
                  variant="morph"
                />
              </div>
              <div className="flex h-[6rem] w-full items-start justify-center overflow-hidden sm:h-[4.5rem]">
                {activeCase.excerpt ? (
                  <ScrambleText
                    text={activeCase.excerpt}
                    as="p"
                    className="line-clamp-3 text-sm uppercase leading-[1.5] tracking-[0.05em] text-white"
                    duration={0.65}
                    variant="morph"
                  />
                ) : (
                  <span className="invisible text-sm uppercase leading-[1.5] tracking-[0.05em]">
                    &nbsp;
                  </span>
                )}
              </div>
            </div>

            <CaseImageCarousel cases={cases} activeIndex={snappedIndex} />

            {activeCase.stats.length ? (
              <div className="w-full max-w-[363px] space-y-1.5 font-arc-mono text-lg text-[#c0edff]">
                {activeCase.stats.map((stat) => (
                  <div
                    key={`${snappedIndex}-${stat.value}-${stat.label}`}
                    className="flex items-center justify-between gap-4"
                  >
                    <ScrambleText text={stat.value} duration={0.5} variant="morph" />
                    <ScrambleText
                      text={stat.label}
                      className="text-right"
                      duration={0.5}
                      variant="morph"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </Link>
        </div>

        <div className="absolute bottom-[72px] left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 opacity-50">
          <Image
            src="/images/philosophy/bracket-cyan-left.svg"
            alt=""
            width={7}
            height={20}
            className="h-5 w-[7px]"
          />
          <span className="font-arc-mono text-base lowercase text-white">
            scroll
          </span>
          <span className="font-arc-mono text-base text-white">→</span>
          <Image
            src="/images/philosophy/bracket-cyan-right.svg"
            alt=""
            width={7}
            height={20}
            className="h-5 w-[7px]"
          />
        </div>
      </div>
    </section>
  );
}
