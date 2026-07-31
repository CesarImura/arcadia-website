import type { PortableTextBlock } from "@portabletext/types";
import { PortableTextRenderer } from "@/lib/portable-text";

type CaseStudySectionProps = {
  title: string;
  content?: PortableTextBlock[];
};

export function CaseStudySection({ title, content }: CaseStudySectionProps) {
  if (!content?.length) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-neutral-900">{title}</h2>
      <PortableTextRenderer value={content} />
    </section>
  );
}
