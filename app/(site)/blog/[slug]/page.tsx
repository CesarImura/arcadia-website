import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PortableTextRenderer } from "@/lib/portable-text";
import { buildMetadata } from "@/lib/metadata";
import { postBySlugQuery, postsQuery, siteSettingsQuery } from "@/lib/queries";
import { urlFor } from "@/lib/sanity/image";
import { sanityFetch } from "@/lib/sanity/fetch";
import type { Post, SiteSettings } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await sanityFetch<Post[]>({
    query: postsQuery,
    tags: ["post"],
  }).catch(() => []);

  return posts.map((post) => ({ slug: post.slug.current }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [settings, post] = await Promise.all([
    sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
    }).catch(() => null),
    sanityFetch<Post | null>({
      query: postBySlugQuery,
      params: { slug },
      tags: ["post", `post:${slug}`],
    }).catch(() => null),
  ]);

  if (!post) {
    return buildMetadata({
      siteSettings: settings,
      fallbackTitle: "Post não encontrado",
      path: `/blog/${slug}`,
    });
  }

  return buildMetadata({
    siteSettings: settings,
    seo: post.seo,
    fallbackTitle: post.title,
    fallbackDescription: post.excerpt,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>({
    query: postBySlugQuery,
    params: { slug },
    tags: ["post", `post:${slug}`],
  }).catch(() => null);

  if (!post) notFound();

  const coverUrl = post.coverImage?.asset
    ? urlFor(post.coverImage).width(1400).height(700).url()
    : null;

  return (
    <article>
      <section className="border-b border-border bg-white py-16">
        <Container className="space-y-6">
          <p className="text-sm text-neutral-500">
            {formatDate(post.publishedAt)}
            {post.author ? ` · ${post.author}` : ""}
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="max-w-3xl text-lg leading-relaxed text-neutral-600">
              {post.excerpt}
            </p>
          ) : null}
          {post.categories?.length ? (
            <div className="flex flex-wrap gap-3">
              {post.categories.map((category) => (
                <span
                  key={category._id}
                  className="rounded-full border border-border px-3 py-1 text-sm text-neutral-600"
                >
                  {category.title}
                </span>
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      {coverUrl ? (
        <div className="relative aspect-[16/8] w-full bg-neutral-100">
          <Image
            src={coverUrl}
            alt={post.coverImage?.alt || post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      ) : null}

      <Container className="max-w-3xl py-16">
        <PortableTextRenderer value={post.body} />
      </Container>
    </article>
  );
}
