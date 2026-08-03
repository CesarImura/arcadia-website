"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { getScrollVelocity } from "@/lib/scroll-velocity";

const BASE_SPEED = 0.65;
const VELOCITY_FACTOR = 0.035;
const IDLE_DIRECTION = 1;

export function useScrollVelocityMarquee(
  trackRef: RefObject<HTMLDivElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;

    const track = trackRef.current;
    if (!track) return;

    const motion = {
      offset: 0,
      direction: IDLE_DIRECTION,
      loopWidth: 0,
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const measure = () => {
      motion.loopWidth = track.scrollWidth / 2;
    };

    measure();

    const resizeObserver = new ResizeObserver(() => {
      measure();
      if (motion.loopWidth) {
        motion.offset =
          ((motion.offset % motion.loopWidth) + motion.loopWidth) %
          motion.loopWidth;
      }
    });
    resizeObserver.observe(track);

    if (prefersReducedMotion) {
      return () => resizeObserver.disconnect();
    }

    const tick = () => {
      const { loopWidth } = motion;
      if (!loopWidth) return;

      const scrollVelocity = getScrollVelocity();

      if (Math.abs(scrollVelocity) > 0.05) {
        motion.direction = scrollVelocity > 0 ? -1 : 1;
      }

      const speed =
        BASE_SPEED + Math.abs(scrollVelocity) * VELOCITY_FACTOR;

      motion.offset += motion.direction * speed;

      if (motion.offset >= loopWidth) {
        motion.offset -= loopWidth;
      } else if (motion.offset < 0) {
        motion.offset += loopWidth;
      }

      track.style.transform = `translate3d(${-motion.offset}px, 0, 0)`;
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      resizeObserver.disconnect();
      track.style.transform = "";
    };
  }, [trackRef, enabled]);
}
