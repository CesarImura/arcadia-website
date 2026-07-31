import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonProps = ComponentProps<"button"> & {
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
};

const variants = {
  primary:
    "bg-neutral-900 text-white hover:bg-neutral-700 border border-neutral-900",
  secondary:
    "bg-white text-neutral-900 hover:bg-neutral-100 border border-border",
  ghost:
    "bg-transparent text-neutral-900 hover:bg-neutral-100 border border-transparent",
};

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition ${variants[variant]} ${className}`;

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
