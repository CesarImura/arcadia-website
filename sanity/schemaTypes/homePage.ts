import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Página inicial",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Rótulo do hero",
      type: "string",
      description: 'Ex.: "nossos resultados"',
    }),
    defineField({
      name: "heroTitle",
      title: "Título do hero",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Texto do hero",
      type: "text",
      rows: 4,
      description: "Parágrafo abaixo do título. Use quebras de linha para separar parágrafos.",
    }),
    defineField({
      name: "heroCta",
      title: "CTA principal",
      type: "link",
    }),
    defineField({
      name: "heroSecondaryCta",
      title: "CTA secundário",
      type: "link",
    }),
    defineField({
      name: "heroImage",
      title: "Imagem do hero (opcional)",
      type: "image",
      options: { hotspot: true },
      hidden: true,
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "philosophyLabel",
      title: "Filosofia — rótulo",
      type: "string",
      description: "O número da seção (nº001, nº002…) é gerado automaticamente.",
      initialValue: "nossa visão",
    }),
    defineField({
      name: "philosophyStatement",
      title: "Filosofia — frase principal",
      type: "text",
      rows: 4,
      description:
        "Texto completo da seção. Ao rolar a página, cada palavra revela gradualmente (de opacidade baixa para 100%). Digite a frase normalmente — não é necessário destacar ou formatar manualmente.",
      initialValue:
        "Na Arc. acreditamos que talento sem visibilidade é potencial desperdiçado, por isso facilitamos o crescimento de escritórios de excelência até que não dependam mais de indicação e se tornem referência no que fazem.",
    }),
    defineField({
      name: "philosophyLead",
      title: "Filosofia — destaque (legado)",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "philosophyBody",
      title: "Filosofia — complemento (legado)",
      type: "text",
      rows: 4,
      hidden: true,
    }),
    defineField({
      name: "philosophySupportText",
      title: "Filosofia — texto de apoio",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "philosophyCta",
      title: "Filosofia — CTA",
      type: "link",
    }),
    defineField({
      name: "philosophyValues",
      title: "Filosofia — valores ARC",
      type: "array",
      of: [{ type: "string" }],
      initialValue: ["Alcance", "Relevância", "Crescimento"],
    }),
    defineField({
      name: "casesLabel",
      title: "Cases — rótulo",
      type: "string",
      description: "O número da seção é gerado automaticamente.",
      initialValue: "nosso impacto",
    }),
    defineField({
      name: "marqueeGallery",
      title: "Galeria — marquee",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texto alternativo",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "uspTitle",
      title: "USP — título",
      type: "string",
      initialValue: "Por que escritórios escolhem a Arc.",
    }),
    defineField({
      name: "uspDescription",
      title: "USP — descrição",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "uspCards",
      title: "USP — cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "number",
              title: "Número",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Título",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Descrição",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "number", subtitle: "title" },
          },
        }),
      ],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: "uspCta",
      title: "USP — link dos cards",
      type: "link",
      description: "Todos os cards levam para esta página (padrão: Sobre).",
    }),
    defineField({
      name: "statementLeadText",
      title: "Afirmação — texto esquerda",
      type: "string",
      initialValue: "Quem trabalha com a gente",
    }),
    defineField({
      name: "statementTrailingLineOne",
      title: "Afirmação — linha direita (1)",
      type: "string",
      initialValue: "Não depende",
    }),
    defineField({
      name: "statementTrailingLineTwo",
      title: "Afirmação — linha direita (2)",
      type: "string",
      initialValue: "de indicação",
    }),
    defineField({
      name: "statementSupportText",
      title: "Afirmação — texto de apoio",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "statementImage",
      title: "Afirmação — imagem",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "socialProofTitle",
      title: "Prova social — título",
      type: "string",
      initialValue: "O que acontece depois da nossa parceria",
    }),
    defineField({
      name: "socialProofDescription",
      title: "Prova social — descrição",
      type: "text",
      rows: 4,
      initialValue:
        "Quando assumimos um escritório numa região, fechamos a porta para o concorrente dele. Não é cortesia — é a única forma de trabalhar para que aquele escritório se torne o maior do próprio mercado, sem dividir esforço com quem disputa o mesmo cliente.",
    }),
    defineField({
      name: "processLabel",
      title: "Processo — rótulo",
      type: "string",
      description: "O número da seção é gerado automaticamente.",
      initialValue: "nosso processo",
    }),
    defineField({
      name: "processTitle",
      title: "Processo — título",
      type: "string",
      initialValue: "Como transformamos visibilidade em crescimento real.",
    }),
    defineField({
      name: "processDescription",
      title: "Processo — descrição",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "processCta",
      title: "Processo — CTA",
      type: "link",
      description: "Padrão: Veja nosso trabalho → /projetos",
    }),
    defineField({
      name: "processSteps",
      title: "Processo — etapas",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Título",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Descrição",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "image",
              title: "Imagem",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Texto alternativo",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
              ],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "title", media: "image" },
          },
        }),
      ],
    }),
    defineField({
      name: "companyStatsLabel",
      title: "Números — rótulo",
      type: "string",
      initialValue: "results",
    }),
    defineField({
      name: "companyStatsTitle",
      title: "Números — título",
      type: "string",
      initialValue: "Nossos números não mentem. Crescimento",
    }),
    defineField({
      name: "companyStatsDescription",
      title: "Números — descrição",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "companyStatsCta",
      title: "Números — CTA",
      type: "link",
      description: "Padrão: sobre nós → /sobre",
    }),
    defineField({
      name: "companyStats",
      title: "Números — estatísticas",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Valor",
              type: "string",
              description: "Ex.: 480%, 120+, 15",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Descrição",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "value", subtitle: "description" },
          },
        }),
      ],
    }),
    defineField({
      name: "dividerMarqueeWords",
      title: "Marquee divisora — palavras",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description:
        "Palavras que ciclam infinitamente na faixa divisora entre seções.",
      initialValue: ["Alcance", "Relevância", "Crescimento"],
    }),
    defineField({
      name: "blogSectionLabel",
      title: "Blog — rótulo",
      type: "string",
      description: "O número da seção é gerado automaticamente.",
      initialValue: "blog",
    }),
    defineField({
      name: "blogSectionTitle",
      title: "Blog — título",
      type: "string",
      initialValue: "Fique por dentro das últimas novidades",
    }),
    defineField({
      name: "blogSectionLimit",
      title: "Blog — quantidade de posts",
      type: "number",
      initialValue: 4,
      validation: (rule) => rule.min(1).max(8),
    }),
    defineField({
      name: "faqLabel",
      title: "FAQ — rótulo",
      type: "string",
      initialValue: "faqs",
    }),
    defineField({
      name: "faqTitle",
      title: "FAQ — título",
      type: "string",
      initialValue:
        "O que você precisa considerar antes de firmar uma parceria conosco.",
    }),
    defineField({
      name: "faqItems",
      title: "FAQ — perguntas",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Pergunta",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Resposta",
              type: "text",
              rows: 5,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "question" },
          },
        }),
      ],
    }),
    defineField({
      name: "lastCallLabel",
      title: "Last call — rótulo",
      type: "string",
      description: "O número da seção é gerado automaticamente.",
      initialValue: "last call",
    }),
    defineField({
      name: "lastCallTitle",
      title: "Last call — título",
      type: "string",
      initialValue: "Pronto para parar de depender de indicação?",
    }),
    defineField({
      name: "lastCallDescription",
      title: "Last call — descrição",
      type: "text",
      rows: 4,
      initialValue:
        "Agende uma conversa e descubra como a metodologia ARC pode posicionar seu escritório como referência no mercado.",
    }),
    defineField({
      name: "lastCallContact",
      title: "Last call — contato",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Nome",
          type: "string",
        }),
        defineField({
          name: "role",
          title: "Cargo",
          type: "string",
        }),
        defineField({
          name: "photo",
          title: "Foto",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texto alternativo",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "lastCallCta",
      title: "Last call — CTA",
      type: "link",
      description: "Padrão: Entrar em contato → /contato",
    }),
    defineField({
      name: "introTitle",
      title: "Título da introdução (legado)",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "introText",
      title: "Texto da introdução (legado)",
      type: "blockContent",
      hidden: true,
    }),
    defineField({
      name: "featuredProjects",
      title: "Projetos em destaque",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "project" }],
        }),
      ],
    }),
    defineField({
      name: "featuredPosts",
      title: "Posts em destaque",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "post" }],
        }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Estatísticas",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Valor",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Rótulo",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Página inicial" };
    },
  },
});
