import Link from "next/link";

type FooterBracketCtaProps = {
  href: string;
  label: string;
  openInNewTab?: boolean;
};

export function FooterBracketCta({
  href,
  label,
  openInNewTab,
}: FooterBracketCtaProps) {
  return (
    <Link
      href={href}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-2 font-arc-mono text-base lowercase leading-none text-[#c0edff] transition-opacity hover:opacity-100"
    >
      <span>[</span>
      <span>{label}</span>
      <span>]</span>
    </Link>
  );
}
