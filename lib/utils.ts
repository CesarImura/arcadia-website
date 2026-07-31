import type { Link, SiteSettings } from "@/lib/types";

export const defaultNavigation: Link[] = [
  { label: "Homepage", href: "/" },
  { label: "Cases", href: "/projetos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];

export const defaultFooterLinks: Link[] = [
  { label: "Privacidade", href: "/paginas/privacidade" },
  { label: "Termos", href: "/paginas/termos" },
];

export function getNavigation(settings?: SiteSettings | null) {
  return settings?.navigation?.length
    ? settings.navigation
    : defaultNavigation;
}

export function getFooterLinks(settings?: SiteSettings | null) {
  return settings?.footerLinks?.length
    ? settings.footerLinks
    : defaultFooterLinks;
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
