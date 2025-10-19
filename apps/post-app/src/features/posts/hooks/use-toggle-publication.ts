"use client";

import { useCallback, useState } from "react";
import { trpc } from "@/src/trpc/client";

/**
 * Handles toggling the publication status of a post.
 */
export const useTogglePublication = () => {
  const utils = trpc.useUtils();
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const mutation = trpc.post.togglePublication.useMutation({
    onMutate: ({ id }) => {
      setActivePostId(id);
    },
    onSettled: () => {
      setActivePostId(null);
    },
    onSuccess: async () => {
      await utils.post.list.invalidate();
    }
  });

  const togglePublication = useCallback(
    async (id: string, published: boolean) => {
      await mutation.mutateAsync({ id, published });
    },
    [mutation]
  );

  return {
    togglePublication,
    isToggling: mutation.isPending,
    activePostId
  };
};
