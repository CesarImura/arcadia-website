export const defaultBlogSection = {
  label: "blog",
  title: "Fique por dentro das últimas novidades",
  limit: 4,
};

export const BLOG_CARD_ASPECTS = [
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[5/4]",
  "aspect-square",
] as const;

export const BLOG_CARD_STAGGER = [false, true, false, true] as const;
