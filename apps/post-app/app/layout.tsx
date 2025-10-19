import type { Metadata } from "next";
import "./globals.css";
import { TrpcProvider } from "@/src/providers/trpc-provider";
import { ReactNode } from "react";

/**
 * Metadata describing the root layout configuration.
 */
export const metadata: Metadata = {
  title: "Post App",
  description: "Create and manage posts with tRPC and Prisma."
};

/**
 * Root layout for the application that wires shared providers.
 */
export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <TrpcProvider>{children}</TrpcProvider>
      </body>
    </html>
  );
}
