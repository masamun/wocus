import { createPrismaClient, PrismaClient } from "@/prisma";

const prisma = createPrismaClient();

export type WocusContext = {
  prisma: typeof prisma;
};
export const createContext: () => Promise<WocusContext> = async () => {
  return {
    prisma,
  };
};
