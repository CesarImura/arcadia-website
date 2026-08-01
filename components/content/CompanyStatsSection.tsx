import { BracketCtaLink } from "@/components/ui/BracketCtaLink";
import { ScrambleCountUp } from "@/components/ui/ScrambleCountUp";
import { SectionBracketLabel } from "@/components/content/SectionBracketLabel";
import type { CompanyStatsSectionContent } from "@/lib/company-stats-section";

export function CompanyStatsSection({
  label,
  title,
  description,
  ctaLabel,
  ctaHref,
  stats,
}: CompanyStatsSectionContent) {
  return (
    <section
      className="bg-white text-black"
      aria-label="Números da empresa"
      data-header-theme="light"
    >
      <div className="mx-auto max-w-[1920px] px-6 py-16 md:px-20 md:py-[120px]">
        <div className="mb-12 grid gap-8 lg:mb-20 lg:grid-cols-[1fr_minmax(0,429px)_1fr] lg:items-start">
          <SectionBracketLabel label={label} tone="black" showIndex={false} />

          <div className="flex flex-col gap-6 lg:gap-8">
            <h2 className="font-arc-sans text-arc-heading font-medium leading-[1.1]">
              {title}
            </h2>
            <p className="text-lg leading-[1.5] text-black/70">{description}</p>
          </div>

          <div className="hidden lg:block" aria-hidden />
        </div>

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-6">
          {stats.map((stat) => (
            <article
              key={`${stat.value}-${stat.description}`}
              className="flex min-h-[240px] flex-col justify-between gap-10 border-l border-dashed border-black/80 px-6 lg:min-h-[280px] lg:gap-12"
            >
              <ScrambleCountUp
                value={stat.value}
                className="font-arc-sans text-arc-stat leading-[1.2]"
              />

              <div className="flex flex-col gap-6">
                <p className="text-lg leading-[1.5] text-black/70">
                  {stat.description}
                </p>
                <BracketCtaLink href={ctaHref} label={ctaLabel} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
