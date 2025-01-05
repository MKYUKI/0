// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  // allow global var declarations
  // eslint-disable-next-line no-var
  var __globalPrisma__: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.__globalPrisma__) {
    global.__globalPrisma__ = new PrismaClient();
  }
  prisma = global.__globalPrisma__;
}

export default prisma;
