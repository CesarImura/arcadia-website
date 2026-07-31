import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  const imageUrl = post.coverImage?.asset
    ? urlFor(post.coverImage).width(800).height(500).url()
    : null;

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block overflow-hidden rounded-3xl border border-border bg-white transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.coverImage?.alt || post.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-400">
            Sem imagem
          </div>
        )}
      </div>
      <div className="space-y-3 p-6">
        <p className="text-sm text-neutral-500">
          {formatDate(post.publishedAt)}
          {post.author ? ` · ${post.author}` : ""}
        </p>
        <h3 className="text-xl font-semibold text-neutral-900">{post.title}</h3>
        {post.excerpt ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600">
            {post.excerpt}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
