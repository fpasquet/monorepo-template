import { z } from "zod";
import { createPostInputSchema } from "@/src/features/posts/schemas/post-schema";
import { createTRPCRouter, publicProcedure } from "@/src/server/api/trpc";

/**
 * Router responsible for post CRUD operations.
 */
export const postRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      orderBy: { createdAt: "desc" }
    });

    return posts;
  }),
  create: publicProcedure
    .input(createPostInputSchema)
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content ?? null,
          published: input.published ?? false
        }
      });

      return post;
    }),
  togglePublication: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        published: z.boolean()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.update({
        where: { id: input.id },
        data: { published: input.published }
      });

      return post;
    })
});
