import {
  defaultCompanyStatsSection,
  type CompanyStatsSectionContent,
} from "@/lib/company-stats-section";
import type { HomePage } from "@/lib/types";

export function resolveCompanyStatsSection(
  homePage?: HomePage | null,
): CompanyStatsSectionContent {
  const mappedStats =
    homePage?.companyStats
      ?.filter((stat) => stat.value?.trim() && stat.description?.trim())
      .map((stat) => ({
        value: stat.value.trim(),
        description: stat.description.trim(),
      })) ?? [];

  return {
    label: homePage?.companyStatsLabel || defaultCompanyStatsSection.label,
    title: homePage?.companyStatsTitle || defaultCompanyStatsSection.title,
    description:
      homePage?.companyStatsDescription ||
      defaultCompanyStatsSection.description,
    ctaLabel:
      homePage?.companyStatsCta?.label || defaultCompanyStatsSection.ctaLabel,
    ctaHref:
      homePage?.companyStatsCta?.href || defaultCompanyStatsSection.ctaHref,
    stats: mappedStats.length ? mappedStats : defaultCompanyStatsSection.stats,
  };
}
