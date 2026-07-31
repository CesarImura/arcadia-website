"use client";

import Link from "next/link";
import { useState } from "react";
import type { Link as NavLink } from "@/lib/types";

type MobileNavProps = {
  navigation: NavLink[];
  variant?: "default" | "hero";
};

export function MobileNav({ navigation, variant = "default" }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const isHero = variant === "hero";

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        className={`inline-flex h-10 w-10 items-center justify-center border ${
          isHero
            ? "border-white/30 text-white"
            : "border-border text-neutral-700"
        }`}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? "×" : "☰"}
      </button>

      {open ? (
        <div
          className={`absolute left-0 right-0 top-[57px] border-b px-6 py-4 shadow-sm ${
            isHero
              ? "border-white/10 bg-[#04040d]/95 text-white"
              : "border-border bg-background"
          }`}
        >
          <nav className="flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium"
                onClick={() => setOpen(false)}
                target={item.openInNewTab ? "_blank" : undefined}
                rel={item.openInNewTab ? "noopener noreferrer" : undefined}
              >
                {item.label}
              </Link>
            ))}
            {isHero ? (
              <Link
                href="/contato"
                className="inline-flex bg-white px-4 py-3 text-black"
                onClick={() => setOpen(false)}
              >
                Entre em contato
              </Link>
            ) : null}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
