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
  footerPrimaryCta { label, href, openInNewTab },
  footerSecondaryCta { label, href, openInNewTab },
  footerLinks[] { label, href, openInNewTab },
  footerAiSummaryTitle,
  footerAiLinks[] { platform, url },
  footerCopyright,
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

export const footerFeaturedProjectsQuery = `*[_type == "homePage"][0].featuredProjects[]-> {
  title,
  slug
}`;

export const homePageQuery = `*[_type == "homePage"][0] {
  heroEyebrow,
  heroTitle,
  heroSubtitle,
  heroImage { ${imageFields} },
  heroCta { label, href, openInNewTab },
  heroSecondaryCta { label, href, openInNewTab },
  philosophyLabel,
  philosophyStatement,
  philosophyLead,
  philosophyBody,
  philosophySupportText,
  philosophyCta { label, href, openInNewTab },
  philosophyValues,
  casesLabel,
  marqueeGallery[] { ${imageFields} },
  uspTitle,
  uspDescription,
  uspCards[] { number, title, description },
  uspCta { label, href, openInNewTab },
  statementLeadText,
  statementTrailingLineOne,
  statementTrailingLineTwo,
  statementSupportText,
  statementImage { ${imageFields} },
  socialProofTitle,
  socialProofDescription,
  processLabel,
  processTitle,
  processDescription,
  processCta { label, href, openInNewTab },
  processSteps[] {
    title,
    description,
    image { ${imageFields} }
  },
  companyStatsLabel,
  companyStatsTitle,
  companyStatsDescription,
  companyStatsCta { label, href, openInNewTab },
  companyStats[] { value, description },
  dividerMarqueeWords,
  blogSectionLabel,
  blogSectionTitle,
  blogSectionLimit,
  faqLabel,
  faqTitle,
  faqItems[] { question, answer },
  lastCallLabel,
  lastCallTitle,
  lastCallDescription,
  lastCallContact {
    name,
    role,
    photo { ${imageFields} }
  },
  lastCallCta { label, href, openInNewTab },
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

export const latestPostsQuery = `*[_type == "post"] | order(publishedAt desc)[0...$limit] {
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
