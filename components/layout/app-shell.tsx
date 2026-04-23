import type { PropsWithChildren } from "react";

import { BottomNav } from "@/components/layout/bottom-nav";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-surface bg-hero-glow text-ink">
      <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-4 pb-28 pt-6">{children}</div>
      <BottomNav />
    </div>
  );
}
