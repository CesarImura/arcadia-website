import Image from "next/image";
import Link from "next/link";
import type { Link as CtaLink } from "@/lib/types";
import { ArcMethodologyBox } from "@/components/content/ArcMethodologyBox";
import { CityscapeBorder } from "@/components/content/CityscapeBorder";
import { PhilosophyStatementReveal } from "@/components/content/PhilosophyStatementReveal";
import { SectionBracketLabel } from "@/components/content/SectionBracketLabel";

type PhilosophySectionProps = {
  label?: string;
  statement?: string;
  supportText?: string;
  cta?: CtaLink;
  values?: string[];
};

const defaults = {
  label: "nossa visão",
  statement:
    "Na Arc. acreditamos que talento|sem visibilidade é potencial desperdiçado, por isso facilitamos o crescimento de escritórios de excelência até que não dependam mais de indicação e se tornem referência no que fazem.",
  supportText:
    "Ajudamos escritórios de arquitetura a não depender de indicação através da metodologia ARC. Alcance, Relevância e Crescimento.",
  cta: { label: "Veja nosso trabalho", href: "/projetos" },
  values: ["Alcance", "Relevância", "Crescimento"],
};

export function PhilosophySection({
  label = defaults.label,
  statement = defaults.statement,
  supportText = defaults.supportText,
  cta = defaults.cta,
  values = defaults.values,
}: PhilosophySectionProps) {
  const ctaLabel = cta?.label || defaults.cta.label;
  const ctaHref = cta?.href || defaults.cta.href;

  return (
    <section
      className="relative overflow-x-clip overflow-hidden bg-[#04040d] text-white"
      data-header-theme="dark"
    >
      <CityscapeBorder />

      <div className="mx-auto max-w-[1920px] px-6 py-16 md:px-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[192px_1fr] lg:gap-16">
          <aside className="space-y-5">
            <SectionBracketLabel sectionKey="philosophy" label={label} tone="cyan" />
            <div className="relative hidden aspect-square max-h-[422px] w-full overflow-hidden opacity-15 lg:block">
              <Image
                src="/images/philosophy/grid-base.png"
                alt=""
                fill
                className="object-cover"
              />
              <Image
                src="/images/philosophy/grid-overlay.png"
                alt=""
                fill
                className="object-cover mix-blend-screen"
              />
            </div>
          </aside>

          <div className="space-y-[53px]">
            <PhilosophyStatementReveal statement={statement} />

            <div className="h-px w-full bg-white/20" />

            <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
              <ArcMethodologyBox values={values} />

              <div className="max-w-[425px] space-y-4">
                <p className="text-lg leading-[1.5] text-white/60">{supportText}</p>
                <Link
                  href={ctaHref}
                  className="inline-flex h-14 min-w-[204px] items-center justify-center bg-white px-5 text-lg font-medium leading-none text-black transition hover:bg-white/90"
                >
                  {ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
