# Arcadia Website

Site institucional em português com Next.js App Router e Sanity CMS.

## Stack

- Next.js 15 (App Router)
- Sanity v3 (Studio em `/studio`)
- Tailwind CSS v4
- Resend (formulário de contato)
- Vercel (deploy recomendado)

## Desenvolvimento local

1. Instale dependências:

```bash
npm install
```

2. Configure variáveis de ambiente:

```bash
cp .env.example .env.local
```

Preencha pelo menos:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_REVALIDATE_SECRET`

3. Crie o projeto Sanity em [sanity.io/manage](https://sanity.io/manage) e use o mesmo `projectId` no `.env.local`.

4. Inicie o servidor:

```bash
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

## Conteúdo inicial no Sanity

Após abrir o Studio, crie estes documentos singleton:

| Tipo | ID sugerido |
|---|---|
| Configurações do site | `siteSettings` |
| Página inicial | `homePage` |
| Página Sobre | `aboutPage` |
| Página de Contato | `contactPage` |

Depois adicione projetos, posts, membros da equipe e páginas legais (`privacidade`, `termos`).

## Deploy na Vercel

1. Faça push do repositório para o GitHub.
2. Importe o projeto na Vercel.
3. Configure as variáveis de ambiente do `.env.example`.
4. Defina `NEXT_PUBLIC_SITE_URL` com a URL de produção.

### Webhook de revalidação (Sanity)

No Sanity Manage → API → Webhooks:

- **URL:** `https://SEU-DOMINIO.vercel.app/api/revalidate`
- **Dataset:** production
- **Trigger:** Create, Update, Delete
- **Projection:**

```groq
{
  _type,
  "slug": slug
}
```

- **Secret:** mesmo valor de `SANITY_REVALIDATE_SECRET`

## Preview de rascunhos

Habilite draft mode acessando:

```text
/api/draft-mode/enable?secret=SEU_SECRET&redirect=/
```

Desabilite em `/api/draft-mode/disable`.

Para preview completo, crie um token de leitura no Sanity e configure `SANITY_API_READ_TOKEN`.

## Formulário de contato

Configure:

- `RESEND_API_KEY`
- `CONTACT_EMAIL`

Sem essas variáveis, o formulário funciona em modo desenvolvimento e registra envios no console.

## Estrutura principal

```text
app/
  (site)/          # páginas públicas
  studio/          # Sanity Studio
  api/             # revalidate, contact, draft-mode
sanity/
  schemaTypes/     # schemas CMS
lib/
  queries.ts       # consultas GROQ
  portable-text.tsx
```

## Próximo passo com Figma

Quando tiver o link do Figma, substitua tokens visuais e componentes em `components/` e `app/globals.css` para alinhar ao design final.
