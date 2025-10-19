"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { createTrpcClient, trpc } from "@/src/trpc/client";

export interface TrpcProviderProps {
  /**
   * Children rendered within the provider tree.
   */
  readonly children: ReactNode;
}

/**
 * Wraps the application with tRPC and React Query providers.
 */
export function TrpcProvider({ children }: TrpcProviderProps): JSX.Element {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 1_000 * 5
          }
        }
      })
  );
  const [client] = useState(() => createTrpcClient());

  return (
    <trpc.Provider client={client} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
