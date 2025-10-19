import { createTRPCRouter } from "@/src/server/api/trpc";
import { postRouter } from "@/src/server/api/routers/post";

/**
 * Root application router that composes feature routers.
 */
export const appRouter = createTRPCRouter({
  post: postRouter
});

export type AppRouter = typeof appRouter;
