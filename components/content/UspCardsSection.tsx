import { UspCard } from "@/components/cards/UspCard";
import type { UspCardItem } from "@/lib/usp-cards";

type UspCardsSectionProps = {
  title?: string;
  description?: string;
  cards?: UspCardItem[];
  ctaHref?: string;
  ctaLabel?: string;
};

export function UspCardsSection({
  title,
  description,
  cards = [],
  ctaHref = "/sobre",
  ctaLabel = "Mais sobre nós",
}: UspCardsSectionProps) {
  if (!cards.length) return null;

  return (
    <section
      className="bg-[#ececec] text-black"
      aria-label="Diferenciais"
      data-header-theme="light"
    >
      <div className="mx-auto flex max-w-[1920px] flex-col gap-10 px-6 py-16 md:px-20 md:py-24 lg:gap-14">
        {(title || description) && (
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            {title ? (
              <h2 className="max-w-[489px] font-arc-sans text-arc-heading leading-[1.2]">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="max-w-[573px] text-lg leading-[1.5] text-black/70">
                {description}
              </p>
            ) : null}
          </div>
        )}

        <div className="flex flex-col gap-4 lg:flex-row lg:gap-5">
          {cards.map((card) => (
            <UspCard
              key={card.number}
              {...card}
              href={ctaHref}
              ctaLabel={ctaLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
