import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CaseStudySection } from "@/components/content/CaseStudySection";
import { Container } from "@/components/ui/Container";
import { PortableTextRenderer } from "@/lib/portable-text";
import { buildMetadata } from "@/lib/metadata";
import { projectBySlugQuery, projectsQuery, siteSettingsQuery } from "@/lib/queries";
import { urlFor } from "@/lib/sanity/image";
import { sanityFetch } from "@/lib/sanity/fetch";
import type { Project, SiteSettings } from "@/lib/types";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await sanityFetch<Project[]>({
    query: projectsQuery,
    tags: ["project"],
  }).catch(() => []);

  return projects.map((project) => ({ slug: project.slug.current }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [settings, project] = await Promise.all([
    sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
    }).catch(() => null),
    sanityFetch<Project | null>({
      query: projectBySlugQuery,
      params: { slug },
      tags: ["project", `project:${slug}`],
    }).catch(() => null),
  ]);

  if (!project) {
    return buildMetadata({
      siteSettings: settings,
      fallbackTitle: "Projeto não encontrado",
      path: `/projetos/${slug}`,
    });
  }

  return buildMetadata({
    siteSettings: settings,
    seo: project.seo,
    fallbackTitle: project.title,
    fallbackDescription: project.excerpt,
    path: `/projetos/${slug}`,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await sanityFetch<Project | null>({
    query: projectBySlugQuery,
    params: { slug },
    tags: ["project", `project:${slug}`],
  }).catch(() => null);

  if (!project) notFound();

  const coverUrl = project.coverImage?.asset
    ? urlFor(project.coverImage).width(1600).height(900).url()
    : null;

  return (
    <article>
      <section className="border-b border-border bg-white py-16">
        <Container className="space-y-6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
            {project.client ? <span>{project.client}</span> : null}
            {project.year ? <span>{project.year}</span> : null}
            {project.categories?.map((category) => (
              <span
                key={category._id}
                className="rounded-full border border-border px-3 py-1"
              >
                {category.title}
              </span>
            ))}
          </div>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            {project.title}
          </h1>
          {project.excerpt ? (
            <p className="max-w-3xl text-lg leading-relaxed text-neutral-600">
              {project.excerpt}
            </p>
          ) : null}
        </Container>
      </section>

      {coverUrl ? (
        <div className="relative aspect-[16/9] w-full bg-neutral-100">
          <Image
            src={coverUrl}
            alt={project.coverImage.alt || project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      ) : null}

      <Container className="grid gap-16 py-16 lg:grid-cols-[1fr_0.35fr]">
        <div className="space-y-12">
          <PortableTextRenderer value={project.body} />
          <CaseStudySection title="Desafio" content={project.challenge} />
          <CaseStudySection title="Solução" content={project.solution} />
          <CaseStudySection title="Resultado" content={project.result} />
        </div>

        {project.gallery?.length ? (
          <aside className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Galeria
            </p>
            <div className="space-y-4">
              {project.gallery.map((image, index) => {
                if (!image.asset) return null;
                const imageUrl = urlFor(image).width(800).height(600).url();

                return (
                  <div
                    key={`${image.asset._ref}-${index}`}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100"
                  >
                    <Image
                      src={imageUrl}
                      alt={image.alt || `${project.title} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 30vw"
                    />
                  </div>
                );
              })}
            </div>
          </aside>
        ) : null}
      </Container>
    </article>
  );
}
