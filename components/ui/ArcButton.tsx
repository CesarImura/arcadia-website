import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ArcButtonProps = ComponentProps<"button"> & {
  href?: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
};

export function ArcButton({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}: ArcButtonProps) {
  const classes = `inline-flex h-14 min-w-[204px] items-center justify-center px-5 text-lg font-medium leading-none transition ${
    variant === "primary"
      ? "bg-black text-white hover:bg-neutral-800"
      : "border border-black bg-transparent text-black hover:bg-black/5"
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
