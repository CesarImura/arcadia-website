import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projeto",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "client",
      title: "Cliente",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Ano",
      type: "number",
    }),
    defineField({
      name: "excerpt",
      title: "Resumo",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "Imagem de capa",
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
    defineField({
      name: "gallery",
      title: "Galeria",
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
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "location",
      title: "Localização",
      type: "string",
      description: "Ex.: São Paulo — exibido na galeria de cases.",
    }),
    defineField({
      name: "highlightValue",
      title: "Destaque (galeria)",
      type: "string",
      description: "Ex.: R$3.2mi — exibido quando o case está ativo na galeria.",
    }),
    defineField({
      name: "caseStats",
      title: "Métricas do case",
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
      name: "categories",
      title: "Categorias",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "category" }],
        }),
      ],
    }),
    defineField({
      name: "featured",
      title: "Destaque na home",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "blockContent",
    }),
    defineField({
      name: "challenge",
      title: "Desafio",
      type: "blockContent",
    }),
    defineField({
      name: "solution",
      title: "Solução",
      type: "blockContent",
    }),
    defineField({
      name: "result",
      title: "Resultado",
      type: "blockContent",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "client",
      media: "coverImage",
    },
  },
});
