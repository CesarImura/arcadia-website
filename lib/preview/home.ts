import type { HomePage, SiteSettings } from "@/lib/types";

export const previewHeroImageSrc =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&h=900&q=80";

export const previewSiteSettings: SiteSettings = {
  siteName: "Arcadia",
  tagline: "Projetos institucionais que conectam marca, estratégia e experiência digital.",
  footerText:
    "Estúdio criativo especializado em comunicação institucional, branding e experiências digitais.",
  contactEmail: "contato@arcadia.com.br",
  contactPhone: "+55 (11) 99999-0000",
  contactAddress: "São Paulo, SP — Brasil",
  socialLinks: [
    { platform: "instagram", url: "https://instagram.com" },
    { platform: "linkedin", url: "https://linkedin.com" },
  ],
};

export const previewHomePage: HomePage = {
  heroEyebrow: "nossos resultados",
  heroTitle: "Marketing feito por quem entende arquitetura.",
  heroSubtitle:
    "Ajudamos escritórios de arquitetura a não depender de indicação através da metodologia ARC.\nAlcance, Relevância e Crescimento.",
  heroCta: {
    label: "Veja nosso trabalho",
    href: "/projetos",
  },
  heroSecondaryCta: {
    label: "Veja nosso trabalho",
    href: "/sobre",
  },
  philosophyIndex: "nº001",
  philosophyLabel: "nossa visão",
  philosophyStatement:
    "Na Arc. acreditamos que talento|sem visibilidade é potencial desperdiçado, por isso facilitamos o crescimento de escritórios de excelência até que não dependam mais de indicação e se tornem referência no que fazem.",
  philosophySupportText:
    "Ajudamos escritórios de arquitetura a não depender de indicação através da metodologia ARC. Alcance, Relevância e Crescimento.",
  philosophyCta: {
    label: "Veja nosso trabalho",
    href: "/projetos",
  },
  philosophyValues: ["Alcance", "Relevância", "Crescimento"],
  introTitle: "Transformamos ideias em experiências",
  introText: [
    {
      _type: "block",
      _key: "intro1",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "intro1span",
          text: "Somos um estúdio focado em projetos institucionais — sites, identidades e conteúdos que comunicam credibilidade, clareza e impacto.",
          marks: [],
        },
      ],
    },
    {
      _type: "block",
      _key: "intro2",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "intro2span",
          text: "Este é um preview local. Quando o Sanity estiver configurado, todo este conteúdo passará a ser editável no CMS.",
          marks: [],
        },
      ],
    },
  ],
  stats: [
    { value: "120+", label: "Projetos entregues" },
    { value: "15", label: "Anos de experiência" },
    { value: "98%", label: "Clientes satisfeitos" },
  ],
};
