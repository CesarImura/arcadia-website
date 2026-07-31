import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortableTextRenderer } from "@/lib/portable-text";
import { buildMetadata } from "@/lib/metadata";
import { contactPageQuery, siteSettingsQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity/fetch";
import type { ContactPage, SiteSettings } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, contactPage] = await Promise.all([
    sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
    }).catch(() => null),
    sanityFetch<ContactPage | null>({
      query: contactPageQuery,
      tags: ["contactPage"],
    }).catch(() => null),
  ]);

  return buildMetadata({
    siteSettings: settings,
    seo: contactPage?.seo,
    fallbackTitle: contactPage?.title || "Contato",
    fallbackDescription: "Entre em contato com nossa equipe.",
    path: "/contato",
  });
}

export default async function ContactPage() {
  const [settings, contactPage] = await Promise.all([
    sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
    }).catch(() => null),
    sanityFetch<ContactPage | null>({
      query: contactPageQuery,
      tags: ["contactPage"],
    }).catch(() => null),
  ]);

  return (
    <section className="py-20">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-8">
          <SectionHeading
            eyebrow="Contato"
            title={contactPage?.title || "Vamos conversar"}
            description="Conte sobre seu projeto e retornaremos com a melhor abordagem."
          />
          <PortableTextRenderer value={contactPage?.intro} />

          <div className="space-y-4 rounded-3xl border border-border bg-white p-6 text-sm text-neutral-700">
            {settings?.contactEmail ? (
              <p>
                <span className="font-medium text-neutral-900">E-mail:</span>{" "}
                <a href={`mailto:${settings.contactEmail}`}>
                  {settings.contactEmail}
                </a>
              </p>
            ) : null}
            {settings?.contactPhone ? (
              <p>
                <span className="font-medium text-neutral-900">Telefone:</span>{" "}
                {settings.contactPhone}
              </p>
            ) : null}
            {settings?.contactAddress ? (
              <p className="whitespace-pre-line">
                <span className="font-medium text-neutral-900">Endereço:</span>{" "}
                {settings.contactAddress}
              </p>
            ) : null}
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-white p-8">
          <h2 className="mb-6 text-2xl font-semibold text-neutral-900">
            {contactPage?.formTitle || "Envie uma mensagem"}
          </h2>
          <ContactForm successMessage={contactPage?.successMessage} />
        </div>
      </Container>
    </section>
  );
}
