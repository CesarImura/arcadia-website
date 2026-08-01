"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScrollVelocityMarquee } from "@/lib/use-scroll-velocity-marquee";

type WordDividerMarqueeProps = {
  words: string[];
};

function MarqueeSequence({ words }: { words: string[] }) {
  return words.flatMap((word, index) => [
    <span
      key={`word-${index}`}
      className="shrink-0 whitespace-nowrap font-arc-sans text-arc-display leading-[1.2] text-black"
    >
      {word}
    </span>,
    <span
      key={`arrow-${index}`}
      className="flex size-[clamp(2.5rem,5vw,3.5rem)] shrink-0 items-center justify-center opacity-30"
    >
      <Image
        src="/images/divider-marquee/arrow.svg"
        alt=""
        width={54}
        height={45}
        className="h-auto w-[clamp(1.75rem,3.5vw,2.75rem)]"
        draggable={false}
        aria-hidden
      />
    </span>,
  ]);
}

export function WordDividerMarquee({ words }: WordDividerMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const sanitizedWords = words.map((word) => word.trim()).filter(Boolean);

  useScrollVelocityMarquee(trackRef, sanitizedWords.length > 0);

  if (!sanitizedWords.length) return null;

  const loop = [...sanitizedWords, ...sanitizedWords];

  return (
    <section
      className="overflow-x-clip bg-[#fafafa] py-10 md:py-14"
      aria-label="Marquee divisora"
      data-header-theme="light"
    >
      <div className="relative">
        <div
          ref={trackRef}
          className="flex w-max items-center gap-8 will-change-transform"
        >
          <MarqueeSequence words={loop} />
        </div>
      </div>
    </section>
  );
}
