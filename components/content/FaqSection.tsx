import Image from "next/image";
import { FaqAccordion } from "@/components/content/FaqAccordion";
import { SectionBracketLabel } from "@/components/content/SectionBracketLabel";
import type { FaqSectionContent } from "@/lib/faq-section";

export function FaqSection({ label, title, items }: FaqSectionContent) {
  return (
    <section
      className="bg-[#ececec] text-black"
      aria-label="Perguntas frequentes"
      data-header-theme="light"
    >
      <div className="mx-auto flex max-w-[1920px] flex-col gap-12 px-6 py-16 md:flex-row md:items-start md:justify-between md:gap-16 md:px-20 md:py-[120px]">
        <div className="flex flex-col justify-between gap-12 md:min-h-[678px] md:max-w-[606px] md:self-stretch">
          <div className="flex flex-col gap-6">
            <SectionBracketLabel label={label} tone="black" showIndex={false} />
            <h2 className="font-arc-sans text-arc-heading font-medium leading-[1.2]">
              {title}
            </h2>
          </div>

          <Image
            src="/images/faq/arc-logo.svg"
            alt=""
            width={88}
            height={88}
            className="size-[88px]"
            aria-hidden
          />
        </div>

        <div className="w-full max-w-[823px] shrink-0">
          <FaqAccordion items={items} />
        </div>
      </div>
    </section>
  );
}
