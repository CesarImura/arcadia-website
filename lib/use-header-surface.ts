"use client";

import { useEffect, useState } from "react";

export type HeaderSurface = "dark" | "light";

const HEADER_PROBE_Y = 28;

function getSurfaceAtHeader(): HeaderSurface {
  const sections = document.querySelectorAll<HTMLElement>("[data-header-theme]");

  for (const section of sections) {
    const rect = section.getBoundingClientRect();

    if (rect.top <= HEADER_PROBE_Y && rect.bottom > HEADER_PROBE_Y) {
      return section.dataset.headerTheme === "light" ? "light" : "dark";
    }
  }

  const firstSection = sections[0];
  if (firstSection) {
    return firstSection.dataset.headerTheme === "light" ? "light" : "dark";
  }

  return "dark";
}

export function useHeaderSurface(enabled: boolean) {
  const [surface, setSurface] = useState<HeaderSurface>("dark");

  useEffect(() => {
    if (!enabled) {
      setSurface("light");
      return;
    }

    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setSurface(getSurfaceAtHeader());
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [enabled]);

  return surface;
}
