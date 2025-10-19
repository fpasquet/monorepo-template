import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().min(1, "NEXT_PUBLIC_APP_NAME is required.")
});

const parsedAppName = clientEnvSchema.safeParse({
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME
});

/**
 * Shared application configuration values.
 */
export const APP_CONFIG = {
  name: parsedAppName.success ? parsedAppName.data.NEXT_PUBLIC_APP_NAME : "Post App"
} as const;
