import type { Metadata } from "next";
import { LastCallSection } from "@/components/content/LastCallSection";
import { FaqSection } from "@/components/content/FaqSection";
import { BlogPostsSection } from "@/components/content/BlogPostsSection";
import { CasesGallerySection } from "@/components/content/CasesGallerySection";
import { Hero } from "@/components/content/Hero";
import { ImageMarqueeSection } from "@/components/content/ImageMarqueeSection";
import { PhilosophySection } from "@/components/content/PhilosophySection";
import { CompanyStatsSection } from "@/components/content/CompanyStatsSection";
import { ProcessSection } from "@/components/content/ProcessSection";
import { SocialProofSection } from "@/components/content/SocialProofSection";
import { StatementSection } from "@/components/content/StatementSection";
import { WordDividerMarquee } from "@/components/content/WordDividerMarquee";
import { UspCardsSection } from "@/components/content/UspCardsSection";
import { buildMetadata } from "@/lib/metadata";
import {
  previewHomePage,
  previewSiteSettings,
} from "@/lib/preview/home";
import { isPreviewMode } from "@/lib/preview/is-preview-mode";
import { homePageQuery, latestPostsQuery, siteSettingsQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity/fetch";
import type { HomePage, Post, SiteSettings } from "@/lib/types";
import { parsePhilosophyStatement } from "@/lib/philosophy-statement";
import { defaultBlogSection } from "@/lib/blog-section";
import { defaultDividerMarqueeWords } from "@/lib/divider-marquee";
import { defaultMarqueeImages, type MarqueeImage } from "@/lib/marquee-images";
import { defaultUspSection } from "@/lib/usp-cards";
import { defaultStatementSection } from "@/lib/statement-section";
import { resolveLastCallSection } from "@/lib/map-last-call-section";
import { resolveFaqSection } from "@/lib/map-faq-section";
import { resolveCompanyStatsSection } from "@/lib/map-company-stats-section";
import { resolveProcessSection } from "@/lib/map-process-section";
import { defaultSocialProofSection } from "@/lib/social-proof-section";
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

function resolveUspSection(homePage?: HomePage | null) {
  const cards = homePage?.uspCards?.filter(
    (card) => card.number && card.title && card.description,
  );

  return {
    title: homePage?.uspTitle || defaultUspSection.title,
    description: homePage?.uspDescription || defaultUspSection.description,
    cards: cards?.length ? cards : defaultUspSection.cards,
    ctaHref: homePage?.uspCta?.href || defaultUspSection.ctaHref,
    ctaLabel: homePage?.uspCta?.label || defaultUspSection.ctaLabel,
  };
}

function resolveStatementSection(homePage?: HomePage | null) {
  const image = homePage?.statementImage?.asset
    ? {
        src: urlFor(homePage.statementImage).width(1148).height(1482).quality(85).url(),
        alt: homePage.statementImage.alt || defaultStatementSection.imageAlt,
      }
    : {
        src: defaultStatementSection.imageSrc,
        alt: defaultStatementSection.imageAlt,
      };

  return {
    leadText: homePage?.statementLeadText || defaultStatementSection.leadText,
    trailingLineOne:
      homePage?.statementTrailingLineOne ||
      defaultStatementSection.trailingLineOne,
    trailingLineTwo:
      homePage?.statementTrailingLineTwo ||
      defaultStatementSection.trailingLineTwo,
    supportText:
      homePage?.statementSupportText || defaultStatementSection.supportText,
    imageSrc: image.src,
    imageAlt: image.alt,
  };
}

const defaultHero = {
  eyebrow: "nossos resultados",
  title: "Marketing feito por quem entende arquitetura.",
  subtitle:
    "Ajudamos escritórios de arquitetura a não depender de indicação através da metodologia ARC.\nAlcance, Relevância e Crescimento.",
  primaryCta: { label: "Veja nosso trabalho", href: "/projetos" },
  secondaryCta: { label: "Veja nosso trabalho", href: "/sobre" },
};

function resolveDividerMarqueeWords(homePage?: HomePage | null): string[] {
  const words = homePage?.dividerMarqueeWords
    ?.map((word) => word.trim())
    .filter(Boolean);

  return words?.length ? words : defaultDividerMarqueeWords;
}

async function getHomeData() {
  if (isPreviewMode()) {
    return {
      settings: previewSiteSettings,
      homePage: previewHomePage,
      latestPosts: [] as Post[],
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

  const limit = homePage?.blogSectionLimit ?? defaultBlogSection.limit;

  const latestPosts = await sanityFetch<Post[]>({
    query: latestPostsQuery,
    params: { limit },
    tags: ["post"],
  }).catch(() => []);

  return {
    settings: settings || previewSiteSettings,
    homePage,
    latestPosts,
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
  const { homePage, latestPosts } = await getHomeData();

  const featuredProjects = homePage?.featuredProjects || [];
  const uspSection = resolveUspSection(homePage);
  const statementSection = resolveStatementSection(homePage);
  const processSection = resolveProcessSection(homePage);
  const companyStatsSection = resolveCompanyStatsSection(homePage);
  const faqSection = resolveFaqSection(homePage);
  const lastCallSection = resolveLastCallSection(homePage);

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
        label={homePage?.philosophyLabel}
        statement={resolvePhilosophyStatement(homePage)}
        supportText={homePage?.philosophySupportText}
        cta={homePage?.philosophyCta}
        values={homePage?.philosophyValues}
      />

      <ImageMarqueeSection images={resolveMarqueeImages(homePage)} />

      <CasesGallerySection
        projects={featuredProjects}
        label={homePage?.casesLabel}
      />

      <UspCardsSection
        title={uspSection.title}
        description={uspSection.description}
        cards={uspSection.cards}
        ctaHref={uspSection.ctaHref}
        ctaLabel={uspSection.ctaLabel}
      />

      <StatementSection {...statementSection} />

      <SocialProofSection
        projects={featuredProjects}
        title={homePage?.socialProofTitle || defaultSocialProofSection.title}
        description={
          homePage?.socialProofDescription ||
          defaultSocialProofSection.description
        }
      />

      <ProcessSection {...processSection} />

      <CompanyStatsSection {...companyStatsSection} />

      <WordDividerMarquee words={resolveDividerMarqueeWords(homePage)} />

      <BlogPostsSection
        posts={latestPosts}
        title={homePage?.blogSectionTitle || defaultBlogSection.title}
        label={homePage?.blogSectionLabel || defaultBlogSection.label}
      />

      <FaqSection {...faqSection} />

      <LastCallSection {...lastCallSection} />
    </>
  );
}
