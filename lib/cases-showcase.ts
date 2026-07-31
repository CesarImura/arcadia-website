export type CaseShowcaseItem = {
  id: string;
  client: string;
  location: string;
  highlightValue: string;
  year?: number;
  excerpt?: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  stats: { value: string; label: string }[];
};

export const defaultCaseShowcaseItems: CaseShowcaseItem[] = [
  {
    id: "preview-goiva",
    client: "Goiva",
    location: "São Paulo",
    highlightValue: "R$3.2mi",
    year: 2026,
    excerpt:
      "O Goiva entende a arquitetura como exercício de escultura: espaços e ideias trabalhados até que a curva escape do linear e encontre o inusitado.",
    imageSrc: "/images/cases/goiva-cover.jpg",
    imageAlt: "Projeto Goiva",
    href: "/projetos",
    stats: [
      { value: "+R$ 3.2m", label: "propostas novas" },
      { value: "+500% Leads", label: "em menos de 2 anos" },
    ],
  },
  {
    id: "preview-atelier",
    client: "Atelier Norte",
    location: "Curitiba",
    highlightValue: "R$1.8mi",
    year: 2025,
    excerpt:
      "Posicionamento digital para um escritório que traduz paisagem urbana em linguagem material e habitável.",
    imageSrc: "/images/cases/goiva-cover.jpg",
    imageAlt: "Projeto Atelier Norte",
    href: "/projetos",
    stats: [
      { value: "+180%", label: "tráfego qualificado" },
      { value: "3x", label: "propostas mensais" },
    ],
  },
  {
    id: "preview-estudio",
    client: "Estúdio Lateral",
    location: "Porto Alegre",
    highlightValue: "R$2.4mi",
    year: 2025,
    excerpt:
      "Campanha integrada para ampliar alcance e transformar reconhecimento local em demanda recorrente.",
    imageSrc: "/images/cases/goiva-cover.jpg",
    imageAlt: "Projeto Estúdio Lateral",
    href: "/projetos",
    stats: [
      { value: "+92%", label: "leads inbound" },
      { value: "2.5x", label: "ticket médio" },
    ],
  },
  {
    id: "preview-coletivo",
    client: "Coletivo Forma",
    location: "Belo Horizonte",
    highlightValue: "R$1.2mi",
    year: 2024,
    excerpt:
      "Estratégia de conteúdo e mídia para conectar portfólio autoral a clientes de alto valor.",
    imageSrc: "/images/cases/goiva-cover.jpg",
    imageAlt: "Projeto Coletivo Forma",
    href: "/projetos",
    stats: [
      { value: "+240%", label: "alcance orgânico" },
      { value: "4x", label: "visitas ao site" },
    ],
  },
];
