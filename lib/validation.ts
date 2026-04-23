import { z } from "zod";

export const authEmailSchema = z.string().email("Enter a valid email address.");
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(72, "Password must be 72 characters or less.");

export const passwordSignInSchema = z.object({
  email: authEmailSchema,
  password: passwordSchema
});

export const magicLinkSchema = z.object({
  email: authEmailSchema
});

export const naturalLanguageEntrySchema = z.object({
  entry: z
    .string()
    .min(3, "Enter a workout in the format: Bench Press 8 reps 80kg")
    .max(200, "Keep each line under 200 characters.")
});
