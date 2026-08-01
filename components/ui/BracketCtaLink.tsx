import Link from "next/link";
import { BracketArrow } from "@/components/ui/BracketArrow";

type BracketCtaLinkProps = {
  href: string;
  label: string;
  tone?: "dark" | "light";
};

export function BracketCtaLink({
  href,
  label,
  tone = "dark",
}: BracketCtaLinkProps) {
  const textClass =
    tone === "light" ? "text-white/80 hover:text-white" : "text-black/80";

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 font-arc-mono text-base lowercase leading-none transition-opacity hover:opacity-100 ${textClass}`}
    >
      <span>[</span>
      <span>{label}</span>
      <BracketArrow />
      <span>]</span>
    </Link>
  );
}
