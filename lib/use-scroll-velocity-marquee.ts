"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";

const BASE_SPEED = 0.75;
const VELOCITY_FACTOR = 0.35;
const VELOCITY_DECAY = 0.88;
const DEFAULT_DIRECTION = 1;

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
      direction: DEFAULT_DIRECTION,
      scrollVelocity: 0,
      lastScrollY: window.scrollY,
      loopWidth: 0,
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const measure = () => {
      motion.loopWidth = track.scrollWidth / 2;
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    if (prefersReducedMotion) {
      return () => resizeObserver.disconnect();
    }

    const tick = () => {
      const { loopWidth } = motion;
      if (!loopWidth) return;

      const currentScrollY = window.scrollY;
      const frameDelta = currentScrollY - motion.lastScrollY;
      motion.lastScrollY = currentScrollY;

      if (Math.abs(frameDelta) > 0.01) {
        motion.scrollVelocity = frameDelta;
      } else {
        motion.scrollVelocity *= VELOCITY_DECAY;
      }

      if (Math.abs(motion.scrollVelocity) > 0.05) {
        motion.direction = motion.scrollVelocity > 0 ? -1 : 1;
      }

      const speed =
        BASE_SPEED + Math.abs(motion.scrollVelocity) * VELOCITY_FACTOR;

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
