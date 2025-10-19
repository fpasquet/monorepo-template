"use client";

import { useCallback } from "react";
import { trpc } from "@/src/trpc/client";
import type { CreatePostInput } from "@/src/features/posts/schemas/post-schema";

/**
 * Provides the create post mutation along with helpers.
 */
export const useCreatePost = () => {
  const utils = trpc.useUtils();
  const mutation = trpc.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.list.invalidate();
    }
  });

  const createPost = useCallback(
    async (input: CreatePostInput) => {
      await mutation.mutateAsync(input);
    },
    [mutation]
  );

  return {
    createPost,
    isCreating: mutation.isPending,
    error: mutation.error
  };
};
