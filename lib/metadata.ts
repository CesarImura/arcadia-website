import type { Metadata } from "next";
import { urlFor } from "@/lib/sanity/image";
import type { Seo, SiteSettings } from "@/lib/types";

type BuildMetadataOptions = {
  siteSettings?: SiteSettings | null;
  seo?: Seo | null;
  fallbackTitle: string;
  fallbackDescription?: string;
  path?: string;
};

export function buildMetadata({
  siteSettings,
  seo,
  fallbackTitle,
  fallbackDescription,
  path = "",
}: BuildMetadataOptions): Metadata {
  const siteName = siteSettings?.siteName || "Arcadia";
  const title = seo?.title || fallbackTitle;
  const description =
    seo?.description ||
    fallbackDescription ||
    siteSettings?.defaultSeo?.description ||
    siteSettings?.tagline ||
    `${siteName} — portfólio institucional`;

  const ogImage =
    seo?.ogImage ||
    siteSettings?.defaultSeo?.ogImage;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonicalUrl = `${siteUrl}${path}`;

  return {
    title: title.includes(siteName) ? title : `${title} | ${siteName}`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName,
      locale: "pt_BR",
      type: "website",
      images: ogImage?.asset
        ? [
            {
              url: urlFor(ogImage).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: ogImage.alt || title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage?.asset
        ? [urlFor(ogImage).width(1200).height(630).url()]
        : undefined,
    },
  };
}
