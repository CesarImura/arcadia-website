import Image from "next/image";
import { SectionBracketLabel } from "@/components/content/SectionBracketLabel";
import { getSectionDefaultLabel } from "@/lib/section-index";

type StatementSectionProps = {
  label?: string;
  leadText?: string;
  trailingLineOne?: string;
  trailingLineTwo?: string;
  supportText?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function StatementSection({
  label = getSectionDefaultLabel("statement"),
  leadText = "Quem trabalha com a gente",
  trailingLineOne = "Não depende",
  trailingLineTwo = "de indicação",
  supportText,
  imageSrc = "/images/statement/statement-photo.jpg",
  imageAlt = "Equipe em reunião",
}: StatementSectionProps) {
  return (
    <section
      className="bg-[#ececec] text-black"
      aria-label="Afirmação"
      data-header-theme="light"
    >
      <div className="mx-auto flex max-w-[1920px] flex-col items-center gap-5 px-6 py-16 md:px-20 md:py-24">
        <SectionBracketLabel sectionKey="statement" label={label} tone="black" />

        <div className="grid w-full items-center gap-8 min-[1200px]:grid-cols-[minmax(0,1fr)_minmax(220px,32vw)_minmax(0,1fr)] min-[1200px]:gap-10 min-[1440px]:gap-16 min-[1600px]:gap-[clamp(2rem,9vw,10.75rem)]">
          <p className="font-arc-display text-arc-heading-lg leading-[1.1] min-[1200px]:text-left">
            {leadText}
          </p>

          <div className="relative mx-auto aspect-[574/741] w-full max-w-[min(100%,320px)] overflow-hidden bg-black min-[1200px]:max-w-[min(32vw,420px)] min-[1600px]:max-w-[574px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1199px) 72vw, (max-width: 1599px) 32vw, 574px"
            />
          </div>

          <div className="font-arc-display text-arc-heading-lg leading-[1.1] min-[1200px]:text-right">
            <p>{trailingLineOne}</p>
            <p>{trailingLineTwo}</p>
          </div>
        </div>

        {supportText ? (
          <p className="max-w-[575px] text-center text-lg leading-[1.5] text-black/70">
            {supportText}
          </p>
        ) : null}
      </div>
    </section>
  );
}
