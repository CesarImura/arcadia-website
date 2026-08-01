import Image from "next/image";
import Link from "next/link";
import { FooterAiLinks } from "@/components/layout/FooterAiLinks";
import { FooterBracketCta } from "@/components/layout/FooterBracketCta";
import { FooterColumnHeader } from "@/components/layout/FooterColumnHeader";
import { resolveFooterContent } from "@/lib/footer-section";
import type { SiteSettings } from "@/lib/types";

type FooterProject = {
  title: string;
  slug: { current: string };
};

type FooterProps = {
  settings?: SiteSettings | null;
  featuredProjects?: FooterProject[] | null;
};

const socialLabels: Record<string, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  youtube: "YouTube",
  x: "X",
};

const socialIconPaths: Record<string, string> = {
  instagram: "/images/footer/social-instagram.svg",
  linkedin: "/images/footer/social-linkedin.svg",
};

function FooterNavLink({
  href,
  label,
  openInNewTab,
}: {
  href: string;
  label: string;
  openInNewTab?: boolean;
}) {
  return (
    <Link
      href={href}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      className="font-arc-mono text-base lowercase leading-normal text-white/80 transition-colors hover:text-white"
    >
      {label}
    </Link>
  );
}

export function Footer({ settings, featuredProjects }: FooterProps) {
  const projectLinks =
    featuredProjects?.map((project) => ({
      title: project.title,
      href: `/projetos/${project.slug.current}`,
    })) ?? [];

  const footer = resolveFooterContent(settings, projectLinks);
  const contactEmail = settings?.contactEmail || "contato@arcadia.com";
  const contactPhone = settings?.contactPhone || "+55 11 91399 5722";
  const contactAddress =
    settings?.contactAddress ||
    "Av. Paulista, 1636, Sala 1504,\nCerqueira César - São Paulo/SP.";

  return (
    <footer
      className="relative overflow-hidden bg-[#04040d] text-white"
      data-header-theme="dark"
    >
      <div className="relative z-10 mx-auto flex max-w-[1920px] flex-col gap-16 px-6 pb-2 pt-6 md:px-20 md:gap-20 md:pt-6 xl:gap-[120px]">
        <div className="grid gap-12 xl:grid-cols-[minmax(0,320px)_minmax(0,1fr)_minmax(0,320px)] xl:gap-8 2xl:grid-cols-[minmax(0,422px)_minmax(0,1fr)_minmax(0,422px)]">
          <div className="flex flex-col gap-8">
            <Link href="/" aria-label="Arcadia home">
              <Image
                src="/images/footer/logo.svg"
                alt=""
                width={54}
                height={54}
                className="size-[54px]"
              />
            </Link>

            <div className="flex flex-col gap-2">
              <FooterBracketCta
                href={footer.primaryCta.href}
                label={footer.primaryCta.label}
                openInNewTab={footer.primaryCta.openInNewTab}
              />
              <FooterBracketCta
                href={footer.secondaryCta.href}
                label={footer.secondaryCta.label}
                openInNewTab={footer.secondaryCta.openInNewTab}
              />
            </div>

            {settings?.socialLinks?.length ? (
              <div className="flex flex-col gap-3">
                {settings.socialLinks.map((social) => (
                  <a
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-arc-mono text-base lowercase leading-none text-white transition-opacity hover:opacity-80"
                  >
                    {socialLabels[social.platform] || social.platform}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-3">
            <FooterColumnHeader title="Companhia" />
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <p className="font-arc-sans text-base font-medium leading-normal text-white/50">
                  Companhia
                </p>
                <nav
                  className="flex flex-col gap-2"
                  aria-label="Links da companhia"
                >
                  {footer.companyLinks.map((link) => (
                    <FooterNavLink
                      key={`${link.href}-${link.label}`}
                      href={link.href}
                      label={link.label}
                      openInNewTab={link.openInNewTab}
                    />
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-3">
                <p className="font-arc-sans text-base font-medium leading-normal text-white/50">
                  Cases
                </p>
                {footer.featuredProjects.length ? (
                  <nav className="flex flex-col gap-2" aria-label="Cases em destaque">
                    {footer.featuredProjects.map((project) => (
                      <FooterNavLink
                        key={project.href}
                        href={project.href}
                        label={project.title}
                      />
                    ))}
                  </nav>
                ) : (
                  <p className="font-arc-mono text-base lowercase text-white/50">
                    Nenhum case em destaque
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <FooterColumnHeader title="Fale conosco" />
            <div className="flex flex-col gap-3">
              <p className="font-arc-sans text-base font-medium leading-normal text-white/50">
                Contato
              </p>
              <div className="flex flex-col gap-2 font-arc-mono text-base lowercase leading-normal text-white/80">
                <a
                  href={`mailto:${contactEmail}`}
                  className="transition-colors hover:text-white"
                >
                  {contactEmail}
                </a>
                <p>{contactPhone}</p>
                <p className="whitespace-pre-line">{contactAddress}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <FooterAiLinks title={footer.aiSummaryTitle} links={footer.aiLinks} />

            <div className="flex flex-col items-start gap-3 lg:items-end">
              <p className="font-arc-sans text-lg leading-normal text-white/80">
                {footer.copyrightText}
              </p>

              {settings?.socialLinks?.length ? (
                <div className="flex items-center opacity-50">
                  {settings.socialLinks.map((social) => {
                    const iconSrc = socialIconPaths[social.platform];

                    if (!iconSrc) {
                      return null;
                    }

                    return (
                      <a
                        key={`icon-${social.url}`}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative size-12 shrink-0 transition-opacity hover:opacity-100"
                        aria-label={socialLabels[social.platform] || social.platform}
                      >
                        <Image
                          src={iconSrc}
                          alt=""
                          fill
                          className="object-contain"
                          sizes="48px"
                        />
                      </a>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>

          <div className="pointer-events-none relative mx-auto w-full max-w-[1807px] opacity-5">
            <Image
              src="/images/footer/arcadia-wordmark.svg"
              alt=""
              width={1807}
              height={301}
              className="h-auto w-full max-h-[180px] object-contain object-bottom md:max-h-[240px] xl:max-h-none"
              aria-hidden
            />
            <Image
              src="/images/footer/copyright-symbol.svg"
              alt=""
              width={71}
              height={71}
              className="absolute right-0 top-0 hidden size-12 md:block xl:size-[71px]"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
