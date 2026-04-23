import Link from "next/link";
import { ArrowRight, Flame, Layers, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDashboardSummary } from "@/features/dashboard/queries";
import { formatDateTime, formatNumber } from "@/lib/utils";

export default async function DashboardPage() {
  const summary = await getDashboardSummary();

  return (
    <main className="grid gap-5">
      <section className="grid gap-3">
        <Badge>Today</Badge>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Train clean. Log fast.</h1>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
              Your private dashboard surfaces today’s work, recent sets, and weekly volume without any clutter.
            </p>
          </div>
          <Link href="/log">
            <Button>Log workout</Button>
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <MetricCard label="Sets this week" value={String(summary.totalSetsThisWeek)} icon={<Layers className="h-5 w-5" />} />
        <MetricCard
          label="Volume this week"
          value={`${formatNumber(summary.estimatedVolumeThisWeek)} kg`}
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </section>

      <Card className="overflow-hidden bg-pine text-white">
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-2 text-sm text-white/75">
            <Flame className="h-4 w-4" />
            <span>Session focus</span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{summary.todayWorkouts.length} sets logged today</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-white/75">
              Keep the capture flow frictionless now. Phase 2 comparison and coaching hooks are designed to layer in
              later without changing the Phase 1 UX.
            </p>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Today&apos;s workouts</h2>
          <Link href="/history" className="text-sm font-medium text-pine">
            History
          </Link>
        </div>
        {summary.todayWorkouts.length ? (
          <div className="grid gap-3">
            {summary.todayWorkouts.map((workout) => (
              <Card key={workout.id}>
                <CardContent className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold">{workout.exercise}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {workout.reps} reps at {workout.weight}
                      {workout.unit}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500">{formatDateTime(workout.performed_at)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No sets logged yet today"
            body="Your dashboard is ready. Add your first set and the weekly metrics will start populating."
            href="/log"
          />
        )}
      </section>

      <section className="grid gap-3">
        <h2 className="text-lg font-semibold">Recent logs</h2>
        {summary.recentLogs.length ? (
          <Card>
            <CardContent className="grid gap-3">
              {summary.recentLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between gap-4 rounded-3xl bg-surface px-4 py-3">
                  <div>
                    <p className="font-medium">{log.exercise}</p>
                    <p className="text-sm text-slate-500">
                      {log.reps} x {log.weight}
                      {log.unit}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500">{formatDateTime(log.performed_at)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : null}
      </section>
    </main>
  );
}

function MetricCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="grid gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface text-pine">{icon}</div>
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({ title, body, href }: { title: string; body: string; href: string }) {
  return (
    <Card>
      <CardContent className="grid gap-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm leading-6 text-slate-500">{body}</p>
        <Link href={href}>
          <Button variant="secondary">
            Get started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
