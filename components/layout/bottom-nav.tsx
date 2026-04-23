"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, ChartColumnBig, Home, Settings } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/log", label: "Log", icon: Activity },
  { href: "/history", label: "Progress", icon: ChartColumnBig },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-xl px-4 pb-4">
      <div className="grid grid-cols-4 rounded-[2rem] bg-white/92 p-2 shadow-card backdrop-blur">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-[1.4rem] px-2 py-3 text-[11px] font-medium text-slate-500 transition",
                active && "bg-surface text-pine"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
