"use client";

import { useActionState } from "react";

import { signInWithPassword, sendMagicLink } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const initialState = {
  error: "",
  success: ""
};

export function LoginForm() {
  const [passwordState, passwordAction, passwordPending] = useActionState(signInWithPassword, initialState);
  const [magicState, magicAction, magicPending] = useActionState(sendMagicLink, initialState);

  return (
    <div className="grid gap-4">
      <Card>
        <CardContent className="grid gap-4">
          <div>
            <h2 className="text-xl font-semibold">Sign in with password</h2>
            <p className="mt-1 text-sm text-slate-500">Fastest path for the two-user private beta.</p>
          </div>
          <form action={passwordAction} className="grid gap-3">
            <Input name="email" type="email" placeholder="daryl@example.com" autoComplete="email" required />
            <Input name="password" type="password" placeholder="Password" autoComplete="current-password" required />
            {passwordState.error ? <p className="text-sm text-rose-600">{passwordState.error}</p> : null}
            <Button type="submit" fullWidth disabled={passwordPending}>
              {passwordPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid gap-4">
          <div>
            <h2 className="text-xl font-semibold">Or send a magic link</h2>
            <p className="mt-1 text-sm text-slate-500">Useful while you are testing auth flows on mobile.</p>
          </div>
          <form action={magicAction} className="grid gap-3">
            <Input name="email" type="email" placeholder="chris@example.com" autoComplete="email" required />
            {magicState.error ? <p className="text-sm text-rose-600">{magicState.error}</p> : null}
            {magicState.success ? <p className="text-sm text-emerald-700">{magicState.success}</p> : null}
            <Button type="submit" fullWidth variant="secondary" disabled={magicPending}>
              {magicPending ? "Sending..." : "Email me a magic link"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
