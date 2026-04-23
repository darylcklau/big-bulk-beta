export type ParsedWorkoutEntry = {
  exercise: string;
  reps: number;
  weight: number;
  unit: "kg" | "lb";
  performedAt: string;
};

const WORKOUT_PATTERN =
  /^(?<exercise>[a-z0-9\s\-\&\.]+?)\s+(?<reps>\d{1,3})\s*reps?\s+(?<weight>\d{1,4}(?:\.\d{1,2})?)\s*(?<unit>kg|kgs|lb|lbs)$/i;

export function parseWorkoutEntry(raw: string, performedAt = new Date()): ParsedWorkoutEntry | null {
  const sanitized = raw.trim().replace(/\s+/g, " ");
  const match = WORKOUT_PATTERN.exec(sanitized);

  if (!match?.groups) {
    return null;
  }

  const unit = match.groups.unit.toLowerCase().startsWith("lb") ? "lb" : "kg";

  return {
    exercise: titleCase(match.groups.exercise),
    reps: Number(match.groups.reps),
    weight: Number(match.groups.weight),
    unit,
    performedAt: performedAt.toISOString()
  };
}

export function parseWorkoutBatch(raw: string) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => ({ raw: line, parsed: parseWorkoutEntry(line) }));
}

function titleCase(value: string) {
  return value.replace(/\w\S*/g, (segment) => segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase());
}
