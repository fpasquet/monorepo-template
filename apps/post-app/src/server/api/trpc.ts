import { initTRPC } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import superjson from "superjson";
import { prisma } from "@/src/server/db";

/**
 * Creates the tRPC context for a request.
 */
export const createTRPCContext = (_opts: FetchCreateContextFnOptions) => ({
  prisma
});

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson
});

/**
 * Helper to create a caller for server-side data fetching.
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * Base router factory.
 */
export const createTRPCRouter = t.router;

/**
 * Public procedure builder.
 */
export const publicProcedure = t.procedure;
