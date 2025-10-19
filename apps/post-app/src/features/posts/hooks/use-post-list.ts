"use client";

import { trpc } from "@/src/trpc/client";

/**
 * Fetches the list of posts.
 */
export const usePostList = () => trpc.post.list.useQuery(undefined, { staleTime: 1_000 * 5 });
