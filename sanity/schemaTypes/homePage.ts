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
      name: "philosophyIndex",
      title: "Filosofia — índice",
      type: "string",
      initialValue: "nº001",
    }),
    defineField({
      name: "philosophyLabel",
      title: "Filosofia — rótulo",
      type: "string",
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
      name: "casesIndex",
      title: "Cases — índice",
      type: "string",
      initialValue: "nº002",
    }),
    defineField({
      name: "casesLabel",
      title: "Cases — rótulo",
      type: "string",
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
