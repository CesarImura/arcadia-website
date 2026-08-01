export type CompanyStatItem = {
  value: string;
  description: string;
};

export type CompanyStatsSectionContent = {
  label: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  stats: CompanyStatItem[];
};

export const defaultCompanyStatsSection: CompanyStatsSectionContent = {
  label: "results",
  title: "Nossos números não mentem. Crescimento",
  description:
    "Resultados reais de escritórios que saíram da dependência de indicação e passaram a ocupar espaço no mercado.",
  ctaLabel: "sobre nós",
  ctaHref: "/sobre",
  stats: [
    {
      value: "480%",
      description:
        "Crescimento médio de demanda qualificada nos primeiros 12 meses de parceria.",
    },
    {
      value: "120+",
      description:
        "Projetos e campanhas executados com foco em posicionamento e geração de oportunidades.",
    },
    {
      value: "15",
      description:
        "Anos de experiência conectando arquitetura, estratégia e performance comercial.",
    },
  ],
};
