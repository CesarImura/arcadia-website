import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.listItem()
        .title("Configurações do site")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.divider(),
      S.listItem()
        .title("Página inicial")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("Página Sobre")
        .id("aboutPage")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.listItem()
        .title("Página de Contato")
        .id("contactPage")
        .child(
          S.document().schemaType("contactPage").documentId("contactPage"),
        ),
      S.divider(),
      S.documentTypeListItem("project").title("Projetos"),
      S.documentTypeListItem("post").title("Blog"),
      S.documentTypeListItem("teamMember").title("Equipe"),
      S.documentTypeListItem("legalPage").title("Páginas legais"),
      S.documentTypeListItem("category").title("Categorias"),
    ]);
