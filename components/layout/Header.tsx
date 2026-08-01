import Image from "next/image";
import Link from "next/link";
import type { HeaderSurface } from "@/lib/use-header-surface";
import type { SiteSettings } from "@/lib/types";
import { getNavigation } from "@/lib/utils";
import { MobileNav } from "@/components/layout/MobileNav";

type HeaderProps = {
  settings?: SiteSettings | null;
  variant?: "default" | "overlay";
  surface?: HeaderSurface;
};

export function Header({
  settings,
  variant = "default",
  surface = "light",
}: HeaderProps) {
  const navigation = getNavigation(settings);
  const isOverlay = variant === "overlay";
  const onDark = isOverlay && surface === "dark";

  return (
    <header
      className={
        isOverlay
          ? "fixed inset-x-0 top-0 z-50 bg-transparent transition-colors duration-300"
          : "sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md"
      }
    >
      <div
        className={`flex w-full items-center justify-between gap-6 px-6 md:px-20 ${isOverlay ? "h-[57px] py-2" : "h-16"}`}
      >
        <Link href="/" className="relative block h-7 w-[88px] shrink-0">
          <Image
            src="/images/hero/arc-logo.svg"
            alt={settings?.siteName || "Arcadia"}
            fill
            className={`object-contain object-left transition-[filter] duration-300 ${onDark ? "brightness-0 invert" : ""}`}
            priority
          />
        </Link>

        <nav
          className={`hidden items-center gap-4 md:flex ${
            onDark
              ? "text-sm uppercase tracking-[0.05em] text-white"
              : "text-sm font-medium uppercase tracking-[0.05em] text-neutral-900"
          }`}
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                onDark
                  ? "transition hover:text-white/70"
                  : "transition hover:text-neutral-600"
              }
              target={item.openInNewTab ? "_blank" : undefined}
              rel={item.openInNewTab ? "noopener noreferrer" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isOverlay ? (
            <Link
              href="/contato"
              className={`hidden px-4 py-[15px] text-base leading-none transition-colors duration-300 md:inline-flex ${
                onDark
                  ? "bg-white text-black"
                  : "bg-neutral-900 text-white"
              }`}
            >
              Entre em contato
            </Link>
          ) : null}
          <MobileNav
            navigation={navigation}
            variant={onDark ? "hero" : "default"}
          />
        </div>
      </div>
    </header>
  );
}
