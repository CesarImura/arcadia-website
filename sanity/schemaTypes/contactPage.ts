import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Página de Contato",
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
      name: "formTitle",
      title: "Título do formulário",
      type: "string",
    }),
    defineField({
      name: "successMessage",
      title: "Mensagem de sucesso",
      type: "string",
      initialValue: "Mensagem enviada com sucesso. Entraremos em contato em breve.",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Página de Contato" };
    },
  },
});
