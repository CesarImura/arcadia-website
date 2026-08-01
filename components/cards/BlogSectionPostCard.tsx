import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import {
  BLOG_CARD_ASPECTS,
  BLOG_CARD_STAGGER,
} from "@/lib/blog-section";
import type { Post } from "@/lib/types";

type BlogSectionPostCardProps = {
  post: Post;
  index: number;
};

function BracketReadMore() {
  return (
    <span className="inline-flex items-center gap-2 font-arc-mono text-base lowercase leading-none text-black/80 transition-opacity group-hover:opacity-100">
      <span>[</span>
      <span>ver mais</span>
      <Image
        src="/images/usp/arrow-right.svg"
        alt=""
        width={20}
        height={20}
        className="size-5"
        aria-hidden
      />
      <span>]</span>
    </span>
  );
}

export function BlogSectionPostCard({ post, index }: BlogSectionPostCardProps) {
  const aspect =
    BLOG_CARD_ASPECTS[index % BLOG_CARD_ASPECTS.length] ?? "aspect-square";
  const stagger =
    BLOG_CARD_STAGGER[index % BLOG_CARD_STAGGER.length] ?? false;
  const category = post.categories?.[0]?.title;
  const imageUrl = post.coverImage?.asset
    ? urlFor(post.coverImage).width(960).height(960).quality(85).url()
    : null;

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className={`group flex w-full max-w-[480px] flex-col gap-6 ${
        stagger ? "lg:mt-24" : ""
      }`}
    >
      <div
        className={`relative w-full overflow-hidden bg-[#d9d9d9] ${aspect}`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.coverImage?.alt || post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 90vw, 480px"
          />
        ) : (
          <div className="flex h-full min-h-[280px] items-center justify-center text-sm text-black/40">
            Sem imagem
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {category ? (
          <span className="inline-flex w-fit bg-[#e2e4e3] px-2 py-1 font-arc-mono text-sm leading-[1.3] text-black">
            {category}
          </span>
        ) : null}

        <h3 className="text-2xl leading-[1.5] text-black">{post.title}</h3>

        <BracketReadMore />
      </div>
    </Link>
  );
}
