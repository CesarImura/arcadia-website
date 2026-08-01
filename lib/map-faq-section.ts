import {
  defaultFaqSection,
  type FaqSectionContent,
} from "@/lib/faq-section";
import type { HomePage } from "@/lib/types";

export function resolveFaqSection(homePage?: HomePage | null): FaqSectionContent {
  const mappedItems =
    homePage?.faqItems
      ?.filter((item) => item.question?.trim() && item.answer?.trim())
      .map((item) => ({
        question: item.question.trim(),
        answer: item.answer.trim(),
      })) ?? [];

  return {
    label: homePage?.faqLabel || defaultFaqSection.label,
    title: homePage?.faqTitle || defaultFaqSection.title,
    items: mappedItems.length ? mappedItems : defaultFaqSection.items,
  };
}
