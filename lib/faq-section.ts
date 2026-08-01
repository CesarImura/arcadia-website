export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqSectionContent = {
  label: string;
  title: string;
  items: FaqItem[];
};

export const defaultFaqSection: FaqSectionContent = {
  label: "faqs",
  title: "O que você precisa considerar antes de firmar uma parceria conosco.",
  items: [
    {
      question: "Quem vai realmente trabalhar no nosso projeto?",
      answer:
        "Jaellan lidera cada projeto, desde a estratégia e a direção criativa, atuando como seu principal ponto de contato durante todo o processo.\n\nDependendo do escopo, uma equipe de colaboradores cuidadosamente selecionada dá suporte nas áreas de design e desenvolvimento. O nível de cuidado e qualidade do trabalho permanece consistente, independentemente do tamanho do projeto.",
    },
    {
      question: "Como funciona o modelo de exclusividade regional?",
      answer:
        "Quando assumimos um escritório numa região, fechamos a porta para o concorrente dele naquela área. É a única forma de concentrar esforço para que aquele escritório se torne referência no próprio mercado.",
    },
    {
      question: "Quanto tempo leva para ver resultados?",
      answer:
        "Os primeiros sinais de tração costumam aparecer entre 90 e 120 dias, dependendo do ponto de partida, do mercado e da cadência de execução combinada.",
    },
    {
      question: "Vocês atendem escritórios fora de São Paulo?",
      answer:
        "Sim. Trabalhamos com escritórios em todo o Brasil, com estratégia adaptada ao mercado local de cada região.",
    },
    {
      question: "O que está incluso na parceria?",
      answer:
        "Diagnóstico, estratégia, operação de campanhas, conteúdo e acompanhamento contínuo de performance — sempre alinhados à metodologia ARC.",
    },
    {
      question: "Como é feito o acompanhamento de resultados?",
      answer:
        "Definimos metas claras desde o início e reportamos evolução com frequência, conectando métricas de marketing à geração real de oportunidades.",
    },
    {
      question: "Como damos início à parceria?",
      answer:
        "Começamos com uma conversa de diagnóstico para entender o momento do escritório, o mercado e os objetivos. A partir daí, montamos um plano sob medida.",
    },
  ],
};
