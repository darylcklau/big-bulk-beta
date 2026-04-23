import { Mail, Shield, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { signOut } from "@/features/auth/actions";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <main className="grid gap-5">
      <section className="grid gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
            Privacy stays simple in Phase 1: each account sees only its own data unless future friendship permissions
            are explicitly granted.
          </p>
        </div>
      </section>

      <Card>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-surface p-3 text-pine">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">Signed in as</p>
              <p className="text-sm text-slate-500">{user?.email ?? "Unknown email"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-surface p-3 text-pine">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">Privacy defaults</p>
              <p className="text-sm text-slate-500">Row-level security keeps workout logs private by default.</p>
            </div>
          </div>
          <div className="rounded-3xl bg-surface px-4 py-3 text-sm text-slate-600">
            Future-ready architecture is already reserved for friendship requests, comparison permissions, and sync
            integrations, but none of those paths expose user data today.
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-surface p-3 text-pine">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">Coming later</p>
              <p className="text-sm text-slate-500">Google OAuth, social compare views, exports, and AI coaching.</p>
            </div>
          </div>
          <form action={signOut}>
            <Button type="submit" variant="secondary">
              Sign out
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
