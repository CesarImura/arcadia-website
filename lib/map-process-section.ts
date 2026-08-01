import { defaultProcessSection, type ProcessSectionContent } from "@/lib/process-section";
import { urlFor } from "@/lib/sanity/image";
import type { HomePage } from "@/lib/types";

export function resolveProcessSection(
  homePage?: HomePage | null,
): ProcessSectionContent {
  const mappedSteps =
    homePage?.processSteps
      ?.flatMap((step, index) => {
        if (!step.title?.trim() || !step.image?.asset) return [];

        return [
          {
            id: `process-${index}`,
            number: String(index + 1).padStart(2, "0"),
            title: step.title.trim(),
            description: step.description?.trim() || "",
            imageSrc: urlFor(step.image)
              .width(1200)
              .height(900)
              .quality(85)
              .url(),
            imageAlt: step.image.alt || step.title,
          },
        ];
      }) ?? [];

  return {
    label: homePage?.processLabel || defaultProcessSection.label,
    title: homePage?.processTitle || defaultProcessSection.title,
    description:
      homePage?.processDescription || defaultProcessSection.description,
    ctaLabel:
      homePage?.processCta?.label || defaultProcessSection.ctaLabel,
    ctaHref: homePage?.processCta?.href || defaultProcessSection.ctaHref,
    steps: mappedSteps.length ? mappedSteps : defaultProcessSection.steps,
  };
}
