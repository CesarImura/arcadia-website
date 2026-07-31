import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/cards/PostCard";
import { CasesGallerySection } from "@/components/content/CasesGallerySection";
import { Hero } from "@/components/content/Hero";
import { ImageMarqueeSection } from "@/components/content/ImageMarqueeSection";
import { PhilosophySection } from "@/components/content/PhilosophySection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/metadata";
import {
  previewHomePage,
  previewSiteSettings,
} from "@/lib/preview/home";
import { isPreviewMode } from "@/lib/preview/is-preview-mode";
import { homePageQuery, siteSettingsQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity/fetch";
import type { HomePage, SiteSettings } from "@/lib/types";
import { parsePhilosophyStatement } from "@/lib/philosophy-statement";
import { defaultMarqueeImages, type MarqueeImage } from "@/lib/marquee-images";
import { urlFor } from "@/lib/sanity/image";

const defaultPhilosophyStatement =
  "Na Arc. acreditamos que talento|sem visibilidade é potencial desperdiçado, por isso facilitamos o crescimento de escritórios de excelência até que não dependam mais de indicação e se tornem referência no que fazem.";

function resolvePhilosophyStatement(homePage?: HomePage | null) {
  if (homePage?.philosophyStatement?.trim()) {
    return homePage.philosophyStatement.trim();
  }

  if (homePage?.philosophyLead || homePage?.philosophyBody) {
    const lead = homePage.philosophyLead?.trim() || "";
    const body = homePage.philosophyBody?.trim() || "";
    return body ? `${lead}|${body}` : lead;
  }

  return defaultPhilosophyStatement;
}

function resolveMarqueeImages(homePage?: HomePage | null): MarqueeImage[] {
  const gallery = homePage?.marqueeGallery?.filter((image) => image.asset);

  if (gallery?.length) {
    return gallery.map((image) => ({
      src: urlFor(image).width(1440).height(960).quality(85).url(),
      alt: image.alt || "",
    }));
  }

  return defaultMarqueeImages;
}

const defaultHero = {
  eyebrow: "nossos resultados",
  title: "Marketing feito por quem entende arquitetura.",
  subtitle:
    "Ajudamos escritórios de arquitetura a não depender de indicação através da metodologia ARC.\nAlcance, Relevância e Crescimento.",
  primaryCta: { label: "Veja nosso trabalho", href: "/projetos" },
  secondaryCta: { label: "Veja nosso trabalho", href: "/sobre" },
};

async function getHomeData() {
  if (isPreviewMode()) {
    return {
      settings: previewSiteSettings,
      homePage: previewHomePage,
    };
  }

  const [settings, homePage] = await Promise.all([
    sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
    }).catch(() => previewSiteSettings),
    sanityFetch<HomePage | null>({
      query: homePageQuery,
      tags: ["homePage"],
    }).catch(() => null),
  ]);

  return {
    settings: settings || previewSiteSettings,
    homePage,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const { settings, homePage } = await getHomeData();

  return buildMetadata({
    siteSettings: settings,
    seo: homePage?.seo,
    fallbackTitle: settings?.siteName || "Arcadia",
    fallbackDescription:
      parsePhilosophyStatement(resolvePhilosophyStatement(homePage)).highlight ||
      homePage?.heroSubtitle ||
      settings?.tagline ||
      "Portfólio institucional com projetos, blog e contato.",
    path: "/",
  });
}

export default async function HomePage() {
  const { homePage } = await getHomeData();

  const featuredProjects = homePage?.featuredProjects || [];
  const featuredPosts = homePage?.featuredPosts || [];

  return (
    <>
      <Hero
        eyebrow={homePage?.heroEyebrow || defaultHero.eyebrow}
        title={homePage?.heroTitle || defaultHero.title}
        subtitle={homePage?.heroSubtitle || defaultHero.subtitle}
        primaryCta={homePage?.heroCta || defaultHero.primaryCta}
        secondaryCta={homePage?.heroSecondaryCta || defaultHero.secondaryCta}
      />

      <PhilosophySection
        index={homePage?.philosophyIndex}
        label={homePage?.philosophyLabel}
        statement={resolvePhilosophyStatement(homePage)}
        supportText={homePage?.philosophySupportText}
        cta={homePage?.philosophyCta}
        values={homePage?.philosophyValues}
      />

      <ImageMarqueeSection images={resolveMarqueeImages(homePage)} />

      <CasesGallerySection
        projects={featuredProjects}
        index={homePage?.casesIndex}
        label={homePage?.casesLabel}
      />

      <section className="py-20">
        <Container className="space-y-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Blog"
              title="Últimas publicações"
              description="Insights, novidades e bastidores do nosso trabalho."
            />
            <Link
              href="/blog"
              className="text-sm font-medium text-neutral-700 underline underline-offset-4"
            >
              Ver blog completo
            </Link>
          </div>

          {featuredPosts.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border p-10 text-center text-neutral-500">
              Adicione posts em destaque no Sanity Studio.
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
