import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-3xl font-semibold tracking-tight text-neutral-900">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-2xl font-semibold tracking-tight text-neutral-900">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-lg leading-relaxed text-neutral-700">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-neutral-900 pl-4 text-lg italic text-neutral-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-2 pl-6 text-neutral-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-2 pl-6 text-neutral-700">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");

      return (
        <a
          href={href}
          className="font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-600"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;

      const imageUrl = urlFor(value).width(1200).url();

      return (
        <figure className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || ""}
            width={1200}
            height={675}
            className="h-auto w-full rounded-2xl object-cover"
          />
          {value.caption ? (
            <figcaption className="mt-3 text-sm text-neutral-500">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

type PortableTextRendererProps = {
  value?: PortableTextBlock[];
  className?: string;
};

export function PortableTextRenderer({
  value,
  className,
}: PortableTextRendererProps) {
  if (!value?.length) return null;

  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
