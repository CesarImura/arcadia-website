export type LastCallSectionContent = {
  label: string;
  title: string;
  description: string;
  contactName: string;
  contactRole: string;
  contactPhotoSrc: string;
  contactPhotoAlt: string;
  ctaLabel: string;
  ctaHref: string;
};

export const defaultLastCallSection: LastCallSectionContent = {
  label: "last call",
  title: "Pronto para parar de depender de indicação?",
  description:
    "Agende uma conversa e descubra como a metodologia ARC pode posicionar seu escritório como referência no mercado.",
  contactName: "Jaellan Rodrigues",
  contactRole: "Co-founder & CEO",
  contactPhotoSrc: "/images/last-call/profile-placeholder.jpg",
  contactPhotoAlt: "Jaellan Rodrigues",
  ctaLabel: "Entrar em contato",
  ctaHref: "/contato",
};
