import type { Link, SiteSettings } from "@/lib/types";

export type FooterAiPlatform = "claude" | "perplexity" | "gemini" | "chatgpt";

export type FooterAiLink = {
  platform: FooterAiPlatform;
  url: string;
};

export type FooterProjectLink = {
  title: string;
  href: string;
};

export type FooterContent = {
  primaryCta: Link;
  secondaryCta: Link;
  companyLinks: Link[];
  aiSummaryTitle: string;
  aiLinks: FooterAiLink[];
  copyrightText: string;
  featuredProjects: FooterProjectLink[];
};

export const defaultFooterCompanyLinks: Link[] = [
  { label: "Sobre nós", href: "/sobre" },
  { label: "Cases de sucesso", href: "/projetos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
  { label: "Política de privacidade", href: "/paginas/privacidade" },
];

export const defaultFooterPrimaryCta: Link = {
  label: "Agendar ligação",
  href: "/contato",
};

export const defaultFooterSecondaryCta: Link = {
  label: "Veja nossos preços",
  href: "/contato",
};

export const defaultFooterAiLinks: FooterAiLink[] = [
  {
    platform: "claude",
    url: "https://claude.ai/new?q=Resuma%20a%20empresa%20Arcadia%20marketing%20para%20arquitetura",
  },
  {
    platform: "perplexity",
    url: "https://www.perplexity.ai/search?q=Arcadia%20marketing%20arquitetura",
  },
  {
    platform: "gemini",
    url: "https://gemini.google.com/app?q=Resuma%20a%20empresa%20Arcadia",
  },
  {
    platform: "chatgpt",
    url: "https://chatgpt.com/?q=Resuma%20a%20empresa%20Arcadia%20marketing%20para%20arquitetura",
  },
];

export const footerAiPlatformLabels: Record<FooterAiPlatform, string> = {
  claude: "Claude",
  perplexity: "Perplexity",
  gemini: "Google Gemini",
  chatgpt: "ChatGPT",
};

export const footerAiPlatformIcons: Record<FooterAiPlatform, string> = {
  claude: "/images/footer/ai-claude.svg",
  perplexity: "/images/footer/ai-perplexity.svg",
  gemini: "/images/footer/ai-gemini.svg",
  chatgpt: "/images/footer/ai-chatgpt.svg",
};

export function resolveFooterContent(
  settings?: SiteSettings | null,
  featuredProjects: FooterProjectLink[] = [],
): FooterContent {
  const siteName = settings?.siteName || "Arcadia";
  const year = new Date().getFullYear();

  return {
    primaryCta: settings?.footerPrimaryCta || defaultFooterPrimaryCta,
    secondaryCta: settings?.footerSecondaryCta || defaultFooterSecondaryCta,
    companyLinks:
      settings?.footerLinks?.length
        ? settings.footerLinks
        : defaultFooterCompanyLinks,
    aiSummaryTitle:
      settings?.footerAiSummaryTitle ||
      "Veja um resumo de IA sobre Arcadia",
    aiLinks:
      settings?.footerAiLinks?.length
        ? settings.footerAiLinks
        : defaultFooterAiLinks,
    copyrightText:
      settings?.footerCopyright ||
      `©${year} ${siteName}. Todos os direitos reservados.`,
    featuredProjects,
  };
}
