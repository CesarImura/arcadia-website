import Image from "next/image";

type StatementSectionProps = {
  leadText?: string;
  trailingLineOne?: string;
  trailingLineTwo?: string;
  supportText?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function StatementSection({
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
        <div className="grid w-full items-center gap-8 xl:grid-cols-[1fr_minmax(280px,574px)_1fr] xl:gap-[clamp(2rem,9vw,10.75rem)]">
          <p className="font-arc-sans text-arc-heading-lg leading-[1.1] xl:text-left">
            {leadText}
          </p>

          <div className="relative mx-auto aspect-[574/741] w-full max-w-[574px] overflow-hidden bg-black">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 80vw, 574px"
            />
          </div>

          <div className="font-arc-sans text-arc-heading-lg leading-[1.1] xl:text-right">
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
