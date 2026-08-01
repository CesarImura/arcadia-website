import { BlogSectionPostCard } from "@/components/cards/BlogSectionPostCard";
import { SectionBracketLabel } from "@/components/content/SectionBracketLabel";
import { defaultBlogSection } from "@/lib/blog-section";
import type { Post } from "@/lib/types";

type BlogPostsSectionProps = {
  posts: Post[];
  title?: string;
  label?: string;
};

export function BlogPostsSection({
  posts,
  title = defaultBlogSection.title,
  label = defaultBlogSection.label,
}: BlogPostsSectionProps) {
  return (
    <section
      className="bg-[#ececec] text-black"
      aria-label="Blog"
      data-header-theme="light"
    >
      <div className="mx-auto flex max-w-[1920px] flex-col gap-12 px-6 py-16 md:gap-14 md:px-20 md:py-[120px]">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <h2 className="max-w-[585px] font-arc-sans text-arc-heading font-medium leading-[1.3]">
            {title}
          </h2>
          <SectionBracketLabel sectionKey="blog" label={label} tone="black" />
        </header>

        {posts.length ? (
          <div className="grid items-start gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
            {posts.map((post, index) => (
              <BlogSectionPostCard key={post._id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-black/20 px-8 py-12 text-center text-black/60">
            Publique posts no Sanity Studio para exibir as novidades aqui.
          </div>
        )}
      </div>
    </section>
  );
}
