"use client";

import { useEffect, useRef, useState } from "react";
import { SocialProofMetricCard } from "@/components/cards/SocialProofMetricCard";
import type { SocialProofMetric } from "@/lib/social-proof-metrics";

type SocialProofMarqueeProps = {
  metrics: SocialProofMetric[];
};

type PointerSample = {
  x: number;
  t: number;
};

const ANIMATION_DURATION_S = 50;
const DRAG_CLICK_THRESHOLD = 8;
const MOMENTUM_SCALE = 0.75;
const MOMENTUM_FRICTION = 0.9;
const MOMENTUM_MIN = 0.015;
const VELOCITY_WINDOW_MS = 80;

function captureOffset(track: HTMLElement) {
  const transform = window.getComputedStyle(track).transform;
  if (!transform || transform === "none") return 0;
  return -new DOMMatrix(transform).m41;
}

function wrapOffset(offset: number, loopWidth: number) {
  if (!loopWidth) return offset;

  let wrapped = offset;
  while (wrapped >= loopWidth) wrapped -= loopWidth;
  while (wrapped < 0) wrapped += loopWidth;
  return wrapped;
}

export function SocialProofMarquee({ metrics }: SocialProofMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    offset: 0,
    loopWidth: 0,
    isDragging: false,
    isHovered: false,
    jsMode: false,
    dragStartX: 0,
    dragStartOffset: 0,
    dragDistance: 0,
    pointerId: -1,
    recentMoves: [] as PointerSample[],
    momentumFrame: 0,
  });
  const suppressClickRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!metrics.length) return;

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const state = stateRef.current;

    const measure = () => {
      state.loopWidth = track.scrollWidth / 2;
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    const applyJsOffset = (offset: number) => {
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };

    const resumeCssAnimation = () => {
      state.jsMode = false;
      const offset = wrapOffset(state.offset, state.loopWidth);
      const progress = state.loopWidth ? offset / state.loopWidth : 0;

      track.style.transform = "";
      track.style.animation = "";
      track.style.animationDelay = `${-progress * ANIMATION_DURATION_S}s`;
      track.classList.add("animate-social-proof-marquee");
      track.style.animationPlayState = state.isHovered ? "paused" : "";
    };

    const enterJsMode = (offset: number) => {
      state.jsMode = true;
      state.offset = offset;
      track.classList.remove("animate-social-proof-marquee");
      track.style.animation = "none";
      track.style.animationDelay = "";
      track.style.animationPlayState = "";
      applyJsOffset(offset);
    };

    const cancelMomentum = () => {
      if (state.momentumFrame) {
        cancelAnimationFrame(state.momentumFrame);
        state.momentumFrame = 0;
      }
    };

    const computeVelocity = (moves: PointerSample[]) => {
      if (moves.length < 2) return 0;

      const latest = moves[moves.length - 1].t;
      const samples = moves.filter((sample) => latest - sample.t <= VELOCITY_WINDOW_MS);

      if (samples.length < 2) return 0;

      const first = samples[0];
      const last = samples[samples.length - 1];
      const elapsed = last.t - first.t;

      if (elapsed <= 0) return 0;

      return ((last.x - first.x) / elapsed) * MOMENTUM_SCALE;
    };

    const runMomentum = (velocity: number) => {
      cancelMomentum();
      let currentVelocity = velocity;
      let lastTime = performance.now();

      const step = (now: number) => {
        const delta = now - lastTime;
        lastTime = now;

        if (Math.abs(currentVelocity) < MOMENTUM_MIN) {
          resumeCssAnimation();
          return;
        }

        state.offset = wrapOffset(
          state.offset - currentVelocity * delta,
          state.loopWidth,
        );
        applyJsOffset(state.offset);
        currentVelocity *= Math.pow(MOMENTUM_FRICTION, delta / 16);
        state.momentumFrame = requestAnimationFrame(step);
      };

      state.momentumFrame = requestAnimationFrame(step);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;

      cancelMomentum();
      track.style.animationPlayState = "paused";

      state.isDragging = true;
      state.offset = captureOffset(track);
      state.dragStartX = event.clientX;
      state.dragStartOffset = state.offset;
      state.dragDistance = 0;
      state.pointerId = event.pointerId;
      state.recentMoves = [{ x: event.clientX, t: performance.now() }];
      setIsDragging(true);

      container.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!state.isDragging || event.pointerId !== state.pointerId) return;

      const now = performance.now();
      state.recentMoves.push({ x: event.clientX, t: now });
      state.recentMoves = state.recentMoves.filter(
        (sample) => now - sample.t <= VELOCITY_WINDOW_MS,
      );

      const delta = event.clientX - state.dragStartX;
      state.dragDistance = Math.abs(delta);

      if (!state.jsMode && state.dragDistance > DRAG_CLICK_THRESHOLD) {
        enterJsMode(state.dragStartOffset);
      }

      if (!state.jsMode) return;

      state.offset = wrapOffset(state.dragStartOffset - delta, state.loopWidth);
      applyJsOffset(state.offset);
    };

    const endDrag = (event: PointerEvent) => {
      if (!state.isDragging || event.pointerId !== state.pointerId) return;

      if (state.jsMode && state.dragDistance > DRAG_CLICK_THRESHOLD) {
        suppressClickRef.current = true;
        const velocity = computeVelocity(state.recentMoves);

        if (Math.abs(velocity) > MOMENTUM_MIN) {
          runMomentum(velocity);
        } else {
          resumeCssAnimation();
        }
      } else {
        track.style.animationPlayState = state.isHovered ? "paused" : "";
      }

      state.isDragging = false;
      state.pointerId = -1;
      state.recentMoves = [];
      setIsDragging(false);

      if (container.hasPointerCapture(event.pointerId)) {
        container.releasePointerCapture(event.pointerId);
      }
    };

    const handlePointerEnter = () => {
      state.isHovered = true;
    };

    const handlePointerLeave = () => {
      state.isHovered = false;

      if (!state.jsMode && !state.isDragging) {
        track.style.animationPlayState = "";
      }
    };

    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerup", endDrag);
    container.addEventListener("pointercancel", endDrag);
    container.addEventListener("pointerenter", handlePointerEnter);
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelMomentum();
      resizeObserver.disconnect();
      track.style.transform = "";
      track.style.animation = "";
      track.style.animationDelay = "";
      track.style.animationPlayState = "";
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerup", endDrag);
      container.removeEventListener("pointercancel", endDrag);
      container.removeEventListener("pointerenter", handlePointerEnter);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [metrics.length]);

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (suppressClickRef.current) {
      event.preventDefault();
      event.stopPropagation();
      suppressClickRef.current = false;
    }
  };

  if (!metrics.length) return null;

  const loop = [...metrics, ...metrics];

  return (
    <div
      ref={containerRef}
      className={`group/social-marquee w-full overflow-x-clip touch-pan-y select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      aria-label="Resultados dos nossos cases"
      onClickCapture={handleClickCapture}
    >
      <div
        ref={trackRef}
        className="flex w-max animate-social-proof-marquee gap-4 will-change-transform group-hover/social-marquee:[animation-play-state:paused] motion-reduce:animate-none"
      >
        {loop.map((metric, index) => (
          <SocialProofMetricCard
            key={`${metric.id}-${index}`}
            metric={metric}
          />
        ))}
      </div>
    </div>
  );
}
