import { SocialProofMarquee } from "@/components/content/SocialProofMarquee";
import { buildSocialProofMetrics } from "@/lib/social-proof-metrics";
import { defaultSocialProofSection } from "@/lib/social-proof-section";
import type { Project } from "@/lib/types";

type SocialProofSectionProps = {
  projects?: Project[] | null;
  title?: string;
  description?: string;
};

export function SocialProofSection({
  projects,
  title = defaultSocialProofSection.title,
  description = defaultSocialProofSection.description,
}: SocialProofSectionProps) {
  const metrics = buildSocialProofMetrics(projects);

  return (
    <section
      className="bg-[#ececec] py-16 md:py-[120px]"
      aria-label="Prova social"
      data-header-theme="light"
    >
      <div className="mx-auto flex max-w-[1920px] flex-col items-center gap-12 md:gap-20">
        <header className="flex w-full flex-col gap-6 px-6 md:flex-row md:items-start md:justify-between md:px-20">
          <h2 className="max-w-[533px] font-arc-sans text-arc-heading font-medium leading-[1.2] text-black">
            {title}
          </h2>
          <p className="max-w-[586px] text-lg leading-[1.5] text-black/70">
            {description}
          </p>
        </header>

        <SocialProofMarquee metrics={metrics} />
      </div>
    </section>
  );
}
