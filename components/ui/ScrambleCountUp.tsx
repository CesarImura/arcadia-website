"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  formatStatNumber,
  getRevealFrame,
  parseStatValue,
} from "@/lib/scramble-utils";

type ScrambleCountUpProps = {
  value: string;
  className?: string;
  duration?: number;
};

const SCRAMBLE_CHARSET = "0123456789%+. ";

export function ScrambleCountUp({
  value,
  className,
  duration = 1.35,
}: ScrambleCountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const parsed = parseStatValue(value);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!parsed || prefersReducedMotion) {
      element.textContent = value;
      return;
    }

    const startValue = formatStatNumber(parsed, 0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;

        hasAnimated.current = true;

        const tweenState = { progress: 0 };

        gsap.to(tweenState, {
          progress: 1,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            const currentNumber = parsed.number * tweenState.progress;
            const currentValue = formatStatNumber(parsed, currentNumber);
            element.textContent = getRevealFrame(
              currentValue,
              Math.min(0.85, tweenState.progress + 0.15),
              SCRAMBLE_CHARSET,
            );
          },
          onComplete: () => {
            element.textContent = value;
          },
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(element);
    element.textContent = startValue;

    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
