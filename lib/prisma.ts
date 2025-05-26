import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient();

// This ensures the same instance of PrismaClient is reused across module reloads during development,
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
