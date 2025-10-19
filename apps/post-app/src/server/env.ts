import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required.")
});

/**
 * Parsed runtime environment variables for server-side code.
 */
export const env = serverEnvSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL
});
