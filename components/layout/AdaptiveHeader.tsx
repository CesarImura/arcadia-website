"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import type { SiteSettings } from "@/lib/types";

type AdaptiveHeaderProps = {
  settings?: SiteSettings | null;
};

export function AdaptiveHeader({ settings }: AdaptiveHeaderProps) {
  const pathname = usePathname();
  const variant = pathname === "/" ? "hero" : "default";

  return <Header settings={settings} variant={variant} />;
}
