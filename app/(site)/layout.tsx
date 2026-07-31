import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { AdaptiveHeader } from "@/components/layout/AdaptiveHeader";
import { PreviewBanner } from "@/components/preview/PreviewBanner";
import { siteSettingsQuery } from "@/lib/queries";
import { isPreviewMode } from "@/lib/preview/is-preview-mode";
import { previewSiteSettings } from "@/lib/preview/home";
import { sanityFetch } from "@/lib/sanity/fetch";
import type { SiteSettings } from "@/lib/types";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  let settings: SiteSettings | null = null;

  if (isPreviewMode()) {
    settings = previewSiteSettings;
  } else {
    try {
      settings = await sanityFetch<SiteSettings | null>({
        query: siteSettingsQuery,
        tags: ["siteSettings"],
      });
    } catch {
      settings = previewSiteSettings;
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PreviewBanner />
      <AdaptiveHeader settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
