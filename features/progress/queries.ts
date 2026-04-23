import { createServerSupabaseClient } from "@/lib/supabase/server";

export type ExercisePoint = {
  date: string;
  weight: number;
  reps: number;
  volume: number;
};

export async function getExerciseHistory(exercise?: string) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { exercises: [] as string[], selectedExercise: "", points: [] as ExercisePoint[] };
  }

  const { data: logs } = await supabase
    .from("workout_logs")
    .select("*")
    .eq("user_id", user.id)
    .order("performed_at", { ascending: true });

  const exercises = Array.from(new Set((logs ?? []).map((log) => log.exercise)));
  const selectedExercise = exercise && exercises.includes(exercise) ? exercise : exercises[0] ?? "";
  const points = (logs ?? [])
    .filter((log) => log.exercise === selectedExercise)
    .map((log) => ({
      date: log.performed_at,
      weight: log.weight,
      reps: log.reps,
      volume: log.volume
    }));

  return { exercises, selectedExercise, points };
}
