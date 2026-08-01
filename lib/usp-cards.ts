export type UspCardItem = {
  number: string;
  title: string;
  description: string;
};

export const defaultUspSection = {
  title: "Por que escritórios escolhem a Arc.",
  description:
    "Estratégia, posicionamento e execução pensados para quem projeta espaços — com exclusividade regional e foco em crescimento real.",
  ctaLabel: "Mais sobre nós",
  ctaHref: "/sobre",
  cards: [
    {
      number: "01",
      title: "Um escritório por região",
      description:
        "Quando assumimos um escritório numa região, fechamos a porta para o concorrente dele.",
    },
    {
      number: "02",
      title: "Metodologia ARC",
      description:
        "Alcance, Relevância e Crescimento aplicados ao mercado de arquitetura com processo claro e mensurável.",
    },
    {
      number: "03",
      title: "Resultados comprovados",
      description:
        "Campanhas e posicionamento que transformam reconhecimento local em demanda qualificada e recorrente.",
    },
  ] satisfies UspCardItem[],
};
