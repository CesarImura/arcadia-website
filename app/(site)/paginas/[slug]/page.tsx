import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PortableTextRenderer } from "@/lib/portable-text";
import { buildMetadata } from "@/lib/metadata";
import {
  legalPageBySlugQuery,
  legalPagesQuery,
  siteSettingsQuery,
} from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity/fetch";
import type { LegalPage, SiteSettings } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type LegalPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const pages = await sanityFetch<LegalPage[]>({
    query: legalPagesQuery,
    tags: ["legalPage"],
  }).catch(() => []);

  return pages.map((page) => ({ slug: page.slug.current }));
}

export async function generateMetadata({
  params,
}: LegalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [settings, page] = await Promise.all([
    sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
    }).catch(() => null),
    sanityFetch<LegalPage | null>({
      query: legalPageBySlugQuery,
      params: { slug },
      tags: ["legalPage", `legalPage:${slug}`],
    }).catch(() => null),
  ]);

  if (!page) {
    return buildMetadata({
      siteSettings: settings,
      fallbackTitle: "Página não encontrada",
      path: `/paginas/${slug}`,
    });
  }

  return buildMetadata({
    siteSettings: settings,
    seo: page.seo,
    fallbackTitle: page.title,
    path: `/paginas/${slug}`,
  });
}

export default async function LegalDocumentPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const page = await sanityFetch<LegalPage | null>({
    query: legalPageBySlugQuery,
    params: { slug },
    tags: ["legalPage", `legalPage:${slug}`],
  }).catch(() => null);

  if (!page) notFound();

  return (
    <section className="py-20">
      <Container className="max-w-3xl space-y-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Legal
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900">
            {page.title}
          </h1>
          {page.lastUpdated ? (
            <p className="text-sm text-neutral-500">
              Última atualização: {formatDate(page.lastUpdated)}
            </p>
          ) : null}
        </div>
        <PortableTextRenderer value={page.body} />
      </Container>
    </section>
  );
}
