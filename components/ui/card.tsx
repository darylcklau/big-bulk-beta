import type { HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export function Card({ className, children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={cn("rounded-4xl bg-white shadow-card ring-1 ring-black/5", className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={cn("p-5", className)} {...props}>
      {children}
    </div>
  );
}
