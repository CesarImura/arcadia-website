import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { TeamMember } from "@/lib/types";

type TeamMemberCardProps = {
  member: TeamMember;
};

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const imageUrl = member.photo?.asset
    ? urlFor(member.photo).width(600).height(600).url()
    : null;

  return (
    <article className="rounded-3xl border border-border bg-white p-6">
      <div className="relative mb-5 aspect-square overflow-hidden rounded-2xl bg-neutral-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={member.photo?.alt || member.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-400">
            Sem foto
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold text-neutral-900">{member.name}</h3>
      <p className="mt-1 text-sm text-neutral-500">{member.role}</p>
      {member.bio ? (
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">{member.bio}</p>
      ) : null}
    </article>
  );
}
