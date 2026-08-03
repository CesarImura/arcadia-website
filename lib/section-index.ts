export const NUMBERED_HOME_SECTIONS = [
  "hero",
  "philosophy",
  "gallery",
  "cases",
  "usp",
  "statement",
  "socialProof",
  "process",
  "companyStats",
  "divider",
  "blog",
  "faq",
  "lastCall",
] as const;

export type NumberedSectionKey = (typeof NUMBERED_HOME_SECTIONS)[number];

export const SECTION_DEFAULT_LABELS: Record<NumberedSectionKey, string> = {
  hero: "nossos resultados",
  philosophy: "nossa visão",
  gallery: "galeria",
  cases: "nosso impacto",
  usp: "diferenciais",
  statement: "parceria",
  socialProof: "prova social",
  process: "nosso processo",
  companyStats: "results",
  divider: "arcadia",
  blog: "blog",
  faq: "faqs",
  lastCall: "last call",
};

export function formatSectionIndex(order: number) {
  return `nº${String(order).padStart(3, "0")}`;
}

export function getSectionIndex(key: NumberedSectionKey) {
  const order = NUMBERED_HOME_SECTIONS.indexOf(key) + 1;
  return formatSectionIndex(order);
}

export function getSectionDefaultLabel(key: NumberedSectionKey) {
  return SECTION_DEFAULT_LABELS[key];
}
