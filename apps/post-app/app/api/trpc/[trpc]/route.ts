import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/src/server/api/root";
import { createTRPCContext } from "@/src/server/api/trpc";

const handler = (request: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: createTRPCContext
  });

/**
 * Handles GET requests for tRPC API routes.
 */
export const GET = handler;

/**
 * Handles POST requests for tRPC API routes.
 */
export const POST = handler;
