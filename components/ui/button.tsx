import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
    fullWidth?: boolean;
  }
>;

export function Button({ className, variant = "primary", fullWidth, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-mint disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" && "bg-pine text-white shadow-card hover:bg-[#0f2a24]",
        variant === "secondary" && "bg-white text-ink ring-1 ring-line hover:bg-surface",
        variant === "ghost" && "bg-transparent text-ink hover:bg-white/60",
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
