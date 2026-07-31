"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const DEFAULT_CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/ ";

type ScrambleTextProps = {
  text: string;
  className?: string;
  duration?: number;
  as?: "span" | "p";
  variant?: "reveal" | "morph";
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getRevealFrame(
  target: string,
  progress: number,
  charset: string,
) {
  const revealed = Math.floor(progress * target.length);
  let out = "";

  for (let i = 0; i < target.length; i++) {
    out +=
      i < revealed
        ? target[i]!
        : charset[Math.floor(Math.random() * charset.length)]!;
  }

  return out;
}

function getMorphFrame(
  from: string,
  to: string,
  progress: number,
  charset: string,
) {
  const maxLen = Math.max(from.length, to.length);
  let out = "";

  for (let i = 0; i < maxLen; i++) {
    const fromChar = from[i] ?? "";
    const toChar = to[i] ?? "";
    const stagger = maxLen > 1 ? i / (maxLen - 1) : 0;
    const start = stagger * 0.3;
    const end = start + 0.55;
    const local = clamp((progress - start) / (end - start), 0, 1);

    if (local >= 1) {
      if (toChar) out += toChar;
      continue;
    }

    if (local > 0) {
      if (toChar === " " || fromChar === " ") {
        out += " ";
      } else {
        out += charset[Math.floor(Math.random() * charset.length)]!;
      }
      continue;
    }

    if (fromChar) out += fromChar;
  }

  return out;
}

export function ScrambleText({
  text,
  className,
  duration = 0.55,
  as: Tag = "span",
  variant = "morph",
}: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prevText = useRef(text);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prevText.current === text) return;

    tweenRef.current?.kill();

    const from = prevText.current;
    const target = text;
    const charset = DEFAULT_CHARSET;
    const obj = { progress: 0 };

    tweenRef.current = gsap.to(obj, {
      progress: 1,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent =
          variant === "morph"
            ? getMorphFrame(from, target, obj.progress, charset)
            : getRevealFrame(target, obj.progress, charset);
      },
      onComplete: () => {
        el.textContent = target;
      },
    });

    prevText.current = text;

    return () => {
      tweenRef.current?.kill();
    };
  }, [text, duration, variant]);

  return (
    <Tag ref={ref as never} className={className}>
      {text}
    </Tag>
  );
}
