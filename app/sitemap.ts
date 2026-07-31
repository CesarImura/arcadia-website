import type { MetadataRoute } from "next";
import { sitemapQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity/fetch";

type SitemapData = {
  projects: { slug: string; _updatedAt: string }[];
  posts: { slug: string; _updatedAt: string }[];
  legalPages: { slug: string; _updatedAt: string }[];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/projetos",
    "/sobre",
    "/blog",
    "/contato",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const data = await sanityFetch<SitemapData>({
    query: sitemapQuery,
    tags: ["project", "post", "legalPage"],
  }).catch(() => ({
    projects: [],
    posts: [],
    legalPages: [],
  }));

  const projectRoutes = data.projects.map((project) => ({
    url: `${siteUrl}/projetos/${project.slug}`,
    lastModified: new Date(project._updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postRoutes = data.posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const legalRoutes = data.legalPages.map((page) => ({
    url: `${siteUrl}/paginas/${page.slug}`,
    lastModified: new Date(page._updatedAt),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes, ...legalRoutes];
}
