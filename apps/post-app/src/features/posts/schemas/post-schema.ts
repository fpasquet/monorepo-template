import { z } from "zod";

/**
 * Validation schema for creating a post.
 */
export const createPostInputSchema = z.object({
  title: z
    .string({ required_error: "Title is required." })
    .min(3, "Title must contain at least 3 characters."),
  content: z
    .string()
    .max(1_000, "Content must be at most 1000 characters long.")
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
  published: z.boolean().default(false)
});

/**
 * Inferred type of the create post schema.
 */
export type CreatePostInput = z.infer<typeof createPostInputSchema>;
