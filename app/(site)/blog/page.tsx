import type { Metadata } from "next";
import { PostCard } from "@/components/cards/PostCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/metadata";
import { postsQuery, siteSettingsQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity/fetch";
import type { Post, SiteSettings } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
  }).catch(() => null);

  return buildMetadata({
    siteSettings: settings,
    fallbackTitle: "Blog",
    fallbackDescription: "Notícias, insights e conteúdos institucionais.",
    path: "/blog",
  });
}

export default async function BlogPage() {
  const posts = await sanityFetch<Post[]>({
    query: postsQuery,
    tags: ["post"],
  }).catch(() => []);

  return (
    <section className="py-20">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Conteúdo"
          title="Blog"
          description="Acompanhe novidades, tendências e aprendizados do nosso time."
        />

        {posts.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border p-10 text-center text-neutral-500">
            Nenhum post publicado ainda. Crie o primeiro no Sanity Studio.
          </div>
        )}
      </Container>
    </section>
  );
}
