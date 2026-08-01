import Image from "next/image";
import type { Link as CtaLink } from "@/lib/types";
import { ArcButton } from "@/components/ui/ArcButton";
import { HeroStatusLine } from "@/components/content/HeroStatusLine";

type HeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
};

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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,rgba(226,228,227,0.15),transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-25 mix-blend-soft-light"
          style={{
            backgroundImage: "url(/images/hero/noise-texture.png)",
            backgroundSize: "573px 573px",
          }}
        />
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
      </div>

      <div className="relative z-10 mx-auto grid h-full max-w-[1920px] grid-rows-[auto_1fr_auto] gap-4 px-6 pb-[clamp(1.5rem,4vh,4rem)] pt-[clamp(5rem,14vh,7.5rem)] md:px-20">
        <div className="max-w-[1045px] space-y-[clamp(0.75rem,2vh,1.25rem)]">
          <div className="flex items-center gap-2">
            <span className="size-2 bg-white" />
            <p className="text-sm uppercase tracking-[0.05em] text-white">
              {eyebrow}
            </p>
          </div>
          <h1 className="max-w-[1045px] text-arc-hero font-normal leading-[1.1] tracking-tight text-white">
            {title}
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
