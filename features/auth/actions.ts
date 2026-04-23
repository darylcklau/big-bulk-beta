"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { env } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { magicLinkSchema, passwordSignInSchema } from "@/lib/validation";

export async function signInWithPassword(_: unknown, formData: FormData) {
  const parsed = passwordSignInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Unable to sign in." };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function sendMagicLink(_: unknown, formData: FormData) {
  const parsed = magicLinkSchema.safeParse({
    email: formData.get("email")
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Unable to send magic link." };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: {
      emailRedirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback`
    }
  });

  if (error) {
    return { error: error.message };
  }

  return { success: "Magic link sent. Check your inbox." };
}

export async function signOut() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/login");
}
