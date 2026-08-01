import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { AdaptiveHeader } from "@/components/layout/AdaptiveHeader";
import { PreviewBanner } from "@/components/preview/PreviewBanner";
import { footerFeaturedProjectsQuery, siteSettingsQuery } from "@/lib/queries";
import { isPreviewMode } from "@/lib/preview/is-preview-mode";
import { previewHomePage, previewSiteSettings } from "@/lib/preview/home";
import { sanityFetch } from "@/lib/sanity/fetch";
import type { SiteSettings } from "@/lib/types";

type FooterProject = {
  title: string;
  slug: { current: string };
};

export default async function SiteLayout({ children }: { children: ReactNode }) {
  let settings: SiteSettings | null = null;
  let featuredProjects: FooterProject[] | null = null;

  if (isPreviewMode()) {
    settings = previewSiteSettings;
    featuredProjects =
      previewHomePage.featuredProjects?.map((project) => ({
        title: project.title,
        slug: project.slug,
      })) ?? [];
  } else {
    try {
      [settings, featuredProjects] = await Promise.all([
        sanityFetch<SiteSettings | null>({
          query: siteSettingsQuery,
          tags: ["siteSettings"],
        }),
        sanityFetch<FooterProject[] | null>({
          query: footerFeaturedProjectsQuery,
          tags: ["homePage", "project"],
        }),
      ]);
    } catch {
      settings = previewSiteSettings;
      featuredProjects = [];
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PreviewBanner />
      <AdaptiveHeader settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} featuredProjects={featuredProjects} />
    </div>
  );
}
