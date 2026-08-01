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
      hidden: true,
    }),
    defineField({
      name: "footerPrimaryCta",
      title: "CTA principal do rodapé",
      type: "link",
      description: "Ex.: [ Agendar ligação ]",
    }),
    defineField({
      name: "footerSecondaryCta",
      title: "CTA secundário do rodapé",
      type: "link",
      description: "Ex.: [ Veja nossos preços ]",
    }),
    defineField({
      name: "footerLinks",
      title: "Links da coluna Companhia",
      type: "array",
      of: [{ type: "link" }],
    }),
    defineField({
      name: "footerAiSummaryTitle",
      title: "Título do bloco de IA",
      type: "string",
      initialValue: "Veja um resumo de IA sobre Arcadia",
    }),
    defineField({
      name: "footerAiLinks",
      title: "Links de resumo por IA",
      type: "array",
      of: [{ type: "footerAiLink" }],
    }),
    defineField({
      name: "footerCopyright",
      title: "Texto de copyright",
      type: "string",
      description: "Deixe vazio para gerar automaticamente com o ano atual.",
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
