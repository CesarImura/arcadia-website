import type { Metadata } from "next";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/metadata";
import { projectsQuery, siteSettingsQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity/fetch";
import type { Project, SiteSettings } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
  }).catch(() => null);

  return buildMetadata({
    siteSettings: settings,
    fallbackTitle: "Projetos",
    fallbackDescription: "Conheça nosso portfólio de projetos institucionais.",
    path: "/projetos",
  });
}

export default async function ProjectsPage() {
  const projects = await sanityFetch<Project[]>({
    query: projectsQuery,
    tags: ["project"],
  }).catch(() => []);

  return (
    <section className="py-20">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Portfólio"
          title="Projetos"
          description="Uma seleção de trabalhos que traduzem propósito, identidade e resultado."
        />

        {projects.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border p-10 text-center text-neutral-500">
            Nenhum projeto publicado ainda. Crie o primeiro no Sanity Studio.
          </div>
        )}
      </Container>
    </section>
  );
}
