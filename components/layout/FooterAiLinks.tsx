import Image from "next/image";
import {
  footerAiPlatformIcons,
  footerAiPlatformLabels,
  type FooterAiLink,
} from "@/lib/footer-section";

type FooterAiLinksProps = {
  title: string;
  links: FooterAiLink[];
};

export function FooterAiLinks({ title, links }: FooterAiLinksProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-arc-sans text-lg leading-normal text-white/80">
        {title}
      </p>
      <div className="flex items-center">
        {links.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative size-12 shrink-0 transition-opacity hover:opacity-100"
            aria-label={footerAiPlatformLabels[link.platform]}
          >
            <Image
              src={footerAiPlatformIcons[link.platform]}
              alt=""
              fill
              className="object-contain"
              sizes="48px"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
