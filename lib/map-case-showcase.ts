import type { Project } from "@/lib/types";
import { urlFor } from "@/lib/sanity/image";
import {
  defaultCaseShowcaseItems,
  type CaseShowcaseItem,
} from "@/lib/cases-showcase";

export function mapProjectToCaseItem(project: Project): CaseShowcaseItem {
  const imageSrc = project.coverImage?.asset
    ? urlFor(project.coverImage).width(900).height(900).quality(85).url()
    : "/images/cases/goiva-cover.jpg";

  return {
    id: project._id,
    client: project.client || project.title,
    location: project.location || "Brasil",
    highlightValue: project.highlightValue || project.location || "",
    year: project.year,
    excerpt: project.excerpt,
    imageSrc,
    imageAlt: project.coverImage?.alt || project.title,
    href: `/projetos/${project.slug.current}`,
    stats: project.caseStats?.length
      ? project.caseStats
      : defaultCaseShowcaseItems[0].stats,
  };
}

export function resolveCaseShowcaseItems(
  projects?: Project[] | null,
): CaseShowcaseItem[] {
  const mapped =
    projects
      ?.filter((project) => project.coverImage?.asset)
      .map(mapProjectToCaseItem) ?? [];

  return mapped.length ? mapped : defaultCaseShowcaseItems;
}
