import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configurações do site",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Nome do site",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
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
      name: "navigation",
      title: "Navegação principal",
      type: "array",
      of: [{ type: "link" }],
    }),
    defineField({
      name: "footerText",
      title: "Texto do rodapé",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "footerLinks",
      title: "Links do rodapé",
      type: "array",
      of: [{ type: "link" }],
    }),
    defineField({
      name: "socialLinks",
      title: "Redes sociais",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
    defineField({
      name: "contactEmail",
      title: "E-mail de contato",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "Telefone",
      type: "string",
    }),
    defineField({
      name: "contactAddress",
      title: "Endereço",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "defaultSeo",
      title: "SEO padrão",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Configurações do site" };
    },
  },
});
