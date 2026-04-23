import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-3xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-mint focus:bg-white",
        props.className
      )}
    />
  );
}
