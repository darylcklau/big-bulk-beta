import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { WorkoutLog } from "@/types/database";

export type DashboardSummary = {
  todayWorkouts: WorkoutLog[];
  recentLogs: WorkoutLog[];
  totalSetsThisWeek: number;
  estimatedVolumeThisWeek: number;
};

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      todayWorkouts: [],
      recentLogs: [],
      totalSetsThisWeek: 0,
      estimatedVolumeThisWeek: 0
    };
  }

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  startOfWeek.setHours(0, 0, 0, 0);

  const [{ data: recentLogs }, { data: todayWorkouts }, { data: weekLogs }] = await Promise.all([
    supabase
      .from("workout_logs")
      .select("*")
      .eq("user_id", user.id)
      .order("performed_at", { ascending: false })
      .limit(12),
    supabase
      .from("workout_logs")
      .select("*")
      .eq("user_id", user.id)
      .gte("performed_at", startOfToday)
      .order("performed_at", { ascending: false }),
    supabase
      .from("workout_logs")
      .select("*")
      .eq("user_id", user.id)
      .gte("performed_at", startOfWeek.toISOString())
  ]);

  return {
    todayWorkouts: todayWorkouts ?? [],
    recentLogs: recentLogs ?? [],
    totalSetsThisWeek: weekLogs?.length ?? 0,
    estimatedVolumeThisWeek: (weekLogs ?? []).reduce((sum, log) => sum + log.volume, 0)
  };
}
