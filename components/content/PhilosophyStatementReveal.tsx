"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import {
  parsePhilosophyStatement,
  splitWords,
} from "@/lib/philosophy-statement";

const BASE_COLOR = "rgba(255, 255, 255, 0.3)";
const FULL_COLOR = "rgba(255, 255, 255, 1)";
const WAVE_COLOR = "#C0EDFF";
/** Characters in the cyan → white wave front */
const WAVE_WIDTH = 3;

type PhilosophyStatementRevealProps = {
  statement: string;
};

export function PhilosophyStatementReveal({
  statement,
}: PhilosophyStatementRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const split = new SplitType(textEl, { types: "chars" });
    const chars = (split.chars ?? []) as HTMLElement[];

    gsap.set(chars, { color: BASE_COLOR });

    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top 85%",
      end: "top 25%",
      scrub: 0.6,
      onUpdate: (self) => {
        const head = self.progress * (chars.length + WAVE_WIDTH);

        chars.forEach((char, index) => {
          const local = head - index;

          if (local <= 0) {
            gsap.set(char, { color: BASE_COLOR });
            return;
          }

          if (local >= WAVE_WIDTH) {
            gsap.set(char, { color: FULL_COLOR });
            return;
          }

          gsap.set(char, {
            color: gsap.utils.interpolate(
              WAVE_COLOR,
              FULL_COLOR,
              local / WAVE_WIDTH,
            ),
          });
        });
      },
    });

    return () => {
      scrollTrigger.kill();
      split.revert();
    };
  }, [statement]);

  const { highlight, body } = parsePhilosophyStatement(statement);
  const highlightWords = splitWords(highlight);
  const bodyWords = splitWords(body);

  return (
    <p
      ref={containerRef}
      className="font-arc-sans text-arc-heading leading-[1.3] text-white/30"
      aria-label={`${highlight} ${body}`.trim()}
    >
      <span ref={textRef}>
        {highlightWords.join(" ")}
        {bodyWords.length ? ` ${bodyWords.join(" ")}` : ""}
      </span>
    </p>
  );
}
