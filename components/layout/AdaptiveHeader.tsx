"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { useHeaderSurface } from "@/lib/use-header-surface";
import type { SiteSettings } from "@/lib/types";

type AdaptiveHeaderProps = {
  settings?: SiteSettings | null;
};

export function AdaptiveHeader({ settings }: AdaptiveHeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const surface = useHeaderSurface(isHome);

  return (
    <Header
      settings={settings}
      variant={isHome ? "overlay" : "default"}
      surface={isHome ? surface : "light"}
    />
  );
}
