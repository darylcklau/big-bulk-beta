import { WorkoutLogForm } from "@/components/forms/workout-log-form";
import { Badge } from "@/components/ui/badge";

export default function LogPage() {
  return (
    <main className="grid gap-5">
      <section className="grid gap-3">
        <Badge>Capture</Badge>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Log sets mid-session</h1>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
            Type or dictate your sets in natural language. The parser normalizes exercise, reps, weight, unit, and
            timestamp before saving to Supabase.
          </p>
        </div>
      </section>

      <WorkoutLogForm />
    </main>
  );
}
