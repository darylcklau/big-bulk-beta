export type ParsedWorkoutEntry = {
  exercise: string;
  reps: number;
  weight: number;
  unit: "kg" | "lb";
  performedAt: string;
};

const WORKOUT_PATTERN =
  /^(?<exercise>[a-z0-9\s\-\&\.'\/]+?)\s+(?<reps>\d{1,3})(?:\s*(?:x|reps?))?\s*(?:at|@)?\s*(?<weight>\d{1,4}(?:\.\d{1,2})?)\s*(?<unit>kg|kgs|kilo|kilos|kilogram|kilograms|lb|lbs|pound|pounds)$/i;

const UPPERCASE_TOKENS = new Set(["db", "bb", "rdl", "ohp", "dl", "amrap", "emom", "hiit", "pr", "rm"]);

export function parseWorkoutEntry(raw: string, performedAt = new Date()): ParsedWorkoutEntry | null {
  const sanitized = raw.trim().replace(/\s+/g, " ");
  const match = WORKOUT_PATTERN.exec(sanitized);

  if (!match?.groups) {
    return null;
  }

  const unit = match.groups.unit.toLowerCase().startsWith("lb") ? "lb" : "kg";

  return {
    exercise: normalizeExercise(match.groups.exercise),
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

function normalizeExercise(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => normalizeToken(token))
    .join(" ");
}

function normalizeToken(token: string) {
  const bare = token.replace(/[^a-z0-9]/gi, "");
  const lower = bare.toLowerCase();

  if (UPPERCASE_TOKENS.has(lower)) {
    return token.replace(new RegExp(bare, "i"), bare.toUpperCase());
  }

  if (/^[A-Z0-9]{2,5}$/.test(bare)) {
    return token.replace(new RegExp(bare, "i"), bare.toUpperCase());
  }

  return token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
}
