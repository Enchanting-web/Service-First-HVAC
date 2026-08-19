import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "light" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-flame-700 text-white hover:bg-flame-600 shadow-card",
  outline: "border border-hairline-strong text-white hover:border-flame-600 hover:bg-flame-700/10",
  light: "bg-white text-flame-700 hover:bg-white/90 hover:text-flame-800 shadow-card",
  ghost: "text-flame-500 hover:text-flame-400",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-5 text-[0.95rem] gap-2",
  lg: "h-13 px-7 text-base gap-2.5",
};

const BASE =
  "inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-150 whitespace-nowrap";

function classes(variant: Variant, size: Size, className?: string) {
  return [BASE, VARIANTS[variant], SIZES[size], className].filter(Boolean).join(" ");
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  // Phone and mail links have to bypass the client router.
  const isExternal = /^(tel:|mailto:|https?:)/.test(href);
  if (isExternal) {
    return (
      <a href={href} className={classes(variant, size, className)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = {
  variant?: Variant;
  size?: Size;
} & ComponentProps<"button">;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${classes(variant, size, className)} disabled:cursor-not-allowed disabled:opacity-60`}
      {...rest}
    >
      {children}
    </button>
  );
}
