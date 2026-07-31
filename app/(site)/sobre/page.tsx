import type { Metadata } from "next";
import { TeamMemberCard } from "@/components/cards/TeamMemberCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortableTextRenderer } from "@/lib/portable-text";
import { buildMetadata } from "@/lib/metadata";
import {
  aboutPageQuery,
  siteSettingsQuery,
  teamMembersQuery,
} from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity/fetch";
import type { AboutPage, SiteSettings, TeamMember } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, aboutPage] = await Promise.all([
    sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
    }).catch(() => null),
    sanityFetch<AboutPage | null>({
      query: aboutPageQuery,
      tags: ["aboutPage"],
    }).catch(() => null),
  ]);

  return buildMetadata({
    siteSettings: settings,
    seo: aboutPage?.seo,
    fallbackTitle: aboutPage?.title || "Sobre",
    fallbackDescription: "Conheça nossa história, missão e equipe.",
    path: "/sobre",
  });
}

export default async function AboutPage() {
  const [aboutPage, teamMembers] = await Promise.all([
    sanityFetch<AboutPage | null>({
      query: aboutPageQuery,
      tags: ["aboutPage"],
    }).catch(() => null),
    sanityFetch<TeamMember[]>({
      query: teamMembersQuery,
      tags: ["teamMember"],
    }).catch(() => []),
  ]);

  return (
    <>
      <section className="border-b border-border bg-white py-20">
        <Container className="space-y-8">
          <SectionHeading
            eyebrow="Institucional"
            title={aboutPage?.title || "Sobre a Arcadia"}
            description="Uma equipe multidisciplinar focada em projetos institucionais de alto impacto."
          />
          <PortableTextRenderer value={aboutPage?.intro} />
        </Container>
      </section>

      {(aboutPage?.missionTitle || aboutPage?.missionText?.length) && (
        <section className="py-20">
          <Container className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading
              eyebrow="Missão"
              title={aboutPage.missionTitle || "Nossa missão"}
            />
            <PortableTextRenderer value={aboutPage.missionText} />
          </Container>
        </section>
      )}

      {aboutPage?.values?.length ? (
        <section className="bg-white py-20">
          <Container className="space-y-10">
            <SectionHeading
              eyebrow="Valores"
              title={aboutPage.valuesTitle || "O que nos guia"}
            />
            <div className="grid gap-6 md:grid-cols-3">
              {aboutPage.values.map((value) => (
                <article
                  key={value.title}
                  className="rounded-3xl border border-border p-6"
                >
                  <h3 className="text-xl font-semibold text-neutral-900">
                    {value.title}
                  </h3>
                  {value.description ? (
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                      {value.description}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-20">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Equipe"
            title="Quem faz acontecer"
            description="Profissionais com experiência em branding, digital e comunicação institucional."
          />

          {teamMembers.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member._id} member={member} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border p-10 text-center text-neutral-500">
              Adicione membros da equipe no Sanity Studio.
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
