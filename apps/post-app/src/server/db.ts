import { PrismaClient } from "@prisma/client";
import { env } from "@/src/server/env";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

/**
 * Shared Prisma client instance with global caching for hot reloading.
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
    datasources: { db: { url: env.DATABASE_URL } }
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
