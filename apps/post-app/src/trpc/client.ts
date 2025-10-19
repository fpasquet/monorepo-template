import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";
import type { AppRouter } from "@/src/server/api/root";

/**
 * Shared tRPC React instance for the client.
 */
export const trpc = createTRPCReact<AppRouter>();

/**
 * Resolves the base URL for tRPC API calls.
 */
export const getBaseUrl = (): string => {
  if (typeof window !== "undefined") {
    return "";
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
};

/**
 * Creates the tRPC client configuration.
 */
export const createTrpcClient = () =>
  trpc.createClient({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`
      })
    ]
  });
