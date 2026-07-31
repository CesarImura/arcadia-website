"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import {
  parsePhilosophyStatement,
  splitWords,
} from "@/lib/philosophy-statement";

const START_OPACITY = 0.3;

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

    const split = new SplitType(textEl, { types: "words" });

    textEl.classList.remove("opacity-30");
    gsap.set(split.words, { opacity: START_OPACITY });

    const tween = gsap.to(split.words, {
      opacity: 1,
      ease: "none",
      stagger: 0.08,
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        end: "top 25%",
        scrub: 0.6,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, [statement]);

  const { highlight, body } = parsePhilosophyStatement(statement);
  const highlightWords = splitWords(highlight);
  const bodyWords = splitWords(body);

  return (
    <p
      ref={containerRef}
      className="text-[clamp(1.75rem,4vw,3rem)] leading-[1.3] text-white"
      aria-label={`${highlight} ${body}`.trim()}
    >
      <span ref={textRef} className="opacity-30">
        {highlightWords.join(" ")}
        {bodyWords.length ? ` ${bodyWords.join(" ")}` : ""}
      </span>
    </p>
  );
}
