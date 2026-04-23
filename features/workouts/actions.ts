"use server";

import { revalidatePath } from "next/cache";

import { parseWorkoutBatch } from "@/lib/parser";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { naturalLanguageEntrySchema } from "@/lib/validation";

export async function createWorkoutLog(_: unknown, formData: FormData) {
  const parsedInput = naturalLanguageEntrySchema.safeParse({
    entry: formData.get("entry")
  });

  if (!parsedInput.success) {
    return { error: parsedInput.error.issues[0]?.message ?? "Unable to save workout." };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You need to sign in before logging workouts." };
  }

  const parsedLines = parseWorkoutBatch(parsedInput.data.entry);
  const invalidLine = parsedLines.find((entry) => !entry.parsed);

  if (invalidLine) {
    return {
      error: `Could not parse "${invalidLine.raw}". Use the format: Bench Press 8 reps 80kg`
    };
  }

  const rows = parsedLines.map(({ parsed }) => ({
    user_id: user.id,
    exercise: parsed!.exercise,
    reps: parsed!.reps,
    weight: parsed!.weight,
    unit: parsed!.unit,
    volume: parsed!.reps * parsed!.weight,
    source: "typed" as const,
    performed_at: parsed!.performedAt
  }));

  const { error } = await supabase.from("workout_logs").insert(rows);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/history");
  revalidatePath("/log");

  return { success: `${rows.length} set${rows.length > 1 ? "s" : ""} saved.` };
}
