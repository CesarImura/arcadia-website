import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Página Sobre",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Introdução",
      type: "blockContent",
    }),
    defineField({
      name: "missionTitle",
      title: "Título da missão",
      type: "string",
    }),
    defineField({
      name: "missionText",
      title: "Texto da missão",
      type: "blockContent",
    }),
    defineField({
      name: "valuesTitle",
      title: "Título dos valores",
      type: "string",
    }),
    defineField({
      name: "values",
      title: "Valores",
      type: "array",
      of: [
        {
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
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        },
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
      return { title: "Página Sobre" };
    },
  },
});
