import type { PortableTextBlock } from "@portabletext/types";

export type SanityImage = {
  asset?: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
};

export type Seo = {
  title?: string;
  description?: string;
  ogImage?: SanityImage;
};

export type Link = {
  label: string;
  href: string;
  openInNewTab?: boolean;
};

export type SocialLink = {
  platform: string;
  url: string;
};

export type SiteSettings = {
  siteName: string;
  tagline?: string;
  logo?: SanityImage;
  navigation?: Link[];
  footerText?: string;
  footerLinks?: Link[];
  socialLinks?: SocialLink[];
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  defaultSeo?: Seo;
};

export type Category = {
  _id: string;
  title: string;
  slug: { current: string };
  kind: "project" | "blog";
};

export type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  client?: string;
  location?: string;
  highlightValue?: string;
  caseStats?: { value: string; label: string }[];
  year?: number;
  excerpt?: string;
  coverImage: SanityImage;
  gallery?: SanityImage[];
  categories?: Category[];
  featured?: boolean;
  body?: PortableTextBlock[];
  challenge?: PortableTextBlock[];
  solution?: PortableTextBlock[];
  result?: PortableTextBlock[];
  seo?: Seo;
};

export type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: SanityImage;
  author?: string;
  publishedAt: string;
  categories?: Category[];
  body: PortableTextBlock[];
  seo?: Seo;
};

export type TeamMember = {
  _id: string;
  name: string;
  role: string;
  photo?: SanityImage;
  bio?: string;
  order?: number;
};

export type HomePage = {
  heroEyebrow?: string;
  heroTitle: string;
  heroSubtitle?: string;
  heroImage?: SanityImage;
  heroCta?: Link;
  heroSecondaryCta?: Link;
  philosophyIndex?: string;
  philosophyLabel?: string;
  philosophyStatement?: string;
  philosophyLead?: string;
  philosophyBody?: string;
  philosophySupportText?: string;
  philosophyCta?: Link;
  philosophyValues?: string[];
  casesIndex?: string;
  casesLabel?: string;
  marqueeGallery?: SanityImage[];
  introTitle?: string;
  introText?: PortableTextBlock[];
  featuredProjects?: Project[];
  featuredPosts?: Post[];
  stats?: { value: string; label: string }[];
  seo?: Seo;
};

export type AboutPage = {
  title: string;
  intro?: PortableTextBlock[];
  missionTitle?: string;
  missionText?: PortableTextBlock[];
  valuesTitle?: string;
  values?: { title: string; description?: string }[];
  seo?: Seo;
};

export type ContactPage = {
  title: string;
  intro?: PortableTextBlock[];
  formTitle?: string;
  successMessage?: string;
  seo?: Seo;
};

export type LegalPage = {
  _id: string;
  title: string;
  slug: { current: string };
  lastUpdated?: string;
  body: PortableTextBlock[];
  seo?: Seo;
};
