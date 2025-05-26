import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient();

// This ensures the same instance of PrismaClient is reused across module reloads during development,
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
