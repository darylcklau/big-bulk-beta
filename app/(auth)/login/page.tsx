import { Dumbbell } from "lucide-react";

import { LoginForm } from "@/components/forms/login-form";
import { Badge } from "@/components/ui/badge";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-surface bg-hero-glow px-4 py-8 text-ink">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-xl content-center gap-6">
        <div className="grid gap-4">
          <Badge>Private Beta</Badge>
          <div className="flex items-center gap-3">
            <div className="rounded-3xl bg-pine p-3 text-white">
              <Dumbbell className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight">BIG Bulk</h1>
              <p className="mt-1 text-sm text-slate-600">Apple Fitness-inspired workout logging built for speed.</p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-600">
            Phase 1 focuses on private logging, fast entry, and clean progress tracking. Google OAuth and social
            comparison are scaffolded for later without adding noise to the current product.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
