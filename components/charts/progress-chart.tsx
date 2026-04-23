"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import type { ExercisePoint } from "@/features/progress/queries";
import { formatNumber } from "@/lib/utils";

type ProgressChartProps = {
  data: ExercisePoint[];
  metric: "weight" | "reps" | "volume";
};

export function ProgressChart({ data, metric }: ProgressChartProps) {
  const chartData = data.map((point) => ({
    ...point,
    label: new Intl.DateTimeFormat("en-SG", { month: "short", day: "numeric" }).format(new Date(point.date))
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 16, right: 12, left: 0, bottom: 4 }}>
          <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} stroke="#799288" />
          <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="#799288" tickFormatter={formatNumber} />
          <Tooltip
            formatter={(value: number) => formatNumber(value)}
            contentStyle={{
              borderRadius: "18px",
              border: "1px solid #d9e1dc",
              boxShadow: "0 12px 24px rgba(10, 18, 15, 0.1)"
            }}
          />
          <Line
            type="monotone"
            dataKey={metric}
            stroke="#163a31"
            strokeWidth={3}
            dot={{ r: 3, fill: "#56d39b", strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#163a31" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
