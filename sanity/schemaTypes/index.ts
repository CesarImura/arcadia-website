import { aboutPage } from "./aboutPage";
import { category } from "./category";
import { contactPage } from "./contactPage";
import { homePage } from "./homePage";
import { legalPage } from "./legalPage";
import { blockContent, footerAiLink, link, seo, socialLink } from "./objects";
import { post } from "./post";
import { project } from "./project";
import { siteSettings } from "./siteSettings";
import { teamMember } from "./teamMember";

export const schemaTypes = [
  siteSettings,
  homePage,
  aboutPage,
  contactPage,
  project,
  post,
  teamMember,
  legalPage,
  category,
  blockContent,
  seo,
  link,
  socialLink,
  footerAiLink,
];
