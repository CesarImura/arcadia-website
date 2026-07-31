type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";

  return (
    <div className={`space-y-4 ${alignment}`}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-lg leading-relaxed text-neutral-600">{description}</p>
      ) : null}
    </div>
  );
}
