const imageFields = `
  asset,
  alt,
  caption
`;

const seoFields = `
  seo {
    title,
    description,
    ogImage { ${imageFields} }
  }
`;

const categoryFields = `
  _id,
  title,
  slug,
  kind
`;

const projectFields = `
  _id,
  title,
  slug,
  client,
  location,
  highlightValue,
  caseStats[] { value, label },
  year,
  excerpt,
  coverImage { ${imageFields} },
  gallery[] { ${imageFields} },
  categories[]-> { ${categoryFields} },
  featured,
  body,
  challenge,
  solution,
  result,
  ${seoFields}
`;

const postFields = `
  _id,
  title,
  slug,
  excerpt,
  coverImage { ${imageFields} },
  author,
  publishedAt,
  categories[]-> { ${categoryFields} },
  body,
  ${seoFields}
`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  siteName,
  tagline,
  logo { ${imageFields} },
  navigation[] { label, href, openInNewTab },
  footerText,
  footerLinks[] { label, href, openInNewTab },
  socialLinks[] { platform, url },
  contactEmail,
  contactPhone,
  contactAddress,
  defaultSeo {
    title,
    description,
    ogImage { ${imageFields} }
  }
}`;

export const homePageQuery = `*[_type == "homePage"][0] {
  heroEyebrow,
  heroTitle,
  heroSubtitle,
  heroImage { ${imageFields} },
  heroCta { label, href, openInNewTab },
  heroSecondaryCta { label, href, openInNewTab },
  philosophyIndex,
  philosophyLabel,
  philosophyStatement,
  philosophyLead,
  philosophyBody,
  philosophySupportText,
  philosophyCta { label, href, openInNewTab },
  philosophyValues,
  casesIndex,
  casesLabel,
  marqueeGallery[] { ${imageFields} },
  introTitle,
  introText,
  featuredProjects[]-> { ${projectFields} },
  featuredPosts[]-> { ${postFields} },
  stats[] { value, label },
  ${seoFields}
}`;

export const projectsQuery = `*[_type == "project"] | order(year desc, title asc) {
  ${projectFields}
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  ${projectFields}
}`;

export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  ${postFields}
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}`;

export const aboutPageQuery = `*[_type == "aboutPage"][0] {
  title,
  intro,
  missionTitle,
  missionText,
  valuesTitle,
  values[] { title, description },
  ${seoFields}
}`;

export const teamMembersQuery = `*[_type == "teamMember"] | order(order asc, name asc) {
  _id,
  name,
  role,
  photo { ${imageFields} },
  bio,
  order
}`;

export const contactPageQuery = `*[_type == "contactPage"][0] {
  title,
  intro,
  formTitle,
  successMessage,
  ${seoFields}
}`;

export const legalPagesQuery = `*[_type == "legalPage"] | order(title asc) {
  _id,
  title,
  slug,
  lastUpdated,
  body,
  ${seoFields}
}`;

export const legalPageBySlugQuery = `*[_type == "legalPage" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  lastUpdated,
  body,
  ${seoFields}
}`;

export const sitemapQuery = `{
  "projects": *[_type == "project"] { "slug": slug.current, "_updatedAt": _updatedAt },
  "posts": *[_type == "post"] { "slug": slug.current, "_updatedAt": _updatedAt },
  "legalPages": *[_type == "legalPage"] { "slug": slug.current, "_updatedAt": _updatedAt }
}`;
