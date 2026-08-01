import { CasesGalleryScroll } from "@/components/content/CasesGalleryScroll";
import { resolveCaseShowcaseItems } from "@/lib/map-case-showcase";
import type { Project } from "@/lib/types";

type CasesGallerySectionProps = {
  projects?: Project[] | null;
  label?: string;
};

export function CasesGallerySection({
  projects,
  label = "nosso impacto",
}: CasesGallerySectionProps) {
  const cases = resolveCaseShowcaseItems(projects);

  return (
    <CasesGalleryScroll cases={cases} label={label} />
  );
}
