"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FRAME_LAYERS = [
  {
    src: "/images/last-call/frame-outer.svg",
    width: 1441,
    height: 476,
    maxWidth: "min(76vw, 1400px)",
    depth: 38,
  },
  {
    src: "/images/last-call/frame-middle.svg",
    width: 1119,
    height: 354,
    maxWidth: "min(64vw, 1090px)",
    depth: 28,
  },
  {
    src: "/images/last-call/frame-inner.svg",
    width: 1775,
    height: 728,
    maxWidth: "min(89vw, 1710px)",
    depth: 18,
  },
] as const;

type LastCallFramesProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
};

export function LastCallFrames({
  sectionRef,
  contentRef,
}: LastCallFramesProps) {
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    gsap.registerPlugin(ScrollTrigger);

    const layers = layerRefs.current.filter(Boolean) as HTMLDivElement[];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let entranceTween: gsap.core.Tween | null = null;
    let scrollTrigger: ScrollTrigger | null = null;

    if (!prefersReducedMotion && layers.length) {
      gsap.set(layers, { scale: 0.92, opacity: 0 });

      entranceTween = gsap.to(layers, {
        scale: 1,
        opacity: 1,
        duration: 1.05,
        stagger: 0.1,
        ease: "power3.out",
        paused: true,
      });

      scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top 72%",
        once: true,
        onEnter: () => entranceTween?.play(),
      });
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (window.matchMedia("(max-width: 1023px)").matches) return;

      const rect = content.getBoundingClientRect();
      mouseRef.current = {
        x: (event.clientX - (rect.left + rect.width / 2)) / rect.width,
        y: (event.clientY - (rect.top + rect.height / 2)) / rect.height,
      };
    };

    const tick = () => {
      if (prefersReducedMotion) return;

      const { x, y } = mouseRef.current;

      layers.forEach((layer, index) => {
        const depth = FRAME_LAYERS[index]?.depth ?? 20;
        gsap.set(layer, {
          x: x * depth,
          y: y * (depth * 0.45),
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(tick);
      entranceTween?.kill();
      scrollTrigger?.kill();
    };
  }, [sectionRef, contentRef]);

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden
    >
      {FRAME_LAYERS.map((layer, index) => (
        <div
          key={layer.src}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: layer.maxWidth }}
        >
          <div
            ref={(element) => {
              layerRefs.current[index] = element;
            }}
            className="will-change-transform"
          >
            <Image
              src={layer.src}
              alt=""
              width={layer.width}
              height={layer.height}
              className="h-auto w-full max-h-[min(728px,70vh)] object-contain"
              draggable={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
