import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título SEO",
      type: "string",
      description: "Título exibido nos resultados de busca e redes sociais.",
    }),
    defineField({
      name: "description",
      title: "Descrição SEO",
      type: "text",
      rows: 3,
      description: "Resumo exibido nos resultados de busca.",
    }),
    defineField({
      name: "ogImage",
      title: "Imagem Open Graph",
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
});

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Rótulo",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "openInNewTab",
      title: "Abrir em nova aba",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

export const footerAiLink = defineType({
  name: "footerAiLink",
  title: "Link de IA",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Plataforma",
      type: "string",
      options: {
        list: [
          { title: "Claude", value: "claude" },
          { title: "Perplexity", value: "perplexity" },
          { title: "Google Gemini", value: "gemini" },
          { title: "ChatGPT", value: "chatgpt" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      platform: "platform",
      url: "url",
    },
    prepare({ platform, url }) {
      return {
        title: platform || "Plataforma",
        subtitle: url,
      };
    },
  },
});

export const socialLink = defineType({
  name: "socialLink",
  title: "Rede social",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Plataforma",
      type: "string",
      options: {
        list: [
          { title: "Instagram", value: "instagram" },
          { title: "LinkedIn", value: "linkedin" },
          { title: "Facebook", value: "facebook" },
          { title: "YouTube", value: "youtube" },
          { title: "X (Twitter)", value: "x" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
  ],
});

export const blockContent = defineType({
  name: "blockContent",
  title: "Conteúdo rico",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Título H2", value: "h2" },
        { title: "Título H3", value: "h3" },
        { title: "Citação", value: "blockquote" },
      ],
      lists: [
        { title: "Marcadores", value: "bullet" },
        { title: "Numerada", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Negrito", value: "strong" },
          { title: "Itálico", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                type: "url",
                title: "URL",
              }),
            ],
          },
        ],
      },
    },
    {
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "caption",
          title: "Legenda",
          type: "string",
        }),
      ],
    },
  ],
});
