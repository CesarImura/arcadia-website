import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { getNavigation } from "@/lib/utils";
import { MobileNav } from "@/components/layout/MobileNav";

type HeaderProps = {
  settings?: SiteSettings | null;
  variant?: "default" | "hero";
};

export function Header({ settings, variant = "default" }: HeaderProps) {
  const navigation = getNavigation(settings);
  const isHero = variant === "hero";

  return (
    <header
      className={
        isHero
          ? "fixed inset-x-0 top-0 z-50 bg-transparent"
          : "sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md"
      }
    >
      <div
        className={`flex w-full items-center justify-between gap-6 px-6 md:px-20 ${isHero ? "h-[57px] py-2" : "h-16"}`}
      >
        <Link href="/" className="relative block h-7 w-[88px] shrink-0">
          <Image
            src="/images/hero/arc-logo.svg"
            alt={settings?.siteName || "Arcadia"}
            fill
            className={`object-contain object-left ${isHero ? "brightness-0 invert" : ""}`}
            priority
          />
        </Link>

        <nav
          className={`hidden items-center gap-4 md:flex ${isHero ? "text-sm uppercase tracking-[0.05em] text-white" : ""}`}
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isHero
                  ? "transition hover:text-white/70"
                  : "text-sm font-medium text-neutral-600 transition hover:text-neutral-900"
              }
              target={item.openInNewTab ? "_blank" : undefined}
              rel={item.openInNewTab ? "noopener noreferrer" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isHero ? (
            <Link
              href="/contato"
              className="hidden bg-white px-4 py-[15px] text-base leading-none text-black md:inline-flex"
            >
              Entre em contato
            </Link>
          ) : null}
          <MobileNav navigation={navigation} variant={isHero ? "hero" : "default"} />
        </div>
      </div>
    </header>
  );
}
