import Link from "next/link";
import { ProcessScroll } from "@/components/content/ProcessScroll";
import { SectionBracketLabel } from "@/components/content/SectionBracketLabel";
import type { ProcessSectionContent } from "@/lib/process-section";

export function ProcessSection({
  label,
  title,
  description,
  ctaLabel,
  ctaHref,
  steps,
}: ProcessSectionContent) {
  return (
    <section
      className="bg-[#04040d] text-white"
      aria-label="Processo"
      data-header-theme="dark"
    >
      <div className="mx-auto flex max-w-[1920px] flex-col gap-16 px-6 py-16 md:px-20 md:py-[120px] lg:gap-[160px]">
        <header className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-[561px] flex-col gap-6">
            <SectionBracketLabel sectionKey="process" label={label} tone="cyan" />
            <h2 className="font-arc-sans text-arc-heading font-medium leading-[1.2]">
              {title}
            </h2>
          </div>

          <div className="flex max-w-[520px] flex-col gap-6">
            <p className="text-lg leading-[1.5] text-white/70">{description}</p>
            <Link
              href={ctaHref}
              className="inline-flex h-14 w-fit items-center justify-center bg-white px-5 text-lg font-medium text-black transition-opacity hover:opacity-90"
            >
              {ctaLabel}
            </Link>
          </div>
        </header>
      </div>

      <ProcessScroll steps={steps} />
    </section>
  );
}
