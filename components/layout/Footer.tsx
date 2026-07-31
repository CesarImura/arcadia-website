import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { getFooterLinks } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

type FooterProps = {
  settings?: SiteSettings | null;
};

const socialLabels: Record<string, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  youtube: "YouTube",
  x: "X",
};

export function Footer({ settings }: FooterProps) {
  const siteName = settings?.siteName || "Arcadia";
  const footerLinks = getFooterLinks(settings);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="text-lg font-semibold">{siteName}</p>
          <p className="max-w-md text-sm leading-relaxed text-neutral-600">
            {settings?.footerText ||
              settings?.tagline ||
              "Estúdio criativo especializado em projetos institucionais e experiências digitais memoráveis."}
          </p>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Links
          </p>
          <ul className="space-y-3 text-sm text-neutral-700">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-neutral-900">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Contato
          </p>
          <ul className="space-y-3 text-sm text-neutral-700">
            {settings?.contactEmail ? (
              <li>
                <a href={`mailto:${settings.contactEmail}`}>
                  {settings.contactEmail}
                </a>
              </li>
            ) : null}
            {settings?.contactPhone ? <li>{settings.contactPhone}</li> : null}
            {settings?.contactAddress ? (
              <li className="whitespace-pre-line">{settings.contactAddress}</li>
            ) : null}
          </ul>

          {settings?.socialLinks?.length ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {settings.socialLinks.map((social) => (
                <a
                  key={social.url}
                  href={social.url}
                  className="rounded-full border border-border px-3 py-1 text-xs font-medium text-neutral-700 hover:border-neutral-900 hover:text-neutral-900"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {socialLabels[social.platform] || social.platform}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-6 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>© {year} {siteName}. Todos os direitos reservados.</p>
          <p>Feito com Next.js e Sanity CMS.</p>
        </Container>
      </div>
    </footer>
  );
}
