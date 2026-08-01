import { defaultCaseShowcaseItems } from "@/lib/cases-showcase";
import { resolveCaseShowcaseItems } from "@/lib/map-case-showcase";
import type { Project } from "@/lib/types";

export type SocialProofMetric = {
  id: string;
  client: string;
  value: string;
  label: string;
  href: string;
};

function flattenCaseStats(
  cases: ReturnType<typeof resolveCaseShowcaseItems>,
): SocialProofMetric[] {
  return cases.flatMap((caseItem) =>
    caseItem.stats.map((stat, index) => ({
      id: `${caseItem.id}-${index}`,
      client: caseItem.client,
      value: stat.value,
      label: stat.label,
      href: caseItem.href,
    })),
  );
}

export function buildSocialProofMetrics(
  projects?: Project[] | null,
): SocialProofMetric[] {
  const fromProjects = flattenCaseStats(resolveCaseShowcaseItems(projects));

  if (fromProjects.length) {
    return fromProjects;
  }

  return flattenCaseStats(defaultCaseShowcaseItems);
}
