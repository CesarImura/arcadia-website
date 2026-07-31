import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { Project } from "@/lib/types";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const imageUrl = project.coverImage?.asset
    ? urlFor(project.coverImage).width(800).height(600).url()
    : null;

  return (
    <Link
      href={`/projetos/${project.slug.current}`}
      className="group block overflow-hidden rounded-3xl border border-border bg-white transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.coverImage.alt || project.title}
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
      <div className="space-y-2 p-6">
        <div className="flex items-center justify-between gap-4 text-sm text-neutral-500">
          <span>{project.client || "Projeto"}</span>
          {project.year ? <span>{project.year}</span> : null}
        </div>
        <h3 className="text-xl font-semibold text-neutral-900">{project.title}</h3>
        {project.excerpt ? (
          <p className="line-clamp-2 text-sm leading-relaxed text-neutral-600">
            {project.excerpt}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
