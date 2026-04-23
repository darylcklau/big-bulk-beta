import Link from "next/link";

import { ProgressChart } from "@/components/charts/progress-chart";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getExerciseHistory } from "@/features/progress/queries";

type HistoryPageProps = {
  searchParams: Promise<{
    exercise?: string;
  }>;
};

export default async function HistoryPage({ searchParams }: HistoryPageProps) {
  const { exercise } = await searchParams;
  const history = await getExerciseHistory(exercise);

  return (
    <main className="grid gap-5">
      <section className="grid gap-3">
        <Badge>Progress</Badge>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Exercise history</h1>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
            Weight, reps, and volume are charted independently so progression is easy to spot without overloading the
            interface.
          </p>
        </div>
      </section>

      <Card>
        <CardContent className="grid gap-4">
          <h2 className="text-lg font-semibold">Choose an exercise</h2>
          {history.exercises.length ? (
            <div className="flex flex-wrap gap-2">
              {history.exercises.map((item) => (
                <Link
                  key={item}
                  href={`/history?exercise=${encodeURIComponent(item)}`}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    item === history.selectedExercise ? "bg-pine text-white" : "bg-surface text-slate-600"
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Log a few workouts and your exercise library will appear here.</p>
          )}
        </CardContent>
      </Card>

      {history.points.length ? (
        <>
          <ChartBlock title="Weight over time" metric="weight" points={history.points} />
          <ChartBlock title="Reps over time" metric="reps" points={history.points} />
          <ChartBlock title="Volume over time" metric="volume" points={history.points} />
        </>
      ) : (
        <Card>
          <CardContent>
            <p className="text-sm text-slate-500">No data yet for this exercise.</p>
          </CardContent>
        </Card>
      )}
    </main>
  );
}

function ChartBlock({
  title,
  metric,
  points
}: {
  title: string;
  metric: "weight" | "reps" | "volume";
  points: Awaited<ReturnType<typeof getExerciseHistory>>["points"];
}) {
  return (
    <Card>
      <CardContent className="grid gap-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <ProgressChart data={points} metric={metric} />
      </CardContent>
    </Card>
  );
}
