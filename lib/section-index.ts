export const NUMBERED_HOME_SECTIONS = [
  "philosophy",
  "cases",
  "process",
  "blog",
  "lastCall",
] as const;

export type NumberedSectionKey = (typeof NUMBERED_HOME_SECTIONS)[number];

export function formatSectionIndex(order: number) {
  return `nº${String(order).padStart(3, "0")}`;
}

export function getSectionIndex(key: NumberedSectionKey) {
  const order = NUMBERED_HOME_SECTIONS.indexOf(key) + 1;
  return formatSectionIndex(order);
}
