export type ProcessStep = {
  id: string;
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export type ProcessSectionContent = {
  label: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  steps: ProcessStep[];
};

export const defaultProcessSection: ProcessSectionContent = {
  label: "nosso processo",
  title: "Como transformamos visibilidade em crescimento real.",
  description:
    "Nossa metodologia ARC guia cada fase — do diagnóstico à evolução contínua — para que escritórios de arquitetura deixem de depender de indicação e se tornem referência no mercado.",
  ctaLabel: "Veja nosso trabalho",
  ctaHref: "/projetos",
  steps: [
    {
      id: "process-01",
      number: "01",
      title: "Diagnóstico",
      description:
        "Mapeamos posicionamento, concorrência e oportunidades reais de crescimento antes de qualquer execução.",
      imageSrc: "/images/process/step-01.jpg",
      imageAlt: "Diagnóstico estratégico",
    },
    {
      id: "process-02",
      number: "02",
      title: "Estratégia",
      description:
        "Definimos narrativa, canais e metas alinhadas ao perfil do escritório e ao mercado que ele quer dominar.",
      imageSrc: "/images/process/step-02.jpg",
      imageAlt: "Planejamento estratégico",
    },
    {
      id: "process-03",
      number: "03",
      title: "Operação",
      description:
        "Executamos campanhas, conteúdo e mídia com cadência constante, sempre conectados ao que gera demanda.",
      imageSrc: "/images/process/step-03.jpg",
      imageAlt: "Operação de marketing",
    },
    {
      id: "process-04",
      number: "04",
      title: "Evolução",
      description:
        "Medimos, ajustamos e escalamos o que funciona para consolidar o escritório como referência regional.",
      imageSrc: "/images/process/step-04.jpg",
      imageAlt: "Evolução e resultados",
    },
  ],
};
