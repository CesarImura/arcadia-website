import Image from "next/image";
import type { Link as CtaLink } from "@/lib/types";
import { ArcButton } from "@/components/ui/ArcButton";
import { HeroStatusLine } from "@/components/content/HeroStatusLine";
import { SectionBracketLabel } from "@/components/content/SectionBracketLabel";

type HeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
};

function renderHeroTitle(title: string) {
  if (title.includes("|")) {
    const [line1, line2] = title.split("|");
    return (
      <>
        {line1.trim()}
        <br />
        {line2.trim()}
      </>
    );
  }

  if (title.includes("\n")) {
    const [line1, ...rest] = title.split("\n");
    return (
      <>
        {line1.trim()}
        <br />
        {rest.join("\n").trim()}
      </>
    );
  }

  const breakMarker = " por ";
  const breakIndex = title.indexOf(breakMarker);

  if (breakIndex !== -1) {
    const line1 = title.slice(0, breakIndex + breakMarker.length - 1);
    const line2 = title.slice(breakIndex + breakMarker.length);

    return (
      <>
        {line1}
        <br />
        {line2}
      </>
    );
  }

  return title;
}

export function Hero({
  eyebrow = "nossos resultados",
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  const primaryLabel = primaryCta?.label || "Veja nosso trabalho";
  const primaryHref = primaryCta?.href || "/projetos";
  const secondaryLabel = secondaryCta?.label || "Veja nosso trabalho";
  const secondaryHref = secondaryCta?.href || "/sobre";

  return (
    <section
      className="relative h-[100svh] min-h-[600px] overflow-hidden bg-[#04040d]"
      data-header-theme="dark"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#04040d] from-0% via-[#1b2d48] via-[42%] to-[#e2e4e3] to-100%" />
        <div className="absolute inset-0 overflow-hidden opacity-25 mix-blend-soft-light">
          <div
            className="animate-grain absolute inset-[-20%] bg-[url('/images/hero/noise-texture.png')] bg-[length:573px_573px]"
            aria-hidden
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid h-full max-w-[1920px] grid-rows-[auto_1fr_auto] gap-4 px-6 pb-[clamp(1.5rem,4vh,4rem)] pt-[clamp(5rem,14vh,7.5rem)] md:px-20">
        <div
          className="pointer-events-none absolute bottom-0 right-0 aspect-[840/301] w-[min(58vw,1120px,calc(38svh*840/301))] opacity-[0.05]"
          aria-hidden
        >
          <Image
            src="/images/hero/arc-watermark.svg"
            alt=""
            fill
            className="object-contain object-right-bottom"
            sizes="(max-width: 640px) 58vw, (max-width: 1280px) 50vw, 1120px"
            priority
          />
        </div>
        <div className="space-y-[clamp(0.75rem,2vh,1.25rem)]">
          <SectionBracketLabel
            sectionKey="hero"
            label={eyebrow}
            tone="cyan"
          />
          <h1 className="max-w-[1045px] font-arc-sans text-arc-hero leading-[1.1] tracking-tight text-white">
            {renderHeroTitle(title)}
          </h1>
        </div>

        <div className="self-end">
          <div className="max-h-[min(45vh,320px)] max-w-[425px] space-y-[clamp(0.5rem,1.5vh,0.75rem)] overflow-y-auto">
            <HeroStatusLine />

            {subtitle ? (
              <div className="space-y-0 text-[clamp(1rem,2.2vh,1.125rem)] leading-[1.5] text-black">
                {subtitle.split("\n").map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            ) : null}

            <div className="flex flex-col gap-2 pt-1 sm:flex-row">
              <ArcButton href={primaryHref}>{primaryLabel}</ArcButton>
              <ArcButton href={secondaryHref} variant="secondary">
                {secondaryLabel}
              </ArcButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
