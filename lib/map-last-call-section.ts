import {
  defaultLastCallSection,
  type LastCallSectionContent,
} from "@/lib/last-call-section";
import { urlFor } from "@/lib/sanity/image";
import type { HomePage } from "@/lib/types";

export function resolveLastCallSection(
  homePage?: HomePage | null,
): LastCallSectionContent {
  const contact = homePage?.lastCallContact;
  const photo = contact?.photo?.asset
    ? {
        src: urlFor(contact.photo).width(160).height(160).quality(85).url(),
        alt: contact.photo.alt || contact.name || defaultLastCallSection.contactPhotoAlt,
      }
    : {
        src: defaultLastCallSection.contactPhotoSrc,
        alt: defaultLastCallSection.contactPhotoAlt,
      };

  return {
    label: homePage?.lastCallLabel || defaultLastCallSection.label,
    title: homePage?.lastCallTitle || defaultLastCallSection.title,
    description:
      homePage?.lastCallDescription || defaultLastCallSection.description,
    contactName: contact?.name || defaultLastCallSection.contactName,
    contactRole: contact?.role || defaultLastCallSection.contactRole,
    contactPhotoSrc: photo.src,
    contactPhotoAlt: photo.alt,
    ctaLabel: homePage?.lastCallCta?.label || defaultLastCallSection.ctaLabel,
    ctaHref: homePage?.lastCallCta?.href || defaultLastCallSection.ctaHref,
  };
}
