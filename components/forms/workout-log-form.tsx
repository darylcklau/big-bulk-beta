"use client";

import { useActionState, useMemo, useState } from "react";
import { Mic, MicOff } from "lucide-react";

import { createWorkoutLog } from "@/features/workouts/actions";
import { parseWorkoutBatch } from "@/lib/parser";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type State = {
  error?: string;
  success?: string;
};

const initialState: State = {};

type SpeechRecognitionResultLike = {
  0: {
    transcript: string;
  };
};

type SpeechRecognitionEventLike = {
  results: SpeechRecognitionResultLike[];
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  start: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

declare global {
  interface Window {
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
    SpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export function WorkoutLogForm() {
  const [state, action, pending] = useActionState(createWorkoutLog, initialState);
  const [entry, setEntry] = useState("");
  const [isListening, setIsListening] = useState(false);

  const preview = useMemo(() => parseWorkoutBatch(entry).filter((item) => item.raw), [entry]);

  const startVoiceCapture = () => {
    const Recognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;

    if (!Recognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new Recognition();
    recognition.lang = "en-SG";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim();

      if (!transcript) {
        return;
      }

      setEntry((current) => (current ? `${current}\n${transcript}` : transcript));
    };
    recognition.start();
  };

  return (
    <div className="grid gap-4">
      <Card>
        <CardContent className="grid gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Log your workout</h2>
              <p className="mt-1 text-sm text-slate-500">One line per set. Example: Bench Press 8 reps 80kg</p>
            </div>
            <Button type="button" variant="secondary" onClick={startVoiceCapture}>
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>

          <form action={action} className="grid gap-3">
            <Textarea
              name="entry"
              value={entry}
              onChange={(event) => setEntry(event.target.value)}
              placeholder={"Bench Press 8 reps 80kg\nSquat 5 reps 120kg\nIncline DB Press 10 reps 30kg"}
              required
            />
            {state.error ? <p className="text-sm text-rose-600">{state.error}</p> : null}
            {state.success ? <p className="text-sm text-emerald-700">{state.success}</p> : null}
            <Button type="submit" fullWidth disabled={pending}>
              {pending ? "Saving sets..." : "Save workout"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Live parse preview</h3>
          {preview.length ? (
            <div className="grid gap-2">
              {preview.map((item) => (
                <div key={item.raw} className="rounded-3xl bg-surface px-4 py-3 text-sm">
                  {item.parsed ? (
                    <span>
                      {item.parsed.exercise} · {item.parsed.reps} reps · {item.parsed.weight}
                      {item.parsed.unit}
                    </span>
                  ) : (
                    <span className="text-rose-600">Could not parse: {item.raw}</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Add a few lines and the normalized set preview will appear here.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
